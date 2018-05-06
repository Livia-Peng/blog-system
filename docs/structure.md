# 项目文件结构 #
```
.
├── .editorconfig
├── .git
├── .gitignore
├── .idea
├── .meteor
│   ├── .finished-upgraders
│   ├── .gitignore
│   ├── .id
│   ├── packages
│   ├── platforms
│   ├── release
│   └── versions
├── .pm2
│   └── pm2-meteor.json
├── README.md
├── client
│   ├── head.html
│   ├── main.js
│   └── main.less
├── config
│   └── settings.dev.json
├── docs
├── imports                                         // 引入文件夹
│   ├── api                                     
│   │   ├── collection1                             // mongodb collection folder
│   │   │   ├── collection1.js
│   │   │   ├── methods.js
│   │   │   └── server
│   │   │       └── publications.js
│   ├── schema
│   │   ├── collection1-schema.js                   // 数据结构定义
│   │   ├── collection2-schema.js
│   ├── startup                                     // 服务启动时加载文件夹
│   │   ├── both
│   │   │   ├── SchemaMessages.cn.js                // schema 配置
│   │   │   ├── index.js                            // client和server自定义加载项
│   │   │   ├── sharedSchemas.js                    // 基本schema
│   │   │   └── tabularTable.js                     // 表格库
│   │   ├── client
│   │   │   ├── autoForm.js                         // autoForm 处理文件
│   │   │   ├── customizedHelpers.js                // 自定义全局helper
│   │   │   ├── index.js                            // client自定义加载项
│   │   │   ├── notify.js                           // 通知库
│   │   │   ├── plugins.js                          // 插件引入
│   │   │   ├── routes.js                           // 路由引入
│   │   │   └── router
│   │   │       ├── routerDefs.js                    // 路由自定义
│   │   │       └── routeUtils.js                   // 路由生成方法
│   │   └── server
│   │       ├── fixtures.js                         // 数据自动填充
│   │       ├── index.js                            // server自定义加载项
│   │       ├── logger.js                           // 日志打印
│   │       ├── register-api.js                     // server API注册
│   │       └── security.js                         // collection安全
│   └── ui
│       ├── components                              // 模块组件
│       │   ├── article
│       │   │   ├── articleInfo.html
│       │   │   ├── articleInfo.js
│       │   ├── extImports
│       │   │   └── extImportsDataTables.js
│       │   ├── forms
│       │   │   ├── formImageUploader.html
│       │   │   ├── formImageUploader.js
│       │   │   ├── formImageUploaderFiles.html
│       │   │   ├── formImageUploaderFiles.js
│       │   ├── table
│       │   │   ├── tableCells.html
│       │   │   └── tableCells.js
│       ├── layouts                                 // 布局
│       │   ├── body
│       │   │   ├── AdminImports.js
│       │   │   ├── bodyAdmin.html
│       │   │   └── bodyAdmin.js
│       │   ├── header
│       │   │   ├── headerMain.html
│       │   │   └── headerMain.js
│       │   ├── breadcrumb
│       │   │   ├── breadcrumb.html
│       │   │   └── breadcrumb.js
│       │   ├── footer
│       │   │   ├── footer.html
│       │   │   └── footer.js
│       ├── pages                                   // 页面
│       │   ├── account                             // 账户登录注册
│       │   │   ├── login.html
│       │   │   ├── login.js
│       │   │   ├── register.html
│       │   │   └── register.js
│       │   ├── blog                                // 博客展示和管理
│       │   ├── article                             // 文章创建、修改、详情等主要页面
│       │   ├── home                                // 首页
│       │   ├── manage                              // 系统管理页面
│       │   ├── noPermission                        // 无权限跳转页面
│       │   │   ├── noPermission.html
│       │   │   └── noPermission.js
│       │   ├── notFound                            // 路径错误跳转页面
│       │   │   ├── notFound.html
│       │   │   └── notFound.js
│       │   └── user                                // 用户资料管理等页面
│       └── stylesheets
│           ├── app.less                            // 基本CSS配置
│           └── variable.less                       // CSS变量
├── lib
│   ├── 00_app.js                                   // 全局APP
│   ├── 01_collections.js                           // collection
│   ├── 02_schemas.js                               // schema
│   ├── 03_subs.js                                  // 全局订阅
│   └── 04_routerMeta.js                            // 路由配置
├── package.json
├── private
│   ├── README.md
│   ├── basicCollections
│   │   └── app.json
│   └── demo-data
├── public
│   ├── favicon.ico
│   ├── fonts
│   ├── img
│   └── libs
└── server
    └── main.js


```