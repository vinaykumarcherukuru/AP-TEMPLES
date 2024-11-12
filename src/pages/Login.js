import React from 'react'
import { Button, Flex, Form, Image, Input, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(setUser({
            isAuthenticated: true,
            userName: 'Vinay Kumar',
            role: 'EO'
        })).then(() =>
            navigate("/")
        );
    };
    return (
        <>
            <Title level={2} style={{ textAlign: 'center' }}> Government of Andhra Pradesh - Endowment Department</Title>

            <Flex justify='space-between' wrap style={{marginTop:50}}>
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <Image
                            width={350}
                            src='https://aptemples.ap.gov.in/static/media/CBN.9c96666e.webp'
                            style={{ borderRadius: '8px' }}
                        />
                        <Title level={4} style={{ margin: 5 }}>Sri Nara Chandrababu Naidu</Title>
                        <Text>Hon’ble Chief Minister of Andhra Pradesh</Text>
                    </div>
                </div>
                <div>
                <div style={{ textAlign: 'center' }}>
                        <Image
                            width={350}
                            src='https://aptemples.ap.gov.in/static/media/annam-reddy.efc55495.webp'
                            style={{ borderRadius: '8px' }}
                        />
                        <Title level={4} style={{ margin: 5 }}>Sri Anam Ramanarayana Reddy</Title>
                        <Text>Hon'ble Minister for Endowments</Text>
                    </div>
                </div>
                <div style={{ width: '30%', marginTop: '3%', marginRight: '5%' }}>
                    <Title level={4} style={{ marginLeft: '50%', marginBottom: 20, fontWeight: 600 }}>Sign In</Title>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={handleLogin}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Text>Forgot Password</Text>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Flex>
        </>
    )
}

export default Login