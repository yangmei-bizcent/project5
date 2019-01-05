import {
    SET_HOSPTIALID,SET_HOSPTIALNAME,SET_PROVINCE,SET_PROVINCENAME,SET_CITY,SET_CITYNAME,SET_AREA,SET_AREANAME,SET_TOKEN,SET_SEEDPATIENDID,SET_WAITID,SET_WAITSTATE,SET_RESEND1,SET_TRANSFERTREATMENTBASEID,SET_DOCTORNAME,SET_DOCTORID,SET_POWER,SET_SECTIONID,SET_ZZPOWER,SET_JKURL
} from '../mutation-types'

let state = {
    hosptialid:null,
    hosptialname:"",
    province:null,
    provincename:"",
    city:null,
    cityname:"",
    area:null,
    areaname:"",
    doctorname:'',
    doctorid:'',
    sectionid:null,
    token:"",
    waitid:"",
    waitstate:"",
    resend1:null,
    seedpatiendid:"",
    transferTreatmentBaseId:null,
    power:{},
    zzpower:null,
    jkurl:''
} 
// sessionStorage 缓存 localStorage 保存到本机
const getters = {
    hosptialid: state => {
        if (state.hosptialid == '' || state.hosptialid == null) {
            return eval(localStorage.getItem('hosptialidL'));
        }
        return state.hosptialid;
    },
    hosptialname: function (state) {
        if (state.hosptialname == '' || state.hosptialname == null) {
            return JSON.parse(localStorage.getItem('hosptialnameL'));
        }
        return state.hosptialname;
    },
    sectionid: state => {
        if (state.sectionid == '' || state.sectionid == null) {
            return eval(localStorage.getItem('sectionidL'));
        }
        return state.sectionid;
    },
    province: state => {
        if (state.province == '' || state.province == null) {
            return eval(localStorage.getItem('province'));
        }
        return state.province;
    },
    provincename: state => {
        if (state.provincename == '' || state.provincename == null) {
            return JSON.parse(localStorage.getItem('provincename'));
        }
        return state.provincename;
    },
    city: state => {
        if (state.city == '' || state.city == null) {
            return eval(localStorage.getItem('city'));
        }
        return state.city;
    },
    cityname: state => {
        if (state.cityname == '' || state.cityname == null) {
            return JSON.parse(localStorage.getItem('cityname'));
        }
        return state.cityname;
    },
    area: state => {
        if (state.area == '' || state.area == null) {
            return eval(localStorage.getItem('area'));
        }
        return state.area;
    },
    areaname: state => {
        if (state.areaname == '' || state.areaname == null) {
            return JSON.parse(localStorage.getItem('areaname'));
        }
        return state.areaname;
    },
    doctorname: state => {
        if (state.doctorname == '' || state.doctorname == null) {
            return JSON.parse(localStorage.getItem('doctorname'));
        }
        return state.doctorname;
    },
    doctorid: state => {
        if (state.doctorid == '' || state.doctorid == null) {
            return eval(localStorage.getItem('doctorid'));
        }
        return state.doctorid;
    },
    token: state => {
        if (state.token == '' || state.token == null) {
            return eval(localStorage.getItem('tokenL'));
        }
        return state.token
    },
    // seedpatiendid: state => state.seedpatiendid,
    waitid:state=>{
        if(state.waitid==''||state.waitid==null){
            return JSON.parse(sessionStorage.getItem('waitidL'));
        }
        return state.waitid
    },
    waitstate:state=>{
        if(state.waitstate==''||state.waitstate==null){
            return JSON.parse(sessionStorage.getItem('waitstateL'));
        }
        return state.waitstate
    },
    resend1: state => {
        if (state.resend1 == '' || state.resend1 == null) {
            return eval(localStorage.getItem('resend1L'));
        }
        return state.resend1
    },
    seedpatiendid: state => {
        if (state.seedpatiendid == '' || state.seedpatiendid == null) {
            return eval(localStorage.getItem('seedpatiendidL'));
        }
        return state.seedpatiendid
    },
    transferTreatmentBaseId: state => {
        if (state.transferTreatmentBaseId == '' || state.transferTreatmentBaseId == null) {
            return eval(localStorage.getItem('transferTreatmentBaseIdL'));
        }
        return state.transferTreatmentBaseId
    },
    power: state => {
        if (state.power == '' || state.power == null) {
            return JSON.parse(localStorage.getItem("powerL"));
        }
        return state.power
    },
    zzpower: state => {
        if (state.zzpower == '' || state.zzpower == null) {
            return eval(localStorage.getItem('zzpowerL'));
        }
        return state.zzpower
    },
    jkurl: state => {
        if (state.jkurl == '' || state.jkurl == null) {
            return eval(localStorage.getItem('jkurlL'));
        }
        return state.jkurl
    },
}

