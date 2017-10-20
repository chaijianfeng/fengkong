$(function() {
	
	var columns = [ {
		field : 'state',
		align:'center',
		checkbox : true
	}, {
		title : '任务编号',
		align:'center',
		field : 'id',
		formatter : formatterLookInfo
	}, {
		title : '出口国别',
		align:'center',
		field : 'guobie'
	}, {
		title : '业务类型',
		align:'center',
		field : 'type'
	}, {
		title : '出口口岸',
		align:'center',
		field : 'kouan'
	}, {
		title : '运输方式',
		align:'center',
		field : 'yunshufangshi'
	}, {
		title : '当前环节',
		align:'center',
		field : 'huanjie'
	}, {
		title : '操作人',
		align:'center',
		field : 'createName'
	}, {
		title : '操作时间',
		align:'center',
		field : 'createTime'
	} /*
		 * , { title : '操作', field : 'operation' }
		 */];
	var username = sessionStorage.getItem("name");
	if(username != "管理员"){
		columns.push({title : '操作', field : 'operation',formatter:formatOperation});
	}
	var data = [ {
		"id" : "CK201709220001",
		"guobie" : "法国",
		"type" : "一般贸易",
		"kouan" : "天津新港",
		"yunshufangshi" : "水路运输",
		"huanjie" : "创建任务",
		"createName" : "张三",
		"createTime" : "2017-09-27",
		"operation" : "未处理"
	}, {
		"id" : "CK201709220002",
		"guobie" : "美国",
		"type" : "承包工程",
		"kouan" : "北京机场",
		"yunshufangshi" : "航空运输",
		"huanjie" : "创建任务",
		"createName" : "张三",
		"createTime" : "2017-09-27",
		"operation" : "未处理"
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
		//console.log(this);
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "任务详情",
			area : [ "80%", "80%" ],
			content : "../../pages/liucheng/detail.html"
		});
	});
	
	
	$(document).on('click','.main_rewu_ope_btn',function(){
		handlerRenWu(username);
	});
	
	function handlerRenWu(username){
		if(username == "张三"){
			//columns.push({title : '操作', field : 'operation',formatter:formatOperation});
			console.log(username);
		}
		
		layer.open({
			type :2,
			title : ''
		});
	}

});

//格式化处理任务
function formatOperation(value,row,index){
	return '<a href="javascript:;" class="text-info main_rewu_ope_btn">'+value+'</a>';
}
