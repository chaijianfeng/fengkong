$(function() {
	var $table = $('#table');
	/*
	 * 显示行号 { formatter : function(value,row,index){ return index+1; } }
	 */
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '发票代码',
		field : 'id',
		formatter : formatterLookInfo
	}, {
		title : '发票号码',
		field : 'number'
	}, {
		title : '通知单号',
		field : 'tzid'
	}, {
		title : '销方名称',
		field : 'name'
	}, {
		title : '销方识别号',
		field : 'nameid'
	}, {
		title : '金额（元）',
		field : 'money'
	}, {
		title : '税额（元）',
		field : 'smoney'
	}, {
		title : '开票日期',
		field : 'kpDate'
	}, {
		title : '认证日期',
		field : 'rzDate'
	}
	];
	var data = [ {
		"id" : "1160123197",
		"number" : "15703421",
		"tzid" : "000000000092371234",
		"name" : "南京某自动化系统工程有限公司",
		"nameid" : "913201059901289233",
		"money" : "495",
		"smoney" : "2737.66",
		"kpDate" : "2014-01-28",
		"rzDate" : "2014-08-28"
	}, {
		"id" : "1160123197",
		"number" : "15703421",
		"tzid" : "000000000092371124",
		"name" : "宝鸡某石油机械厂",
		"nameid" : "913201059901289123",
		"money" : "105",
		"smoney" : "2734.66",
		"kpDate" : "2014-02-28",
		"rzDate" : "2014-08-28"
	}, {
		"id" : "1160123193",
		"number" : "15702234",
		"tzid" : "000000000092371232",
		"name" : "扬州某点电缆股份有限公司",
		"nameid" : "913201059901281213",
		"money" : "119",
		"smoney" : "2712.66",
		"kpDate" : "2014-03-28",
		"rzDate" : "2014-08-28"
	}];

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
			content : "../../pages/piaoju/fapiao/detail.html"
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