<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { apiurl } from './service/api.js'
    import axios from 'axios';
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            ...mapGetters({
                hosptialid: 'hosptialid',
                hosptialname: 'hosptialname',
                province: 'province',
                provincename: 'provincename',
                city: 'city',
                cityname: 'cityname',
                area: 'area',
                area: 'areaname',
                token: 'token',
                jkurl: 'jkurl'
            }),
        },
        mounted() {
            var self = this;
            function UrlSearch() {
                var name, value;
                var str = location.href; //取得整个地址栏
                var num = str.indexOf("?")
                str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]

                var arr = str.split("&"); //各个参数放到数组里
                for(var i = 0; i < arr.length; i++) {
                    num = arr[i].indexOf("=");
                    if(num > 0) {
                        name = arr[i].substring(0, num);
                        value = arr[i].substr(num + 1);
                        this[name] = value;
                    }
                }
            }
            var Request = new UrlSearch(); //实例化
            self.set_jkurl(Request.ModelUrl)
            self.set_token(Request.token);
            self.set_hosptialid('');
            // self.set_token('103b8295b84f3f30b79ab9619eed1259aac');
            //获取登录信息各模块权限
            //SignJurisdiction:签约权限(1个人 10管理员)
            //ReferralJurisdiction:转诊权限(1个人 10管理员)
            //MissionJurisdiction:宣教权限(1个人 10管理员)
            axios.get(apiurl.GetUserJurisdiction, {
                params: {
                    token: self.token
                }
            }).then(function(response) {
                // console.log(response, response.data.extra.HospitalInfo.HosptialID)
                if(response.data.suc){
                    // console.log(response,'response')
                    self.set_zzpower(response.data.extra.ReferralJurisdiction);
                }
            }).catch(function(error) {
                console.log(error);
            });
            //获取用户信息
            axios.get(apiurl.GetLoginInfo, {
                params: {
                    token: self.token
                }
            }).then(function(response) {
                // console.log(response, response.data.extra.HospitalInfo.HosptialID)
                if(response.data.suc){
                    if(response.data.extra.HealthOrgInfo != null){
                        self.set_province(response.data.extra.HealthOrgInfo.Province);
                        self.set_provincename(response.data.extra.HealthOrgInfo.ProvinceName);
                        self.set_city(response.data.extra.HealthOrgInfo.City);
                        self.set_cityname(response.data.extra.HealthOrgInfo.CityName);
                        self.set_area(response.data.extra.HealthOrgInfo.Area);
                        self.set_areaname(response.data.extra.HealthOrgInfo.AreaName);
                    }else{
                        self.set_province('');
                        self.set_city('');
                        self.set_area('');
                    }
                    if(response.data.extra.HospitalInfo!= null){
                        self.set_hosptialid(response.data.extra.HospitalInfo.HosptialID);
                        self.set_hosptialname(response.data.extra.HospitalInfo.HosptialName);
                        self.set_sectionid(response.data.extra.HospitalInfo.SectionID)
                    }else{
                        self.set_hosptialid('');
                        self.set_sectionid('');
                    }
                    if(response.data.extra.DoctorInfo!= null){
                        self.set_doctorid(response.data.extra.DoctorInfo.DoctorId)
                    }else{
                        self.set_doctorid('');
                    }
                    if(response.data.extra.ModulePremission!= null){
                        self.set_power(response.data.extra.ModulePremission);
                    }else{
                        self.set_power({});
                    }
                }else{
                    // self.$alert('登录异常，请重新登录','信息',{
                    //     confirmButtonText: '确定',
                    //     callback: action => {
                    //         var param = {};
                    //         param.method = "loginOut";
                    //         window.parent.postMessage(JSON.stringify(param), '*');
                    //     }
                    // })
                }

            }).catch(function(error) {
                console.log(error);
            });
            // 添加请求拦截器
            axios.interceptors.request.use(function(config) {
                // console.log(`请求地址: ${config.url}`)
                return config
            }, function(error) {
                // console.log('请求失败')
                return Promise.reject(error)
            })
            // 添加响应拦截器
            axios.interceptors.response.use(function(config) {
                // console.log('接收响应', config.data.mes)
                if(config.status == 401 || config.data.mes == '用户未登录' || config.data.mes == '账号已退出登录') {
                    self.$alert('登录异常，请重新登录','信息',{
                        confirmButtonText: '确定',
                        callback: action => {
                            var param = {};
                            param.method = "loginOut";
                            window.parent.postMessage(JSON.stringify(param), '*');
                        }
                    })
                    
                }
                return config
            }, function(error) {
                // Do something with request error
                // console.log('响应出错')
                return Promise.reject(error)
            })
        },
        methods: {
            ...mapActions([
                'set_hosptialid', 'set_hosptialname', 'set_province', 'set_provincename', 'set_city', 'set_cityname', 'set_area', 'set_areaname', 'set_token', 'set_doctorid', 'set_power','set_sectionid', 'set_zzpower', 'set_jkurl'
            ]),
            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if(r != null) return unescape(r[2]);
                return null;
            }
        }
    };
</script>
