import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Menu, { IMenuProps } from './menu';
import MenuItem, { IMenuItemProps } from './menuItem';

const testProps: IMenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: IMenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}

const generateMenu = (props: IMenuProps) => {
  return (<Menu {...props}>
    <MenuItem index={0}>active</MenuItem>
    <MenuItem index={1} disabled>disabled</MenuItem>
    <MenuItem index={2}> index </MenuItem>
  </Menu>)
}

/**
 * beforeEach每个测试用例执行前都会执行
 */
let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component in default(horizontal) mode', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    // 测试class名称
    expect(menuElement).toHaveClass('kewin-menu test')
    // 测试有3个li
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(3)
    // 
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('index')
    // fireEvent事件触发器
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', () => {
    // cleanup将beforeEach执行的代码清除
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
})