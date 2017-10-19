$(document).ready(function(){
	var $table = $('#table');
	var columns = [ 
		{
			field : 'select',
			checkbox : true
		},
		{
			title : '关单号',
			field : 'name',
			formatter : formatterLookInfo
		}, 
		{
			title : '出口口岸',
			field : 'ckcan'
		}, 
		{
			title : '贸易方式',
			field : 'type'
		}, 
		{
			title : '运抵国',
			align:'center',
			field : 'country'
		}, 
		{
			title : '出口日期',
			align:'center',
			field : 'ckTime'
		}, 
		{
			title : '收汇状态',
			align:'center',
			field : 'shactive'
		}, 
		{
			title : '剩余天数',
			align:'center',
			field : 'lastday'
		}
	];

	var data = [ 
		{
			"name" : "000000000092371271",
			"ckcan" : "天津新港",
			"type" : "一般贸易",
			"country" : "美国",
			"ckTime" : "2017-05-24",
			"shactive" : "未收汇",
			"lastday" : "53"
		}, 
		{
			"name" : "000000000092371223",
			"ckcan" : "天津新港",
			"type" : "一般贸易",
			"country" : "美国",
			"ckTime" : "2017-05-22",
			"shactive" : "未收汇",
			"lastday" : "33"
		}
	];

	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover', // 添加样式名称
		striped : true, // 隔行变色
		search : true, // 显示搜索工具条
		searchAlign : 'left',
		toolbar : '.myBtn',
		toolbarAlign : 'right',
		showExport : true,
		exportTypes : [ 'txt', 'csv', 'excel' ],
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		height : $('body').height() - 32,
		pagination : true,
		columns : columns,
		data : data
	});

	// 查看详情
	$(document).on("click", ".lookInfo", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "供货商信息",
			area : [ "80%", "80%" ],
			content : "../../pages/yujing/shenbao/detail.html"
		});
	});
	
	//添加
	$(document).on("click", "#add", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "添加供货商信息",
			area : [ "70%", "65%" ],
			content : "../../pages/ruzhu/add.html"
		});
	});
	
	//修改
	$(document).on("click", "#update", function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if(selectRows.length===1){
			parent.layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改供货商信息",
				area : [ "70%", "65%" ],
				content : "../../pages/ruzhu/add.html",
				success: function (layero, index) {  
	                // layero.find("iframe")        找到iframe的jquery对象  
	                // layero.find("iframe")[0]     将jqeruy对象转化为Dom对象  
	                // contentWindow                获取当前 iframe 的 内容 window对象（Dom对象）  
					var currentFrame = layero.find("iframe")[0].contentWindow.document;
					setFormData('addInfoForm',currentFrame,selectRows[0]);
	            }
			});
		}else{
			parent.layer.msg("请选择一条数据进行编辑!");
		}
	});
	
	//删除
	$(document).on('click','#delete',function(){
		parent.layer.confirm('确定要删除吗?',{btn:["确定"]},function(){
			var selectRows = $table.bootstrapTable('getSelections');
			selectRows = selectRows.map(function(item){
				return item.nsrsbh;
			});
			$table.bootstrapTable('remove', {field: 'nsrsbh', values: selectRows});
			parent.layer.msg('删除成功!');
		});
	});
	
	//审核
	$(document).on('click','#shenhe',function(){
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "供货商审核",
			area : [ "40%", "40%" ],
			content : "../../pages/ruzhu/shenhe.html"
		});
	});
	
	
});