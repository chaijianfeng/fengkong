$(function() {
	var $table = $('#table');
	/*
	 * 显示行号 { formatter : function(value,row,index){ return index+1; } }
	 */
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '报关单号',
		field : 'id',
		formatter : formatterLookInfo
	}, {
		title : '贸易类型',
		field : 'myType'
	}, {
		title : '出口国家',
		field : 'guobie'
	}, {
		title : '成交方式',
		field : 'cjway'
	}, {
		title : '出口日期',
		field : 'ckDate'
	}, {
		title : '发票数量',
		field : 'fpmany'
	}, {
		title : '提交人',
		field : 'updatapeople',
		align:'center'
	}, {
		title : '提交时间',
		field : 'updatatime',
		align:'center'
	}

	];
	var data = [ {
		"id" : "220120090519142814",
		"myType" : "一般贸易",
		"guobie" : "委内瑞拉",
		"cjway" : "FOB",
		"ckDate" : "2017-09-19",
		"fpmany" : "3",
		"updatapeople" : "钱八",
		"updatatime" : "2017-09-27"
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
	$(document).on("click", ".lookInfo", function() {
		
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "报关单详情",
			area : [ "80%", "80%" ],
			content : "../../pages/guandan/guandan/detail.html"
		});
	});
	// 生成批次
	$(document).on("click", "#add", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "生成批次",
			area : [ "70%", "65%" ],
			content : "../../pages/tuishui/pici/detail.html"
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


});
function formatterLookInfos(value, row, index) {
	return '<a href="javascript:;" class="text-info lookInfos">' + value + '</a>';
}