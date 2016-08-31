# 异常情况接口文档_v1.0.0

    异常情况重新用 markdown 重构 
    
# 接口规范

## 异常情况首页
    异常情况在首页接口
> 
#### HttpMethod: `get`
#### Url: '/jsjd/portal/getGZList.do?orgid="+orgid'
#### request: 
param      | description        | 动态传入
-----------|--------------------|---------
orgid      | orgid              | true
#### Response:      
param        | description
-------------|---------------
org_id       | 单位代码
g_id         | 机组
name         | 异常名称
time         | 发生时间
type_desc    | 异常说明
special_name | 故障类型
#### example 
    {"total":1,"pagedata":[
        {
            "org_id": "472212af-1977-462b-a74a-a1f36ed6562d",
            "time": "2016-07-11 07:35:53",
            "name": "停炉不停机",
            "special_name": "机组故障",
            "g_id": "4"
         }]
    }

## 异常情况实验说明
    异常情况在详情显示
> 
#### HttpMethod: `POST`
#### Url: '/jsjd/portal.do'
#### request: data
param      | description        | 动态传入
-----------|--------------------|---------
orgid      | orgid              | true
method     | getGZTime          | false
g_id       | 机组                | true
name       | 详情名称            | true
pagenum    |    1页数           | true
pagesize   |    5               | false

#### Response:      
param        | description
-------------|---------------
endtime      | 结束时间
id           | 记录id
starttime    | 开始时间
KKS_CODE     | 涉及测点
KKS_NAME     | 涉及测点名称
code         | //todo
#### example 
    {"total":2,"exper":[{
         "endtime":"2016-04-20 17:43:05",
         "id":"7300b5b1-0013-4f58-8934-17120c95a58f",
         "starttime":"2016-04-19 17:43:07",
         "KKS_CODE":"NXND:DCS1_A0GCK21AP001CE,NXND:DCS1_10NCS00YA04,NXND:DCS1_10CBD01AI003,NXND:DCS1_HRHP,NXND:DCS1_HRHT,NXND:DCS1_PAPRESS",
         "name":"",
         "KKS_NAME":"主汽压力,主汽温度,机组负荷,再热汽压力,再热汽温度,热一次风母管压力",
         "code":"GZ:NXND:10GL02:01"
         }
         ]
     } 

## 异常情况树形菜单
    二级页面左侧树
> 
#### HttpMethod: `post`
#### Url: `/jsjd/portal/getGZTreeMenu.do?orgid="+orgid`
#### request: data
param      | description        | 动态传入
-----------|--------------------|---------
orgid      | orgid              | true
#### Response:      





### 集团级统计汇总（列表） ###

#### HttpMethod: `POST`
#### Url: "127.0.0.1:8080/jsjd/portal.do"
### Request:
  字段          | 字段值         |是否可空 |描述  |
-------------   | -------------|--------|------|
method    | "getJTGZinfos" |false|方法名
orgid     |      String    |true|单位
g_id      |      String    |true|机组
name      |      String    |true|异常类型
year      |      String    |true|年份
pagenum   |      int       |false|页码
pagesize  |      int       |false| 每页显示记录数  

###Response:

  字段          | 类型         |是否可空 | 描述  |
-------------   | -------------|--------|------|
ORG_NAME        |str           |false    |单位
G_ID            |str           |false    |机组
NAME            |str           |false    |异常类型
YTOTAL          |int           |false    |累计发生（次）
YCOUNT          |int           |false    |本年已做（次）
MCOUNT          |int           |false    |本月已做（次）
