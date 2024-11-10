import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { customValidator } from '../../util/verify';
import { signInRequest } from './request';

import "./index.less";

export default function SignIn({ setIsLogin, setStatus }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const onFinish = (values) => {
        // 判定是否同意条款
        if (!values.agree) {
            form.setFields([{ name: "agree", value: false, errors: ['需要同意协议进行注册'] }]);
            return false;
        }
        if (values.password !== values.passwordConfirmation) {
            form.setFields([{ name: "password", errors: ['请确定两次输入一致的密码'] }, { name: "passwordConfirmation", errors: ['请确定两次输入一致的密码'] }]);
            return false;
        }

        form.setFields([{ name: "agree", value: true, errors: [] }]);

        setLoading(true);
        signInRequest(values).then(result => {
            if (result?.success) {
                message.success(result.info);
                setStatus(true);
                setIsLogin(true);
            } else {
                message.warning(result.info)
            }
        }).finally(() => {
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
                agree: false,
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
                validateTrigger="onBlur"
                rules={[
                    { validator: customValidator },
                ]}
            >
                <Input.Password placeholder='请输入密码' prefix={<LockOutlined />} allowClear />
            </Form.Item>
            <Form.Item
                name="passwordConfirmation"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: '请再次输入密码',
                    }
                ]}
            >
                <Input.Password placeholder='请再次输入密码' prefix={<LockOutlined />} allowClear />
            </Form.Item>
            <Form.Item
                name="agree"
                valuePropName="checked"
                style={{ textAlign: "left" }}
            >
                <Checkbox className='font-color'>同意条款</Checkbox>
            </Form.Item>

            <Form.Item
            >
                <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
                    注册并登录
                </Button>
            </Form.Item>
            <Form.Item noStyle>
                <div style={{ display: "flex", color: "white" }}>
                    <span style={{ cursor: "pointer" }} onClick={() => setIsLogin(true)}>去登录</span>
                </div>
            </Form.Item>
        </Form>
    )
}
