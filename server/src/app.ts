require('dotenv').config()
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler'
import './middlewares/dbHandler'
import TasteRoutes from './routes/tasteRoutes'
import FileRoutes from './routes/fileRoutes'
import UserRoutes from './routes/userRoutes'
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
app.use('/user', UserRoutes);

// 静态资源文件夹
app.use('/uploads', express.static('public/uploads'))
app.use('/images', express.static('public/images'))
// 错误处理中间件
app.use(errorHandler);

export default app;