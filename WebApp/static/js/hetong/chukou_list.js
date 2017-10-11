$(function() {
	var $table = $('#table');
	/*
	 * 显示行号 { formatter : function(value,row,index){ return index+1; } }
	 */
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '合同编号',
		field : 'id',
		formatter : formatterRenWuNo
	}, {
		title : '合同名称',
		field : 'name'
	}, {
		title : '签订日期',
		field : 'qdDate'
	}, {
		title : '买方',
		field : 'goufang'
	}, {
		title : '卖方',
		field : 'maifang'
	}, {
		title : '出口国别',
		field : 'guobie'
	}, {
		title : '贸易方式',
		field : 'myType'
	}, {
		title : '货物清单',
		field : 'projects'
	}, {
		title : '审核状态',
		field : 'shStatus',
		formatter : formatterStatus,
		align : 'center'
	}, {
		title : '关联状态',
		field : 'glStatus'
	}

	];
	var data = [ {
		"id" : "HT1818991184283",
		"name" : "办公用品出口合同",
		"qdDate" : "2015-11-07",
		"goufang" : "德国Elvira公司",
		"maifang" : "中国进出口贸易公司",
		"guobie" : "德国",
		"myType" : "一般贸易",
		"projects" : "货物清单",
		"shStatus" : "1",
		"glStatus" : "0"
	}, {
		"id" : "HT1818991184284",
		"name" : "电子配件出口合同",
		"qdDate" : "2015-04-11",
		"goufang" : "美国Kristen公司",
		"maifang" : "中国进出口贸易公司",
		"guobie" : "美国",
		"myType" : "一般贸易",
		"projects" : "货物清单",
		"shStatus" : "0",
		"glStatus" : "0"
	} ];

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
	$(document).on("click", ".lookRenWuInfo", function() {
		console.log(this);
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "出口合同详情",
			area : [ "70%", "65%" ],
			content : "../../pages/hetong/operation/chukou_detail.html"
		});
	});

	// 添加
	$(document).on("click", "#add", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "添加供货商信息",
			area : [ "70%", "65%" ],
			content : "../../pages/ruzhu/operation/add.html"
		});
	});

	// 修改
	$(document)
			.on(
					"click",
					"#update",
					function() {
						var selectRows = $table.bootstrapTable('getSelections');
						if (selectRows.length === 1) {
							parent.layer
									.open({
										type : 2,
										skin : 'myLayui', // 样式类名
										title : "修改供货商信息",
										area : [ "70%", "65%" ],
										content : "../../pages/ruzhu/operation/add.html",
										success : function(layero, index) {
											// layero.find("iframe")
											// 找到iframe的jquery对象
											// layero.find("iframe")[0]
											// 将jqeruy对象转化为Dom对象
											// contentWindow 获取当前 iframe 的 内容
											// window对象（Dom对象）
											var currentFrame = layero
													.find("iframe")[0].contentWindow.document;
											setFormData('ruzhu_add',
													currentFrame, selectRows[0]);
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
				return item.nsrsbh;
			});
			$table.bootstrapTable('remove', {
				field : 'nsrsbh',
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
			content : "../../pages/ruzhu/operation/shenhe.html"
		});

	});

});