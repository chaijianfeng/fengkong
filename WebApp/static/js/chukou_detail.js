$(function() {

	// 任务详情信息
	var infos = [ {
		name : "合同名称",
		value : "电子配件出口合同"
	}, {
		name : "合同编号",
		value : "HT181898891984"
	}, {
		name : "业务类型",
		value : "一般贸易"
	}, {
		name : "签约日期",
		value : "2017-01-02"
	}, {
		name : "生效日期",
		value : "2017-01-22"
	}, {
		name : "币制",
		value : "人民币"
	}, {
		name : "合同金额:",
		value : "1000$"
	}, {
		name : "结汇方式",
		value : "汇付"
	} , {
		name : "成交方式",
		value : "FOB"
	} , {
		name : "运输方式",
		value : "水路运输"
	} , {
		name : "出口国别",
		value : "泰国"
	} , {
		name : "出口口岸",
		value : "网走"
	} , {
		name : "运抵国",
		value : "泰国"
	} , {
		name : "指运港",
		value : "泰国港"
	} , {
		name : "批准文号",
		value : "GC254678541"
	} , {
		name : "经营单位",
		value : ""
	} , {
		name : "许可证",
		value : ""
	}  , {
		name : "装运期",
		value : ""
	}  , {
		name : "发货单位代码",
		value : ""
	}  , {
		name : "发货单位",
		value : ""
	}  , {
		name : "件数",
		value : ""
	}  , {
		name : "工期起始时间",
		value : ""
	}  , {
		name : "工期结束时间",
		value : ""
	}  , {
		name : "工期（天）",
		value : ""
	}  , {
		name : "不退税标志",
		value : ""
	} 
	
	];
	
	// 附件信息
	var files = [ {
		name : "合同源文件",
		value : "<a href='合同源文件.zip'>合同源文件.zip</a>"
	},{
		name : "投标文件",
		value : "<a href='投标文件.zip'>投标文件.zip</a>"
	},{
		name : "中标文件",
		value : "<a href='中标文件.zip'>中标文件.zip</a>"
	},{
		name : "其他",
		value : "<a href='其他.zip'>其他.zip</a>"
	}];
	
	//任务详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});
	
	// 附件
	initDetailInfo({
		id : "fujian",
		elems : files
	});

});
