# 部署与发布实现

## 目标

- 保持开发与生产环境一致的构建方式
- 自动化镜像构建与服务器发布
- 提供可观测的健康检查入口

## 核心文件

- 构建镜像：`Dockerfile`
- 生产编排：`docker-compose.prod.yml`
- 服务器部署脚本：`.github/deploy/deploy.sh`
- 自动化流程：`.github/workflows/deploy-aliyun.yml`
- 健康检查接口：`app/api/health/route.ts`

## 流程概览

1. 推送代码触发 CI
2. 构建并推送镜像
3. 服务器拉取镜像并重启容器
4. 通过健康检查接口确认服务可用

## 默认约定

- 生产域名：`next.admin.bzsh.fun`
- 对外端口：`25001`
- 容器名：`next-admin`
- 部署目录：`/opt/next-admin`
