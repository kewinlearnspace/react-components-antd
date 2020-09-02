import { configure, addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import { withInfo } from '@storybook/addon-info';
import "../src/style/index.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)  // 配置加载图标文件
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
// configure(require.context('../src', true, /\.stories\.tsx$/), module);
const loaderFn = () => {
  // 配置welcome为首页
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};
configure(loaderFn, module);
