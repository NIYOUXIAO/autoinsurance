<template>
	<div>
		<div class="box">
			<h2>登录</h2>
			<div id="error_box"></div>
			<div class="input_box">
				<input type="text" placeholder="请输入账户名" id="username" v-model="username" />
			</div>
			<div class="input_box">
				<input type="password" placeholder="请输入密码" id="userpassword" v-model="userpassword" />
			</div>
			<div class="input_box">
				<button @click="fnLogin()">登录</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				userpassword: ''
			}
		},
		mounted() {},
		computed: {
			// nowTableData() {
			// 	return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize) || [];
			// }
		},
		methods: {
			fnLogin() {
				if (this.username != "" && this.userpassword != "") {
					this.$axios.get("http://localhost:9001//getUser/Ulogin/" + this.username + "/" + this.userpassword)
						.then(res => {
							if(res.data!=null){
								sessionStorage.setItem("user", JSON.stringify(res.data));
								this.$router.push('/main')
							}
						}).catch(err => {
							console.log(err);
						});
				}
			}
		}


	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		font-family: "微软雅黑";
		font-size: 12px;
	}

	.box {
		width: 390px;
		height: 320px;
		border: solid 1px #ddd;
		background: #FFF;
		position: absolute;
		left: 50%;
		top: 42%;
		margin-left: -195px;
		margin-top: -160px;
	}

	.box h2 {
		font-weight: normal;
		color: #666;
		font-size: 16px;
		line-height: 46px;
		height: 46px;
		overflow: hidden;
		text-align: center;
		border-bottom: solid 1px #ddd;
		background: #f7f7f7;
	}

	.input_box {
		width: 350px;
		padding-bottom: 15px;
		margin: 0 auto;
		overflow: hidden;
	}

	.input_box input {
		float: left;
		width: 348px;
		height: 40px;
		font-size: 14px;
		border: solid 1px #ddd;
		text-indent: 10px;
		outline: none;
		line-height: 40px;
	}

	.input_box button {
		width: 350px;
		height: 48px;
		background: #3f89ec;
		border: none;
		border-radius: 2px;
		outline: none;
		cursor: pointer;
		font-size: 16px;
		color: #FFF;
	}

	#error_box {
		height: 40px;
		width: 350px;
		margin: 0 auto;
		line-height: 40px;
		color: #fc4343;
	}
</style>
