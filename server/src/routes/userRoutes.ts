import { Router } from 'express';
import { code2session, wxLogin, successLogin } from '../controllers/UserController'
import { verifyRefreshToken } from '../middlewares/authMiddleware'

const router = Router();

router.post('/codeLogin', [code2session, wxLogin], successLogin);
router.post('/refreshToken', verifyRefreshToken)

export default router;