# 全自动化 CI/CD 工作流

## 触发方式

- 自动触发：推送到 `master` 且命中工作流监听路径
- 手动触发：GitHub Actions 页面执行 `Build and Deploy Next Admin`

## 自动化能力概览

- 代码提交后自动构建镜像，无需手工打包。
- 自动上传镜像与部署脚本到目标服务器。
- 自动执行部署脚本并重启服务。
- 自动健康检查，失败可快速定位发布异常。

## 工作流入口

- 工作流文件：`.github/workflows/deploy-aliyun.yml`
- 服务器部署脚本：`.github/deploy/deploy.sh`

## 执行流程

1. 拉取代码并初始化 Docker Buildx
2. 构建镜像并导出镜像归档
3. 通过 SSH + SCP 上传部署文件与镜像归档
4. 在服务器执行 `deploy.sh` 完成部署
5. 通过 `/api/health` 进行健康检查

## 关键环境变量

- `DEPLOY_IMAGE`：部署镜像标签
- `DEPLOY_PATH`：服务器部署目录，默认 `/opt/next-admin`
- `CONTAINER_NAME`：容器名，默认 `next-admin`
- `HOST_PORT`：对外端口，默认 `25001`
- `APP_PORT`：容器端口，默认 `3000`
- `APP_DOMAIN`：访问域名，默认 `next.admin.bzsh.fun`

## 环境配置要求

- GitHub Environment：`prod`
- 必填 Secrets：`DEPLOY_HOST`、`DEPLOY_PORT`、`DEPLOY_USER`、`DEPLOY_SSH_KEY`
