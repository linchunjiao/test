<template>
	<view class="student-sub-day">
		<view class="times-container">
			<!-- <view @click="selectDay(index)" class="time-item" :class="currentActive === index ? 'active' : ''" :key="index" v-for="(time, index) in selected">
				<view class="time">{{time.day}}</view>
				<view class="week">{{time.week}}</view>
			</view> -->
			<qs-tabs
			ref="tabs" 
			:tabs="selected" 
			animationMode="line2" 
			backgroundColor="#fff" 
			itemBackgroundColor="#FE515C"
			:current="currentNum" 
			@change="changeTab"
			activeColor="#fff"
			fontSize="35"
			hasItemBackground
			width="110">
			</qs-tabs>
		</view>
		<view class="studet-list">
			<view :key="student.id" v-for="(student, index) in studentList" class="student-list-item">
				<view class="student-item" @click="goDetail(student)">
					<view class="item-left">
						<image v-if="student.studavatar" class="image" :src="student.studavatar"></image>
						<view v-else class="avatar" :class="colorHash(index)">{{student.studname}}</view>
					</view>
					<view class="item-right">
						<view class="name">
							<text class="header">{{student.studname}}</text>
							<text class="title">{{student.studnumber}}</text>
							<text class="title">{{student.studmajor}}</text>
						</view>
						<view class="sub-time">
							<text class="label">预约时间：</text>
							<text class="time">{{student.yytime}}</text>
						</view>
						<view class="other">
							<!-- <text class="mobile">
								<uni-icon type="phone" size="25"></uni-icon>
								{{student.phoneNum}}
							</text> -->
						</view>
					</view>
				</view>
				<!-- <view class="more-btn" @click="lookDetail(index)">
				{{titleFunc(student)}}
				<uni-icon :type="student.flag ? 'arrowup' : 'arrowdown'" size="20"></uni-icon>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import QsTabs from "@/components/QS-tabs/QS-tabs.vue"
	import CommApi from "@/pages/comm/api.js"

	export default {
		data() {
			return {
				studentList: [],
				startTime: null,
				currentNum: 0,
				selected: [],
				dateLength: 14, // 显示的天数
				teacherid: null,
			}
		},
		created() {
			this.userinfo = uni.getStorageSync("userinfo")
			this.teacherid = this.userinfo && this.userinfo.id;
			this.getTime();
			this.getSubStudents();
		},
		methods: {
			getSubStudents() {
				uni.request({
					url: CommApi.api.getActiveSubTeacher.real,
					data: {
						yydate: this.selected[this.currentNum].date,
						teacherid: this.teacherid || 2,
					},
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							this.studentList = res.data.data;
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			colorHash(index) {
			    return `avatar-color-${this.simpleHash(index)}`;
			},
			simpleHash(key, mod = 8) {
				return Math.abs(key % mod);
			},
			getTime() {
				const day = new Date();
				const lastDay = this.getLastDay(day.getFullYear(), day.getMonth() + 1);
				const currentYear = day.getFullYear();
				const currentMonth = day.getMonth() + 1;
				const currentDay = day.getDate();
				const count = lastDay - currentDay;
				this.startTime = `${currentYear}-${currentMonth}-${currentDay}`;
				if (count >= 6) {
					for (let index = 0; index < this.dateLength; index++) {
						let day = currentDay + index;
						if (day < 10) day = '0' + day;
						const week = this.getWeek(`${currentYear}-${currentMonth}-${day}`);
						this.selected.push({
							date: `${currentYear}-${currentMonth}-${day}`,
							name: currentDay + index,
							week,
						});
					}
				} else {
					const num = 6 - count;
					switch (currentMonth) {
						case 12:
						for (let index = 0; index < this.dateLength; index++) {
							if (index <= count) {
								let day = currentDay + index;
								if (day < 10) day = '0' + day;
								const week = this.getWeek(`${currentYear}-${currentMonth}-${day}`);
								this.selected.push({
									date: `${currentYear}-${currentMonth}-${day}`,
									name: currentDay + index,
									week,
								});
							} else {
								let day = index - count;
								if (day < 10) day = '0' + day;
								const week = this.getWeek(`${currentYear + 1}-01-${day}`);
								this.selected.push({
									date: `${currentYear + 1}-01-${day}`,
									name: index - count,
									week,
								});
							}
						}
							break;
						default:
							const count1 = 0;
							for (let index = 0; index < this.dateLength; index++) {
								if (index <= count) {
									let day = currentDay + index;
									if (day < 10) day = '0' + day;
									const week = this.getWeek(`${currentYear}-${currentMonth}-${day}`);
									this.selected.push({
										date: `${currentYear}-${currentMonth}-${day}`,
										name: currentDay + index,
										week,
									});
								} else {
									let day = index - count;
									if (day < 10) day = '0' + day;
									const week = this.getWeek(`${currentYear}-${currentMonth + 1}-${day}`);
									this.selected.push({
										date: `${currentYear}-${currentMonth + 1}-${day}`,
										name: index - count,
										week,
									});
								}
							}
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
			getWeek(date) {
				var d = new Date(date);
				var days = d.getDay();
				switch (days) {
					case 1:
						return '一';
						break;
					case 2:
						return '二';
						break;
					case 3:
						return '三';
						break;
					case 4:
						return '四';
						break;
					case 5:
						return '五';
						break;
					case 6:
						return '六';
						break;
					case 0:
						return '日';
						break;
				}
			},
			changeTab(val) {
				this.currentNum = val;
				this.getSubStudents();
			},
		},
		components: {
			uniIcon,
			QsTabs
		}
	}
</script>

<style lang="scss">
	.student-sub-day {
		height: 100%;
		position: relative;
		.times-container {
			position: fixed;
			width: 100%;
			    z-index: 1000;
			display: flex;
			    justify-content: space-around;
			align-items: center;
			    padding-bottom: 15upx;
			border-bottom: solid #ccc 4upx;
			background: #fff;
			.time-item {
				padding: 10upx 30upx;
				&.active {
					background: #4CD964;
					color: #fff;
				}
				.time {
					font-size: 0.8rem;
					text-align: center;
				}
				.week {
					font-size: 0.8rem;
					margin-top: 10upx;
					text-align: center;
				}
			}
		}

		.studet-list {
			position: absolute;
			top: 120upx;
			width: 100%;
			background: #fafafa;

			.student-list-item {
				background: #fff;
				margin-top: 20upx;

				.student-item {
					display: flex;
					padding: 40upx 40upx 20upx 40upx;
					align-items: center;
					background: #fff;
					margin-top: 30upx;

					&:first-child {
						margin-top: 0upx;
					}

					.item-left {
						width: 140upx;
						height: 140upx;
						border-radius: 50%;

						.image {
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
						
						.avatar {
							width: 100%;
							height: 100%;
							border-radius: 50%;
							color: #fff;
							line-height: 70px;
							text-align: center;
							overflow: hidden;
							font-size: 2rem;
						}
					}

					.item-right {
						flex: 1;
						margin-left: 20upx;

						.name {
							.header {
								font-size: 1rem;
								font-weight: bold;
							}

							.title {
								font-size: 0.9rem;
								font-weight: 500;
								color: #666;
								margin-left: 40upx;
							}
						}

						.sub-time {
							margin-top: 15upx;

							.label {
								color: #C0C0C0;
							}
						}

						.other {
							margin-top: 15upx;
						}
					}
				}
			}
		}
	}
</style>
