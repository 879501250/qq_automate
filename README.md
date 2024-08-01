# QQ自动化项目

## 概述

基于 SpringBoot+React 搭建的一个练习项目，主要业务包括一些自动化的脚本任务。

## 技术栈

### 前端

- 开发框架：React、Umi
- 脚手架：Ant Design Pro
- 组件库：Ant Design、Ant Design Components
- 语法扩展：TypeScript、Less
- 打包工具：Webpack
- 代码规范：ESLint、StyleLint、Prettier

### 后端

- Web 框架：SpringBoot
- 数据源：Druid
- 数据库：MySQL
- 工具类：HuTool

## 快速使用

### 前端

#### 初始化

初始代码基于 [Ant Design Pro](https://pro.ant.design/zh-CN) 脚手架生成，相关使用文档可参考官网

```sh
npm i @ant-design/pro-cli -g
pro create my-app
```

#### 安装依赖

安装前端项目所需的依赖

```sh
yarn
```

#### start

主要用于开发时调试，重新编辑代码后，页面还会自动刷新，默认端口号 8000

```sh
yarn start
```

#### build

编译前端项目，之后可以在项目中的 dist 目录中找到编译后的文件用于部署。

```sh
yarn run build
```



### 后端

打包完前端项目后，执行 maven 命令进行构建

```sh
maven clean install
```

使用 java 命令启动

```sh
java -jar qq_automate.jar
```

