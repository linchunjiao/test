<template>
	<view class="login"></view>
</template>

<script>
	import CommApi from "../comm/api.js"
	
	export default {
		data() {
			return {
				userinfo:null
			}
		},
		created() {
			const code = this.$route.query && this.$route.query.code;
			const state = this.$route.query && this.$route.query.state;
			if(code!=null){
				uni.request({
					url: CommApi.api.loginCode.real,
					data: {
						code,
					},
					method: 'GET',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						console.log(res.data);
						// alert(JSON.stringify(res.data.data));
						if(res.data.code==1){
							uni.removeStorageSync('userType')
							this.userinfo = res.data.data;
							uni.setStorageSync("userType", res.data.msg)
							uni.setStorageSync("userinfo", this.userinfo)
							if (res.data.msg === 'student') {
								if (state == 1) {
									uni.redirectTo({
										url: '../../pages/student/person-sub/index'
									})
								} else if (state == 2) {
									uni.redirectTo({
										url: '../../pages/student/team-sub/index'
									})
								} else if (state == 3) {
									uni.redirectTo({
										url: '../../pages/student/online-talk'
									})
								} else if (state == 4) {
									uni.redirectTo({
										url: '../../pages/sub-info/index'
									})
								} else if (state == 5) {
									uni.redirectTo({
										url: '../../pages/student/user-info'
									})
								} else if (state == 6) {
									uni.redirectTo({
										url: '../../pages/sub-info/teachers'
									})
								} else if (state == 7) {
									uni.redirectTo({
										url: '../../pages/sub-info/teams'
									})
								}
							} else if (res.data.msg === 'teacher') {
								if (state == 1) {
									uni.redirectTo({
										url: '../../pages/student/person-sub/index'
									})
								} else if (state == 2) {
									uni.redirectTo({
										url: '../../pages/student/team-sub/index'
									})
								} else if (state == 3) {
									uni.redirectTo({
										url: '../../pages/teacher/online-talk'
									})
								} else if (state == 4) {
									uni.redirectTo({
										url: '../../pages/teacher/student-sub/index'
									})
								} else if (state == 5) {
									uni.redirectTo({
										url: '../../pages/teacher/user-info'
									})
								}
							} else {
								uni.redirectTo({
									url: '../../pages/index/bind-entry?openid='+this.userinfo.openid
								})
							}
						}else{
							uni.showToast({
								title: '数据有问题',
								icon: "none"
							});
							// console.log("failed");
							// location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx78d2741ee60d595c&redirect_uri=http%3A%2F%2Fwww.ygoclub.com%2Fpages%2Findex%2Flogin&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
						}
					}
				});
			}else{
				// console.log("failed");
				// location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx78d2741ee60d595c&redirect_uri=http%3A%2F%2Fwww.ygoclub.com%2Fpages%2Findex%2Flogin&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
			}
		}
	}
</script>

<style lang="scss">
</style>
