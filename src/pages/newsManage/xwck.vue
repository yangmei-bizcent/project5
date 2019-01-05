<template>
    <div class="ts-content wrapper-datepicker newcss nowidth">
        <main class="main-wrap">
            <el-form :model="formData" ref="ruleForm" label-width="95px" class="clearfix formClass">
                <el-row class="titleOuter">
                    <el-col :span="24">
                        <el-form-item label="展示终端">
                            <span v-if="formData.DisplayPosition==2">PC官网</span>
                            <span v-else-if="formData.DisplayPosition==3">居民微信端</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="标题">
                            <span>{{formData.NewsTitle}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="来源" class="titleInner">
                            <span>{{formData.NewsAuthor}}</span>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="排序" class="titleInner">
                            <span>{{formData.Sort}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="跳转链接" class="titleInner">
                            <span>{{formData.NewsLinkUrl}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="分类" class="titleInner">
                            <span>{{formData.NewsTypeName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="发布时间" class="titleInner">
                            <span>{{formData.strPublishStartTime}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="23" style="margin-right: 30px">
                        <el-form-item label="封面图片">
                            <div class="banner-pic">
                                <img :src="formData.NewsImageUrl" />
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <quill-editor v-model="formData.NewsContent" ref="conditionEditor" disabled>
                    </quill-editor>
                </el-row>
            </el-form>
        </main>

    </div>
</template>

<script>
    import '../../assets/sass/addtransfer.scss';
    import { mapGetters, mapActions } from 'vuex';
    import { apiurl } from '../../service/api.js';
    import axios from 'axios';
    import VueQuillEditor from 'vue-quill-editor'
    export default {
        data() {
            return {
                informationId: this.$route.query.informationId,
                formData: {},
            }
        },
        computed: {
            ...mapGetters({
                token: 'token',
            })
        },
        methods: {
            getInfo() {
                const that = this
                axios.get(apiurl.GetNewsInfo, {
                        params: {
                            "informationId": that.informationId,
                            "token": that.token,
                        }
                    })
                    .then(function(res) {
                        that.formData = res.data.extra
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
            },
        },
        created() {
            this.getInfo()
        }
    }
</script>
<style lang="scss">
    .nowidth {
        min-width: 1100px;
        .formClass {
            color: #000;
            font-size: 16px;
            line-height: 38px;
        }
        .banner-pic img {
            display: block;
            width: 300px;
        }
        .titleOuter {
            .el-date-editor--daterange.el-input {
                width: 100%;
            }
            .titleInner {
                position: relative;
                .alertFontPos {
                    position: absolute;
                    top: 30;
                    right: 0;
                    font-size: 8px;
                }
                .el-icon-ts-mark1 {
                    color: #00BC9C;
                }
            }
        }
    }
    
    .ql-container {
        border: 1px solid #ccc!important;
    }
    
    .ql-toolbar {
        display: none!important;
    }
</style>