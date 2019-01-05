<template>
  <div class="ts-content wrapper-steps clearfix newcss nowidth">
    <!-- 第一步 -->
    <div class="firstk" v-if='firstkflog'>
      <main class="main-wrap">
        <el-steps :active="1">
          <el-step title="填写病人信息" description="" style="margin-left:15%;"></el-step>
          <el-step title="填写转诊信息" description=""></el-step>
          <el-step title="信息核实" description="" style='width:auto;'></el-step>
        </el-steps>
        <br>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="clearfix">
          <el-row>
            <el-col :span="8">
              <el-form-item label="是否补录">
                <el-radio-group v-model="form.MakeupIf" @change='radiochange'>
                  <el-radio class="radio" :label="1" >是</el-radio>
                  <el-radio class="radio" :label="0">否</el-radio>
                </el-radio-group>                
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="转诊申请时间" v-if='zzdataflag == true' prop="zzdatavalue">
                <el-date-picker v-model="form.zzdatavalue" type="date" placeholder="选择日期" align="right" @change='zzdatachange'>
                </el-date-picker>
              </el-form-item>
            </el-col>          
          </el-row>
          <el-breadcrumb-item>病人基本信息</el-breadcrumb-item>
          <el-row>
            <el-col :span='8'>
              <el-form-item label="身份证号" prop="PatientCardId">
                  <el-input v-model="form.PatientCardId" placeholder="身份证号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="病人姓名" prop='PatientName'>
                <el-input v-model="form.PatientName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <div class="el-form-item" style="margin-left:12px;margin-bottom:40px;">
                <span class="temp-span">性别</span>
                <el-radio class="radio" v-model="form.PatientSex" :label="1">男</el-radio>
                <el-radio class="radio" v-model="form.PatientSex" :label="0">女</el-radio>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='8'>
              <el-form-item label="病人手机号码" prop='PatientPhone'>
                <el-input v-model="form.PatientPhone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="备用联系人" prop='ContactName'>
                <el-input v-model="form.ContactName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="备用联系人手机号码" prop='EmergencyPhone'>
                <el-input v-model="form.EmergencyPhone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='8'>
              <el-form-item label="医保报销类别" size="small" prop="MedicalType">
                <el-select v-model="form.MedicalType" clearable placeholder="医保报销类别" @change='medicalchange'>
                  <el-option v-for="item in form.medicaltypedata" :key='item.id' :label="item.text" :value="item.id" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="医保卡类型" size="small" prop="MedicalCardType">
                <!-- <el-col :span="24" class='floatLeft'> -->
                <el-select v-model="form.MedicalCardType" clearable placeholder="医保卡类型" @change='medicalcardchange'>
                  <el-option v-for="item in form.medicalcardtypedata" :key='item.id' :label="item.text" :value="item.id" ></el-option>
                </el-select>
                <!-- </el-col> -->
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="病人身份职业" prop='PatientProfession'>
                <el-input v-model="form.PatientProfession" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='8'>
              <el-form-item label="就诊卡号" prop='MedicalCard'>
                <el-input v-model="form.MedicalCard" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>            
            <el-col :span='8'>
              <el-form-item label="病人年龄" size="small" prop="PatientAge">
                <el-input v-model="form.PatientAge" placeholder="病人年龄"></el-input>
              </el-form-item>
            </el-col>                      
            <el-col :span='8'>
              <el-form-item label="医保卡卡号" size="small">
                <el-input v-model="form.MedicalCardId" placeholder="医保卡卡号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="flex-align">
            <el-col :span="7" style='margin-right:5px;'>
              <el-form-item class='mapname' label="病人所属区域" prop="Provincevalue">
                <el-select v-model="form.Provincevalue" clearable placeholder="选择省" @change='selectcityid'>
                  <el-option v-for="item in form.Province" :key="item.Code" :label="item.Name" :value="item.Code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style='margin-right:5px;'>
              <el-form-item class='mapname1 no_margin_left' prop="Cityvalue">
                <el-select v-model="form.Cityvalue" clearable placeholder="选择市" @change='selectareaid'>
                  <el-option v-for="item in form.City" :key="item.Code" :label="item.Name" :value="item.Code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class='mapname2 no_margin_left' prop="Areavalue">
                <el-select v-model="form.Areavalue" clearable placeholder="选择区">
                  <el-option v-for="item in form.Area" :key="item.Code" :label="item.Name" :value="item.Code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='20'>
              <el-form-item label="详细地址" style="width:82%;" prop="DetailedAddress">
                <el-input v-model="form.DetailedAddress" type="textarea" :rows="2" placeholder="详细地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- </el-form> -->
          <el-breadcrumb-item>病人病情信息</el-breadcrumb-item>
          <!-- <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="clearfix"> -->
          <el-row>
            <el-col :span='8'>
              <el-form-item label="转出科室" size="small" prop='kstext'>
                <el-select v-model="form.kstext" clearable placeholder="转出科室" @change='kstextdatachange' :disabled='ksdisabled'>
                  <el-option v-for="item in form.kstextdata" :key='item.Id' :label="item.SectionName" :value="item.Id" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="转出医院联系人" prop='doctorname'>
                <el-select v-model="form.doctorname" clearable placeholder="转出医院联系人" @change='doctornamedatachange'>
                  <el-option v-for="item in form.doctornamedata" :key='item.DoctorId' :label="item.DoctorName" :value="item.DoctorId" ></el-option>
                </el-select>
                <!-- <el-input v-model="form.doctorname" placeholder="请输入"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="转出医院联系人手机号" prop='doctorphone'>
                <el-input v-model="form.doctorphone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" class='datainputstyle'>
              <el-form-item label="入院日期" prop='enterdatavalue'>
                <el-date-picker v-model="form.enterdatavalue" type="date" placeholder="选择日期" align="right" @change='enterdatachange'>
                </el-date-picker>
              </el-form-item>
            </el-col>   
            <el-col :span="8" class='datainputstyle'>
              <el-form-item label="出院日期" prop='leavedatavalue'>
                <el-date-picker v-model="form.leavedatavalue" type="date" placeholder="选择日期" align="right" @change='leavedatachange'>
                </el-date-picker>
              </el-form-item>
            </el-col>           
          </el-row>     
          <el-row>
            <el-col :span='20'>
              <el-form-item label="出院诊断" :rules="[{required:true}]" style="width:100%;">
                <!-- <template slot-scope="props"> -->
                <el-col :span='15'>
                  <el-input v-model="form.cy" placeholder="请输入" @change='tabledataseach()' @focus='inputfocus()' @blur='inputblur' class='inputfocuszd'></el-input>
                  <div class="seachtable" v-if='tableshow'>
                    <el-table :data="form.tableData" border @row-click='rowclick' @cell-mouse-enter='cellmouseenter'>
                      <el-table-column type="index" label=" " width="30"></el-table-column>
                      <el-table-column prop="ICD" label="编号" width="80"></el-table-column>
                      <el-table-column prop="DiseaseName" label="诊断名称" width="100"></el-table-column>
                      <el-table-column prop="MnemonicCode" label="诊断拼音" width="100"></el-table-column>
                    </el-table>
                    <div class="block">
                      <el-pagination popper-class='pageclass' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="form.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="form.currentNum" layout="sizes, prev, pager, next, total" :total="total">
                      </el-pagination>
                    </div>
                  </div>
                </el-col>
                <!-- <el-input v-model="form.textarea" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字" style="margin-top:20px;width:80%;"></el-input> -->
                <el-col :span='15'>
                  <div style="margin-top:20px;height:auto;">
                    <el-tag :key="tag" v-for="tag in form.dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" data-num='' v-if='tag'>{{tag}}</el-tag>
                    <el-input class="input-new-tag" v-if="form.inputVisible" v-model="form.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                    </el-input>
                    <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
                  </div>
                </el-col>
                <!-- </template> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='15'>
              <el-form-item label="入院情况" prop='rysituation'>
                <el-input v-model="form.rysituation" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='15'>
              <el-form-item label="院内检查" prop='yncheck'>
                <el-input v-model="form.yncheck" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='15'>
              <el-form-item label="治疗过程" prop='zlgc'>
                <el-input v-model="form.zlgc" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='15'>
              <el-form-item label="出院情况" prop='cysituation'>
                <el-input v-model="form.cysituation" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='15'>
              <el-form-item label="出院医嘱" prop='cyyz'>
                <el-input v-model="form.cyyz" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='15'>
              <el-form-item label="出院去向" prop='cyqx'>
                <el-input v-model="form.cyqx" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span='10' class='update_con'>
              <el-form-item label="附件" class='no_margin_left'>
                <el-button size="small" type="button" class='smbtn el-button el-button--info'  @click="scan_initializeScanPopup([])">扫码上传</el-button>
                <span class="ts-notice">附件格式说明</span>
                <el-tooltip effect="light" content="支持文件格式：pdf，jpg，jpeg，png，doc，docx，xls，xlsx，txt，单个可上传的文件大小不超过20M" placement="bottom" class="ts-notice" style='left:195px;' >
                  <span>
                  <img src="../../assets/img/default/help_icon.png" alt="" style="width: 18px;position: relative;top: 4px;"></span>
                </el-tooltip>
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"                  
                  :on-progress="onUploadProcess"
                  :on-success="handlesuccess" 
                  :before-upload="beforeAvatarUpload"
                  accept="application/pdf,image/jpeg,image/png, aplication/zip,application/msword,application/vnd.ms-excel,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-rar-compressed"
                  :limit="3"
                  :file-list="imageurlarr">
                  <el-button size="small" type="primary" :disabled='isUploadDisabled'>本地上传</el-button>
                </el-upload>                
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="" v-show="imageFile">
                  <div v-show="notImageFile">无法查看</div>
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>     
          <!-- <el-row>
            <el-form-item class='floatLeft widthauto'>
              <p class="ts-notice">
                <i class="el-icon-ts-mark2"></i>
                <span>图片格式上传</span>
              </p>
            </el-form-item>
            <el-form-item class="floatLeft no_margin_left widthauto marginright30">
              <div v-show="useScan" class="logoewm">
                <div id="scanNode" ref="scanNode"></div>
              </div>
              <div class="img_k">
                <img src="" alt="" class="img_small">
              </div>
              <span class="logoewm_span">手机扫一扫上传</span>
            </el-form-item>
            <el-form-item class="floatLeft no_margin_left widthauto">
              <el-upload 
              :action="uploadUrl"
              list-type="picture-card" 
              :on-preview="handlePictureCardPreview" 
              :on-remove="handleRemove" 
              :on-success="handlesuccess" 
              :before-upload="beforeAvatarUpload"
              :file-list = "imageurlarr"
                  multiple
              accept="image/jpeg,image/gif,image/png,image/bmp">              
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <span class="logoewm_span" style="margin-top:15px;">电脑上传</span>
            </el-form-item>
          </el-row> -->
          <el-row>
            <el-col :span='15'>
              <el-form-item label="附件说明" prop='fjsm'>
                <el-input v-model="form.fjsm" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </main>
      <div class="page_footer">
        <el-row :gutter="20" class="flex-align">
          <el-col :span="24">
            <el-button @click='UpStepfirst'>上一步</el-button>
            <!-- <router-link to="/turnout/addtransfer/writetransfer"> 下一步 </router-link> -->
            <el-button type="primary" @click='nexttransfer("form")'>下一步</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 二维码弹框 -->
    <el-dialog
      @close='close'
      title="微信扫码上传"
      :visible.sync="centerDialogVisible"
      width="30%"
      center class='ewm_k'>
      <div v-show="useScan" class="logoewm">
        <div id="scanNode" ref="scanNode"></div>
      </div>
      <div class="img_k">
        <img src="" alt="" class="img_small">
      </div>
      <span class="ewmfont">微信扫一扫，通过手机相册上传图片</span>
    </el-dialog>
    <!-- 第二步 -->
    <div class="secondk" v-if='secondkflog'>
      <main class="main-wrap">
        <el-steps :active="2">
          <el-step title="填写病人信息" description="" style="margin-left:15%;"></el-step>
          <el-step title="填写转诊信息" description=""></el-step>
          <el-step title="信息核实" description="" style='width:auto;'></el-step>
        </el-steps>
        <br>
        <el-breadcrumb-item>病人基本信息</el-breadcrumb-item>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px" class="clearfix">
          <el-row>
            <el-form-item class='mechanismname nodisplay' label="选择机构" style="width:100%;" prop='mechanismvalue'>
              <el-col :span="8">
                <el-select v-model="form.mechanismvalue==''?form.mechanismvalue='请选择':form.mechanismvalue" placeholder="请选择" clearable @change='mechanismvaluechange' filterable>
                  <el-option v-for="item in form.mechanism" :key="item.HospitalId" :label="item.HospitalName" :value="item.HospitalId">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span='16' v-if='form.mechanismzs != ""'>
                <p class="ts-notice">
                  <i class="el-icon-ts-mark2"></i>
                  <span>{{form.mechanismzs}}</span>
                </p>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item class='mechanismname nodisplay' label="社区服务包" style="width:100%;" v-if='form.checkfalg == false'>
              <el-col :span='12'>
                <el-checkbox-group v-model="form.checkList" @change='checklistchagne'>
                  <el-checkbox v-for='item in form.checkdate' :key='item.Id' :label="item.Name" :value='item.Id'></el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="转诊原因" style="width:100%;" prop="reasonvalue">
              <el-col :span="8">
                <el-select v-model="form.reasonvalue" clearable placeholder="请选择" class='reasonclass'>
                  <el-option v-for="item in form.reason" :key="item.id" :label="item.text" :value="item.text">
                  </el-option>
                </el-select>
                <el-input v-model="reasontextarea" type="textarea" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="多行文字" style="margin-top:20px;" prop="reasontextarea" class='reasontextclass' v-if='form.reasonvalue == "其他"'></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="病人居住地址" style="width:100%;">
              <span>{{provincename}}{{cityname}}{{areaname}}</span>              
            </el-form-item>
            <el-form-item label="详细地址" style="width:100%;">
              <span>{{form.DetailedAddress}}</span>              
            </el-form-item>
            <el-breadcrumb-item>距离该病人居住地址最近的社区卫生服务中心是{{form.nearbyHospitalName}}</el-breadcrumb-item>
            <div class="mork_k">
              <div class="mork_out" v-show="mapshowcircle">
                <div class="mork el-icon-loading"></div>
              </div>

              <!-- <b class="map_title">丰产路社区卫生服务中心</b> -->
              <!-- <div id="container" tabindex="0" style="width:500px;height:500px;"></div> -->
              <div id="mapDiv" class="map" tabindex="0" style="width:40%;height:500px;"></div>
               <!-- <input type="text" placeholder="请输入关键字进行搜索" id="tipinput"> -->
              <div class='panel' style="display:none;">选择切换省市：
                <select open id='subDistricts'></select>
              </div>
            </div>
          </el-row>
        </el-form>
      </main>
      <div class="page_footer">
        <el-row :gutter="20" class="flex-align">
          <el-col :span="24">
            <el-button @click='secondprovtransfer()'>上一步</el-button>
            <el-button type="primary" @click='secondnexttransfer()'>下一步</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 第三步 -->
    <div class="thirdk" v-if='thirdflog'>
      <main class="main-wrap clearfix">
        <el-steps :active="3">
          <el-step title="填写病人信息" description="" style="margin-left:15%;"></el-step>
          <el-step title="填写转诊信息" description=""></el-step>
          <el-step title="信息核实" description="" style='width:auto;'></el-step>
        </el-steps>
        <br>
        <el-breadcrumb-item>转诊信息</el-breadcrumb-item>
        <ul class="con_ul">
          <li class="con_li">
            <span class="con_title">转入医院</span>
            <span class="con_con">{{form.mechanismname}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">转诊原因</span>
            <span class="con_con">{{form.reasonvalue == '其他' ? '' : form.reasonvalue}}{{form.reasonvalue != '其他' ? '' : reasontextarea}}</span>
          </li>
        </ul>
        <el-breadcrumb-item>患者基本信息</el-breadcrumb-item>
        <ul class="con_ul">
          <li class="con_li">
            <span class="con_title">病人姓名</span>
            <span class="con_con">{{form.PatientName}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">病人性别</span>
            <span class="con_con">{{form.PatientSex==0?'女':'男'}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">病人年龄</span>
            <span class="con_con">{{form.PatientAge}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">病人身份证号</span>
            <span class="con_con">{{form.PatientCardId}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">病人手机号码</span>
            <span class="con_con">{{form.PatientPhone}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">备用联系人</span>
            <span class="con_con">{{form.ContactName}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">备用联系人手机号码</span>
            <span class="con_con">{{form.EmergencyPhone}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">病人身份职业</span>
            <span class="con_con">{{form.PatientProfession}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">就诊卡ID</span>
            <span class="con_con">{{form.MedicalCard}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">医保报销类别</span>
            <span class="con_con">{{form.medicaltypetrue}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">医保卡类型</span>
            <span class="con_con">{{form.MedicalCardTypetrue}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">医保卡卡号</span>
            <span class="con_con">{{form.MedicalCardId}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">病人居住地址</span>
            <span class="con_con">{{provincename}}{{cityname}}{{areaname}}{{form.DetailedAddress}}</span>
          </li>
        </ul>
        <el-breadcrumb-item>病人病情信息</el-breadcrumb-item>
        <ul class="con_ul">
          <li class="con_li">
            <span class="con_title">转出科室</span>
            <span class="con_con">{{form.kstexttrue}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">转出医院联系人</span>
            <span class="con_con">{{form.doctorname1}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">转出医院联系人手机号</span>
            <span class="con_con">{{form.doctorphone}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">入院日期</span>
            <span class="con_con">{{form.enterdatavaluetrue}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">出院日期</span>
            <span class="con_con">{{form.leavedatavaluetrue}}</span>
          </li>          
          <li class="con_li" style="width:80%;">
            <span class="con_title">出院诊断</span>
            <div class="con_record" style="margin: -38px 0 0 145px;border:0; height:auto;">
              <ul class="record_ul clearfix" style="height:auto;">
                <li class="record_li">
                  <span class="record_text">{{form.dynamicTags.toString()}}</span>
                </li>
              </ul>
            </div>
            <!-- <span class="con_con">{{form.dynamicTags.toString()}}</span> -->
          </li>
          <!-- <li class="con_li" style="width:80%;">
            <span class="con_title">出院诊断</span>
            <div class="con_record" :class='{autoheight:form.textarea11.length<600}' v-if='form.textarea11'>
              <ul class="record_ul clearfix" :class='{autoheight:form.textarea11.length<600}'>
                <li class="record_li">
                  <span class="record_text">{{form.textarea11}}</span>
                </li>
              </ul>
              <span class="record_more" @click='moreclick()' v-if='form.textarea11.length>600&&morebtn==false'>查看更多</span>
              <span class="record_more" @click='smoreclick()' v-if='form.textarea11.length>600&&morebtn' style="bottom:20px;">收起</span>
            </div>
          </li> -->
          <li class="con_li" style="width:80%;">
            <span class="con_title">入院情况</span>
            <div class="con_record" style="margin: -38px 0 0 145px;border:0; height:auto;">
              <ul class="record_ul clearfix" style="height:auto;">
                <li class="record_li">
                  <span class="record_text">{{form.rysituation}}</span>
                </li>
              </ul>
            </div>
            <!-- <span class="con_con">{{form.rysituation}}</span> -->
          </li>
          <li class="con_li" style="width:80%;">
            <span class="con_title">院内检查</span>
            <div class="con_record" style="margin: -38px 0 0 145px;border:0; height:auto;">
              <ul class="record_ul clearfix" style="height:auto;">
                <li class="record_li">
                  <span class="record_text">{{form.yncheck}}</span>
                </li>
              </ul>
            </div>
            <!-- <span class="con_con">{{form.yncheck}}</span> -->
          </li>
          <li class="con_li" style="width:80%;">
            <span class="con_title">治疗过程</span>
            <div class="con_record" style="margin: -38px 0 0 145px;border:0; height:auto;">
              <ul class="record_ul clearfix" style="height:auto;">
                <li class="record_li">
                  <span class="record_text">{{form.zlgc}}</span>
                </li>
              </ul>
            </div>
            <!-- <span class="con_con">{{form.zlgc}}</span> -->
          </li>
          <li class="con_li" style="width:80%;">
            <span class="con_title">出院情况</span>
            <div class="con_record" style="margin: -38px 0 0 145px;border:0; height:auto;">
              <ul class="record_ul clearfix" style="height:auto;">
                <li class="record_li">
                  <span class="record_text">{{form.cysituation}}</span>
                </li>
              </ul>
            </div>
            <!-- <span class="con_con">{{form.cysituation}}</span> -->
          </li>
          <li class="con_li" style="width:80%;">
            <span class="con_title">出院医嘱</span>
            <div class="con_record" style="margin: -38px 0 0 145px;border:0; height:auto;">
              <ul class="record_ul clearfix" style="height:auto;">
                <li class="record_li">
                  <span class="record_text">{{form.cyyz}}</span>
                </li>
              </ul>
            </div>
            <!-- <span class="con_con">{{form.cyyz}}</span> -->
          </li>
          <li class="con_li" style="width:80%;">
            <span class="con_title">出院去向</span>
            <div class="con_record" style="margin: -38px 0 0 145px;border:0; height:auto;">
              <ul class="record_ul clearfix" style="height:auto;">
                <li class="record_li">
                  <span class="record_text">{{form.cyqx}}</span>
                </li>
              </ul>
            </div>
            <!-- <span class="con_con">{{form.cyqx}}</span> -->
          </li>
          <li class="con_li" style="width:100%;margin-bottom: 50px;">
            <span class="con_title">图片</span>
            <div class="img_con" style="margin:-20px 0 0 135px;">
              <ul class="img_ul">
                <li class="img_li" v-for="(item,index) in thirdimage.thirdimage" :key="index" style="border:1px solid #ddd;border-radius:18px;width:auto;height:auto;padding:5px 10px;margin-bottom:10px;">
                  <span @click='bigimg(item.url)' style="cursor:pointer;">{{item.name}}</span>
                  <!-- <img :src="item" alt="" class="con_img" @click='bigimg(item)'> -->
                </li>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </ul>
            </div>
          </li>
          <li class="con_li" style="width:80%;">
            <span class="con_title">附件说明</span>
            <div class="con_record" style="margin: -38px 0 0 145px;border:0; height:auto;">
              <ul class="record_ul clearfix" style="height:auto;">
                <li class="record_li">
                  <span class="record_text">{{form.fjsm}}</span>
                </li>
              </ul>
            </div>
            <!-- <span class="con_con">{{form.fjsm}}</span> -->
          </li>
        </ul>
        <!-- <el-breadcrumb-item>转诊信息</el-breadcrumb-item>
        <ul class="con_ul">
          <li class="con_li">
            <span class="con_title">接诊机构</span>
            <span class="con_con">{{form.mechanismname}}</span>
          </li>
          <li class="con_li">
            <span class="con_title">转诊原因</span>
            <span class="con_con">{{form.reasonvalue}}</span>
          </li>
        </ul> -->
      </main>
      <div class="page_footer">
        <el-row :gutter="20" class="flex-align">
          <el-col :span="24">
            <el-button @click='thirdprovtransfer()'>上一步</el-button>
            <el-button type="primary" style="width:78px;" @click='Submitdata' duration='500' :disabled='btndis'>提交</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import '../../assets/sass/addtransfer.scss';
import '../../assets/jquery/jquery.min.js';
import "@/assets/js/cos-js-sdk-v4.js"
import "@/assets/js/cos-vue.js";
import QRCode from 'qrcodejs2'
import { mapGetters, mapActions } from 'vuex';
import { apiurl,linkUrl } from '../../service/api.js';
import axios from 'axios';
import qs from 'qs';
export default {
  data() {
    var validPCard = (rule,value,callback) => {
      var idCardNoUtil = {
          /*省,直辖市代码表*/
          provinceAndCitys: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
          31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
          45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
          65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},

          /*每位加权因子*/
          powers: ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],
          
          /*第18位校检码*/
          parityBit: ["1","0","X","9","8","7","6","5","4","3","2"],

          /*性别*/
          genders: {male:"男",female:"女"},

          /*校验地址码*/
          checkAddressCode: function(addressCode){
              var check = /^[1-9]\d{5}$/.test(addressCode);
              if(!check) return false;
              if(idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0,2))]){
                  return true;
              }else{
                  return false;
              }
          },

          /*校验日期码*/
          checkBirthDayCode: function(birDayCode){
              var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
              if(!check) return false;    
              var yyyy = parseInt(birDayCode.substring(0,4),10);
              var mm = parseInt(birDayCode.substring(4,6),10);
              var dd = parseInt(birDayCode.substring(6),10);
              var xdata = new Date(yyyy,mm-1,dd);
              if(xdata > new Date()){
                  return false;//生日不能大于当前日期
              }else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
                  return true;
              }else{
                  return false;
              }
          },
          
          /*计算校检码*/
          getParityBit: function(idCardNo){
              var id17 = idCardNo.substring(0,17);    
              /*加权 */
              var power = 0;
              for(var i=0;i<17;i++){
                  power += parseInt(id17.charAt(i),10) * parseInt(idCardNoUtil.powers[i]);
              }              
              /*取模*/ 
              var mod = power % 11;
              return idCardNoUtil.parityBit[mod];
          },
          
          /*验证校检码*/
          checkParityBit: function(idCardNo){
              var parityBit = idCardNo.charAt(17).toUpperCase();
              if(idCardNoUtil.getParityBit(idCardNo) == parityBit){
                  return true;
              }else{
                  return false;
              }
          },
          
      };
      var idCardInfo = {
          gender:"",   //性别
          birthday:"" // 出生日期
      };
      var check = false;
      const self = this;
      if(!value) {
          //清空
          console.log('这里么？')
          self.clearFillContent();
          self.form.PatientAge = '';
          self.patiendIdStore = "000";
          return callback(new Error('请填写身份证号码'));
      }else if(value.length == 15){
          //校验身份证                
          if(!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value)) return callback(new Error('15位身份证号码填写错误'));
          //校验地址码
          if(!idCardNoUtil.checkAddressCode(value.substring(0,6))) return callback(new Error('15位身份证号码地址填写错误'));
          //校验日期码
          if(!idCardNoUtil.checkBirthDayCode('19' + value.substring(6,12))) return callback(new Error('15位身份证号码出生日期填写错误'));
          //校验正确以后，获取需要信息
          if(value != self.patiendIdStore) {
              self.getPatientInfo();
          }
          return callback();
      }else if(value.length == 18){
          //校验身份证
          if(!/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(value)) return callback(new Error('18位身份证号码填写错误'));
          //校验地址码
          if(!idCardNoUtil.checkAddressCode(value.substring(0,6))) return callback(new Error('18位身份证号码地址填写错误'));
          //校验日期码
          if(!idCardNoUtil.checkBirthDayCode(value.substring(6,14))) return callback(new Error('18位身份证号码出生日期填写错误'));
          //验证校检码
          if(!idCardNoUtil.checkParityBit(value)) return callback(new Error('18位身份证号码校验位填写错误'));
          //校验正确以后，获取需要信息
          console.log('进来',value,self.patiendIdStore)
          if(value != self.patiendIdStore) {
            self.getPatientInfo();
          }           
          return callback();
      }else {     
          // self.clearFillContent(); 
          self.form.PatientAge = '';          
          return callback(new Error('身份证号码填写错误'));
      }
    }
    var validMedicalCard = (rule, value, callback) => {
      setTimeout(() => {
        var reg=['']
        console.log(value,typeof(value))
        if (!(/^[0-9a-zA-Z]*$/.test(value))) {
          callback(new Error('请输入正确的就诊卡号'));
        } else {
          callback();
          // if (value.length == 11) {
          //   callback();
          // } else {
          //   callback(new Error('手机号必须是11位'));
           
          // }
        }
      }, 1000);
    }
    var checkphone = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('电话必填'));
      // }
      setTimeout(() => {
        if ((/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value))) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
          // if (value.length == 11) {
          //   callback();
          // } else {
          //   callback(new Error('手机号必须是11位'));
           
          // }
        }
      }, 1000);
    }
    var doccheckphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('医生电话必填'));
      }
      setTimeout(() => {
        console.log(value,typeof(value))
        if (!Number(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 1000);
    }
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }else if((/[^\d]/.test(value))){
        return callback(new Error('请输入数字值'));
      }else{
        if(value>999){
          return callback(new Error('年龄为0-999'));
        }else{
          callback();
        }        
      }
    };
    var Patientbri = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('出生日期不能为空'));
      }else{
        callback();
      }
    };
    // 验证入院日期
    var checkInApplyHosDate = (rule, value, callback) => {
      var self = this;
      var OutTime = self.form.leavedatavalue;
      if (OutTime != '' && new Date(value).getTime() > new Date(OutTime).getTime()) {
        callback(new Error('入院日期不能大于出院日期'));
      } else {
        callback();
      }
    };
    // 验证出院日期
    var checkOutApplyHosDate = (rule, value, callback) => {
      var self = this;
      var InTime = self.form.enterdatavalue;
      if (InTime != '' && new Date(value).getTime() < new Date(InTime).getTime()) {
        callback(new Error('出院日期不能小于入院日期'));
      } else {
        callback();
      }
    };
    return {
      zzdataflag:false,//转诊申请时间是否显示
      value: '',
      radio1: '选中且禁用',
      // PatientCardId: '',
      tableshow: false,
      tableflag:0,//为0时，table消失
      tablefyflag:0,
      restaurants: [],
      state3: '',
      total: 0,
      firstkflog: true,
      secondkflog: false,
      thirdflog: false,
      mapshowcircle: false,
      maphospitalarr: '',
      Latitudearr: [],
      Longitudearr: [],
      reasontextarea: '',//转诊原因其他时显示
      centerDialogVisible: false,
      form: {
        MakeupIf: 0,
        zzdatavalue: '',//转诊申请时间
        zzdatavaluetrue: '',//提交时的正确格式
        PatientName: '',
        PatientCardId: '',
        PatientAge: null,
        Patientbri: '',
        PatientProfession:'',//病人身份职业
        MedicalCard:'',//就诊卡ID
        MedicalCardId:'',//医保卡卡号
        MedicalType: "",//医保报销类别
        medicaltypetrue: '',//医保报销类别 确认页面正确格式
        medicaltypedata: [],
        MedicalCardType: "",//医保卡类型 
        MedicalCardTypetrue: '',//医保卡类型 确认页面正确格式
        medicalcardtypedata: [],
        enterdatavalue: '',//入院日期
        enterdatavaluetrue: '',//确认页面正确格式
        leavedatavalue: '',//出院日期
        leavedatavaluetrue: '',//确认页面正确格式
        PatientPhone: null,
        ContactName:'',//备用联系人
        EmergencyPhone:'',//备用联系人电话
        rysituation: '',//入院情况
        yncheck: '',//院内检查
        zlgc: '',//治疗过程
        cysituation: '',//出院情况
        cyyz: '',//出院医嘱
        cyqx: '',//出院去向
        textarea: '',
        textarea1: '',//出院记录
        textarea11:'',//消失后重新传的参数
        PatientSex: '1',
        PatientSexchina: '',
        Provincevalue:'',
        Province: [],
        chinaprovince: '',
        City: [],
        Cityvalue: '',
        Area: [],
        Areavalue: '',
        DetailedAddress: '',//详细地址
        kstextdata: [],
        kstext: '',
        kstexttrue: '',//提交接口中文传参
        kstext1:'',//消失后重新传的参数
        doctorname: '',
        doctornamedata: [],
        doctorname1:'',//消失后重新传的参数
        doctorphone:null,
        doctorphone1:null,//消失后重新传的参数
        restaurants: [],
        state4: '',
        timeout: null,
        cy: '',
        tableData: [],
        currentPage: 1,
        currentNum: 10,
        checkList: [],
        checkListId: [],//服务包编号
        mechanism: [],//选择机构
        mechanismvalue: '',
        mechanismname: '',
        mechanismzs: '',
        reason: [],
        reasonvalue: '',
        uploadurl: apiurl + 'PC/DischargedPatient/UploadDischargeRecordImg',
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        uploadUrl:'',
        checkdate: [],
        checkfalg:true,
        filesizecont:0,
        nearbyHospitalName: '',//最近的社区服务中心字段
      },
      ICDarr: [],
      index: 0,

      useScan: false,
      longPollingUrl : "https://diagnose.zwjk.com",
      scan_caseId : "",   //随机生成数
      scan_type : 1,      //上传的类型
      scan_count : "",    //扫码上传的文件显示。空表示不限制，1表示1个。
      scan_upload_local_type : 0 ,//本地上传的方式。0腾讯云服务器，1cos服务器。
      rules: {
        zzdatavalue: [
          { type: 'date', required: true, message: '日期必填', trigger: 'change' },
        ],
        PatientName: [
          { required: true, message: '姓名必填', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        PatientCardId: [
          { required: true, validator: validPCard, trigger: 'blur'}
            // 
        ],
        MedicalCard: [
          { required: false, validator: validMedicalCard, trigger: 'blur'}
            // 
        ],
        PatientAge: [
          { required: true, validator: checkAge , trigger: 'blur'},
          // { min: 0, max: 3, message: '年龄在 0 到 999 ', trigger: 'blur' }
        ],
        Patientbri: [
          { required: true, validator: Patientbri, trigger: 'blur'},
          // { min: 1, max: 3, message: '年龄必填', trigger: 'change' }
        ],
        PatientPhone: [
          { required: true, validator: checkphone , trigger: 'blur' },
          // { min: 11, max: 11, message: '请输入有效的手机号码', trigger: 'blur' }
        ],
        EmergencyPhone: [
          { required: false, validator: checkphone , trigger: 'blur' },
          // { min: 11, max: 11, message: '请输入有效的手机号码', trigger: 'blur' }
        ],
        ContactName: [
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        PatientProfession: [
          { min: 0, max: 15, message: '长度在 15 字符以内', trigger: 'blur' }
        ],
        kstext: [
          { required: true, message: '科室必填', trigger: 'blur' }
        ],
        doctorname: [
          { required: true, message: '医生姓名必填', trigger: 'blur' },
        ],
        doctorphone: [
          { required: true, validator: doccheckphone , trigger: 'blur' }
        ],        
        mechanismvalue: [
          { required: true, message: '转诊机构必选', trigger: 'change' }
        ],
        reasonvalue: [
          { required: true, message: '转诊原因必选', trigger: 'change' }
        ],
        Provincevalue: [
          { required: true, message: '省必选', trigger: 'blur'}
        ],
        Cityvalue: [
          { required: true, message: '市必选', trigger: 'blur' }
        ],
        Areavalue: [
          { required: true, message: '区必选', trigger: 'blur' }
        ],
        DetailedAddress: [
          { required: true, message: '详细地址必填必填', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 50 字符以内', trigger: 'blur' }
        ],
        MedicalType: [
          { required: false, message: '医保报销类别必填', }
        ],
        MedicalCardType: [
          { required: false, message: '医保卡类型必填', }
        ],        
        enterdatavalue: [
          {validator: checkInApplyHosDate, trigger: 'change'}
        ],
        leavedatavalue: [
          {validator: checkOutApplyHosDate, trigger: 'change'}
        ],
        rysituation: [
          { min: 0, max: 200, message: '长度在 200 字符以内', trigger: 'blur' }
        ],
        yncheck: [
          { min: 0, max: 200, message: '长度在 200 字符以内', trigger: 'blur' }
        ],
        zlgc: [
          { min: 0, max: 400, message: '长度在 400 字符以内', trigger: 'blur' }
        ],
        cysituation: [
          { min: 0, max: 400, message: '长度在 400 字符以内', trigger: 'blur' }
        ],
        cyyz: [
          { min: 0, max: 200, message: '长度在 200 字符以内', trigger: 'blur' }
        ],
        cyqx: [
          { min: 0, max: 100, message: '长度在 100 字符以内', trigger: 'blur' }
        ],
        fjsm: [
          { min: 0, max: 100, message: '长度在 100 字符以内', trigger: 'blur' }
        ],
      },
      dialogVisible: false,
      dialogImageUrl: '',
      imageurlarr: [],
      thirdimage: {},
      cityname: '',
      areaname: '',
      provincename: '',
      DiagnoseNames: [],//出院诊断数组
      lat: '',
      long: '',
      ImageUrl:[],//提交保存时的图片链接
      ImageTitle:[],//提交保存时的图片名字
      btndis:false,//提交按钮判断
      morebtn:false,//查看更多按钮
      getPatientInfoflog:false,//判断是否返填
      nowLongitude:null,//经度
      nowLatitude:null,//纬度
      isUploadDisabled: false, // 本地上传按钮是否禁用
      notImageFile: false, // 预览附件时，是否是图片
      imageFile: true,  // 预览附件时，是否是图片
      patiendIdStore: '000',               //暂存上次身份证号
      ksdisabled:false//判断科室是否可选
    }
  },
  computed: {
    ...mapGetters(['token', 'seedpatiendid','resend1','transferTreatmentBaseId', 'hosptialid', 'sectionid', 'zzpower']),
  },
  mounted() {
    var self = this;
    // document.addEventListener('click',function(e){
    //   // if(e.target.className == 'el-input__inner'){
    //   //   console.log($('.el-input__inner').parent().parent().parent().parent())
    //   // }
    //   if(e.target.className!='cell' && e.target.className!='number' && e.target.className != 'el-input__inner'){
    //     self.tableshow = false;
    //   }
    // })
    self.getProvince();
      //PC_出院病人新增转诊信息
    console.log(self.seedpatiendid,'跳过来的')
    axios.get(apiurl.GetTurnDownByDPatientId, {
      params: {
        dPatientId: self.seedpatiendid,
        transferTreatmentBaseId:self.transferTreatmentBaseId,
        token: self.token
      }
    })
    .then(function(response) {
      var data = response.data.extra;
      console.log(data,'data')
      self.form.PatientName = data.PatientModel.PatientName;
      self.form.PatientAge=data.PatientModel.PatientAge;
      self.form.PatientSex=data.PatientModel.PatientSex;
      self.form.PatientCardId = data.PatientModel.PatientCardId;
      self.patiendIdStore = data.PatientModel.PatientCardId;
      self.form.Patientbri=data.PatientModel.PatientBirth
      self.form.PatientPhone = data.PatientModel.PatientPhone;
      self.form.EmergencyPhone = data.PatientModel.PatientTelePhone||'';
      self.form.ContactName = data.PatientModel.ContactName;
      self.form.MedicalCardId = data.PatientModel.MedicalCardId;//医保卡卡号
      self.form.Provincevalue = data.PatientModel.Province;
      self.form.Areavalue = data.PatientModel.Area;
      self.form.Cityvalue = data.PatientModel.City;
      self.form.DetailedAddress=data.PatientModel.DetailedAddress;
      self.form.MedicalCardType = data.PatientModel.MedicalCardType.toString();
      self.form.MedicalType = data.PatientModel.MedicalType.toString();
      // self.form.kstext = data.IllnessModel.SectionName;
      // self.form.doctorname = data.IllnessModel.DoctorName;
      // self.form.doctorphone = data.IllnessModel.DoctorPhone;
      // self.form.mechanismvalue=682;
      // self.form.mechanismvalue = data.ReferralModel.MedicalSignHospitalId;
      // self.form.mechanismzs = data.ReferralModel.TurnOnTreatmentDetail;
      self.ICDarr = data.IllnessModel.DischargeDiagnosisDiseaseId.split(',');
      self.form.dynamicTags=data.IllnessModel.DischargeDiagnosisDiseaseText.split(",");
      self.form.cysituation=data.IllnessModel.DischargeRecord;
      if(data.IllnessModel.FileUrl!=null){
        data.IllnessModel.FileUrl.forEach(function(v,i){
          self.imageurlarr.push({name: data.IllnessModel.FileName[i], url: v})
          self.ImageUrl.push(v)
        })
      } 
    })
    .catch(function(error) {
      console.log(error);
    });
    self.set_resend1(0);
    self.MedicalTypeDate();
    self.MedicalCardTypeDate();
    self.SectionDate();
  },
  methods: {
    ...mapActions([
      'set_seedpatiendid','set_resend1','set_transferTreatmentBaseId'
    ]), 
    //转诊申请日期
    zzdatachange(val) {
      this.zzdatavaluetrue = val;
    },
    //医保报销类别
    medicalchange(val) {
      var selectedIndex = this.form.MedicalType;
      if(!selectedIndex == false){
        var itemObj = this.form.medicaltypedata.find((value, index, item) => {
          return value.id == selectedIndex;
        });
        this.form.medicaltypetrue =itemObj.text;
      }      
    },
    //医保卡类型
    medicalcardchange(val) {
      var selectedIndex = this.form.MedicalCardType;
      if(!selectedIndex == false){
        var itemObj = this.form.medicalcardtypedata.find((value, index, item) => {
          return value.id == selectedIndex;
        });
        this.form.MedicalCardTypetrue =itemObj.text;
      }      
    },
    //转出科室
    kstextdatachange(val) {
      this.form.doctorname ='';
      this.form.doctorphone = '';
      if(val != null){
        var selectedIndex = this.form.kstext;
        var itemObj = this.form.kstextdata.find((value, index, item) => {
          return value.Id == selectedIndex;
        });
        console.log(this.form.kstext)
        this.form.kstexttrue = itemObj.SectionName;
      }   
      this.DoctorData();   
    },
    //转出医院联系人
    doctornamedatachange(val) {
      var self = this;
      if(val != null){
        var selectedIndex = this.form.doctorname;
        setTimeout(function(){
          var itemObj = self.form.doctornamedata.find((value, index, item) => {
            return value.DoctorId  == selectedIndex;
          });
          self.form.doctorname1 = itemObj.DoctorName;
          self.form.doctorphone = itemObj.MobilePhone;
        },500)
      }   
    },
    //入院日期
    enterdatachange(val) {
      this.form.enterdatavaluetrue = val;
    },
    //出院日期
    leavedatachange(val) {
      this.form.leavedatavaluetrue = val;
    },
    //服务包change事件
    checklistchagne(val) {
      var self = this;
      self.form.checkListId = [];
      this.form.checkdate.forEach(function(v,i){
        val.forEach(function(v1,i1){
          if(v.Name == v1){
            self.$set(self.form.checkListId,i,v.Id);
          }
        })
      })
    },
    // 医保报销类别
    MedicalTypeDate() {
      var self = this;
      axios.get(apiurl.GetMedicalReimburseType, {
        params: {
        }
      })
      .then(function(response) {
        self.form.medicaltypedata=response.data.rows;
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    // 医保卡类型
    MedicalCardTypeDate() {
      var self = this;
      axios.get(apiurl.GetMedicalCardType, {
        params: {
        }
      })
      .then(function(response) {
        self.form.medicalcardtypedata=response.data.rows;
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    // 转出科室下拉
    SectionDate() {
      var self = this;
      setTimeout(() => {
        console.log(self.hosptialid,'self.hosptialid')
        if(!self.hosptialid == false){
          axios.get(apiurl.GetSectionByHospitalIDDown, {
            params: {
              hospitalID:self.hosptialid,
              token:self.token
            }
          })
          .then(function(response) {
            self.form.kstextdata=response.data.rows;
              console.log(self.zzpower,'self.zzpower')
            if(self.zzpower == 10){
              self.form.kstext = '';
            }else if(self.zzpower == 1){
              self.form.kstext = self.sectionid;
              self.ksdisabled = true;
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        }      
      },500)      
    },
    //转出医院联系人 下拉
    DoctorData() {
      var self = this;
      setTimeout(() => {
        axios.get(apiurl.GetDoctorsBySectionId, {
          params: {
            hospitalId:self.hosptialid,
            sectionId:self.form.kstext,
            token:self.token
          }
        })
        .then(function(response) {
          self.form.doctornamedata=response.data.rows;
        })
        .catch(function(error) {
          console.log(error);
        });
      },500)      
    },
    radiochange(label) {
      label == 0 ? this.zzdataflag = false : this.zzdataflag = true;
    },
    //二维码弹框回调
    close() {
      $('.el-dialog__body').find('canvas').remove();
      $('.el-dialog__body').find('img').remove();
    },
    clearFillContent() {
      const self = this;
      self.form.PatientName = "";
      // self.form.PatientCardId = "";
      self.form.PatientSex = 3;
      self.form.PatientAge = "";
      self.form.PatientPhone = "";
      self.form.Provincevalue = "";
      self.form.Cityvalue = "";
      self.form.Areavalue = "";
      self.form.DetailedAddress = "";
      self.form.MedicalType = "";
      self.form.MedicalCardType = "";
      self.form.MedicalCardId = "";
      self.form.PatientCondition = "";
      self.form.PatientComplaint = "";
      self.form.OthersRemark = "";
      self.form.Patientbri="";
    },
    getPatientInfo() {                                //根据病人身份证号获取信息
      var self = this;
      console.log('接口',self.resend1);      
      if(self.resend1!=2){
        axios.get(apiurl.GetReferralPatientView, {
          params: {
            token: self.token,
            cardId:self.form.PatientCardId
          }   
        }).then(function (res) {
          var data=res.data.extra;
            console.log(res.data.extra)
            if(res.data.suc){
                if(res.data.extra) {
                  //self.extra = res.data.extra;------错误赋值，会覆盖患者病情信息
                  console.log(self.form.PatientCardId ,data.PatientCardId)
                  // if(self.form.PatientCardId != data.PatientCardId){
                    self.getPatientInfoflog=false;
                  // }
                  if(!self.getPatientInfoflog) {
                    self.getPatientInfoflog=true;
                    self.form.PatientName = data.PatientName;
                    self.form.PatientCardId = data.PatientCardId;
                    self.form.PatientPhone = data.PatientPhone;
                    self.form.Provincevalue = data.Province;
                    self.form.Areavalue = data.Area;
                    self.form.Cityvalue = data.City;
                    self.form.DetailedAddress=data.DetailedAddress;
                    self.form.ContactName = data.ContactName;
                    self.form.Provincevalue = data.Province;
                    self.form.MedicalCardType = data.MedicalCardType.toString();
                    self.form.MedicalType = data.MedicalType.toString();
                    self.form.MedicalCardId = data.MedicalCardId;//医保卡卡号
                    self.form.EmergencyPhone = data.PatientTelePhone||'';//备用联系人手机号
                    // self.form.kstext = data.SectionName;
                    // self.form.doctorname = data.DoctorName;
                    // self.form.doctorphone = data.DoctorPhone;
                    // self.form.mechanismzs = data.TurnOnTreatmentDetail;
                    // self.form.textarea1=data.DischargeRecord;
                    self.form.PatientAge=data.PatientAge;
                    self.form.PatientSex=data.PatientSex;
                    console.log(data.PatientAge,'data.PatientAge')
                    self.patiendIdStore = res.data.extra.PatientCardId; //请求完以后将Id存到临时变量区
                    // let date = new Date();
                    // let age = Number(date.getFullYear()) - self.getIdCardInfo(self.form.PatientCardId).birthday + 1;
                    // let gender = self.getIdCardInfo(self.form.PatientCardId).gender;
                    // self.form.PatientAge = age;
                    // self.form.Patientbri = self.getIdCardInfo(self.form.PatientCardId).Patientbri;
                    // if(gender=="female") {
                    //   self.form.PatientSex = 0;
                    // }else if(gender=="male") {
                    //   self.form.PatientSex = 1;
                    // }
                  }
                }else {
                  console.log(res.data.mes == "未查到患者信息");
                  self.patiendIdStore = '111';
                  // self.clearFillContent();
                  let date = new Date();
                  let age = Number(date.getFullYear()) - self.getIdCardInfo(self.form.PatientCardId).birthday;
                  let gender = self.getIdCardInfo(self.form.PatientCardId).gender;
                  self.form.PatientAge = age;
                  self.form.Patientbri = self.getIdCardInfo(self.form.PatientCardId).Patientbri;
                  if(gender=="female") {
                      self.form.PatientSex = 0;
                  }else if(gender=="male") {
                      self.form.PatientSex = 1;
                  }
                }
            }
        }).catch(function(error) {
          console.log(error);
        });
      }
    },
    //获取信息
    getIdCardInfo: function(idCardNo){
      var idCardInfo = {
        gender:"",   //性别
        birthday:"",// 出生年份
        Patientbri:''//年月日
      };
      if(idCardNo.length==15){
        var aday = '19' + idCardNo.substring(6,12);
        idCardInfo.birthday=aday.substring(0,4);
        idCardInfo.Patientbri=aday.substring(0,4)+'-'+aday.substring(4,6)+'-'+aday.substring(6,8);
        if(parseInt(idCardNo.charAt(14))%2==0){
            idCardInfo.gender="female";
        }else{
            idCardInfo.gender="male";
        }     
      }else if(idCardNo.length==18){
        var aday = idCardNo.substring(6,14);
        idCardInfo.Patientbri=aday.substring(0,4)+'-'+aday.substring(4,6)+'-'+aday.substring(6,8);
        idCardInfo.birthday=aday.substring(0,4);
        if(parseInt(idCardNo.charAt(16))%2==0){
            idCardInfo.gender="female";
        }else{
            idCardInfo.gender="male";
        }           
      }
      return idCardInfo;
    },       
    bigimg(item){
      var self=this;
      self.dialogVisible=true;
      self.dialogImageUrl = item;
    },
    /***********************************二维码扫描相关代码******************/    
    //初始化二维码【节点、URL地址】
    initQR(qrcodeNode,qrcodeNodeURL) {
      let qrcode = new QRCode(qrcodeNode, {
        text: qrcodeNodeURL,
        width: 140,
        height: 140,
        colorDark: "#000000",
        colorLight: "#ffffff"
      });
    },
    //打开二维码事件
    scan_initializeScanPopup (fileList) {
      this.centerDialogVisible = true
      const self = this;
      //创建弹窗元素
      self.scan_createAllElement();
      //每一次打开都是一次新的id
      self.scan_caseId = self.scan_getGuid();
      //初始化上传张数
      self.scan_count = 2;
      //创建扫描二维码
      self.scan_createQrcode();
      //向后台请求是否有照片上传，没有的话反复请求，有的话则执行
      self.scan_getScanFile(self.scan_caseId);
    },
    scan_createAllElement () {
      this.useScan = true;
    },
    //获取uuid
    scan_getGuid() {
      return '1xxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 10 | 0;
        return r.toString(10);
      });
    },
    //创建二维码
    scan_createQrcode () {
      const self = this;
      axios.post(self.longPollingUrl + "/longPolling/createContent.htm", qs.stringify({
        "caseId": self.scan_caseId,
        "type": self.scan_type,
        "count": self.scan_count
      }))
      .then(function(response) {
        var resData = response.data;
        var qrl = null;
        var scanNode = null;
        if(resData.ret_code === 0){
          qrl = resData.content;
          scanNode = self.$refs.scanNode;
          self.initQR(scanNode,qrl);
        } else {
          alert(resData.ret_info);
        }
      })
      .catch(function(error) {
        console.log(error)
      });    
    },
    //根据二维码id向后台发送请求
    scan_getScanFile(caseIdTemp){
      const self = this;
      const count = 0;
      //如果扫码Id不一致
      if(self.scan_caseId != caseIdTemp) {
        return;
      }     
      axios.post(self.longPollingUrl + "/longPolling/getScanFile.htm", qs.stringify({
        "caseId": self.scan_caseId,
        "type": self.scan_type,
        "count": self.scan_count
      }))
      .then(function(response) {
        var resData = response.data;
        if(resData.ret_code == 0) {
          //获取后台传回的链接数组
          self.scan_addFile(resData.fileList);
        }
        //再次上传
        self.scan_getScanFile(caseIdTemp);
      })
      .catch(function(error) {
        console.log("请求cos签名出现错误");
        if(self.count<5){
          self.count++;
          self.scan_getScanFile(caseIdTemp);
        }
      });
    },
    scan_addFile(fileList){
      console.log(fileList)
      if(fileList == null || fileList == "" || fileList.length == 0){
        return;
      }
      for(var i=0; i<fileList.length;i++){
        this.imageurlarr.push({name: fileList[i].fileName, url: fileList[i].url});
        this.ImageUrl.push(fileList[i].url);
      }
    },

    showInput() {
      this.form.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.form.inputValue;
      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }
      this.form.inputVisible = false;
      this.form.inputValue = '';
    },
    rowclick(val) {
      var self = this;
      this.tableflag = 1;
      self.index = self.index + 1;
      self.textarea += self.index + ':' + val.ICD + val.DiseaseName + '(' + val.MnemonicCode + ')' + '\n';
      self.tableshow = false;
      self.form.cy = val.DiseaseName;

      // var inputdata = val.ICD + ':' + val.DiseaseName + '(' + val.MnemonicCode + ')';
      var inputdata = val.DiseaseName;
      let inputValue = inputdata;
      if (this.form.dynamicTags.length > 0) {
        var tagFlag = true
        this.form.dynamicTags.forEach(function(element) {        //初步诊断去重
          if (element == inputValue) {
            tagFlag = false;
          }
        }, this);
        if (tagFlag) {
          this.form.dynamicTags.push(inputValue);
        } else {
          this.$alert('该初院诊断已选择', '提示', )
        }
      } else {
        this.form.dynamicTags.push(inputValue);
      }
      this.form.inputVisible = false;
      this.form.inputValue = '';
      if (self.ICDarr.length > 0) {
        var ICDflag = true;
        self.ICDarr.forEach(function(element) {       //ICDarr去重
          if (element == val.ICD) {
            ICDflag = false;
          }
        }, this);
        if (ICDflag) {
          self.ICDarr.push(val.ICD);
          self.DiagnoseNames.push(val.DiseaseName)
        }
      } else {
        self.ICDarr.push(val.ICD);
        self.DiagnoseNames.push(val.DiseaseName)
      }
    },
    handleClose(tag) {
      var self = this;
      if (this.form.dynamicTags.length > 0) {
        this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
        this.ICDarr.splice(this.form.dynamicTags.indexOf(tag), 1)
        self.DiagnoseNames.splice(this.form.dynamicTags.indexOf(tag), 1)
        // this.ICDarr.splice(this.ICDarr.indexOf(tag.split(':')[0]), 1)
        // self.DiagnoseNames.splice(this.ICDarr.indexOf(tag.split(':')[1].split('(')[1].split(")")[0]), 1);
      }
      if (this.form.dynamicTags.length == 0) {
        this.diagnosis = '';
      }
    },
    cellmouseenter(val) {
      var self = this;
      // console.log(val)
      // self.form.cy=val.DiseaseName;
    },
    tabledataseach() {
      var self = this;
      axios.get(apiurl.GetDiseaseOptions, {
        params: {
          page: self.form.currentPage,
          rows: self.form.currentNum,
          kw: self.form.cy,
          token: self.token
        }
      })
      .then(function(response) {
        if (response.data.suc == true) {
          var data = response.data.rows;
          self.form.tableData = data;
          self.total = response.data.total;
          self.tableshow = true;
        } else {
          self.$alert(response.data.mes, '提示', )
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },    
    inputblur(){
      setTimeout(() => {
        console.log(this.tableflag,this.tablefyflag,'aaa')
        if(this.tableflag != 1){
          if(this.tablefyflag != 1){
            this.tableshow=false; 
          }          
        }
      },500)        
    },
    inputfocus() {
      var self = this;
      this.tableflag = 0;
      this.tablefyflag  = 0;
      setTimeout(() => {
        self.form.cy = '';
        self.tabledataseach();
      }, 500)
    },
    handleSizeChange(val) {
      var self = this;
      console.log(val)
      self.form.currentNum = val;
      self.tablefyflag = 1;
      // $('.inputfocuszd').find('input').focus();
      self.tabledataseach();
    },
    handleCurrentChange(val) {
      var self = this;
      self.form.currentPage = val;
      this.tablefyflag = 1;
      // $('.inputfocuszd').find('input').focus();
      self.tabledataseach();
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options4 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      }
    },
    // 图片格式上传
    beforeAvatarUpload(file) {
      // this.filesizecont=this.filesizecont + file.size;
      const isTxt = file.type === 'text/plain';
      const isPdf = file.type === 'application/pdf';
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isDoc = file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isExcel = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error('单个上传图片大小不能超过 20MB!');
        //this.filesizecont=this.filesizecont-file.size;
        return false;
      }

      if(isTxt || isPdf || isImg || isDoc || isExcel) {
        return true;
      }else {
        this.$alert('请上传pdf，jpg，jpeg，png，doc，docx，xls，xlsx，txt格式的文件', '提示');
        return false;
      }
    },
    handlePictureCardPreview(file) {
      var self = this;
      this.dialogImageUrl = file.url;
      this.dialogImageAlt = file.name;
      var isImage = file.name.split('.')[1];
      var isImg = isImage == 'jpeg' || isImage == 'png' || isImage == 'jpg';
      this.dialogVisible = true;
      if(!isImg) {
        self.imageFile = false;
        self.notImageFile = true;
      }
      else{
        self.imageFile = true;
        self.notImageFile = false;
      }
    },
    //图片上传中
    onUploadProcess() {
      var self = this;
      self.isUploadDisabled = true;
    },
    handlesuccess(file, fileList, res) {
      var self = this;
      self.isUploadDisabled = false;
      self.imageurlarr.push({name: fileList.name,url: file.extra.url,size: file.extra.size});
      self.ImageUrl.push(file.extra.url);
      console.log(file)
      //console.log('uploadPC:'+self.imageurlarr);
    },
    handleRemove(file, fileList) {
      var self = this;
      console.log(file,fileList)
      if (file.status == 'success') {
        axios.post(apiurl.DeleteDischargeRecordImg + '?resource=' + file.url, {
        }, {
          headers: {
            'token': self.token
          }
        })
        .then(function(response) {
        })
        .catch(function(error) {
          console.log(error);
        });
        var ii=0;
        self.imageurlarr.forEach(function(v,i){
          if(v.url==file.url){
            self.imageurlarr.splice(i,1)
            self.ImageUrl.splice(i, 1);
            console.log(v.size)
            self.form.filesizecont = self.form.filesizecont-v.size;
          }
        })
        console.dir(self.imageurlarr)
      }

    },
    getProvince() {                                 //获取省
      var self = this;
      axios.get(apiurl.GetRegions, {
        params:{
          code: '',
        }              
      }).then(function (res) {
          if(res.data.suc == true){
              self.form.Province = res.data.rows;
          } else {
              self.$alert(res.data.mes, '提示', )
          }
      }).catch(function(error) {
          console.log(error);
      });
    },
    selectcityid(val) {
      var self = this;
      axios.get(apiurl.GetRegions, {
        params: {
          code: parseInt(val)
        }
      })
      .then(function(response) {
        if (response.data.suc == true) {
          self.form.City = response.data.rows;
          if(self.form.Cityvalue.substring(0,2) != self.form.Provincevalue.substring(0,2)){
            self.form.Cityvalue = '';
          }
        } else {
          self.$alert(response.data.mes, '提示', )
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    selectareaid(val) {
      var self = this;
      console.log(val,'val')
      axios.get(apiurl.GetRegions, {
        params: {
          code:parseInt(val)
        }
      })
      .then(function(response) {
        if (response.data.suc == true) {
            self.form.Area = response.data.rows;
            if(self.form.Cityvalue.substring(0,4) != self.form.Areavalue.substring(0,4)){
                self.form.Areavalue = '';
            }
        } else {
            self.$alert(response.data.mes, '提示', )
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
      
    //第一步上一页
    UpStepfirst() {
      var self = this;
      var param = {};
      param.method = "addTab";
      param.title = '转诊居民列表';
      param.url = linkUrl + 'leavehosipital/leavehosipital?token='+self.token+'&ModelUrl='+this.$route.query.ModelUrl;
      window.parent.postMessage(JSON.stringify(param), '*');
      // self.$router.push('/leavehosipital/leavehosipital');
    },
    //根据经纬度换算最短距离
    GetDistance( lat1,  lng1,  lat2,  lng2){
      var radLat1 = lat1*Math.PI / 180.0;
      var radLat2 = lat2*Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var  b = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
      Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
      s = s *6378.137 ;// EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      console.log(s,lat1,lng2,lat2,lng2)
      return s;
    },
    //排序
    compare (obj1, obj2) {
      var val1 = obj1.jl;
      var val2 = obj2.jl;
      if (val1 < val2) {
          return -1;
      } else if (val1 > val2) {
          return 1;
      } else {
          return 0;
      }            
    },
    //获取最近的社区医院
    nearbyCommunity() {
      var self = this;
      var point1 = [];
      self.maphospitalarr.forEach((v,i) => {
        if(v.Latitude>0 ||v.Longitude>0){
          point1.push({jl:self.GetDistance(self.nowLatitude,self.nowLongitude,v.Latitude,v.Longitude),name:v.HospitalName})
        }
      })
      console.log(point1)
      if(point1.length != 0){
        self.form.nearbyHospitalName = point1.sort(this.compare)[0].name;
      }else{
        self.form.nearbyHospitalName = '';
      }  
    },
    // 地图显示
    mapshow(cityname, areaname) {
      var self = this;
      setTimeout(() => {        
        var map = new AMap.Map('mapDiv', {
          resizeEnable: true,
          center: new AMap.LngLat(116.306206, 39.975468),
          zoom: 10
        });
        //实例化 Geocoder
        var geocoder = new AMap.Geocoder();
        //经纬度获取
        geocoder.getLocation(areaname, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            console.log(result)
            self.nowLatitude = result.geocodes[0].location.lat;
            self.nowLongitude = result.geocodes[0].location.lng;
            self.nearbyCommunity();
              //TODO:获得了有效经纬度，可以做一些展示工作
              //比如在获得的经纬度上打上一个Marker
          }else{
            console.log('没有获取到经纬度');
            self.form.nearbyHospitalName = '';
              //获取经纬度失败
          }
        }); 
        // if(this.form.Cityvalue,this.form.Areavalue)
        self.cityname = cityname;
        // self.areaname=areaname;
        var districtSearch = new AMap.DistrictSearch();
        districtSearch.search(cityname, function(status, result) {
          var subDistricts = result.districtList[0].districtList;
          var select = document.getElementById('subDistricts');
          console.log(subDistricts,'subDistricts')
          for (var i = 0; i < subDistricts.length; i += 1) {
            var name = subDistricts[i].name;
            var option = document.createElement('option');
            option.value = option.innerHTML = name;
            select.appendChild(option);
          }
          select.onchange = function() {
            self.maphospitalarr.forEach(function(v, i) {
              var marker = new AMap.Marker({
                position: [v.Longitude, v.Latitude]
              });
              marker.setLabel({
                offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                content: v.HospitalName,
                title: v.Id
              });
              marker.setMap(map);
            })
            map.setCity(this.value)
          };
          select.value = areaname;
          select.onchange();
        })
      }, 500)
    },
    // 第一步下一页
    nexttransfer(formName) {
      var self = this;
      // self.mapshowcircle=true;

        //获取地址 cityname,areaname
      self.$refs[formName].validate((valid) => {
        if (valid) {
          if (self.form.dynamicTags.length != 0) {
            self.cityname = $('.mapname1').find('input').eq(0).val();
            self.areaname = $('.mapname2').find('input').eq(0).val();
            self.provincename = $('.mapname').find('input').eq(0).val();
            console.log($('.mapname1').find('input').eq(0).val(),"$('.mapname1').find('input').eq(0).val()")
            // self.DownStepfirstdata();
            self.mechanismdata();
            self.reasondata();
            self.maphospital();
            self.mapshow(self.cityname, self.areaname);
            self.form.textarea11=self.form.textarea1;
            // self.form.doctorname1=self.form.doctorname;
            self.form.kstext1=self.form.kstext;
            self.form.doctorphone1=self.form.doctorphone
            self.DownStepfirstdata(formName)
            // self.$nextTick(function(){
            //   self.mapshowcircle=false;
            // })
          } else {
            self.$alert('出院诊断必填', '提示', );
          }
        } else {
          self.$alert('请对有错误提示的信息进行修改','提示',)
          return false;
        }
      });
      // this.$router.push('/turnout/add/writetransfer')
    },
    //第一步保存
    DownStepfirstdata(formName) {
      var self = this;
      console.log(self.form.PatientName,'PatientName')
      axios.post(apiurl.AddTurnDownStep1, {
        'DPatientId':self.seedpatiendid||0,
        'PatientCardId': self.form.PatientCardId,
        'PatientName': self.form.PatientName,
        'PatientPhone': self.form.PatientPhone,
        'PatientSex': self.form.PatientSex,
        'PatientAge': self.form.PatientAge,
        'MedicalCardType': self.form.MedicalCardType,
        'MedicalCardId': self.form.MedicalCardId,
        'MedicalType': self.form.MedicalType,
        'Province': self.form.Provincevalue,
        'City': self.form.Cityvalue,
        'Area': self.form.Areavalue,
        'DetailedAddress':self.form.DetailedAddress,
        'EmergencyPhone': self.form.EmergencyPhone,
        'ContactRelation': self.form.ContactRelation,//备用联系人关系
        'ContactName': self.form.ContactName,
      }, {
          headers: {
            'token': self.token
          }
        })
        .then(function(response) {
          // console.log(response)
          if (response.data.suc == true) {
            self.secondkflog = true;
            self.firstkflog = false;
            $('body,html').animate({ scrollTop: 0 });
            // if(self.form.Patientbri==''){
            //   self.$alert('出生日期必填', '提示', )
            // }else{
            //   self.nexttransfer(formName)
            // }
            // console.log(self.form.Patientbri)            
          } else {
            self.$alert(response.data.mes, '提示', )
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 第二步上一页
    secondprovtransfer() {
      var self = this;
      // self.getPatientInfo()
      // self.scan_initializeScanPopup([]);
      self.thirdflog = false;
      self.secondkflog = false;
      self.firstkflog = true;
      self.form.textarea1=self.form.textarea11;
      self.form.doctorname=self.form.doctorname1;
      self.form.kstext=self.form.kstext1;
      self.form.doctorphone=self.form.doctorphone1
    },
    // 第二步下一页
    secondnexttransfer() {
      var self = this;
      self.thirdimage = { thirdimage: self.imageurlarr }; 
      // var reasonvalue1=$('.reasonclass').find('input').val();
      console.log(self.form.mechanismvalue,'self.form.mechanismvalue')
      if(self.form.mechanismvalue == ''||self.form.mechanismvalue == '请选择'){
        self.$alert('选择机构必选', '提示', )
      }else{
        if (self.form.reasonvalue != '') {
          if ($('.reasonclass').find('input').val() == '其他') {
            if ($('.reasontextclass').find('textarea').val() == '') {
              $('.reasontextclass').append('<div style="color:red;" class="ruleclass">转诊原因不能为空</div>')
            } else {
              // if(self.form.reasonvalue == '其他'){
              //   self.form.reasonvalue = $('.reasontextclass').find('textarea').val();
              // }else{
              //   self.form.reasonvalue = self.form.reasonvalue + $('.reasontextclass').find('textarea').val();
              // } 
              if(self.reasontextarea.length>40){
                self.$alert('转诊原因不能超过40', '提示', )
              }else{
                self.secondkflog = false;
                self.firstkflog = false;
                self.thirdflog = true;
                self.form.mechanismname = $('.mechanismname').find('input').val();
              }               
            }
          } else {
            self.secondkflog = false;
            self.firstkflog = false;
            self.thirdflog = true;
            self.form.mechanismname = $('.mechanismname').find('input').val();
          }
        } else {
          self.$alert('转诊原因必选', '提示', )
        }
      }
      
    },
    mechanismvaluechange(val) {
      var self = this;
      this.ServiceDate(val);
      var hname = '';
      self.form.mechanism.forEach(function(v, i) {
        if (v.HospitalId == self.form.mechanismvalue) {
          self.lat = v.Latitude;
          self.long = v.Longitude;
          self.hname = v.HospitalName;
          // self.maphospitalarr.push(v.Latitude,v.Longitude)
        }
      })
      setTimeout(() => {
        var map = new AMap.Map('mapDiv', {
          resizeEnable: true,
          center: new AMap.LngLat(116.306206, 39.975468),
          zoom: 10
        });
        // if(this.form.Cityvalue,this.form.Areavalue)
        var districtSearch = new AMap.DistrictSearch();
        districtSearch.search(self.cityname, function(status, result) {
          var subDistricts = result.districtList[0].districtList;
          var select = document.getElementById('subDistricts');
          for (var i = 0; i < subDistricts.length; i += 1) {
            var name = subDistricts[i].name;
            var option = document.createElement('option');
            option.value = option.innerHTML = name;
            select.appendChild(option);
          }
          select.onchange = function() {
            // self.maphospitalarr.forEach(function(v,i){
            var marker = new AMap.Marker({
              position: [self.long, self.lat]
            });
            marker.setLabel({
              offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
              content: hname,
              // title:v.Id
            });
            marker.setMap(map);
            // })
            map.setCity(this.value)
          };
          select.value = self.areaname;
          select.onchange();
        })
      }, 500)
    },
    // 选择机构
    mechanismdata() {
      var self = this;
      var L = '', R = '', hname = '';
      axios.get(apiurl.GetCooperateHospitalList, {
        params: {
          patientCardId:self.form.PatientCardId,
          token: self.token
        }
      })
      .then(function(response) {
        var data = response.data.rows;
        self.form.mechanism = data;
        data.forEach(function(v, i) {
          if (v.IsSelect) {
            self.form.mechanismvalue = v.HospitalId;
            self.form.mechanismzs = v.HintInformation;
            self.L = v.Longitude;
            self.R = v.Latitude;
            setTimeout(() => {
              var map = new AMap.Map('mapDiv', {
                resizeEnable: true,
                center: new AMap.LngLat(116.306206, 39.975468),
                zoom: 10
              });
              // if(this.form.Cityvalue,this.form.Areavalue)
              var districtSearch = new AMap.DistrictSearch();
              districtSearch.search(self.cityname, function(status, result) {
                var subDistricts = result.districtList[0].districtList;
                var select = document.getElementById('subDistricts');
                for (var i = 0; i < subDistricts.length; i += 1) {
                  var name = subDistricts[i].name;
                  var option = document.createElement('option');
                  option.value = option.innerHTML = name;
                  select.appendChild(option);
                }
                select.onchange = function() {
                  // self.maphospitalarr.forEach(function(v,i){
                  var marker = new AMap.Marker({
                    position: [L, R]
                  });
                  marker.setLabel({
                    offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                    content: hname,
                    // title:v.Id
                  });
                  marker.setMap(map);
                  // })
                  map.setCity(this.value)
                };
                select.value = self.areaname;
                select.onchange();
              })
            }, 500)
          }
        })

      })
      .catch(function(error) {
        console.log(error);
      });
    },
    //服务包
    ServiceDate(val){
      var self = this;
      if(val != '请选择'){
        axios.get(apiurl.GetServicePacks, {
          params:{
            hospitalId: val,
            token:this.token
          },       
        }).then(function (res) {
            if(res.data.suc == true){
              self.form.checkdate=res.data.rows;
              if(res.data.total == 0){
                self.form.checkfalg = true;
              }else{
                self.form.checkfalg = false;
              }
            } else {
                self.$alert(res.data.mes, '提示', )
            }
        }).catch(function(error) {
            console.log(error);
        });
      }      
    },
    // 转诊原因
    reasondata() {
      var self = this;
      axios.get(apiurl.GetTurnDownReasons, {

      })
        .then(function(response) {
          var data = response.data.rows;
          self.form.reason = data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 获取社区医院
    maphospital() {
      var self = this;
      axios.get(apiurl.GetCommunityHospitalList, {
        params: {
          p_code: this.form.Provincevalue,
          c_code: this.form.Cityvalue,
          a_code: this.form.Areavalue,
          token: self.token
        }
      })
        .then(function(response) {
          self.maphospitalarr = response.data.rows;
          response.data.rows.forEach(function(v, i) {
            self.Latitudearr.push(v.Latitude);
            self.Longitudearr.push(v.Longitude);
          })
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 查看更多
    moreclick(){
      var self=this;
      self.morebtn=true;
      $('.record_ul').css('height','auto');
      $('.con_record').css('height','auto');
    },
    //收起
    smoreclick(){
      var self=this;
      self.morebtn=false;
      $('.record_ul').css('height','192px');
      $('.con_record').css('height','267px');
    },
    // 提交保存
    Submitdata() {
      var self = this;
      self.ImageTitle = [];
      self.imageurlarr.forEach(function(v,i){
        self.$set(self.ImageTitle,i,v.name);
      })
      console.log(self.ICDarr,'self.ICDarr')
      axios.post(apiurl.AddTurnDownSubmit, {
        'PatientModel.DPatientId': self.seedpatiendid || 0,//出院病人
        'PatientModel.PatientCardId': self.form.PatientCardId,//身份证
        'PatientModel.PatientName': self.form.PatientName,//患者姓名
        'PatientModel.PatientPhone': self.form.PatientPhone,//手机号
        'PatientModel.PatientProfession': self.form.PatientProfession,//病人身份职业
        'PatientModel.MedicalCard': self.form.MedicalCard,//就诊卡号
        'ReferralModel.IsSupplement': self.form.MakeupIf == 0 ? false : true,//是否补录
        'ReferralModel.ApplyTime': self.zzdatavaluetrue,//补录时必填，转诊申请日期
        'ReferralModel.ReferralHospitalId': self.form.mechanismvalue,//接诊的医院ID
        // 'ReferralModel.ReferralHospitalName':self.form.mechanismvalue,
        'ReferralModel.ReferralReason': self.form.reasonvalue,//转诊原因
        'ReferralModel.OtherReason': self.reasontextarea,//转诊其他原因
        'ReferralModel.ServicePackageId': self.form.checkListId.toString(),//服务包编号,号分隔
        'ReferralModel.ServicePackageName': self.form.checkList.toString(),//服务包名称,号分隔
        'IllnessModel.DateOfAdmission': self.form.enterdatavaluetrue,//入院日期
        'IllnessModel.DateOfDischarge': self.form.leavedatavaluetrue,//出院日期
        'IllnessModel.DischargeDiagnosisDiseaseId': self.ICDarr.toString(),//诊断病症CODE
        'IllnessModel.DischargeDiagnosisDiseaseText': self.form.dynamicTags.toString(),//诊断病症名称
        'IllnessModel.Admission': self.form.rysituation,//入院情况
        'IllnessModel.HospitalExamination': self.form.yncheck,//院内检查
        'IllnessModel.TreatmentProcess': self.form.zlgc,//治疗过程
        'IllnessModel.DischargeRecord': self.form.cysituation,//出院情况
        'IllnessModel.DischargeOrder': self.form.cyyz,//出院医嘱
        'IllnessModel.DischargeWhereabouts': self.form.cyqx,//出院去向
        'IllnessModel.SectionName': self.form.kstexttrue,//科室名称
        'IllnessModel.DoctorName': self.form.doctorname1,//医生名称
        'IllnessModel.DoctorPhone': self.form.doctorphone1,//医生手机号码
        'IllnessModel.FileUrl': self.ImageUrl.toString(),//附件
        'IllnessModel.FileName': self.ImageTitle.toString(),//附件名称
        'IllnessModel.AnnexDescription': self.form.fjsm//附件说明
      }, {
          headers: {
            'token': self.token
          }
        })
        .then(function(response) {
          if (response.data.suc) {
            self.set_seedpatiendid( )
            self.set_seedpatiendid( )
            self.set_transferTreatmentBaseId( )
            self.btndis=true;
            self.$message('提交成功');
            setTimeout(function() {
              var param = {};
              param.method = "closeThisTab";
              window.parent.postMessage(JSON.stringify(param), '*');
              param.method = "addTab";
              param.title = '社区转诊列表（转出）';
              param.url = linkUrl + 'sqzhuanzhen/turnOut?token='+self.token+'&ModelUrl='+this.$route.query.ModelUrl;
              window.parent.postMessage(JSON.stringify(param), '*');
              // self.btndis=false;
              // self.$router.push('/waitinvalid/waitinvalid');
            }, 1000)

          } else {
            self.$alert(response.data.mes, '提示', )
          }

        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 第三步
    open() {
      this.$alert('提交成功', '成功', {
        confirmButtonText: '确定',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`
          // });
        }
      });
    },
    thirdprovtransfer() {
      var self = this;
      self.morebtn=false;
      self.thirdflog = false;
      self.secondkflog = true;
      self.firstkflog = false;
      self.mechanismdata();
      self.reasondata();
      self.maphospital();
      self.mapshow(self.cityname, self.areaname);
      // this.$router.push('/turnout/add/writetransfer');
    }
  },
  watch: {
    // PatientCardId: function(newValue, oldValue) {
    //   console.log(newValue, oldValue,'aaaa')
    //   // if (newValue != null) {
    //   //   if (newValue.length == 18) {
    //   //     var date = new Date();
    //   //     var year = date.getFullYear();
    //   //     var birthday_year = parseInt(newValue.substr(6, 4));
    //   //     this.form.Patientbri = parseInt(newValue.substr(6, 4)) + '-' + newValue.substr(10, 2) + '-' + parseInt(newValue.substr(12, 2));
    //   //     this.form.PatientAge = year - birthday_year;
    //   //     if (parseInt(newValue.substr(16, 1)) % 2 == 1) {
    //   //       this.form.PatientSex = '1';
    //   //       this.form.PatientSexchina = '男';
    //   //     } else {
    //   //       this.form.PatientSex = '0';
    //   //       this.form.PatientSexchina = '女';
    //   //     }
    //   //   }
    //   // }
    // },
    reasontextarea: function(newValue, oldValue) {
      if (newValue.length >= 1) {
        $('.ruleclass').css('display', 'none')
      } else {
        $('.ruleclass').css('display', 'block')
      }
    }
  },
  created(){
    this.uploadUrl = apiurl.UploadDischargeRecordImg+'?token='+this.token  
  },
}
</script>
<style scoped lang="scss">
  .update_con .el-form-item__content{
    position: relative;
  }
  .update_con .smbtn{
    position: absolute;
    left: 195px;
    top: 5px;
  }
  .update_con .ts-notice{
    position: absolute;
    left: 95px;
    top: 30px;
  }
  .mork_out {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .mork{
    position: absolute;
    font-size: 50px;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .el-select{
    width: 100%;
  }
  .ts-notice{
    margin-left: 20px;
  }
  .map_title{
    color: #73879C;
    margin-left: 23px;
  }
	.my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;
    }
  }

.mork_out {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.mork {
  position: absolute;
  font-size: 50px;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-select {
  width: 100%;
}

.ts-notice {
  margin-left: 20px;
}

.map_title {
  color: #73879C;
  margin-left: 23px;
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}


.con_li {
  width: 50%;
  float: left;
  margin-bottom: 16px;
}

.con_title {
  width: 160px;
  display: inline-block;
  text-align: right;
  margin-right: 20px;
}
.autoheight{
  height: auto!important;
}
.con_record {
  position: relative;
  /*width: 900px;*/
  height: 267px;
  border: 1px solid #ddd;
  margin: -25px 0 0 85px;
  border-radius: 5px;
  padding-top: 17px;
}

.record_ul {
  height: 192px;
  overflow: hidden;
  padding-bottom: 20px;
}

.record_li {
  width: 95%;
  float: left;
  margin-bottom: 20px;
}

.record_title {
  width: 56px;
  margin-right: 20px;
}

.record_text {
  width: 591px;
}

.record_more {
  color: #539CDB;
  position: absolute;
  right: 80px;
  font-size: 12px;
  bottom: 20px;
  cursor: pointer;
}

.el-notification {
  top: 50%!important;
  left: 50%!important;
}

.el-notification__title {
  font-size: 50px;
}
</style>