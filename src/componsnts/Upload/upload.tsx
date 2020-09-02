import React, { FC, useRef, ChangeEvent, useState } from 'react';
import axios from 'axios';

import Button from '../Button/button';
import uploadList, { UploadList } from './uploadList';

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
  percent?: number,
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
   * 已上传的文件数组
   */
  defaultFileList?: UploadFile[],
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
  onChange?: (file: File) => void,
  /**
   * 删除
   */
  onRemove?: (file: UploadFile) => void,
  /**
   * 请求头设置 key:value形式
   */
  headers?: { [key: string]: any },
  /**
   * 文件对应的字段名称
   */
  name?: string,
  /**
   * 文件名称外的其他数据集合
   */
  data?: { [key: string]: any },
  /**
   * 是否跨域
   */
  withCredentials?: boolean,
  /**
   * 上传的文件类型控制
   */
  accept?: string,
  /**
   * 是否支持一次上传多个
   */
  multiple?: boolean
}

/**
 * 上传文件的生命周期
 */
export const Upload: FC<IUploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
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

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
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
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      size: file.size,
      name: file.name,
      status: 'ready',
      percent: 0,
      raw: file
    }
    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      // 将data中的所有属性添加到formData中
      Object.keys(data).forEach(key => { formData.append(key, data[key]) })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress: (e) => {
        // e 上传进度相关的参数数据
        // console.log(e)
        let percentage = Math.round((e.loaded * 100) / e.total) || 0
        if (percentage < 100) {
          updateFileList(_file, { percent: percentage, status: 'uploading' })
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
      accept={accept}
      multiple={multiple}
    />
    <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
  </div>)
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload;