# 考核条目明细

## 一.基本信息

#### HttpMethod: `GET`
#### Url: "/jsjd/portal/xxxxx.do?code={{code}}"
#### Request:

  字段   |  描述  |
--------|--------|
code    |  kks 编码

###Response:

  字段   | 描述  |
--------|-------|
code|kks编码
cDesc|kks编码
cRule|考核规则

### 返回示例

	{
	  "code":"code",
	  "cDesc":"描述",
	  "cRule":"考核规则"
	}


## 二.统计信息

#### HttpMethod: `GET`
#### Url: "/jsjd/portal/xxxxx.do?code={{code}}&st={{startTime}}&et={{endTime}}"
#### Request:

  字段   |  描述  |
--------|--------|
code    |  kks 编码
st|开始时间
et|开始时间

###Response:

  字段   | 描述  |
--------|-------|
count|累计考核次数
money|累计金额
maxVal|触发最大值
minVal|触发最小值
deltaTime|累计时长

### 返回示例

	{
	  "count":"count",
	  "money":"money",
	  "maxVal":"maxVal",
    "minVal":"minVal",
    "deltaTime":"deltaTime"
	}

