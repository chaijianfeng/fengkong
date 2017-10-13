$(function() {
	var $table = $('#table');
	/*
	 * 显示行号 { formatter : function(value,row,index){ return index+1; } }
	 */
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '协议编号',
		field : 'id',
		formatter : formatterLookInfo
	}, {
		title : '协议名称',
		field : 'name'
	}, {
		title : '签订日期',
		field : 'qdDate'
	}, {
		title : '代理方',
		field : 'daili'
	}, {
		title : '审核状态',
		field : 'shStatus',
		formatter : formatterStatus,
		align : 'center'
	}, {
		title : '关联状态',
		field : 'glStatus',
		formatter : formatterGlStatus,
		align: 'center'
	}

	];
	var data = [ {
		"id" : "17646366093601500",
		"name" : "办公用品运输协议",
		"qdDate" : "2014-06-26",
		"daili" : "蚂蚁物流",
		"shStatus" : "1",
		"glStatus" : "0"
	}, {
		"id" : "19574380703777430",
		"name" : "电子配件运输协议",
		"qdDate" : "2015-01-21",
		"daili" : "德邦物流",
		"shStatus" : "0",
		"glStatus" : "1"
	}];

	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover table-no-bordered', // 添加样式名称
		striped : true, // 隔行变色
		search : true, // 显示搜索工具条
		searchAlign : 'left',
		toolbar : '.myBtn',
		toolbarAlign : 'right',
		// buttonsAlign : 'left',
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
		console.log(this);
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "运输协议详情",
			area : [ "70%", "65%" ],
			content : "../../pages/hetong/wuliu/detail.html"
		});
	});

	// 添加
	$(document).on("click", "#add", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "添加运输协议",
			area : [ "70%", "65%" ],
			content : "../../pages/hetong/wuliu/add.html"
		});
	});

	// 修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			parent.layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改运输协议",
				area : [ "70%", "65%" ],
				content : "../../pages/hetong/wuliu/add.html",
				success : function(layero, index) {
					var currentFrame = layero.find("iframe")[0].contentWindow.document;
					setFormData('addInfoForm',currentFrame, selectRows[0]);
				}
			});
		} else {
			parent.layer.msg("请选择一条数据进行编辑!");
		}
	});

	// 删除
	$(document).on('click', '#delete', function() {
		parent.layer.confirm('确定要删除吗?', {
			btn : [ "确定" ]
		}, function() {
			var selectRows = $table.bootstrapTable('getSelections');
			selectRows = selectRows.map(function(item) {
				return item.id;
			});
			$table.bootstrapTable('remove', {
				field : 'id',
				values : selectRows
			});
			parent.layer.msg('删除成功!');
		});

	});

	// 审核
	$(document).on('click', '#shenhe', function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "供货商审核",
			area : [ "40%", "40%" ],
			content : "../../pages/ruzhu/shenhe.html"
		});

	});
	
	//import
	$(document).on('click', '#import', function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "导入文件",
			area : [ "60%", "60%" ],
			content : "../../pages/include/import.html"
		});

	});
	
	//查看货物清单
	$(document).on('click', '.searchBtn', function() {
		console.log($(this).attr("id"));
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "货物清单",
			area : [ "80%", "80%" ],
			content : "../../pages/hetong/chukou/goods.html"
		});

	});
	
	//查看关联信息
	$(document).on('click', '.glBtn', function() {
		console.log($(this).attr("id"));
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "关联信息",
			area : [ "60%", "60%" ],
			content : "../../pages/hetong/chukou/guanlian.html"
		});

	});
	
	/*
	 * 格式化关联状态
	 * */
	function formatterGlStatus(value, row, index) {
		var title = '';
		var className = '';
		if(value==0){
			title = '未关联';
			className = 'fa-times-circle text-danger';
		}else if(value==1){
			title = '已关联';
			className = 'fa-check-circle-o text-success';
		}
		return '<a href="javascript:;" id="'+row.id+'" class="text-info glBtn"><i title="'+title+'" class="fa '+className+'"></i></a>';
	}
});
