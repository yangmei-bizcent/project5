//接口方法推荐写在这个页面
import axios from 'axios'
import { Message } from 'element-ui'
import { objBase, modelBase } from './config'

const errorMsg = '未知错误错误，请联系后台人员'
const errorFn = err => {
    Message.error(errorMsg)
    return err
}
const codeerror = d => {
    if (d.data.suc != true) {
        Message.error(d.data.mes)
    }
    return d
}
const get = (_url, obj) => axios.get(objBase.baseURL + _url, { params: obj }, objBase).then(codeerror).catch(errorFn)
const post = (_url, obj) => axios.post(_url, obj, objBase).then(codeerror).catch(errorFn)
const postM = (_url, body) => axios.post(_url, body, modelBase).then(codeerror).catch(errorFn)

//PC_获取签约居民列表
const GetTransferRegisterList = (keyWords, page, rows, token) => get('PC/RegisteredRecordInfo/GetTransferRegisterList', keyWords, page, rows, token)
    //PC_上级医院或社区医院获取门诊、检查转诊列表 1门诊转诊 2检查转诊
const GetTransferList = (patientName, applyHospitalId, appointmentHospitalId, appointmentSectionId, appointmentDoctorId, examinationItemName, examinationDeviceName, createDateStart, createDateEnd, appointmentDateStart, appointmentDateEnd, page, appointmentType, rows, appointmentState, token) => get('PC/TransferTreatmentBase/GetTransferList', patientName, applyHospitalId, appointmentHospitalId, appointmentSectionId, appointmentDoctorId, examinationItemName, examinationDeviceName, createDateStart, createDateEnd, appointmentDateStart, appointmentDateEnd, page, appointmentType, rows, appointmentState, token)
    //PC_获取门诊预约下拉状态
const GetOutpatientState = () => get('PC/Common/GetOutpatientState')
    //PC_获取检查检验预约下拉状态
const GetCheckState = () => get('PC/Common/GetCheckState')
    //PC_社区医院获取门诊预约上级医院列表
const GetIsAppointmentHigherHospitalList = (token, keyWord) => get('PC/HospitalTransferManage/GetIsAppointmentHigherHospitalList', token, keyWord)
    //PC_门诊转诊根据医院获取小科室
const GetSmallSectionByHospitalID = (hospitalID, token) => get('PC/Section/GetSmallSectionByHospitalID', hospitalID, token)
    //PC_门诊转诊根据医院获取小科室
const GetSmallSectionByHospitalIdOutpatient = (hospitalID, token) => get('PC/Section/GetSmallSectionByHospitalIdOutpatient', hospitalID, token)
    //根据科室获取医生
const GetDoctorsBySectionID = (sectionId, token) => get('PC/Doctor/GetDoctorsBySectionID', sectionId, token)
    //PC_门诊转诊取消申请
const CancelAppointment = (id, token) => post('PC/OutPatientAppointment/CancelAppointment', id, token)
    //PC_获取门诊转诊预约详情
const GetOutPatientAppointmentView = (id, token) => get('PC/OutPatientAppointment/GetOutPatientAppointmentView', id, token)
    //PC_查看检查预约详情
const GetInspectAppointment = (transferId, token) => get('PC/InspectAppointment/GetInspectAppointment', transferId, token)
    //PC_获取门诊停诊信息
const GetSchedulingStopList = (page, hospitalId, sectionId, doctorId, rows, token) => get('PC/SchedulingStop/GetSchedulingStopList', page, hospitalId, sectionId, doctorId, rows, token)
    ////PC取消检查预约
const CancelInspectAppointment = (transferId, token) => post('PC/InspectAppointment/CancelInspectAppointment', transferId, token)
    //PC_根据科室编号获取医生信息（包含普通门诊）
const GetSchedulingDoctorsBySectionID = (sectionId, token) => get('PC/Doctor/GetSchedulingDoctorsBySectionID', sectionId, token)
    //转诊详情
const GetTranferInfo = (token, TransferId) => get('/PC/TransferTreatmentBase/GetTranferInfo', token, TransferId)
    //病程记录列表
