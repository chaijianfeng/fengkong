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
				{col:"id",label:"合同编号",type:"text",required:true,},
				{col:"name",label:"合同名称",type:"text",required:true,},
				{col:"bus",label:"业务类型",type:"select",required:true,
					options:[
						{
							value:"一般贸易",text:"一般贸易"
						},
						{
							value:"承包工程",text:"承包工程"
						}
					]
				},
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
				{col:"cjfs",label:"成交方式",type:"select",required:true,
					options:[
						{
							value:"FOB",text:"FOB"
						},
						{
							value:"CIF",text:"CIF"
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
				{col:"guobie",label:"出口国别",type:"select",required:true,
					options:[
						{
							value:"美国",text:"美国"
						},
						{
							value:"德国",text:"德国"
						}
						]
				},
				{col:"guobie",label:"出口口岸",type:"select",required:true,
					options:[
						{
							value:"天津新港",text:"天津新港"
						},
						{
							value:"北京机场",text:"北京机场"
						}
						]
				},
				{col:"ydg",label:"运抵国",type:"select",required:true,
					options:[
						{
							value:"美国",text:"美国"
						},
						{
							value:"德国",text:"德国"
						}
						]
				},
				{col:"zyg",label:"指运港",type:"select",required:true,
					options:[
						{
							value:"美国港",text:"美国港"
						},
						{
							value:"法国港",text:"法国港"
						}
						]
				},
				{col:"pzwh",label:"批准文号",type:"text" },
				{col:"jydw",label:"经营单位",type:"text" },
				{col:"xkz",label:"许可证",type:"text" },
				{col:"zyq",label:"装运期",type:"text" },
				{col:"fhdwdm",label:"发货单位代码",type:"text" },
				{col:"fhdw",label:"发货单位",type:"text" },
				{col:"js",label:"件数",type:"text" },
				{col:"gqqssj",label:"工期起始时间",type:"text",dateTime:true },
				{col:"gqjssj",label:"工期结束时间",type:"text",dateTime:true },
				{col:"gq",label:"工期（天）",type:"text" }
				
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
					spanEle = '<span class="text-danger req">*</span>';
				}
				var label = '<label class="col-xs-2 control-label">'+spanEle+'</label>';
				
				//input
				var $inputBox = $('<div class="col-xs-10"></div>');
				var input = getInputByType(column); //调用获取input的函数
				
				//表单组容器添加label和input
				$formGroup.append($(label)).append($inputBox.append($(input)));
				
				//给容器添加表单组
				$container.append($formGroup)
				
			}
		}
	}
}

//根据类型获取input
function getInputByType(column){
	var type = column.type;
	if(!type){
		return;
	}
	var input = '';
	switch(type){
		case 'text':
			var dateTime = '';
			if(column.dateTime){
				dateTime = 'onclick\="WdatePicker()\;"';
			}
			input = '<input '+dateTime+' type="'+column.type+'" name="'+column.col+'" class="form-control input-sm" placeholder="'+column.label+'">';
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
