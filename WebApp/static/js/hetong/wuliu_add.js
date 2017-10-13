//附件上传按钮
$(".inputBtn").fileinput({
	language : "zh",
	showCaption : false,
	browseClass : "btn btn-default btn-sm"
});

$(function(){
	/*dateTime:true,required:true*/
	var obj = {
			container:'info',
			columns:[
				{col:"id",label:"协议编号",type:"text",required:true,},
				{col:"name",label:"协议名称",type:"text",required:true,},
				{col:"qdDate",label:"签约日期",type:"text",required:true,dateTime:true},
				{col:"sxDate",label:"生效日期",type:"text",required:true,dateTime:true},
				{col:"bz",label:"币制",type:"select",required:true,
					options:[
						{
							value:"人民币",text:"人民币"
						},
						{
							value:"美元",text:"美元"
						}
					]
				},
				{col:"htje",label:"合同金额",type:"text",required:true},
				{col:"bz",label:"结汇方式",type:"select",required:true,
					options:[
						{
							value:"汇付",text:"汇付"
						},
						{
							value:"托收",text:"托收"
						}
					]
				},
				{col:"ysfs",label:"运输方式",type:"select",required:true,
					options:[
						{
							value:"水路运输",text:"水路运输"
						},
						{
							value:"航空运输",text:"航空运输"
						}
						]
				},
				{col:"fyd",label:"发运地",type:"text" },
				{col:"mdd",label:"目的地",type:"text" },
				{col:"fkDate",label:"付款日期",type:"text",dateTime:true },
				{col:"bf",label:"保费",type:"text" }
				
			]
		};
	
	formGenerator(obj);
});

/*
生成表单
*/
function formGenerator(obj){
	if(!obj || $.isEmptyObject(obj)){
		return;
	}
	//处理容器
	var container = obj.container;
	var $container = null;
	var columns = [];
	if(container){
		$container = typeof container == "string" ?  $("#"+container) : container;
		columns = obj.columns;
		if(columns && columns.length>0){
			for(var i=0, len= columns.length; i<len; i++){
				var column = columns[i];
				if(!column){
					return;
				}
				//表单组容器
				var $formGroup = $('<div class="form-group col-sm-4"></div>');
				
				//label
				var spanEle = '';
				if(column.required){
					spanEle = '<span class="text-danger req">*&nbsp;</span>';
				}
				var label = '<label class="col-xs-5 control-label" style="padding-right:5px">'+spanEle+column.label+'&nbsp:</label>';
				
				//input
				var $inputBox = $('<div class="col-xs-7" style="padding-left:5px"></div>');
				var input = getInputByType(column); //调用获取input的函数
				
				//表单组容器添加label和input
				$formGroup.append($(label)).append($inputBox.append($(input)));
				
				//给容器添加表单组
				$container.append($formGroup);
				
			}
		}
	}
}

//根据类型获取input
function getInputByType(column){
	var input = '';
	
	var type = column.type || 'text';
	switch(type){
		case 'text':
			var dateTime = '';
			if(column.dateTime){
				dateTime = 'onclick\="WdatePicker()\;"';
			}
			input = '<input '+dateTime+' type="'+column.type+'" name="'+column.col+'" class="form-control input-sm">';
			break;
		case 'select':
			var options = column.options;
			var input = '<select name="'+column.col+'" class="form-control input-sm">';
			if(options && options.length>0){
				for(var i=0, len=options.length; i<len; i++){
					var option = options[i];
					var selected = '';
					if(option.selected){
						selected = 'selected';
					}
					input += '<option value="'+option.value+'" '+selected+'>'+option.text+'</option>';
				}
			}
			input += '</select>'; 
			break;
		case 'radio':
			break;
		case 'checkbox':
			break;
		default:
			//不处理
	}
	
	return input;
}
