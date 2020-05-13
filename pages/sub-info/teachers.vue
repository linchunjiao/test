<template>
	<view class="user-yy-info">
		<view class="user-base-info">
			<view class="base-info-content">
				<text>我的预约</text>
			</view>
		</view>
		<view :key="teacher.id" v-for="(teacher, index) in teacherList" class="teacher-list-item">
			<!-- <view>{{teacher.yydate+86400+","+new Date().getTime()}}</view> -->
			<view class="teacher-item" v-if="teacher.yydate+86400000>=new Date().getTime()">
				<view class="item-right">
					<view class="name">
						<text class="header">{{teacher.teacherName}}</text>
						<text class="title">老师</text>
					</view>
					<view class="sub-info-item">
						<text class="label">预约时间：</text>
						<text class="name">{{moment(teacher.yydate).format('YYYY年MM月DD日')}} {{teacher.yytime}}</text>
					</view>
					<view class="more-btn" @click="goDetail(teacher, index)">
						<button class="button" type="primary">取消预约</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from '@/pages/comm/moment-with-locales.min.js'
	import CommApi from "@/pages/comm/api.js"
	
	export default {
		data() {
			return {
				openId: null,
				teacherList: [],
				moment
			}
		},
		
		created() {
			this.userinfo = uni.getStorageSync("userinfo")
			this.openId = this.userinfo && this.userinfo.openid;
			this.getTeachers();
		},
		
		methods: {
			getTeachers(index) {
				const that = this;
				// console.log(index)
				// this.teacherList.splice(index, 1)
				uni.request({
					url: CommApi.api.getActiveSubTeacher.real,
					data: JSON.stringify({
						"openid": that.openId || 0,
					}),
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							console.log(res.data.data);
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
			goDetail(obj, index) {
				const that = this;
				uni.showModal({
				    title: '预约取消',
				    content: '是否取消' + obj.teacherName + '的预约',
				    success: function (res) {
				        if (res.confirm) {
							uni.request({
								url: CommApi.api.cancelSubTeacher.real,
								data: JSON.stringify({
									"openid": that.openId || 0,
									id: obj.id,
								}),
								method: 'POST',
								header: {
									"Access-Control-Allow-Origin": '*',
									"content-type": "application/json",
								},
								success: (res) => {
									if (res.statusCode === 200 && res.data.code === 1) {
										that.$emit('choose', index);
									} else {
										uni.showToast({
											title: res.data && res.data.msg || res.data.error,
											icon: "none"
										});
									}
								}
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
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
		},

		//props: ['teachers', 'choose', 'openId'],
	}
</script>

<style lang="scss" scoped>
	.user-yy-info {
		background: #F1F3F6;
		height: 100%;
		.user-base-info {
			background: #08B99E;
			color: #fff;
			height: 90upx;
			text-align: center;
			font-size: 18px;
			.base-info-content {
				line-height: 90upx;
			}
		}
	}
	.teacher-list-item {
		padding: 16upx 40upx 16upx 40upx;
		&:first-child {
			margin-top: 0upx;
		}
	}

	.more-btn {
		text-align: center;
		font-size: 0.8rem;
		margin: 30upx 0 26upx 0;
		
		.button {
			width: 180upx;
			height: 56upx;
			font-size: 0.8rem;
			line-height: 56upx;
			background-color: #FF4656;
			color: #fff;
			border-radius: 6upx;
			font-weight: 200;
		}
	}

	.sub-info-item {
		margin-top: 30upx;
		font-size: 0.9rem;
		text-align: center;
		color: #323232;
		.label {
			font-weight: 700;
		}

		.name {
			padding-left: 0upx;
		}
	}

	.teacher-item {
		display: flex;
		align-items: center;
		background: #fff;
		// margin: 30upx 40upx 28upx 40upx;
		box-shadow:0px 1upx 8upx 0px rgba(196,196,196,0.4);
		border-radius:6px;

		&:first-child {
			margin-top: 0upx;
		}

		.item-left {
			width: 120upx;
			height: 120upx;
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
				line-height: 60px;
				text-align: center;
				overflow: hidden;
				font-size: 2rem;
			}
		}

		.item-right {
			flex: 1;
			// margin-left: 20upx;

			.name {
				text-align: center;
				padding-top: 30upx;
				.header {
					font-size: 1rem;
					font-weight: 700;
					color: #323232;
				}

				.title {
					font-size: 1rem;
					font-weight: 500;
					color: #969696;
					margin-left: 14upx;
				}
			}

			.desc {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 500upx;
				margin-top: 16upx;
				color: #aaa;
				font-size: 0.9rem;
			}
		}
	}
</style>
