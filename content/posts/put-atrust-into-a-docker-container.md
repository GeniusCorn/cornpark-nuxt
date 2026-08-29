---
date: 2026-08-29
title: 把 aTrust 关进 Docker 容器里
description: 深信服 aTrust 客户端抢占路由、后台常驻、无法卸载，这篇实践用 docker-easyconnect 把 aTrust 封装成容器，配合 Clash 规则分流，简单跑通内网访问。
lang: zh
---

我平时要使用深信服的 [零信任 aTrust](https://www.sangfor.com.cn/sangfor-security/atrust) 来访问公司的内网。在我实际使用的过程中，发现这软件实在是太恶心了。作为一个 VPN 类的软件，连接到其他网络是它分内的事情，但是它：

- 抢占系统路由表，创建虚拟网卡，严重冲突我已经配置好的网络；
- 流氓般地写入开机自启，使用常规方法无法取消；
- 退出客户端后，依旧持续在后台运行且无法关闭的 `aTrustAgent` 进程，不禁让人怀疑是否在进行监控；
- 无限制地在 C 盘生成日志文件，无法在软件内设置关闭。

![1](/posts/put-atrust-into-a-docker-container/1.png)

总而言之，aTrust 到处拉屎。我很高兴看到在网路上有不少帖子对 aTrust 口诛笔伐，开发者们都忍受不了。

在调研了一圈之后，我发现 [docker-easyconnect](https://github.com/docker-easyconnect/docker-easyconnect) 应该是目前最优雅的 aTrust 的使用方案。它将深信服的服务封装成了 [Docker](https://www.docker.com/) 镜像，使其可以作为一个代理服务供宿主机使用。那一条简单的网络链接就形成了：先跑起来代理服务，在宿主机将需要代理的流量导向代理服务。这就可以完美实现原来 aTrust 客户端

事不宜迟，我马上开始实践。首先用 docker-compose 跑起来代理服务。这是几个定义好了的环境变量，可以根据自己的需要更改：

- `PASSWORD`：通过 VNC 访问 aTrust 登录页面的密码；
- `CLIP_TEXT`：VNC 服务中默认复制好的链接。这里我填写的是公司提供的连接 URL，打开 VNC 之后可以直接粘贴到输入框里；
- `5901`：VNC 服务端口；
- `1080`：SOCKS5 代理端口；
- `8888`：HTTP 代理端口。

```yml
services:
  atrust:
    image: hagb/docker-atrust
    container_name: atrust
    restart: unless-stopped
    tty: true
    stdin_open: true
    devices:
      - /dev/net/tun
    cap_add:
      - NET_ADMIN
    environment:
      - PASSWORD=xxxx
      - URLWIN=1
      - CLIP_TEXT=填入公司提供的 URL
    volumes:
      - ~/.atrust-data:/root
    ports:
      - "127.0.0.1:5901:5901"
      - "0.0.0.0:1080:1080"
      - "127.0.0.1:8888:8888"
      - "127.0.0.1:54631:54631"
    sysctls:
      - net.ipv4.conf.default.route_localnet=1
```

接着，配置流量的导向。我选择的是 Clash 配置，我需要访问的服务在公司内网的 `192.168.99.0` 网段，那我就把 `192.168.99.0` 的流量导向了 `127.0.0.1:1080`。Clash 可能会默认跳过对某些私有网络的处理，记得需要去设置中取消。

```js
const prependRules = [
  // atrust vpn
  "IP-CIDR,192.168.99.0/24,atrust", // vpn app
];

const main = (config) => {
  config.rules = prependRules.concat(config.rules);
  
  if (!config.proxies) {
    config.proxies = [];
  }
  
  config.proxies.push({
    name: "atrust",
    type: "socks5",
    server: "127.0.0.1",
    port: 1080,
    tcp: true
  });

  return config;
}
```

最后，打开 VNC，进行 aTrust 的用户认证。在我的实际测试下，整个链路都打通，可正常访问公司的网络。如此一来，终于可以摆脱 aTrust 的垃圾客户端了。

目前容器运行在本机中，后续也可以考虑将其部署在公网之上，暴露出 VNC 端口和代理端口，本机直接连接即可。

![2](/posts/put-atrust-into-a-docker-container/2.png)