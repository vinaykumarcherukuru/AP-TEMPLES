import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select, Space, Typography, notification } from 'antd';
import BookingDetails from '../redux/actions/bookingActions';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;
const { Text } = Typography;

export const ModalViewMembers = ({ rowIndex, isOpen, setIsOpen }) => {
    const [PiligrimForm] = Form.useForm();
    const bookingHistory = useSelector((state) => state.booking);
    const dispatch = useDispatch();

    useEffect(() => {
        const membersArray = bookingHistory.find(x => x.uuid === rowIndex)?.members;
        PiligrimForm.setFieldsValue({ "members": membersArray });
    }, [rowIndex])

    const onUpdate = (data) => {
        console.log({
            uuid: rowIndex,
            members: data
        })
        dispatch(BookingDetails.UpdateDetails({
            uuid: rowIndex,
            members: data?.members
        }))
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Data Updated Successfully.',
                    style: {
                        backgroundColor: '#F6FFED', // Green background (Ant Design success color)
                        color: '#fff', // White text
                    },
                })

                setIsOpen(false);
                //setRowIndex(null);
            })
    }
    return (<>
        <Modal
            title={
                <div style={{ display: 'flex', gap: 5, marginBottom: 20 }}>
                    <div>
                        <strong>Piligrim Details</strong>
                    </div>
                    <div style={{ color: 'gray' }}>
                        <Text>{`(You can add up to 5 members)`}</Text>
                    </div>
                </div>
            }
            //centered
            open={isOpen}
            // onOk={() => setIsOpen(false)}
            okText='Update'
            onCancel={() => setIsOpen(false)}
            destroyOnClose={true}
            width={'70%'}
            footer={[
                <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: 'gray', color: '#ffffff', border: 'none' }}>
                    Cancel
                </Button>,

                <Button
                    type="primary"
                    onClick={() => PiligrimForm.submit()}
                    style={{ backgroundColor: 'rgb(206, 85, 36)', color: '#ffffff', border: 'none' }}
                >
                    Update
                </Button>
            ]}
        >
            <Form
                layout="vertical"
                name="memberForm"
                form={PiligrimForm}
                initialValues={{ members: [] }}
                onFinish={onUpdate}
            >
                <Form.List name="members">
                    {(fields, { add, remove }) => (
                        <div>
                            {fields.map((field, index) => (
                                <Space key={field.key} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'name']}
                                        fieldKey={[field.fieldKey, 'name']}
                                        label={index === 0 ? 'Name (As per Aadhar)' : ''}
                                        rules={[{ required: true, message: 'Name required!' }]}
                                        style={{ flex: '1 1 150px' }}
                                    >
                                        <Input
                                            placeholder="Name"
                                            onInput={(e) => {
                                                e.target.value = e.target.value.trimStart().replace(/[^a-zA-Z\s]/g, '');
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'age']}
                                        fieldKey={[field.fieldKey, 'age']}
                                        label={index === 0 ? 'Age' : ''}
                                        rules={[
                                            { required: true, message: 'Age required!' },
                                            {
                                                validator(_, value) {
                                                    if (!value) {
                                                        return Promise.resolve(); // Allows empty input if not required
                                                    }
                                                    if (!isNaN(value) && Number(value) <= 100) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Max age allowed 100'));
                                                },
                                            }
                                        ]}
                                        style={{ flex: '1 1 100px' }}
                                    >
                                        <Input
                                            placeholder="Age"
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                            }} />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'aadhar']}
                                        fieldKey={[field.fieldKey, 'aadhar']}
                                        label={index === 0 ? 'Aadhar' : ''}
                                        rules={[
                                            { required: true, message: 'Aadhar required!' },
                                            { pattern: /^[0-9]{12}$/, message: 'Enter 12-digit Aadhar' }
                                        ]}
                                        style={{ flex: '1 1 200px' }}
                                    >
                                        <Input
                                            placeholder="Aadhar"
                                            maxLength={12}
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'gender']}
                                        fieldKey={[field.fieldKey, 'gender']}
                                        label={index === 0 ? 'Gender' : ''}
                                        rules={[{ required: true, message: 'Gender required!' }]}
                                        style={{ flex: '1 1 120px' }}
                                    >
                                        <Select placeholder="Gender" style={{ width: 150 }}>
                                            <Option value="M">Male</Option>
                                            <Option value="F">Female</Option>
                                            <Option value="O">Other</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'mobile']}
                                        fieldKey={[field.fieldKey, 'mobile']}
                                        label={index === 0 ? 'Mobile' : ''}
                                        rules={[
                                            { required: true, message: 'Mobile required!' },
                                            { pattern: /^[0-9]{10}$/, message: 'Enter 10-digit mobile number' }
                                        ]}
                                        style={{ flex: '1 1 180px' }}
                                    >
                                        <Input
                                            placeholder="Mobile"
                                            type="tel"
                                            maxLength={10}
                                            onInput={(e) => {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                            }}
                                        />
                                    </Form.Item>
                                    {index > 0 &&
                                        <Form.Item label={index === 0 ? ' ' : ''}>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Form.Item>
                                    }
                                </Space>
                            ))}
                            {fields.length < 5 &&
                                <Form.Item style={{ textAlign: 'center', width: '65%' }}>
                                    <Button
                                        type="link"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusCircleOutlined />}
                                        style={{ color: 'black', marginTop: 10, width: 100 }}
                                    >
                                        Add Piligrim
                                    </Button>
                                </Form.Item>
                            }
                        </div>
                    )}
                </Form.List>
            </Form>
        </Modal>
    </>
    )
}
