import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'

export interface IProgressProps {
  /**
   * 百分比
   */
  percent: number,
  /**
   * 进度条的高度
   */
  strokeHeiht?: number,
  /**
   * 文字是否展示
   */
  showText?: boolean,
  style?: React.CSSProperties;
  /**
   * 主题
   */
  theme?: ThemeProps

}
export const Progress: FC<IProgressProps> = (props) => {
  const { percent, strokeHeiht, showText, style, theme } = props
  return (
    <div className="kewin-progress-bar" style={style}>
      <div className="kewin-progress-bar-outer" style={{ height: `${strokeHeiht}px` }}>
        <div className={`kewin-progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className="inner-text" >{`${percent}%`}</span>}
        </div>
      </div>
    </div >
  )
}

Progress.defaultProps = {
  strokeHeiht: 15,
  showText: true,
  theme: 'primary'
}

export default Progress;