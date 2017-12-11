<template>
    <div class="releasePage">
        <!--Dialog-->
        <tipdialog></tipdialog>
        <!--dialog-->

        <!--Edit page-->
        <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <editPage v-show="edit_page_show" @cancel="cancelEdit" @save="saveEdit"></editPage>
        </transition>
        <!--edit page-->

        <!--Appbar-->
        <mu-appbar title="发布">
            <!--back button-->
            <mu-icon-button icon="arrow_back" slot="left" @click="back"></mu-icon-button>
        </mu-appbar>
        <!--appbar-->
        <mu-tabs :value="activeTab" lineClass="line" @change="handleTabChange">
            <mu-tab value="edit" title="编辑" />
            <mu-tab value="preview" title="预览" />
        </mu-tabs>

        <mu-flexbox-item class="edit" v-if="activeTab === 'edit'">
            <!--Text Block-->
            <mu-flexbox class="textblock" orient="vertical" align="center">
                <!--type select field-->
                <mu-select-field v-model="tab" :fullWidth="true" label="选择模块" labelFocusClass="label-focus" underlineFocusClass="underline-focus">
                    <mu-menu-item value="android" title="android" />
                    <mu-menu-item value="ios" title="iOS" />
                    <mu-menu-item value="python" title="python" />
                    <mu-menu-item value="web" title="前端" />
                    <mu-menu-item value="nodejs" title="nodejs" />
                </mu-select-field>

                <!--title field-->
                <mu-text-field v-model="title" label="标题" hintText="8个字符以上" :fullWidth="true" labelFocusClass="label-focus" underlineFocusClass="underline-focus" />

                <!--Edit-->
                <mu-flexbox-item class="edit_content">
                    <mu-text-field v-model="content" label="正文" hintText="建议使用 Markdown 语法" multiLine :rows="10" :rowsMax="12" :fullWidth="true" labelFocusClass="label-focus" underlineFocusClass="underline-focus" />
                </mu-flexbox-item>
                <!--btn-->
                <mu-flat-button class="button-release" @click="tapToRelease">{{release.isReleaseFetching?'发布中':'发布'}}
                </mu-flat-button>
            </mu-flexbox>
            <!--text block-->
        </mu-flexbox-item>
        <mu-flexbox-item class="preview" v-html="markedContent" v-if="activeTab === 'preview'">
        </mu-flexbox-item>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getCookie } from '../../assets/js/cookies.js'
import tipdialog from '../../components/tipdialog/tipdialog'
import editPage from './editPage/editPage'
import marked from 'marked'
export default {
    data() {
        return {
            // ----- text filed
            activeTab: 'edit',
            tab: 'ask',
            title: '',
            content: '',
            // ----- edit page
            edit_page_show: false
        }
    },
    computed: {
        ...mapState([
            'login',
            'release'
        ]),
        markedContent() {
            return marked(this.content)
        }
    },
    components: {
        tipdialog,
        editPage
    },
    methods: {
        ...mapMutations([
            'HIDE_RELEASE_PAGE',
            'HIDE_MAIN_OVERFLOW',
            'SHOW_TIP_DIALOG',
            'HIDE_TIP_DIALOG'
        ]),
        // 切换选项卡
        handleTabChange(val) {
            this.activeTab = val
        },
        // 返回上一页
        // ========
        back() {
            this.HIDE_RELEASE_PAGE();
            this.HIDE_MAIN_OVERFLOW();
        },
        // 点击发布话题
        // ==========
        tapToRelease() {
            let accesstoken = getCookie('accesstoken'),
                tab = this.tab,
                title = this.title,
                content = this.markedContent,
                SucMsg = '发布成功',
                ErrMsg = '发布失败，请检查网络，或文本格式是否正确';

            // 前端过滤判断    
            if (!tab.length) {
                this.open('请选择模块');
                return
            }
            else if (title.length < 8) {
                this.open('话题标题字数不能小于8个')
                return
            } else if (!content.length) {
                this.open('文章内容不能为空')
                return
            };

            // 发送请求
            this.$store.dispatch('fetchReleaseAction', {
                accesstoken, title, tab, content, SucMsg, ErrMsg
            })
        },
        // dialog 显示
        open(text) {
            this.$store.commit('SHOW_TIP_DIALOG', {
                msg: text
            })
        },
        // edit page 显示
        showEdit() {
            this.edit_page_show = true;
        },
        showEditPreview() {
            this.edit_page_show = true;
        },
        cancelEdit() {
            this.edit_page_show = false;
        },
        saveEdit(content) {
            this.content = content;
            this.cancelEdit();
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/_base.scss';
.releasePage {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $ChildPage;
    width: 100%;
    height: 100%;
    background: #fff;
    .mu-appbar {
        background: $primary !important;
    }
    .mu-tabs {
        background: $primary;
        .line {
            background: #fff;
        }
    }

    .edit {
        width: 100% !important;
        margin-top: .32rem;
        @include center-block;
        .label-focus {
            color: $primary
        }
        .underline-focus {
            background: $primary
        }
        .textblock {
            width: 88%;
            margin-top: .32rem;
            @include center-block;
            .label-focus {
                color: $primary
            }
            .underline-focus {
                background: $primary
            }
            .edit-button {
                width: 100%;
                height: .88rem;
                margin-top: .24rem;
                line-height: .88rem;
                border-radius: 4px;
                color: $ExtraLightBlack;
                background: $ExtraLightGray;
            }
        }
    }
    .button-release {
        margin-top: .54rem;
    }
    .preview {
        width: 100%;
        padding: .32rem;
        margin-top: 0 !important;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
}

.mu-menu-item-wrapper.active {
    color: $primary !important;
}
</style>
