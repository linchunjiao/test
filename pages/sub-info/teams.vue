<template>
	<view class="team-sub">
		<view class="user-base-info">
			<view class="base-info-content">
				<text>我的活动</text>
			</view>
		</view>
		
		
		<view :key="active.id" v-for="(active, index) in activeList">
			<view class="team-sub-item" v-if="!active.state">
				<view class="team-sub-image">
					<image class="image" :src="active.img || '../../static/hd.jpg'"></image>
				</view>
				<view class="team-sub-content">
					<view class="active-name">{{active.hdzt}}</view>
					<!-- <view class="active-content">
						{{active.hdnr}}
					</view> -->
					<view class="active-address">
						<text class="label">预约地点</text>
						<text class="name">{{active.hddd}}</text>
					</view>
					<view class="active-other">
						<view class="active-time">{{active.hdsj && moment(active.hdsj).format('YYYY年MM月DD日')}}</view>
						<button @click="goDetail(active)" class="active-btn" size="mini" type="primary">取消预约</button>
					</view>
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
				openId: null,
				activeList: [],
				moment
			}
		},
		
		created() {
			this.userinfo = uni.getStorageSync("userinfo")
			this.openId = this.userinfo && this.userinfo.openid;
			this.getActiveTeams();
		},
		
		methods: {
			goDetail(obj, index) {
				const that = this;
				uni.showModal({
				    title: '预约取消',
				    content: '是否取消' + obj.hdzt + '的预约',
				    success: function (res) {
				        if (res.confirm) {
							uni.request({
								url: CommApi.api.cancelSubTeam.real,
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
										that.getActiveTeams();
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
			getActiveTeams() {
				const that = this;
				uni.request({
					url: CommApi.api.getActiveSubTeam.real,
					data: JSON.stringify({
						"openid": that.openId || 0,
					}),
					method: 'POST',
					header: {
						'content-type': 'application/json',
						"content-type": "application/json",
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							// this.swiperImages = res.data.data;
							this.activeList = res.data.data
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
		},
		//props: ['openId'],
	}
</script>

<style lang="scss">
	.team-sub {
		background: #F0F4F3;
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
		.team-list-item {
			margin: 30upx 20upx 0;
		}
		.team-sub-item {
			box-shadow:0px 1px 8px 0px rgba(196,196,196,0.4);
			border-radius: 8upx;
			background: #fff;
			
			&:first-child {
				margin-top: 0upx;
			}
			.team-sub-image {
				width: 100%;
				height: 240upx;
				
				.image {
					width: 100%;
					height: 240upx;
					// border-top-left-radius: 8upx;
					border-radius: 8upx 8upx 0 0;
				}
			}
			.team-sub-content {
				padding: 0 20upx 20upx;
				.active-name {
					margin-top: 26upx;
					font-weight: bold;
				}
				.label {
					color: #323232;
					font-weight: bold;
				}
				
				.name {
					margin-left: 10upx;
				}
				.active-content {
					padding: 10upx 0upx 10upx 0upx;
					font-size: 0.9rem;
					color: #666;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					line-height: 50upx;
					height: 88upx;
					-webkit-line-clamp: 2;
					/* autoprefixer: off */
					-webkit-box-orient: vertical;
					/* autoprefixer: on */
				}
				.active-address {
					font-size: 0.9rem;
					padding: 10upx 0upx;
					color: #323232;
				}
				.active-other {
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.active-time {
						color: #646464;
						font-size: 0.9rem;
						flex: 1;
					}
					.active-btn {
						width: 180upx;
						height: 60upx;
						font-size: 0.8rem;
						line-height: 60upx;
						background-color: #FF4656;
						color: #fff;
						border-radius: 6upx;
						font-weight: 200;
					}
				}
			}
		}
	}
</style>
