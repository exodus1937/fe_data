### 1.获取集团统计汇总（列表） ###

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

  字段          | 类型         |是否可空 |描述  |
-------------   | -------------|--------|------|
ORG_NAME|str|false|单位
G_ID|str|false|机组
NAME|str|false|异常类型
YTOTAL|int|false|累计发生（次）
YCOUNT|int|false|本年已做（次）
MCOUNT|int|false|本月已做（次）
