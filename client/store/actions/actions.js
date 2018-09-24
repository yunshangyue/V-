import axios from 'axios'

const API = 'https://cnodejs.org/api/v1/'

export default {
    updateCountAsync(store, data) {
        setTimeout(() => {
            store.commit('updateCount', data.num)
        }, data.time)
    },
    isLogin(store, accesstoken) {
        axios.post(`${API}/accesstoken`, { accesstoken }).then(
            res => {
                if (res.data.success && res.status === 200) {
                    store.commit('setUserInfo', res.data)
                }
            }
        ).catch(e => {
            console.log(e)
        })
    }
}