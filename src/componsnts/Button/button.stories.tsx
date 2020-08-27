import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './button'

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg">large Button</Button>
    <Button size="sm">small Button</Button>
  </>
)

const buttonWidthType = () => (
  <>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='link' href="www.baidu.com">link button</Button>
  </>
)

storiesOf('Button Component', module)
  .add('default Button', defaultButton)
  .add('size Button', buttonWithSize)
  .add('btnType Button', buttonWidthType)