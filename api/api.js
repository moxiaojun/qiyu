const http = require('./http')
const _getJianDuDetails = (data) => { 
  return http.getWithLoading('/JianDuDetails',data)
}
const _replyJianDu = (data) => { 
  return http.post('/replyJianDu',data)
} 
const _addJianDu = (data) => { 
  return http.post('/addJianDu',data)
} 
const getDaKaDetails = (data) => { 
  return http.get('/getDaKaDetails',data)
} 
const getDaKaList = (data) => { 
  return http.get('/getDaKaList',data)
} 
const getProjectList = (data) => { 
  return http.get('/getProjectList',data)
} 
const getProject = (data) => { 
  return http.get('/getProject',data)
} 
const getDaKaJiLu = (data) => { 
  return http.get('/getDaKaJiLu',data)
} 
const getIntegral = (data) => { 
  return http.get('/getIntegral',data)
} 
const getWorkOvertime = (data)=>{
  return http.get('/getWorkOvertime',data)
}
const getWorkReportList = (data)=>{
  return http.get('/getWorkReportList',data)
}  
export default{ 
  _getJianDuDetails,
  _replyJianDu,
  _addJianDu,
  getDaKaDetails,
  getDaKaList,
  getProjectList,
  getProject,
  getDaKaJiLu,
  getIntegral,
  getWorkOvertime,
  getWorkReportList
  }