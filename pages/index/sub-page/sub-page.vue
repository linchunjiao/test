<template>
	<view class="sub-page">
		<view class="sub-page-calendar">
			<uni-calendar ref="calendar" :selected="selected" :lunar="true" :disable-before="true" :start-date="startTime"
			 :end-date="endTime" @change="change" @confirm="confirm" />
			<!-- <view class="title-date">{{currentDate.date}} {{currentDate.info}}</view> -->
			<button class="oper-btn" @click="open">{{currentDate.date}} {{currentDate.info}}
				<uni-icon type="arrowdown" size="20"></uni-icon>
			</button>
		</view>
		<view class="list-content">
			<view class="item-bottom-time" :key="index" v-for="(time, index) in times">
				<view class="bottom-time-content">
					<view class="">{{time.date}}</view>
					<view class="">{{time.time}}</view>
					<view class="">余号: {{time.num}}</view>
				</view>
				<view class="list-item" :key="teacher.id" v-for="teacher in time.teachers">
					<view class="list-item-header">
						<view class="item-header-left">
							<uni-icon type="person" size="50"></uni-icon>
						</view>
						<view class="item-header-right">
							<view class="herder-right-title">
								<text class="name">{{teacher.name}}</text>
								<text class="desc">{{teacher.title}}</text>
							</view>
							<view class="herder-right-desc">擅长： {{teacher.skill}}</view>
						</view>
						<view class="time-btn">
							<button size="mini" type="primary" @click="subBtn(teacher.id,time, teacher)">立即预约</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCalendar from "@/components/uni-calendar/uni-calendar"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"

	export default {
		data() {
			return {
				currentDate: {
					info: '可约',
					date: '2019-09-17'
				},
				startTime: null,
				endTime: null,
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
				selected: [
					{
						date: '2019-09-17',
						info: '可约'
					},
					{
						date: '2019-09-18',
						info: '约满',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: '2019-09-19',
						info: '约满',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: '2019-09-20',
						info: '约满',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: '2019-09-21',
						info: '约满',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: '2019-09-22',
						info: '约满',
						data: {
							custom: '自定义信息',
							name: '自定义消息头'
						}
					},
					{
						date: '2019-09-23',
						info: '可约'
					},
				],
				
				times: [{
					time: '上午',
					date: '9:00-12:00',
					num: 16,
					isSub: true,
					teachers: [{
						id: 1,
						image: '',
						name: '李老师',
						title: '心理辅导',
						skill: '对心理问题进行诊断',
					}, {
						id: 2,
						image: '',
						name: '李老师',
						title: '心理辅导',
						skill: '制定咨询方案'
					}]
				}, {
					time: '下午',
					date: '14:00-17:00',
					num: 15,
					isSub: true,
					teachers: [{
						id: 1,
						image: '',
						name: '李老师',
						title: '心理辅导',
						skill: '对心理问题进行诊断',
					}, {
						id: 2,
						image: '',
						name: '李老师',
						title: '心理辅导',
						skill: '制定咨询方案'
					}]
				}]
			};
		},
		created() {
			this.userinfo = uni.getStorageSync("userinfo")
			this.openid = this.userinfo.openid
			console.log(this.userinfo)
			this.getTime();
			// if(this.userinfo==null||this.userinfo==""){
			// 	uni.redirectTo({
			// 		url: '../../../pages/index/sub-page/login'
			// 	})
			// }
		},
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			getTime() {
				const day = new Date();
				const lastDay = this.getLastDay(day.getFullYear(), day.getMonth() + 1);
				const currentYear = day.getFullYear();
				const currentMonth = day.getMonth() + 1;
				const currentDay = day.getDate();
				const count = lastDay - currentDay;
				this.startTime = `${currentYear}-${currentMonth}-${currentDay}`;
				this.currentDate.date = this.startTime;
				console.log(this.startTime, 123232);
				if (count >= 6) {
					this.endTime = `${currentYear}-${currentMonth}-${currentDay + 6}`;
					this.selected.forEach((val, index) => {
						val.date = `${currentYear}-${currentMonth}-${currentDay + index}`
					});
				} else {
					const num = 6 - count;
					switch (currentMonth){
						case 12:
							this.endTime = `${currentYear + 1}-01-${num}`;
							this.selected.forEach((val, index) => {
								if (index === count) {
									val.date = `${currentYear}-${currentMonth}-${currentDay + index}`;
								} else {
									val.date = `${currentYear + 1}-01-${index - count}`
								}
							});
							break;
						default:
							this.endTime = `${currentYear}-${currentMonth + 1}-${num}`;
							const count1 = 0
							this.selected.forEach((val, index) => {
								if (index <= count) {
									val.date = `${currentYear}-${currentMonth}-${currentDay + index}`;
								} else {
									val.date = `${currentYear}-${currentMonth + 1}-${index - count}`
								}
							});
							break;
					}
				}
			},
			getLastDay(year, month) {
			    var d = new Date(0);
			    if (month == 12) {
			        d.setUTCFullYear(year + 1);
			        d.setUTCMonth(0);
			    } else {
			        d.setUTCFullYear(year);
			        d.setUTCMonth(month);
			    }
			    d.setTime(d.getTime() - 1);
			    return d.getUTCDate();
			},
			change(e) {
				console.log(e);
			},
			confirm(e) {
				this.currentDate = e.clockinfo;
				console.log(e);
			},
			subBtn(teacherid,time, teacher) {
				// alert(JSON.stringify(time))
				if(time.num>0){
					if(this.userinfo.studnumber==null){
						uni.redirectTo({
							url: '../../../pages/index/index?openid='+this.userinfo.openid+'&teacherid='+teacherid
						})
					}else{
						uni.showModal({
							title: '预约确认',
							content: '是否预约' + teacher.name + '的心里指导，确认后不可更改',
							success: (res) => {
								if (res.confirm) {
									uni.request({
										url: '/ygo/api/xlzx/bXlzxYyb/'+this.userinfo.openid+'/save',
										data: {
											"courseid": "1",
											"teacherid": teacherid,
											"openid": this.userinfo.openid,
											"cda": "2019-09-16T15:29:22.334Z",
											"mda": "2019-09-16T15:29:22.334Z"
										},
										method: 'POST',
										header: {
											"Access-Control-Allow-Origin": '*',
											"content-type": "application/json",
										},
										success: (res) => {
											console.log(res);
											WeixinJSBridge.call('closeWindow');
											// alert(JSON.stringify(res.data));
										}
									});
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			},
		},
		components: {
			uniCalendar,
			uniIcon
		}
	}
</script>

<style lang="scss">
	.sub-page {
		.title {
			background: #37b0e9;
			height: 100upx;
			line-height: 100upx;
			color: #fff;
			font-size: 32upx;
			padding: 0 20upx;
		}

		.list-content {
			.item-bottom-time {
			// 	display: flex;
			// 	align-items: center;
			// 	flex-wrap: wrap;
			// 	justify-content: space-between;
			// 	font-size: 30upx;
			// 	height: 100upx;
			// 	color: #AAAAAA;
			// 	border-top: solid 1upx #ccc;
			// 
			// 	&:first-child {
			// 		border-top: none;
			// 	}
				
				.bottom-time-content {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					justify-content: space-between;
					height: 110upx;
					padding: 0px 20upx;
					background: #37b0e9;
					color: #fff;
				}
				
				.list-item-bottom {
					padding: 20upx;
					background: #fafafa;
				}
			}
			.list-item {
				margin-bottom: 20upx;
				box-shadow: 0 0 10upx 0 #bfbfbf;

				.list-item-header {
					padding: 20upx;
					display: flex;
					background: #FFFFFF;
					align-items: center;
					justify-content: space-between;

					.item-header-left {
						width: 110upx;
						height: 110upx;
						background: #BBBBBB;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 100upx;
							height: 100upx;
						}
					}

					.item-header-right {
						margin-left: 20upx;
						line-height: 50upx;
						flex: 1;

						.herder-right-title {
							.name {
								font-size: 34upx;
								font-weight: bold;
							}

							.desc {
								margin-left: 30upx;
								font-size: 28upx;
								color: #AAAAAA;
							}
						}

						.herder-right-desc {
							font-size: 28upx;
							color: #AAAAAA;
						}
					}
					
					.time-btn {
						width: 180u0px;
						margin-left: 10upx;
						button {
							background: #37b0e9;
						}
					}
				}
			}
		}
	}
</style>
