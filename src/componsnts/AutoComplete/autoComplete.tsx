import React, { FC, useState, ChangeEvent, ReactElement, useEffect } from 'react';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

// Omit忽略掉相同的属性
export interface IAutoComplete extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>,
  onSelect?: (item: DataSourceType) => void,
  // 自定义模板
  renderOption?: (item: DataSourceType) => ReactElement
}


export const AutoComplete: FC<IAutoComplete> = (props) => {
  const { fetchSuggestions, value, onSelect, renderOption, ...restProps } = props
  // 存放输入框的值
  const [inputValue, setInputValue] = useState(value as string)
  // 存放下拉列表的值
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const debounceValue = useDebounce(inputValue)

  useEffect(() => {
    if (debounceValue) {
      // result | promise
      const result = fetchSuggestions(debounceValue)
      if (result instanceof Promise) {
        setLoading(true)
        result.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(result)
      }
    } else {
      setSuggestions([])
    }
  }, [debounceValue])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
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
    {loading && <ul><Icon icon="spinner" spin></Icon></ul>}
    {(suggestions.length > 0) && generateDropdown()}
  </div>
}

export default AutoComplete;