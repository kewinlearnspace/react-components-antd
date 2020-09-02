import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload, UploadFile } from './upload';


const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false;
  }
  return true;
}
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', { type: file.type })
  return Promise.resolve(newFile)
}

// beforeUpload 返回布尔值
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big')
//     return false
//   }
//   return true
// }

// beforeUpload返回Promise对象
// const filePromise = (file: File) => {
//   const newFile = new File([file], 'new_name.docx', { type: file.type })
//   return Promise.resolve(newFile)
// }


const SimpleUpload = () => {
  // return <Upload
  //   action="https://run.mocky.io/v3/42d3c016-7aef-4e57-8f4d-4c357f27b910"
  //   onProgress={action('progress')}
  //   onSuccess={action('success')}
  //   onError={action('error')}
  // ></Upload>

  // 测试beforeUpload
  // return <Upload
  //   action="https://run.mocky.io/v3/42d3c016-7aef-4e57-8f4d-4c357f27b910"
  //   onChange={action('changed')}
  //   // beforeUpload={checkFileSize}
  //   // beforeUpload={filePromise}
  // ></Upload>

  // 测试 uploadList
  return <Upload
    action="https://run.mocky.io/v3/42d3c016-7aef-4e57-8f4d-4c357f27b910"
    onChange={action('changed')}
    defaultFileList={defaultFileList}
    onRemove={action('remove')}
    name='filename'
    data={{ 'key': 'value' }}
    headers={{ 'X-Powered-By': 'kewin' }}
    accept='.png'
    multiple
  ></Upload>
}
storiesOf('Upload Component', module)
  .add('Upload', SimpleUpload)