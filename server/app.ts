require('dotenv').config()
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
const shopRoutes = require('./src/routes/shopRoutes');
const app: Application = express();
const PORT = process.env.PORT || 3000;

// app.use('/', shopRoutes);

// 中间件
app.use(express.json()); // 解析 JSON 请求
// 日志中间件
app.use(morgan('dev'));
// 测试路由
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running!');
});

// 错误处理中间件
// 404 处理
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: '404 无法找到该资源' });
});

// 全局错误处理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 启动服务器
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
