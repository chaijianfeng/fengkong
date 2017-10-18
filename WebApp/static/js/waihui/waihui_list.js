$(function() {
	var $table = $('#table');
	/*
	 * 显示行号 { formatter : function(value,row,index){ return index+1; } }
	 */
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '关单号',
		field : 'id',
		formatter : formatterLookInfo
	}, {
		title : '出口口岸',
		field : 'kouan'
	}, {
		title : '贸易类型',
		field : 'myType'
	}, {
		title : '运抵国',
		field : 'guobie'
	}, {
		title : '出口日期',
		field : 'ckDate'
	}, {
		title : '收汇状态',
		field : 'shactive',
		formatter : formatterLookInfos
	}

	];
	var data = [ {
		"id" : "000000000092371271",
		"ckDate" : "2014-10-19",
		"myType" : "一般贸易",
		"kouan" : "天津港",
		"guobie" : "德国",
		"shactive" : "已收汇"
	}, {
		"id" : "000000000092371949",
		"ckDate" : "2017-02-10",
		"myType" : "一般贸易",
		"kouan" : "天津港",
		"guobie" : "日本",
		"shactive" : "未收汇"
	} ];

	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover', // 添加样式名称
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
		
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "报关单详情",
			area : [ "80%", "80%" ],
			content : "../../pages/waihui/detail.html"
		});
	});

	// 添加
	$(document).on("click", "#add", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "添加出口合同",
			area : [ "70%", "65%" ],
			content : "../../pages/hetong/chukou/add.html"
		});
	});

	// 修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			parent.layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改供货商信息",
				area : [ "70%", "65%" ],
				content : "../../pages/hetong/chukou/add.html",
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
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length >= 1) {
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
		}else{
			parent.layer.msg("请选择一条数据进行编辑!");
		}
	});

	// 查看报关行预关单
	$(document).on('click', '.lookInfos', function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "收汇状态",
			content : "../../pages/waihui/add.html"
		});

	});

});
function formatterLookInfos(value, row, index) {
	return '<a href="javascript:;" class="text-info lookInfos">' + value + '</a>';
}