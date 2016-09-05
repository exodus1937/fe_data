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