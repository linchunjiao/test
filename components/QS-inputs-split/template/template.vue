<template>
	<view class="flex_row padding_20rpx_30rpx" :style="'font-size:' + fontSize + 'rpx;width:' + width + ';'">
		<text class="flex_row_e_c marginRight5 fontColor666666 text_nowrap maxWidth40" :style="'flex:' + (titleFlex||1) + ';' + (titleStyle||'')" v-if="title&&!titleHide">
			<text class="fontColorF1505C" v-if="required">
				{{requiredSign}}
			</text> 
			{{title}}
		</text>
		<view :style="'flex:' + (contentFlex||4) + ';' + (contentStyle||'')">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			titleHide: {
				type: Boolean,
				default: false
			},
			fontSize: {
				type: Number,
				default: 30
			},
			width: {
				type: String,
				default: '100%'
			},
			titleFlex: {
				type: Number,
				default: 1
			},
			contentFlex: {
				type: Number,
				default: 4
			},
			titleStyle: {
				type: String,
				default: ''
			},
			contentStyle: {
				type: String,
				default: ''
			},
			required: {
				type: Boolean,
				default: false
			},
			requiredSign: {
				type: String,
				default: '*'
			}
		}
	}
</script>

<style scoped>
	@import url("../css/inputs.css");
</style>
