import ajax from '../ajax/simple_ajax.js'

const createDom = function (url) {
  let script = document.createElement('script')
  script.setAttribute('src', url)
  let body = document.querySelector('body')
  body.appendChild(script)
}

const getScripts = function (url) {
  ajax().get('http://localhost:2222/').then(res => {
    JSON.parse(res).urls.forEach(str => {
      createDom(str)
    })
  })
}

getScripts()
