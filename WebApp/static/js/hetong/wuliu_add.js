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

	function getInfo(){
		var info = {
				container:'info',
				columns:[
					{col:"id",label:"协议编号",type:"text",required:true},
					{col:"name",label:"协议名称",type:"text",required:true},
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
		var $container = formGenerator(info);
		registerValidate("addInfoForm",info);
	}
	function getLink(){
		var link = {
			container:'link',
			columns:[
				{col:"id",label:"委托方",type:"text",validate:{required:true}},
				{col:"name",label:"代理方",type:"text",validate:{required:true}},
				{col:"qdDate",label:"委托方签约人",type:"text"},
				{col:"sxDate",label:"代理方签约人",type:"text"},
				{col:"bz",label:"委托方联系电话",type:"text"},
				{col:"totalMoney",label:"代理方联系电话",type:"text"},
				{col:"bz",label:"委托方地址",type:"text"},
				{col:"totalMoney",label:"代理方地址",type:"text"},
				{col:"bz",label:"委托方开户行",type:"text"},
				{col:"totalMoney",label:"代理方开户行",type:"text"},
				{col:"bz",label:"委托方账号",type:"text"},
				{col:"totalMoney",label:"代理方账号",type:"text"},
			]
		};
		var $container = formUser(link);
		registerValidate("addInfoForm",link);
	}
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