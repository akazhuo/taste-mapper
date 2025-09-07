import Config from '../config/config'
import { NextFunction, Request, Response } from 'express'
import axios from 'axios';
import UserModel from '../models/user'
import jwt from 'jsonwebtoken'
import { HydratedDocument, ObjectId, Require_id } from 'mongoose'

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
 */
export function code2session (req: Request, res: Response, next: NextFunction) {
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
 * 生成 token 中间件
 * @param userId
 * @param data
 */
export function generateTokens(userId: ObjectId, data = {}) {
  const payload = { userId, ...data };

  // 生成 access_token，1d 过期
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

  // 生成 refresh_token，3d 过期
  const refreshToken = jwt.sign(payload, 'salt_start_' + process.env.JWT_SECRET + '_salt_end', { expiresIn: '3d' });

  return { accessToken, refreshToken }
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

export function refreshToken(req: Request, res: Response, next: NextFunction) {

}

/**
 * 登录成功返回状态到前端
 * @param req
 * @param res
 */
export const successLogin = (req: Request, res: Response) => {
  res.status(200).json({
    msg: 'success',
    result: { ...req.body }
  });
}