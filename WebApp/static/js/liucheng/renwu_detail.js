$(function() {

	// 任务详情信息
	var infos = [ {
		name : "任务编号",
		value : "CK201709220001"
	}, {
		name : "出口国别",
		value : "委内瑞拉"
	}, {
		name : "业务类型",
		value : "一般贸易"
	}, {
		name : "出口口岸",
		value : "天津新港"
	}, {
		name : "运输方式",
		value : "水路运输"
	}, {
		name : "当前环节",
		value : "创建任务"
	}, {
		name : "操作人",
		value : "张三"
	}, {
		name : "操作时间",
		value : "2017-09-27"
	} ],
	
	// 货物清单数据
	
	
	columns = [ {
		title : '物资名称',
		field : 'name'
	}, {
		title : '数量',
		field : 'number'
	}, {
		title : '规格型号',
		field : 'guige'
	}, {
		title : '计量单位',
		field : 'danwei'
	}, {
		title : '单价',
		field : 'oneMoney'
	}, {
		title : '总价',
		field : 'totalMoney'
	}, {
		title : '供货方',
		field : 'company'
	}], 
	data = [
		{
			"name": "电视监控系统配件 防爆液晶显示器 ",
			"number": 1,
			"guige": "X-000 ",
			"danwei": "套",
			"oneMoney": 9662.39,
			"totalMoney": 9662.39,
			"company": "南京某自动化系统工程有限公司"
		},
		{
			"name": "电视监控系统配件 控制器内变压器 ",
			"number": 2,
			"guige": "ZJYP-4-2 220VAC/15VAC*⑴",
			"danwei": "套",
			"oneMoney": 146.16,
			"totalMoney": 292.32,
			"company": "南京某自动化系统工程有限公司"
		},
		{
			"name": "40钻机橡胶配件 ZJ40 钻井平台防滑板 ",
			"number": 50,
			"guige": "510*510*30 天然橡胶",
			"danwei": "件",
			"oneMoney": 1074.23,
			"totalMoney": 53711.54,
			"company": "宝鸡某石油机械厂"
		},
		{
			"name": "铜芯塑料绝缘电力电缆 VVR ",
			"number": 0.6,
			"guige": "3*6+1*4mm2 1kV GB/T 127*⑴",
			"danwei": "km",
			"oneMoney": 13569.23,
			"totalMoney": 8141.54,
			"company": "扬州某点电缆股份有限公司"
		},
		{
			"name": "铜芯塑料绝缘电力电缆 VVR ",
			"number": 0.2,
			"guige": "3*2.5+1*1.5 0.6/1kV GB/*⑴",
			"danwei": "km",
			"oneMoney": 7634.85,
			"totalMoney": 1526.97,
			"company": "扬州某点电缆股份有限公司"
		}
	],
	
	
	// 历史操作数据
	hisColumns = [ {
		title : '操作人',
		field : 'czName'
	}, {
		title : '历史操作',
		field : 'lscz'
	}, {
		title : '操作时间',
		field : 'czTime'
	}, {
		title : '说明',
		field : 'sm'
	} ],

	hisData = [ {
		"lscz" : "创建任务",
		"czName" : "张三",
		"czTime" : "2017-09-27",
		"sm" : ""
	} ];
	
	//任务详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});
	
	// 货物清单
	initBootStrapTable({
		id : "tableList",
		columns : columns,
		data : data
	});

	// 历史记录
	initBootStrapTable({
		id : "historyList",
		columns : hisColumns,
		data : hisData
	});

});
