export default {
  fullName(state) {
      return `${state.firstName} ${state.lastName}`
  },
  API(state) {
    return state.API
  },
  user(state) {
    return state.user
  },
  isLogin(state) {
    return state.isLogin
  }
}
