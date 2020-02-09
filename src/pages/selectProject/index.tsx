import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Button, Form, Input, Picker } from '@tarojs/components';
import './index.scss'
import * as service from '../../api'
import { genToken } from '../../utils'
const projects = ['艾灸', '刮痧', '拔罐', '针灸', '推拿'];
const technicians = ['小虎', '逗你玩', '二麻子', '隔壁老王']
const CreateActivity: React.FunctionComponent = (props) => {
  const [project, setProject] = useState(projects[0]);
  const [technician, setTechnician] = useState(technicians[0]);
  const [projectList, setProjectList] = useState(projects);
  const [technicianList, setTechnicianList] = useState(technicians);
  const handleSubmit = (e, data) => {
    const { value } = e.detail;
    Taro.request({
      url: service.addAppointment(),
      method: 'POST',
      data: Object.assign({}, value, { timeRange: Taro.getStorageSync('time'), name: Taro.getStorageSync('userInfo').nickName }),
      header: {
        'content-type': 'application/json',
        authorization: genToken(Taro.getStorageSync('token'))
      }
    }).then(res => {
      const { code } = res.data
      if (code == 200) {
        Taro.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 2000
        }).then(res => {
          console.log(res)
          Taro.navigateTo({
            url: '/pages/index/index'
          })
        })
      }
    })
  }
  useEffect(() => {
    Taro.request({
      url: service.getTechnicianList(),
      method: 'GET',
      header: {
        'content-type': 'application/json',
        authorization: genToken(Taro.getStorageSync('token'))
      }
    }).then(res => {
      const { code, data } = res.data
      if (code == 200) {
        setTechnicianList(data)
      }
    })
  }, []);
  useEffect(() => {
    Taro.request({
      url: service.getProjectList(),
      method: 'GET',
      header: {
        'content-type': 'application/json',
        authorization: genToken(Taro.getStorageSync('token'))
      }
    }).then(res => {
      const { code, data } = res.data
      if (code == 200) {
        setProjectList(data)
      }
    })
  }, []);

  const onProjectSelect = (e) => {
    setProject(projectList[e.detail.value])
  }
  const onTechnicianSelect = (e) => {
    setTechnician(technicianList[e.detail.value])
  }
  return <View className='form-wrap'>
    <Form onSubmit={handleSubmit}  >
      <View className='picker-wrap'>
        <Picker mode='selector' onChange={onProjectSelect} value={project} range={projectList} name='project'>
          <View className='picker'>
            项目：{project}
          </View>
        </Picker>
        <Picker mode='selector' onChange={onTechnicianSelect} value={technician} range={technicianList} name='technician'>
          <View className='picker'>
            技师：{technician}
          </View>
        </Picker>
        <Button formType='submit' className='submit-btn'>提交</Button>
      </View>
    </Form>
  </View>
}
export default CreateActivity