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
	//创建基本信息
	function getInfo(){
		var config = {
			container:'info',
			columns:[
				{col:"id",label:"合同编号",type:"text",validate:{required:true}},
				{col:"name",label:"合同名称",type:"text",validate:{required:true}},
				{col:"bus",label:"业务类型",type:"select",validate:{required:true},
					options:[
						{
							value:"一般贸易",text:"一般贸易"
						},
						{
							value:"承包工程",text:"承包工程"
						}
					]
				},
				{col:"qdDate",label:"签约日期",type:"date",validate:{required:true,strictDate:true}},
				{col:"sxDate",label:"生效日期",type:"date",validate:{required:true,dateGTInput:"qdDate"}},
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
				{col:"htje",label:"合同金额",type:"text",validate:{required:true,minlength:4,commonChar:true}},
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
				{col:"cjfs",label:"成交方式",type:"select",validate:{required:true},
					options:[
						{
							value:"FOB",text:"FOB"
						},
						{
							value:"CIF",text:"CIF"
						}
					]
<<<<<<< HEAD
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
				{col:"gqqssj",label:"工期起始时间",type:"date",validate:{dateLTInput:"gqjssj"} },
				{col:"gqjssj",label:"工期结束时间",type:"date",validate:{dateGTInput:"gqqssj"}  },
				{col:"gq",label:"工期（天）",type:"text" }
				
			]
		};
		var $container = formGenerator(config);
		registerValidate("addInfoForm",config);
	}
	// 创建联系方式
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
				{col:"totalMoney",label:"卖方地址",type:"text"}]
		};
		var $container = formUser(link);
		registerValidate("addInfoForm",link);
	}
=======
			},
			{col:"pzwh",label:"批准文号",type:"text" },
			{col:"jydw",label:"经营单位",type:"text" },
			{col:"xkz",label:"许可证",type:"text" },
			{col:"zyq",label:"装运期",type:"text" },
			{col:"fhdwdm",label:"发货单位代码",type:"text" },
			{col:"fhdw",label:"发货单位",type:"text" },
			{col:"js",label:"件数",type:"text" },
			{col:"gqqssj",label:"工期起始时间",type:"date",validate:{dateLTInput:"gqjssj"} },
			{col:"gqjssj",label:"工期结束时间",type:"date",validate:{dateGTInput:"gqqssj"}  },
			{col:"gq",label:"工期（天）",type:"text" }
			
		]
	};
	var $container = formGenerator(config);
	registerValidate("addInfoForm",config);
	
	
	
	$("#saveOrUupdateBtn").on("click",function(){
		parent.layer.close(parent.layer.getFrameIndex(window.name));//成功后关闭页面
		parent.refreshTable(); //刷新页面
	});
	
>>>>>>> 7aded40ab4d85b85065becab6e1b8677ebef3866
});
// 创建联系方式依赖方法
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
/////////////////////////////////////////////////////////////JQuery验证配置结束/////////////////////////////////////////////////////////////