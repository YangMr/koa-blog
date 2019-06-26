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
router.post("/signup",async (ctx,next)=>{
	//1. 获取前台发送过来的数据
	const data = ctx.request.body;
	console.log(ctx.request.body)
	//2. 调用查找用户名的方法判断改用户名是否注册，如果注册，则返回1
	await userModel.findUserData(data.user.input).then(async result=>{
		if(result.length){
			try{
				throw Error("用户名已存在")
			}catch(error){
				console.log(error)
			}
			ctx.body = {
				code : 500,
				message : "用户名已存在"
			}
		}else if(data.user.password !== data.user.password2 || data.user.password.trim() == ""){	//3. 判断两次密码是否输入一致，如果不一致，则返回2
			ctx.body = {
				code : 500,
				message : "两次输入的密码不一致"
			}
		}else{//4. 将数据写入到数据库
			await userModel.insertData([data.user.input,md5(data.user.password),data.imgdata,moment().format('YYYY-MM-DD HH:mm:ss')]).then(async response=>{
				console.log("注册成功:" +result);
				ctx.body = {
					 code: 200,
                     message: '注册成功'
				}
			})
		}
	})
});

//导出路由模块
module.exports = router