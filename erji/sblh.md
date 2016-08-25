## 设备轮换 ##

### 1.主要实体 ###

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
gId|str|false|机组ID
name|str|false|试验或者轮换名称
开始时间|date|true|开始时间
ysCount|int|false|本年应做
msCount|int|false|本月应做
yCount|int|false|本年已做
mCount|int|false|本月已做
fCount|int|false| 非轮换期或实验期做
professionName|str|false|专业名称
professionId|str|false|专业ID


### 2.获取轮换具体信息###

#### HttpMethod: `POST`
#### Url: "127.0.0.1:8080/jsjd/portal/getlhdetailinfo.do"
### Request:

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
orgId|str|true|组织ID
gId|str|false|机组ID
specialId|str|true|专业ID
beginStart|str|false|开时间开始
endStart|str|false|开始时间结束
name|str|false|本年已做
conditionType|str|str|计划类型 PLAN-计划项目 DONE-已做项目 DELAY-未按时做项目 UNDONE-未做项目
pageNum|int|false|当前页码
pageSize|int|false|页数据量

###Response:

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
gId|str|false|机组ID
name|str|false|轮换名称
startTime|date|true|开始时间
ysCount|int|false|本年应做
msCount|int|false|本月应做
yCount|int|false|本年已做
mCount|int|false|本月已做
fCount|int|false| 非轮换期或实验期做
professionName|str|false|专业名称
professionId|str|false|专业ID

### 返回示例 ###

	{
	    "total":134,
	    "pagedata":[
	        {
	            "gId":"4",
	            "name":"#1引风机#3轴冷风机切换至#4轴冷风机",
	            "startTime":1466816970000,
	            "ysCount":24,
	            "msCount":2,
	            "yCount":1,
	            "professionName":"锅炉专业",
	            "professionId":"GL",
	            "mCount":0,
	            "fCount":0
	        },
	        {
	            "gId":"4",
	            "name":"#1引风机#4轴冷风机切换至#3轴冷风机",
	            "startTime":1466787709000,
	            "ysCount":24,
	            "msCount":2,
	            "yCount":1,
	            "professionName":"锅炉专业",
	            "professionId":"GL",
	            "mCount":0,
	            "fCount":0
	        }
	    ]
	}


### 2.获取机组轮换统计信息 ###
#### HttpMethod: `POST`
#### Url: "127.0.0.1:8080/jsjd/portal/getLHSummaryInfo.do"
### Request:

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
orgId|str|false|组织ID
gId|str|true|机组ID
### Response:
  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
gId|str|false|机组ID
ysCount|int|false|本年应做
msCount|int|false|本月应做
yCount|int|false|本年已做
mCount|int|false|本月已做
fCount|int|false| 非轮换期或实验期做

###返回示例:
	[
	    {
	        "gId":"1",
	        "ysCount":2760,
	        "msCount":230,
	        "yCount":89,
	        "mCount":0,
	        "fCount":1
	    },
	    {
	        "gId":"2",
	        "ysCount":2760,
	        "msCount":230,
	        "yCount":82,
	        "mCount":0,
	        "fCount":22
	    },
	    {
	        "gId":"公用系统",
	        "ysCount":1920,
	        "msCount":160,
	        "yCount":1,
	        "mCount":0,
	        "fCount":0
	    }
	]
### 3.根据组织获取机组信息 ###
#### HttpMethod: `POST`
#### Url: "127.0.0.1:8080/jsjd/portal/getLhJzInfo.do"
### Request:

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
orgId|str|false|组织ID
###返回示例###
	{
	    "$1":"1",
	    "$公用系统":"公用系统",
	    "$2":"2"
	}

### 4.根据组织ID和机组Id获取专业信息 ###
#### HttpMethod: `POST`
#### Url: "127.0.0.1:8080/jsjd/portal/getLhZyInfo.do"
### Request:

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
orgId|str|false|组织ID
gId|str|true|机组ID
###返回示例###
	{
	    "QJ":"汽机专业",
	    "GL":"锅炉专业"
	}

### 5.获取集团统计汇总（总数） ###

#### HttpMethod: `POST`
#### Url: "127.0.0.1:8080/jsjd/portal/getJTLHTotal.do"
### Request:

###Response:

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
YSCOUNT|int|false|本年应做（次）
YCOUNT|int|false|本年已做（次）
YEARRATE|str|true|本年完成率（%）
MSCOUNT|int|false|本月应做（次）
MCOUNT|int|false|本月已做（次）
MONTHRATE|str|false|本月完成率（%）
### 6.获取集团统计汇总（列表） ###

#### HttpMethod: `POST`
#### Url: "127.0.0.1:8080/jsjd/portal.do"
### Request:
  字段          | 字段值         |是否可空 |描述  |
-------------   | -------------|--------|------|
method    | "getJTSYinfos" |false|方法名
orgid     |      String    |true|单位
g_id      |      String    |true|机组
name      |      String    |true|名称
year      |      String    |true|年份
pagenum   |      int       |true|页码
pagesize  |      int       |false| 每页显示记录数 
###Response:

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
ORG_NAME|str|false|单位
G_ID|str|false|机组
NAME|str|false|轮换名称
YSCOUNT|int|false|本年应做（次）
YCOUNT|int|false|本年已做（次）
MSCOUNT|int|false|本月应做（次）（1月-12月）
MCOUNT1|int|false|1月本月已做（次）
MCOUNT2|int|false|2月本月已做（次）
MCOUNT3|int|false|3月本月已做（次）
### 以此类推 1到12月的本月已做次数
MCOUNT12|int|false|12月本月已做（次）