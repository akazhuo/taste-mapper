import { NextFunction, Request, Response } from 'express';
import { ShopModel } from '../models/shop'
import { CommonController } from './CommonController'
import mongoose from 'mongoose'
// 示例数据 (临时数据库)
let books = [
  { id: 1, title: 'Node.js Guide', author: 'John Doe' },
  { id: 2, title: 'Express Basics', author: 'Jane Smith' }
];

class ShopController extends CommonController {
  constructor(ShopModel: typeof mongoose.Model) {
    super(ShopModel)
  }
  protected createItem(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const shop = new ShopModel({
      title: data.title,
      location: data.location,
    })
    shop.save().then((saved) => {
      res.status(200).json({
        code: 200,
        msg: '添加成功',
        data: saved,
      })
    }).catch((err) => {
      next(err)
    })
  }
}

export default new ShopController(ShopModel)


// 获取单个资源
exports.getBookById = (req: Request, res: Response) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
}
// 创建资源
exports.createBook = (req: Request, res: Response) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Missing title or author' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
}
// 更新资源
exports.updateBook = (req: Request, res: Response) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
}
// 删除资源
exports.deleteBook = (req: Request, res: Response) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books.splice(index, 1);
  res.status(204).send(); // 204 No Content
}