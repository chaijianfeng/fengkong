$(function() {

	// 任务详情信息
	var infos = [ {
		name : "合同名称",
		value : "HUFF采购合同"
	}, {
		name : "合同编号",
		value : "CG1818991184244"
	}, {
		name : "签约日期",
		value : "2017-03-25"
	}, {
		name : "生效日期",
		value : "2017-04-25"
	}, {
		name : "币制",
		value : "人民币"
	}, {
		name : "合同金额:",
		value : "1000$"
	}, {
		name : "结汇方式",
		value : "汇付"
	}
	];

	// 联系方式详情
	var links = [
		{
			name : "买方名称",
			value : "美国Kri公司"
		}, {
			name : "卖方名称",
			value : "中国进出口贸易公司"
		}, {
			name : "买方签约人",
			value : ""
		}, {
			name : "卖方签约人",
			value : ""
		}, {
			name : "买方联系电话",
			value : ""
		}, {
			name : "卖方联系电话",
			value : ""
		}, {
			name : "买方地址",
			value : ""
		}, {
			name : "卖方地址",
			value : ""
		}, {
			name : "买方开户行",
			value : ""
		}, {
			name : "卖方开户行",
			value : ""
		}, {
			name : "买方账号",
			value : ""
		}, {
			name : "卖方账号",
			value : ""
		}
	]

	// 附件信息
	var files = [ {
		name : "合同源文件",
		value : "<a href='合同源文件.zip'>合同源文件.zip</a>"
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
