import superagent from 'superagent';

export function get(url, data) {
    return request('GET', url, data);
}

export function post(url, data) {
    return request('POST', url, data);
}

export function put(url, data) {
    return request('PUT', url, data);
}

export function del(url, data) {
    return request('DELETE', url, data);
}

export function request(method, url, data) {
    return new Promise((resolve, reject) => {
        let agent = superagent(method, url)
            .withCredentials()
            .query({ _: new Date().getTime() });

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
                    resolve(res.body);
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
