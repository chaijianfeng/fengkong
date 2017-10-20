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
		align:'center',
		field : 'id',
		formatter : formatterLookInfo
	}, {
		title : '合同名称',
		align:'center',
		field : 'name'
	}, {
		title : '签订日期',
		align:'center',
		field : 'qdDate'
	}, {
		title : '买方',
		align:'center',
		field : 'goufang'
	}, {
		title : '卖方',
		align:'center',
		field : 'maifang'
	}, {
		title : '合同金额',
		align:'center',
		field : 'totalMoney'
	},{
		title : '货物清单',
		field : 'projects',
		align : 'center',
		formatter: formatterTitleToSearchButton
	}, {
		title : '审核状态',
		field : 'shStatus',
		align : 'center',
		formatter : formatterStatus
	}, {
		title : '关联状态',
		field : 'glStatus',
		align: 'center',
		formatter : formatterGlStatus
	}

	];
	var data = [ {
		"id" : "CG1818991184244",
		"name" : "HUFF采购合同",
		"qdDate" : "2017-03-25",
		"goufang" : "中国进出口贸易公司",
		"maifang" : "广东GYNKO有限公司",
		"totalMoney": "15,0631",
		"projects" : "货物清单",
		"shStatus" : "1",
		"glStatus" : "0",
		"cjfs" : "FOB",
		"ysfs" : "水路运输",
		"ckka" : "天津新港"
	}, {
		"id" : "CG1818991184223",
		"name" : "SYLVIA采购合同",
		"qdDate" : "2017-04-08",
		"goufang" : "中国进出口贸易公司",
		"maifang" : "北京QNEKT有限责任公司	",
		"totalMoney": "18,8198",
		"projects" : "货物清单",
		"shStatus" : "0",
		"glStatus" : "1",
		"cjfs" : "CIF",
		"ysfs" : "航空运输",
		"ckka" : "北京机场"
	} ];

	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover', // 添加样式名称 //添加此样式让框消失table-no-bordered
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
		Pagination: true,
		columns : columns,
		data : data
	});

	// 查看详情
	$(document).on("click", ".lookInfo", function() {
		console.log(this);
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "出口合同详情",
			area : [ "70%", "65%" ],
			content : "../../pages/hetong/caigou/detail.html"
		});
	});

	// 添加
	$(document).on("click", "#add", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "添加出口合同",
			area : [ "70%", "65%" ],
			content : "../../pages/hetong/caigou/add.html"
		});
	});

	// 修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			parent.layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改采购合同信息",
				area : [ "70%", "65%" ],
				content : "../../pages/hetong/caigou/add.html",
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
