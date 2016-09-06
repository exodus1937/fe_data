# 考核接口文档_v1.0.0

    考核重新用 markdown 重构 
    
# 接口规范

## 考核次数 总览 
    根据电厂不同来显示不同数据
> 
#### HttpMethod: `GET`
#### Url: `/jsjd/getKaoheAction.do?method=getTongJi&org_id=${org_id}`
#### request: data
param      | description        | 动态传入
-----------|--------------------|---------
orgid      | orgid              | true
#### Response:      
param      | description
-----------|---------------
yearnum      | 本年考核次数
monthAmount  | 本年考核金额(元)   
yearAmount   | 本月考核次数
monthnum     | 本月考核金额(元)

#### example data
```JSON
    {
        "yearnum": "2183", 
        "monthAmount": "600",
        "yearAmount": "750800",
        "monthnum": "3"
    }
```

## 考核详情 
    
> 
#### HttpMethod: `GET`
#### Url: `/jsjd/getKaoheAction.do?method=getKaoheShow&org_id=${org_id}`
#### request: data
param      | description        | 动态传入
-----------|--------------------|---------
orgid      | orgid              | true
#### Response:      
param      | description
-----------|---------------
"amount"   | 金额
 "orgId"   | 电厂ID
    "id"   | 主ID
infomation | 通知显示内容
assCase"   | 考核原因
"status"   | 流程状态（申述状态）流程状态(1：草稿2：审核中3：审核通过4：驳回)
   "tag"   | 是否已申诉标记
  "date"   | 考核日期
orgName"   | 电厂名称
   "key"   | 是否考核
  "mode"   | 考核方式

#### example data
```JSON
    {
        "amount":"50",
        "orgId":"c21834b4-1cb0-490f-a2a8-deeaf7f7e065",
        "id":"f2a10e15-4f00-4802-8cde-3a2040137055",
        "infomation":"2016年第1季度岱海发电节能专业未填写上季度总结考核",
        "assCase":"设定值:单点高报警超过3600秒或者单台机组12点同时超标或者单点超限514℃报警值:450.0报警时长:0小时22分9秒",
        "status":"null",
        "tag":"N",
        "date":"2016-05-24",
        "orgName":"岱海发电",
        "key":"是",
        "mode":"自动考核"
    }
```
## 集团考核汇总 
    
> 
#### HttpMethod: `GET`
#### Url: `/jsjd/getKaoheAction.do?method=getJTKaoheTotal`
#### request: data

#### Response:      
param      | description
-----------|---------------
ORG_NAME   | 单位
（合计）|
YEARNUM   | 本年考核次数
YEARAMOUNT| 本年考核金额（元）
MONTHNUM  | 本月考核次数
MONTHMOUNT| 本月考核金额（元）
（数据有效性）|
YEARNUM0   | 本年考核次数
YEARAMOUNT0| 本年考核金额（元）
MONTHNUM0  | 本月考核次数
MONTHMOUNT0| 本月考核金额（元）
（参数超限）|
YEARNUM1   | 本年考核次数
YEARAMOUNT1| 本年考核金额（元）
MONTHNUM1  | 本月考核次数
MONTHMOUNT1| 本月考核金额（元）
（故障）|
YEARNUM2   | 本年考核次数
YEARAMOUNT2| 本年考核金额（元）
MONTHNUM2  | 本月考核次数
MONTHMOUNT2| 本月考核金额（元）
（定期工作）|
YEARNUM3   | 本年考核次数
YEARAMOUNT3| 本年考核金额（元）
MONTHNUM3  | 本月考核次数
MONTHMOUNT3| 本月考核金额（元）
（系统维护）|
YEARNUM4   | 本年考核次数
YEARAMOUNT4| 本年考核金额（元）
MONTHNUM4  | 本月考核次数
MONTHMOUNT4| 本月考核金额（元）

#### example data
```JSON
    {
        "ORG_NAME":
        "宁东发电",
        "MONTHAMOUNT4":"0",
        "MONTHAMOUNT3":"0",
        "MONTHAMOUNT2":"0",
        "MONTHAMOUNT1":"2200",
        "MONTHAMOUNT0":"0",
        "YEARAMOUNT0":"0",
        "YEARNUM0":"0",
        "YEARAMOUNT4":"0",
        "YEARAMOUNT3":"383900",
        "YEARAMOUNT2":"0",
        "MONTHNUM":"11",
        "YEARAMOUNT1":"28600",
        "YEARNUM2":"0",
        "YEARNUM1":"143",
        "YEARNUM4":"0",
        "YEARNUM3":"606",
        "YEARNUM":"749",
        "YEARAMOUNT":"412500",
        "ORG_ID":"472212af-1977-462b-a74a-a1f36ed6562d",
        "MONTHNUM2":"0",
        "MONTHNUM3":"0",
        "MONTHNUM4":"0",
        "MONTHNUM0":"0",
        "MONTHNUM1":"11",
        "MONTHMOUNT":"2200"
    }
        
```