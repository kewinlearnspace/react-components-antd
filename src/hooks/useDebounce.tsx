import { useState, useEffect } from 'react';
/**
 * @param {*} value 值
 * @param {number} [delay=3000] 延迟时间
 * @returns 设置后的值
 */
function useDebounce(value: any, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    // 返回函数时,会在下次update时先执行上一次留下的return
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debounceValue
}
export default useDebounce