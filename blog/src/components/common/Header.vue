<template>
	<div class="header">
		<div class="header-center clearfix">
			<div class="header-left">
				<div class="logo"></div>
				<div class="welcome">欢迎登陆注册</div>
			</div>
			<ul class="header-right">
				<li><a href="https://github.com/YangMr">Github</a></li>
				<!-- <router-link  :to="{path : 'https://github.com/YangMr'}" tag="li"><a>Github</a></router-link> -->
				<router-link :to="{path : 'https://github.com/YangMr'}" tag="li"><a>全部文章</a></router-link>
				<router-link :to="{name : 'signup'}" tag="li"><a>注册</a></router-link>
				<router-link :to="{name : 'signin'}" tag="li"><a>登陆</a></router-link>
			</ul>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.header{
		width: 100%;
		background: #333;
	}
	.header-center{
		width: 1150px;
		margin: 0 auto;
		height:40px;
		line-height: 40px;
		color : #eee;
	}
	.header .header-left{
		float: left;
	}
	.header .header-right{
		float: right;
	}
	.header .header-right li{
		float: left;
		padding:0 10px;
		margin: 0 5px;
	}
	.header .header-right a{
		color: #eee;
	}
	
	
</style>
