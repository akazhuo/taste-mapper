import { Request, Response, NextFunction } from 'express'
import jwt, { JsonWebTokenError, JwtPayload, Secret, VerifyCallback, VerifyErrors } from 'jsonwebtoken'
import UserModel from '../models/user'
import mongoose from 'mongoose'

function handleVerifyError(this: Response, err: jwt.VerifyErrors) {
  if(err.name === 'TokenExpiredError') {
    this.status(401).json({
      error: 'Token expired',
      code: 401,
    })
  } else {
    this.status(401).json({
      error: 'Invalid Token',
      code: 403,
    })
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({
      error: 'No access token provided',
      code: 401,
    })
    return next('router')
  }

  jwt.verify(token, process.env.JWT_SECRET as Secret, (err, decoded) => {
    if (err) {
      handleVerifyError.call(res, err)
      return next('router')
    }

    // 将用户信息存储到请求对象中
    req.body = {
      user: decoded
    }
    next()
  })
}

export function verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({
      error: 'No refresh token provided',
      code: 401,
    })
    return next('router')
  }

  jwt.verify(refreshToken, 'salt_start_' + process.env.JWT_SECRET + '_salt_end' as Secret, (err: any, decoded: any) => {
    if (err) {
      handleVerifyError.call(res, err)
      return next('router')
    }

    // 查找用户
    const user = UserModel.findOne({ _id: new mongoose.Types.ObjectId(decoded.userId) })

    next()
  })
}