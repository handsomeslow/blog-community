import * as types from '../constants/types'
import { setCookie, getCookie, delCookie } from '../../assets/js/cookies'
import axios from 'axios'

export const userActions = {
    /**
     * 用户登录请求
     * @type  {post}
     * @param {accesstoken} [String] 用户登录token
     */
    loginAction({ commit, state, dispatch }, params) {
        commit(types.FETCH_USER_REQ);
        axios({
            method: 'post',
            url: 'session',
            withCredentials: true,
            data: {
                username: params.username,
                password: params.password
            }
        }).then((res) => {
            // 显示登录成功提示     
            dispatch('showSnackbarAction', {
                msg: '登录成功',
                isWarn: false
            });

            // commit(types.COMMIT_USERINFO, {
            //     data: res.data.data
            // });
            // 提交获取的数据
            // commit(types.FETCH_USER_SUC, {
            //     data: res.data
            // });

            // 请求用户详情数据
            dispatch('fetchUserInfoAction', {
                id: res.data.data._id
            });

            // 获取未读信息
            // dispatch('fetchMessageAction', {
            //     accesstoken: params.accesstoken
            // })
        }).catch((error) => {
            dispatch('showSnackbarAction', {
                msg: '登录失败，请检查网络或账号密码是否正确',
                isWarn: true
            });
            commit(types.FETCH_USER_ERR, {
                error
            });
            console.log(error)
        })
    },

    /**
    * 获取session
    * @type  {get}
    */
    fetchUserSessionAction({ commit, state, dispatch}) {
        axios({
            method: 'get',
            url: 'session'
        }).then((res) => {
            if (res.data.code == -1) {
                commit(types.FETCH_USER_ERR, {
                    data: res.data.data
                })
            } else {
                // 请求用户详情数据
                dispatch('fetchUserInfoAction', {
                    id: res.data.data._id
                });
            }

        })
    },
    /**
     * 请求用户详情数据
     * @type  {get}
     * @param {loginname} [String] 用户名 
     */
    fetchUserInfoAction({ commit, state }, params) {
        axios({
            method: 'get',
            url: 'user/' + params.id
        }).then((res) => {
            if (res.data.code == 1) {
                commit(types.COMMIT_USERINFO, {
                    data: res.data.data
                })
                //this.fetchUserTopic();
            }
        })
    },
    /**
     * 用户注册
     */
    register({ commit, state, dispatch }, params) {
        axios.post('user', {
            username: params.username,
            password: params.password
        }).then((res) => {
            if(res.data.code == 1) {
                dispatch('showSnackbarAction', {
                    msg: '注册成功',
                    isWarn: false
                });
    
                // 提交获取的数据
                commit(types.FETCH_USER_SUC, {
                    data: res.data
                });
    
                commit(types.COMMIT_USERINFO, {
                    data: res.data.data
                });
    
                dispatch('loginAction', {
                    username: params.username,
                    password: params.password
                });
            } else {
                dispatch('showSnackbarAction', {
                    msg: '注册失败',
                    isWarn: true
                });
            }
            
        })
    },
    loginout({ commit, state, dispatch }) {
        axios({
            method: 'delete',
            url: 'session'
        }).then((res) => {

        })
    },
    //获取用户发表的帖子
    fetchUserTopic({ commit, state, dispatch }) {
        axios({
            method: 'get',
            url: 'usertopic'
        }).then((res) => {
            commit(types.COMMIT_USER_TOPIC, {
                data: res.data.data.docs
            })
        })
    }
}