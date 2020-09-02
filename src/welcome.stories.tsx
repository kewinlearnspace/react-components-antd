import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>learning react components </h1>
        <h3>安装试试</h3>
        <code>
          npm install kewin-components --save
        </code>
      </>
    )
  }, { info : { disable: true }})