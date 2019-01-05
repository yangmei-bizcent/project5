<template>
    <div class="ts-content wrapper-datepicker newcss mzzzqr">
        <main class="main-wrap">
            <el-steps :active="2">
                <el-step title="填写基本情况" description="" style="margin-left:15%;"></el-step>
                <el-step title="门诊转诊预约" description=""></el-step>
                <el-step title="确认并完成申请" description="" style='width:auto;'></el-step>
            </el-steps>
            <div class="wrapper-layout">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="布局1" name="1">
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <div class="grid-content paddingbottom20">
                                    <h3>可预约医院</h3>
                                    <el-form class="paddingX20 padding20X">
                                        <el-input v-model="keyWords1" placeholder="请输入医院名称搜索" class="el-icon--left">
                                            <el-button slot="append" icon="search" @click="getAbleOrderHops"></el-button>
                                        </el-input>
                                    </el-form>
                                    <el-table ref="yyTable" :data="ableOrderHosp" stripe style="width: 100%" highlight-current-row height="500">
                                        <!-- <el-table-column type="selection" width="22"> </el-table-column> -->
                                        <!-- <el-table-column type="index" label="序号" width="40"> </el-table-column> -->
                                        <!-- <el-table-column type="index" width="40" label="序号"></el-table-column> -->
                                        <el-table-column width="50" label="序号">
                                            <template slot-scope="scope">
                                                <el-radio :label="scope.row.HospitalId" v-model="radio1" @change.native="getCurrentRow1((scope.row))">{{(scope.$index + 1)}}</el-radio>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="HospitalName" label="医院名称" width="100"> </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content paddingbottom20">
                                    <h3>检查大分类</h3>
                                    <el-form class="paddingX20 padding20X">
                                        <el-input v-model="keyWords2" placeholder="请输入检查大分类名称" class="el-icon--left">
                                            <el-button slot="append" icon="search" @click="getBigCategoryItem"></el-button>
                                        </el-input>
                                    </el-form>
                                    <el-table ref="jcdflTable" :data="bigCategoryData" stripe style="width: 100%" highlight-current-row height="500" :empty-text="radio1!=0&&bigCategoryData.length==0?'暂无数据':'请先选择要预约的医院'">
                                        <!-- <el-table-column type="selection" width="22"> </el-table-column>
                                                                <el-table-column type="index" label="序号" width="40"> </el-table-column> -->
                                        <el-table-column width="50" label="序号">
                                            <template slot-scope="scope">
                                                <el-radio :label="scope.row.Id" v-model="radio2" @change.native="getCurrentRow2((scope.row))">{{(scope.$index + 1)}}</el-radio>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="CategoryName" label="检查大分类" width="100"> </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content paddingbottom20">
                                    <h3>检查小分类</h3>
                                    <el-form class="paddingX20 padding20X">
                                        <el-input v-model="keyWords3" placeholder="请输入检查小分类名称" class="el-icon--left">
                                            <el-button slot="append" icon="search" @click="getSmallCategoryItem"></el-button>
                                        </el-input>
                                    </el-form>
                                    <el-table ref="jcxflTable" :data="smallCategoryData" stripe style="width: 100%" highlight-current-row height="500" :empty-text="radio2!=0&&smallCategoryData.length==0?'暂无数据':'请先选择检查大分类'">
                                        <!-- <el-table-column type="selection" width="22"> </el-table-column>
                                                                <el-table-column type="index" width="40" label="序号"></el-table-column> -->
                                        <el-table-column width="50" label="序号">
                                            <template slot-scope="scope">
                                                <el-radio :label="scope.row.Id" v-model="radio3" @change.native="getCurrentRow3((scope.row))">{{(scope.$index + 1)}}</el-radio>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="CategoryName" label="检查小分类" width="100"> </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content paddingbottom20">
                                    <h3>检查项目</h3>
                                    <el-form class="paddingX20 padding20X">
                                        <el-input v-model="keyWords4" placeholder="请输入检查项目名称" class="el-icon--left">
                                            <el-button slot="append" icon="search" @click="getcheckItem"></el-button>
                                        </el-input>
                                    </el-form>
                                    <el-table ref="jcxmTable" :data="checkItemData" stripe style="width: 100%" highlight-current-row height="500" :empty-text="radio3!=0&&checkItemData.length==0?'暂无数据':'请先选择检查小分类'">
                                        <!-- <el-table-column type="selection" width="22"> </el-table-column>
                                                                <el-table-column type="index" label="序号" width="40"> </el-table-column> -->
                                        <el-table-column width="50" label="序号">
                                            <template slot-scope="scope">
                                                <el-radio :label="scope.row.ExaminationItemId" v-model="radio4" @change.native="getCurrentRow4((scope.row))">{{(scope.$index + 1)}}</el-radio>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="ItemName" label="检查项目名称" width="100"> </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <div class="grid-content paddingbottom20">
                                    <h3>可预约号源</h3>
                                    <el-form label-width="85px" class="clearfix">
                                        <el-form-item class='floatLeft widthauto' label="转诊日期">
                                            <el-col :span="24">
                                                <el-date-picker v-model="date1" type="date" align="right" placeholder="选择日期范围" @change="timeChange">
                                                </el-date-picker>
                                            </el-col>
                                        </el-form-item>
                                        <el-form-item class='floatLeft no_margin_left widthauto height38'>
                                            <el-button type="primary" @click="getInspectionSourceList">查询</el-button>
                                        </el-form-item>
                                    </el-form>
                                    <el-table ref="kyyhyTable" :data="InspectionSourceData" stripe style="width: 100%" highlight-current-row :empty-text="radio4!=0&&InspectionSourceData.length==0?'暂无数据':'请先选择检查项目'">
                                        <!-- <el-table-column type="selection" width="22" align="center"></el-table-column>
                                                                <el-table-column type="index" label="序号" width="40"> </el-table-column> -->
                                        <el-table-column width="50" label="序号">
                                            <template slot-scope="scope">
                                                <el-radio :label="scope.row.RegNo" v-model="radio5" @change.native="getCurrentRow5((scope.row))">{{(scope.$index + 1)}}</el-radio>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="ClinicTimeStart" label="预约开始时间" width="80"></el-table-column>
                                        <el-table-column prop="ClinicTimeEnd" label="预约结束时间" width="80"></el-table-column>
                                        <el-table-column prop="AppointmentDate" label="预约日期" width="80"></el-table-column>
                                        <el-table-column prop="RegNo" label="预约号" width="80"></el-table-column>
                                        <el-table-column prop="ExaminationDeviceCode" label="检验设备代码" width="80"></el-table-column>
                                        <el-table-column prop="ExaminationDeviceName" label="检验设备名称" width="80"></el-table-column>
                                        <el-table-column prop="ExaminationDeviceAddress" label="检查地点" width="80"></el-table-column>
                                    </el-table>
                                    <el-pagination class="paddingright20" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, prev, pager, next,sizes " :total="total">
                                    </el-pagination>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="布局2" name="2"></el-tab-pane>
                </el-tabs>
            </div>
        </main>
        <div class="page_footer">
            <el-row :gutter="20" class="flex-align">
                <el-col :span="24">
                    <el-button @click="prevStep">上一步</el-button>
                    <el-button type="primary" @click="nextStep">下一步</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import '../../assets/sass/addtransfer.scss';
