import React, { FC, useState, ChangeEvent } from 'react';
import Input, { InputProps } from '../Input/input';

// Omit忽略掉相同的属性
export interface IAutoComplete extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => string[],
  onSelect?: (item: string) => void
}


export const AutoComplete: FC<IAutoComplete> = (props) => {
  const { fetchSuggestions, value, onSelect, ...restProps } = props
  // 存放输入框的值
  const [inputValue, setInputValue] = useState(value)
  // 存放下拉列表的值
  const [suggestions, setSuggestions] = useState<string[]>([])
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

  const handleSelect = (item: string) => {
    setInputValue(item)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
  }
  // 显示下拉列表
  const generateDropdown = () => {
    return <ul>
      {
        suggestions.map((item, index) => <li key={index} onClick={() => handleSelect(item)}> {item} </li>)
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