'use strict';

const httpCallSymbol = Symbol.for('context#httpCall');

module.exports = {
    async curlGet(url, data, headers) {
        if (!url) {
            return null;
        }
        data = data || {};
        headers = headers || {};
        let headerContentType = headers['Content-Type'] || headers['content-type'];
        if (!headerContentType) {
            headerContentType = this.app.config.curl.defContentType;
            headers['Content-Type'] = headerContentType;
        }
        let dataType = this.app.config.curl.defDataType;
        if (headerContentType.toLowerCase().startsWith('application/json')) {
            dataType = 'json';
        }
        return await this[httpCallSymbol](url, "GET", data, true, headers, '', dataType);
    },
    async curlPost(url, data, headers) {
        if (!url) {
            return null;
        }
        data = data || {};
        headers = headers || {};
        let headerContentType = headers['Content-Type'] || headers['content-type'];
        if (!headerContentType) {
            headerContentType = this.app.config.curl.defContentType;
            headers['Content-Type'] = headerContentType;
        }
        let dataType = this.app.config.curl.defDataType;
        let contentType = '';
        if (headerContentType.startsWith('application/json')) {
            dataType = 'json';
            contentType = 'json';
        }
        return await this[httpCallSymbol](url, "POST", data, false, headers, contentType, dataType);
    },
    async curlPut(url, data, headers) {
        if (!url) {
            return null;
        }
        data = data || {};
        headers = headers || {};
        let headerContentType = headers['Content-Type'] || headers['content-type'];
        if (!headerContentType) {
            headerContentType = this.app.config.curl.defContentType;
            headers['Content-Type'] = headerContentType;
        }
        let dataType = this.app.config.curl.defDataType;
        let contentType = '';
        if (headerContentType.startsWith('application/json')) {
            dataType = 'json';
            contentType = 'json';
        }
        return await this[httpCallSymbol](url, "PUT", data, false, headers, contentType, dataType);
    },
    async [httpCallSymbol](url, method, data, dataAsQueryString, headers, contentType, dataType) {
        this.logger.debug(`[context httpCall] url: ${url}, method: ${method}, data: ${data}, dataAsQueryString: ${dataAsQueryString}, headers: ${JSON.stringify(headers)}, dataType: ${dataType}, contentType: ${contentType}`);
        const result = await this.curl(url, {
            beforeRequest: options => {
                for (const header in headers) {
                    options.headers[header] = headers[header];
                }
            },
            contentType: contentType,
            method: method,
            data: data,
            dataType: dataType,
            dataAsQueryString: dataAsQueryString,
            timeout: [10000, 10000] //连接和返回的超时时间
        });
        this.logger.debug(`[context httpCall] response: ${JSON.stringify(result)}`);
        if (result.status !== 200) {
            this.logger.error(`[context httpCall] error: ${JSON.stringify(result)}`);
            return null;
        }
        return result.data;
    }
};