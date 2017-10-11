$(function() {
	//$("body,.fixed-table-body").niceScroll();
});

/*
 * 点击菜单修改左侧标签页盒子宽度
 */
function changeRightTabWidth(boxId) {
	var $box = $('#' + boxId);
	var boxWidth = $box.width();
	var allLi = $box.find("ul li");
	var allLiWidth = 20;
	$.each(allLi, function(i, e) {
		allLiWidth += $(e).outerWidth();
	});
	if (allLiWidth > boxWidth) {
		$.each(allLi, function(i, e) {
			$(e).outerWidth(
					parseInt($(e).outerWidth() / (allLiWidth - 20)
							* (boxWidth - 20)));
		});
	} else {
		allLi.outerWidth('auto');
	}

}

/*
 * 格式标题或者编号查看详情
 */
function formatterLookInfo(value, row, index) {
	return '<a href="javascript:;" class="text-info lookInfo">' + value + '</a>';
}

// 初始化表格信息
function initBootStrapTable(settings) {
	$("#" + settings.id).bootstrapTable("destroy").bootstrapTable({
		classes : 'table table-hover table-no-bordered', // 添加样式名称
		striped : true, // 隔行变色
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 50 ],
		height : 200,
		pagination : true,
		columns : settings.columns,
		data : settings.data
	});
}

// 初始化详情
function initDetailInfo(settings) {
	//console.log(settings);
	var i, len, $row;
	if (settings && (len = settings.elems.length) > 0) {
		$row = $("<div class='row'><div>");
		for (i = 0; i < len; i++) {
			$row.append('<div class="col-sm-4">'
					+ '<label class="col-sm-5 text-right">'
					+ settings.elems[i].name + ':</label>'
					+ '<div class="col-sm-7">' + '<p>'
					+ settings.elems[i].value + '</p>' + ' </div>' + '</div>');
		}
		$('#' + settings.id).append($row);
	}
}

// 初始化表单
/*function initFormInfo(settings) {
	console.log(settings);
	var i, len, $row, formGroup;
	if (settings && (len = settings.elems.length) > 0) {
		$row = $("<from class='form-horizontal'><form>");

		for (i = 0; i < len; i++) {
			var label = settings.elems[i].label;
			var value = settings.elems[i].value;
			
			formGroup += '<div class="form-group col-sm-4">'
						+'<label class="col-sm-5 label-control text-right">'+ label + ':</label>';
						+'<div class="col-sm-7">';
			if($.isArray(value)){
				
			}else if(typeof value === ("string" || "number")){
				formGroup += '<input type="text" class="form-control input-sm" value="'+value+'"/>';
			}
					
			formGroup += '</div></div>';
			$row.append(formGroup);

		}
		$('#' + settings.id).append($row);
	}
}*/

//设置表单数据
function setFormData(id,curr,rowData){
	var formInputs = $('#'+id+' :input',curr);
	$.each(formInputs,function(i,e){
		var name = $(e).attr('name');
		if(name != null && name!='underfined' && name != '' ){
			$(e).val(rowData[name]);
		}
	});
}

//保存后关闭
$(document).on("click","#save",function(){
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.layer.close(index);
});

//格式化状态
function formatterStatus(value, row, index) {
	var title = '';
	var className = '';
	if(value==0){
		title = '未审核';
		className = 'fa-times-circle text-danger';
	}else if(value==1){
		title = '已审核';
		className = 'fa-check-circle-o text-success';
	}else{
		title = '正在审核...';
		className = 'fa-question-circle-o text-warning';	
	}
	return '<i title="'+title+'" class="fa '+className+'"></i>';
};