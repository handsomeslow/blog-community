<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>评论列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_cate" placeholder="筛选分类" class="handle-select mr10">
                <el-option key="1" label="android" value="android"></el-option>
                <el-option key="2" label="iOS" value="ios"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"></el-table-column>
            <!-- <el-table-column prop="title" label="标题" :formatter="formatter">
            </el-table-column> -->
            <el-table-column prop="content" label="标题" width="420">
            </el-table-column>
            <el-table-column prop="owner.username" label="作者" width="120">
            </el-table-column>
            <el-table-column prop="likes" label="点赞" width="120">
            </el-table-column>
            <el-table-column prop="createdAt" label="日期" :formatter="filterTime" sortable width="150">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="post_size" >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { filterTime } from '../../assets/js/filters.js'
    export default {
        data() {
            return {
                //url: './static/vuetable.json',
                tableData: [],
                post_size: 0,
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData;
            //     return self.tableData.filter(function(d){
            //         let is_del = false;
            //         for (let i = 0; i < self.del_list.length; i++) {
            //             if(d.name === self.del_list[i].name){
            //                 is_del = true;
            //                 break;
            //             }
            //         }
            //         if(!is_del){
            //             if(d.address.indexOf(self.select_cate) > -1 && 
            //                 (d.name.indexOf(self.select_word) > -1 ||
            //                 d.address.indexOf(self.select_word) > -1)
            //             ){
            //                 return d;
            //             }
            //         }
            //     })
            // }
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();    
            },
            getData(){
                let self = this;
                let url = '/comment?page='+self.cur_page+'&limit=10';
                self.$axios.get(url).then((res) => {
                    self.tableData = res.data.data.docs;
                    self.post_size = res.data.data.total;
                })
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterTime(row, column) {
                return filterTime(row.createdAt);
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                self = this;
                this.$axios.delete('comment/'+row._id).then((res) => {
                    if(res.data.code == 1) {
                        self.$message.success('成功删除第'+(index+1)+'行');
                        self.tableData.splice(index,1);
                        self.post_size = self.post_size - 1;
                    } else {
                        self.$message.error(res.data.msg);
                    }
                })
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>