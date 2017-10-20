$(function() {

	// 任务详情信息
	var infos = [ {
		name : "所属期",
		value : "201709"
	}, {
		name : "批次",
		value : "05"
	}, {
		name : "备案日期",
		value : "2017-09-27"
	} ],
	
	// 历史操作数据
	hisColumns = [ {
		title : '序号',
		field : 'id'
	}, {
		title : '创建人',
		field : 'czname'
	}, {
		title : '创建时间',
		field : 'czTime'
	}, {
		title : '当前环节',
		field : 'hj'
	}, {
		title : '操作人',
		field : 'ctrl'
	}, {
		title : '操作时间',
		field : 'ctrlTime'
	} ],
	
	
	hisData = [ 
		{
			"id" : "CK201709220002",
			"czname" : "张三",
			"czTime" : "2017-05-11",
			"hj" : "预关单审核",
			"ctrl" : "王五",
			"ctrlTime" : "2017-05-13"
		}
	];
	//任务详情添加
	initDetailInfo({
		id : "info",
		elems : infos
	});

	// 历史记录
	initBootStrapTable({
		id : "historyList",
		columns : hisColumns,
		data : hisData
	});

});
