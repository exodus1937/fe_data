
/*var reqUrl = parent.document.getElementById("index_page").contentWindow.location.href;
//提取url字符串到json数据；
function queryString(url){
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
            reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
            arr_url = reg_url.exec(url),

            res = {};
            console.log(arr_url);
    if(arr_url && arr_url[1]) {
        var str_para = arr_url[1],result;
        while((result = reg_para.exec(str_para)) != null){
            res[result[1]] = result[2];
        }
    }
    return res;
}
var reqJson = queryString(reqUrl);
console.log(reqJson);*/




//弹出窗口拖拽	
//获取并定义树形菜单的高度
var st_height = document.documentElement.clientHeight - 60
document.getElementById("tree").style.height = st_height + "px";
//获取并定义wu_main的margin
var main_mar = $(".wu_top").outerHeight(true)
$(".wu_main").css({
	"margin-top": main_mar + "px"
});

if (typeof addEvent != 'function') {
	var addEvent = function(o, t, f, l) {
		var d = 'addEventListener',
			n = 'on' + t,
			rO = o,
			rT = t,
			rF = f,
			rL = l;
		if (o[d] && !l)
			return o[d](t, f, false);
		if (!o._evts) o._evts = {};
		if (!o._evts[t]) {
			o._evts[t] = o[n] ? {
				b: o[n]
			} : {};
			o[n] = new Function('e',
				'var r=true,o=this,a=o._evts["' + t + '"],i;for(i in a){o._f=a[i];r=o._f(e||window.event)!=false&&r;o._f=null}return r');
			if (t != 'unload') addEvent(window, 'unload', function() {
				removeEvent(rO, rT, rF, rL)
			})
		}
		if (!f._i) f._i = addEvent._i++;
		o._evts[t][f._i] = f
	};
	addEvent._i = 1;
	var removeEvent = function(o, t, f, l) {
		var d = 'removeEventListener';
		if (o[d] && !l) return o[d](t, f, false);
		if (o._evts && o._evts[t] && f._i) delete o._evts[t][f._i]
	}
}

function cancelEvent(e, c) {
	e.returnValue = false;
	if (e.preventDefault) e.preventDefault();
	if (c) {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation()
	}
};

