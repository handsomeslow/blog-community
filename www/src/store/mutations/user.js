import * as types from '../constants/types'

export const userMutations = {
    [types.FETCH_USER_REQ](state) {
        state.isFetching = true
    },
    [types.FETCH_USER_SUC](state, action) {
        state.isFetching = false;
        state.data = action.data
    },
    [types.FETCH_USER_ERR](state, action) {
        state.isFetching = false;
        state.success = false;
        state.error = action.error;
    },
    [types.COMMIT_USERINFO](state, action) {
        state.isFetching = false;
        state.userinfo = action.data;
        state.success = true;
    },
    [types.LOGOUT](state) {
        state.success = false;
        state.isFetching = false;
    },
    [types.COMMIT_USER_TOPIC](state, action) {
        state.userinfo.collect_topics = action.data;
    }
}