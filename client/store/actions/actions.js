
export default {
    Login(store, userInfo) {
        store.commit('setUserInfo', userInfo)
    }
}