function DragResize(myName, config) {
	var props = {
		myName: myName,
		enabled: true,
		handles: ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'],
		isElement: null,
		isHandle: null,
		element: null,
		handle: null,
		minWidth: 10,
		minHeight: 10,
		minLeft: -9999,
		maxLeft: 9999,
		minTop: -9999,
		maxTop: 9999,
		zIndex: 4000,
		mouseX: 0,
		mouseY: 0,
		lastMouseX: 0,
		lastMouseY: 0,
		mOffX: 0,
		mOffY: 0,
		elmX: 0,
		elmY: 0,
		elmW: 0,
		elmH: 0,
		allowBlur: true,
		ondragfocus: null,
		ondragstart: null,
		ondragmove: null,
		ondragend: null,
		ondragblur: null
	};
	for (var p in props) this[p] = (typeof config[p] == 'undefined') ? props[p] : config[p]
};
DragResize.prototype.apply = function(node) {
	var obj = this;
	addEvent(node, 'mousedown', function(e) {
		obj.mouseDown(e)
	});
	addEvent(node, 'mousemove', function(e) {
		obj.mouseMove(e)
	});
	addEvent(node, 'mouseup', function(e) {
		obj.mouseUp(e)
	})
};
DragResize.prototype.select = function(newElement) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		if (newElement && (newElement != element) && enabled) {
			element = newElement;
			element.style.zIndex = ++zIndex;
			if (this.resizeHandleSet) this.resizeHandleSet(element, true);
			elmX = parseInt(element.style.left);
			elmY = parseInt(element.style.top);
			elmW = element.offsetWidth;
			elmH = element.offsetHeight;
			if (ondragfocus) this.ondragfocus()
		}
	}
};
DragResize.prototype.deselect = function(delHandles) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		if (delHandles) {
			if (ondragblur) this.ondragblur();
			if (this.resizeHandleSet) this.resizeHandleSet(element, false);
			element = null
		}
		handle = null;
		mOffX = 0;
		mOffY = 0
	}
};
DragResize.prototype.mouseDown = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return true;
		var elm = e.target || e.srcElement,
			newElement = null,
			newHandle = null,
			hRE = new RegExp(myName + '-([trmbl]{2})', '');
		while (elm) {
			if (elm.className) {
				if (!newHandle && (hRE.test(elm.className) || isHandle(elm))) newHandle = elm;
				if (isElement(elm)) {
					newElement = elm;
					break
				}
			}
			elm = elm.parentNode
		}
		if (element && (element != newElement) && allowBlur) deselect(true);
		if (newElement && (!element || (newElement == element))) {
			if (newHandle) cancelEvent(e);
			select(newElement, newHandle);
			handle = newHandle;
			if (handle && ondragstart) this.ondragstart(hRE.test(handle.className))
		}
	}
};
DragResize.prototype.mouseMove = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return true;
		mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
		mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;
		var diffX = mouseX - lastMouseX + mOffX;
		var diffY = mouseY - lastMouseY + mOffY;
		mOffX = mOffY = 0;
		lastMouseX = mouseX;
		lastMouseY = mouseY;
		if (!handle) return true;
		var isResize = false;
		if (this.resizeHandleDrag && this.resizeHandleDrag(diffX, diffY)) {
			isResize = true
		} else {
			var dX = diffX,
				dY = diffY;
			if (elmX + dX < minLeft) mOffX = (dX - (diffX = minLeft - elmX));
			else if (elmX + elmW + dX > maxLeft) mOffX = (dX - (diffX = maxLeft - elmX - elmW));
			if (elmY + dY < minTop) mOffY = (dY - (diffY = minTop - elmY));
			else if (elmY + elmH + dY > maxTop) mOffY = (dY - (diffY = maxTop - elmY - elmH));
			elmX += diffX;
			elmY += diffY
		}
		with(element.style) {
			left = elmX + 'px';
			width = elmW + 'px';
			top = elmY + 'px';
			height = elmH + 'px'
		}
		if (window.opera && document.documentElement) {
			var oDF = document.getElementById('op-drag-fix');
			if (!oDF) {
				var oDF = document.createElement('input');
				oDF.id = 'op-drag-fix';
				oDF.style.display = 'none';
				document.body.appendChild(oDF)
			}
			oDF.focus()
		}
		if (ondragmove) this.ondragmove(isResize);
		cancelEvent(e)
	}
};
DragResize.prototype.mouseUp = function(e) {
	with(this) {
		if (!document.getElementById || !enabled) return;
		var hRE = new RegExp(myName + '-([trmbl]{2})', '');
		if (handle && ondragend) this.ondragend(hRE.test(handle.className));
		deselect(false)
	}
};
DragResize.prototype.resizeHandleSet = function(elm, show) {
	with(this) {
		if (!elm._handle_tr) {
			for (var h = 0; h < handles.length; h++) {
				var hDiv = document.createElement('div');
				hDiv.className = myName + ' ' + myName + '-' + handles[h];
				elm['_handle_' + handles[h]] = elm.appendChild(hDiv)
			}
		}
		for (var h = 0; h < handles.length; h++) {
			elm['_handle_' + handles[h]].style.visibility = show ? 'inherit' : 'hidden'
		}
	}
};
DragResize.prototype.resizeHandleDrag = function(diffX, diffY) {
	with(this) {
		var hClass = handle && handle.className && handle.className.match(new RegExp(myName + '-([tmblr]{2})')) ? RegExp.$1 : '';
		var dY = diffY,
			dX = diffX,
			processed = false;
		if (hClass.indexOf('t') >= 0) {
			rs = 1;
			if (elmH - dY < minHeight) mOffY = (dY - (diffY = elmH - minHeight));
			else if (elmY + dY < minTop) mOffY = (dY - (diffY = minTop - elmY));
			elmY += diffY;
			elmH -= diffY;
			processed = true
		}
		if (hClass.indexOf('b') >= 0) {
			rs = 1;
			if (elmH + dY < minHeight) mOffY = (dY - (diffY = minHeight - elmH));
			else if (elmY + elmH + dY > maxTop) mOffY = (dY - (diffY = maxTop - elmY - elmH));
			elmH += diffY;
			processed = true
		}
		if (hClass.indexOf('l') >= 0) {
			rs = 1;
			if (elmW - dX < minWidth) mOffX = (dX - (diffX = elmW - minWidth));
			else if (elmX + dX < minLeft) mOffX = (dX - (diffX = minLeft - elmX));
			elmX += diffX;
			elmW -= diffX;
			processed = true
		}
		if (hClass.indexOf('r') >= 0) {
			rs = 1;
			if (elmW + dX < minWidth) mOffX = (dX - (diffX = minWidth - elmW));
			else if (elmX + elmW + dX > maxLeft) mOffX = (dX - (diffX = maxLeft - elmX - elmW));
			elmW += diffX;
			processed = true
		}
		return processed
	}
};



