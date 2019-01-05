<template>
    <div class="ts-content wrapper-datepicker newcss nowidth">
        <main class="main-wrap">
            <el-row class="titleOuter">
                <el-col :span="8">
                    <el-form ref="form" label-width="85px" class="clearfix">
                        <el-form-item label="位置筛选">
                            <el-select v-model="selectedVal" @change="chooseType" placeholder="请选择">
                                <el-option v-for="item in positionOptions" :key="item.displayPosition" :label="item.positionName" :value="item.displayPosition">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-button type="primary" @click="addContent" style="float:right">新增</el-button>
            </el-row>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="index" label="序号" width="60"> </el-table-column>
                <el-table-column prop="BannerTitle" label="标题" width="100"> </el-table-column>
                <el-table-column prop="Sort" label="排序" width="60"> </el-table-column>
                <el-table-column prop="CreateUserName" label="发布者" width="90"> </el-table-column>
                <el-table-column prop="" label="发布时间" width="100">
                    <template slot-scope="props">
                        <p>{{props.row.strPublishStartTime}}</p>
                        <!--到{{props.row.strPublishEndTime}}-->
                    </template>
                </el-table-column>
                <el-table-column prop="publishPos" label="展示位置" width="140">
                    <template slot-scope="props">
                        <span v-if="props.row.DisplayPosition==2">PC官网</span>
                        <span v-else-if="props.row.DisplayPosition==3">居民微信端</span>
                        <span v-else-if="props.row.DisplayPosition==4">医护app端</span>
                        <span v-if="props.row.DisplayPage==1">-官网首页模块</span>
                        <span v-else-if="props.row.DisplayPage==2">-官网介绍模块</span>
                        <span v-else-if="props.row.DisplayPage==3">-官网解决方案模块</span>
                        <span v-else-if="props.row.DisplayPage==4">-标杆用户模块</span>
                        <span v-else-if="props.row.DisplayPage==5">-关于我们模块</span>
                        <span v-else-if="props.row.DisplayPage==6">-医护版首页</span>
                        <span v-else-if="props.row.DisplayPage==7">-用户端首页</span>
                        <span v-if="props.row.DisplayPagePosition==1">-顶部轮播图</span>
                        <span v-else-if="props.row.DisplayPagePosition==2">-省级标杆用户</span>
                        <span v-else-if="props.row.DisplayPagePosition==3">-市级标杆用户</span>
                        <span v-else-if="props.row.DisplayPagePosition==4">-社区级标杆用户</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="状态" width="80">
                    <template slot-scope="props">
                        <span v-if="props.row.State==0">禁用</span>
                        <span v-else-if="props.row.State==1">启用</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="270">
                    <template slot-scope="props">
                        <el-button type="text" @click="lookContent(props.row.Id)"><i class="el-icon-ts-serch"></i>&nbsp;查看</el-button>
                        <el-button type="text" @click="editContent(props.row.Id)"><i class="el-icon-ts-pjgl"></i>&nbsp;编辑</el-button>
                        <el-button type="text" @click="deleteContent(props.row.Id)"><i class="el-icon-delete2"></i>&nbsp;删除</el-button>
                        <el-button type="text" @click="publishContent(props.row.Id,0)" v-if="props.row.State==0"><i class="el-icon-ts-pass"></i>&nbsp;开启</el-button>
                        <el-button type="text" @click="publishContent(props.row.Id,1)" v-else-if="props.row.State==1"><i class="el-icon-ts-X"></i>&nbsp;关闭</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block page" v-if="tableData&&tableData.length!=0">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="nowPage" :page-sizes="pageSizeSet" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalNumber">
                </el-pagination>
            </div>
        </main>

    </div>
