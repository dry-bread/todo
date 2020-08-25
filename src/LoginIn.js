import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Space, Card, Col, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginIn.css';
import { useHistory } from "react-router-dom";

const LoginIn = () => {
    const onFinish = values => {
        alert(JSON.stringify(values));

    };

    const layout = {
        wrapperCol: { offset: 2, span: 20 },
    }
    const tailLayout = {
        wrapperCol: { offset: 14 },
    }
    let history = useHistory();
    function handleNotLogin(){
        
        history.push("/todo");
   }
    return (
        <Row gutter={16} align="middle" style={{height:'100vh'}}>
            <Col span={8} offset={8}>
                <Card
                    title="登录"
                    style={{opacity:'0.95'}}
                >
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                        {...layout}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <a className="login-form-forgot" href="">忘记密码</a>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Space>
                                <Button type="default" onClick={handleNotLogin}>暂不登录</Button>
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                >
                                    登录
        </Button>
                            </Space>

                        </Form.Item>

                    </Form>
                </Card>
            </Col>
        </Row>

    );
}

export default LoginIn;