function rootpath() {
	var url = $('<input id="url" type="hidden" value="">');
	$("body").prepend(url);
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPath = curWwwPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	var rootPath = localhostPath + projectName;
	document.getElementById("url").value = rootPath;
}
rootpath();
var rootPath = $('#url').val();
var data1={};



$(".level1").show();
$(".level4").hide();
$(".wu_top").hide();
$("#table1_huizong").hide();
$("#Pagination").hide();
$(".wu_main").css({"marginTop":23});
$('#lh_name').html("岱海电厂");

function getTree() {
	var url = rootPath　 + 　"/portal/getTreeMenu.do?orgid=" + localStorage.getItem("orgid");	
	$.ajax({
		type: "GET",
		url: url,
		
		dataType:"JSON",
		success: function(data){		
			data1=data;
		},
		complete:function(msg){
			var setting = {
				callback: {
					onClick: zTreeOnClick
				}
			};
			$.fn.zTree.init($("#tree"), setting, data1);

			//默认展开机组；
			$("#tree_1_switch").click();
			//默认显示电厂的相关信息；
			$("#tree_1_span").click();
		}

	})
}
getTree();
function zTreeOnClick(ev, treeId, treeNode) {	
	var event = ev || window.event;
	var g_id = $(event.target).parent().parent().parent().siblings().parent().parent().siblings().text();
	var special_id = $(event.target).parent().parent().parent().siblings().text();
	var name = treeNode.name;
	switch (treeNode.level) {
		//电厂级别
		case 0:
			g_id = "";
			special_id = "";
			name = "";
			//console.log(1);
			level1();
			break;
			//机组级别
		case 1:
			g_id = name.substring(1, 2);
			special_id = "";
			name = "";
			level1();
			break;
			//专业级别
		case 2:
			g_id = special_id.substring(1, 2);
			special_id = name;
			name = "";
			break;
			//试验名称级别
		case 3:
			g_id = g_id.substring(1, 2);
			//console.log('4')
			level4();
			break;
		default:
			g_id = "";
			special_id = "";
			name = "";
			break;
	}
	
//level1 && level2 are some interface;

	function level1(){

		$("table.level1").show();
		$("table.level4").hide();
		$(".wu_top").hide();
		$(".wu_top1").hide();
		$("#table1_huizong").hide();
		$("#Pagination").hide();
		$(".wu_main").css({"marginTop":23});
		$('#lh_name').html(treeNode.name);
		$("#wu_top1").hide();
		var url = rootPath + "/portal.do";
		$.ajax({
			url: url,
			type: "POST",
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: "json",
			data: {
				method:"getLHCountByOrgid",
				org_id: localStorage.getItem("orgid"),
				g_id: g_id,
				
			},
			success: function(data) {

				$("#level1").html(prepearDatalevel1(data));

			}

		})
	}
	function level4(){
		var flag=true;

		$("table.level1").hide();
		$(".wu_top").show();
		
		$("table.level4").show();
		$(".wu_top1").show();
		$("#table1_huizong").show();
		$("#Pagination").show();

		$(".wu_main").css({"marginTop":92});
		var initPagination = function(page) {
		   	var num_entries = page;
		  	// 创建分页
		  	$("#Pagination").pagination(num_entries, {
			    num_edge_entries: 1, //边缘页数
			    num_display_entries: 4, //主体页数
			    callback: pageselectCallback,
			    items_per_page: 1, //每页显示1项
			    prev_text: "前一页",
			    next_text: "后一页"
		  	});
		};

		

		function pageselectCallback(page_index, jq){
			
			expr(page_index + 1);
			
			
		  	return false;
		}

		name = encodeURIComponent(trim(name));
		var url = rootPath + "/portal.do?name=" + name;
		expr(1);
		//level4 轮换详情；
		function expr(pagenum){
			$.ajax({
				url: url,
				type: "POST",
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType: "json",
				data: {
					method: "getLHTime",
					org_id: localStorage.getItem("orgid"),
					g_id: g_id,
					special_id: special_id,
					ispage:true,
					pagenum:pagenum,
					pagesize:5			
				},
				success: function(data) {
					$("#sblhcounter").html("");
					//var i = 0;
					var page = Math.ceil(data.total/5)
					//console.log(page);
					if(flag){
						initPagination(page);//分页加载
					}
					flag=false;
					//console.log(data);
					$('#sblhcounter').html(prepearData(data.exper));//处理ajax返回的数据添加到html中

					//$('#sblhcounter').html("<tr><td>1</td><td>" + dataP1.starttime + "</td><td class='zhexian' ><p><img src='img/qx.png' /></p><div class='lineDiv' style='left:25%; top: 150px; width:700px; height:365px;'><div class='drsMoveHandle'><span></span></div><div class='linecontent'id='zx"+i+"'></div></div></td><td>" + dataP1.name + "</td><td>是</td></tr>")
					
					//newPop(".lineDiv","zhexian",".drsMoveHandle span");
					//初始化弹窗的相对定位
					var line_width = ($(window).width() - 700) / 2 + "px";
					//var line_height=($(window).height()-365)/2+"px";
					var line_height = 100;
					$(".lineDiv").css({
						"left": line_width,
						"top": line_height
					});
					//改变窗口浏览器大小重置相对定位
					$(window).resize(function() {
						var line_width = ($(window).width() - 700) / 2 + "px";
						var line_height = ($(window).height() - 365) / 2 + "px";
						$(".lineDiv").css({
							"left": line_width,
							"top": line_height
						});
					});
					var d_flag= true;
					//弹窗淡入淡出
					$(".zhexian").on("click",

						function(event) {

							var i = $(this).parent().index() -1 ;
							//console.log($(this).parent().index());

							var dataT = $(this).find('.drsMoveHandle').get(0).id;
							var arr = dataT.split(";");
							var code = arr[0];
							var name = arr[1];
							var starttime = arr[2];
							var endtime = arr[3];
							//console.log(name);
							
							if(d_flag){
								sbjiaohu("zx"+i,code,name,starttime,endtime);
								d_flag = false;
								
							}

							$(this).children(".lineDiv").fadeIn();
							var index = $(this).index();
							//zhexian($(this).find('.linecontent div').attr('id'))  
						}
					)
					//弹出层关闭按钮
					$(".drsMoveHandle span").bind("click",
						function(event) {
							$(this).parent().parent(".lineDiv").fadeOut();
							event.stopPropagation();
						}
					)

					function tiaozhuan() {
						var s = document.getElementById('fadeIn');
					}
				} 
			});
			
		}

		//level4 轮换信息；
		$.ajax({
			url: url,
			type: "POST",
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: "json",
			data: {
				method: "getLHCount",
				org_id: localStorage.getItem("orgid"),
				g_id: g_id,
				special_id: special_id
			},
			success: function(data) {
				var data_level4 = data.lhlist[0];
				//console.log(data_level4 );
				//console.log(data_level4.length);
				var table1_huizong_td = $("#table1_huizong").find("td");
				var header_h3 = $('.wu_top1').find("h3");
				var lh_name = $('#lh_name');

				if (data.lhlist.length == 0) {
					table1_huizong_td.each(function(i) {
						if (i > 4) {
							$(this).html("暂时无数据");
						}

					});
					lh_name.html("");
					header_h3.each(function() {
						$(this).html("");
					});
					lh_name.html("本条记录无数据");
				}

				if (data.lhlist.length !== 0) {
					/*轮换说明*/
					header_h3.eq(0).html(data_level4.validbasic)
					header_h3.eq(1).html(data_level4.lhmethod);
					header_h3.eq(2).html(data_level4.systemlogic);
					header_h3.eq(3).html(data_level4.startbasic);
					header_h3.eq(4).html(data_level4.endbasic)

					/*轮换的名称*/
					lh_name.html(treeNode.name);

					/*轮换的具体数据*/
					table1_huizong_td.eq(5).html(data_level4.yscount);
					table1_huizong_td.eq(6).html(data_level4.ycount);
					table1_huizong_td.eq(7).html(data_level4.mscount);
					table1_huizong_td.eq(8).html(data_level4.mcount);
					table1_huizong_td.eq(9).html(data_level4.noexper);

				}

			}

		})
        return false;		
	}
	return false;

}
function prepearData(data){
	
	var htmlArray =[];
	htmlArray.push("<tr>");
	
	for(var i = 0;i<data.length;i++){

		var j=i+1;
		//htmlArray.push("<tr><td>"+j+"</td><td>" + data[i].starttime + "</td><td class='zhexian' ><p><img src='img/qx.png' /></p><div class='lineDiv' style='left:25%; top: 150px; width:700px; height:365px;'><div class='drsMoveHandle'><span></span></div><div class='linecontent' id='zx"+i+"'></div></div></td><td>" + data[i].name + "</td><td>是</td><td><a href='"+rootPath+"/getMainAction.do?method=getLhModel&lh_id="+data[i].id+"'>导出</a></td></tr>")
		htmlArray.push("<tr><td>"+j+"</td><td>" + data[i].starttime + "</td><td class='zhexian' ><p><img src='img/qx.png' /></p><div class='lineDiv' style='left:25%;top:150px;width:700px; height:365px;'><div class='drsMoveHandle' id='"+data[i].KKS_CODE+";"+data[i].KKS_NAME+";"+data[i].starttime+";"+data[i].endtime+"' ><span></span></div><div class='linecontent' id='zx"+i+"'></div></div></td><td>" + data[i].name + "</td><td>是</td><td><a href='"+rootPath+"/getMainAction.do?method=getLhModel&lh_id="+data[i].id+"'>导出</a></td></tr>")

	}
	if(data.length!==5){
		for(var k =data.length;k<5;k++){

			htmlArray.push("<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>")
		}
	}
		

	htmlArray.push("</tr>");


	return htmlArray.join('');

}
function prepearDatalevel1(data){
	var htmlArray =[];

	htmlArray.push("<tr>");
	for(var i = 0;i<data.length;i++){
		d = data[i];
		var j=i+1;
		htmlArray.push("<tr><td owspan='4'>"+j+"</td><td owspan='4'>" + d.name+ "</td>");
		//console.log(d.result[0].G_ID)
		for(var k = 0;k < d.result.length ; k++){
			if(k === 0){
				htmlArray.push("<td>#"+d.result[k].G_ID+"</td><td>"+d.result[k].YSCOUNT+"</td><td>"+d.result[k].YCOUNT+"</td><td>"+d.result[k].MSCOUNT+"</td><td>"+d.result[k].MCOUNT+"</td><td>"+d.result[k].FLAG+"</td></tr>")
			}
			else{

			}
		}
		
	}
		

	htmlArray.push("</tr>");


	return htmlArray.join('');

}
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

