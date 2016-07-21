# 对标接口文档_v1.0.0
    接口文档标准  
    
# 接口规范

## 获取专项信息
    这里是说明balabala
> 
#### HttpMethod: `POST`
#### Url: "/jsjd/benchmark/getSpecialWorkByOrgId.do?orgId=c21834b4-1cb0-490f-a2a8-deeaf7f7e065"
#### Request: 
param       |type       |nullable   |description
------------|-----------|-----------|-----------
accout      |str        |false      |账户名或登录邮箱
password    |str(6,16)  |false      |用户的密码
#### Response:
param|description
----|---------------
result|是否成功
desc|有用的描述信息
id|用户id

    一些补充 
