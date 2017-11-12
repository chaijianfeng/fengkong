/**
处理js和css的通用引入，适合多种使用方式   周小建
 */
function Includer(includeFiles){
	var me = this;
	var staticPath = "fengkong/static/";
	var includeFileListDictionary = [
		"plugins/bootstrap-3.3.7/css/bootstrap.min.css",//0
		"plugins/jquery-2.1.1/jquery-2.1.1.js",//1
		"plugins/bootstrap-3.3.7/js/bootstrap.min.js",//2
		"plugins/font-awesome-4.7.0/css/font-awesome.css",//3	icon字体图标
		"plugins/bootstrap-table-1.11.1/bootstrap-table.css",//4	表格
		"plugins/bootstrap-table-1.11.1/bootstrap-table.js",//5
		"plugins/bootstrap-table-1.11.1/extensions/toolbar/bootstrap-table-toolbar.js",//6
		//"plugins/bootstrap-table-1.11.1/extensions/export/bootstrap-table-export.js",//表格导出
		//plugins/tableExport.jquery.plugin/tableExport.js",
		"plugins/bootstrap-table-1.11.1/locale/bootstrap-table-zh-CN.js",//7
		"plugins/jquery.nicescroll-3.7.6/jquery.nicescroll.js",//8	美化滚动条
		"js/common.js",//9	自定义公用js
		"css/comm.css",//10	自定义公用css"
		"plugins/layer-v3.1.0/theme/default/layer.css",//11	 弹窗
		"plugins/layer-v3.1.0/layer.js",//12
		"plugins/My97DatePicker-4.8/WdatePicker.js",//13	日历
	];
	
	this.includeFiles = includeFiles==null ? includeFileListDictionary : includeFiles;
	
	//获取数组的子数组，包含模式         周小建
	this.includeFilter = function(array,include){
		if(array==null) array = includeFileListDictionary;
		if(include==null) return array;
		var a = [];
		for(var i=0;i<include.length;i++) a.push(array[include[i]]);
		return a;
	}
	
	//获取数组的子数组，排除模式         周小建
	this.excludeFilter = function(array,exclude){
		if(array==null) array = includeFileListDictionary;
		if(exclude==null) return array;
		var a = [];
		for(var i=0;i<array.length;i++){
			var item = array[i];
			for(var j=0;j<exclude.length;j++){
				if(i==exclude[j]){
					break;
				}
			}
			if(j==exclude.length){
				a.push(item);
			}
		}
		return a;
	}
	
	//导入文件处理器
	this.includeFileHandler = function(files){
		if(files==null) files = this.includeFiles;//如果参数为空，则取本类同名属性。
		//else this.includeFiles = includeFiles;//如果参数非空，则将参数赋给本类同名属性。
		var array = [];
		for(var i=0;i<files.length;i++){
			var item = files[i];
			if(item.indexOf(".js")){
				/*
				ele = document.createElement("script");
				ele.setAttribute("type","text/javascript");
				ele.setAttribute("src",staticPath+item);
				 */
				array.push('<script type="text/javascript" src="'+staticPath+item+'"></script>');
			}else if(item.indexOf(".css")){
				/*
				ele = document.createElement("link");
				ele.setAttribute("rel","stylesheet");
				ele.setAttribute("href",staticPath+item);
				 */
				array.push('<link type="text/css" rel="stylesheet" href="'+staticPath+item+'"/>');
			}
		}
		document.write(array.join(""));
	}
	
	//includeFileHandler(includeFileListDictionary);
	//includeFileHandler(includeFilter(includeFileListDictionary,[0,1,2]));
	/*
	if(includeFiles==null){
		
	}else if(includeFiles==true){
		this.includeFileHandler();
	}else if(includeFiles.length>0){
		this.includeFileHandler(includeFiles);
	}
	*/
	//if(includeFiles!=null) this.includeFileHandler();
}