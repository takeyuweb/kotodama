import superagent from 'superagent';

export function get(url, data, options) {
    return request('GET', url, data, options);
}

export function post(url, data, options) {
    return request('POST', url, data, options);
}

export function put(url, data, options) {
    return request('PUT', url, data, options);
}

export function del(url, data, options) {
    return request('DELETE', url, data, options);
}

export function request(method, url, data, options = {}) {
    return new Promise((resolve, reject) => {
        let agent = superagent(method, url)
            .withCredentials()
            .query({ _: new Date().getTime() });

        if (options.binary) {
            agent.responseType('arraybuffer');
        }

        agent.set("X-CSRF-Token", getCsrfToken());
        if (method == 'GET') {
            agent.query(data);
        } else {
            agent.send(data);
        }

        agent.end((err, res) => {
            if (res) {
                let statusCode = res.status || 0;
                if (err || 0 == statusCode || 400 <= statusCode) {
                    reject(err);
                } else {
                    if (options.binary) {
                        resolve(res.xhr.response);
                    } else {
                        resolve(res.body);
                    }
                }
            } else {
                // ネットワークエラーなど
                reject(err);
            }
        });
    })
}

function getCsrfToken() {
    for (const elem of document.getElementsByTagName('meta')) {
        if (elem.name === 'csrf-token') {
            return elem.content;
        }
    }
}

export default {
    request,
    get,
    post,
    put,
    del
}
