# next-admin

一个基于 Next.js App Router 的后台项目。

## 本地开发

```bash
pnpm install
pnpm dev
```

默认启动后访问：<http://localhost:3000>

## 生产部署方案（阿里云）

项目已接入 **GitHub Actions → 阿里云 ACR → SSH 登录服务器 → Docker Compose 发布** 的自动部署链路。

当前约定：

- 生产域名：`next.admin.bzsh.fun`
- 生产端口：`25001`
- 容器默认名称：`next-admin`
- 默认部署目录：`/opt/next-admin`

### 自动部署触发方式

- 推送到 `master` 分支时自动触发
- 也支持在 GitHub Actions 页面手动执行 `Build and Deploy Next Admin to Aliyun ACR`

### GitHub Secrets / Environment（prod）

请在 GitHub 仓库的 **Environment: `prod`** 中配置以下 secrets：

#### 必填

- `ALIYUN_REGISTRY`：阿里云 ACR Registry 地址
- `ALIYUN_NAMESPACE`：ACR 命名空间
- `ALIYUN_REPO`：ACR 仓库名
- `ALIYUN_USERNAME`：ACR 用户名
- `ALIYUN_PASSWORD`：ACR 密码
- `DEPLOY_HOST`：部署服务器 IP / 域名
- `DEPLOY_PORT`：SSH 端口
- `DEPLOY_USER`：SSH 用户名
- `DEPLOY_SSH_KEY`：**base64 编码后的私钥内容**

#### 可选（不填则走默认值）

- `DEPLOY_PATH`：默认 `/opt/next-admin`
- `CONTAINER_NAME`：默认 `next-admin`
- `HOST_PORT`：默认 `25001`
- `APP_PORT`：默认 `3000`
- `APP_DOMAIN`：默认 `next.admin.bzsh.fun`

### 服务端反向代理

仓库已提供示例文件：

- `deploy/Caddyfile.next.admin.example`

如果服务器使用 Caddy，可将示例中的配置加入现有 Caddy 配置，并 reload Caddy，使：

- `https://next.admin.bzsh.fun` → `127.0.0.1:25001`

## 部署相关文件

- `Dockerfile`：Next.js standalone 生产镜像
- `docker-compose.prod.yml`：生产环境容器编排
- `deploy/deploy.sh`：服务器端拉镜像并重启服务
- `.github/workflows/deploy-aliyun.yml`：GitHub Actions 自动部署工作流
- `app/api/health/route.ts`：健康检查接口

## 健康检查

部署成功后可检查：

- 本机端口：`http://127.0.0.1:25001/api/health`
- 域名：`https://next.admin.bzsh.fun/api/health`