</template>
<script>
    import '../../assets/sass/addtransfer.scss';
    import { mapGetters, mapActions } from 'vuex';
    import { linkUrl,apiurl } from '../../service/api.js';
    import axios from 'axios';
    export default {
        data() {
            return {
//              DisplayPosition:this.$route.query.DisplayPosition,
                DisplayPosition:'',
                selectedVal: 2,
                positionOptions: [{
                    displayPosition: 2,
                    positionName: "PC官网"
                }, {
                    displayPosition: 3,
                    positionName: "居民微信端"
                }, {
                    displayPosition: 4,
                    positionName: "医护app端"
                }],
                tableData: [],
                totalNumber: 0, //分页总条数
                pageSize: 10, //每页数量
                pageSizeSet: [10, 20], //设置每页多少条
                nowPage: 1, //当前页为1
            }
        },
        computed: {
            ...mapGetters({
                token: 'token',
            })
        },
        methods: {
            //判断selectedVal
            setSelectedVal(){
                this.DisplayPosition = sessionStorage.getItem("DisplayPosition");
                if(this.DisplayPosition&&this.DisplayPosition!=''){
                    this.selectedVal = parseInt(this.DisplayPosition)
                }
            },
            //获取列表
            getList(pageNum) {
                const that = this
                that.nowPage = pageNum
                axios.get(apiurl.CarouselMangeOfGetTableLists, {
                        params: {
                            "page": pageNum,
                            "rows": that.pageSize,
                            "displayPosition": that.selectedVal,
                            "token": that.token,
                        }
                    })
                    .then(function(res) {
                        console.log(res)
                        if(res.data.code == 200) {
                            const list = res.data.rows
                            that.tableData = list
                            that.totalNumber = res.data.total
                        }
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
            //分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.getList(1);
            },
            handleCurrentChange(val) {
                this.nowPage = val;
                this.getList(val);
            },
            //位置筛选
            chooseType() {
                this.getList()
            },
            //新增
            addContent() {
//                              this.$router.push({
//                                  name: "lbtxq",
//                              })
                var param = {};
                param.method = "addTab";
                param.title = '新增轮播图';
                param.url = linkUrl+'carouselManage/lbtxq?token=' + this.token+'&ModelUrl='+this.$route.query.ModelUrl;
                window.parent.postMessage(JSON.stringify(param), '*');
            },
            //查看
            lookContent(itemId) {
                //                              this.$router.push({
                //                                  name: "lbtck",
                //                                  query: {
                //                                      bannerId: itemId,
                //                                  }
                //                              })
                var param = {};
                param.method = "addTab";
                param.title = '查看轮播图';
                param.url = linkUrl+'carouselManage/lbtck?token=' + this.token + '&bannerId=' + itemId +'&ModelUrl='+this.$route.query.ModelUrl;
                window.parent.postMessage(JSON.stringify(param), '*');
            },
            //编辑
            editContent(itemId) {
//                              this.$router.push({
//                                  name: "lbtxq",
//                                  query: {
//                                      bannerId: itemId,
//                                  }
//                              })
                var param = {};
                param.method = "addTab";
                param.title = '编辑轮播图';
                param.url = linkUrl+'carouselManage/lbtxq?token=' + this.token + '&bannerId=' + itemId +'&ModelUrl='+this.$route.query.ModelUrl;
                window.parent.postMessage(JSON.stringify(param), '*');
            },
            //撤回或开启
            publishContent(itemId, state) {
                var str = ''
                if(state == 0) {
                    str = "开启"
                } else {
                    str = "关闭"
                }
                var that = this
                this.$confirm('是否' + str + '此条轮播图？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false,
                }).then(() => {
                    axios.post(apiurl.CarouselMangeOfPublish, {
                            bannerId: itemId,
                            bannerStateNum: state,
                        }, {
                            headers: {
                                'token': that.token
                            }
                        })
                        .then(function(res) {
                            console.log(res)
                            if(res.data.code == 200) {
                                that.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                that.getList()
                            }
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                }).catch(() => {});
            },
            //删除
            deleteContent(itemId) {
                var that = this
                this.$confirm('是否删除此条轮播图？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    lockScroll: false,
                }).then(() => {
                    axios.post(apiurl.CarouselMangeOfDelete, {
                            bannerIds: itemId,
                        }, {
                            headers: {
                                'token': that.token
                            }
                        })
                        .then(function(res) {
                            console.log(res)
                            if(res.data.code == 200) {
                                that.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                that.getList()
                            }
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                }).catch(() => {});
            },
        },
        created() {
            this.setSelectedVal()
            this.getList()
        }
    }
</script>
<style lang="scss">
    .nowidth {
        min-width: 1200px;
    }
    
    .titleOuter {
        margin-bottom: 20px;
        // background-color: #F7F7F7;
        .el-form-item {
            margin-bottom: 0
        }
    }
</style>