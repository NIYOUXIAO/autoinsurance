<template>
	<div>
		<el-row>
			<el-col :span="5">
				<div class="grid-content bg-purple">
					查询条件:&nbsp;&nbsp;&nbsp;
					<el-input v-model="input" placeholder="报案编号" style="width: 60%;"></el-input>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content bg-purple-light">
					<el-input v-model="input" placeholder="被保人" style="width: 50%;"></el-input>
				</div>
			</el-col>
			<el-col :span="5">
				<div class="grid-content bg-purple">
					<el-input v-model="input" placeholder="车牌号码" style="width: 60%;"></el-input>
					&nbsp;&nbsp;&nbsp;
					<el-button type="primary">查询</el-button>
				</div>
			</el-col>
			<el-col :span="10">
				<div class="grid-content bg-purple">
					&nbsp;&nbsp;
					<el-button type="warning" @click="dialogTableVisible=true">新增</el-button>
					<el-button type="success" @click="baoanchuli()">报案处理</el-button>
					<el-button type="success" @click="ajsh()">案件审核</el-button>
					<router-link :to="'/'+'dispatching'">
						<el-button type="success">派工调度</el-button>
					</router-link>
				</div>
			</el-col>
		</el-row>
		<br />
		<br />
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
		<el-dialog title="新增出险信息" :visible.sync="dialogTableVisible">
			<el-row>
				<!-- <el-col :span="8">
					<div class="grid-content bg-purple">
						报案编号: <el-input v-model="input" style="width: 60%;"></el-input>
					</div>
				</el-col> -->
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						报案时间: <el-input v-model="ReportedInfo.reportedTime" style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						出险时间: <el-input v-model="ReportedInfo.dangerTime" style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						司机电话: <el-input v-model="ReportedInfo.driverMob" style="width: 60%;"></el-input>
					</div>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						报案人: <el-input v-model="ReportedInfo.informants" style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						出险原因:
						<el-select v-model="value" placeholder="请选择" style="width: 60%;">
							<!-- 	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option> -->
						</el-select>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						事故类型: <el-input v-model="ReportedInfo.dangerAreaType" style="width: 60%;"></el-input>
					</div>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						报案电话: <el-input v-model="ReportedInfo.driverMob " style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						司机姓名: <el-input v-model="ReportedInfo.driver" style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						保险单号: <el-input v-model="ReportedInfo.warrantyNumber" style="width: 60%;"></el-input>
					</div>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						车险所在省份:
						<el-select v-model="ReportedInfo.narrowlyLocation" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in sheng" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						车险地点所在市:
						<el-select v-model="ReportedInfo.city" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in shi" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						出险地点所在县/区:
						<el-select v-model="ReportedInfo.county" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in qu" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						出险所在路段: <el-input v-model="ReportedInfo.road" style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						出险区域类型: <el-input v-model="ReportedInfo.dangerAreaType" style="width: 60%;"></el-input>
					</div>
				</el-col>
			</el-row>
			<br></br>
			<el-row>
				<el-col :span="18">
					<div class="grid-content bg-purple-dark">出险经过: <el-input v-model="ReportedInfo.dangerPass" type="textarea" style="width: 80%;"></el-input>
					</div>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">&nbsp;</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">&nbsp;</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-button type="success" @click="addAccident()">确定</el-button>
						<el-button type="danger" @click="dialogTableVisible=false">取消</el-button>
					</div>
				</el-col>
			</el-row>
		</el-dialog>


		<el-dialog title="案件处理" :visible.sync="anjianchuliTable">
			<br />
			<el-row>

				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						报案时间: <el-input v-model="reportedInfoData1.reported_time" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						司机电话: <el-input v-model="reportedInfoData1.driver_mob" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						报案人: <el-input v-model="reportedInfoData1.informants" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						出险原因:
						<el-select v-model="value" disabled=true placeholder="请选择" style="width: 60%;">
							<!-- 	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option> -->
						</el-select>
					</div>
				</el-col>

			</el-row>
			<br />
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						报案电话: <el-input v-model="reportedInfoData1.driver_mob " disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						司机姓名: <el-input v-model="reportedInfoData1.driver" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<!-- <el-col :span="8">
					<div class="grid-content bg-purple-light">
						保险单号: <el-input v-model="ReportedInfo.warrantyNumber" style="width: 60%;"></el-input>
					</div>
				</el-col> -->
			</el-row>
			<br />
			<!-- <el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						车险所在省份:
						<el-select v-model="ReportedInfo.narrowlyLocation" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in sheng" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						车险地点所在市:
						<el-select v-model="ReportedInfo.city" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in shi" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						出险地点所在县/区:
						<el-select v-model="ReportedInfo.county" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in qu" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
			</el-row> -->
			<br />
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						出险所在路段: <el-input v-model="reportedInfoData1.road" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<!-- <el-col :span="12">
					<div class="grid-content bg-purple-light">
						出险区域类型: <el-input v-model="reportedInfoData1.danger_area_type" style="width: 60%;"></el-input>
					</div>
				</el-col> -->
			</el-row>
			<br></br>
			<div>
				<el-radio-group v-model="radio1">
					<el-radio-button label="注销"></el-radio-button>
					<el-radio-button label="受理"></el-radio-button>
					<el-radio-button label="暂存"></el-radio-button>
				</el-radio-group>
			</div>
			<br />
			<br />
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">&nbsp;</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">&nbsp;</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-button type="success" @click="updateAccident()">确定</el-button>
						<el-button type="danger" @click="anjianchuliTable=false">取消</el-button>
					</div>
				</el-col>
			</el-row>
		</el-dialog>



		<el-dialog title="案件审核" :visible.sync="anjianshenheTable">
			<el-row>
			
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						报案时间: <el-input v-model="reportedInfoData1.reported_time" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						司机电话: <el-input v-model="reportedInfoData1.driver_mob" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						报案人: <el-input v-model="reportedInfoData1.informants" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						出险原因:
						<el-select v-model="value" disabled=true placeholder="请选择" style="width: 60%;">
							<!-- 	<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option> -->
						</el-select>
					</div>
				</el-col>
			
			</el-row>
			<br />
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						报案电话: <el-input v-model="reportedInfoData1.driver_mob " disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						司机姓名: <el-input v-model="reportedInfoData1.driver" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<!-- <el-col :span="8">
					<div class="grid-content bg-purple-light">
						保险单号: <el-input v-model="ReportedInfo.warrantyNumber" style="width: 60%;"></el-input>
					</div>
				</el-col> -->
			</el-row>
			<br />
			<!-- <el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						车险所在省份:
						<el-select v-model="ReportedInfo.narrowlyLocation" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in sheng" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">
						车险地点所在市:
						<el-select v-model="ReportedInfo.city" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in shi" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						出险地点所在县/区:
						<el-select v-model="ReportedInfo.county" placeholder="请选择" style="width: 40%;">
							<el-option v-for="item in qu" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</el-col>
			</el-row> -->
			<br />
			<el-row>
				<el-col :span="12">
					<div class="grid-content bg-purple">
						出险所在路段: <el-input v-model="reportedInfoData1.road" disabled=true style="width: 60%;"></el-input>
					</div>
				</el-col>
				<!-- <el-col :span="12">
					<div class="grid-content bg-purple-light">
						出险区域类型: <el-input v-model="reportedInfoData1.danger_area_type" style="width: 60%;"></el-input>
					</div>
				</el-col> -->
			</el-row>
			<br />
			<br />
			<div>
				<el-radio-group v-model="radio2">
					<el-radio-button label="予以立案"></el-radio-button>
					<el-radio-button label="撤案"></el-radio-button>
					<el-radio-button label="注销"></el-radio-button>
					<el-radio-button label="结案"></el-radio-button>
				</el-radio-group>
			</div>
			<br />
			<el-row>
				<el-col :span="8">
					<div class="grid-content bg-purple">&nbsp;</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple-light">&nbsp;</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content bg-purple">
						<el-button type="success" @click="anjianshenheupd()">确定</el-button>
						<el-button type="danger" @click="anjianshenheTable=false">取消</el-button>
					</div>
				</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				radio1: '',
				radio2: '',
				reported_number: '', //报案编号
				dispose_state: '', //处理状态
				anjianchuliTable: false, //案件处理dialog
				multipleSelection: [], //选中
				dialogTableVisible: false,
				anjianshenheTable: false, //案件审核dialg
				ReportedInfo: {
					reportedNumber: '',
					/*出险编号*/
					reportedTime: '',
					/*报案时间*/
					caseTime: '',
					/*立案时间*/
					dangerTime: '',
					/*出险时间*/
					narrowlyLocation: '',
					/*车险地点所在省份*/
					city: '',
					/*出险地点所在市*/
					county: '',
					/*出险地点所在县/区*/
					road: '',
					/*出险所在路段*/
					dangerAreaType: '',
					/*出险区域类型*/
					dangerPass: '',
					/*出险经过*/
					dangerCause: '',
					/*出险原因*/
					informants: '',
					/*报案人*/
					driver: '',
					/*出险司机*/
					driverMob: '',
					/*司机电话*/
					endTime: '',
					/*结案时间*/
					caseState: '',
					/*,案件状态-外键*/
					warrantyNumber: '' /*保单编号*/
				},
				reportedInfoData: [],
				reportedInfoData1: [], //展示数据
			}
		},
		methods: {
			addAccident() {
				var accident = new URLSearchParams();
				var data = new Date();
				accident.append("reported_time", data)
				accident.append("case_time", data)
				accident.append("danger_time", data)
				accident.append("narrowly_location", this.ReportedInfo.narrowlyLocation)
				accident.append("city", this.ReportedInfo.city)
				accident.append("county", this.ReportedInfo.county)
				accident.append("road", this.ReportedInfo.road)
				accident.append("danger_area_type", this.ReportedInfo.dangerAreaType)
				accident.append("danger_pass", this.ReportedInfo.dangerPass)
				accident.append("danger_cause", this.ReportedInfo.dangerCause)
				accident.append("informants", this.ReportedInfo.informants)
				accident.append("driver", this.ReportedInfo.driver)
				accident.append("driver_mob", this.ReportedInfo.driverMob)
				accident.append("end_time", data)
				accident.append("case_state", 1)
				accident.append("warranty_number", this.ReportedInfo.warrantyNumber)
				this.$axios.post("http://localhost:9004//accident/addReportedInfo", accident)
					.then(res => {
						if (res.data != "") {
							this.$message({
								type: 'success',
								message: '提交成功!'
							});
						}
					}).catch(err => {
						console.log(err);
					});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				for (var i = 0; i < this.multipleSelection.length; i++) {
					this.reported_number = this.multipleSelection[i].reported_number;
					this.case_state = this.multipleSelection[i].case_state;
					this.dispose_state = this.multipleSelection[i].dispose_state;
					this.reportedInfoData1 = this.multipleSelection[i];
				}
			},
			baoanchuli() {
				if (this.multipleSelection == "") {
					alert("请选择案件")
				} else {
					this.anjianchuliTable = true;
					if (this.case_state == 1) {
						this.radio1 = '受理';
					} else if (this.case_state == 2) {
						this.radio1 = '注销';
					} else {
						this.radio1 = '暂存';
					}
				}
			},
			updateAccident() {
				if (this.radio1 == '受理') {
					this.case_state = 1;
				} else if (this.radio1 == '注销') {
					this.case_state = 2;
				} else {
					this.case_state = 3;
				}
				this.$axios.get("http://localhost:9004//accident/updateByid/" + this.reported_number + "/" + this.case_state)
					.then(res => {
						if (res.data > 0) {
							this.$message({
								type: 'success',
								message: '修改成功!'
							});
						}
						this.anjianchuliTable = false;
						this.$router.push('/accident')
					}).catch(err => {
						console.log(err);
					});
			},
			ajsh() {
				if (this.multipleSelection != "") {
					if (this.multipleSelection[0].case_state == 1) {
						this.anjianshenheTable = true;
						if (this.dispose_state == 1) {
							this.radio2 = "予以立案"
						} else if (this.dispose_state == 2) {
							this.radio2 = "撤案"
						} else if (this.dispose_state == 3) {
							this.radio2 = "注销"
						} else {
							this.radio2 = "结案"
						}
					} else {
						alert("请选择案件为受理的案件")
					}
				} else {
					alert("请选择")
				}

			},
			anjianshenheupd() {
				if (this.radio2 == "予以立案") {
					this.dispose_state = 1;
				} else if (this.radio2 == "撤案") {
					this.dispose_state = 2;
				} else if (this.radio2 == "注销") {
					this.dispose_state = 3;
				} else {
					this.dispose_state = 4;
				}
				this.$axios.get("http://localhost:9004//accident/updateBydisposestate/" + this.reported_number + "/" + this.dispose_state)
					.then(res => {
						if (res.data > 0) {
							this.$message({
								type: 'success',
								message: '修改成功!'
							});

						}
						this.anjianchuliTable = false;
						this.$router.push('/accident')
					}).catch(err => {
						console.log(err);
					});
				this.anjianshenheTable = false;


			}
		},

		mounted() {
			this.$axios.get("http://localhost:9004//accident/getAll")
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
