import { Request, Response, NextFunction } from 'express'
import { TasteModel, Taste } from '../models/taste';

export const getItems = function(req: Request, res: Response, next: NextFunction) {
  TasteModel.find({}, "title pics shop date").then(function(dataList) {
    res.send(dataList);
  }).catch(function(err) {
    next(err)
  })
}

export const createItem = function(req: Request, res: Response, next: NextFunction) {
  const reqData = req.body;
  const taste = new TasteModel({
    title: req.body.title,
    comment: req.body.comment,
    pics: req.body.pics,
    date: req.body.date,
    shop: req.body.shop,
  });
  taste.save().then((saved) => res.status(200).send(
    {
      msg: '添加成功',
      code: 200,
    }
  )).catch((err) => {
    res.status(500).send({
      msg: err.message,
      code: 500
    });
    next()
  });
}

export const delItem = function(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  TasteModel.findByIdAndDelete(req.body.id).then((r) => res.status(200).send(
    {
      msg: '删除成功',
      code: 200,
    }
  )).catch((err) => {
    res.status(500).send({
      msg: err.message,
      code: 500
    });
    next()
  })
}