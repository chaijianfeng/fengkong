$(function(){
	var $table = $('#table');
	/*
	 * 显示行号 { formatter : function(value,row,index){ return index+1; } }
	 */
	var columns = [ 
		{
			field : 'state',
			align:'center',
			checkbox : true
		}, 
		{
			title : '序号',
			align:'center',
			formatter : function(value,row,index){ 
				/*
				var $pagination = $(".pagination:eq(0)");
				var pageNumber = $pagination.find("li.active:eq(0)").find("a").text();
				alert(pageNumber);
				return (pageNumber-1)*10+index+1; 
				*/
				var page = $table.bootstrapTable("getPage");
				var pageSize = page.pageSize,pageNumber = page.pageNumber;
				return page.pageSize*(page.pageNumber-1)+index+1;
			}
		},
		{
		title : '合同编号',
		align:'center',
		field : 'id',
		formatter : formatterLookInfo
	}, {
		title : '合同名称',
		align:'center',
		field : 'name',
		formatter : formatterTableString
	}, {
		title : '签订日期',
		align:'center',
		field : 'qdDate'
	}, {
		title : '买方',
		align:'center',
		field : 'goufang',
		formatter : formatterTableString
	}, {
		title : '卖方',
		align:'center',
		field : 'maifang',
		formatter : formatterTableString
	}, {
		title : '出口国别',
		align:'center',
		field : 'guobie'
	}, {
		title : '贸易方式',
		align:'center',
		field : 'myType'
	}, {
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
	/*
	var datas = [ {
		"id" : "HT1818991181111",
		"name" : "办公用品出口合同",
		"qdDate" : "2015-11-07",
		"goufang" : "德国Elvira公司",
		"maifang" : "中国进出口贸易公司",
		"guobie" : "德国",
		"myType" : "一般贸易",
		"projects" : "货物清单",
		"shStatus" : "1",
		"glStatus" : "0",
		"cjfs" : "FOB",
		"ysfs" : "水路运输",
		"ckka" : "天津新港"
	}, {
		"id" : "HT1818991182222",
		"name" : "电子配件出口合同",
		"qdDate" : "2015-04-11",
		"goufang" : "美国Kristen公司",
		"maifang" : "中国进出口贸易公司",
		"guobie" : "美国",
		"myType" : "一般贸易",
		"projects" : "货物清单",
		"shStatus" : "0",
		"glStatus" : "1",
		"cjfs" : "CIF",
		"ysfs" : "航空运输",
		"ckka" : "北京机场"
	} ];
	*/
	
	
	/*
	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover', // 添加样式名称
		striped : true, // 隔行变色
		search : true, // 显示搜索工具条
		//searchAlign : 'left',
		toolbar : '#optionsBtn',
		toolbarAlign : 'left',
		// buttonsAlign : 'left',
		//showExport : true,
		//exportTypes : [ 'txt', 'csv', 'excel' ],
		uniqueId : "id",
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		//height : $('body').height(),
		pagination : true,
		columns : columns,
		sidePagination : "server",//分页从服务器加载
		ajax : queryList, //请求后台函数
		queryParams : getParams
	});
	*/

	//表头查询
	$(document).on("click","#thSearchBtn",function(){
		queryData("../../../data/data2.json");
	});
	
	//1.初始化后台查询数据
	function queryList(params,url){
		url = url ? url : "../../../data/data1.json";
		$.get(url,params.data,function(data){
			setTimeout(function(){
				params.success({
					total : data.total,
					rows : data.rows
				});
			},30)
		},"json");
	}
	
	//2.初始查询
	queryData("../../../data/data1.json");
	
	//查询数据
	function queryData(url){
		$table.bootstrapTable('destroy').bootstrapTable({
			classes : 'table table-hover', // 添加样式名称
			striped : true, // 隔行变色
			toolbar : '#optionsBtn',
			toolbarAlign : 'left',
			//height : $('body').height(),
			columns : columns,
			method: "get",
			url : url,
			sidePagination : "server",
			queryParams : getParams,
			pagination : true
			//paginationHAlign : 'left'
			//search : true, // 显示搜索工具条
			//searchAlign : 'left'
		});
	}
	
	// 查看详情
	$(document).on("click", ".lookInfo", function() {
		openLayer({id:$(this).attr("id"),title:"出口合同详情",url:"../../../pages/hetong/chukou/detail.html"});
	});

	// 添加
	$(document).on("click", "#add", function() {
		openLayer({title:"添加出口合同",url:"../../../pages/hetong/chukou/add.html"});
	});

	// 修改
	$(document).on("click","#update",function() {
		var selectRows = $table.bootstrapTable('getSelections');
		if (selectRows.length === 1) {
			layer.open({
				type : 2,
				skin : 'myLayui', // 样式类名
				title : "修改出口合同信息",
				area : [ "80%", "80%" ],
				offset : 'lt',
				content : "../../../pages/hetong/chukou/add.html",
				success : function(layero, index) {
					console.log(selectRows[0]);
					var currentFrame = layero.find("iframe")[0].contentWindow.document;
					setFormData('addInfoForm',currentFrame, selectRows[0]);
				}
			});
		} else {
			layer.msg("请选择一条数据进行编辑!");
		}
	});

	// 删除
	$(document).on('click', '#delete', function() {
		layer.confirm('确定要删除吗?', {
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
			
			layer.msg('删除成功!');
		});

	});

	// 审核
	$(document).on('click', '#shenhe', function() {
		openLayer({title:"供货商审核",area:[ "60%", "60%" ],url:"../../../pages/ruzhu/shenhe.html"});
	});
	
	//import
	$(document).on('click', '#import', function() {
		openLayer({title:"导入文件",area:[ "60%", "60%" ],url:"../../../pages/include/import.html"});
	});
	
	//查看货物清单
	$(document).on('click', '.searchBtn', function() {
		openLayer({title:"货物清单",url:"../../../pages/hetong/chukou/goods.html"});
	});
	
	//查看关联信息
	$(document).on('click', '.glBtn', function() {
		openLayer({title:"关联信息",url:"../../../pages/hetong/chukou/guanlian.html"});
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
	
	//打开新窗口
	function openLayer(settings){
		layer.open({
			type : settings.type ? settings.type : 2,
			move : settings.move ? settings.move : false,
			skin : settings.skin ? settings.skin : "myLayui", // 样式类名
			title : settings.title ? settings.title : "窗口",
			area : settings.area ? settings.area : ["80%","80%"],
			content : settings.url,
			offset : 'lt',
			success : function(layero,index){
				//console.log(layero);
				if(settings.id){
					var currentFrame = layero.find("iframe")[0].contentWindow.document;
					$("#uuid",currentFrame).val(settings.id);
				}
			}
		});
	}
	
	
	//获取参数
	function getParams(params){
		params = {
				pageSize : this.pageSize,
				pageNumber : this.pageNumber,
				sortName : this.sortName,
				sortOrder : this.sortOrder,	
		};
		$.each( $("#thSearchForm :input[name]"),function(i,e){
			params[$(e).attr("name")] = $(e).val();
		});
		return params;
	}
	
	//高级查询
	$("#advancedSearch").on("click",function(){
		layer.open({
			type : 2,
			title : "高级查询",
			skin : "myLayui",
			area : ["60%","70%"],
			content : "../../pages/hetong/chukou/advancedSearch.html"
		});
	});
	
	//更多
	$("#other").on('click',function(){
		var searchBox = $(".searchBox");
		if(searchBox.height() != 75){
			$(".searchBox").animate({height:"75px"},200);
			$(this).html('<i class="glyphicon glyphicon-menu-up"></i>收起');
		}else{
			$(".searchBox").animate({height:"32px"},200);
			$(this).html('<i class="glyphicon glyphicon-menu-down"></i>收起');
		}
		
	});
	
	var config = { 
			columns:[
				{col:"id",label:"合同",validate:{required:true}},
				{col:"name",label:"合同名称",validate:{required:true}}
			]
		};
		
	//验证高级查询
	//registerValidate("advandSearch",config);
	
});
//刷新数据
function refreshTable(){
	$('#table').bootstrapTable("refresh");
}
