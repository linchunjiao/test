<template>
	<view class="user-info">
		<view class="user-base-info">
			<view class="base-info-content">
				<view class="item-left">
					<image v-if="userInfo.avatar" class="image" :src="userInfo.avatar"></image>
					<view v-else class="avatar">
						<image src="../../static/photo-icon.png" class="image"></image>
						<view>{{userInfo.name}}</view>
					</view>
				</view>
				<!-- <view class="name">{{userInfo.name}}</view>
				<view class="studnumber" v-if="userInfo.studnumber">{{userInfo.studnumber}}</view>
				<view class="studnumber" v-else>{{userInfo.staffnum}}</view> -->
			</view>
		</view>
		<view class="user-info-content">
			<view class="user-info-word">
				<view class="info-card-content">
					<!-- <view class="card-content-left">
						<image class="image" src="../../static/notify.jpg"></image>
					</view> -->
					<view class="card-content-right">
						<view class="name1">{{userObj.name1}}</view>
					</view>
				</view>
			</view>
			<view class="user-info-card">
				<view class="info-list">
					<view class="info-list-left">
						<view class="info-list-item">学号：{{userInfo.studnumber}}</view>
						<view class="info-list-item">学院：{{userInfo.academic}}</view>
						<view class="info-list-item">年级：{{moment(userInfo.grade).format('YYYY级')}}</view>
					</view>
					<view class="info-list-right">
						<view class="info-list-item">姓名：{{userInfo.name}}</view>
						<view class="info-list-item">电话：{{userInfo.telephone}}</view>
					</view>
					<button @click="saveStudent" class="info-list-button">修改资料</button>
				</view>
				<!-- <view class="label-name">其他服务</view> -->
				<!-- <view class="user-info-tabs">
					<view class="info-tab" @click="tabChange(tab)" :key="index" v-for="(tab, index) in infoTabs">
						<view :class="tab.className" class="avatar"></view>
						<view class="name">{{tab.name}}</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import moment from '@/pages/comm/moment-with-locales.min.js'
	export default {
		data() {
			return {
				userInfo: {},
				// name: '生命如花，有着它特有的活力与规律，只有用心灵去感悟，才能真正地触摸到它的最深处。',
				userObj: {
					name1: '生活可以简单点 , 世界可以广阔些',
				},
				infoTabs: [
				// {
				// 	url: '../../pages/index/update-info',
				// 	className: 'person-info',
				// 	name: '修改信息',
				// }, 
				{
					// url: '../../pages/sub-info/index?subType=0',
					url: '../../pages/sub-info/teachers',
					className: 'person-sub',
					name: '我的预约',
				}, 
				{
					// url: '../../pages/sub-info/index?subType=1',
					url: '../../pages/sub-info/teams',
					className: 'team-sub',
					name: '团体报名',
				}],
				moment,
			}
		},
		
		created() {
			this.userInfo = uni.getStorageSync("userinfo")
		},
		
		methods: {
			// colorHash(index) {
			//     return `avatar-color-${this.simpleHash(index)}`;
			// },
			simpleHash(key, mod = 8) {
				return Math.abs(key % mod);
			},
			saveStudent() {
				uni.redirectTo({
					url: '../../pages/index/update-info'
				})
			},
			tabChange(tab) {
				uni.redirectTo({
					url: tab.url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-info {
		background: #F1F3F6;
		// padding: 10upx 20upx;
		height: 100%;
		.user-base-info {
			background: url("../../static/bigbg-bg.png") center center no-repeat;
			background-size: cover;
			width: 100%;
			height: 480upx;
			.base-info-content {
				margin: 0 40%;
				display: flex;
				align-items: center;
				padding: 65upx 20upx 20upx 20upx;
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
					// width: 100%;
					// height: 100%;
					// border-radius: 50%;
					color: #fff;
					// line-height: 60px;
					text-align: center;
					// overflow: hidden;
					font-size: 14px;
					
					
					.image {
						width: 125upx;
						height: 125upx;
						border-radius: 50%;
					}
				}
			}
			.name {
				color: #fff;
				font-size: 1rem;
				font-weight: bold;
				margin-left: 40upx;
			}
			.studnumber {
				color: #fff;
				margin-left: 40upx;
				font-size: 0.9rem;
			}
		}
		.user-info-content {
			position: relative;
			top: -190upx;
			padding: 20upx;
			
			.user-info-word {
				width: 520upx;
				height: 56upx;
				margin: 0 auto;
				margin-bottom: 48upx;
				color: #fff;
				font-size: 15px;
				font-weight: 700;
				line-height: 56upx;
				text-align: center;
				background-color: rgba(10,153,131,0.6);
				border-radius: 28upx;
			}
			// .user-info-card::after {
			// 	content: "";
			// 	clear: both;
			// 	display: block;
			// }
			.user-info-card {
				min-height: 350upx;
				padding: 0upx 50upx;
				background: #fff;
				box-shadow: 0px 3upx 10upx 0px rgba(196,196,196,0.4);
				font-size: 16px;
				color: #323232;
				border-radius: 10upx;
				// position: absolute;
				
				// &:first-child {
				// 	margin-top: 0upx;
				// }
				.info-list{
					padding: 20upx 0 80upx 0;
					.info-list-left {
					float: left;
					width: 50%;
					}
					.info-list-right{
						float: right;
						width: 50%;
					}
					.info-list-button {
						width: 100%;
						position: relative;
						bottom: -40upx;
						background-color: #E9E9E9;
						height: 70upx;
						border-radius: 6upx;
						color: #646464;
						font-size: 15px;
						line-height: 70upx;
					}
					
					.info-list-item {
						padding: 15upx 0;
					}
				}
				.info-card-content {
					display: flex;
					padding: 20upx 0upx 50upx 0upx;
					.card-content-left {
						width: 60%;
						.image {
							height: 300upx;
							width: 100%;
						}
					}
					.card-content-right {
						flex: 1;
						margin-top: 70upx;
						margin-left: 20upx;
						.name3 {
							margin-top: 20upx;
						}
					}
				}
				
				.label-name {
					margin-left: 20upx;
				}
				
				.user-info-tabs {
					display: flex;
					align-items: center;
					text-align: center;
					margin-top: 80upx;
					    justify-content: space-around;
					.info-tab {
						.avatar {
							width: 120upx;
							height: 120upx;
							border-radius: 50%;
							position: relative;
							left: 20%;
							&.person-info {
								background: url("../../static/personal_profile.png") center center no-repeat;	
							}
							
							&.person-sub {
								background: url("../../static/employee.png") center center no-repeat;	
							}
							
							&.team-sub {
								background: url("../../static/team.png") center center no-repeat;	
							}
						}
						.name {
							margin-top: 20upx;
							font-size: 0.9rem;
						}
					}
				}
			}
		}
	}
</style>
