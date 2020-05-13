<template>
	<view>
		<view style="padding-top: 200rpx;"></view>
		<input class="uni-input-xlzx" v-model="values.phoneNum" placeholder="手机" />
		<!-- <QSInput class="qsinput" name="index" required variableName="phoneNum" verifyType="Tel" title="手机" v-model="values.phoneNum"></QSInput> -->
		
		<button type="primary" class="yybutton" @click="updateInfo">修改个人信息</button>
	</view>
</template>

<script>
	import QSInput from '@/components/QS-inputs-split/elements/QS-input/index.vue';
	import CommApi from "../comm/api.js"
	
	export default {
		data() {
			return {
				values: {
					phoneNum: '',
				},
				userinfo: {}
			}
		},
		created() {
			// uni.clearStorageSync()
			this.userinfo = uni.getStorageSync("userinfo")
		},
		components: {
			QSInput
		},
		methods: {
			updateInfo() {
				uni.request({
					url: CommApi.api.updateInfo.real,
					data: JSON.stringify({
						uid: this.userinfo.id,
						"telephone": this.values.phoneNum
					}),
					method: 'POST',
					header: {
						"Access-Control-Allow-Origin": '*',
						"content-type": "application/json",
					},
					success: (res) => {
						if(res.data.code == 1){
							this.userinfo = res.data.data;
							// uni.removeStorageSync('userinfo')
							uni.setStorageSync("userinfo", this.userinfo)
							WeixinJSBridge.call('closeWindow');
						}
					}
				});
			},
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
</style>