import '../../assets/sass/patient.css';
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import { apiurl } from '../../service/api.js';
export default {
    data() {
        return {
            // token: '14613b590745435082e43b902a2ced94',
            ableOrderHosp: [],                  //可预约医院数据
            keyWords1: '',                      //可预约医院的搜索关键词
            currentHospitalId: 0,             //当前选中医院呢ID
            radio1: null,


            bigCategoryData: [],
            keyWords2: '',
            bigCategoryId: 0,
            radio2: null,

            smallCategoryData: [],
            keyWords3: '',
            smallCategoryId: 0,
            radio3: null,


            checkItemData: [],
            keyWords4: '',
            radio4: null,


            HisItemNo: '',
            date: '',
            date1: '',                //仅用于显示
            currentPage: 1,
            pageSize: 10,
            total: 0,
            radio5: null,



            InspectionSourceData: [],
            activeName: '1',
            extra: Object.assign({
                AppointmentHospitalId: 0,
                bigCategoryId: 0,
                smallCategoryId: 0,
                HisItemNo: 0,
                AppointmentHospitalName: '',
                AppointmentDate: '',
                ClinicTime: '',
                ExaminationId:'',
                ExaminationItemId: '',
                ExaminationItemName: '',
                ExaminationDeviceName: '',
                ExaminationDeviceAddress: '',
                RegNo: '',
            }, this.$route.query.transferInfo),
        }
    },
    computed: {
        ...mapGetters({
            token: 'token'
        }),
    },
    mounted() {
        var date = new Date();
        this.date = date.getFullYear() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getDate();
        this.getAbleOrderHops();
        console.log(this.$route.query.transferInfo, "2222222222");
        console.log(this.radio4);
        if (this.$route.query.transferInfo != undefined && this.$route.query.transferInfo.steponeisfirst == false) {
            this.extra = this.$route.query.transferInfo;
            this.currentHospitalId = this.extra.AppointmentHospitalId;
            this.bigCategoryId = this.extra.bigCategoryId;
            this.smallCategoryId = this.extra.smallCategoryId;
            this.HisItemNo = this.extra.HisItemNo;
            this.radio1 = this.extra.AppointmentHospitalId;
            this.radio2 = this.extra.bigCategoryId;
            this.radio3 = this.extra.smallCategoryId;
            this.radio4 = this.extra.ExaminationItemId;
            this.radio5 = this.extra.RegNo;
            console.log(11111111111);

            if (this.radio1 != 0 || this.radio1) {
                window.setTimeout(this.getBigCategoryItem(), 500);
                if (this.radio2 != 0 || this.radio2) {
                    window.setTimeout(this.getSmallCategoryItem(), 1000);
                    if (this.radio3 != 0 || this.radio3) {
                        window.setTimeout(this.getcheckItem(), 1500);
                        if (this.radio4 != 0 || this.radio4) {
                            this.date = this.extra.AppointmentDate;
                            window.setTimeout(this.getInspectionSourceList(), 2000);
                        }
                    }
                }
            }
        }
    },
    methods: {
        getAbleOrderHops() {               //可预约医院
            var self = this;
            self.bigCategoryData = [];
            self.smallCategoryData = [];
            self.checkItemData = [];
            self.InspectionSourceData = [];
            console.log(this.token)
            let tokenL = localStorage.getItem('tokenL')
            axios.get(apiurl.GetIsCheckTransferHigherHospitalList, {
                params: {
                    // token: this.token,
                    token: tokenL,
                    keyWord: this.keyWords1
                }
            }).then(function(res) {
                if (res.data.suc == true) {
                    self.ableOrderHosp = res.data.rows;
                } else {
                    self.$alert(res.data.mes, '提示', )
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        getBigCategoryItem() {                        //获取大分类项目
            var self = this;
            self.smallCategoryData = [];
            self.checkItemData = [];
            self.InspectionSourceData = [];
            axios.get(apiurl.GetInspectionCategoryList, {
                params: {
                    token: this.token,
                    hospitalId: this.currentHospitalId,
                    categoryParentId: 0,
                    keyWord: this.keyWords2,
                }
            }).then(function(res) {
                if (res.data.suc == true) {
                    if (res.data.rows.length == 0) {

                    }
                    self.bigCategoryData = res.data.rows;
                } else {
                    self.$alert(res.data.mes, '提示', )
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        getSmallCategoryItem() {                        //获取小分类项目
            var self = this;
            self.checkItemData = [];
            self.InspectionSourceData = [];
            axios.get(apiurl.GetInspectionCategoryList, {
                params: {
                    token: this.token,
                    hospitalId: this.currentHospitalId,
                    categoryParentId: this.bigCategoryId,
                    keyWord: this.keyWords3,
                }
            }).then(function(res) {
                if (res.data.suc == true) {
                    self.smallCategoryData = res.data.rows;
                } else {
                    self.$alert(res.data.mes, '提示', )
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        getcheckItem() {                       //获取检查项目
            var self = this;
            self.InspectionSourceData = [];
            axios.get(apiurl.GetInspectionItemsList, {
                params: {
                    token: this.token,
                    inspectionCategoryId: this.smallCategoryId,
                    keyWord: this.keyWords4,
                }
            }).then(function(res) {
                if (res.data.suc == true) {
                    self.checkItemData = res.data.rows;
                    self.InspectionSourceData = [];
                } else {
                    self.$alert(res.data.mes, '提示', )
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        getInspectionSourceList() {                       //获取检查预约号源
            var self = this;
            axios.get(apiurl.GetInspectionSourceList, {
                params: {
                    token: this.token,
                    HisItemNo: this.HisItemNo,
                    AppointmentDate: this.date,
                    page: self.currentPage,
                    rows: self.pageSize
                }
            }).then(function(res) {
                if (res.data.suc == true) {
                    self.total = res.data.total;
                    self.InspectionSourceData = res.data.rows;
                } else {
                    self.$alert(res.data.mes, '提示', )
                }
            }).catch(function(error) {
                console.log(error);
            });
        },
        handleCurrentChange(val) {        //可预约号源分页页码改变
            this.currentPage = parseInt(val);
            this.getInspectionSourceList();
        },
        handleSizeChange(val) {            //可预约号源每页展示条数改变
            this.pageSize = parseInt(val);
            this.getInspectionSourceList();
        },
        timeChange(val) {                //可预约号源日期改变
            this.date = val;
            this.extra.AppointmentDate = val;
            this.getInspectionSourceList();
        },
        getCurrentRow1(row) {            //医院选择切换
            this.currentHospitalId = row.HospitalId;
            this.getBigCategoryItem();
            this.extra.AppointmentHospitalId = row.HospitalId;
            this.extra.AppointmentHospitalName = row.HospitalName;
            this.radio2 = 0;
            this.radio3 = 0;
            this.radio4 = 0;
            this.radio5 = 0;
            console.log(row);
            this.bigCategoryId = null;
            this.extra.bigCategoryId = null;
            this.smallCategoryId = null;
            this.extra.smallCategoryId = null;
            this.HisItemNo = '';
            this.extra.HisItemNo = '';
            this.extra.ExaminationId = null;
            this.extra.ExaminationItemId = null;
            this.extra.ExaminationItemName = '';
            this.extra.ExaminationDeviceName = '';
            this.extra.AppointmentDate = '';
            this.extra.ClinicTime = '';
            this.extra.ExaminationDeviceAddress = '';
            this.extra.RegNo = null;
        },
        getCurrentRow2(row) {           //大分类选择切换
            this.bigCategoryId = row.Id;
            this.extra.bigCategoryId = row.Id;
            this.getSmallCategoryItem();
            this.radio3 = 0;
            this.radio4 = 0;
            this.radio5 = 0;
            this.smallCategoryId = null;
            this.extra.smallCategoryId = null;
            this.HisItemNo = '';
            this.extra.HisItemNo = '';
            this.extra.ExaminationId = null;
            this.extra.ExaminationItemId = null;
            this.extra.ExaminationItemName = '';
            this.extra.ExaminationDeviceName = '';
            this.extra.AppointmentDate = '';
            this.extra.ClinicTime = '';
            this.extra.ExaminationDeviceAddress = '';
            this.extra.RegNo = null;
        },
        getCurrentRow3(row) {           //小分类选择切换
            this.smallCategoryId = row.Id;
            this.extra.smallCategoryId = row.Id;
            this.getcheckItem();
            this.radio4 = 0;
            this.radio5 = 0;
            this.HisItemNo = '';
            this.extra.HisItemNo = '';
            this.extra.ExaminationId = null;
            this.extra.ExaminationItemId = null;
            this.extra.ExaminationItemName = '';
            this.extra.ExaminationDeviceName = '';
            this.extra.AppointmentDate = '';
            this.extra.ClinicTime = '';
            this.extra.ExaminationDeviceAddress = '';
            this.extra.RegNo = null;
        },
        getCurrentRow4(row) {           //项目选择切换
            this.HisItemNo = row.HisItemNo;
            this.extra.HisItemNo = row.HisItemNo;
            this.getInspectionSourceList();
            this.extra.ExaminationId = null;
            this.extra.ExaminationItemId = row.ExaminationItemId;
            this.extra.ExaminationItemName = row.ItemName;
            console.log(row.HisItemNo)
            this.radio5 = 0;
            this.extra.ExaminationDeviceName = '';
            this.extra.AppointmentDate = '';
            this.extra.ClinicTime = '';
            this.extra.ExaminationDeviceAddress = '';
            this.extra.RegNo = null;
        },
        getCurrentRow5(row) {           //预约信息类选择切换
            this.extra.ExaminationDeviceName = row.ExaminationDeviceName
            this.extra.AppointmentDate = row.AppointmentDate;
            this.extra.ClinicTime = row.ClinicTimeStart + '-' + row.ClinicTimeEnd;
            this.extra.ExaminationDeviceAddress = row.ExaminationDeviceAddress;
            this.extra.ExaminationId = row.ExaminationId;
            this.extra.RegNo = row.RegNo;
        },
        nextStep() {
            if (this.radio1 == null) {
                this.$alert('请选择预约医院', '提示');
                return false;
            }
            if (this.radio2 == null) {
                this.$alert('请选择检查大分类', '提示');
                return false;
            }
            if (this.radio3 == null) {
                this.$alert('请选择检查小分类', '提示');
                return false;
            }
            if (this.radio4 == null) {
                this.$alert('请选择检查项目', '提示');
                return false;
            }
            if (this.radio5 == null) {
                this.$alert('请选择是时间号源', '提示');
            }
            console.log(this.extra,'extra')
            if (this.radio1 && this.radio2 && this.radio3 && this.radio4 && this.radio5) {
                this.steponeisfirst == true
                this.$router.push({
                    path: '/sign-person-list/jyjczzqr',
                    query: {
                        transferInfo: this.extra,
                        ModelUrl: self.$route.query.ModelUrl
                    }
                })
            }
        },
        prevStep() {
            this.extra.steponeisfirst = false;
            this.$router.push({
                path: 'yyjyjcsr',
                query: {
                    transferInfo: this.extra,
                    cardId: this.$route.query.cardId,
                    ModelUrl: self.$route.query.ModelUrl
                }
            })
        }
    }
}
</script>  
<style lang="scss" scoped>
.wrapper-layout {
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .grid-content {
        background: #fff;
        border: #e3e3e3 solid 1px;
    }
}

.el-table__empty-block {
    width: 100% !important;
}

.mzzzqr .grid-content .el-select {
    margin: 0!important;
}

.el-table__empty-block {
    width: 100% !important;
}
</style>
