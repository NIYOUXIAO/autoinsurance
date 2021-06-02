<template>
	<div>
		<div class="main-top">
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">&nbsp;</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						<span style="font-size: 25px;">车险理赔系统</span>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<span style="font-size: 15px;">欢迎您!!!&nbsp;&nbsp;{{username}}</span>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="main_body">
			<el-aside width="200px">
				<el-menu :default-openeds="ddd" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
				 background-color="#B3C0D1" text-color="#2c3e50" active-text-color="#ffd04b">
					<el-submenu v-for="(l,index) in menus" :key="index" :index="'1-'+l.mid">
						<template slot="title">
							<!-- <i :class="l.img_url"></i> -->
							<span>{{l.mname}}</span>
						</template>
						<!-- <el-submenu v-for="(c,index2) in l.menus" :key="index2" :index="'1-'+c.mid">
							<template slot="title"><span style="color: white;">{{c.mname}}</span></template>
						</el-submenu> -->
						<router-link v-for="(c,index2) in  l.menus" :key="index2" :to="'/'+c.murl" tag="el-menu-item" ><a style="color: white;">{{c.mname}}</a></router-link>
					</el-submenu>
				</el-menu>
			</el-aside>
		</div>
		<div>
			<el-main>
				<router-view></router-view>
			</el-main>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: {},
				menus: {},
				username:''
			}
		},
		mounted() {
			this.list = JSON.parse(sessionStorage.getItem("user"));
			this.username = this.list.username;
			this.$axios.get("http://localhost:9003//menus/getMenus/" + this.list.userid)
				.then(res => {
					this.menus = res.data;
				}).catch(err => {
					console.log(err);
				});
		},
		computed: {

		},
		methods: {}


	}
</script>

<style>
	.main_body {
		/* line-height: 0px; */
		width: 100%;
		/* margin-top: -50px; */
	}

	.el-aside {
		color: #333;
		position: absolute;
	}

	.el-main {
		color: #333;
		text-align: center;
		width: 86%;
		float: right;

	}

	.main-top {
		width: 100%;
		height: 60px;
		margin-top: -40px;
		background-color: rgb(179, 192, 209);
		line-height: 60px;
	}
	.el-submenu{
		height: 600px;
	}
</style>
