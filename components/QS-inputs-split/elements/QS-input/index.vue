<template>
	 <!-- 非自定义组件模式请注释 -->
		<QStemplate :title="title" :titleHide="titleHide" :fontSize="fontSize" :width="width" :titleFlex="titleFlex"
	 :contentFlex="contentFlex" :titleStyle="titleStyle" :contentStyle="contentStyle" :required="required" :requiredSign="requiredSign">
	 <!-- 非自定义组件模式请注释 -->
	<!-- 非自定义组件模式请打开注释 -->
	<!-- <view class="flex_row padding_20rpx_30rpx" :style="'font-size:' + fontSize + 'rpx;width:' + width + ';' + boxStyle">
		<text class="flex_row_e_c marginRight5 fontColor666666 text_nowrap maxWidth40" :style="'flex:' + (titleFlex||1) + ';' + (titleStyle||'')"
		 v-if="title&&!titleHide">
			<text class="fontColorF1505C" v-if="required">
				{{requiredSign}}
			</text> 
			{{title}}
		</text>
		<view :style="'flex:' + (contentFlex||4) + ';' + (contentStyle||'')"> -->
	<!-- 非自定义组件模式请打开注释 -->
			<view class="flex_row_none_c transition_point6s width100 padding_10rpx_15rpx" :style="
			'border-bottom: 1px solid ' + 
			(focusBl?
			(focusBorderColor||'#999'):
			(blurBorderColor||'#f2f2f2')) + ';'">
				<view class="flex_row_none_c Flex5">
					<view class="Flex1" v-if="leftIcon">
						<view class="flex_row_c_c width100">
							<uni-icon :type="leftIcon" :size="iconSize" :color="leftIconColor||'#999'"></uni-icon>
						</view>
					</view>
					<input :type="inputType||'text'" :value="value" @input="inputs_change($event)" :placeholder="placeholder||('请输入' + title)"
					 :password="passwordBl" :placeholder-style="inputSet.placeholder_style" :placeholder-class="inputSet.placeholder_class"
					 :maxlength="inputSet.maxlength||140" :cursor-spacing="inputSet.cursor_spacing" :focus="inputSet.focus"
					 :confirm-type="inputSet.confirm_type" :confirm-hold="inputSet.confirm_hold" :selection-start="inputSet.selection_start"
					 :selection-end="inputSet.selection_end" :cursor="inputSet.cursor" :adjust-position="inputSet.adjust_position"
					 :disabled="disabled" :style="'font-size:' + fontSize + 'rpx;'" class="fontColor666666 Flex5" @focus="focusChange()"
					 @blur="blurChange()" />
				</view>
				<view class="Flex1_5" v-if="tapClear">
					<view class="flex_row_c_c width100" v-if="value" @tap.prevent.stop="inputTap('clear')">
						<uni-icon type="clear" :size="iconSize" color="#999999"></uni-icon>
					</view>
				</view>
				<view class="Flex1_5" v-if="password">
					<view class="flex_row_c_c width100" @tap.prevent.stop="inputTap('password')">
						<uni-icon type="eye" :size="iconSize" :color="passwordBl?'#999999':passwordIconColor||'#33cc33'"></uni-icon>
					</view>
				</view>
				<view class="Flex1_5" v-if="customTapIcon">
					<view class="flex_row_c_c width100" @tap.prevent.stop="inputTap('custom')">
						<uni-icon :type="customTapIcon" :size="iconSize" :color="customTapIconColor||'#999'"></uni-icon>
					</view>
				</view>
				<view class="Flex2 flex_row_c_c" v-if="rightButtonTex">
					<button type="primary" size="mini" class="width100 text_nowrap margin_10rpx" :style="'font-size:' + btnSize + 'rpx;' + rightButtonStyle" @tap="inputTap('button')">
						{{rightButtonTex}}
					</button>
				</view>
				<view class="Flex2 flex_row_c_c" v-if="ifCode">
					<button type="primary" size="mini" class="width100 text_nowrap margin_10rpx" :disabled="startCode" :style="'font-size:' + btnSize + 'rpx;' + codeButtonStyle"
					 @tap="getCode()">
						{{startCode?codeCount + 's':'获取验证码'}}
					</button>
				</view>
			</view>
	<!-- 非自定义组件模式请打开注释 -->
		<!-- </view>
	</view> -->
	<!-- 非自定义组件模式请打开注释 -->
	<!-- 非自定义组件模式请注释 -->
	</QStemplate>
	<!-- 非自定义组件模式请注释 -->
