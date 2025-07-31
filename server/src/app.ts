require('dotenv').config()
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler'
import './middlewares/dbHandler'
import TasteRoutes from './routes/tasteRoutes'
import FileRoutes from './routes/fileRoutes'
// bodyParser 处理中文乱码
import bodyParser from 'body-parser';
const app: Application = express();

// 中间件
app.use(express.json()); // 解析 JSON 请求
app.use(express.urlencoded({ extended: false }));
// 日志中间件
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 测试路由
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running!');
});
app.use('/taste', TasteRoutes);
app.use('/file', FileRoutes);

// 静态资源文件夹
app.use('/uploads', express.static('public/uploads'))
// 错误处理中间件
// 404 处理
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: '404 无法找到该资源' });
});

// 全局错误处理
app.use(errorHandler);

export default app;