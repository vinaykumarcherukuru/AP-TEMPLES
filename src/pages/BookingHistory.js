import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Modal, Popconfirm, Select, Space, Table, Tag, Tooltip, Typography } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { Option } = Select;

const BookingHistory = () => {
    const bookingHistory = useSelector((state) => state.booking);
    const [dataSource, setDataSource] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [rowIndex, setRowIndex] = useState(null);

    useEffect(() => {
        setDataSource(bookingHistory);
    }, [bookingHistory])

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
                    <Tooltip title='View Members'>
                        <EyeOutlined style={{ color: 'blue', fontSize: 16, cursor: 'pointer' }} onClick={() => { setRowIndex(index); setIsOpen(true) }} />
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

    const ColMembers = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Aadhar Number',
            dataIndex: 'aadhar',
            key: 'aadhar'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text, record, index) => (<>
                {record.gender === 'M' && <Text>Male</Text>}
                {record.gender === 'F' && <Text>Female</Text>}
                {record.gender === 'O' && <Text>Other</Text>}
            </>
            )
        },
        {
            title: 'Moble Number',
            dataIndex: 'mobile',
            key: 'mobile'
        }
    ]

    const [form] = Form.useForm();

    return (
        <>
            <Title level={4}> Booking History</Title><br/>

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
            <br/> <br/>
            <Table
                dataSource={dataSource}
                columns={columns}
                size='small'
                className='bordered-table'
                pagination={{ pageSize: 12 }}
                style={{ width: '90%' }}
            />

            <Modal title="Member Details" centered open={isOpen} onOk={() => setIsOpen(false)} onCancel={() => setIsOpen(false)}>
                <br />
                <Table
                    dataSource={dataSource[rowIndex]?.members}
                    columns={ColMembers}
                    size='small'
                    className='bordered-table'
                    pagination={false}
                    scroll={{ x: "max-content" }}
                />
                <br />
            </Modal>
        </>
    )
}

export default BookingHistory