const GetCourceInformationList = (token, TransferId, page, rows) => get('/PC/HospitalizedTransfer/GetCourceInformationList', token, TransferId, page, rows)

//病程记录详情
const GetCourceInformationDetail = (token, HospitalizedCourceInformationId) => get('/PC/HospitalizedTransfer/GetCourceInformationDetail', token, HospitalizedCourceInformationId)
    //社区记录详情
const GetTurnDownDetail = (ttb_id, token) => get('/PC/TransferTreatmentBase/GetTurnDownDetail', ttb_id, token)
    //检查记录列表
const GetInspectRecordList = (token, TransferId, page, rows) => get('/PC/HospitalizedTransfer/GetInspectRecordList', token, TransferId, page, rows)
    //检查记录详情
const GetInspectRecordDetail = (token, HospitalizedInspectRecordId) => get('/PC/HospitalizedTransfer/GetInspectRecordDetail', token, HospitalizedInspectRecordId)
    //化验单记录列表
const GetHospitalizedLaboratoryRecordList = (token, TransferId, page, rows) => get('/PC/HospitalizedTransfer/GetHospitalizedLaboratoryRecordList', token, TransferId, page, rows)
    //化验单记录详情
const GetHospitalizedLaboratoryRecordDetailList = (token, HospitalizedLaboratoryRecordId, page, rows) => get('/PC/HospitalizedTransfer/GetHospitalizedLaboratoryRecordDetailList', token, HospitalizedLaboratoryRecordId, page, rows)
    //医嘱记录列表
const GetHospitalizedDoctorAdviceList = (token, TransferId, page, rows) => get('/PC/HospitalizedTransfer/GetHospitalizedDoctorAdviceList', token, TransferId, page, rows)
    //医嘱记录详情
const GetHospitalizedDoctorAdviceDetail = (token, HospitalizedDoctorAdviceId) => get('/PC/HospitalizedTransfer/GetHospitalizedDoctorAdviceDetail', token, HospitalizedDoctorAdviceId)
    //手术记录列表
const GetHospitalizedOperationRecordList = (token, TransferId, page, rows) => get('/PC/HospitalizedTransfer/GetHospitalizedOperationRecordList', token, TransferId, page, rows)
    //手术记录详情
const GetHospitalizedOperationRecordDetail = (token, HospitalizedOperationRecordId) => get('/PC/HospitalizedTransfer/GetHospitalizedOperationRecordDetail', token, HospitalizedOperationRecordId)
    //出院小结
const GetDischarge = (token, transferId) => get('/PC/HospitalizedTransfer/GetDischarge', token, transferId)
    //【科室信息】根据医院编号获取科室
const GetSectionByHospitalID = (token, hospitalID, isGroup) => get('/PC/Section/GetSectionByHospitalID', token, hospitalID, isGroup)

//审核同意转诊预约
const AgreeOrder = (token, transferId, condition) => post('/PC/TransferTreatmentBase/AgreeOrder?token=' + token + "&transferId=" + transferId + "&condition=" + condition)
    //审核拒绝转诊预约
const RefuseOrder = (token, transferId, reason) => post('/PC/TransferTreatmentBase/RefuseOrder', token, transferId, reason)
    //住院转诊列表
const GetTransferListGet = (param) => get('/PC/TransferTreatmentBase/GetHospitalizedTransferList', param)
    //转诊取消预约
const CancerOrderPost = (token, transferId, reason) => post('/PC/TransferTreatmentBase/CancerOrder', token, transferId, reason)
    //获取办理入院弹窗显示内容
const GetShowDialog = (token) => get('/PC/TransferTreatmentBase/GetShowDialog?token=' + token)
    //办理入院
const InHospitalPost = (token, transferId, condition) => post('/PC/TransferTreatmentBase/InHospital', token, transferId, condition)
    //系统管理-获取登录用户信息
const GetLoginInfo = (token, hospitalID, isGroup) => get('/PC/Common/GetLoginInfo', token)
    //转诊预约作废
