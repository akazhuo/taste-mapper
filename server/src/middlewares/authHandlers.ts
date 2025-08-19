import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({
      error: 'No access token provided',
      code: 401,
    })
    return next('router')
  }

  jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
    if (err) {
      if(err.name === 'TokenExpiredError') {
        res.status(401).json({
          error: 'Access Token expired',
          code: 401,
        })
      } else {
        res.status(403).json({
          error: 'Invalid Access Token',
          code: 403,
        })
      }
      return next('router')
    }

    // 将用户信息存储到请求对象中
    req.body = {
      user: decoded
    }
    next()
  })
}