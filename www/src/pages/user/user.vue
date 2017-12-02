<template>
    <div class="user">
        <!--Children Router-->
        <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <router-view class="details"></router-view>
        </transition>
        <!--children router-->

        <!--Snackbar-->
        <snackbar v-show="common.snack.isShow"></snackbar>
        <!--snackbar-->

        <!--Progress-->
        <mainProgress v-show="user.isFetching"></mainProgress>
        <!--progress-->

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
            <!--Log In-->
            <mu-flexbox class="login-wrapper" orient="vertical" key="no-login" v-if="!user.success">
                <!--auth-->
                <mu-flexbox class="login" align="center" orient="vertical">
                    <div class="content" v-if="isloginActive">
                        <form action="" name="form1">
                            <mu-text-field label="帐号" labelFloat name="username" />
                            <br/>
                            <mu-text-field label="密码" type="password" labelFloat name="password" />
                            <br/>
                            <div class="btn-radius" @click="tapToLogIn">登录</div>
                        </form>
                        <div @click="swichLogin" class="tip-user">
                            还未有帐号，去注册
                        </div>
                    </div>

                    <div class="content" v-if="!isloginActive">
                        <form action="" name="form1">
                            <mu-text-field label="帐号" labelFloat name="username" />
                            <br/>
                            <mu-text-field label="密码" type="password" labelFloat name="password" />
                            <br/>
                            <mu-text-field label="重复密码" type="password" labelFloat name="passwordcheck" />
                            <br/>
                            <div class="btn-radius" @click="tabToRegister">注册</div>
                        </form>
                        <div @click="swichLogin" class="tip-user">
                            我已有帐号
                        </div>
                    </div>
                </mu-flexbox>

                <!--tip-->
                <!-- <div class="tip">
                                                    <mu-flexbox class="question">
                                                        <mu-icon value="help"
                                                                 :size="18"
                                                                 color="#e96900"></mu-icon>
                                                        <p @click="tapToToggleTip">如何获取 accessToken？</p>
                                                    </mu-flexbox>
                                    
                                                    <transition enter-active-class="animated flipInX"
                                                                leave-active-class="animated flipOutX">
                                                        <div class="content"
                                                             v-show="isTipShow">
                                                            <a href="https://www.vue-js.com/">官方网站</a> 登录后，在设置页面可以看到自己的 <b>accessToken</b>。<br/>
                                                            将 <b>accessToken</b> 复制，粘贴到⬆文本框，即可登录。
                                                        </div>
                                                    </transition>    
                                                </div> -->
            </mu-flexbox>
            <!--log in-->

            <!--User Info-->
            <mu-flexbox class="userinfo-wrapper" orient="vertical" key="is-login" v-else>
                <!--info-->
                <mu-flexbox class="userinfo">
                    <!--avatar-->
                    <div class="avatar">
                        <img :src="user.userinfo.avatar_url" alt="">
                    </div>
                    <!--info-->
                    <div class="info">
                        <div class="username">{{user.userinfo.username}}</div>
                        <!-- <div class="userid">ID: {{user.userinfo._id}}</div> -->
                        <mu-flexbox class="score" justify="center">
                            <mu-icon value="stars" color="rgb(252, 192, 21)" :size="18"></mu-icon>
                            <div>&nbsp{{user.userinfo.score}}</div>
                        </mu-flexbox>
                    </div>
                </mu-flexbox>

                <!--action-->
                <mu-flexbox orient="vertical" class="action-wrapper">
                    <mu-flexbox class="action-item" @click.native="tapToUserTopics('我发表的话题', 'post_topics')">
                        <mu-icon value="chat" :size="20" style="color: #00b1fe"></mu-icon>
                        <div class="title">
                            我发表的话题
                        </div>
                        <div class="count" v-if="MY_TOPICS_COUNT > 0">{{MY_TOPICS_COUNT}}</div>
                        <mu-icon value="navigate_next" style="position: absolute;right: 0;color: #D3DCE6"></mu-icon>
                    </mu-flexbox>

                    <mu-flexbox class="action-item" @click.native="tapToUserTopics('我收藏的话题', 'collect_topics')">
                        <mu-icon value="star" :size="20" style="color: #fcc015"></mu-icon>
                        <div class="title">
                            我收藏的话题
                        </div>
                        <div class="count" v-if="COLLECT_TOPICS_COUNT > 0">{{COLLECT_TOPICS_COUNT}}</div>
                        <mu-icon value="navigate_next" style="position: absolute;right: 0;color: #D3DCE6"></mu-icon>
                    </mu-flexbox>

                    <!-- <mu-flexbox class="action-item" @click.native="tapToUserTopics('我最近的话题', 'recent_topics')">
                            <mu-icon value="bubble_chart" :size="20" style="color: #f86161"></mu-icon>
                            <div class="title">
                                我最近的话题
                            </div>
                            <div class="count" v-if="MY_TOPICS_COUNT > 0">{{MY_TOPICS_COUNT}}</div>
                            <mu-icon value="navigate_next" style="position: absolute;top: 50%;right: 0;transform: translate3d(0, -50%, 0);color: #D3DCE6"></mu-icon>

                        </mu-flexbox> -->
                </mu-flexbox>

                <!--button-->
                <mu-flexbox class="btn-logout" align="center" justify="center" @click.native="tapToLogOut">
                    退出登录
                </mu-flexbox>
            </mu-flexbox>
            <!--user info-->
        </transition>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { setCookie, getCookie, delCookie } from '../../assets/js/cookies'
