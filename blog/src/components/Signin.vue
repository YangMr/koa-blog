<template>
	<div class="signin-center">
		<div class="signin-box">
			<div class="signin-title">登陆</div>
			<div class="signin-inner">
				<p>
					<label for="">用户名：</label>
					<el-input v-model="login.input" placeholder="请输入内容"></el-input>
				</p>
				<p>
					<label for="">密码：</label>
					<el-input placeholder="请输入密码" v-model="login.password" show-password></el-input>
				</p>
				<p>
					 <el-button type="success" @click="send" class="login">登陆</el-button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				login : {}
			}
		},
		methods : {
			async send(){
				let a = await this.$axios.post("/signin",{data : this.login});
				console.log(a)
				 if(a.data.message == "登陆成功"){
					 let that = this;
					 this.$message({
						 message : "登陆成功",
						 duration : 1000,
						 onClose(){
							 that.$router.push({name : 'home'})
						 }
					 })
				 }else{
					 this.$message({
						message : "用户名或密码错误",
						duration : 1000
					}) 
				 }
			}
		}
	}
</script>

<style>
	.signin-center{
		width: 1150px;
		margin: 50px auto 0;
	}
	.signin-box{
		width: 450px;
		height: 350px;
		/* border:1px solid #ccc; */
		margin: 0 auto;
		
	}
	.signin-box .signin-title{
		border-bottom:1px solid #ccc;
		text-align: center;
		font-size: 20px;
		line-height: 35px;
		font-weight: bold;
		height: 35px;
	}
	.signin-inner{
		padding: 20px;
	}
	.signin-inner p {
		margin-bottom: 20px;
	}
	.signin-inner label{
		padding-bottom: 10px;
		display: block;
	}
	.signin-inner .login{
		width: 100px;
	}
</style>
