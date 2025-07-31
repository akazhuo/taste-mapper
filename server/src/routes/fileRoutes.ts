import express from 'express';
import multer from 'multer';
import fs from 'fs';

const router = express.Router()
const app = express();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const file = multer({ storage })

// 创建 file 目录 (如果不存在)
const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}

// app.use(file.any())

router.post('/upload', file.single('file'), (req, res) => {
  if (req.file) {
    console.log(req.file)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.send({
      msg: '上传成功',
      data: {
        fileName: req.file.filename
      }
    })
  } else {
    res.status(400).send('No file uploaded.');
  }
})

export default router;