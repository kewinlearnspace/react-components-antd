import React, { FC } from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress'

interface IUploadListProps {
  fileList: UploadFile[],
  onRemove?: (_file: UploadFile) => void
}

export const UploadList: FC<IUploadListProps> = (props) => {
  const { fileList, onRemove } = props
  return (
    <ul className="kewin-upload-list">
      {
        fileList.map(item => {
          return (
            <li className="kewin-upload-list-item" key={item.uid}>
              <span className={`file-name file-${item.status}`}>
                <Icon icon="file-alt" theme="secondary" />
                {item.name}
              </span>
              <span className='file-status'>
                {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
                {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
              </span>
              <span className="file-actions">
                <Icon icon="times" onClick={() => { onRemove(item) }} />
              </span>
              {
                item.status === 'uploading' &&
                <Progress percent={item.percent || 0}></Progress>
              }
            </li>
          )
        })
      }
    </ul>
  )
}

export default UploadList;