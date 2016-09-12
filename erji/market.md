# 指标大盘接口文档_v1.0.0

    指标总览用 markdown 重构 
    
# 接口规范

## 详细 总览 
    根据电厂不同来显示不同数据
> 
#### HttpMethod: `POST`
#### Url: `/jsjdXipExperimentAction.do`
#### request: data
param      | description        | 是否可空
-----------|--------------------|---------
method     | getTesBaTPWMarketData|否
orgid      | orgid              | 是
g_id       | 机组（1|2|3|4）     | 是
sysName    | 系统名称（模糊搜索/中文）  | 是
ptCode     | 测点编码 （模糊搜索）   | 是
ptDesc     | 测点描述（模糊搜索/中文）|是
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


