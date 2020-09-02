## Upload 组件分析

- 上传(自定义触发上传的元素)
- beforeUpload(file)文件上传前
- onProgress(event,file)文件进度
- onChange(file)文件状态
- onSuccess(res,file)上传成功/onError(err,file)上传失败
- 自定义 header
- name 属性定义文件参数名称
- data 属性允许添加上传所需的额外参数
- 上传文件是否携带 cookie - withCredentials
- 添加 input 本身的 file 约束属性,如:multiple,accept 等
- 支持拖拽上传

## UploadList 分析

- fileList 文件展示列表
- status 不同状态的展示
- hover 悬浮现实删除按钮

## Progress 分析

- text 是否展示上传进度的文字
- color 进度条颜色的配置
-
