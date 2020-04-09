# BlueDream

## chrome-ext

### Windows下启动Redis
- 进入redis安装目录，执行
```
redis-server.exe redis.conf
```
- 访问redis
```
redis-cli.exe -h 127.0.0.1 -p 6379
```
- 关闭redis
```
redis-cli.exe shutdown
```
- 查看redis状态
```
redis-cli.exe ping
```

### 批处理界面后台运用
```bat
@echo off 
if "%1" == "h" goto begin 
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close)&&exit 
:begin 
```

