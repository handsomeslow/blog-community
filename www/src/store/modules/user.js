import { userActions } from '../actions/user'
import { userMutations } from '../mutations/user'
import { userGetters } from '../getters/user'

const user = {
    state: {
        // ----- fetching
        isFetching: false,
        success: false,
        userinfo: {
            _id:'',
            avatar_url: '',
            collect_topics: [],
            post_topics: [],
            createdAt: '',
            updatedAt:'',
            username: '',
            status: false,
            recent_replies: [],
            recent_topics: [],
            score: 0
        }
    },
    mutations: userMutations,
    getters: userGetters,
    actions: userActions
}

export default user