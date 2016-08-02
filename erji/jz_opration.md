
# 机组运行状态接口 _v1.0.0

    机组运行状态用 markdown 重构 
    
# 接口规范

##  机组运行状态
    
> 
#### HttpMethod: `get`
#### Url: '/jsjd/portal/getQTJDetail.do?org_id="+orgId+"&year="+year+"&g_id="+g_id;'
#### request: data
param      | description        | 动态传入 |
-----------|--------------------|---------
years      |  年份               | true
orgid      | orgid              | true
g_id       | 机组                | true

#### Response:      
param      | description
-----------|---------------
org_id       | 电厂编号
g            | 机组
plan         | 计划运行
real         | 实际运行
d            | 天数
s            | 开始时间
e            | 结束时间
m            | 状态


