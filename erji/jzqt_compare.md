# 机组启停运行状态对比_v1.0.0

    重新用 markdown 重构 
    
# 接口规范

## 状态对比
    
> 
#### HttpMethod: `get`
#### Url: '/portal/getJzqtInfo.do'
#### Response: 
param     |description
----------|---------------
org_id     | 电厂
jizu       | 机组 	
qidongyongshi|启动用时
type|启动类型 	
zongyongshi|总用时 	
dhzcc|点火至冲车 	
cczbw|点火至并网 	
bwz50fh|并网至50%负荷
qdhy|启动耗油
qdhm|启动耗煤
qdhs|启动耗水
qdhd|启动耗电 	
qdpjfl|启动平均风量	
zqwd|主汽温度 	
zqwdbz|主汽温度标准	
zqyl|主汽压力 	
zqylbz|主汽压力标准	
zrqw|再热气温 	
zrqwbz|再热气温标准	
zrqy|再热汽压 	
zrqybz|再热汽压标准	
zfl|总风量 	
zflbz|总风量标准	
gsll|给水流量 	
gsllbz|给水流量标准	
zqll|主汽流量 	
zqllbz|主汽流量标准 

#### 注意事项

    dType来区分不同的数据
    dh：岱海里的数据
    nd：宁东电厂下面数据
    ndhz：宁东电厂汇总
    dhhz：岱海电厂汇总