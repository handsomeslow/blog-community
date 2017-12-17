import * as types from '../constants/types'
import axios from 'axios'

export const newsActions = {
    /**
     * 请求主题列表数据
     * @type  {get}
     */
    fetchNewsAction({ commit, state }, params) {
        let isRefresh = params.isRefresh || false;

        // if (!isRefresh) {
        //     commit(types.FETCH_NEWS_SUC);
        // } else {
        //     commit(types.SHOW_REFRESH);
        // };

        axios({
            method: 'get',
            url: 'news',
            params: {
                page: params.page,
                limit: params.limit
            }
        }).then((res) => {
            let data = res.data.data,
                origin = state.data,
                arr = [];
            
            // 累加数组
            arr = origin.concat(data.docs);
            commit(types.HIDE_REFRESH);

            if (data.docs.length > 0) {
                commit(types.FETCH_NEWS_SUC, {
                    data: arr
                })
            } else {
                commit(types.TOGGLE_NO_MORE_DATA_STATE);
                commit(types.TOGGLE_ISFETCHING_STATE);
            }
        }).catch((error) => {
            commit(types.TOGGLE_ERROR_DATA_STATE);
            commit(types.FETCH_NEWS_ERR, {
                error
            });
            console.log(error)
        })
    },    
    /**
    * 请求详情数据
    * @param {topicid} [String] topic id
    */
   fetchNewsDetail({ commit, state }, params) {
       commit(types.FETCH_INFO_REQ);
       axios({
           method: 'get',
           url: 'news/' + params.topicid
       }).then((res) => {
           let data = res.data.data;

           commit(types.FETCH_INFO_SUC, {
               data
           })
       }).catch((error) => {
           commit(types.FETCH_TOPICS_ERR, {
               error
           });
           console.log(error)
       })
   },
}