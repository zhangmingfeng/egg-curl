# egg-curl
该插件是对egg自带的httpClient的封装，使用更简洁的api进行http请求，目前提供get, post, put 方法，后续有需要在增加其他方法

# Install

```bash
$ npm i --save egg-curl
```

## Usage & configuration

- `config.default.js`

```js
exports.curl = {
    defContentType: 'application/json; charset=UTF-8', //默认的Content-Type
    defDataType: 'text', // 默认的dataType
    timeout: [10000, 10000] //连接和返回的超时时间
};
```

- `config/plugin.js`

``` js
exports.curl = {
  enable: true,
  package: 'egg-curl'
}
```

### example

```js
// controller.js or service.js post请求
const result = await this.ctx.curlPost(`http://api.com/v1/api/user/login`, {
    account: 'test',
    password: '123456'
});

```

```js
// controller.js or service.js get请求
const result = await this.ctx.curlGet(`http://api.com/v1/api/user/1`);

```

### api
- curlGet(url, data, header);
- curlPost(url, data, header);
- curlPut(url, data, header);