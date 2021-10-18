# 建置 Local Modules 流程

## 修改 外部專案 package.json

外部專案 可能為 webapi, scheduler, queueProcess 等類型專案，將依賴 本模組 使用。
請勿修改 本模組 package.json

### 1. package.json 中的 dependencies 加入 local module

```json
{
 "name": "my-webapi-app",
 "dependencies": {
   "lodash": "^2.0.0",
   "card-platform-library": "file:<card-platform-library root path>"
 }
}
```

### 2. 刪除 node_module 中的 local module

```shell
rm -rf node_module/card-platform-library
```