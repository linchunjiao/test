<template>
	<view>
		<view style="padding-top: 200rpx;"></view>
		<input class="uni-input-xlzx" v-model="values.num" placeholder="职工号" />
		<input class="uni-input-xlzx" v-model="values.name" placeholder="姓名" />
		<input class="uni-input-xlzx" v-model="values.phoneNum" placeholder="手机" />
		<!-- <QSInput class="qsinput" name="index" required variableName="num" title="职工号" v-model="values.num"></QSInput>
		<QSInput class="qsinput" name="index" required variableName="name" title="姓名" v-model="values.name"></QSInput>
		<QSInput class="qsinput" name="index" required variableName="phoneNum" verifyType="Tel" title="手机" v-model="values.phoneNum"></QSInput>
		 -->
		<button type="primary" class="yybutton" @click="getData">绑定信息</button>
		<view class="tips">个人信息仅用于心理咨询</view>
	</view>
</template>

<script>
	import QSInput from '@/components/QS-inputs-split/elements/QS-input/index.vue';
	import CommApi from "../comm/api.js"

	export default {
		data() {
			return {
				title: '绑定老师信息',
				values: {
					name: '',
					phoneNum: '',
					num: ''
				}
			}
		},
		created() {
			// uni.clearStorageSync()
		},
		onLoad() {

		},
		components: {
			QSInput
		},
		methods: {
			getData() {
				const openid = this.$route.query && this.$route.query.openid;
				console.log(openid)
				uni.request({
					url: CommApi.api.teacherBind.real,
					data: JSON.stringify({
						"name": this.values.name,
						"openid": openid,
						"staffnum": this.values.num,
						"telephone": this.values.phoneNum
					}),
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						console.log(JSON.stringify(res.data));
						if(res.data.code == 1){
							this.userinfo = res.data.data;
							uni.setStorageSync("userType", 'teacher')
							uni.setStorageSync("userinfo", this.userinfo)
							WeixinJSBridge.call('closeWindow');
						}
					}
				});
			},
			reSet() {
				this.values = {
					name: '',
					phoneNum: '',
					num: ''
				}
			}
		}
	}
</script>

<style>
	.qsinput{
		font-size: 36rpx !important;
		padding:40rpx 30rpx;
	}
	
	.uni-input-xlzx {
		border: 2upx solid #ccc;
		height: 80upx;
		line-height: 80upx;
		width: 80%;
		margin: auto;
		padding: 0upx 20upx;
		border-radius: 10upx;
		box-shadow: 0upx 0upx 0upx 2upx;
		margin-bottom: 40upx;
		position: relative;
	
		.uni-input {
			height: 80upx;
			line-height: 80upx;
			margin: auto;
		}
	
		.input-icon {
			position: absolute;
			right: 10upx;
			top: 20upx
		}
	}
	
	.yybutton{
		position: absolute;
		bottom: 50rpx;
		width: 90%;
		margin:0 5%;
		font-size: 40rpx;
	}
	
	.tips{
		font-size: 30rpx;
		text-align: center;
		margin-top: 20rpx;
		color: #DD524D;
	}
</style>
