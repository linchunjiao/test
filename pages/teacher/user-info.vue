<template>
	<view class="user-info">
		<view class="user-base-info">
			<view class="base-info-content">
				<view class="item-left">
					<image v-if="userInfo.avatar" class="image" :src="userInfo.avatar"></image>
					<view v-else class="avatar" :class="colorHash(1)">{{userInfo.name}}</view>
				</view>
				<!-- <view class="name">{{userInfo.name}}</view>
				<view class="studnumber">{{userInfo.staffnum}}</view> -->
			</view>
		</view>
		<view class="user-info-content">
			<view class="user-info-card">
				<view class="info-card-content">
					<view class="card-content-left">
						<image class="image" src="../../static/notify.jpg"></image>
					</view>
					<view class="card-content-right">
						<view class="name1">{{userObj.name1}}</view>
						<view class="name2">{{userObj.name2}}</view>
						<view class="name3">{{userObj.name3}}</view>
						<view class="name4">{{userObj.name4}}</view>
					</view>
				</view>
			</view>
			<view class="user-info-card">
				<!-- <view class="label-name">其他服务</view> -->
				<!-- <view class="user-info-tabs">
					<view class="info-tab" @click="tabChange(tab)" :key="index" v-for="(tab, index) in infoTabs">
						<view :class="tab.className" class="avatar"></view>
						<view class="name">{{tab.name}}</view>
					</view>
				</view> -->
				<view class="info-list">
					<view class="info-list-item">工号：{{userInfo.staffnum}}</view>
					<view class="info-list-item">姓名：{{userInfo.name}}</view>
					<view class="info-list-item">电话：{{userInfo.telephone}}</view>
					<view class="info-list-item">头衔：{{userInfo.title}}</view>
					<button @click="saveTeacher">修改资料</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				// name: '生命如花，有着它特有的活力与规律，只有用心灵去感悟，才能真正地触摸到它的最深处。',
				userObj: {
					name1: '生活，',
					name2: '可以简单点',
					name3: '世界，',
					name4: '可以广阔些',
				},
				infoTabs: [{
					url: '../../pages/index/update-info',
					className: 'person-info',
					name: '修改个人信息',
				}, {
					url: '../../pages/teacher/student-sub/index',
					className: 'person-sub',
					name: '查看学生预约',
				}],
			}
		},
		
		created() {
			this.userInfo = uni.getStorageSync("userinfo")
		},
		
		methods: {
			colorHash(index) {
			    return `avatar-color-${this.simpleHash(index)}`;
			},
			simpleHash(key, mod = 8) {
				return Math.abs(key % mod);
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
		background: #F0F4F3;
		// padding: 10upx 20upx;
		height: 100%;
		.user-base-info {
			background: #00A68A;
			height: 250upx;
			padding: 50upx 0;
			.base-info-content {
				margin: 0 40%;
				display: flex;
				align-items: center;
				padding: 20upx;
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
			top: -100upx;
			padding: 20upx;
			.user-info-card {
				min-height: 350upx;
				padding: 0 10upx;
				background: #fff;
				// border: solid 2upx #ccc;
				border-radius: 10upx;
				margin-top: 10upx;
				&:first-child {
					margin-top: 0upx;
				}
				.info-list{
					padding: 20upx 0;
					.info-list-item{
						padding: 20upx 0;
					}
				}
				.info-card-content {
					display: flex;
					//padding: 20upx 0upx 50upx 0upx;
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
