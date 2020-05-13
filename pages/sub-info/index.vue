<template>
	<view class="sub-info">
		<qs-tabs 
			ref="qsTabs" 
			@change="changeTab" 
			:current="currentNum" 
			:width="qsWidth" 
			:tabs="tabList" 
			height="100"
			backgroundColor="rgba(130,130,130,.4)" 
			activeColor="#fff"
			hasItemBackground
			fontSize="35"
			itemBackgroundColor="#bacac6"
			animationMode="line2">
		</qs-tabs>
		<view v-if="currentNum === 0" class="person-sub">
			<teachers :open-id="openid" :teachers="teacherList" @choose="getTeachers"></teachers>
		</view>
		<view v-else class="">
			<teams :open-id="openid"></teams>
		</view>
	</view>
</template>

<script>
	import QsTabs from "@/components/QS-tabs/QS-tabs.vue"
	import CommApi from "@/pages/comm/api.js"
	import Teachers from "./teachers.vue"
	import Teams from "./teams.vue"
	
	export default {
		data() {
			return {
				tabList: [{
					type: 'person',
					name: '个人预约'
				}, {
					type: 'team',
					name: '团队预约'
				}],
				currentNum: 0,
				qsWidth: null,
				teacherList: [],
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
				userType: null,
			}
		},
		
		mounted() {
			this.userinfo = uni.getStorageSync("userinfo")
			this.userType = uni.getStorageSync("userType")
			if (this.$route.query && this.$route.query.subType != null) {
				this.currentNum = this.$route.query && Number(this.$route.query.subType);
			}
			// const code = this.$route.query && this.$route.query.code;
			// const state = this.$route.query && this.$route.query.state;
			// if(this.userinfo && !this.userinfo.studnumber){
			// 	if(this.userinfo.openid){
			// 		uni.redirectTo({
			// 			url: '../../pages/index/bind-entry?openid='+this.userinfo.openid
			// 		})
			// 	}else{
			// 		uni.redirectTo({
			// 			url: '../../pages/index/login?code=' + code + '&state=' + state
			// 		})
			// 	}
			// }else{
			// 	uni.redirectTo({
			// 		url: '../../../pages/index/login?code=' + code + '&state=' + state
			// 	})
			// }
			this.openid = this.userinfo && this.userinfo.openid;
			if (this.$refs.qsTabs) this.qsWidth = Number(this.$refs.qsTabs.sW);
			if (this.currentNum == 0)this.getTeachers();
			// if (this.userType) {
			// 	if (this.userType === 'teacher') {
			// 		uni.redirectTo({
			// 			url: '../../pages/teacher/student-sub/index'
			// 		})
			// 	} else {
			// 		this.getTeachers();
			// 	}
			// } else {
			// 	uni.redirectTo({
			// 		url: '../../pages/index/login?code=' + code + '&state=' + state
			// 	})
			// }
		},
		
		methods: {
			changeTab(val) {
				this.currentNum = val;
				if (!this.currentNum) this.getTeachers();
			},
			getTeachers(index) {
				// console.log(index)
				// this.teacherList.splice(index, 1)
				uni.request({
					url: CommApi.api.getActiveSubTeacher.real,
					data: JSON.stringify({
						"openid": this.openid || 0,
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
		},
		
		components: {
			QsTabs,
			Teachers,
			Teams,
		},
	}
</script>

<style lang="scss">
	.sub-info {
		.person-sub {
			background: #fafafa;
		}
	}
</style>
