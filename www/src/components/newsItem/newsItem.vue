<template>
    <div class="news-item">
        <!--Complete Template-->
        <div class="complete">
            <!--Top Box-->
            <div class="top-box">
                <!--info-->
                <div class="info" :data-id="list._id" @click="tapToInfo($event)">
                    <p class="title">{{list.title}}</p>

                </div>
            </div>
            <!--top box-->

            <!--Bottom Box-->
            <div class="bottom-box">
                <!--left-->
                <div class="left">
                    <!--tab-->
                    <div class="tab">{{list.tab}}</div>
                    <!--time-->
                    <div class="time">
                        {{list.createdAt | filterTime}}
                    </div>
                </div>

                <!--right-->
                <div class="right">
                    <!--visit-->
                    <div class="item">
                        <mu-icon value="visibility" :size="14" color="#D3DCE6"></mu-icon>
                        <div class="text">{{list.view_count}}</div>
                    </div>
                    <!--reply-->
                    <div class="item">
                        <mu-icon value="textsms" :size="14" color="#D3DCE6"></mu-icon>
                        <div class="text">{{list.comment_count}}</div>
                    </div>
                </div>
            </div>
            <!--bottom box-->
        </div>
        <!--complete template-->
    </div>
</template>

<script>
import { filterTime } from '../../assets/js/filters.js'
export default {
    props: {
        list: {
            type: Object
        },
    },
    filters: {
        filterTime
    },
    methods: {
        // 点击进入详情页
        // ============
        tapToInfo(e) {
            let info_id = e.currentTarget.dataset.id,
                user_id = e.currentTarget.dataset.userid;
            this.$emit('info', info_id, user_id);
        },
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.news-item {
    width: 100%;
    padding: .32rem;
    margin-top: .12rem;
    background: #fff;
    box-sizing: border-box;
    @include center-block;
    .complete {
        .top-box {
            position: relative;
            @include clearfix();
            .info {
                width: 95%;
                margin-left: .24rem;
                @include float();
                .title {
                    font-size: .28rem;
                    line-height: .46rem;
                    -webkit-margin-before: .5em;
                    color: $Black;
                }
            }
        }
        .bottom-box {
            display: flex;
            margin-top: .24rem;
            color: darken($Gray, 20%);
            .left {
                flex: 1;
                display: flex;
                align-items: center;
                .tab {
                    -webkit-margin-before: 0em;
                    -webkit-margin-after: 0em;
                    padding: .01rem .08rem;
                    background: $Gray;
                    border-radius: 4px;
                    font-size: .24rem;
                    color: #fff;
                }
                .time {
                    margin-left: .24rem;
                    font-size: .24rem;
                }
            }
            .right {
                display: flex;
                .item {
                    display: flex;
                    align-items: center;
                    &:first-child {
                        margin-right: .16rem;
                    }
                    .text {
                        font-size: .24rem;
                        margin-left: .08rem;
                    }
                }
            }
        }
    }
}
</style>
