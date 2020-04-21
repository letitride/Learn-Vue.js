import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  const triggerLogin = (loginView, target) => {
    // 子コンポーネントを返す
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('foo@domain.com', '12345678')
  }

  beforeEach(() => {
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }

    $router = {
      push: sinon.spy()
    }

    actions = {
      login: sinon.stub()
    }

    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('ログイン', () => {
    let loginView
    describe('成功', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('ボードページにリダイレクトすること', done => {
        // storeのloginメソッドを成功させる ($store.dispatch('login', authInfo))
        actions.login.resolves()
        triggerLogin(loginView, LoginFormComponentStub)

        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('失敗', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
        // throwReject をwatchする
        sinon.spy(loginView.vm, 'throwReject')
      })

      afterEach(() => {
        loginView.vm.throwReject.restore()
      })

      it('エラー処理が呼び出されること', done => {
        const message = 'login failed'
        actions.login.rejects(new Error(message))
        triggerLogin(loginView, LoginFormComponentStub)

        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)
          done()
        })
      })
    })
  })
})
