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

`$.ajax({"/XipTecProject.do",data : {method:"getLineData",id:_id},type:"post",})`

# 集团页面

## 折线图及饼图接口 table-1

### 折线图

`/syzb.do?method=getFDL`

### 饼图

`/syzb.do?method=getAmounts`

## 测点报警 table-2

`/portal/warningMessageList.do?orgid=a61365e2-969d-4352-b3f8-805027ab9f1d&pagenum=1&pagesize=5&ispage=true&unit_status="+unit_status`

## 考核对标 table-3

### 考核

### 对标

## 生产/监督报表 table-4

### 生产报表 table-4-1

`"/portal/getDcScbb.do?orgid="+$("#org").val()`

### 监督报表 table-4-2

`"/portal/supervisionReportPageData.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val() + "&pagenum=1&pagesize=6&ispage=true"`

## 定期实验/设备轮换/机组启停 table-5

### 定期实验 table-5-1

`/portal/getJTSYCount.do`
### 设备轮换 table-5-2

`/portal/getJTLHCount.do`

### 机组启停 table-5-3

`/portal/getJTJzqtList.do`

## 机组事件/预警通知单 table-6

### 机组事件 table-6-1

`/portal/getJTGZList.do`

### 预警通知单 table-6-2

`"/portal/warningNoticeList.do?orgid=" + $("#org").val() + "&specid=" + $("#spec").val()+ "&pagenum=1&pagesize=6&ispage=true"`

## 技改 与 电厂相同 tale-7

## 通知公告 table-8
 
`/mainDate.do?method=getJtDynamic`









