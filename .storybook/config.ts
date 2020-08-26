import { configure } from '@storybook/react';
// src下的tsx文件都被处理
configure(require.context('../src/', true, /\.stories\.tsx$/), module);