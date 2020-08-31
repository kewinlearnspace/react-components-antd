import React, { FC, useState, ChangeEvent, ReactElement, KeyboardEvent, useEffect, useRef } from 'react';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutSide';
import classNames from 'classnames';
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
  const [hightLightIndex, setHeightLight] = useState(-1)
  const triggerSearch = useRef(false) // 控制在change下才进行搜索,select下不进行搜索
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue)

  useClickOutside(componentRef, () => {
    setSuggestions([])
  })

  useEffect(() => {
    if (debounceValue && triggerSearch) {
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
    // 每次修改值后都需要重置,否则高亮部分会一直存在上一次搜索的结果中
    setHeightLight(-1)
  }, [debounceValue, triggerSearch])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  // 自定义模板
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  // 显示下拉列表
  const generateDropdown = () => {
    return <ul>
      {
        suggestions.map((item, index) => {
          const cnames = classNames('suggestions-item', {
            'item-heighlighted': index === hightLightIndex
          })
          return <li key={index} className={cnames} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
          </li>
        }
        )
      }
    </ul>
  }

  const hightLight = (index: number) => {
    // 最上
    if (index < 0) index = 0
    // 最下
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHeightLight(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      // 回车
      case 13:
        if (suggestions[hightLightIndex]) {
          handleSelect(suggestions[hightLightIndex])
        }
        break
      // 上
      case 38:
        hightLight(hightLightIndex - 1)
        break
      // 下
      case 40:
        hightLight(hightLightIndex + 1)
        break
      // esc
      case 27:
        setSuggestions([])
        break
      default: break
    }
  }
  return <div className="kewin-auto-compelete" ref={componentRef}>
    <Input
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...restProps}
    ></Input>
    {loading && <ul><Icon icon="spinner" spin></Icon></ul>}
    {(suggestions.length > 0) && generateDropdown()}
  </div>
}

export default AutoComplete;