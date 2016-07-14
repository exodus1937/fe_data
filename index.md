# 首页接口文档说明

## 机组运行状态 table-1 圆环

```"/portal/getQuotaList.do?orgid=" + $("#org").val();`

## 机组连续运行天数 table-1 左上

``"/portal.do",type: "POST",data: {method: "getJzqtNumByOrgid",orgid: $("#org").val()}`

## 指标一览 table-2

`"/portal/getIndex.do?orgid=" + orgid + "&position=2"`

## 指标排名 table-3

`"/zbpm.do?method=getZbpm&org_id="+$("#org").val()+"&flag=0",`

## 测点报警 table-4

`"/portal/warningMessageList.do?orgid=" + $("#org").val() + "&pagenum=1&pagesize=5&ispage=true&unit_status="+unit_status;`

## 考核信息  table-5

`"/getKaoheAction.do?method=getHomeShow&org_id="+$("#org").val()`

## 机组事件 table-6-1

`"/portal/getGZList.do?orgid="+$("#org").val();`

## 预警通知单 table-6-2

`"/portal/warningNoticeList.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val()+ "&pagenum=1&pagesize=6&ispage=true"`

## 设备轮换 table-7-1

`"/portal/getLHList.do?orgid=" + $("#org").val()`

## 定期试验 table-7-2

`"/portal/getSYList.do?orgid="+$("#org").val()`

## 机组启停 table-7-3

`"/portal/getJzqtList.do?orgid="+$("#org").val()`

## 技改项目 table-8

### 技改项目生成

`/portal/getProject.do?pagenum=1&pagesize=2&ispage=true&orgid="+$("#org").val();`

### 技改收益

`/XipTecProject.do?method=showJgShouYe&id="+_id`

#### 技改折线图

`$.ajax({"/XipTecProject.do",data : {method:"getLineData",id:_id},type:"post",`

