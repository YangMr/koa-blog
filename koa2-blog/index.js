//引入koa
const Koa = require("koa");
//引入path
const path = require("path");
//引入body-parser
const bodyParser = require("koa-bodyparser");
//引入数据库信息和启动端口号的信息文件default.js
const config = require("./config/default.js");
//引入操作数据的模块
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");

//引入koa-cors
const koaCors = require("koa-cors");

//引入路由
const router = require("koa-router");
//引入koa-static
const koaStatic = require("koa-static");
//使用koa
const app = new Koa();


app.use(bodyParser())


//设置session存储配置
const sessionMysqlConfig = {
	user : config.database.USERNAME,
	password : config.database.PASSWORD,
	database : config.database.DATABASE,
	host : config.database.HOST
}
//配置session中间件
app.use(session({
	key : "USER_SID",
	store : new MysqlStore(sessionMysqlConfig)
}))
app.use(koaCors());
//配置静态资源目录
app.use(koaStatic(path.join(__dirname,"./public")))

//注册路由
const signup = require("./routers/signup");
const signin = require("./routers/signin");
app.use(signup.routes())
app.use(signin.routes());

//设置监听的 端口号
app.listen(config.port,()=>{
	console.log(`http://localhost:${config.port}`)
})