<template>
	<view>
		<view style="padding-top: 200rpx;"></view>
		<view class="college-item">
			<picker style="width: 100%;" @change="bindPickerChange" range-key="detail" :value="index" :range="colleges">
				<view class="uni-input-xlzx">{{colleges.length > 0 && colleges[index].detail}}
					<uni-icon class="input-icon" type="arrowdown" size="20"></uni-icon>
				</view>
			</picker>
		</view>
		<input class="uni-input-xlzx" v-model="values.num" placeholder="学号" />
		<!-- <view class="college-item">
			<picker style="width: 100%;" @change="bindChangeMajor" range-key="detail" :value="majorIndex" :range="majors">
				<view class="uni-input-xlzx">{{majors.length > 0 && majors[majorIndex].detail}}
					<uni-icon class="input-icon" type="arrowdown" size="20"></uni-icon>
				</view>
			</picker>
		</view> -->
		<view class="college-item">
			<picker style="width: 100%;" mode="date" fields="year" :start="startDate" :end="endDate" :value="date" @change="bindDateChange">
				<view class="uni-input-xlzx">
					{{moment(values.grade).format('YYYY级')}}
					<uni-icon class="input-icon" type="arrowdown" size="20"></uni-icon>
				</view>
			</picker>
		</view>
		<input class="uni-input-xlzx" v-model="values.name" placeholder="姓名" />
		<input class="uni-input-xlzx" v-model="values.phoneNum" placeholder="手机" />
		<!-- <QSInput class="qsinput" name="index" required variableName="num" title="学号" v-model="values.num"></QSInput> -->
		<!-- <QSInput class="qsinput" name="index" required variableName="college" title="学院" v-model="values.college"></QSInput> -->
		<!-- <QSInput class="qsinput" name="index" required variableName="major" title="专业" v-model="values.major"></QSInput> -->
		<!-- <QSInput class="qsinput" name="index" required variableName="name" title="姓名" v-model="values.name"></QSInput> -->
		<!-- <QSInput class="qsinput" name="index" required variableName="phoneNum" verifyType="Tel" title="手机" v-model="values.phoneNum"></QSInput> -->

		<button type="primary" class="yybutton" @click="getData">绑定个人信息</button>
		<view class="tips">个人信息仅用于心理咨询</view>
	</view>
</template>

<script>
	import QSInput from '@/components/QS-inputs-split/elements/QS-input/index.vue';
	import UniIcon from "@/components/uni-icon/uni-icon.vue"
	import moment from '@/pages/comm/moment-with-locales.min.js'
	import CommApi from "../comm/api.js"

	export default {
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				title: '绑定学生信息',
				colleges: [],
				majors: [],
				index: 0,
				majorIndex: 0,
				date: null,
				moment,
				values: {
					name: '',
					college: '',
					major: '',
					grade: currentDate,
					phoneNum: '',
					num: ''
				}
			}
		},
		created() {
			this.getColleges();
			this.getMajors();
		},
		onLoad() {

		},
		components: {
			QSInput,
			UniIcon
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.values.college = this.colleges[this.index].code
			},
			bindChangeMajor: function(e) {
				this.majorIndex = e.target.value
				this.values.major = this.majors[this.majorIndex].code
			},
			bindDateChange: function(e) {
			            this.values.grade = e.target.value;
			        },
			getColleges() {
				uni.request({
					url: CommApi.api.getColleges.real,
					data: JSON.stringify({
						"orderField": "cda"
					}),
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							// this.teacherList = res.data.data;
							this.colleges = res.data.data;
							this.values.college = this.colleges[this.index].code
							console.log(res.data.data)
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			getMajors() {
				uni.request({
					url: CommApi.api.getmajors.real,
					data: JSON.stringify({
						"orderField": "cda"
					}),
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							// this.teacherList = res.data.data;
							this.majors = res.data.data;
							this.values.major = this.majors[this.index].code
							console.log(res.data.data)
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			getData() {
				const openid = this.$route.query && this.$route.query.openid;
				console.log(openid)
				uni.request({
					url: CommApi.api.loginBind.real,
					data: JSON.stringify({
						"academic": this.values.college,
						"major": this.values.major,
						"grade": moment(this.values.grade).format('YYYY'),
						"name": this.values.name,
						"openid": openid,
						"studnumber": this.values.num,
						"telephone": this.values.phoneNum
					}),
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						console.log(JSON.stringify(res.data));
						this.userinfo = res.data.data;
						uni.setStorageSync("userType", 'student')
						uni.setStorageSync("userinfo", this.userinfo)
						if (res.data.data.id != null) {
							uni.redirectTo({
								url: '../../pages/student/person-sub/index?id=' + res.data.data.id
							})
						}
					}
				});
			},
			reSet() {
				this.values = {
					name: '',
					college: '',
					major: '',
					phoneNum: '',
					num: ''
				}
			},
			getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        }
		}
	}
</script>

<style lang="scss" scoped>
	.qsinput {
		font-size: 36rpx !important;
		padding: 40rpx 30rpx;
	}

	.uni-input-xlzx {
		border: 2upx solid #ccc;
		height: 80upx;
		line-height: 80upx;
		width: 80%;
		margin: auto;
		padding: 0upx 20upx;
		border-radius: 10upx;
		box-shadow: 0upx 0upx 0upx 2upx;
		margin-bottom: 40upx;
		position: relative;

		.uni-input {
			height: 80upx;
			line-height: 80upx;
			margin: auto;
		}

		.input-icon {
			position: absolute;
			right: 10upx;
			top: 20upx
		}
	}

	.yybutton {
		position: absolute;
		bottom: 50rpx;
		width: 90%;
		margin: 0 5%;
		font-size: 40rpx;
	}

	.college-item {
		display: flex;

		// margin-left: 90upx;
		// padding: 40rpx 0;
		.label {
			font-size: 36upx;
			color: #666666;
			margin-right: 40upx;
		}

		.uni-input {
			font-size: 32upx;
			color: #666;
			border-bottom: solid 1rpx #eee;
			padding-left: 10upx;
		}
	}

	.tips {
		font-size: 30rpx;
		text-align: center;
		margin-top: 20rpx;
		color: #DD524D;
	}
</style>
