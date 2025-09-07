import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express';

export class CommonController {
  private model: typeof mongoose.Model;

  constructor(model: typeof mongoose.Model) {
    this.model = model;
  }

  /**
   * 获取所有对象
   * @param req
   * @param res
   * @param next
   * @protected
   */
  protected getItems (req: Request, res: Response, next: NextFunction): void {
    this.model.find({}).then((result) => {
      res.status(200).json({
        code: 200,
        data: result,
        msg: 'success'
      });
    }).catch(err => {
      next(err)
    })
  }

  /**
   * 通过 id 查找对象
   * @param req
   * @param res
   * @param next
   * @protected
   */
  protected findItemById(req: Request, res: Response, next: NextFunction): void {
    const id = req.body.id;
    this.model.findOne({ id }).then((result) => {
      res.status(200).json({
        code: 200,
        data: result,
        msg: 'success'
      });
    }).catch(err => {
      next(err)
    })
  }

  /**
   * 创建一个对象，由成员实现
   * @param req
   * @param res
   * @param next
   * @protected
   */
  protected createItem (req: Request, res: Response, next: NextFunction): void {}

  /**
   * 删除一个对象
   * @param req
   * @param res
   * @param next
   * @protected
   */
  protected deleteItem (req: Request, res: Response, next: NextFunction): void {
    const id = req.body.id;
    this.model.findByIdAndDelete(id).then((result) => {
      res.status(200).json({
        code: 200,
        msg: '删除成功'
      })
    }).catch(err => {
      next(err)
    })
  }
}