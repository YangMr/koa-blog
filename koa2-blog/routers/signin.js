//引入路由模块
const router = require("koa-router")();
//引入操作数据库文件
const userModel = require("../lib/mysql.js");
//引入md5模块
const md5 = require("md5");
//引入moment模块
const moment = require("moment");
//引入fs模块
const fs = require("fs");

//设置注册接口
router.post("/signin",async (ctx,next)=>{
	//1. 获取前台发送过来的数据
	const data = ctx.request.body;
	console.log(ctx.request.body);
	//2.根据前台发送的用户名返回所需要的数据
	await userModel.findDataByName(data.data.input).then(async result=>{
		if(result.length && data.data.input == result[0]['name'] && md5(data.data.password) == result[0]["pass"]){
			ctx.body = {
				code : 200,
				message : "登陆成功"
			}
		}else{
			ctx.body = {
				code : 500,
				message : "用户名或密码错误"
			}
		}
	})
	
});

//导出路由模块
module.exports = router