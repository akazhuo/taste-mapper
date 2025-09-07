import { Request, Response, NextFunction } from 'express'
import { TasteModel, Taste } from '../models/taste';

export const getItems = function(req: Request, res: Response, next: NextFunction) {
  TasteModel.find({}, "title pics shop date").then(function(dataList) {
    res.status(200).json({
      code: 200,
      data: dataList
    });
  }).catch(function(err) {
    next(err)
  })
}

export const createItem = function(req: Request, res: Response, next: NextFunction) {
  const reqData = req.body;
  const taste = new TasteModel({
    title: reqData.title,
    comment: reqData.comment,
    pics: reqData.pics,
    date: reqData.date,
    shop: reqData.shop,
  });
  taste.save().then((saved) => {
    res.status(200).json({
      msg: '添加成功',
      code: 200,
      data: saved,
    })
  }).catch((err) => {
    // res.status(500).json({
    //   msg: err.message,
    //   code: 500
    // });
    next(err)
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