// 2. Directory Structure Design (Single Service)
/*
backend/
├── app.js                   # Entry file for the application
├── routes/                  # Routing directory
│   ├── generalRoutes.js     # General information routes
│   ├── economyRoutes.js     # Economy information routes
│   ├── environmentRoutes.js # Environment information routes
├── controllers/             # Controller directory
│   ├── generalController.js # General information controller
│   ├── economyController.js # Economy information controller
│   ├── environmentController.js # Environment information controller
├── services/                # Service layer directory
│   ├── generalService.js    # General information service
│   ├── economyService.js    # Economy information service
│   ├── environmentService.js # Environment information service
└── package.json             # Dependencies for the application
*/


// 2. Directory Structure Design (Microservices)
/*
backend/
├── generalService/              # Service for city general information
│   ├── app.js                   # Entry file for general service
│   ├── routes/                  # Routing directory for general info
│   │   ├── generalRoutes.js
│   ├── controllers/             # Controller directory for general info
│   │   ├── generalController.js
│   ├── services/                # Service layer for general info
│   │   ├── apiService.js
│   └── package.json             # Dependencies for general service
├── economyService/              # Service for city economy information
│   ├── app.js                   # Entry file for economy service
│   ├── routes/                  # Routing directory for economy info
│   │   ├── economyRoutes.js
│   ├── controllers/             # Controller directory for economy info
│   │   ├── economyController.js
│   ├── services/                # Service layer for economy info
│   │   ├── apiService.js
│   └── package.json             # Dependencies for economy service
├── environmentService/          # Service for city environment information
│   ├── app.js                   # Entry file for environment service
│   ├── routes/                  # Routing directory for environment info
│   │   ├── environmentRoutes.js
│   ├── controllers/             # Controller directory for environment info
│   │   ├── environmentController.js
│   ├── services/                # Service layer for environment info
│   │   ├── apiService.js
│   └── package.json             # Dependencies for environment service
└── apiGateway/                  # API Gateway to integrate microservices
    ├── app.js                   # Entry file for API Gateway
    ├── routes/                  # Gateway routing
    │   ├── cityRoutes.js        # Routes for different microservices
    └── package.json             # Dependencies for API Gateway
*/
技术：
Express 提供了一个抽象层，能够接收和处理 HTTP 请求，返回 HTTP 响应
负责处理 Web 请求和响应
通过 Node.js 的运行环境被启动起来


使用单体程序的原因：模块之间交互少，模块功能简单，只是调用web api，使用微服务架构可能过度设计，增加不必要的复杂性。