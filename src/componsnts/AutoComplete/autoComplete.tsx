import React, { FC, useState, ChangeEvent, ReactElement } from 'react';
import Input, { InputProps } from '../Input/input';

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

// Omit忽略掉相同的属性
export interface IAutoComplete extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[],
  onSelect?: (item: DataSourceType) => void,
  // 自定义模板
  renderOption?: (item: DataSourceType) => ReactElement
}


export const AutoComplete: FC<IAutoComplete> = (props) => {
  const { fetchSuggestions, value, onSelect, renderOption, ...restProps } = props
  // 存放输入框的值
  const [inputValue, setInputValue] = useState(value)
  // 存放下拉列表的值
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    if (value) {
      const result = fetchSuggestions(value)
      setSuggestions(result)
    } else {
      setSuggestions([])
    }
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }
  // 自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  // 显示下拉列表
  const generateDropdown = () => {
    return <ul>
      {
        suggestions.map((item, index) => <li key={index} onClick={() => handleSelect(item)}>
          {renderTemplate(item)}
        </li>
        )
      }
    </ul>
  }
  const handleKeyDown = () => { }
  return <div className="kewin-auto-compelete">
    <Input
      value={inputValue}
      onChange={handleChange}
      {...restProps}
    ></Input>
    {(suggestions.length > 0) && generateDropdown()}
  </div>
}

export default AutoComplete;