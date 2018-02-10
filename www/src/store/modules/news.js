import { newsMutations } from '../mutations/news'
import { newsActions } from '../actions/news'

const news = {
    state: {
        isFetching: false,
        noMoreData: false,
        errData: false,
        error: '',
        data: []
    },
    mutations: newsMutations,
    actions: newsActions
}

export default news