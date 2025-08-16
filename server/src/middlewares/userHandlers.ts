import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

export function generateTokens(userId: ObjectId, data = {}) {
  const payload = { userId, ...data };

  // 生成 access_token，1d 过期
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });

  // 生成 refresh_token，3d 过期
  const refreshToken = jwt.sign(payload, 'salt_start_' + process.env.JWT_SECRET + '_salt_end', { expiresIn: '3d' });

  return { accessToken, refreshToken }
}