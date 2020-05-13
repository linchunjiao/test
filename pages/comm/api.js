const url = 'https://xlzx.ygoclub.com/';
// const url = 'https://54866cec.ngrok.io/';
// const url = 'https://ygo.ngrok2.xiaomiqiu.cn/';
const api = {
	loginBind: {
		real: url + 'ygo/api/xlzx/bXlzxStudent/bind'
	},
	loginCode: {
		real: url + 'ygo/api/xlzx/bXlzxWxMpUser/login'
	},
	getSubTeachers: {
		real: url + 'ygo/api/xlzx/bXlzxZbb/page/query'
	},
	getSubDateTime: {
		real: url + 'ygo/api/framework/sysDict/kind/DICT_KIND_DJZX_TIME'
	},
	setSubPerson: {
		real: url + 'ygo/api/xlzx/bXlzxYyb/mnn/appointment'
	},
	getSubTeams: {
		real: url + 'ygo/api/xlzx/bXlzxTthd/page/query'
	},
	getSubTeamDetail: {
		real: url + 'ygo/api/xlzx/bXlzxTthd/detail/'
	},
	joinActive: {
		real: url + '/ygo/api/xlzx/bXlzxTtbm/appointment'
	},
	getActiveSubTeacher: {
		real: url + 'ygo/api/xlzx/bXlzxYyb/page/query'
	},
	getActiveSubTeam: {
		real: url + 'ygo/api/xlzx/bXlzxTtbm/page/query'
	},
	cancelSubTeacher: {
		real: url + 'ygo/api/xlzx/bXlzxYyb/cancel/appointment'
	},
	cancelSubTeam: {
		real: url + 'ygo/api/xlzx/bXlzxTtbm/cancel/appointment'
	},
	teacherBind: {
		real: url + 'ygo/api/xlzx/bXlzxTeacher/bind'
	},
	getColleges: {
		real: url + 'ygo/api/framework/sysDict/kind/DICT_KIND_XY'
	},
	getmajors: {
		real: url + 'ygo/api/framework/sysDict/kind/DICT_KIND_ZY'
	},
	getTalkList: {
		real: url + 'ygo/api/xlzx/bXlzxConsult/page/query'
	},
	getTeacherInfo: {
		real: url + 'ygo/api/xlzx/bXlzxZxzbb/page/query/date'
	},
	sendMassage: {
		real: url + 'ygo/api/xlzx/bXlzxConsult/send'
	},
	replyMassage: {
		real: url + 'ygo/api/xlzx/bXlzxConsult/reply'
	},
	updateInfo: {
		real: url + 'ygo/api/xlzx/bXlzxStudent/update'
	},
	updateTeacherInfo: {
		real: url + 'ygo/api/xlzx/bXlzxTeacher/update'
	},
};

export default {
	api,
}
