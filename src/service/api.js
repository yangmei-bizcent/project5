import axios from 'axios'
/*import * as config from './api-config.js'*/
//----------------接口地址配置-----------------
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
console.log(document.location.protocol,!Request.ModelUrl, Request.ModelUrl == 'undefined','Request.ModelUrl')
if(!Request.ModelUrl || Request.ModelUrl == 'undefined'){
    // var BaseUrl = document.location.protocol + "//192.168.0.241:9997/";
    // var BaseUrl = document.location.protocol + "//192.168.0.241:9999/";
    // var BaseUrl = document.location.protocol + "//192.168.0.241:9994/";
    //测试
    // var BaseUrl = "https://jthyapitest.zwjk.com/";
    //预生产
    var BaseUrl = document.location.protocol + "//yscjthyums.zwjk.com/";  
    var MSGBaseUrl = document.location.protocol +"//yscmessageapi.zwjk.com/";//发送短信 
    //生产
    // var BaseUrl = document.location.protocol + "//jthy.zwjk.com/"; 
    // var MSGBaseUrl = document.location.protocol +"//messageapi.zwjk.com/";//发送短信 
    // 河南
    // var BaseUrl = document.location.protocol + '//jthy.o2omed.com.cn/';
}else{
    var BaseUrl = Request.ModelUrl + '/'
    var MSGBaseUrl = document.location.protocol +"//yscmessageapi.zwjk.com/";//发送短信 
    //生产
    // var MSGBaseUrl = document.location.protocol +"//messageapi.zwjk.com/";//发送短信 
}
// let BaseUrl = Request.ModelUrl + '/';
// let BaseUrl = "https://yscjthyums.zwjk.com/";
//----------------跳转地址配置-----------------
//测试
// export const linkUrl = "https://192.168.0.241:10000/#/";
// export const linkUrlMsg = "https://testmessageweb.zwjk.com/#/";
//预生产
export const linkUrl = document.location.protocol + "//yscjthysxzz.zwjk.com/#/";
export const linkUrlMsg = document.location.protocol + "//yscmessageweb.zwjk.com/#/";

//生产
// export const linkUrl = document.location.protocol +"//jthysxzz.zwjk.com/#/";
// export const linkUrlMsg = document.location.protocol + "//messageweb.zwjk.com/#/";

// 河南
// export const linkUrl = document.location.protocol +"//jthysxzz.o2omed.com.cn/#/";

//----------------APPID配置-----------------
export const appid = "5e5fe7152bab82dc2945ca37e7caa7bd"
//----------------iframe链接配置-----------------
export const iframeUrl = document.location.protocol + "//192.46.112.57:8081/"
export const iframeUrl1 = BaseUrl;

