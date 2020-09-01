import React, { FC, useRef, ChangeEvent, useState } from 'react';
import axios from 'axios';

import Button from '../Button/button';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string,
  /**
   * 大小
   */
  size: number,
  /**
   * 名字
   */
  name: string,
  /**
   * 状态
   */
  status?: UploadFileStatus,
  /**
   * 进度
   */
  precent?: number,
  /**
   * 原文件
   */
  raw?: File,
  /**
   * 成功
   */
  response?: any
  /**
   * 失败
   */
  error?: any
}

export interface IUploadProps {
  action: string,
  /**
   * 文件上传前的回调
   */
  beforeUpload?: (file: File) => boolean | Promise<File>,
  /**
   * 上传进度回调
   */
  onProgress?: (percentage: number, file: File) => void,
  /**
   * 上传成功回调
   */
  onSuccess?: (data: any, file: File) => void,
  /**
   * 上传失败回调
   */
  onError?: (err: any, file: File) => void,
  /**
   * 发生变化时的回调
   */
  onChange?: (file: File) => void
}

/**
 * 上传文件的生命周期
 * 上传 -> beforeUpload(file) -> onProgress(event,file)文件进度 -> onChange(file)文件状态 -> onSuccess(res,file)上传成功/onError(err,file)上传失败
 */
export const Upload: FC<IUploadProps> = (props) => {
  const { action, beforeUpload, onProgress, onSuccess, onError, onChange } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  // Partial表示可以更新参数的任何几项都可以
  const updateFileList = (updaleFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updaleFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (!file) {
      return
    }
    uploadFiles(file)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    console.log(files)
    let postFiles = Array.from(files)
    // console.log(postFiles)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processFile => {
            post(processFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
      post(file)
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      size: file.size,
      name: file.name,
      status: 'ready',
      precent: 0,
      raw: file
    }
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(file.name, file)
    axios.post(action, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        // e 上传进度相关的参数数据
        // console.log(e)
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, { precent: percentage, status: 'uploading' })
          // setFileList(prevList => {
          //   console.log(prevList)
          //   return prevList
          // })
          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(res => {
      updateFileList(_file, { status: 'success', response: res.data })
      if (onSuccess) {
        onSuccess(res.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch(err => {
      console.log(err)
      updateFileList(_file, { status: 'error', error: err })
      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
    })
  }
  console.log(fileList)
  return (<div className="kewin-upload-component">
    <Button btnType='primary' onClick={handleClick} >
      Upload File
    </Button>
    <input
      className="kewin-file-input"
      ref={fileInput}
      style={{ display: "none" }}
      type='file'
      onChange={handleChange}
    />
  </div>)
}

export default Upload;