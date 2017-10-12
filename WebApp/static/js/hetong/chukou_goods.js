$(function() {
	var $table = $('#table');
	/*
	 * 显示行号 { formatter : function(value,row,index){ return index+1; } }
	 */
	var columns = [{
		field : 'state',
		checkbox : true
	},  {
		title : '物资名称',
		field : 'name'
	}, {
		title : '数量',
		field : 'number'
	}, {
		title : '规格型号',
		field : 'guige'
	}, {
		title : '计量单位',
		field : 'danwei'
	}, {
		title : '单价',
		field : 'oneMoney'
	}, {
		title : '总价',
		field : 'totalMoney'
	}, {
		title : '供货方',
		field : 'company'
	}], 
	data = [
		{
			"name": "电视监控系统配件 防爆液晶显示器 ",
			"number": 1,
			"guige": "X-000 ",
			"danwei": "套",
			"oneMoney": 9662.39,
			"totalMoney": 9662.39,
			"company": "南京某自动化系统工程有限公司"
		},
		{
			"name": "电视监控系统配件 控制器内变压器 ",
			"number": 2,
			"guige": "ZJYP-4-2 220VAC/15VAC*⑴",
			"danwei": "套",
			"oneMoney": 146.16,
			"totalMoney": 292.32,
			"company": "南京某自动化系统工程有限公司"
		},
		{
			"name": "40钻机橡胶配件 ZJ40 钻井平台防滑板 ",
			"number": 50,
			"guige": "510*510*30 天然橡胶",
			"danwei": "件",
			"oneMoney": 1074.23,
			"totalMoney": 53711.54,
			"company": "宝鸡某石油机械厂"
		},
		{
			"name": "铜芯塑料绝缘电力电缆 VVR ",
			"number": 0.6,
			"guige": "3*6+1*4mm2 1kV GB/T 127*⑴",
			"danwei": "km",
			"oneMoney": 13569.23,
			"totalMoney": 8141.54,
			"company": "扬州某点电缆股份有限公司"
		},
		{
			"name": "铜芯塑料绝缘电力电缆 VVR ",
			"number": 0.2,
			"guige": "3*2.5+1*1.5 0.6/1kV GB/*⑴",
			"danwei": "km",
			"oneMoney": 7634.85,
			"totalMoney": 1526.97,
			"company": "扬州某点电缆股份有限公司"
		}
	];

	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover table-no-bordered', // 添加样式名称
		striped : true, // 隔行变色
		search : true, // 显示搜索工具条
		searchAlign : 'left',
		toolbar : '.myBtn',
		toolbarAlign : 'right',
		// buttonsAlign : 'left',
		//showExport : true,
		//exportTypes : [ 'txt', 'csv', 'excel' ],
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		height : $('body').height() - 32,
		pagination : true,
		columns : columns,
		data : data
	});


	// 添加
	$(document).on("click", "#add", function() {
		
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "添加物资",
			area : [ "69%", "64%" ],
			content : "../../pages/hetong/chukou/addGood.html"
		});
	});

	// 修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			parent.layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改物资信息",
				area : [ "69%", "64%" ],
				content : "../../pages/hetong/chukou/addGood.html",
				success : function(layero, index) {
					var currentFrame = layero.find("iframe")[0].contentWindow.document;
					setFormData('addInfoForm',currentFrame, selectRows[0]);
				}
			});
		} else {
			parent.layer.msg("请选择一条数据进行编辑!");
		}
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
	

});