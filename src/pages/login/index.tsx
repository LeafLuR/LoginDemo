import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { request } from './request';

import "./index.less";

export default function Login({ setIsLogin,setStatus }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        request(values).then(values => {
            if(values?.success){
                setStatus(true)
            }
        }).finally(()=>{
            setLoading(false);
        })

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}
            name="basic"
            style={{
                maxWidth: 800,
            }}
            initialValues={{
                remenber: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input placeholder='请输入用户名' prefix={<UserOutlined />} allowClear />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input.Password placeholder='请输入密码' prefix={<LockOutlined />} allowClear />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
                    登录
                </Button>
            </Form.Item>
            <Form.Item noStyle>
                <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
                    <span style={{ cursor: "not-allowed" }}>忘记密码?</span>
                    <span onClick={() => setIsLogin(false)} style={{ cursor: "pointer" }}>去注册</span>
                </div>
            </Form.Item>
        </Form>
    )
}
