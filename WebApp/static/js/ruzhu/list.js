$(document).ready(function(){
	var $table = $('#table');
	var columns = [ 
		{
			field : 'select',
			align:'center',
			checkbox : true
		},
		{
			title : '供货商名称',
			field : 'name',
			align:'center',
			formatter : formatterLookInfo,
			sortable: true
		}, 
		{
			title : '纳税人识别号',
			align:'center',
			field : 'nsrsbh'
		}, 
		{
			title : '企业类型',
			align:'center',
			field : 'type'
		}, 
		{
			title : '纳税信用等级',
			align:'center',
			field : 'nsdj'
		}, 
		{
			title : '内部评估等级',
			align:'center',
			field : 'pgdj'
		}, 
		{
			title : '税局信用等级',
			align:'center',
			field : 'xydj'
		}, 
		{
			title : '审核状态',
			field : 'shstate',
			align:'center',
			formatter : formatterStatus
		} 
	];

	var data = "../../data/gonghuo2.json";

	$table.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover', // 添加样式名称
		striped : true, // 隔行变色
		search : true, // 显示搜索工具条
		searchAlign : 'left',
		toolbar : '.myBtn',
		toolbarAlign : 'left',
		showExport : true,
		exportTypes : [ 'txt', 'csv', 'excel' ],
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		height : $('body').height() - 32,
		pagination : true,
		columns : columns,
		sidePagination: 'server',
		ajax: query,
		queryParams: setParams,
		toggle: 'table',
		url: data
	});

	// 查看详情
	$(document).on("click", ".lookInfo", function() {
		parent.layer.open({
			type : 2,
			skin : 'myLayui', // 样式类名
			title : "供货商信息",
			area : [ "70%", "65%" ],
			content : "../../pages/ruzhu/detail.html"
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
	
	function query(params){
		
		$.post("../../data/gonghuo2.json",params.data,function(data){
			setTimeout(function () {
				params.success({
	                total: 100,
	                rows: data
	            });
	        }, 30);
		},'json');
	}
	function setParams(params){
		return  {
			pageSize : this.pageSize,
			pageNumber : this.pageNumber,
			searchText : this.searchText,
			sortName : this.sortName,
			sortOrder : this.sortOrder
		};
	}
});