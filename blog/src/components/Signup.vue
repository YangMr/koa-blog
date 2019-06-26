<template>
	<div class="signup-center">
		<div class="signup-box">
			<div class="signup-title">注册</div>
			<div class="signup-inner">
				<p>
					<label for="">用户名：</label>
					<el-input v-model="register.input" placeholder="请输入内容"></el-input>
				</p>
				<p>
					<label for="">密码：</label>
					<el-input placeholder="请输入密码" v-model="register.password" show-password></el-input>
				</p>
				<p>
					<label for="">重复密码：</label>
					<el-input placeholder="请输入密码" v-model="register.password2" show-password></el-input>
				</p>
				<p>
					<label for="">上传头像</label>
					<el-upload class="avatar-uploader"
				    action="https://jsonplaceholder.typicode.com/posts/"
				    :show-file-list="false"
				   :on-success="handleAvatarSuccess"
				   :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</p>
				<p>
					 <el-button type="success" @click="send" class="register">注册</el-button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
		register : {},
   //    input: '',
	  // password : '',
	  // password2 : '',
	   imageUrl: ''
    }
  },
   methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
	  send(){
		  this.$axios.post("/signup",{
			  user: this.register,
			  imgdata :  this.imageUrl
		  }).then(response=>{
			  if(response.data.message == "注册成功"){
				  let that = this;
				  this.$message({
					  message : "注册成功",
					  duration : 1000,
					  type : "success",
					  onClose(){
						   that.$router.push({name : 'signin'})
					  }
				  });
			  }else if(response.data.message == "用户名已存在"){
				  this.$message('用户名已存在');
			  }else if(response.data.message == "两次输入的密码不一致"){
				  this.$message('两次输入的密码不一致');
			  }
		  }).catch(error=>{
			  console.log(error)
		  })
	  }
    }
}
</script>

<style scoped="scoped">
	.signup-center{
		width: 1150px;
		margin: 50px auto 0;
	}
	.signup-box{
		width: 450px;
		height: 350px;
		/* border:1px solid #ccc; */
		margin: 0 auto;
		
	}
	.signup-box .signup-title{
		border-bottom:1px solid #ccc;
		text-align: center;
		font-size: 20px;
		line-height: 35px;
		font-weight: bold;
		height: 35px;
	}
	.signup-inner{
		padding: 20px;
	}
	.signup-inner p {
		margin-bottom: 20px;
	}
	.signup-inner label{
		padding-bottom: 10px;
		display: block;
	}
	.signup-inner .register{
		width: 100px;
	}
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
	width: 80px;
	height: 80px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
