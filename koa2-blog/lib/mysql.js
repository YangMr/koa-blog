//引入mysql模块
const mysql = require("mysql");
//引入配置信息
const config = require("../config/default.js");
//创建数据库连接池
const pool = mysql.createPool({
	host : config.database.HOST,
	user : config.database.USERNAME,
	password : config.database.PASSWORD,
	database : config.database.DATABASE
});

//封装数据库连接池会话
const query = function(sql,values){
	return new Promise((resolve,reject)=>{
		//创建会话
		pool.getConnection((error,connection)=>{
			if(error){
				reject(error)
			}else{
				//执行sql语句
				connection.query(sql,values=null,(error,results)=>{
					if(error){
						reject(error)
					}else{
						resolve(results);
					}
					//结束会话
					connection.release();
				});
			}
		})
	})
};


//使用user变量保存创建user表的sql语句
let users = `
	create table if not exists users(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	pass VARCHAR(100) NOT NULL,
	avator VARCHAR(100) NOT NULL,
	moment VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
	); 
`

//使用posts变量保存创建posts表的sql语句
let posts =
    `create table if not exists posts(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     title TEXT(0) NOT NULL,
     content TEXT(0) NOT NULL,
     md TEXT(0) NOT NULL,
     uid VARCHAR(40) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     comments VARCHAR(200) NOT NULL DEFAULT '0',
     pv VARCHAR(40) NOT NULL DEFAULT '0',
     avator VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`


//使用comment变量保存创建comment表的sql语句
let comment =
    `create table if not exists comment(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     content TEXT(0) NOT NULL,
     moment VARCHAR(40) NOT NULL,
     postid VARCHAR(40) NOT NULL,
     avator VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`
	
//如果要创建表的话，我们需要执行sql语句
let createTable = function(sql){
	return query(sql);
}
createTable(users);
createTable(posts);
createTable(comment);


/*设置接口方法*/
//注册用户
let insertData = function(value){
	// let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
	let _sql = `insert into users (name,pass,avator,moment) values ('${value[0]}','${value[1]}','${value[2]}','${value[3]}')`
	return query(_sql,value);
}
//删除用户
let deleteUserData = function(name){
	let _sql = `delete from users where name="${name}";`
	return query(_sql);
}
//查找用户
let findUserData = function(name){
	let _sql = `select * from users where name = "${name}";`
	return query(_sql);
}
//发表文章
let insertPost = function(value){
	let _sql = "insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;";
	return query(_sql,value);
}
//更新文章评论数
let updatePostComment = function(value){
	let _sql = "update posts set comments=? where id=?"
	return query(_sql,value);
}
//更新浏览数
let updatePostPv = function(value){
	let _sql = "update posts set pv=? where id=?;"
	return query(_sql,value);
}
//发表评论
let insertComment = function(value){
	let _sql = "insert into comment set name=?,content=?,postid=?,avator=?;";
	return query(_sql,value);
}
//通过名字查找用户
let findDataByName = function(name){
	let _sql = `select * from users where name = "${name}";`;
	return query(_sql);
}
//通过文章的名字查找用户
let findDataByUser = function ( name ) {
  let _sql = `select * from posts where name="${name}";`
  return query( _sql)
}
//通过文章id查找
// 通过文章id查找
let findDataById = function ( id ) {
  let _sql = `select * from posts where id="${id}";`
  return query( _sql)
}
//通过评论id查找
let findCommentById = function ( id ) {
  let _sql = `select * FROM comment where postid="${id}";`
  return query( _sql)
}
//查询所有文章
let findAllPost = function () {
  let _sql = ` select * FROM posts;`
  return query( _sql)
}
// 查询分页文章
let findPostByPage = function (page) {
  let _sql = ` select * FROM posts limit ${(page-1)*10},10;`
  return query( _sql)
}
// 查询个人分页文章
let findPostByUserPage = function (name,page) {
  let _sql = ` select * FROM posts where name="${name}" order by id desc limit ${(page-1)*10},10 ;`
  return query( _sql)
}
// 更新修改文章
let updatePost = function(values){
  let _sql = `update posts set  title=?,content=?,md=? where id=?`
  return query(_sql,values)
}
// 删除文章
let deletePost = function(id){
  let _sql = `delete from posts where id = ${id}`
  return query(_sql)
}
// 删除评论
let deleteComment = function(id){
  let _sql = `delete from comment where id=${id}`
  return query(_sql)
}
// 删除所有评论
let deleteAllPostComment = function(id){
  let _sql = `delete from comment where postid=${id}`
  return query(_sql)
}
// 查找评论数
let findCommentLength = function(id){
  let _sql = `select content from comment where postid in (select id from posts where id=${id})`
  return query(_sql)
}
// 滚动无限加载数据
let findPageById = function(page){
  let _sql = `select * from posts limit ${(page-1)*5},5;`
  return query(_sql)
}
//评论分页
let findCommentByPage = function(page,postId){
  let _sql = `select * from comment where postid=${postId} order by id desc limit ${(page-1)*10},10;`
  return query(_sql)
}

module.exports = {
	query,
	createTable,
	insertData,
  	deleteUserData,
  	findUserData,
	findDataByName,
  	insertPost,
  	findAllPost,
  	findPostByPage,
	findPostByUserPage,
	findDataByUser,
	findDataById,
	insertComment,
	findCommentById,
	updatePost,
	deletePost,
	deleteComment,
	findCommentLength,
	updatePostComment,
	deleteAllPostComment,
	updatePostPv,
	findPageById,
	findCommentByPage
}