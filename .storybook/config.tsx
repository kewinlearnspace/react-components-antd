import { configure, addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import { withInfo } from '@storybook/addon-info';

import "../src/style/index.scss";
// 全局装饰器要在卸载tex文件编译前
const styles: React.CSSProperties = {
  padding: '20px 40px'
}

const styleDecorator = (storyFn: any) => <div style={styles}> <h3>组件演示</h3> {storyFn()}</div>
addDecorator(styleDecorator)
addDecorator(withInfo)
addParameters({ info: { inline: true, header: false } })
// src下的tsx文件都被处理
// 动态加载story,借用了webpackd额context API
configure(require.context('../src', true, /\.stories\.tsx$/), module);
