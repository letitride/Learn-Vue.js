/* eslint-disable no-unused-vars */
import * as types from './mutation-types'
import {Auth, List, Task} from '../api'
/* eslint-enable no-unused-vars */

export default{
  login: ({commit}, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        console.log(commit.called)
        commit(types.AUTH_LOGIN, { token, userId })
        console.log(commit.called)
      })
      .catch(err => { throw err })
  },

  fetchList: ({commit}) => {
    throw new Error('fetchList action should be implemented')
  },

  addTask: ({commit}) => {
    throw new Error('addTask action should be implemented')
  },

  updateTask: ({commit}) => {
    throw new Error('updateTask action should be implemented')
  },

  removeTask: ({commit}) => {
    throw new Error('removeTask action should be implemented')
  },

  logout: ({commit}) => {
    throw new Error('logout action should be implemented')
  }
}
