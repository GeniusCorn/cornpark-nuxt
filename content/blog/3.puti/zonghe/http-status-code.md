# HTTP 状态码

1. 201 Created。该请求已成功，并因此创建了一个新的资源。
2. 204 No Centent。对于该请求没有的内容可发送，但头部字段可能有用。
3. 206 Partical Content。当从客户端发送 `Range` 范围标头以只请求资源的一部分时，将使用此响应代码。
4. 304 Not Modified。告诉客户端响应还没有被修改，因此客户端可以继续使用相同缓存版本的响应。
5. 401 Unauthorized。客户端必须对自身进行身份验证才能获得请求的响应。
6. 405 Method Not Allowed。服务器知道请求方法，但目标资源不支持该方法。
7. 429 Too Many Requests。用户在给定的时间内发送了太多请求。