//click弹出层
$(".wu_top1 h2").each(function(i) {
	$(this).hover(
		function() {
			$(".wu_top1 h3").hide();
			$(this).parent().find("h3").slideDown();
		},
		function() {
			$(document).click(
				function() {

					$(".wu_top1 h3").slideUp();
				});
			$(".wu_top1 h2,.wu_top1 h3").click(
				function(event) {
					event.stopPropagation();
				}
			);
		}
	);

});



//折线图

var dragresize = new DragResize('dragresize', {
	minWidth: 400,
	minHeight: 250
});

dragresize.isElement = function(elm) {
	if (elm.className && elm.className.indexOf('lineDiv') > -1) return true;
};
dragresize.isHandle = function(elm) {
	if (elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
};
dragresize.ondragfocus = function() {};
dragresize.ondragstart = function(isResize) {};
dragresize.ondragmove = function(isResize) {};
dragresize.ondragend = function(isResize) {};
dragresize.ondragblur = function() {};
dragresize.apply(document);


$(document).ready(
	function() {
		//初始化弹窗的相对定位
		var line_width = ($(window).width() - 700) / 2 + "px";
		//var line_height=($(window).height()-365)/2+"px";
		var line_height = 100;
		$(".lineDiv").css({
			"left": line_width,
			"top": line_height
		});
		//改变窗口浏览器大小重置相对定位
		$(window).resize(function() {
			var line_width = ($(window).width() - 700) / 2 + "px";
			var line_height = ($(window).height() - 365) / 2 + "px";
			$(".lineDiv").css({
				"left": line_width,
				"top": line_height
			});
		});
		//弹窗淡入淡出
		$(".zhexian").on("click",

			function(event) {
				//sbjiaohu();
				$(this).children(".lineDiv").fadeIn();
				var index = $(this).index();
				//zhexian($(this).find('.linecontent div').attr('id'))  
			}
		)
		//弹出层关闭按钮
		$(".drsMoveHandle span").bind("click",
			function(event) {
				$(this).parent().parent(".lineDiv").fadeOut();
				event.stopPropagation();
			}
		)

		function tiaozhuan() {
			var s = document.getElementById('fadeIn');
		}
	}
);



//设备轮换echart

function sbjiaohu(id,pi_codes,names,startime,endtime) {
	//console.log(id);

	var code = pi_codes.split(",");
	var name = names.split(",");	
	var sbchulidata =[];
	var sbname=[];
	for(var t=0;t< code.length;t++){
		//console.log(startime);
		//console.log(endtime);
		var url = rootPath + '/XipHistoryAction.do?method=getTecPro&pi_code='+code[t]+'&startTime=' + startime + '&endTime=' + endtime;
		$.ajax({
			url: url,
			async : false,
			success:function(data) {
					var sbchuli = chulihanshu(data,name[t]);
					sbchulidata.push(sbchuli.value);
					sbname.push(name[t]);
					console.log(sbname);
					//var zhexiantest = document.getElementById('zhexiantest')
					//console.log(name[i])
				
				
				if(t == code.length-1){
					
				    var sblhx = chulishijian(startime,endtime);
				    sblunhuan(sbname,sblhx,sbchulidata,id);
				   
				}
			} 
		})
	}
}

function chulishijian(startime,endtime){
	var time = [];
	$.ajax({
		url : rootPath +"/XipHistoryAction.do",
		type : "post",
		async : false, //同步执行
		dateType : "json",
		data : {
			    method: "getSblhX",
			    StartTime: startime,
			    StopTime:endtime     				
			   },
		success : function(data) {
			for(var i =0;i<data.length;i++){
				time.push(data[i]);
			}
		}
	})
	//console.log(time);
		return time;
		
		
}
function chulihanshu(data,code_name) {
	var arr = [];
	for (var i = 0; i < data.length; i++) {
		arr.push(data[i]);	
	}
	var arriteam = {
			name: code_name,
			type: 'line',
			//stack: '总量',
			data: arr
		}
	return {
		value: arriteam
	}
}
function sblunhuan(name,time, data,id) {
	times = time;
	//console.log(id);
	var myChart = echarts.init(document.getElementById(id));
	option = {
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data:name
		},
		
		toolbox: {
			show: false,
	        feature: {
	        	dataZoom: {show: true},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: (function(times) {
				var arr = [];
				for (var i = 0; i < times.length; i++) {
					var a = new Date(times[i]);
					arr.push(a.format("yyyy-MM-dd hh:mm:ss"));
					//arr.push((new Date(times[i])).toLocaleString())
				}
				//console.log(arr);
				return arr;

			})(times)
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value}'
			}
		},
		series: data
	};
	myChart.setOption(option);

}
Date.prototype.format = function(format) {
	/*
	 * format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

		}
	}
	return format;
}


function shuaxinhanshu(length) {
	var html = '';
	var s = 1;
	var a = '#1EH油泵切至#2EH油泵运行';
	var b = '是';
	for (var i = 0; i < length; i++) {
		html += '<tr><td>' + (i + 1) + '</td><td class="time">' + s + '</td><td class="zhexian"><p><img src="img/qx.png" /></p><div class="lineDiv" style="left:25%; top: 150px; width:400px; height:365px;"><div class="drsMoveHandle"><span></span></div><div class="linecontent"><div id="zhe' + (i + 1) + '" class="zhe" style="width: 300px;height:300px;"></div></div></div></td><td class="shuoming">' + a + '</td><td>' + b + '</td></tr>'
	}
	$('#rongqi').append(html)
}



$(document).ready(
	function() {
		// js模拟select
		(function($) {
			var selects = $('.choose'); //获取select
			for (var i = 0; i < selects.length; i++) {
				createSelect(selects[i], i);
			}

			function createSelect(select_container, index) {
				//创建select容器，class为select_box，插入到select标签前
				var tag_select = $('<div></div>'); //div相当于select标签
				tag_select.attr('class', 'select_box');
				tag_select.insertBefore(select_container);
				//显示框class为select_showbox,插入到创建的tag_select中
				var select_showbox = $('<div></div>'); //显示框
				select_showbox.css('cursor', 'pointer').attr('class', 'select_showbox').appendTo(tag_select);
				//创建option容器，class为select_option，插入到创建的tag_select中
				var ul_option = $('<ul></ul>'); //创建option列表
				ul_option.attr('class', 'select_option');
				ul_option.appendTo(tag_select);
				createOptions(index, ul_option); //创建option
				//点击显示框
				tag_select.toggle(function() {
					ul_option.slideDown();
				}, function() {
					ul_option.slideUp();
				});
				var li_option = ul_option.find('li');
				li_option.on('click', function() {
					$(this).addClass('selected').siblings().removeClass('selected');
					var value = $(this).text();
					select_showbox.text(value);
					ul_option.slideUp();
				});
				li_option.hover(function() {
					$(this).addClass('hover').siblings().removeClass('hover');
				}, function() {
					li_option.removeClass('hover');
				});
			}

			function createOptions(index, ul_list) {
				//获取被选中的元素并将其值赋值到显示框中
				var options = selects.eq(index).find('option'),
					selected_option = options.filter(':selected'),
					selected_index = selected_option.index(),
					showbox = ul_list.prev();
				showbox.text(selected_option.text());
				//为每个option建立个li并赋值
				for (var n = 0; n < options.length; n++) {
					var tag_option = $('<li></li>'), //li相当于option
						txt_option = options.eq(n).text();
					tag_option.text(txt_option).css('cursor', 'pointer').appendTo(ul_list);
					//为被选中的元素添加class为selected
					if (n == selected_index) {
						tag_option.attr('class', 'selected');
					}
				}
			}
		})(jQuery)
	})

//树形菜单
$(function() {
	$.fn.extend({
		SimpleTree: function(options) {

			//初始化参数
			var option = $.extend({
				click: function(a) {}
			}, options);

			option.tree = this; /* 在参数对象中添加对当前菜单树的引用，以便在对象中使用该菜单树 */

			option._init = function() {
				/*
				 * 初始化菜单展开状态，以及分叉节点的样式
				 */
				this.tree.find("ul ul").hide(); /* 隐藏所有子级菜单 */
				this.tree.find("ul ul").prev("li").removeClass("open"); /* 移除所有子级菜单父节点的 open 样式 */

				this.tree.find("ul ul[show='true']").show(); /* 显示 show 属性为 true 的子级菜单 */
				this.tree.find("ul ul[show='true']").prev("li").addClass("open"); /* 添加 show 属性为 true 的子级菜单父节点的 open 样式 */
			} /* option._init() End */

			/* 设置所有超链接不响应单击事件 */
			this.find("a").click(function() {
				$(this).parent("li").click();
				return false;
			});

			/* 菜单项 <li> 接受单击 */
			this.find("li").click(function() {
				/*
				 * 当单击菜单项 <li>
				 * 1.触发用户自定义的单击事件，将该 <li> 标签中的第一个超链接做为参数传递过去
				 * 2.修改当前菜单项所属的子菜单的显示状态（如果等于 true 将其设置为 false，否则将其设置为 true）
				 * 3.重新初始化菜单
				 */

				option.click($(this).find("a")[0]); /* 触发单击 */

				/* 
				 * 如果当前节点下面包含子菜单，并且其 show 属性的值为 true，则修改其 show 属性为 false
				 * 否则修改其 show 属性为 true
				 */
				if ($(this).next("ul").attr("show") == "true") {
					$(this).next("ul").attr("show", "false");
				} else {
					$(this).next("ul").attr("show", "true");
				}

				/* 初始化菜单 */
				option._init();
			});

			/* 设置所有父节点样式 */
			this.find("ul").prev("li").addClass("folder");

			/* 设置节点“是否包含子节点”属性 */
			this.find("li").find("a").attr("hasChild", false);
			this.find("ul").prev("li").find("a").attr("hasChild", true);

			/* 初始化菜单 */
			option._init();

		} /* SimpleTree Function End */

	});
});