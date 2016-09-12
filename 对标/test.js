$(document).ready(function(){
    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    var ctx = window.location.origin;
    var orgId="c21834b4-1cb0-490f-a2a8-deeaf7f7e065";
  getdatas(orgId);
  
  function getdatas(orgId){
        var url = ctx + "/jsjd/benchmark/getBenchmarkStationBaseInfo.do?orgId="+orgId;
        //ajax获取数据data
        $.ajax({
            url: url,	
            type:"post",	
            success: function(data){	
                console.log(data);
                $("#detail").html(load(data["result"]["pagedata"]));
                $(".tdCheck").on("click",function(){
                    var indexnum = $('input:radio:checked').val();
                    alert(indexnum);
                })
                
            }
        }); 
        function load(data) {
            var htmlArray = [];
            for (var i = 0; i < data.length; i++) {
                var d = data[i];
                var j = i + 1;
                var mmsecond = d["createTime"];
                var result = [60,60,24];
                var flag;
                var result_re = "";
                mmsecond = Math.floor(mmsecond/1000);
                //变成秒单位,但是不操作
                //下面这个for计算时分秒
                for(var k=0;k<3;k++){
                    flag = Math.floor(mmsecond%result[k]);
                    mmsecond = Math.floor(mmsecond/result[k]);
                    if(flag < 10){
                        result_re = "0"+flag +":"+ result_re;
                    }else{
                        result_re = flag +":"+ result_re;
                    }
                }
                //去掉最后的一个冒号
                result_re = result_re.substring(0,result_re.length-1);
                //下面计算年月日
                var year,month,day;
                var everyMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
                //计算年
                flag = Math.floor(mmsecond/365);
                year = 1970 - 0 + flag;
                mmsecond = Math.floor(mmsecond%365);
                //计算月和日
                for(h=0;h<12;h++){
                //判断闰月
                    if(((year%4 == 0)&&(year%100 != 0)) || (year%400 == 0)){
                        if(mmsecond == 59){
                            month = "02";
                            day = "29";
                            break;
                        }
                    }
                    if(mmsecond > everyMonth[h]){
                        mmsecond -= everyMonth[h];
                    }else{
                        month = k+1;
                        day = mmsecond;
                        month = month >10?month:"0"+month;
                        day = day>10?day:"0"+day;
                    }
                }
                //拼起来
                result_re = year + "-" + month +"-"+day + " " + result_re;
                var auditStatus = d["auditStatus"]; 
                if( auditStatus=="A"){
                    auditStatus = "未提交";
                }
                if( auditStatus=="B"){
                    auditStatus = "电厂通过";
                }
                if( auditStatus=="D"){
                    auditStatus = "电厂驳回,";
                }
                if( auditStatus=="E"){
                    auditStatus = "集团通过";
                }
                if( auditStatus=="F"){
                    auditStatus = "集团驳回,";
                }
                if( auditStatus=="C"){
                    auditStatus = "撤回,";
                }
                htmlArray.push("<tr><td><input name='kaohe' type='radio' class='tdCheck' value='"+d["applyId"]+"'></td><td>" + j + "</td><td>" + d["applyCode"] + "</td><td>" + d["quarter"] + "</td><td style='max-width:300px;color:#177eda;cursor: pointer;'id=" + d["applyId"] + " ><a href='table.html?applyId="+d['applyId']+"'>" + d["benchmarkName"] + "</a></td><td>" + d["orgInfo"]["orgName"] + "</td><td>" +auditStatus + "<td>" + result_re + "</td></tr>");
            }
               
            return htmlArray.join("");
        }
        var pagenation = function(page) {
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
        }
        function pageselectCallback(page_index, jq){
            expr(page_index + 1);
            return false;
        }
        function expr(page_index){
            alert(page_index);
        }
        $("#query").click(function(){
            var org_id = $("#org_id").val();
            var startTime = $("#startTime").val();
            var endTime = $("#endTime").val();
            var data = {
                createTime:"1473177600000"
            }
            $.ajax({
                url: url,	
                type:"post",	
                data:data,
                success: function(data){	
                    console.log(data);
                    $("#detail").html(load(data["result"]["pagedata"]));
                }
            }); 
        })

    }
})

 






