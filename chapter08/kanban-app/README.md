# application-setting

```
$ npm install -g @vue/cli-init@3.0.1
$ vue init webpack kanban-app
$ cd kanban-app
$ npm install --save-dev eslint-plugin-vue@4.7.1
```
.eslintrc.js
```
- 'plugin:vue/essential',
+ 'plugin:vue/recommended',

- 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
+ 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
+ 'import/no-webpack-loader-syntax': process.env.NODE_ENV === 'production' ? 'error' : 'off'
```
```
$ npm install --save-dev body-parser
$ touch ./build/dev-server.js
```
dev-server.js
```
const bodyParser = require('body-parser')
module.exports = app => {
  app.use(bodyParser.json())
}
```
build/webpack.dev.conf.js
```
const portfinder = require('portfinder') 
+ const backend = require('./dev-server')

+ before: backend,
proxy: config.dev.proxyTable,
```
```
$ npm install --save vuex es6-promise
$ mkdir -p src/store
$ touch src/store/index.js
$ touch src/store/mutation-types.js 
$ touch src/store/mutations.js
$ touch src/store/getters.js
$ touch src/store/actions.js
```
src/store/index.js
```
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
```
src/main.js
```
import Vue from 'vue'
+import 'es6-promise/auto'
import App from './App'
import router from './router'
+import store from './store'

new Vue({
  el: '#app',
  router,
+ store, 
```
test/unit/karma.conf.js
```
- files: ['./index.js' ],
+ files: [
+   '../../node_modules/es6-promise/dist/es6-promise.auto.js',
+   './index.js'
+ ],
```
```
$ npm install --save axios
$ mkdir -p src/api
$ touch src/api/index.js
$ npm install --save-dev @vue/test-utils@1.0.0-beta.24
```
test/unit/specs/HelloWorld.spec.js
```
- import Vue from 'vue'
+ import { mount } from '@vue/test-utils'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
-    const Constructor = Vue.extend(HelloWorld)
-    const vm = new Constructor().$mount()
-    expect(vm.$el.querySelector('.hello h1').textContent)
-      .to.equal('Welcome to Your Vue.js App')
+    expect(mount(HelloWorld).find('.hello h1').text())
+      .to.equal('Welcome to Your Vue.js App')
  })
})
```
```
$ mkdir -p test/e2e/custom-commands
```
test/e2e/nightwatch.config.js 
```
  custom_assertions_path: ['test/e2e/custom-assertions'],
+  custom_commands_path: ['test/e2e/custom-commands'],
```
```
$ touch test/e2e/custom-commands/trigger.js
$ touch test/e2e/custom-commands/enterValue.js
```
test/e2e/custom-commands/trigger.js
```
exports.command = function(selector, event, keyCode){
  return this.execute(function(selector, event, keyCode){
    var e = document.createEvent('HTMLEvents')
    e.initEvent(event, true, true)
    if(keyCode){
      e.keyCode = keyCode
    }
    document.querySelector(selector).dispatchEvent(e)
  }, [selector, event, keyCode])
}
```
test/e2e/custom-commands/enterValue.js
```
exports.command = function(selector, value){
  return this.clearValue(selector)
    .setValue(selector, value)
    .trigger(selector, 'keyup', 13)
}
```

# kanban-app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
