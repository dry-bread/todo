import React, { useState } from 'react';
import { Layout,Calendar ,Avatar} from 'antd';
import './App.css';
import "antd/dist/antd.css";
import 'moment/locale/zh-cn';
import NewEvent from './NewEvent'
import TodayTask from './TodayTask';
import { UserOutlined } from '@ant-design/icons';
import LoginIn from './LoginIn'


const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [headerTip,setHeaderTip]=useState('今日待办')
  return (
    <div className="App">
      <Layout>
        <Sider style={{backgroundColor:'white'}}>
          <Avatar size={100} icon={<UserOutlined />} style={{marginTop:'5vh'}}/>
          <p>你好</p>
        </Sider>
        <Layout>
          <Header style={{color:'white',height:'10vh'}} >{headerTip}</Header>
          <Layout>
            <Content style={{height:'85vh'}}>
              <TodayTask/>
              </Content>
            <Sider style={{color:'white'}} width={300}>
            <Calendar fullscreen={false} />
            </Sider>
          </Layout>
          <Footer style={{height:'5vh'}}>曼婷制作</Footer>
        </Layout>
      </Layout>

        <NewEvent />
        <LoginIn  visible={true}/>
    </div>
  );
}

export default App;
