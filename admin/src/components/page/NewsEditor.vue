<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="topic" :rules="ruleTopic" ref="topic" label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model="topic.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item>
                <quill-editor ref="myTextEditor" v-model="topic.content" :config="editorOption"></quill-editor>
            </el-form-item>
            <el-form-item label="类型" prop="tab">
                <el-select v-model="topic.tab" placeholder="话题分类" class="handle-select mr10">
                    <el-option key="1" label="android" value="android"></el-option>
                    <el-option key="2" label="iOS" value="ios"></el-option>
                    <el-option key="3" label="python" value="ios"></el-option>
                    <el-option key="4" label="前端" value="web"></el-option>
                    <el-option key="5" label="nodejs" value="nodejs"></el-option>
                </el-select>
            </el-form-item>
            <el-button class="editor-btn" type="primary" @click="submit(topic)">提交</el-button>
        </el-form>

    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
export default {
    data: function() {
        return {
            topic: {
                tab: '',
                title: '',
                content: '',
            },
            ruleTopic: {
                tab: [{ required: true, message: '请选择话题分类', trigger: 'blur' }],
                title: [{ required: true, message: '请输入你的标题', trigger: 'blur' }],
                content: [{ required: true, message: '为什么没有内容的?', trigger: 'blur' }],
            },
            editorOption: {
                // something config
            }
        }
    },
    components: {
        quillEditor
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        submit(topic) {
            self = this
            this.$refs.topic.validate((valid) => {
                if (valid) {
                    self.$axios.post('news', topic).then((res) => {
                        if (res.data.code == 1) {
                            self.$message.success('提交成功！');
                        }
                    });
                }

            })
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
        }
    }
}
</script>
<style scoped>
.editor-btn {
    margin-top: 20px;
}

.title-input {
    width: 80%;
    margin-bottom: 20px;
}
</style>