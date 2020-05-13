<template>
	<view class="team-sub">
		<view :key="active.id" v-for="active in activeList">
			<view class="team-sub-item" v-if="!active.state">
				<view class="team-sub-image" v-if="active.img">
					<image class="image" :src="active.img"></image>
				</view>
				<view class="team-sub-image" v-else="active.img">
					<image class="image" :src="'/static/hd.jpg'"></image>
				</view>
				<view class="team-sub-content">
					<view class="active-name">{{active.hdzt}}</view>
					<view class="active-content">{{active.hdnr}}</view>
					<!-- <view class="active-address"></view> -->
					<view class="active-other">
						<view class="active-time">{{moment(active.hdsj).format('YYYY年MM月DD日')}}  {{active.hddd}}</view>
						<button @click="goDetail(active)" class="active-btn" size="mini" type="primary">查看详情</button>
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
				activeList: [],
				moment,
				userinfo: {}
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
			this.getActiveTeams();
		},
		
		methods: {
			goDetail(obj) {
				uni.navigateTo({
					url: '../../../pages/student/team-sub/detail?id='+obj.id
				})
			},
			getActiveTeams() {
				uni.request({
					url: CommApi.api.getSubTeams.real,
					data: JSON.stringify({
						page: 1,
						pageSize: 20,
					}),
					method: 'POST',
					header: {
						'content-type': 'application/json',
						"Access-Control-Allow-Origin": '*',
					},
					success: (res) => {
						if (res.statusCode === 200 && res.data.code === 1) {
							// this.swiperImages = res.data.data;
							this.activeList = res.data.data;
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
	}
</script>

<style lang="scss">
	.team-sub {
		.team-sub-item {
			padding: 40upx 40upx 20upx 40upx;
			background: #fafafa;
			height: 100%;
			margin-top: 20upx;
			&:first-child {
				margin-top: 0upx;
			}
			.team-sub-image {
				width: 100%;
				height: 300upx;
				
				.image {
					width: 100%;
					height: 100%;
				}
			}
			.team-sub-content {
				.active-name {
					margin-top: 10upx;
					font-weight: bold;
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
					word-break: break-all;
					-webkit-line-clamp: 2;
					/* autoprefixer: off */
					-webkit-box-orient: vertical;
					/* autoprefixer: on */
				}
				.active-address {
					font-size: 0.9rem;
					padding: 10upx 0upx;
				}
				.active-other {
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.active-time {
						color: #666;
						font-size: 0.9rem;
						flex: 1;
					}
					
					.active-btn {
						padding-top: 8upx;
						padding-bottom: 8upx;
					}
				}
			}
		}
	}
</style>
