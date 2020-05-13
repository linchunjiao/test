<template>
	<view class="sub-detail">
		<view class="sub-detail-title">
			<view @click="back()">&lt;  {{moment(subInfo.subTime).format('YYYY年MM月DD日')}}</view>
		</view>
		<view class="sub-detail-header">
			<view class="header-left">
				<!-- <image v-if="subInfo.avatar" class="image" :src="subInfo.avatar"></image> -->
				<image class="image" src="../../../static/teacher_128.png"></image>
				<!-- <view v-else class="avatar" :class="colorHash(0)">{{subInfo.title}}</view> -->
			</view>
			<view class="header-right">
				<view class="header-item">
					<text class="name1">{{subInfo.name}}</text>
					<text class="title">老师</text>
				</view>
				<view class="header-item">
					<!-- <text class="label">预约时间：</text> -->
					<text class="name">{{subInfo.skill}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="" :key="index" v-for="(sub, index) in subObj.subTimes"> -->
		<view class="">
			<view v-if="subTime(time)" class="sub-detail-time" :key="idx" v-for="(time, idx) in subDateTimes">
				<view class="time-left">
					<view class="">{{subTime(time)}}</view>
				</view>
				<view class="time-btn">
					<button v-if="yyyZbsj.indexOf(time.detail)>-1" class="hs" size="mini" type="primary">已满</button>
					<button v-else class="ls" size="mini" type="primary" @click="subBtn(time)">可预约</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CommApi from "@/pages/comm/api.js"
	import moment from '@/pages/comm/moment-with-locales.min.js'
	
	export default {
		data() {
			return {
				subObj: {
					subDate: '2019-11-20',
					subTeacherName: '万波',
					subTimes: [{
						name: '上午',
						times: [{
							name: '09:00~09:50',
						}, {
							name: '10:00~10:50',
						}, {
							name: '11:00~11:50'
						}]
					}, {
						name: '下午',
						times: [{
							name: '14:00~14:50',
						}, {
							name: '15:00~15:50',
						}, {
							name: '16:00~16:50'
						}]
					}, {
						name: '晚上',
						times: [{
							name: '18:20~19:10',
						}, {
							name: '19:20~20:10',
						}, {
							name: '20:20~21:50'
						}]
					}]
				},
				subDateTimes: [],
				subInfo: {},
				userinfo: {
					id: null,
					openid: null,
					academic: null,
					studnumber: null,
					name: null,
					telephone: null,
					grade: null
				},
				openid: null,
				teacherId: 1,
				arrTimes: [],
				yyyZbsj: [],
				btnState:"预约",
				moment,
			}
		},
		
		created() {
			this.subInfo = uni.getStorageSync("subInfo")
			this.userinfo = uni.getStorageSync("userinfo")
			this.arrTimes = this.subInfo.zbsj.split(',');
			this.yyyZbsj = this.subInfo.yyyzbsj;
			this.openid = this.userinfo && this.userinfo.openid;
			this.getSubDateTime();
		},
		
		methods: {
			getSubDateTime() {
				uni.request({
					url: CommApi.api.getSubDateTime.real,
					data: {
					},
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							this.subDateTimes = res.data.data;
							console.log(res.data.data);
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			subTime(time) {
				console.log(this.arrTimes);
				const idx = this.arrTimes.findIndex((val) => {
					return time.code === val;
				});
				return idx > -1 ? time.detail : null;
			},
			colorHash(index) {
			    return `avatar-color-${this.simpleHash(index)}`;
			},
			simpleHash(key, mod = 8) {
				return Math.abs(key % mod);
			},
			subBtn(time) {
				// alert(JSON.stringify(time))
				const teacherId = this.subInfo.teacherid;
				const openid = this.openid;
				console.log(time, this.subInfo)
				if(this.subInfo){
					uni.showModal({
						title: '预约确认',
						content: '是否预约'  +  this.subInfo.name  + '老师，确认后不可更改',
						success: (res) => {
							if (res.confirm) {
								uni.request({
									url: CommApi.api.setSubPerson.real,
									data: JSON.stringify({
										"teacherId": teacherId,
										"period": time.detail,
										"openId": openid || 0,
										"yyDate": this.subInfo.subTime,
										"yyTime": time.detail
									}),
									method: 'POST',
									header: {
										"Access-Control-Allow-Origin": '*',
										"content-type": "application/json",
									},
									success: (res) => {
										console.log(res);
										// alert(JSON.stringify(res.data))
										if(res.data.code==1){
											WeixinJSBridge.call('closeWindow');
										}
										// alert(JSON.stringify(res.data));
									}
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
		},
	}
</script>

<style lang="scss">
	.sub-detail {
		.sub-detail-header {
			padding: 30upx 20rpx;
			background: #dee7c4;
			display: flex;
			.header-left {
				width: 140upx;
				height: 140upx;
				border-radius: 50%;
			
				.image {
					width: 100%;
					height: 100%;
					border-radius: 30%;
				}
			
				.avatar {
					margin-top: 20rpx;
					width: 100%;
					height: 100%;
					border-radius: 50%;
					color: #fff;
					line-height: 140rpx;
					text-align: center;
					overflow: hidden;
					font-size: 1.0rem;
				}
			}
			.header-right {
				margin-left: 20upx;
				flex: 1;
			}
			.header-item {
				.label {
					font-size: 0.9rem;
					font-weight: 200;
					color: #000;
				}
				
				.name1 {
					font-size: 1.2rem;
					font-weight: bold;
				}
				.name {
					font-size: 0.9rem;
					font-weight: 500;
				}
			}
		}
		.sub-detail-title {
			background: #333333;
			color: #fff;
			padding: 30upx;
			}
			.sub-detail-time {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20upx;
				border-bottom: solid #ccc 3upx;
				.time-btn {
					margin-left: 10upx;
					button {
						width: 200upx;
						font-size: 36rpx;
						padding: 10rpx 40rpx;
					}
					.hs{
						background: #999;
					}
					.ls{
						background: #37b0e9;
					}
				}
			}
	}
</style>
