$(function() {
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '任务编号',
		field : 'id',
		formatter : formatterLookInfo
	}, {
		title : '出口国别',
		field : 'guobie'
	}, {
		title : '业务类型',
		field : 'type'
	}, {
		title : '出口口岸',
		field : 'kouan'
	}, {
		title : '运输方式',
		field : 'yunshufangshi'
	}, {
		title : '当前环节',
		field : 'huanjie'
	}, {
		title : '操作人',
		field : 'createName'
	}, {
		title : '操作时间',
		field : 'createTime'
	}, {
		title : '剩余时间',
		field : 'lastday'
	}, {
		title : '截止时间',
		field : 'endTime'
	}, {
		title : '说明',
		field : 'sign'
	} /*
		 * , { title : '操作', field : 'operation' }
		 */];
	var data = [ {
		"id" : "CK201709220001",
		"guobie" : "法国",
		"type" : "一般贸易",
		"kouan" : "天津新港",
		"yunshufangshi" : "水路运输",
		"huanjie" : "创建任务",
		"createName" : "张三",
		"createTime" : "2017-09-27",
	// "operation" : "未处理"
		"lastday": "2天",
		"endTime": "2017-11-22",
		"sign": ""
	}, {
		"id" : "CK201709220002",
		"guobie" : "美国",
		"type" : "承包工程",
		"kouan" : "北京机场",
		"yunshufangshi" : "航空运输",
		"huanjie" : "创建任务",
		"createName" : "张三",
		"createTime" : "2017-09-27",
	// "operation" : "未处理"
	    "lastday": "2天",
		"endTime": "2017-11-22",
		"sign": ""
	} ];
	$('#table').bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover', // 添加样式名称
		striped : true, // 隔行变色
		search : true, // 显示搜索工具条
		searchAlign : 'left',
		// showToggle : true,//切换详情
		// showRefresh : true, //刷新按钮
		// showColumns : true,
		// paginationDetailHAlign : 'right',
		// showFooter : true,
		// toolbar : '.myBtn',
		toolbarAlign : 'right',
		showExport : true,
		exportTypes : [ 'txt', 'csv', 'excel' ],
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		// showPaginationSwitch : true,
		height : $('body').height() - 32,
		pagination : true,
		columns : columns,
		data : data
	});

	// 查看详情
	$(document).on("click", ".lookInfo", function() {
		console.log(this);
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "任务详情",
			area : [ "80%", "80%" ],
			content : "../../pages/yujing/renwu/detail.html"
		});
	});

});