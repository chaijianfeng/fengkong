$(function() {

	// 任务详情信息
	var infos = [ {
		name : "协议编号",
		value : "17646366093601500"
	},{
		name : "协议名称",
		value : "办公用品运输协议"
	},  {
		name : "签约日期",
		value : "2014-06-26"
	}, {
		name : "生效日期",
		value : "2017-01-22"
	}, {
		name : "币制",
		value : "人民币"
	}, {
		name : "金额:",
		value : "400$"
	}, {
		name : "结汇方式",
		value : "汇付"
	} , {
		name : "运输方式",
		value : "水路运输"
	} , {
		name : "发运地",
		value : "&nbsp;"
	} , {
		name : "目的地",
		value : ""
	} , {
		name : "付款日期",
		value : ""
	} , {
		name : "保费",
		value : ""
	}
	];

	// 联系方式详情
	var links = [
		{
			name : "委托方",
			value : "美国Kri公司"
		}, {
			name : "代理方",
			value : "蚂蚁物流"
		}, {
			name : "委托方签约人",
			value : ""
		}, {
			name : "代理方签约人",
			value : ""
		}, {
			name : "委托方联系电话",
			value : ""
		}, {
			name : "代理方联系电话",
			value : ""
		}, {
			name : "委托方开户行",
			value : ""
		}, {
			name : "代理方开户行",
			value : ""
		}, {
			name : "委托方账号",
			value : ""
		}, {
			name : "代理方账号",
			value : ""
		}, {
			name : "委托方地址",
			value : ""
		}, {
			name : "代理方地址",
			value : ""
		}
	]
	
	// 附件信息
	var files = [ {
		name : "上传协议",
		value : "<a href='上传协议.zip'>上传协议.zip</a>"
	},{
		name : "上传提单",
		value : "<a href='上传提单.zip'>上传提单.zip</a>"
	},{
		name : "上传形式发票",
		value : "<a href='上传形式发票.zip'>上传形式发票.zip</a>"
	},{
		name : "上传运输单据",
		value : "<a href='上传运输单据.zip'>上传运输单据.zip</a>"
	},{
		name : "上传发票",
		value : "<a href='上传发票.zip'>上传发票.zip</a>"
	},{
		name : "上传装箱单",
		value : "<a href='上传装箱单.zip'>上传装箱单.zip</a>"
	},{
		name : "其他",
		value : "<a href='其他.zip'>其他.zip</a>"
	}];
	
	//任务详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});

	//联系方式添加
	initUserInfo({
		id : "link",
		elems : links
	});

	// 附件
	initDetailInfo({
		id : "fujian",
		elems : files
	});

});