export const apiurl = {
    GetUserJurisdiction:BaseUrl+'PC/Common/GetUserJurisdiction',//获取登录信息各模块权限
    GetMedicalReimburseType: BaseUrl + 'API/Common/GetMedicalReimburseType', //获取医保报销类型下拉
    GetMedicalCardType: BaseUrl + 'API/Common/GetMedicalCardType', //获取医保卡类型下拉
    GetCrowdClassify: BaseUrl + 'PC/PatientArchives/GetCrowdClassify',//人群分类标签
    GetChronicDiseaseOption: BaseUrl + 'PC/PatientArchives/GetChronicDiseaseOption',//疾病分类
    GetLabelList: BaseUrl + '/APP/PatientManage/GetLabelList',//LabelTypeCode=6是人员关系，5是医保类型，7是报销类型，4是方便联系方式

    GetSectionByHospitalIDDown: BaseUrl + 'PC/Section/GetSectionByHospitalID', //社区申请 获取科室下拉
    GetServicePacks: BaseUrl + 'PC/ServicePack/GetServicePacks', //获取社区所有服务包
    AddTurnDownStep1: BaseUrl + 'PC/DischargedPatient/AddTurnDownStep1', //新增向下转诊第一步
    GetRegions: BaseUrl + 'PC/Common/GetRegions', //省市区
    GetList: BaseUrl + 'PC/DischargedPatient/GetList', //出院病人信息
    GetTurnDownList: BaseUrl + 'PC/DischargedPatient/GetTurnDownList', //病人转诊记录【下转】 转出
    GetTurnOnList: BaseUrl + 'PC/DischargedPatient/GetTurnOnList', //PC_病人转诊记录（上转）转入
    GetCooperateHospitalList: BaseUrl + 'PC/Hospital/GetCooperateHospitalList', //PC_合作的可下转的医院
    GetPatientToReceiveList: BaseUrl + 'PC/TransferTreatmentBase/GetPatientToReceiveList', //PC_待接收转诊病人（上级单位）
    CancelPatientToReceive: BaseUrl + 'PC/TransferTreatmentBase/CancelPatientToReceive', //PC_取消待接收转诊（上级单位）
    GetTransferList: BaseUrl + 'PC/TransferTreatmentBase/GetTransferList', //PC_上级医院或社区医院获取门诊、检查转诊列表 1门诊转诊 2检查转诊
    GetCommunityHospitals: BaseUrl + 'PC/Hospital/GetCommunityHospitals',
    GetPatientCanceledList: BaseUrl + 'PC/TransferTreatmentBase/GetPatientCanceledList', //PC_已取消的病人转诊（上级部门）
    GetPatientReceivedList: BaseUrl + 'PC/TransferTreatmentBase/GetPatientReceivedList', //PC_已接收的转诊病人（上级单位）
    GetPatientRefusedList: BaseUrl + 'PC/TransferTreatmentBase/GetPatientRefusedList', //PC_已拒绝的转诊病人（上级部门）
    GetIsAppointmentCommunityHospitalList: BaseUrl + 'PC/HospitalTransferManage/GetIsAppointmentCommunityHospitalList', //PC_上级医院获取门诊预约社区医院列表 门诊的送转医院
    GetIsCheckTransferCommunityHospitalList: BaseUrl + 'PC/HospitalTransferManage/GetIsCheckTransferCommunityHospitalList', //PC_上级医院获取检查预约社区医院列表 检查检验的送转医院
    GetLoginInfo: BaseUrl + 'PC/Common/GetLoginInfo', //用户登录
    //GetSectionByHospitalID: BaseUrl + 'PC/Section/GetSmallSectionByHospitalID', //根据医院获取科室
    GetDoctorsBySectionID: BaseUrl + 'PC/Doctor/GetSchedulingDoctorsBySectionID', //根据科室获取医生
    GetTransferHospitalList: BaseUrl + 'PC/HospitalTransferManage/GetTransferHospitalList', //PC_转诊管理获取社区医院列表 转诊设置列表
    AddTransferHospital: BaseUrl + 'PC/HospitalTransferManage/AddTransferHospital', //PC_新增或编辑可转诊医院
    GetDiseaseOptions: BaseUrl + 'PC/Disease/GetDiseaseOptions', //PC_获取出院诊断病情信息列表
    GetHospitalIsAppointInfo: BaseUrl + 'PC/HospitalTransferManage/GetHospitalIsAppointInfo', //PC_查看当前用户所在医院门诊预约和检查预约开通情况
    GetTurnDownByDPatientId: BaseUrl + 'PC/DischargedPatient/GetTurnDownByDPatientId', //PC_出院病人新增转诊信息
    GetTurnDownReasons: BaseUrl + 'PC/Common/GetTurnDownReasons', //PC_转诊原因（PC通用）
    GetCooperativeHospitals: BaseUrl + 'PC/Hospital/GetCooperativeHospitals', //PC_合作的可下转的医院
    GetTransferRegisterList: BaseUrl + 'PC/RegisteredRecordInfo/GetTransferRegisterList', //PC_获取签约居民列表
    GetIsAppointmentHigherHospitalList: BaseUrl + 'PC/HospitalTransferManage/GetIsAppointmentHigherHospitalList', //PC_社区医院获取门诊预约上级医院列表
    GetCommunityHospitalList: BaseUrl + 'API/Hospital/GetCommunityHospitalList', //PC_根据区域编号获取社区医院
    GetSmallSectionByHospitalID: BaseUrl + 'PC/Section/GetSmallSectionByHospitalID', //PC_门诊转诊根据医院获取小科室
    GetSmallSectionByHospitalIdOutpatient: BaseUrl + 'PC/Section/GetSmallSectionByHospitalIdOutpatient', //PC_门诊转诊根据医院获取小科室
    GetSchedulingStopList: BaseUrl + 'PC/SchedulingStop/GetSchedulingStopList', //PC_获取门诊停诊信息
    AddTurnDownSubmit: BaseUrl + 'PC/DischargedPatient/AddTurnDownSubmit', //PC_新增向下转诊_提交保存
    GetTurnDownDetail: BaseUrl + 'PC/TransferTreatmentBase/GetTurnDownDetail', //PC_已接收转诊的详情  
    GetWaitTreatmentPatientList: BaseUrl + 'PC/TransferTreatmentBase/GetWaitTreatmentPatientList', //PC_待接诊病人（下级用
    GetReceivedTreatmentPatientList: BaseUrl + 'PC/TransferTreatmentBase/GetReceivedTreatmentPatientList', //PC_已接诊病人（下级用
    GetRefusedTreatmentPatientList: BaseUrl + 'PC/TransferTreatmentBase/GetRefusedTreatmentPatientList', //PC_已拒绝病人（下级用
    GetIsDowmTransferHigherHospitalList: BaseUrl + 'PC/HospitalTransferManage/GetIsDowmTransferHigherHospitalList', //PC_社区医院获取出院转诊上级医院列表
    GetTreatmentDoctorList: BaseUrl + 'PC/Doctor/GetTreatmentDoctorList', //接诊医生
    AgreeTurnDownTreatment: BaseUrl + 'PC/TransferTreatmentBase/AgreeTurnDownTreatment', //PC_同意接诊上级下转的转诊（下级用）
    GetRefuseReasons: BaseUrl + 'PC/Common/GetRefuseReasons', //拒绝原因整合
    RefuseTurnDownTreatment: BaseUrl + '/PC/TransferTreatmentBase/RefuseTurnDownTreatment', //PC_拒绝接诊上级下转的转诊（下级用）
    ExportPatientToReceive: BaseUrl + '/PC/TransferTreatmentBase/ExportPatientToReceive', //导出【待接收】的转诊信息（上级用）
    TransferAgain: BaseUrl + 'PC/TransferTreatmentBase/TransferAgain', //重新送转
    GetSchedulingList: BaseUrl + 'PC/SchedulingInfo/GetSchedulingList', //PC_获取门诊转诊排班信息
    GetDoctorCustom: BaseUrl + 'PC/Doctor/GetDoctorCustom', //PC_根据医生编号获取医生信息
    GetSchedulingNumList: BaseUrl + 'PC/OutPatientAppointment/GetSchedulingNumList', //PC_获取门诊转诊号源信息
    GetTurnOnJCList: BaseUrl + 'PC/DischargedPatient/GetTurnOnJCList', //检查检验转诊列表
    GetTurnOnMZList: BaseUrl + 'PC/DischargedPatient/GetTurnOnMZList', //门诊专诊信息列表
    ExportPatientCanceled: BaseUrl + 'PC/TransferTreatmentBase/ExportPatientCanceled', //导出【已取消】的转诊信息（上级用）
    UploadDischargeRecordImg: BaseUrl + 'PC/DischargedPatient/UploadDischargeRecordImg', //上传出院记录照片
    DeleteDischargeRecordImg: BaseUrl + 'PC/DischargedPatient/DeleteDischargeRecordImg', //删除上传的出院记录照片
    TransferAgain: BaseUrl + 'PC/TransferTreatmentBase/TransferAgain', //重新送转
    GetOutPatientAppointmentView: BaseUrl + 'PC/OutPatientAppointment/GetOutPatientAppointmentView', //PC_获取门诊转诊预约详情
    GetInspectAppointment: BaseUrl + 'PC/InspectAppointment/GetInspectAppointment', //PC_查看检查预约详情
    GetHospitalTwoDimensionCode: BaseUrl + 'PC/Hospital/GetHospitalTwoDimensionCode', //获取医院二维码
    GetLoginInfo: BaseUrl + 'PC/Common/GetLoginInfo', //PC_获取登录用户信息
    GetReferralPatientView: BaseUrl + 'PC/Patient/GetReferralPatientView', //PC_根据身份证获取患者信息
    InsertAppointment: BaseUrl + 'PC/OutPatientAppointment/InsertAppointment', //PC_门诊转诊申请提交
    CancelAppointment: BaseUrl + 'PC/OutPatientAppointment/CancelAppointment', //PC_门诊转诊取消申请
    UpdatePatient: BaseUrl + 'PC/Patient/UpdatePatient', //PC_上转修改或新增病人信息
    ExportRefusedTreatmentPatient: BaseUrl + 'PC/TransferTreatmentBase/ExportRefusedTreatmentPatient', //导出【已拒绝】的转诊信息（下级用）
    ExportReceivedTreatmentPatient: BaseUrl + 'PC/TransferTreatmentBase/ExportReceivedTreatmentPatient', //导出【已接诊】的转诊信息（下级用）
    ExportWaitTreatmentPatient: BaseUrl + 'PC/TransferTreatmentBase/ExportWaitTreatmentPatient', //导出【待接诊】的转诊信息（下级用）
    ExportPatientRefused: BaseUrl + 'PC/TransferTreatmentBase/ExportPatientRefused', //导出【已拒绝】的转诊信息（上级用）
    ExportPatientCanceled: BaseUrl + 'PC/TransferTreatmentBase/ExportPatientCanceled', //导出【已取消】的转诊信息（上级用）
    ExportPatientReceived: BaseUrl + 'PC/TransferTreatmentBase/ExportPatientReceived', //导出【已接收】的转诊信息（上级用）
    ExportPatientToReceive: BaseUrl + 'PC/TransferTreatmentBase/ExportPatientToReceive', //导出【待接收】的转诊信息（上级用）
    GetTurnOnDetail: BaseUrl + 'PC/TransferTreatmentBase/GetTurnOnDetail', //PC_上转转诊信息详情（通用）
    AddInspectAppointment: BaseUrl + 'PC/InspectAppointment/AddInspectAppointment', //PC_新增检查预约
    GetIsCheckTransferHigherHospitalList: BaseUrl + 'PC/HospitalTransferManage/GetIsCheckTransferHigherHospitalList', //PC_社区医院获取检查预约上级医院列表
    GetInspectionCategoryList: BaseUrl + 'PC/InspectAppointment/GetInspectionCategoryList', //PC_获取检查预约分类
    GetInspectionItemsList: BaseUrl + 'PC/InspectAppointment/GetInspectionItemsList', //PC_获取检查预约项目
    GetInspectionSourceList: BaseUrl + 'PC/InspectAppointment/GetInspectionSourceList', //PC_获取检查预约号源
    // CancelInspectAppointment:BaseUrl+'PC/InspectAppointment/CancelInspectAppointment',//PC取消检查预约
    GetCheckState: BaseUrl + 'PC/Common/GetCheckState', //检验检查预约状态下拉选项
    GetOutpatientState: BaseUrl + 'PC/Common/GetOutpatientState', //PC_获取门诊预约下拉状态
    GetSchedulingDoctorsBySectionID: BaseUrl + 'PC/Doctor/GetSchedulingDoctorsBySectionID', //PC_根据科室编号获取医生信息（包含普通门诊）
    DownloadTransferTreatmentPic: BaseUrl + 'PC/Hospital/DownloadTransferTreatmentPic', //下载图片

    /**
     * 轮播图管理
     */
    CarouselMangeOfGetTableLists: BaseUrl + 'PC/BannerNews/GetList', //获取轮播图列表
    CarouselMangeOfLook: BaseUrl + 'PC/BannerNews/GetBannerNewsDetail', //列表查看
    CarouselMangeOfEdit: BaseUrl + '', //列表编辑
    CarouselMangeOfPublish: BaseUrl + 'PC/BannerNews/UpdateBannerNewsState', //列表撤回、开启
    CarouselMangeOfDelete: BaseUrl + 'PC/BannerNews/DeleteBannerNews', //列表删除
    CarouselMangeOfFilter: BaseUrl + '', //列表--位置筛选
    CarouselMangeOfAdd: BaseUrl + '', //列表--新增按钮
    CarouselMangeOf: BaseUrl + '', //列表
    CarouselMaxCount: BaseUrl + 'PC/BannerNews/GetBannerNewsCount', //获取排序最大数
    CarouselUpload: BaseUrl + 'PC/BannerNews/UploadBannerNewsImg', //上传图片
    CarouselUploadDelete: BaseUrl + 'PC/BannerNews/DeleteBannerNewsImg', //上传图片删除
    CarouselSave: BaseUrl + 'PC/BannerNews/SaveBannerNews', //新增或更新轮播图
    /**
     * 新闻资讯
     */
    GetNewsList: BaseUrl + 'PC/Information/GetList', //新闻资讯列表
    GetNewsInfo: BaseUrl + 'PC/Information/GetInformationDetail', //新闻资讯详情
    NewsDelete: BaseUrl + 'PC/Information/DeleteInformation', //删除新闻资讯
    UpdateInformationState: BaseUrl + 'PC/Information/UpdateInformationState', //新闻资讯关闭 开启
    GetBMCodeList: BaseUrl + 'API/BMCode/GetBMCodeList', //获取新闻资讯类别
    UploadInformationImg: BaseUrl + 'PC/Information/UploadInformationImg', //上传新闻资讯图片
    DeleteBannerNewsImg: BaseUrl + 'PC/BannerNews/DeleteBannerNewsImg', //资讯图片删除
    SaveInformation: BaseUrl + 'PC/Information/SaveInformation', //新增或更新资讯
    GetInformationCount: BaseUrl + 'PC/Information/GetInformationCount', //排序最大数
    //转诊上传
    UploadDischargeRecordImg: BaseUrl + 'PC/DischargedPatient/UploadDischargeRecordImg', //上传图片
    //转诊二维码
    DownloadTransferTreatmentPic: BaseUrl + 'PC/Hospital/DownloadTransferTreatmentPic', //下载整张图片
    DownloadTwoDimensionCode: BaseUrl + 'PC/Hospital/DownloadTwoDimensionCode', //下载二维码
    //统计中心
    StatisticsGetList: BaseUrl + 'PC/StatisticsBasics/GetList', //初始统计数据 列表
    StatisticsEdit: BaseUrl + 'PC/StatisticsBasics/Edit', //初始统计数据 详情
    StatisticsDelete: BaseUrl + 'PC/StatisticsBasics/Delete', //初始统计数据 删除
    AddOrUpdate: BaseUrl + 'PC/StatisticsBasics/AddOrUpdate', //初始统计数据 编辑 新增
    GetRenewNumStatistics: BaseUrl + 'PC/StatisticsCenter/GetRenewNumStatistics', //续约指标统计
    GetPayServicePackFeeStatistics: BaseUrl + 'PC/StatisticsCenter/GetPayServicePackFeeStatistics', //费用统计
    GetServiceItemCompleteRateStatistics: BaseUrl + 'PC/StatisticsCenter/GetServiceItemCompleteRateStatistics', //服务包指标统计
    GetSignNumStatistics: BaseUrl + 'PC/StatisticsCenter/GetSignNumStatistics', //签约指标统计
    GetRegions: BaseUrl + 'PC/Common/GetRegions', //获取省市区县
    GetHospitalsByRegion: BaseUrl + 'PC/Common/GetHospitalsByRegion', //【医院信息】通过区域代码获取其下相应的医院选项
    GetDoctorsByHospitalId: BaseUrl + 'PC/Common/GetDoctorsByHospitalId', //[医生信息]获取指定医院下的医生
    DownloadSignNumStatistics: BaseUrl + 'PC/StatisticsCenter/DownloadSignNumStatistics', //【统计下载】导出签约指标统计结果
    DownloadServiceItemCompleteRateStatistics: BaseUrl + 'PC/StatisticsCenter/DownloadServiceItemCompleteRateStatistics', //【统计下载】导出服务包指标统计结果
    DownloadPayServicePackFeeStatistics: BaseUrl + 'PC/StatisticsCenter/DownloadPayServicePackFeeStatistics', //【统计下载】导出有偿服务费用结果
    DownloadRenewNumStatistics: BaseUrl + 'PC/StatisticsCenter/DownloadRenewNumStatistics', //【统计下载】导出续约指标统计结果
    //短信设定
    GetRegisterConfig: BaseUrl + 'PC/RegisterConfig/GetRegisterConfig', //获取签约配置信息
    SetRegisterConfig: BaseUrl + 'PC/RegisterConfig/SetRegisterConfig', //设置签约相关配置信息
    GetRegisterSendPhoneType: BaseUrl + 'API/Common/GetRegisterSendPhoneType', //获取签约成功中联系电话设定方式

    //直播
    BroadcastLink: BaseUrl + 'PC/LiveTelecast/GetLiveTelecastList', //直播列表
    BroadcastDelete: BaseUrl + 'PC/LiveTelecast/DeleteLiveTelecast', //删除列表项
    BroadcastChange: BaseUrl + 'PC/LiveTelecast/UpdateState', //开启或者关闭
    BroadcastUploadImg: BaseUrl + 'PC/LiveTelecast/UploadImg', //上传图片接口
    BroadcastSaveOrEdit: BaseUrl + 'PC/LiveTelecast/SaveLiveTelecast', //提交接口
    BroadcastFill: BaseUrl + 'PC/LiveTelecast/GetLiveTelecast', //回填数据[编辑||查看]

    //签约协议
    QianYueGetHeaderAndFooter: BaseUrl + 'PC/SignAgreement/GetHeaderAndFooter', //签约协议头部和尾部
    QianYueGetContent: BaseUrl + 'PC/SignAgreement/GetContent', //获取当前登录用户所在医院的协议内容
    QianYueRemoveAgreement: BaseUrl + 'PC/SignAgreement/RemoveAgreement', //移除协议内容
    QianYueAddOrUpdateContent: BaseUrl + 'PC/SignAgreement/AddOrUpdateContent', //新增或者编辑协议内容
    //转诊详情
    // GetCourceInformationList: BaseUrl + '/PC/HospitalizedTransfer/GetCourceInformationList', //病程记录列表

    // 住院转诊
    SaveTransferInfo: BaseUrl + 'PC/TransferTreatmentBase/SaveTransferInfo', //保存住院转诊申请
    GetSectionByHospitalId: BaseUrl + 'PC/Section/GetSectionByHospitalId', //获取申请转入医院、科室、医疗组
    GetTransferHosList: BaseUrl + 'PC/HospitalTransferManage/GetTransferHosList', //获取可转诊医院
    GetDoctorsBySectionId: BaseUrl + 'PC/Doctor/GetDoctorsBySectionId',    //根据科室获取转出医院联系人
    GetTranferInfo: BaseUrl + 'PC/TransferTreatmentBase/GetTranferInfo',    // 获取转诊信息
    //双向转诊 lnp
    GetTransferHosList: BaseUrl + 'PC/HospitalTransferManage/GetTransferHosList', //转入医院列表
    GetSectionByHospitalID: BaseUrl + 'PC/Section/GetSectionByHospitalID', //申请入住&安排入住科室列表
    GetSectionByHospitalIdOutpatient: BaseUrl + 'PC/Section/GetSectionByHospitalIdOutpatient', //申请入住&安排入住科室列表
    GetTransferList: BaseUrl + 'PC/TransferTreatmentBase/GetTransferList', //查询 获取住院转诊列表
    CancerOrder: BaseUrl + 'PC/TransferTreatmentBase/CancerOrder', //转诊取消预约

    // 档案中心
    GetCurrentDoctorOptionList: BaseUrl + 'PC/PatientArchives/GetCurrentDoctorOptionList',//获取当前用户医生下拉列表
    GetPatientLabel: BaseUrl + 'PC/PatientArchives/GetPatientLabel',//获取分类下拉列表
    GetPatientManagementList: BaseUrl + 'PC/PatientArchives/GetPatientManagementList',//获取居民管理列表
    GetPatientArchivesInfo: BaseUrl + 'PC/PatientArchives/GetPatientArchivesInfo',//查看居民档案详情
    GetPatientRegisterList: BaseUrl + 'PC/PatientArchives/GetPatientRegisterList',//居民档案签约记录列表
    EditPatientArchives: BaseUrl + 'PC/PatientArchives/EditPatientArchives',//编辑居民档案
    GetServicePackOptionList: BaseUrl + 'PC/PatientArchives/GetServicePackOptionList',//获取用户所在社区服务包
    GetServicePackItemOptionList: BaseUrl + 'PC/PatientArchives/GetServicePackItemOptionList',//获取服务包下服务项目
    GetPatientList: BaseUrl + 'PC/PatientArchives/GetPatientList',//获取群发居民列表
    GetMedicalInfo: BaseUrl + 'PC/PatientArchives/GetMedicalInfo',//获取居民就诊信息

    //居民档案
    PatientArchivesGetTransferList:BaseUrl+'PC/PatientArchives/GetTransferList',//转诊记录
    //发送短信模板
    GetMessageModelList: MSGBaseUrl+'api/MessageTemplate/GetMessageModelList',//模版消息列表
    MessageModelList:MSGBaseUrl+'api/MessageTemplate/GetMessageModelList',//短信列表
    MessageYanZhengImge:MSGBaseUrl+"api/Common/GetValidateCodeByte",//获取短信验证码
    MessagaeSend:BaseUrl+'PC/PatientArchives/SendMessage',//发送短信
    MessagaeAvaliableMsgInfo:MSGBaseUrl+'api/ShortMessage/GetAvaliableMsgInfo',//获取可用的短信信息
}