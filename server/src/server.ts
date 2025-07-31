import app from './app'
import config from './config/config';

// 启动服务器
app.listen(config.port, () =>
  console.log(`Server running on http://localhost:${config.port}`)
);
