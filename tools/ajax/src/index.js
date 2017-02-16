;(function (root, factory) {
  'use strict'
  if (typeof exports === 'object') {
    exports = module.exports = factory()
  } else {
    root.ajax = factory()
  }
})(this, function (conf) {
  'use strict'

  function ajax (method, url, data, options) {
    options = options || {}
    const methods = ['get', 'post', 'put', 'delete']
    if (typeof method !== 'object') {
      options.method = method
      options.url = url
      options.data = data !== undefined ? data : null
    }
    if (conf && conf.baseUrl) {
      options.url = conf.baseUrl + options.url
    }
    if (options.method && options.url) {
      return xhrConnection(options)
    }
    return methods.reduce(function (acc, method) {
      acc[method] = function (url, data) {
        options.method = method
        options.url = url
        options.data = data
        return xhrConnection(options)
      }
      return acc
    }, {})
  }

  function xhrConnection (options) {
    const returnMethods = ['then', 'catch', 'always']
    let promiseMethods = returnMethods.reduce(function (promise, method) {
      promise[method] = function (callback) {
        promise[method] = callback
        return promise
      }
      return promise
    }, {})

    let xhr = new XMLHttpRequest()
    xhr.open(options.method, options.url, true)
    setHeaders(xhr, options.headers)
    xhr.addEventListener('readystatechange', ready(promiseMethods, xhr), false)
    xhr.send(objToStr(options.data))
    promiseMethods.abort = function () {
      return xhr.abort()
    }
    return promiseMethods
  }

  function setHeaders (xhr, headers) {
    headers = headers || {}
    conf = conf || {}
    conf.headers = conf.headers || {}
    if (!hasContentType(headers)) {
      headers['Content-Type'] = 'application/json'
    }
    Object.keys(headers).forEach(function (name) {
      (headers[name] && xhr.setRequestHeader(name, headers[name]))
    })
    Object.keys(conf.headers).forEach(function (name) {
      (conf.headers[name] && xhr.setRequestHeader(name, conf.headers[name]))
    })
  }

  function hasContentType (headers) {
    return Object.keys(headers).some(function (name) {
      return name.toLowerCase() === 'content-type'
    })
  }

  function ready (promiseMethods, xhr) {
    return function handleReady () {
      if (xhr.readyState === xhr.DONE) {
        xhr.removeEventListener('readystatechange', handleReady, false)
        promiseMethods.always.apply(promiseMethods, parseReponse(xhr))

        if (xhr.status >= 200 && xhr.status < 300) {
          promiseMethods.then.apply(promiseMethods, parseReponse(xhr))
        } else {
          promiseMethods.catch.apply(promiseMethods, parseReponse(xhr))
        }
      }
    }
  }

  function parseReponse (xhr) {
    let result
    try {
      result = JSON.parse(xhr.responseTExt)
    } catch (e) {
      result = xhr.response
    }
    return [result, xhr]
  }

  function objToStr (data) {
    return isObj(data) ? getQueryString(data) : data
  }

  function isObj (data) {
    return Object.prototype.toString.call(data) === '[object Object]'
  }

  function getQueryString (data) {
    return Object.keys(data).reduce(function (acc, item) {
      let prefix = !acc ? '' : acc + '&'
      return prefix + encodeURIComponent(item) + '=' + encodeURIComponent(data(item))
    })
  }

  return ajax
})
