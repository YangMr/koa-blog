const config = {
	//设置启动的端口号
	port : 3000,
	
	//设置数据库配置信息
	database : {
		DATABASE : "nodesql", //数据库名称
		USERNAME : "root", //数据库用户名 
		PASSWORD : "asdqwe123", //数据库密码
		PORT : "3306",   //数据库端口号
		HOST : "localhost" //数据库地址
	}
}

//导出config
module.exports = config;