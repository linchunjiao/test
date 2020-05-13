<template>
	<chunLei-modal type="custom" v-model="value" @valueFlag="valueFlag">
		<view class="custom-modal" @tap.stop>
			<view class="title">
				<text class="name">{{replyInfo}}</text>
			</view>
			<view class="content custom-modal-content">
				<view class="content-desc">
					<view class="desc">
						<text class="label">回复内容</text>
						<text class="name">{{contentCount}}/500</text>
					</view>
					<textarea 
						@blur="gobackTop()"
						class="text-area" 
						:maxlength="500" 
						@input="inputChange" 
						v-model="content" 
						placeholder="请输入你想回复的内容" />
					</view>
			</view>
			<hr />
			<radio-group v-if="role === 'student'" class="modal-checkbox" @change="radioChange($event)">
			    <label style="margin-right: 30upx;" v-for="(radio, index) in radios" :key="radio.value">
					<radio :value="radio.value" :checked="radio.checked" />
					{{radio.name}}
			    </label>
			</radio-group>
			<view v-if="role === 'student'" class="modal-checkbox">
				<checkbox-group @change="checkboxChange">
					<checkbox color="#FFCC33" value="1" :checked="checked" /> 匿名留言
				</checkbox-group>
			</view>
			<view class="btn">
				<button type="primary" @click="onConfirm">发送留言</button>
			</view>
		</view>
	</chunLei-modal>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				contentCount: 0,
				checked: false,
				radios: [{value: '1', checked: true, name: '公开'}, {value: '0', checked: false, name: '不公开'}]
			}
		},
		props:{
			value:{
				type: Boolean,
				default: false
			},
			replyInfo: {
				type: String,
				default: ''
			},
			role: {
				type: String,
				default: ''
			},
		},
		methods: {
			inputChange(e) {
				this.contentCount = e.detail.value.length;
			},
			valueFlag() {
				this.$emit('input', false);
			},
			gobackTop() {
			    uni.pageScrollTo({
			        scrollTop: 0
			    });
			},
			radioChange(evt){
				for (let i = 0; i < this.radios.length; i++) {
				    if (this.radios[i].value === evt.target.value) {
				        this.radios[i].checked = true;
				    } else {
						this.radios[i].checked = false;
					}
				}
			},
			checkboxChange(e) {
			                this.checked = !this.checked;
			            },
			onConfirm() {
				const len = this.radios.length;
				let isPublish = null;
				for (let i=0; i< len; i++) {
					if (this.radios[i].checked) isPublish = Number(this.radios[i].value);
				}
				const obj = {
					content: this.content,
					isPublish,
					isAnonymous: this.checked ? 1 : 0,
				};
				this.$emit('onConfirm', obj);
			},
		},
	}
</script>

<style scoped lang="scss">
	.custom-modal {
		width: 90%;
		background: #fff;
		border-radius: 10upx;
		.title {
			padding: 30upx;
			.name {
				color: red;
				font-size: 0.9rem;
			}
		}
		.modal-checkbox {
			padding: 30upx;
			padding-bottom: 0upx;
		}
		.btn {
			width: 90%;
			    margin-bottom: 50upx;
				padding-top: 30upx;
			    margin-left: auto;
			    margin-right: auto;
		}
		.custom-modal-content {
			background: #fafafa;
			padding-top: 30upx;
			.content-desc {
				padding: 20upx 30upx 20upx 30upx;
				background: #fff;
				.desc {
					position: relative;
					.label {
						font-weight: bold;
						font-size: 0.9rem;
					}
					.name {
						font-size: 0.8rem;
						position: absolute;
						right: 0upx;
					}
				}
				.text-area {
					margin-top: 20upx;
					height: 300upx;
					border-radius: 10upx;
					    width: auto;
				}
			}
		}
	}
</style>
