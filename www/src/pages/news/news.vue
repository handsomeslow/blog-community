<template>
  <div class="news">
    <!--Info Page-->
    <transition enter-active-class="animated slideInUp"
                leave-active-class="animated slideOutDown">
      <newsPage v-show="info.isInfoPageShow"></newsPage>
    </transition>
    <!--info page-->
  
    <!--Refresh Control-->
    <mu-refresh-control :refreshing="common.refresh.isShow"
                        :trigger="trigger"
                        @refresh="refresh" />
    <!--refresh control-->

    <!--Content-->
    <div class="content-wrapper">
      <news-item v-for="list in news.data"
                    :list="list"
                    @info="tapToInfo"></news-item>
    </div>
    <!--content-->
  
    <!--Infinite Scroll-->
    <mu-infinite-scroll loadingText="正在加载..."
                        :scroller="scroller"
                        :loading="news.isFetching"
                        @load="loadMore" />
    <!--infinite scroll-->
  
    <!--No More Data-->
    <noMoreData v-if="this.news.noMoreData"></noMoreData>
    <!--no more data-->
  
    <!--Error Data-->
    <noMoreData v-if="this.news.errData"
                title="网络出错了，稍后再试"></noMoreData>
    <!--error data-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import newsPage from '../../components/newsPage/newsPage'
import newsItem from '../../components/newsItem/newsItem'
import noMoreData from '../../components/noMoreData/noMoreData'
export default {
  data () {
    return {
      // ----- infinit scroll
      scroller: null,
      page: 1,
      // ----- refresh control
      trigger: null
    }
  },
  mounted () {
    this.scroller = this.$el;
    this.trigger = this.$el;
  },
  created () {
    // 初始化第一组数据；
    // 加入条件判断，只有 data 数组为空时发送请求；
    // 否则跳转到其他页面，再回来时会重复请求
    if (this.news.data.length === 0) {
      this.http(1, 15);
      this.page = 1;
    }
  },
  computed: {
    ...mapState([
      'news',
      'info',
      'common'
    ]),
  },
  components: {
    newsItem,
    noMoreData,
    newsPage
  },
  methods: {
    ...mapMutations([
      'CLEAR_STATE_DATA',
      'TOGGLE_NO_MORE_DATA_STATE',
      'TOGGLE_ERROR_DATA_STATE',
      'SHOW_MAIN_OVERFLOW',
      'TOGGLE_INFO_PAGE_DISPLAY',
      'SUC_COLLECT',
      'DEL_COLLECTED'
    ]),
    // 公共请求方法
    // ==========
    http (page, limit, isRefresh) {
      this.$store.dispatch('fetchNewsAction', {
        page, limit, isRefresh
      })
    },
    // 上拉加载更多
    // ==========
    loadMore () {
      if (!this.news.isFetching && !this.news.noMoreData) {
        this.page += 1;
        this.http(this.page, 20);
      }
    },
    // 下拉刷新
    // =======
    refresh () {
      this.CLEAR_STATE_DATA();
      this.http(1, 20, true);
      this.page = 1;
    },
    // 跳转详情页
    // ========
    tapToInfo (topicid, userid) {
      this.SHOW_MAIN_OVERFLOW();
      this.TOGGLE_INFO_PAGE_DISPLAY();
      this.$store.commit('COMMIT_ID', {
        id: topicid, userid
      });

      // 请求数据放在了父级元素；
      // 因为不是 router 模式，子元素在没有获得 id 的情况下，就执行了 created
      this.$store.dispatch('fetchNewsDetail', {
        topicid
      });
    },
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';

.news {
  position: relative;
  background: $ExtraLightGray;
  .mu-circle {
    border-top-color: $primary !important;
    border-right-color: $primary !important;
    border-left-color: $primary !important;
  }
  .tabs-wrapper {
    width: 100%;
    height: 48px;
    .mu-tabs {
      position: fixed;
      top: 56px;
      background: #fff !important;
      .mu-tab-link {
        color: rgba(31, 45, 61, .7);
      }
      .mu-tab-active {
        font-size: .3rem;
        color: rgba(31, 45, 61, 1);
      }
    }
    .active-line {
      background: $primary !important;
    }
  }
  .mu-infinite-scroll {
    padding: .24rem 0;
    .mu-infinite-scroll-text {
      font-size: .28rem;
    }
  }
}
</style>
