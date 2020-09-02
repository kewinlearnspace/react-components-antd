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
- 项目根目录新建`.storybook/config.ts(config.js)`.并编写配置,可参考[官网](https://storybook.js.org/)。`config`文件就是运行 storybook 之前执行的配置文件
  - 可配置需要加载的文件,和一些全局装饰器等
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

  - @storybook/addons
  - @storybook/addon-actions (支持查看输出面板)
  - @storybook/addon-links (支持不同组件之间跳转)
  - @storybook/addon-notes storybook-readme
  - @storybook/addon-info (组件参数的详细文档和使用组件的代码)

- 建立配置文件 `.storybook/addons.js`。引入 `addons` 相关插件文件,在`addons`中注册的插件才能在 storybook 中正常使用

- 使用`react-docgen-typescript-loader`让 React 通过注释自动生成文档。[github 地址](https://github.com/strothj/react-docgen-typescript-loader)

## http 请求

- xhr
- \$.ajax
- fetch
  - 缺点:一般都需要经过封装。只对网络请求报错,对 400、500 都当做成功请求。默认不会带 cookie,需要手动添加参数配置。不支持 abort,不支持超时控制。没有办法原生检测请求的进度
- axios

## 免费线上 mockServer 服务

- [JSONPlaceHolder](http://jsonplaceholder.typicode.com/)
- [Mocky](https://designer.mocky.io/)

## 知识点补充

- useState

  - 使用 useState 定义的变量时,在修改其值时,可以通过给第二个参数传入一个函数来获取前一次的最新的值(用于异步请求时,动态的对某个 state 修改)

  ```jsx
  const [count, setCount] = useState()
  setCount((prevCount) => {
    return prevCount
  })
  ```

- 模块化
  - 可重用代码
  - 可维护性
  - 可重用性

## tsconfig.build.json 配置选项

```json
{
  "compilerOptions": {
    "outDir": "dist", // 输出文件
    "module": "esnext", // 输出类型
    "target": "es5", // 编译后符合的es标准
    "declaration": true, // 获取到类型定义
    "jsx": "react",
    "moduleResolution": "Node", // module路径的查找方式
    "allowSyntheticDefaultImports": true // 导入方式 默认为false
  },
  "include": ["src"], // 编译src下的文件
  "exclude": ["src/**/*.test.tsx", "src/**/*.stories.tsx", "src/setupTests.ts"] // 排除编译的文件
}
```

## CI / CD

- CI(持续集成) => 目的:使产品可以快速的迭
  - 频繁的将代码集成到主干(master) -> 核心措施:代码继承到主干前,必须通过自动化测试,有一个失败都不能集成
  - 快速发现错误
  - 防止分支大幅偏离主干
  - CI 持续集成如:[travis-ci](https://travis-ci.com/)、[jenkins](https://www.jenkins.io/)
- CD(持续交付,持续部署)
  - 频繁的将软件的新版本,交付给质量团队或者用户
  - 代码通过评审以后,自动部署到生产环境