<template>
	<view ref="talkRefs" class="onine-talk">
		<view class="user-base-info">
			<view class="base-info-content">
				<text>在线咨询</text>
			</view>
		</view>
		<scroll-view :style="'height: ' + screenHeight + 'px'" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
		 @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view class="onine-talk-content">
				<view :key="talk.id" v-for="talk in talkList">
					<view class="onine-talk-header">
						<view class="reply-info">
							<text v-if="talk.isAnonymous">匿名：</text>
							<text v-else>{{talk.studentName || '匿名'}}：</text>
						</view>
						<view :class="talk.replyContent == null ? 'info-custom' : ''" class="user-info">
							<view class="name" @click="changeReply(talk)">
								<view>{{talk.content}}相信自己相信自己相信自己相信自己相信自己相信自己</view>
								<text class="text">{{talk.replyContent == null ? '未回复' : '查看回复'}}</text>
							</view>
							<!-- <view class="content" v-if="talk.webState">
								<text class="label">{{talk.teacherName}}老师：</text>
								<text class="name">{{talk.replyContent}}</text>
							</view> -->
							<!-- <view class="content">{{talk.content}}</view> -->
							<view class="content" v-if="talk.webState">
								<text class="label">{{talk.teacherName}}相信相信老师：</text>
								<text class="name">{{talk.replyContent}}相信自己相信自己相信自己相信自己相信自己相信自己</text>
							</view>
						</view>
						<view v-if="talk.replyContent != null" class="user-icon" @click="changeReply(talk)">
							<uni-icon :type="!talk.webState ? 'arrowright' : 'arrowdown'" size="20"></uni-icon>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="btn-bottom" v-if="teacherInfo && teacherInfo.teacherid">
			<button class="btn" type="primary" @click="talkClick">留言</button>
		</view>
		<view class="content" v-if="replyInfo">
			<content-info v-if="value" v-model="value" :reply-info="replyInfo" role="student" @onConfirm="onConfirm"></content-info>
		</view>
	</view>
</template>

