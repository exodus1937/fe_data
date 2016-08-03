
# 访客统计接口文档_v1.0.0

    访客统计重新用 markdown 重构 
    
# 接口规范

## 在线登录人数统计 （导出excel）
    根据电厂不同来显示不同数据
> 
#### HttpMethod: `get`
#### Url: 'jsjd/portal.do?method=getLogininfo&org_id=''&nameValue=''&startTime=''&endTime=''&status='''
#### request: data
param      | description        | 动态传入
-----------|--------------------|---------
method     | getLogininfo       | false
org_id     | org_id             | true
nameValue  | nameValue          | true
startTime  | startTime          | true
endTime    | endTime            | true
status     | status             | true
#### Response:      
返回结果为excel文件