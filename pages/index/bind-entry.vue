<template>
	<view class="bind-entry">
		<view class="student-bind-info">
			<button class="btn" type="primary" @click="bindStudent">学生绑定信息</button>
		</view>
		<view class="teacher-bind-info">
			<button class="btn" type="primary" @click="bindTeacher">老师绑定信息</button>
		</view>
	</view>
</template>

<script>
	export default {
		created() {
			uni.removeStorageSync('userinfo')
		},
		methods: {
			bindStudent() {
				const openid = this.$route.query && this.$route.query.openid;
				uni.redirectTo({
					url: '../../pages/index/index?openid=' + openid
				})
			},
			bindTeacher() {
				const openid = this.$route.query && this.$route.query.openid;
				uni.redirectTo({
					url: '../../pages/index/teacher-bind?openid=' + openid
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bind-entry {
		height: 100%;
		.student-bind-info {
			height: 50%;
			background: #fafafa;
			position: relative;
			padding-left: 10%;
			.btn {
				width: 80%;
				position: absolute;
				bottom: 100upx;
				padding: 20rpx 0;
			}
		}
		.teacher-bind-info {
			height: 50%;
			width: 80%;
			padding-top: 100upx;
			margin: 0 auto;
			.btn {
				padding: 20rpx 0;
			}
		}
	}
</style>
