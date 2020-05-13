<template>
	<view class="teacher">
		<!-- <view class="sub-page-calendar">
			<uni-calendar ref="calendar" :selected="selected" :lunar="true" :disable-before="true" :start-date="startTime"
			 :end-date="endTime" @change="change" @confirm="confirm" />
			<button class="oper-btn" @click="open">{{currentDate.date}} {{currentDate.info}}
				<uni-icon type="arrowdown" size="20"></uni-icon>
			</button>
		</view> -->
		<view class="sub-page-calendar">
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
		<view class="teacher-list">
			<teacher-list-item :sub-date-times="subDateTimes" :teacher-list="teacherList" @choose="goDetail"></teacher-list-item>
		</view>
	</view>
</template>

<script>
	import uniCalendar from "@/components/uni-calendar/uni-calendar"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import CommApi from "@/pages/comm/api.js"
	import QsTabs from "@/components/QS-tabs/QS-tabs.vue"
	import TeacherListItem from "../../comm/teacher-list-item.vue"
	
	export default {
		data() {
			return {
				teacherList: [],
				userinfo: {},
				currentNum: 0,
				selected: [],
				dateLength: 14,
				subDateTimes: [],
			}
		},
		created() {
			this.userinfo = uni.getStorageSync("userinfo")
			// const code = this.$route.query && this.$route.query.code;
			// const state = this.$route.query && this.$route.query.state;
			console.log(this.userinfo)
			
			// if(this.userinfo && !this.userinfo.studnumber){
			// 	if(this.userinfo.openid){
			// 		uni.redirectTo({
			// 			url: '../../pages/index/bind-entry?openid='+this.userinfo.openid
			// 		})
			// 	}else{
			// 		uni.redirectTo({
			// 			url: '../../../pages/index/login?code=' + code + '&state=' + state
			// 		})
			// 	}
			// }else{
			// 	uni.redirectTo({
			// 		url: '../../../pages/index/login?code=' + code + '&state=' + state
			// 	})
			// }
			this.getTime();
			this.getSubDateTime();
			this.getSubTeachers();
		},
		methods: {
			changeTab(val) {
				this.currentNum = val;
				this.getSubTeachers();
			},
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
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			getSubTeachers() {
				uni.request({
					url: CommApi.api.getSubTeachers.real,
					data: {
						zbrq: this.selected[this.currentNum].date,
					},
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							this.teacherList = res.data.data;
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			goDetail(obj) {
				uni.removeStorageSync("subInfo")
				obj.subTime = this.selected[this.currentNum].date;
				uni.setStorageSync("subInfo", obj)
				uni.navigateTo({
					url: '../../../pages/student/person-sub/sub-detail?id='+obj.teacherid
				})
			},
			open() {
				this.$refs.calendar.open();
			},
			getTime() {
				const day = new Date();
				const lastDay = this.getLastDay(day.getFullYear(), day.getMonth() + 1);
				const currentYear = day.getFullYear();
				let currentMonth = day.getMonth() + 1;
				const currentDay = day.getDate();
				const count = lastDay - currentDay;
				this.startTime = `${currentYear}-${currentMonth}-${currentDay}`;
				if (currentMonth < 10) currentMonth = '0' + currentMonth;
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
									const numMonth = Number(currentMonth);
									let numMonth1 = numMonth + 1;
									if (numMonth1 < 10) numMonth1 = '0' + numMonth1;
									const week = this.getWeek(`${currentYear}-${numMonth1}-${day}`);
									this.selected.push({
										date: `${currentYear}-${numMonth1}-${day}`,
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
		},
		components: {
			uniCalendar,
			QsTabs,
			uniIcon,
			TeacherListItem
		}
	}
</script>

<style lang="scss">
	.teacher {
		background: #fafafa;
		height: 100%;
		
		.sub-page-calendar {
			border-top: solid #ccc 2upx;
			position: fixed;
			width: 100%;
			    z-index: 1000;
		}

		.teacher-list {
			position: relative;
			top: 170upx;
		}
	}
</style>
