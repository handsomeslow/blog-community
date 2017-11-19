import { infoMutations } from '../mutations/info'
import { infoActions } from '../actions/info'

const info = {
    state: {
        // ----- 详情页
        isInfoFetching: false,
        isInfoPageShow: false,
        id: '',
        userid: '',
        error: '',
        infoData: {
            good: null,
            _id: '',
            owner: {
                avatar_url: '',
                username: '',
                _id: ''
            },
            content: '',
            createAt: '',
            updatedAt: '',
            comment: [],
            comment_count: 0,
            tab: '',
            title: '',
            top: null,
            view_count: 0,
            is_collected: false
        },
        // ----- 评论页
        isRepliesFetching: false,
        isRepliesPageShow: false,
        commentBarShow: false,
        repliesData: {
            owner: {
                avatar_url: '',
                username: ''
            },
            content: "",
            createAt: "",
            _id: "",
            ups: []
        },
    },
    mutations: infoMutations,
    actions: infoActions
}

export default info