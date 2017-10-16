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
							value:"德国",text:"德国",selected:true
						}
						]
				},
				{col:"zyg",label:"指运港",type:"select",required:true,
					options:[
						{
							value:"美国港",text:"美国港"
						},
						{
							value:"法国港",text:"法国港",selected:true
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
	
	var $container = formGenerator(obj);
});

/*
生成表单
*/
function formGenerator(obj){
	if(obj && !$.isEmptyObject(obj) && obj.container){
		var $container = typeof obj.container == "string" ?  $("#"+obj.container) : obj.container;
		//$container.addClass("tab-pane clearfix active");
		if(obj.columns && obj.columns.length>0){
			for(var i=0;i<obj.columns.length; i++){
				if(obj.columns[i]) $container.append(getInputByType(obj.columns[i],4,5));
			}
		}
		return $container;
	}
}

//根据类型获取input
function getInputByType(column,sm,xs){
	var prefix = '<div class="form-group col-sm-'+(sm||column.sm||12)+'"><label class="col-xs-'+(xs||column.xs||0)+' control-label">'+(column.required?'<span class="text-danger req">*&nbsp;</span>':'')+ column.label + ':</label><div class="col-xs-'+(12-(xs||column.xs||0))+'">',input='',suffix='</div></div>';
	var type = $.trim(column.type || 'text');
	switch(type){
		case 'text':
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm"/>';
			break;
		case 'select':
			var array = ['<select name="'+column.col+'" class="form-control input-sm">'];
			if(column.options && column.options.length>0){
				for(var i=0;i<column.options.length;i++) array.push('<option value="'+column.options[i].value+'"'+(column.options[i].selected ? ' selected' : '')+'>'+column.options[i].text+'</option>');
			}
			input = array.join('') + '</select>';
			break;
		case 'radio':
			break;
		case 'checkbox':
			break;
		case 'date':
			input = '<input type="text" name="'+column.col+'" class="form-control input-sm" onclick=""WdatePicker();"/>';
			break;
		default:
			//不处理
			break;
	}
	return prefix + input + suffix;
}