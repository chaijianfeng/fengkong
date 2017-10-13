$(function(){
	var $caigouTable = $("#caigouTable");
	var $caigouGlTable = $("#caigouGlTable");
	var columns = [ {
		field : 'state',
		checkbox : true
	}, {
		title : '合同编号',
		field : 'id'
	}, {
		title : '合同名称',
		field : 'name'
	}
	];
	var data = [{
		"id" : "CG1818991184244",
		"name" : "HUFF采购合同"
	},{
		"id" : "CG1818991184223",
		"name" : "SYLVIA采购合同"
	}];
	
	$caigouTable.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover table-no-bordered', // 添加样式名称
		striped : true, // 隔行变色
		//pageNumber : 1,
		//pageSize : 10,
		//pageList : [ 10, 20, 50 ],
		height : 260,
		//pagination : true,
		columns : columns,
		data : data
	});
	
	$caigouGlTable.bootstrapTable('destroy').bootstrapTable({
		classes : 'table table-hover table-no-bordered', // 添加样式名称
		striped : true, // 隔行变色
		height : 260,
		columns : columns
	});
	//关联
	$("#concatOne").on('click',function(){
		handlerCancat($caigouTable, $caigouGlTable);
	});
	//移除关联
	$("#removeConcat").on('click',function(){
		handlerCancat($caigouGlTable,$caigouTable);
	});
	
	//关联全部
	$("#concatAll").on('click',function(){
		handlerCancat($caigouTable, $caigouGlTable,true);
	});
	//移除全部关联
	$("#removeConcatAll").on('click',function(){
		handlerCancat($caigouGlTable,$caigouTable,true);
	});
	
	
	//处理关联
	function handlerCancat(ele,target,all){
		
		if(all){
			ele.bootstrapTable('checkAll');
			var allSRows = ele.bootstrapTable('getAllSelections');
			target.bootstrapTable('append', allSRows);
			ele.bootstrapTable('removeAll');
		}else{
			var selectRows =  ele.bootstrapTable('getSelections');
			target.bootstrapTable('append', selectRows);
			selectRows = selectRows.map(function(item) {
				return item.id;
			});
			ele.bootstrapTable('remove', {
				field : 'id',
				values : selectRows
			});
		}
	}
	
});