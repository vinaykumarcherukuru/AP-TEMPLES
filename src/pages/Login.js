import React from 'react'
import { Button, Flex, Form, Image, Input, notification, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
    const { users } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const onFinish = (data) => {
        const user = users.find(x => x.role === data.userName && x.password === data.password);
        if (user) {
            dispatch(login({
                isAuthenticated: true,
                userName: data.userName,
                candidateName: user?.candidatename || '',
                constituency: user?.constituency || '',
                party: user?.party || '',
                role: user.role,
                uid: user.uid
            })).then(() =>
                navigate(user.role === 'eo' ? "/history" : "/")
            );
        }
        else {
            notification.error({
                message: 'Error',
                description: 'User does not exists.',
                style: {
                    backgroundColor: '#ffccc7',
                    color: '#fff'
                },
            })
        }
    };
    return (
        <>
            <Title level={2} style={{ textAlign: 'center' }}> Government of Andhra Pradesh - Endowment Department</Title>

            <Flex justify='space-between' wrap style={{ marginTop: 50 }}>
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <Image
                            width={350}
                            height={350}
                            src='https://aptemples.ap.gov.in/static/media/CBN.9c96666e.webp'
                            style={{
                                borderRadius: '8px',
                                objectFit: 'cover'
                            }}
                            preview={false}
                        />
                        <Title level={4} style={{ margin: 5 }}>Sri Nara Chandrababu Naidu</Title>
                        <Text>Hon’ble Chief Minister of Andhra Pradesh</Text>
                    </div>
                </div>
                <div>
                    <div style={{ textAlign: 'center', position:'relative' }}>
                        <Image
                            width={390}
                            height={375}
                            src='https://i.imghippo.com/files/prc3955Az.png'
                            style={{
                                borderRadius: '8px',
                                objectFit: 'cover',
                                objectPosition: 'center center', // Adjust the focus
                                transform: 'scale(0.87)' // Slight zoom out 
                            }}
                            preview={false}
                        />
                        <div style={{bottom:-35,left:45, position:'absolute'}}>
                            <Title level={4} style={{ margin: 5 }}>Sri Anam Ramanarayana Reddy</Title>
                            <Text>Hon'ble Minister for Endowments</Text>
                        </div>
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
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            label="Username"
                            name="userName"
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
                            <Button type="primary" htmlType="submit" style={{backgroundColor: 'rgb(206, 85, 36)'}}>
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