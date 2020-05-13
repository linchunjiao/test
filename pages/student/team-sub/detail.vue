<template>
	<view class="team-sub-detail">
		<view class="detail-item">
			<view class="detail-item-content">
				<image class="image" :src="teamObj.img || '../../../static/hd.jpg'"></image>
			</view>
		</view>
		<view class="detail-item">
			<view class="detail-item-label"><text class="icon-label"></text>活动名称</view>
			<view class="detail-item-content">{{teamObj.hdzt}}</view>
		</view>
		<view class="detail-item">
			<view class="detail-item-label"><text class="icon-label"></text>活动时间</view>
			<view class="detail-item-content">{{moment(teamObj.hdsj).format('YYYY年MM月DD日 HH:mm:ss')}}</view>
		</view>
		<view class="detail-item">
			<view class="detail-item-label"><text class="icon-label"></text>活动地点</view>
			<view class="detail-item-content">{{teamObj.hddd}}</view>
		</view>
		<view class="detail-item">
			<view class="detail-item-label"><text class="icon-label"></text>活动对象</view>
			<view class="detail-item-content">{{teamObj.cydx}}</view>
		</view>
		<view class="detail-item">
			<view class="detail-item-label"><text class="icon-label"></text>活动人数</view>
			<view class="detail-item-content">{{teamObj.hdrs}}</view>
		</view>
		<view class="detail-item">
			<view class="detail-item-label"><text class="icon-label"></text>活动内容</view>
			<view class="detail-item-content">
				{{teamObj.hdnr}}
			</view>
		</view>
		<view class="detail-btn">
			<button @click="joinActive"  type="primary">参与报名</button>
		</view>
	</view>
</template>

<script>
	import CommApi from "@/pages/comm/api.js"
	import moment from '@/pages/comm/moment-with-locales.min.js'
	
	export default {
		data() {
			return {
				teamId: null,
				teamObj: {},
				moment,
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
			}
		},
		
		created() {
			this.userinfo = uni.getStorageSync("userinfo")
			this.openid = this.userinfo && this.userinfo.openid;
			this.teamId = this.$route.query && this.$route.query.id;
			this.getDetail();
		},
		
		methods: {
			getDetail() {
				uni.request({
					url: CommApi.api.getSubTeamDetail.real + '/' + this.teamId,
					data: {
					},
					method: 'GET',
					header: {
						'content-type': 'application/json',
						"Access-Control-Allow-Origin": '*',
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							console.log(res.data.data)
							this.teamObj = res.data.data;
						} else {
							uni.showToast({
								title: res.data && res.data.msg || res.data.error,
								icon: "none"
							});
						}
					}
				});
			},
			joinActive() {
				uni.showModal({
					title: '报名确认',
					content: '是否参加报名',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								url: CommApi.api.joinActive.real,
								data: JSON.stringify({
									openid: this.openid || 0,
									hdid: this.teamId,
								}),
								method: 'POST',
								header: {
									'content-type': 'application/json',
									"Access-Control-Allow-Origin": '*',
								},
								success: (res) => {
									if (res.statusCode === 200 && res.data.code === 1) {
										WeixinJSBridge.call('closeWindow');
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
		}
	}
</script>

<style lang="scss">
	.team-sub-detail {
		.detail-item {
			padding: 20upx;
			.detail-item-label {
				font-size: 1rem;
				font-weight: bold;
				.icon-label {
					border: solid #007AFF 6upx;
					margin-right: 10upx;
					display: inline-block;
					height: 30upx;
					position: relative;
					top: 6upx;
				}
			}
			.detail-item-content {
				padding-top: 20upx;
				color: #333;
				font-size: 0.9rem;
				word-break: break-all;
				.image {
					width: 100%;
					height: 300upx;
					margin-top: 20upx;
				}
			}
		}
		.detail-btn {
			width: 80%;
			margin: 0 auto;
			padding: 40upx 0;
		}
	}
</style>
