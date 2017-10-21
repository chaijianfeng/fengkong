//附件上传按钮
$(".inputBtn").fileinput({
	language : "zh",
	showCaption : false,
	browseClass : "btn btn-default btn-sm"
});

$(function(){
	/*dateTime:true,required:true*/

	//获得基本信息
	getInfo();

	//获得联系方式
	getLink();

	//获得附件
	// getFujian();
	function getInfo(){
		var config = {
			container:'info',
			columns:[
				{col:"id",label:"合同编号",type:"text",validate:{required:true}},
				{col:"name",label:"合同名称",type:"text",validate:{required:true}},
				{col:"qdDate",label:"签约日期",type:"text",validate:{required:true}},
				{col:"sxDate",label:"生效日期",type:"text",validate:{required:true}},
				{col:"bz",label:"币制",type:"select",validate:{required:true},
					options:[
						{
							value:"人民币",text:"人民币"
						},
						{
							value:"美元",text:"美元"
						}
					]
				},
				{col:"totalMoney",label:"合同金额",type:"text",validate:{required:true}},
				{col:"bz",label:"结汇方式",type:"select",validate:{required:true},
					options:[
						{
							value:"汇付",text:"汇付"
						},
						{
							value:"托收",text:"托收"
						}
					]
				}
				
			]
		};
		var $container = formGenerator(config);
		registerValidate("addInfoForm",config);
	}

	function getLink(){
		var link = {
			container:'link',
			columns:[
				{col:"id",label:"买方名称",type:"text",validate:{required:true}},
				{col:"name",label:"卖方名称",type:"text",validate:{required:true}},
				{col:"qdDate",label:"买方签约人",type:"text"},
				{col:"sxDate",label:"卖方签约人",type:"text"},
				{col:"bz",label:"买方联系电话",type:"text"},
				{col:"totalMoney",label:"卖方联系电话",type:"text"},
				{col:"bz",label:"买方地址",type:"text"},
				{col:"totalMoney",label:"卖方地址",type:"text"},
				{col:"bz",label:"买方开户行",type:"text"},
				{col:"totalMoney",label:"卖方开户行",type:"text"},
				{col:"bz",label:"买方账号",type:"text"},
				{col:"totalMoney",label:"卖方账号",type:"text"},
			]
		};
		var $container = formUser(link);
		registerValidate("addInfoForm",link);
	}
	function getFujian(){
			var fujian = {
				container:'fujian',
				columns:[
					{fil:"files1",label:"合同源文件",type:"file",validate:{required:true}},
					{fil:"files2",label:"其他",type:"file",validate:{}}
				]
			};
			var $container = formFujian(fujian);
			registerValidate("addInfoForm",fujian);
	}
	// getFujian();

});
// 创建联系方式
function formUser(obj){
	if(obj && !$.isEmptyObject(obj) && obj.container){
		var $container = typeof obj.container == "string" ?  $("#"+obj.container) : obj.container;
		//$container.addClass("tab-pane clearfix active");
		if(obj.columns && obj.columns.length>0){
			for(var i=0;i<obj.columns.length; i++){
				if(obj.columns[i]) $container.append(getInputByType(obj.columns[i],6,6));
			}
		}
		return $container;
	}
}
// 创建附件
function formFujian(obj){
	if(obj && !$.isEmptyObject(obj) && obj.container){
		var $container = typeof obj.container == "string" ?  $("#"+obj.container) : obj.container;
		//$container.addClass("tab-pane clearfix active");
		if(obj.columns && obj.columns.length>0){
			for(var i=0;i<obj.columns.length; i++){
				if(obj.columns[i]) $container.append(getInputByType(obj.columns[i],12,2));
			}
		}
		return $container;
	}
}
