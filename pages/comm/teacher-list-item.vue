<template>
	<view class="">
		<view :key="teacher.id" v-for="(teacher, index) in teachers" class="teacher-list-item">
			<view class="teacher-item" @click="goDetail(teacher)">
				<view class="item-left">
					<!-- <image v-if="teacher.avatar" class="image" :src="teacher.avatar"></image> -->
					<!-- <image class="image" src="../../../static/teacher_128.png"></image> -->
					<!-- <view v-else class="avatar" :class="colorHash(index)">{{teacher.name}}</view> -->
				</view>
				<view class="item-right">
					<view class="name">
						<text class="header">{{teacher.name}}</text>
						<!-- <text class="title">{{teacher.title}}</text> -->
						<text class="title">老师</text>
					</view>
					<text v-if="subTime(time, teacher.zbsj)" class="time" :key="idx" v-for="(time, idx) in subDateTimes">
						<text>{{subTime(time, teacher.zbsj)}}</text>
					</text>
					<view :class="teacher.flag ? 'more-desc' : ''" class="desc">{{teacher.skill}}</view>
				</view>
			</view>
			<view class="more-btn" @click="lookDetail(index)">
				{{titleFunc(teacher)}}
				<uni-icon :type="teacher.flag ? 'arrowup' : 'arrowdown'" size="20"></uni-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"

	export default {
		data() {
			return {
				teachers: [],
				arrTimes: [],
			}
		},

		created() {
			const length = this.teacherList.length;
			for (let i = 0; i < length; i++) {
				this.teachers.push(this.teacherList[i]);
			}
		},

		watch: {
			teacherList(newVal) {
				const length = newVal.length;
				this.teachers = [];
				for (let i = 0; i < length; i++) {
					this.teachers.push(newVal[i]);
				}
			}
		},

		methods: {
			lookDetail(idx) {
				const list = [];
				const length = this.teachers.length;
				this.teachers[idx].flag = !!!this.teachers[idx].flag
				for (let i = 0; i < length; i++) {
					list.push(this.teachers[i]);
				}
				this.teachers = list;
			},
			subTime(time, times) {
				const arrTimes = times.split(',');
				const idx = arrTimes.findIndex((val) => {
					return time.code === val;
				});
				return idx > -1 ? time.detail : null;
			},
			colorHash(index) {
			    return `avatar-color-${this.simpleHash(index)}`;
			},
			simpleHash(key, mod = 8) {
				return Math.abs(key % mod);
			},
			goDetail(obj) {
				this.$emit('choose', obj);
			},
			titleFunc(obj) {
				return obj.flag ? '收起详细' : '查看详细';
			},
		},

		props: ['teacherList', 'choose', 'subDateTimes'],

		components: {
			uniIcon,
		}
	}
</script>

<style lang="scss" scoped>
	.teacher-list-item {
		background: #fff;
	}

	.more-btn {
		text-align: center;
		font-size: 0.9rem;
		padding: 10upx 0upx 10upx 0upx;
	}

	.teacher-item {
		display: flex;
		padding: 40upx 40upx 20upx 40upx;
		// align-items: center;
		background: #fff;
		margin-top: 30upx;

		&:first-child {
			margin-top: 0upx;
		}

		.item-left {
			width: 140upx;
			height: 140upx;
			border-radius: 50%;

			.image {
				width: 100%;
				height: 100%;
				border-radius: 30%;
			}

			.avatar {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				color: #fff;
				line-height: 70px;
				text-align: center;
				overflow: hidden;
				font-size: 2rem;
			}
		}

		.item-right {
			flex: 1;
			margin-left: 20upx;

			.name {
				.header {
					font-size: 1rem;
					font-weight: bold;
				}

				.title {
					font-size: 0.9rem;
					font-weight: 500;
					color: #666;
					margin-left: 40upx;
				}
			}
			
			.time {
				font-size: 0.75rem;
				font-weight: 500;
				margin-right: 10upx;
				color: #666;
			}

			.desc {
				padding: 10upx 0upx 10upx 0upx;
				font-size: 0.9rem;
				color: #666;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				line-height: 50upx;
				height: 88upx;
				-webkit-line-clamp: 2;
				/* autoprefixer: off */
				-webkit-box-orient: vertical;

				/* autoprefixer: on */
				&.more-desc {
					display: block;
					height: 100%;
				}
			}
		}
	}
</style>
