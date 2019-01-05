<template>
    <div class="ts-content wrapper-datepicker newcss nowidth">
        <main class="main-wrap">
            <el-form :model="formData" ref="ruleForm" label-width="95px" class="clearfix formClass">
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="展示终端">
                            <span v-if="formData.DisplayPosition==2">PC官网</span>
                            <span v-else-if="formData.DisplayPosition==3">居民微信端</span>
                            <span v-else-if="formData.DisplayPosition==4">医护app端</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="显示位置">
                            <span v-if="formData.DisplayPage==1">官网首页模块</span>
                            <span v-else-if="formData.DisplayPage==2">官网介绍模块</span>
                            <span v-else-if="formData.DisplayPage==3">官网解决方案模块</span>
                            <span v-else-if="formData.DisplayPage==4">标杆用户模块</span>
                            <span v-else-if="formData.DisplayPage==5">关于我们模块</span>
                            <span v-else-if="formData.DisplayPage==6">医护版首页</span>
                            <span v-else-if="formData.DisplayPage==7">用户端首页</span>
                            <span>&nbsp;</span>
                            <span v-if="formData.DisplayPagePosition==1">顶部轮播图</span>
                            <span v-else-if="formData.DisplayPagePosition==2">省级标杆用户</span>
                            <span v-else-if="formData.DisplayPagePosition==3">市级标杆用户</span>
                            <span v-else-if="formData.DisplayPagePosition==4">社区级标杆用户</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="10" style="margin-right: 30px">
                        <el-form-item label="标题">
                            <span>{{formData.BannerTitle}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="跳转链接">
                            <span>{{formData.BannerImageLinkUrl}}</span>
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
                        <el-form-item label="发布时间" class="titleInner">
                            <span>{{formData.strPublishStartTime}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="titleOuter">
                    <el-col :span="23" style="margin-right: 30px">
                        <el-form-item label="上传图片">
                            <div class="banner-pic">
                                <img :src="formData.BannerImageUrl" />
                            </div>
                        </el-form-item>
                    </el-col>
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
    export default {
        data() {
            return {
                bannerId: this.$route.query.bannerId,
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
                axios.get(apiurl.CarouselMangeOfLook, {
                        params: {
                            "bannerId": that.bannerId,
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
<style lang="scss" scoped>
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
</style>