import * as types from '../constants/types'

export const userGetters = {
    [types.COLLECT_TOPICS_COUNT] (state) {
        let arr = state.userinfo.collect_topics;
        //console.log(arr)
        if (arr) {
            return arr.length
        } else {
            return 0
        }
    },
    [types.POST_TOPICS_COUNT] (state) {
        let arr = state.userinfo.post_topics;
        if (arr) {
            return arr.length
        } else {
            return 0
        }       
    },
    [types.MY_TOPICS_COUNT] (state) {
        let arr = state.userinfo.post_topics;
        if (arr) {
            return arr.length
        } else {
            return 0
        }
    }
}