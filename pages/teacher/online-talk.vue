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
			<view class="onine-talk-header" :key="talk.id" v-for="talk in talkList">
				<view class="reply-info">
					<text v-if="talk.isAnonymous">匿名：</text>
					<text v-else>{{talk.studentName || '匿名'}}：</text>
				</view>
				<view :class="talk.replyContent == null ? 'info-custom' : ''" class="user-info">
					<view class="name" @click="changeReply(talk)">
					{{talk.content}}
					<text class="state">【{{talk.replyContent == null ? '未回复' : '已回复'}}】</text>
					<text class="state">【{{talk.isPublish ? '公开' : '未公开'}}】</text>
					</view>
					<view class="content" v-if="talk.webState">
						<text class="label">{{talk.teacherName}}：</text>
						<text class="name">{{talk.replyContent}}</text>
					</view>
				</view>
				<view v-if="talk.replyContent != null" class="user-icon" @click="changeReply(talk)">
					<uni-icon :type="!talk.webState ? 'arrowright' : 'arrowdown'" size="20"></uni-icon>
				</view>
			</view>
		</view>
		</scroll-view>
		<!-- <view class="btn-bottom">
			<button class="btn" type="primary" @click="talkClick">留言</button>
		</view> -->
		  <view class="content" v-if="replyInfo">
		  	<content-info v-if="value" v-model="value" :reply-info="replyInfo" role="teacher" @onConfirm="onConfirm"></content-info>
		  </view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
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
				replyInfo: '我是本周值班教师某某某，请问您想和我分享什么',
				userinfo: {},
				userType: null,
				currentItem: {},
			}
		},
		
		components: {
			uniIcon,
			ContentInfo
		},
		
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight;
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
				    if(values.includes(item.value)){
						this.$set(item,'checked',true)
				    } else {
				        this.$set(item,'checked',false)
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
				if (obj.replyContent != null) {
					obj.webState = !obj.webState;
				} else {
					this.replyInfo = obj.content;
					this.currentItem = obj;
					this.value = true;
				}
			},
			talkClick() {
				this.value = true;
			},
			getTalkList() {
				uni.request({
					url: CommApi.api.getTalkList.real,
					data: JSON.stringify({
						teacherid: (this.userinfo && this.userinfo.id) || 1,
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
							for (let i=0; i< len; i++) {
								talkList[i].webState = false;
							}
							this.talkList = talkList;
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
			getMoreTalkList() {
				uni.request({
					url: CommApi.api.getTalkList.real,
					data: JSON.stringify({
						teacherid: (this.userinfo && this.userinfo.id) || 1,
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
				this.sendMassage(item);
			},
			sendMassage(item) {
				uni.request({
					url: CommApi.api.replyMassage.real,
					data: JSON.stringify({
						id: this.currentItem.id,
						replyContent: item.content,
					}),
					method: 'POST',
					header: {
						'content-type': 'application/json',
						"Access-Control-Allow-Origin": '*',
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
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
		
		.user-base-info {
			background: #00A68A;
			color: #fff;
			height: 56px;
			text-align: center;
			font-size: 20px;
			.base-info-content {
				line-height: 56px;
			}
		}

		.onine-talk-content {
			padding: 20upx 20upx;
			overflow: auto;
		}

		.onine-talk-header {
			display: flex;
			margin-top: 20upx;
			border-top: solid 2upx #ccc;
			padding-top: 20upx;
			background: #fff;
			padding: 40upx;
			box-shadow: 0px 0px 1px 0px;
			&:first-child {
				border: none;
			}

			.reply-info {
				max-width: 192upx;
			}

			.user-info {
				flex: 1;
				
				&.info-custom {
					.name {
						color: #FF3333;
					}
				}

				.name {
					color: #339999;
				}

				.content {
					margin: 10upx 0 0 0;
					// display: flex;
					.label {
						
					}
					.name {
						// flex: 1;
					}
				}
			}
			.user-icon {
				position: relative;
				top: -8upx;
			}
		}
		.btn-bottom {
			padding-top: 30upx;
			.btn {
				width: 40%;
				margin: auto;
				padding: 20upx 0upx;
				background: #339999;
			}
		}
	}
</style>
