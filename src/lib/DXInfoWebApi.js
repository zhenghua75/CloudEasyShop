import _ from 'underscore';

export default class DXInfoWebApi {
  constructor(token,url) {
    this._token = _.isNull(token) ? null : token;

    this.API_BASE_URL = _.isNull(url) ? 'http://www.kmdx.cn:8102' : url;
  }

  async login(data) {
    return await this._fetch({
      method: 'POST',
      url: '/Token',
      body: data
    });
  }

  async logout() {
    return await this._fetch({
      method: 'POST',
      url: '/api/App/Logout'
    });
  }

  async resetPassword(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/App/ChangePassword',
      body: data
    });
  }

  async getProfile() {
    return await this._fetch({
      method: 'GET',
      url: '/api/Account/UserInfo'
    })
  }

  async getUserFuncs() {
    return await this._fetch({
      method: 'GET',
      url: '/api/App/GetUserFuncs'
    })
  }

  async getWhList() {
    return await this._fetch({
      method: 'GET',
      url: '/api/App/GetWarehouseList'
    })
  }

  async updateProfile(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/App/UpdateFullName?fullname=' + data
    })
  }

  async getVouch(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/App/GetVouch',
      body: data
    })
  }
  async getCallVouch(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/Editor/Data?model=CallVouch',
      body: data
    })
  }
  async getVouchLink(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/Editor/Data?model=VouchLink',
      body: data
    })
  }
  async GetPendingVouch() {
    return await this._fetch({
      method: 'POST',
      url: '/api/App/GetPendingVouch'
    })
  }
  async vouch(vouchType, data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/Editor/Data?model=Vouch&VouchType=' + vouchType,
      body: data
    })
  }
  async vouchs(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/Editor/Data?model=Vouchs',
      body: data
    })
  }
  async currentStock(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/Editor/Data?model=CurrentStock',
      body: data
    })
  }
  async stockMgCurrentStock(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/Editor/Data?model=StockManageCurrentStock',
      body: data
    })
  }
  async getMessage(path, id, page) {
    return await this._fetch({
      method: 'POST',
      url: '/api/App/' + path + '?id=' + id + '&page=' + page
    })
  }
  async linkman() {
    return await this._fetch({
      method: 'POST',
      url: '/api/App/linkman'
    });
  }
  async readMessage(id) {
    return await this._fetch({
      method: 'POST',
      url: '/api/App/ReadMessage?id=' + id
    });
  }
  async reportSalesChart(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/Editor/Data?model=ReportSalesChart',
      body: data
    });
  }
  async reportCardTop(data) {
    return await this._fetch({
      method: 'POST',
      url: '/api/Editor/Data?model=ReportCardTopQuery',
      body: data
    });
  }
  param(obj) {
    let query = '';
    let name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.param(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  }

  isJson(headers) {
    if (headers && headers.map && headers.map['content-type']) {
      let arr = headers.map['content-type'];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].toLowerCase().indexOf('application/json') >= 0) {
          return true;
        }
      }
    }
    return false;
  }
  timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"));
      }, ms);
      promise.then(resolve, reject);
    });
  }
  _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts);

    var reqOpts = {
      method: opts.method,
      headers: {}
    };
    if (this._token) {
      reqOpts.headers['Authorization'] = `Bearer ${this._token}`
    }
    reqOpts.headers['Accept'] = 'application/json';
    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
    let url = this.API_BASE_URL + opts.url;
    if (opts.body) {
      reqOpts.body = this.param(opts.body);
    }
    return this.timeout(5000,fetch(url, reqOpts)
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          if (this.isJson(response.headers)) {
            return response.json();
          } else {
            return response.text().then((text) => {
              return {
                text: text
              }
            });
          }
        } else {
          if (this.isJson(response.headers)) {
            return response.json().then((json) => {
              throw json;
            });
          } else {
            return response.text().then((text) => {
              throw text;
            });
          }
        }
      }));
  }
};