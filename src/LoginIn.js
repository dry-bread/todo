import React, { useState } from 'react';
import "antd/dist/antd.css";
import { Modal, Form, Input, Button, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getFileItem } from 'antd/lib/upload/utils';
import { LoginOutlined } from '@ant-design/icons';
import './LoginIn.css'

const LoginIn = (visible) => {
    const onFinish = values => {
        alert(JSON.stringify(values));
        
    };
    const layout = {
        wrapperCol: { offset:2,span: 20 },
    }
    const tailLayout = {
        wrapperCol: { offset: 14 },
    }
    return (
        <Modal visible={visible}
            footer={null}
            title='登录'
            width={450}
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
                        <Button type="default">暂不登录</Button>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                        >
                            登录
        </Button>
                    </Space>

                </Form.Item>

            </Form>
        </Modal>
    );
}

export default LoginIn;