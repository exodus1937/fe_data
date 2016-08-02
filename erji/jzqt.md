# 机组启停接口文档_v1.0.0

    机组启停重新用 markdown 重构 
    
# 接口规范

## 机组启停次数 总览 
    根据电厂不同来显示不同数据
> 
#### HttpMethod: `post`
#### Url: 'jsjd/portal.do'
#### request: data
param      | description        | 动态传入
-----------|--------------------|---------
method     | getJzqtNumByOrgid" | false
orgid      | orgid              | true
#### Response:      
param      | description
-----------|---------------
total      | 当年故障停机次数  （用于首页显示）
DAYS       | 连续运行天数    （用于首页显示）
ORGNAME    | 电厂名称
G_ID       | 机组id
QDNUM      | 启动次数
TJNUM      | 停机次数
QDTIME     | 最近启动时间
TJTIME     | 最近停机时间
STARTTIME  | 发生时间数 
#### example 
    {"total":1,"pagedata":[
        {
            "DAYS":12,
            "QDTIME":"2016-04-05 10:25:00",
            "QDNUM":"1","G_ID":"1",
            "TJTIME":"2016-04-04 10:25:00",
            "TJNUM":"1",
            "ORGID":"472212af-1977-462b-a74a-a1f36ed6562d",
            "ORGNAME":"宁东发电"
        }]
    }

## 机组启停详情
    根据电厂不同来显示不同数据
> 
#### HttpMethod: `post`
#### Url: 'jsjd/portal.do'
#### request: data
param     |  description |动态传入
----------|--------------|----
method    | getJzqtExp   |false
orgid     |   orgid      |true
g_id      |    gid       |true
type      |    "QD"      |true
pagenum   |     1        |true 
pagesize  |     5        |false  
#### Response :
param     |description
----------|---------------
KKS_NAME  | KNAME 测点名称
KKS_CODE  | KCODE 测点code
ID        | 记录ID
G_ID      | 机组id
NAME      | 启动项目 
STARTTIME | 开始时间
ENDTIME   | 结束时间
PARATIME  | 并网时间（启机）/解列时间（停机）
FIRETIME  | 点火时间（启机）/灭火时间（停机）
RUSHTIME  | 冲车时间（启机）/打闸时间（停机）
QT_DESC   | 启停机说明
POINT_MEAS| 单位
#### example 
    {"total": 2,
        "KKS_NAME":[
            {
            "KNAME": "机组负荷,总风量,汽机主汽压力,汽机主汽温度,再热蒸汽压力,机侧再热器温度平均值,过热器出口压力变化率,过热器出口蒸汽温度变化率,末再出口蒸汽温度变化率,再热蒸汽压力变化率,末级过热器出口温度平均值,再热器出口温度平均值"
            }]
        "expr": [
            {
                "ADUIT_STATUS": "A",
                "NAME": "宁夏宁东电厂1号机组热态启动",
                "G_ID": "1",
                "PARATIME": "2016-05-06 22:11:39",
                "ID": "e34d712c-9247-46c6-94d7-128dba6fb76e",
                "QT_DESC": "A级检修",
                "ENDTIME": "2016-05-06 23:21:30",
                "STARTTIME": "2016-05-06 21:08:42",
                "ORG_ID": "472212af-1977-462b-a74a-a1f36ed6562d",
                "CODE": "QD:NXND:1001"
        }]
    }

 
## 修改机组启停描述字段
    更新描述字段到服务器
> 
#### HttpMethod: `post`
#### Url: 'jsjd/portal.do'
#### request: data
param      | description        | 动态传入
-----------|--------------------|---------
method     | updateQTDesc       | false
qt_desc    | 传入的内容          | true
id         | 本条记录的id        | true
#### Response:      

## 机组启停趋势图（计算测点值接口）
    
> 
#### HttpMethod: `get`
#### Url: '/jsjd/XipHistoryAction.do?method=getTecPro&pi_code='+code[t]+'&startTime=' + startime + '&endTime=' + endtime"'
#### request: data
param      | description        | 动态传入
-----------|--------------------|---------
pi_code    | 传入的测点名称       | ture
startime   | 开始时间            | true
endTime    | 结束时间            | true
#### Response:      