const DeleteOrder = (token, transferId, reason) => post('/PC/TransferTreatmentBase/DeleteOrder', token, transferId, reason)
    //出院
const OutHospital = (token, transferId) => post('/PC/TransferTreatmentBase/OutHospital', token, transferId)
    //向下转诊_接诊医生（通用）
const GetTreatmentDoctorList = (token, patientCardId) => get('/PC/Doctor/GetTreatmentDoctorList', token, patientCardId)

//向下转诊_同意接诊上级下转的转诊（下级用）
const AgreeTurnDownTreatment = (TransferTreatmentBaseId, AppointmentDoctorId, token) => post('/PC/TransferTreatmentBase/AgreeTurnDownTreatment', TransferTreatmentBaseId, AppointmentDoctorId, token)

//向下转诊_拒绝接诊上级下转的转诊（下级用）
const RefuseTurnDownTreatment = (TransferTreatmentBaseId, RefuseReason, token) => post('/PC/TransferTreatmentBase/RefuseTurnDownTreatment', TransferTreatmentBaseId, RefuseReason, token)
    //上级医院列表-转入
const GetIsDowmTransferHigherHospitalList = (keyWord, token) => get('PC/HospitalTransferManage/GetIsDowmTransferHigherHospitalList', keyWord, token)
    //向下转诊列表-社区
const GetTurnDownListByCommunity = (token, AppointmentState, patientName, applyDate, HospitalId, rows, page) => get('/PC/TransferTreatmentBase/GetTurnDownListByCommunity', token, AppointmentState, patientName, applyDate, HospitalId, rows, page)
    //社区医院列表-转出
const GetIsDowmTransferCommunityHospitalList = (patientCardId, token) => get('/PC/HospitalTransferManage/GetIsDowmTransferCommunityHospitalList', patientCardId, token)
    //向下转诊列表-上级
const GetTurnDownListBySuperior = (token, AppointmentState, patientName, applyDate, HospitalId, rows, page) => get('/PC/TransferTreatmentBase/GetTurnDownListBySuperior', token, AppointmentState, patientName, applyDate, HospitalId, rows, page)
    //社区转诊-转出-取消预约
const CancelPatientToReceive = (token, model) => postM('/PC/TransferTreatmentBase/CancelPatientToReceive?token=' + token, model)
    //获取登录信息各模块权限
const GetUserJurisdiction = (token) => get('/PC/Common/GetUserJurisdiction', token)

export default {
    GetTransferRegisterList,
    GetTransferList,
    GetOutpatientState,
    GetIsAppointmentHigherHospitalList,
    GetSmallSectionByHospitalID,
    GetSmallSectionByHospitalIdOutpatient,
    GetDoctorsBySectionID,
    CancelAppointment,
    GetOutPatientAppointmentView,
    GetInspectAppointment,
    GetSchedulingStopList,
    CancelInspectAppointment,
    GetCheckState,
    GetSchedulingDoctorsBySectionID,
    GetCourceInformationList,
    GetCourceInformationDetail,
    GetInspectRecordList,
    GetInspectRecordDetail,
    GetHospitalizedLaboratoryRecordList,
    GetHospitalizedLaboratoryRecordDetailList,
    GetHospitalizedDoctorAdviceList,
    GetHospitalizedDoctorAdviceDetail,
    GetHospitalizedOperationRecordList,
    GetHospitalizedOperationRecordDetail,
    GetTranferInfo,
    GetDischarge,
    GetSectionByHospitalID,
    AgreeOrder,
    RefuseOrder,
    GetTransferListGet,
    CancerOrderPost,
    GetShowDialog,
    InHospitalPost,
    GetLoginInfo,
    DeleteOrder,
    OutHospital,
    GetTurnDownDetail,
    GetTreatmentDoctorList,
    RefuseTurnDownTreatment,
    AgreeTurnDownTreatment,
    GetIsDowmTransferHigherHospitalList,
    GetTurnDownListByCommunity,
    GetIsDowmTransferCommunityHospitalList,
    GetTurnDownListBySuperior,
    CancelPatientToReceive,
    GetUserJurisdiction
}