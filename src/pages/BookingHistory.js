import { CheckOutlined, CloseOutlined, EditOutlined, EyeOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Modal, notification, Popconfirm, Select, Space, Table, Tag, Tooltip, Typography } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BookingDetails from '../redux/actions/bookingActions';

const { Title, Text } = Typography;
const { Option } = Select;

const BookingHistory = () => {
    const bookingHistory = useSelector((state) => state.booking);
    const [formData, setFormData] = useState({ members: [] });
    const [dataSource, setDataSource] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [rowIndex, setRowIndex] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        setDataSource(bookingHistory);
    }, [bookingHistory])

    useEffect(() => {
        const membersArray = bookingHistory.find(x => x.uuid === rowIndex)?.members;
        setFormData({ members: membersArray });
    }, [rowIndex])

    useEffect(() => {
        PiligrimForm.setFieldValue({ members: formData});
    }, [formData])


    const columns = [
        {
            title: 'VIP Name',
            dataIndex: 'candidateName',
            key: 'candidateName'
        },
        // {
        //     title: 'Party name',
        //     dataIndex: 'party',
        //     key: 'party'
        // },
        {
            title: 'Constituency',
            dataIndex: 'constituency',
            key: 'constituency'
        },
        {
            title: 'Temple',
            dataIndex: 'temple',
            key: 'temple'
        },
        // {
        //     title: 'Booking Date',
        //     dataIndex: 'bookingDate',
        //     key: 'bookingDate'
        // },
        {
            title: 'Darshanam Date',
            dataIndex: 'darshanamDate',
            key: 'darshanamDate',
            render: (text, record, index) => (<>
                {moment(record.darshanamDate).format('DD-MM-YYYY')}
            </>
            )
        },
        {
            title: 'Accommodation',
            dataIndex: 'isAccommodation',
            key: 'isAccommodation',
            render: (text, record, index) => (<>
                {record.isAccommodation === 'Y' ? 'Yes' : 'No'}
            </>
            )
        },
        {
            title: 'Accommodation Date',
            dataIndex: 'accommodation',
            key: 'accommodation',
            render: (text, record, index) => (<>
                {record.isAccommodation === 'Y' ? moment(record.accommodation).format('DD-MM-YYYY') : ''}
            </>
            )
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (text, record, index) => (<>
        //         {(index >= 0 && index < 5) && <Tag color="orange">Pending</Tag>}
        //         {(index >= 5 && index < 9) && <Tag color="green">Approved</Tag>}
        //         {(index >= 9 && index < 13) && <Tag color="red">Rejected</Tag>}

        //     </>
        //     )
        // },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <Flex gap={10}>
                    <Tooltip title='View/Edit Members'>
                        <EditOutlined style={{ color: 'blue', fontSize: 16, cursor: 'pointer' }} onClick={() => { setRowIndex(record.uuid); setIsOpen(true) }} />
                    </Tooltip>
                    <Tooltip title='Accept'>
                        <CheckOutlined style={{ color: 'green', fontSize: 16, cursor: 'pointer' }} />
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure to reject this booking?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <CloseOutlined style={{ color: 'red', fontSize: 16, cursor: 'pointer' }} />
                    </Popconfirm>
                </Flex>
            )
        }
    ]

    const [form] = Form.useForm();
    const [PiligrimForm] = Form.useForm();

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
                setRowIndex(null);
            })
    }

    return (
        <>
            <Title level={4}> Booking History</Title><br />

            <Form
                layout="vertical"
                name="historyForm"
                form={form}
            >
                {/* Main form items in a responsive row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <Form.Item
                        name="category"
                        label="Category"
                    >
                        <Select placeholder="Select Category" style={{ width: 250 }}>
                            <Option value='mla'>MLA</Option>
                            <Option value='rmp'>RMP</Option>
                            <Option value='lmp'>LMP</Option>
                            <Option value='mlc'>MLC</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="constituency"
                        label="Constituency"
                    >
                        <Select placeholder="Select Constituency" style={{ width: 250 }}>

                        </Select>
                    </Form.Item>

                    <Form.Item label=" ">
                        <Button type="primary" onClick={() => form.submit()} style={{ backgroundColor: 'rgb(206, 85, 36)', color: '#ffffff', border: 'none' }}>Search</Button>
                    </Form.Item>
                </div>
            </Form>
            <br /> <br />
            <Table
                dataSource={dataSource}
                columns={columns}
                size='small'
                className='bordered-table'
                pagination={{ pageSize: 12 }}
                style={{ width: '90%' }}
            />

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
                width={'90%'}
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
                    initialValues={formData}
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

export default BookingHistory