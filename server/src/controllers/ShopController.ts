import { Request, Response } from 'express';
// 示例数据 (临时数据库)
let books = [
  { id: 1, title: 'Node.js Guide', author: 'John Doe' },
  { id: 2, title: 'Express Basics', author: 'Jane Smith' }
];
// 示例控制器方法
exports.getAllBooks = (req: Request, res: Response) => {
  res.json(books);
};
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