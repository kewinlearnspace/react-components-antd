## 组件库需要考虑的问题

- 代码结构
- 样式解决方案
- 组件需求分析和编码
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD 文档生成等

## 样式解决方案

- [参考地址](https://reactjs.bootcss.com/docs/dom-elements.html)
- Inline CSS
  - 采用小驼峰命名属性的 JavaScript 对象。style 的 JavaScript 属性是一致的，同时会更高效的，且能预防跨站脚本（XSS）的安全漏洞
- Css in JS(60 多种解决方案)
  - 以[styled-components](https://styled-components.com/docs)使用较为广泛
  - yarn add styled-components --save
- Sass/Less(预处理器)
  - yarn add node-sass --save

### 组件色选取

- blue `#158bb8` 鸢尾蓝
- gray `#35333c` 沙鱼灰
- green `#20894d` 宫殿绿
- yellow `#feba07` 琥珀黄
- red `#cc163a` 尖晶玉红
- bule `#2775b6` 景泰蓝

### 组件库样式变量分类

- 基础色彩系统-颜色选取
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关

### 测试的重要性

- 高质量代码
- 更早的发现 bug，减少成本
- 让重构和升级变得更加容易可靠
- 让开发流程更加敏捷

### React 适合单元测试的原因

- Component -组件
- Function -函数
- 单向数据流

### 使用 create-react-app 创建的项目支持 Jest 断言库进行测试

- 使用`npx xxx(测试的文件名) --watch` 配合`--watch`表示监听该测试,测试文件发生变化就重新运行

### React 官方推荐使用的测试框架

- [React Testing Library](https://reactjs.bootcss.com/docs/test-utils.html)

### react 脚手架组件开发的缺点

- `create-react-app`入口文件不合适管理组件库
- 缺少行为追踪和属性调试功能

- 理想状态[参考文档](https://storybook.js.org/docs/react/get-started/introduction)
  - 分开展示各个组件不通过属性下的状态
  - 能追踪组件的行为并且具有属性调试功能
  - 可以为组件自动生成文档和属性列表

### storybook 的使用

- > [官网](https://storybook.js.org/)

- 安装依赖
  ```shell
  npm i --save-dev @storybook/react
  npm i --save react react-dom
  npm i --save-dev @babel/core
  npm i --save-dev babel-loader
  ```
- package.json 添加脚本命令
  ```json
  "storybook": "start-storybook -p 9001 -c .storybook" // 指定配置文件目录为 .storybook
  ```
- 项目根目录新建`.storybook/config.ts(config.js)`.并编写配置,可参考[官网](https://storybook.js.org/)。`config`文件就是运行storybook之前执行的配置文件
  ```typescript
  // 参考
  import { configure } from '@storybook/react'
  // src下的tsx文件都被处理
  // 动态加载story,借用了webpackd额context API
  configure(require.context('../src/', true, /\.stories\.tsx$/), module)
  ```
- 根据`config`中的配置定义`stories`目录,并在其目录下新建符合`config`定义规则的文件
  ```typescript
  // welcome.stories.tsx
  import React from 'react'
  import { storiesOf } from '@storybook/react'
  storiesOf('Welcome page', module).add(
    'welcome',
    () => {
      return (
        <>
          <h1>learning react components </h1>
          <h3>安装试试</h3>
          <code>npm install kewin-components --save</code>
        </>
      )
    },
    { info: { disable: true } }
  )
  ```
- 运行 `npm run storybook`

- 通过配置 webpack,使 storybook 支持 ts 语法
  ```javascript
  module.exports = ({ config }) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')],
          },
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  }
  ```
- storybook 常用插件

```shell
npm add -D @storybook/addons @storybook/addon-actions @storybook/addon-links @storybook/addon-notes storybook-readme
```

- 建立配置文件 .storybook/addons.js。引入 addons 相关插件文件
