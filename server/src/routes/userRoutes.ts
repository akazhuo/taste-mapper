import { Router } from 'express';
import { code2session, wxLogin, successLogin } from '../controllers/UserController'

const router = Router();

router.post('/codeLogin', [code2session, wxLogin], successLogin);

export default router;