// 导入 mongoose 模块
import mongoose from "mongoose";

// 设置默认 mongoose 连接
const mongoDB = "mongodb://127.0.0.1/my_database";
mongoose.connect(mongoDB).then(r => {}).catch(err => {
  err.log(err);
});
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
// 将连接与错误事件绑定（以获得连接错误的提示）
mongoose.connection.on("error", console.error.bind(console, "MongoDB 连接错误："));