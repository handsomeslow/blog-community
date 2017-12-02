<template>
    <div class="moment-item">
        <!--Complete Template-->

        <!--Top Box-->
        <div class="top-box">
            <div class="time">
                {{list.createdAt | filterTime}}
            </div>

            <!--info-->
            <div class="info" :data-id="list._id" :data-userid="list.owner._id" @click="tapToInfo($event)">
                <p class="title">{{list.title}}</p>

                <!--tab-->
                <!-- <div class="tab">{{list.tab}}</div> -->
            </div>
        </div>
        <!--top box-->

        <!--Bottom Box-->
        <div class="bottom-box">
            <!--left-->
            <div class="left">
                <!--avatar-->
                <div class="avatar" :data-id="list._id" :data-userid="list.owner._id" :data-username="list.owner.username" @click="tapToUserInfo($event)">
                    <img :src="list.owner.avatar_url" alt="">
                </div>
                <!--username-->
                <p class="username">{{list.owner.username}}</p>

            </div>

            <!--right-->
            <!-- <div class="right">
                
                <div class="item">
                    <mu-icon value="visibility" :size="14" color="#D3DCE6"></mu-icon>
                    <div class="text">{{list.view_count}}</div>
                </div>
              
                <div class="item">
                    <mu-icon value="textsms" :size="14" color="#D3DCE6"></mu-icon>
                    <div class="text">{{list.comment_count}}</div>
                </div>
            </div> -->
        </div>
        <!--bottom box-->

        <!--complete template-->
    </div>
</template>

<script>
import { filterTime } from '../../assets/js/filters.js'
export default {
    props: {
        list: {
            type: Object
        }
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
        // 点击进入用户详情页
        // ===============
        tapToUserInfo(e) {
            let info_id = e.currentTarget.dataset.id,
                user_id = e.currentTarget.dataset.userid,
                username = e.currentTarget.dataset.username;
            this.$emit('userInfo', info_id, user_id, username);
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.moment-item {
    width: 100%;
    padding: .32rem;
    margin-top: 0.05rem;
    background: #fff;
    box-sizing: border-box;
    @include center-block;
    .top-box {
        position: relative;
        @include clearfix();
        .time {
            margin-left: .24rem;
            font-size: .24rem;
        }
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
            .tab {
                position: absolute;
                right: 0;
                top: .18rem;
                padding: .01rem .08rem;
                background: $Gray;
                border-radius: 4px;
                font-size: .24rem;
                color: #fff;
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
            .avatar {
                width: .5rem;
                height: .5rem;
                border-radius: 100%;
                overflow: hidden;
                margin-left: .2rem;
                margin-right: .2rem;
                background: $ExtraLightGray;
                @include float();
                img {
                    width: .5rem;
                    height: .5rem;
                }
            }
            .username {
                padding: 0 !important;
                -webkit-margin-before: 0em;
                -webkit-margin-after: 0em;
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
</style>
