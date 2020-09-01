import React, { FC, useRef, ChangeEvent } from 'react';
import axios from 'axios';

import Button from '../Button/button';

export interface IUploadProps {
  action: string,
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
  onError?: (err: any, file: File) => void
}

export const Upload: FC<IUploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError } = props
  const fileInput = useRef<HTMLInputElement>(null)

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
    console.log(postFiles)
    postFiles.forEach(file => {
      const formData = new FormData()
      formData.append(file.name, file)
      axios.post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (e) => {
          // e 上传进度相关的参数数据
          console.log(e)
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      }).then(res => {
        if (onSuccess) {
          onSuccess(res.data, file)
        }
      }).catch(err => {
        console.log(err)
        if (onError) {
          onError(err, file)
        }
      })
    })
  }

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