const mutations = {
    [SET_HOSPTIALID](state, hosptialid) {
        state.hosptialid = hosptialid;
    },
    [SET_HOSPTIALNAME](state, hosptialname) {
        state.hosptialname = hosptialname;
    },
    [SET_SECTIONID](state, sectionid) {
        state.sectionid = sectionid;
    },
    [SET_PROVINCE](state, province) {
        state.province = province;
    },
    [SET_PROVINCENAME](state, provincename) {
        state.provincename = provincename;
    },
    [SET_CITY](state, city) {
        state.city = city;
    },
    [SET_CITYNAME](state, cityname) {
        state.cityname = cityname;
    },
    [SET_AREA](state, area) {
        state.area = area;
    },
    [SET_AREANAME](state, areaname) {
        state.areaname = areaname;
    },
    [SET_DOCTORNAME](state, doctorname) {
        state.doctorname = doctorname;
    },
    [SET_DOCTORID](state, doctorid) {
        state.doctorid = doctorid;
    },
    [SET_TOKEN](state, token) {
        state.token = token;
    },
    [SET_WAITID](state,waitid){
        state.waitid=waitid;
    },
    [SET_WAITSTATE](state,waitstate){
        state.waitstate=waitstate;
    },
    [SET_RESEND1](state,resend1){
        state.resend1=resend1;
    },
    [SET_SEEDPATIENDID](state,seedpatiendid){
        state.seedpatiendid=seedpatiendid;
    },
    [SET_TRANSFERTREATMENTBASEID](state,transferTreatmentBaseId){
        state.transferTreatmentBaseId=transferTreatmentBaseId;
    },
    [SET_POWER](state,power){
        state.power=power;
    },
    [SET_ZZPOWER](state,zzpower){
        state.zzpower=zzpower;
    },
    [SET_JKURL](state,jkurl){
        state.jkurl=jkurl;
    },
}

const actions = {
  set_hosptialid ({ commit },hosptialid) {
    commit(SET_HOSPTIALID,hosptialid)
    localStorage.setItem('hosptialidL',hosptialid)
  },
  set_hosptialname ({ commit },hosptialname) {
    commit(SET_HOSPTIALNAME,hosptialname);
    localStorage.setItem('hosptialnameL',JSON.stringify(hosptialname))
  },
  set_sectionid ({ commit },sectionid) {
    commit(SET_SECTIONID,sectionid)
    localStorage.setItem('sectionidL',sectionid)
  },
  set_province ({ commit },province) {
    commit(SET_PROVINCE,province);
    localStorage.setItem('provinceL',province)
  },
  set_provincename ({ commit },provincename) {
    commit(SET_PROVINCENAME,provincename);
    localStorage.setItem('provincenameL',JSON.stringify(provincename))
  },
  set_city ({ commit },city) {
    commit(SET_CITY,city);
    localStorage.setItem('cityL',city)
  },
  set_cityname ({ commit },cityname) {
    commit(SET_CITYNAME,cityname);
    localStorage.setItem('citynameL',JSON.stringify(cityname))
  },
  set_area ({ commit },area) {
    commit(SET_AREA,area);
    localStorage.setItem('areaL',area)
  },
  set_areaname ({ commit },areaname) {
    commit(SET_AREANAME,areaname);
    localStorage.setItem('areanameL',JSON.stringify(areaname))
  },
  set_doctorname ({ commit },doctorname) {
    commit(SET_DOCTORNAME,doctorname);
    localStorage.setItem('doctornameL',JSON.stringify(doctorname))
  },
  set_doctorid({commit},doctorid){
    commit(SET_DOCTORID,doctorid);
    localStorage.setItem('doctoridL',doctorid)
  },
  set_token({commit},token){
    commit(SET_TOKEN,token);
    localStorage.setItem('tokenL',token)
  },
  set_waitid({commit},waitid){
    commit(SET_WAITID,waitid);
    sessionStorage.setItem('waitidL',waitid)
  },
  set_waitstate({commit},waitstate){
    commit(SET_WAITSTATE,waitstate);
    sessionStorage.setItem('waitstateL',waitstate)
  },
  set_resend1({commit},resend1){
    commit(SET_RESEND1,resend1);
    localStorage.setItem('resend1L',resend1)
  },
  set_seedpatiendid({commit},seedpatiendid){
    commit(SET_SEEDPATIENDID,seedpatiendid);
    localStorage.setItem('seedpatiendidL',JSON.stringify(seedpatiendid))
  },
  set_transferTreatmentBaseId({commit},transferTreatmentBaseId){
    commit(SET_TRANSFERTREATMENTBASEID,transferTreatmentBaseId);
    localStorage.setItem('transferTreatmentBaseIdL',JSON.stringify(transferTreatmentBaseId))
  },
  set_power({commit},power){
    commit(SET_POWER,power);
    localStorage.setItem('powerL',JSON.stringify(power))
  },
  set_zzpower({commit},zzpower){
    commit(SET_ZZPOWER,zzpower);
    localStorage.setItem('zzpowerL',JSON.stringify(zzpower))
  },
  set_jkurl({commit},jkurl){
    commit(SET_JKURL,jkurl);
    localStorage.setItem('jkurlL',JSON.stringify(jkurl))
  },
}

export default {
    state,
    getters,
    actions,
    mutations
}