import snackbar from '../../components/snackbar/snackbar'
import mainProgress from '../../components/mainProgress/mainProgress'
export default {
    data() {
        return {
            isloginActive: true,
            // ----- tip
            isTipShow: false
        }
    },
    created() {
        //this.fetchUserTopic();
    },
    mounted() {
        if (this.user.success) {
            // 请求用户详情数据
            this.$store.dispatch('fetchUserInfoAction', {
                id: this.user.userinfo._id
            });
        }
    },
    computed: {
        ...mapState([
            'user',
            'common'
        ]),
        ...mapGetters([
            'COLLECT_TOPICS_COUNT',
            'MY_TOPICS_COUNT'
        ])
    },
    components: {
        snackbar,
        mainProgress
    },
    methods: {
        ...mapMutations([
            'SHOW_MAIN_OVERFLOW',
            'LOGOUT',
            'CLEAR_MSG_DATA'
        ]),
        swichLogin() {
            this.isloginActive = !this.isloginActive
        },
        async tabToRegister() {
            // call api
            const username = document.form1.username.value.trim()
            const password = document.form1.password.value.trim()
            const passwordcheck = document.form1.passwordcheck.value.trim()
            if (username.length <= 0 || password.length <= 0 || passwordcheck.length <= 0) {
                this.$store.dispatch('showSnackbarAction', {
                    msg: '账号或密码不能为空',
                    isWarn: true
                })
                return
            } else {
                if (password == passwordcheck) {
                    this.$store.dispatch('register', {
                        username: username,
                        password: password
                    })
                } else {
                    this.$store.dispatch('showSnackbarAction', {
                        msg: '两次输入的密码不一致，请重新输入',
                        isWarn: true
                    })
                }

            }
        },
        // ----- log in
        tapToLogIn() {
            const username = document.form1.username.value.trim()
            const password = document.form1.password.value.trim()
            // 判断输入
            if (username.length <= 0 || password.length <= 0) {
                this.$store.dispatch('showSnackbarAction', {
                    msg: '账号或密码不能为空',
                    isWarn: true
                })
                return
            }
            // 发送登录请求
            this.$store.dispatch('loginAction', {
                username: username,
                password: password
            });
        },
        // ----- log out
        tapToLogOut() {
            this.LOGOUT();
            //this.CLEAR_MSG_DATA();
            this.$store.dispatch('loginout')
        },
        // ----- 跳转到 usertopics
        tapToUserTopics(title, type) {
            // 锁定根路由
            this.$store.commit('SHOW_MAIN_OVERFLOW');
            this.$router.push({ name: 'usertopics', params: { title, type } })
        },
        // 点击切换提示显示
        tapToToggleTip() {
            this.isTipShow = !this.isTipShow
        },
        fetchUserTopic() {
            this.$store.dispatch('fetchUserTopic')
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.user {
    background: $ExtraLightGray;
    .mu-text-field {
        &.focus-state {
            color: $primary !important;
        }
        .line-focus {
            background: $primary !important;
        }
    }
    .mu-raised-button {
        margin-top: .24rem;
    }
    .login-wrapper {
        .login {
            background: $ExtraLightGray;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-size: 100% 100%;
            .mu-appbar {
                text-align: center;
                .mu-flat-button-label {
                    font-size: 20px;
                }
            }
            .content {
                width: 80%;
                margin: 70px auto 20px;
                .mu-text-field {
                    width: 100%
                }
                .tip-user {
                    width: 100%;
                    text-align: center;
                    margin-top: 20px;
                    color: $primary !important;
                }
            }
        }
        .tip {
            width: 92%;
            margin-top: .64rem;
            .question {
                p {
                    font-weight: bold;
                    -webkit-margin-before: 0em;
                    -webkit-margin-after: 0em;
                    margin-top: .02rem;
                    margin-left: .08rem;
                }
            }
            .content {
                line-height: .48rem;
                padding: .24rem .4rem;
                box-sizing: border-box;
            }
        }
    }
    .userinfo-wrapper {
        .userinfo {
            width: 100%;
            height: 1.35rem;
            margin-top: .32rem;
            padding: 0 .24rem;
            box-sizing: border-box;
            background: #fff;
            border-top: 1px solid $LightGray;
            border-bottom: 1px solid $LightGray;
            .avatar {
                width: .96rem;
                height: .96rem;
                overflow: hidden;
                border-radius: 4px;
                background: $ExtraLightGray;
                img {
                    width: .96rem;
                    height: .96rem;
                }
            }
            .info {
                position: relative;
                flex: 1;
                margin-left: .24rem;
                .username {
                    font-size: .28rem;
                    font-weight: bold;
                    color: $Black;
                }
                .userid {
                    font-size: .22;
                    margin-top: .08rem;
                }
                .score {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 1.2rem;
                    height: .42rem;
                    border-radius: 5rem;
                    background: $ExtraLightGray;
                }
            }
        }
        .action-wrapper {
            margin-top: .32rem;
            background: #fff;
            border-top: 1px solid $LightGray;
            border-bottom: 1px solid $LightGray;
            .action-item {
                position: relative;
                height: .88rem;
                padding-left: .24rem;
                box-sizing: border-box;
                .title {
                    flex: 1;
                    height: 100%;
                    margin-left: .16rem;
                    border-bottom: 1px solid $LightGray;
                    display: flex;
                    align-items: center;
                    font-size: .28rem;
                }
                .count {
                    position: absolute;
                    top: 50%;
                    right: 24px;
                    transform: translate3d(0, -50%, 0);
                    width: .4rem;
                    height: .4rem;
                    line-height: .4rem;
                    text-align: center;
                    font-size: .2rem;
                    color: $LightBlack;
                    border-radius: 100%;
                    background: $LightGray;
                }
                &:last-child .title {
                    border-bottom: none;
                }
            }
        }
        .btn-logout {
            width: 100%;
            height: .88rem;
            background: #fff;
            margin-top: .32rem;
            border-top: 1px solid $LightGray;
            border-bottom: 1px solid $LightGray;
            font-size: .28rem;
        }
    }
    .details {
        position: fixed;
        top: 0;
        left: 0;
        z-index: $ChildPage;
        width: 100%;
        height: 100%;
        background: $ExtraLightGray;
    }
}
</style>
