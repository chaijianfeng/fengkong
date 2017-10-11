$(function(){
	// 供货商信息
	var infos = [ {
		name : "供货商名称",
		value : "创立信电子厂"
	}, {
		name : "企业海关代码",
		value : "4016999090"
	}, {
		name : "纳税人识别号",
		value : "913201059901675"
	}, {
		name : "企业类型",
		value : "生产"
	}, {
		name : "社会信用代码",
		value : "12122334523412"
	}, {
		name : "成立日期",
		value : "2013-02-18"
	}, {
		name : "等级机关",
		value : ""
	}, {
		name : "法人代表",
		value : ""
	}, {
		name : "内部评估等级",
		value : "白"
	}, {
		name : "纳税信用等级",
		value : "A"
	}, {
		name : "注册资本",
		value : "500万"
	}, {
		name : "邮编",
		value : "100000"
	}, {
		name : "截止期限",
		value : "100000"
	} ];
	
	//联系方式
	var links = [ {
		name : "联系人",
		value : "小白"
	}, {
		name : "固定电话",
		value : "010-xx12x36XX"
	}, {
		name : "手机",
		value : "135XXXXXXXX"
	}, {
		name : "注册地址",
		value : "北京XXX"
	}, {
		name : "开户行",
		value : "北京XXX"
	}, {
		name : "账户",
		value : "6220XXX354535X"
	}, {
		name : "经营范围",
		value : ""
	}, {
		name : "备注",
		value : ""
	}];
	
	// 附件信息
	var files = [ {
		name : "营业执照",
		value : "<a href='营业执照.zip'>营业执照.zip</a>"
	}];

	// 供货商详情
	initDetailInfo({
		id : "info",
		elems : infos
	});
	
	// 联系方式 
	initDetailInfo({
		id : "link",
		elems : links
	});
	
	// 附件
	initDetailInfo({
		id : "fujian",
		elems : files
	});
})