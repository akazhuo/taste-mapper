import Config from '../config/config'
import { NextFunction, Request, Response } from 'express'
import axios from 'axios';
import UserModel from '../models/user'
import { generateTokens } from '../middlewares/userHandlers'
import { HydratedDocument, Require_id } from 'mongoose'

interface LoginResponse {
  data: {
    session_key: string;
    unionid: string;
    openid: string;
    errmsg?: string;
    errcode?: string;
  }
}
/**
 * 通过 code 换取用户 openID、UnionID、session_key
 * @param code
 */
export const code2session = (req: Request, res: Response, next: NextFunction) => {
  const appid = Config.appId;
  const secret = Config.appSecret;
  const { code } = req.body;
  const url = `https://api.weixin.qq.com/sns/jscode2session`;

  axios.get(url, {
    params: {
      appid,
      secret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  }).then((response: LoginResponse) => {
    // 讲微信返回的 { session_key, openid } 放到 req.body 传递到下一个中间件
    req.body = response.data
    next()
  }).catch((error: Error) => {
    console.log(error)
    res.status(401).end(JSON.stringify(error));
    next()
  })
}

/**
 * 通过自定义方法，使用 session_key 和 openid 自定义登录
 * @param req
 * @param res
 * @param next
 */
export async function wxLogin (req: Request, res: Response, next: NextFunction) {
  const { session_key, openid } = req.body;
  if ( !openid ) {
    res.status(401).end('无法获取 openid');
  }

  // 查找用户
  let user = await UserModel.findOne({ where: { openid } });
  // 用户不存在，创建用户
  if ( !user ) {
    user = await UserModel.create({
      nickName: `微信用户${openid.substring(0, 8)}`,
      openid: openid,
      avatar: ''
    })
  }
  // 生成 token
  const { accessToken, refreshToken } = generateTokens(user._id, { openid, session_key})
  // 保存 refreshToken 到数据库
  user.refreshToken = refreshToken;
  await user.save()

  req.body = {
    user,
    accessToken,
    refreshToken,
  }
  next()
}

export const successLogin = (req: Request, res: Response) => {
  res.status(200).json({
    msg: 'success',
    result: { ...req.body }
  });
}