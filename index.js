var computeRootSize = require('./computeRootSize')

var FastClick = require('fastclick');
FastClick.attach(document.body);

import { ToastPlugin, DevicePlugin,AlertPlugin,ConfirmPlugin,LoadingPlugin,WechatPlugin } from 'vux'
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)

$entry.store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

$entry.router.beforeEach(function (to, from, next) {
  $entry.store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      $entry.store.commit('updateDirection', {direction: 'forward'})
    } else {
      $entry.store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    $entry.store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

$entry.router.afterEach(function (to) {
  $entry.store.commit('updateLoadingStatus', {isLoading: false})
  /*ga && ga('set', 'page', to.fullPath)
   ga && ga('send', 'pageview')*/
})

var plugin = {
  exec: function (options) {
    computeRootSize(window, {
      designWidth: options.designWidth || 640,
      designHeight: options.designHeight || 1136,
      designFontSize: options.designFontSize || 20
    })
  }
}

module.exports = plugin;