</template>

<script>
	import _app from '../../js/app.js';
	import uniIcon from '../../uniIcon/uni-icon.vue';
	// 非自定义组件模式请注释
	import QStemplate from '../../template/template.vue';
	// 非自定义组件模式请注释
	export default {
		components: {
			uniIcon,
			// 非自定义组件模式请注释
			QStemplate
			// 非自定义组件模式请注释
		},
		props: {
			// 公共属性
			..._app.publicProps,
			// 公共属性
			inputSet: {
				type: Object,
				default () {
					return {};
				}
			},
			tapClear: {
				type: Boolean,
				default: true
			},
			inputType: {
				type: String,
				default: 'text'
			},
			focusBorderColor: {
				type: String,
				default: '#999'
			},
			blurBorderColor: {
				type: String,
				default: '#f2f2f2'
			},
			password: {
				type: Boolean,
				default: false
			},
			passwordIconColor: {
				type: String,
				default: '#33cc33'
			},
			leftIcon: {
				type: String,
				default: ''
			},
			leftIconColor: {
				type: String,
				default: '#999'
			},
			customTapIcon: {
				type: String,
				default: ''
			},
			customTapIconColor: {
				type: String,
				default: '#999'
			},
			rightButtonTex: {
				type: String,
				default: ''
			},
			rightButtonStyle: {
				type: String,
				default: ''
			},
			ifCode: {
				type: Boolean,
				default: false
			},
			codeButtonStyle: {
				type: String,
				default: ''
			},
			phoneNum: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			filterFc: {
				type: Function,
				default: null
			},
			filterType: {
				type: String,
				default: ''
			},
			verifyFc: {
				type: Function,
				default: null
			},
			verifyType: {
				type: String,
				default: ''
			},
			inputDebounceSet: {
				type: Object,
				default () {
					return {
						openInputDebounce: true,
						delay: 500
					};
				}
			},
			customId: {
				type: [String, Object],
				default: ''
			}
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		computed: {
			iconSize() {
				return this.fontSize + 8;
			},
			btnSize() {
				return this.fontSize - 8;
			}
		},
		created() {
			this.delForm();
			this.setForm(this.value);
		},
		watch: {
			value(n, o) {
				// _app.log('value改变了， 改变之前:' + o + ', 改变之后:' + n);
				this.setForm(n);
			}
		},
		data() {
			return {
				passwordBl: !!this.password,
				focusBl: false,
				inputDebounce: {},
				userCode: '', //用户输入的验证码
				codeCount: 90, //获取验证码后倒计时时间
				code: '',
				startCode: false, //获取验证码状态
				requiredSign: _app.requiredSign
			}
		},
		methods: {
			inputs_change({
				detail: {
					value
				}
			}) { // 用户输入时，根据index赋值
				//_app.log(e.detail.value);
				// _app.log(index);
				const inputDebounce = this.inputDebounce;
				if (this.inputDebounceSet.openInputDebounce) {
					if (inputDebounce.debounce) clearTimeout(inputDebounce.debounce);
					if (inputDebounce.debounceTime && new Date().getTime() - inputDebounce.debounceTime < (
							this.inputDebounceSet.delay || 500)) {
						_app.log('防抖冲突,立即执行')
						this.inputs_changeFc(value, true);
					} else {
						inputDebounce.debounce = setTimeout(() => {
							_app.log('防抖')
							this.inputs_changeFc(value);
						}, this.inputDebounceSet.delay || 500);
					}
				} else {
					_app.log('无防抖')
					this.inputs_changeFc(value);
				}
			},
			inputs_changeFc(value, clash) {
				const inputDebounce = this.inputDebounce;
				if (this.inputDebounceSet.openInputDebounce) {
					if (clash) inputDebounce.debounceTime = 0;
					else inputDebounce.debounceTime = new Date().getTime();
				}
				if (this.filterFc && typeof(this.filterFc) == 'function') { //有filterFc则过滤
					this.input_filter_change(value, this.filterFc);
				} else if (this.filterType && _app.filterTypeObj[this.filterType] && typeof(_app.filterTypeObj[this.filterType]) ==
					'function') {
					this.input_filter_change(value, _app.filterTypeObj[this.filterType]);
				} else {
					this.setValue(value);
				}
			},
			input_filter_change(value, filterFc) {
				const val = filterFc(value);
				if (val !== value) {
					new Promise((reslove, reject) => {
							this.setValue(' ');
							reslove();
						})
						.then(() => {
							this.setValue(val);
						})
				} else {
					this.setValue(val);
				}
			},
			setValue(value) {
				_app.log('input设置value:' + value);
				this.$emit('input', value);
				this.$emit('change', value);
			},
			focusChange() {
				this.focusBl = true;
			},
			blurChange() {
				this.focusBl = false;
			},
			inputTap(type) { //input点击事件
				switch (type) {
					case 'password': //密码显隐
						this.passwordBl = !this.passwordBl
						break;
					case 'clear': //一键清除
						this.setValue('');
						break;
					case 'custom':
						this.inputCustomTapFc();
						break;
					case 'button':
						this.inputCustomTapFc();
						break;
					default:
						_app.showToast('inputTap类型错误');
						break;
				}
			},
			async inputCustomTapFc() {
				try {
					const data = await _app.inputCustomTapFc(this.customId);
					if (data !== undefined && data !== null) {
						this.setValue(data);
					}
				} catch (e) {
					//TODO handle the exception
					const data = await _app.inputCustomTapCatchFc(this.customId, e);
					if (data !== undefined && data !== null)
						this.setValue(data);
				}
			},
			getCode() { // 判断是否正确输入手机号后发送验证码并倒计时
				let _this = this;
				if (_this.startCode) return;
				const phone = this.phoneNum;

				if (_app.regTest('Tel', phone)) { //正则判断
					_this.code = _app.sendSMS(this.customId, phone);
				} else {
					_app.showToast('请正确输入11位手机号');
					return;
				}

				let setInterValFunc = setInterval(() => { //定时器
					if (_this.codeCount > 0)
						--_this.codeCount;
					else {
						_this.startCode = false;
						clearInterval(setInterValFunc);
						_this.code = '';
						_this.codeCount = 90;
					}
				}, 1000)
				_this.startCode = true;
			},
			checkCode(cb) {
				let result = false;
				let msg = '';
				if (this.ifCode) {
					if (!this.code) {
						msg = '请先获取验证码';
					} else if (!this.value) {
						msg = '请填写验证码';
					} else if (this.value !== this.code) {
						msg = '验证码不正确';
						this.code = '';
						this.setValue('');
					} else {
						result = true;
						msg = '验证通过';
					}
				} else {
					result = true;
					msg = '未启用验证码功能';
				}

				const obj = {
					result,
					msg
				};
				if (cb && typeof(cb) === 'function') {
					cb(obj);
				} else {
					return obj;
				}
			},
			delForm() {
				if (this.name && this.variableName) {
					_app.delForm({
						name: this.name,
						variableName: this.variableName,
					})
				}
			},
			setForm(value) {
				if (this.name && this.variableName) {
					_app.setForm({
						title: this.title,
						name: this.name,
						variableName: this.variableName,
						value,
						type: _app.typeObj.input,
						required: this.required,
						verifyFc: this.verifyFc,
						verifyType: this.verifyType
					})
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../../css/inputs.css");
</style>
