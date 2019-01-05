 import {
    SET_IDCARD,SET_PATIENTID
} from '../mutation-types'

let state = {
    idcard:"",
    patientid:""
}

const getters = {
	idcard: state =>{
		if(state.idcard=='' || state.idcard==null){
			return JSON.parse(localStorage.getItem('idcardL'));
		}
		return state.idcard;
	},
	patientid:function(state){
		if(state.patientid=='' || state.patientid==null){
			return JSON.parse(localStorage.getItem('patientidL'));
		}
		return state.patientid;
	}
}

const mutations = {
    [SET_IDCARD](state, idcard) {
        state.idcard = idcard;
    },
    [SET_PATIENTID](state, patientid) {
        state.patientid = patientid;
    }
}

const actions = {
  set_idcard ({ commit },idcard) {
    commit(SET_IDCARD,idcard)
    localStorage.setItem('idcardL',JSON.stringify(idcard))
  },
  set_patientid ({ commit },patientid) {
    commit(SET_PATIENTID,patientid);
    localStorage.setItem('patientidL',JSON.stringify(patientid))
  }
}

export default {
    state,
    getters,
    actions,
    mutations
}