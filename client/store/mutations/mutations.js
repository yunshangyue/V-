export default {
    updateCount(state, num) {
        state.count = num
    },
    setUserInfo(state, userInfo) {
        let { loginname, avatar_url, id } = userInfo
        state.user.loginname = loginname
        state.user.avatar_url = avatar_url
        state.user.id = id
        // let { name, avatarUrl, id, } = userInfo
        // state.user.name = name
        // state.user.avatarUrl = avatarUrl
        // state.user.id = id
        console.log(userInfo)
    }
}