import * as types from '@/store/mutation-types'

const mockLoginAction = login => {
  const actionsInjector = require('inject-loader!@/store/actions')

  const actionsMocks = actionsInjector({
    '../api': {
      Auth: { login }
    }
  })

  return actionsMocks.default.login
}

describe('loginアクション', () => {
  const address = 'foo@domain.com'
  const password = '12345678'
  let commit
  let future

  describe('Auth.loginが成功', () => {
    const token = '1234567890abcdef'
    const userId = 1

    beforeEach(done => {
      // 成功を返すログインメソッドのstub
      const login = authInfo => Promise.resolve({ token, userId })
      // Auth apiをmockに差し替えたログインメソッド
      const action = mockLoginAction(login)
      // 成功時に渡すcallbackのキャプチャ
      commit = sinon.spy()

      // @/store/actions.js loginメソッドの実行 (Auth apiはインジェクション済み)
      future = action({ commit }, { address, password })
      future.then(() => { done() })
    })

    it('成功となること', () => {
      expect(commit.called).to.equal(true)
      expect(commit.args[0][0]).to.equal(types.AUTH_LOGIN)
      expect(commit.args[0][1].token).to.equal(token)
      expect(commit.args[0][1].userId).to.equal(userId)
    })
  })

  describe('Auth.loginが失敗', () => {
    beforeEach(done => {
      const login = authInfo => Promise.reject(new Error('login failed'))
      const action = mockLoginAction(login)
      commit = sinon.spy()

      future = action({ commit })
      future.catch(() => done())
    })

    it('失敗となること', done => {
      expect(commit.called).to.equal(false)
      future.catch(err => {
        expect(err.message).to.equal('login failed')
        done()
      })
    })
  })
})
