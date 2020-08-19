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