<script>
	import UniIcon from "@/components/uni-icon/uni-icon.vue"
	import CommApi from "@/pages/comm/api.js"
	import ContentInfo from "@/pages/comm/content-info.vue"

	export default {
		data() {
			return {
				talkList: [],
				total: 0,
				screenHeight: null,
				scrollTop: 0,
				page: 1,
				old: {
					scrollTop: 0
				},
				value: false,
				inputData: {},
				userinfo: {},
				userType: null,
				teacherInfo: {},
				replyInfo: '',
			}
		},

		components: {
			UniIcon,
			ContentInfo,
		},

		created() {
			this.userinfo = uni.getStorageSync("userinfo")
			this.userType = uni.getStorageSync("userType")
			const code = this.$route.query && this.$route.query.code;
			const state = this.$route.query && this.$route.query.state;
			this.getTeacherInfo();
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight - 192;
					console.log(this.screenHeight);
				}
			})
			this.getTalkList();
		},

		methods: {
			submitMessage(e) {
				console.log(this.value)
			},
			checkboxChange(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				console.log(this.items)
			},
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				if (this.talkList.length < this.total) {
					this.page = this.page + 1;
					this.getMoreTalkList()
				}
			},
			scroll: function(e) {
				// console.log(e, e.detail.scrollTop)
				this.old.scrollTop = e.detail.scrollTop
			},
			changeReply(obj) {
				if (obj.replyContent != null) obj.webState = !obj.webState;
			},
			talkClick() {
				this.value = true;
			},
			getTeacherInfo() {
				const day = new Date();
				const currentYear = day.getFullYear();
				let currentMonth = null;
				const monthCount = day.getMonth() + 1;
				if (monthCount < 10) {
					currentMonth = '0' + monthCount;
				} else {
					currentMonth = monthCount;
				}
				const currentDay = day.getDate();
				const date = `${currentYear}-${currentMonth}-${currentDay}`;
				uni.request({
					url: CommApi.api.getTeacherInfo.real,
					data: JSON.stringify({
						zbrq: date,
					}),
					method: 'POST',
					header: {
						'content-type': 'application/json',
						"Access-Control-Allow-Origin": '*',
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							// this.swiperImages = res.data.data;
							this.teacherInfo = res.data.data;
							this.replyInfo = `我是本周值班教师${this.teacherInfo && this.teacherInfo.name}，请问您想和我分享什么`;
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			getTalkList() {
				uni.request({
					url: CommApi.api.getTalkList.real,
					data: JSON.stringify({
						studentId: (this.userinfo && this.userinfo.id) || 63,
						page: this.page,
						pageSize: 10,
					}),
					method: 'POST',
					header: {
						'content-type': 'application/json',
						"Access-Control-Allow-Origin": '*',
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							const talkList = res.data.data;
							this.total = res.data.total;
							const len = talkList.length;
							for (let i = 0; i < len; i++) {
								talkList[i].webState = false;
							}
							this.talkList = talkList;
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			getMoreTalkList() {
				uni.request({
					url: CommApi.api.getTalkList.real,
					data: JSON.stringify({
						studentId: (this.userinfo && this.userinfo.id) || 63,
						page: this.page,
						pageSize: 10,
					}),
					method: 'POST',
					header: {
						'content-type': 'application/json',
						"Access-Control-Allow-Origin": '*',
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							const talkList = res.data.data;
							this.total = res.data.total;
							const len = talkList.length;
							for (let i = 0; i < len; i++) {
								talkList[i].webState = false;
							}
							this.talkList = this.talkList.concat(talkList);
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			onConfirm(item) {
				this.value = false;
				this.replyInfo = `我是本周值班教师${this.teacherInfo && this.teacherInfo.name}，请问您想和我分享什么`;
				this.sendMassage(item);
			},
			sendMassage(item) {
				uni.request({
					url: CommApi.api.sendMassage.real,
					data: JSON.stringify({
						studentId: (this.userinfo && this.userinfo.id) || 63,
						teacherId: this.teacherInfo && this.teacherInfo.teacherid,
						content: item.content,
						isPublish: item.isPublish,
						isAnonymous: item.isAnonymous,
					}),
					method: 'POST',
					header: {
						'content-type': 'application/json',
						"Access-Control-Allow-Origin": '*',
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							this.page = 1;
							this.getTalkList();
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.onine-talk {
		height: 100%;
		width: 100%;
		position: relative;
		overflow: hidden;
		font-size: 0.8em;
		background: #F1F3F6;
		
		.user-base-info {
			background: #08B99E;
			color: #fff;
			height: 90upx;
			text-align: center;
			font-size: 18px;
			.base-info-content {
				line-height: 90upx;
				height: 90upx;
			}
		}

		.onine-talk-content {
			padding: 0upx 20upx;
			overflow: auto;
			
			
		}

		.state {
			display: block;
			font-size: 0.8em;
		}

		.onine-talk-header {
			display: flex;
			margin-top: 26upx;
			border: solid 2px #666;
			border-radius: 6upx;
			background: #fff;
			padding: 26upx 20upx;
			box-shadow: 0upx 1upx 8upx 0upx rgba(196,196,196,0.4);

			&:first-child {
				border: none;
			}

			.reply-info {
				// height: 100upx;
				max-width: 192upx;
				color: #999;
				font-size: 16px;
			}

			.user-info {
				flex: 1;
				display: block;
				line-height: 26px;

				&.info-custom {
					.name {
						color: #323232;
						font-size: 0.85rem;
						
						.text {
							// float: right;
							color: #B6B6B6;
							font-size: 14px;
						}
					}
				}

				.name {
					font-size: 0.85rem;
					color: #323232;
					
					.text {
						float: right;
						color: #08B99E;
						font-size: 14px;
					}
					// .text::after {
					// 	content: "";
					// 	clear: both;
					// 	display: block;
					// }
				}
				.content {
					width: 100%;
					margin-top: 60upx;
					// position: relative;
					// left: -100upx;
					.label {
						color: #7AABFD;
						font-size: 16px;
					}

					.name {
						// flex: 1;
						font-size: 0.85rem;
					}
				}
			}

			.user-icon {
				position: relative;
				top: -8upx;
				color: #08B99E;
			}
		}

		.btn-bottom {
			padding-top: 20upx;
			// border-top: solid 2upx #ccc;

			.btn {
				width: 40%;
				margin: auto;
				padding: 10upx 0upx;
				background: #339999;
			}
		}
	}
</style>
