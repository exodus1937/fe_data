# 指标大盘接口文档_v1.0.0

    指标总览用 markdown 重构 
    
# 接口规范

## 详细 总览 
    根据电厂不同来显示不同数据
> 
#### HttpMethod: `POST`
#### Url: `/jsjd/XipExperimentAction.do`
#### request: data
param      | description        | 是否可空
-----------|--------------------|---------
method     | getTesBaTPWMarketData|否
orgid      | orgid              | 是
g_id       | 机组（1/2/3/4）     | 是
sysName    | 系统名称（模糊搜索/中文）| 是
ptCode     | 测点编码 （模糊搜索）   |  是
ptDesc     | 测点描述（模糊搜索/中文）| 是
pageSize   | 条目                 | 否
pageNumber | 页码                 | 否
#### Response:      
param      | description
-----------|---------------
ID           | 序号
POWER_PLANT  | 电厂  
MAJOR        | 专业
CREW         | 机组
SYS_NAME     | 系统名
POINT_CODE   | 测点编号
POINT_DESC   | 测点描述
COMPANY      | 单位
DOWN_RANGE   | 量程下限
up_RANGE     | 量程下限
REAL_DATA    | 实时数据
WEB_ID       | webid
#### 示例数据

```json
    {
        "company": "",
        "crew": "1",
        "downRange": "",
        "id": "1",
        "major": "汽机",
        "orgId": "c21834b4-1cb0-490f-a2a8-deeaf7f7e065",
        "pointCode": "NMDH:10DEH01AI005XQ01",
        "pointDesc": "机组有功功率",
        "powerPlant": "岱海电厂",
        "realData": "",
        "sysName": "汽轮机本体及调节系统",
        "upRange": "",
        "webId": ""
    }

```

## 获取实时值
    获取对应pi点对应的实时值，点名是以 '|'分割 ；
> 
#### HttpMethod: `POST`
#### Url: `/jsjd/XipExperimentAction.do?method=getRealData&pointName=`
#### request: data
param      | description        | 是否可空
-----------|--------------------|---------
method     | getRealData        |否
pointName  | 点名                | 否

#### Response:      
param      | description
-----------|---------------
status:    |   状态
tag        |   点名
time       |   时间
value      |   值
#### 示例数据
```json
    {
        status:"0"
        tag:"NMDH:10DEH01AI005XQ01"
        time:"2016-09-13 14:20:39.0"
        value:626.6
    }

```


