<template>
	<div>
		<el-table :data="reportedInfoData" style="width: 100%" @selection-change="handleSelectionChange">
			<!-- <i class="el-icon-time"></i> -->
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="报案编号">
				<template slot-scope="scope">
					<span>{{ scope.row.reported_number }}</span>
				</template>
			</el-table-column>
			<el-table-column label="保单号">
				<template slot-scope="scope">
					<span>{{ scope.row.warrantyInfo.warrantynumber }}</span>
				</template>
			</el-table-column>
			<!-- <el-table-column label="被保人">
				<template slot-scope="scope">
					<span >{{ scope.row.warrantyInfo.recognizee }}</span>
				</template>
			</el-table-column> -->
			<el-table-column label="报案人">
				<template slot-scope="scope">
					<span>{{ scope.row.informants   }}</span>
				</template>
			</el-table-column>
			<el-table-column label="报案时间">
				<template slot-scope="scope">
					<span>{{ scope.row.reported_time  }}</span>
				</template>
			</el-table-column>
			<el-table-column label="报案电话">
				<template slot-scope="scope">
					<span>{{ scope.row.driver_mob }}</span>
				</template>
			</el-table-column>
			<el-table-column label="司机姓名">
				<template slot-scope="scope">
					<span>{{ scope.row.driver}}</span>
				</template>
			</el-table-column>
			<el-table-column label="出险时间">
				<template slot-scope="scope">
					<span>{{ scope.row.danger_time  }}</span>
				</template>
			</el-table-column>
			<el-table-column label="出险地点">
				<template slot-scope="scope">
					<span>{{ scope.row.narrowly_location }}{{ scope.row.city }}{{ scope.row.county }}{{ scope.row.road }}</span>
				</template>
			</el-table-column>
			<el-table-column label="出险原因">
				<template slot-scope="scope">
					<span>{{ scope.row.danger_cause }}</span>
				</template>
			</el-table-column>
			<el-table-column label="案件处理">
				<template slot-scope="scope">
					<span style="color: blue;" v-if="scope.row.case_state==0">未受理</span>
					<span style="color: blue;" v-if="scope.row.case_state==1">受理</span>
					<span style="color: blue;" v-if="scope.row.case_state==2">注销</span>
					<span style="color: blue;" v-if="scope.row.case_state==3">暂存</span>
				</template>
			</el-table-column>
			<el-table-column label="案件状态">
				<template slot-scope="scope">
					<span style="color: blue;" v-if="scope.row.dispose_state==0">未立案</span>
					<span style="color: blue;" v-if="scope.row.dispose_state==1">予以立案</span>
					<span style="color: blue;" v-if="scope.row.dispose_state==2">撤案</span>
					<span style="color: blue;" v-if="scope.row.dispose_state==3">注销</span>
					<span style="color: blue;" v-if="scope.row.dispose_state==4">结案</span>
				</template>
			</el-table-column>
			<!-- 			<el-table-column label="被保人电话">
				<template slot-scope="scope">
					<span>{{ scope.row.warrantyInfo.warrantynumber }}</span>
				</template>
			</el-table-column> -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				reportedInfoData:[],
				handleSelectionChange:[]
			}
		},
		methods: {

		},

		mounted() {
			this.$axios.get("http://localhost:9004//accident/getIsDispatching")
				.then(res => {
					this.reportedInfoData = res.data;
				}).catch(err => {
					console.log(err);
				});
		}
	}
</script>

<style>
</style>
