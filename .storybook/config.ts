import { configure } from '@storybook/react';
import "../src/style/index.scss";
// src下的tsx文件都被处理
// 动态加载story,借用了webpackd额context API
configure(require.context('../src', true, /\.stories\.tsx$/), module);