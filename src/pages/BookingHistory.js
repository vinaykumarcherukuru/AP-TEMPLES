import { CheckOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Space, Table, Tag, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

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
            title: 'Constituency',
            dataIndex: 'constituency',
            key: 'constituency',
            render: (text, record, index) => (<>
                MLA
            </>
            )
        },
        {
            title: 'Temple',
            dataIndex: 'temple',
            key: 'temple'
        },
        {
            title: 'Darshanam Date',
            dataIndex: 'darshanmDate',
            key: 'darshanmDate'
        },
        {
            title: 'Accomidation',
            dataIndex: 'accommodation',
            key: 'accommodation'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => (<>
                {(index >= 0 && index < 5) && <Tag color="orange">Pending</Tag>}
                {(index >= 5 && index < 9) && <Tag color="green">Approved</Tag>}
                {(index >= 9 && index < 13) && <Tag color="red">Rejected</Tag>}

            </>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <Flex gap={10}>
                    <Tooltip title='View'>
                        <EyeOutlined style={{ color: 'blue', fontSize: 16, cursor: 'pointer' }} onClick={() => { setRowIndex(index); setIsOpen(true) }} />
                    </Tooltip>
                    <Tooltip title='Accept'>
                        <CheckOutlined style={{ color: 'green', fontSize: 16, cursor: 'pointer' }} />
                    </Tooltip>
                    <Tooltip title='Reject'>
                        <CloseOutlined style={{ color: 'red', fontSize: 16, cursor: 'pointer' }} />
                    </Tooltip>
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
            dataIndex: 'aadharNumber',
            key: 'aadharNumber'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Moble Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber'
        }
    ]

    return (
        <>
            <Title level={4}> Booking History</Title>

            <Table
                dataSource={dataSource}
                columns={columns}
                style={{ width: '70%' }}
                size='small'
                className='bordered-table'
                pagination={{ pageSize: 12 }}
            />

            <Modal title="Member Details" centered open={isOpen} onOk={() => setIsOpen(false)} onCancel={() => setIsOpen(false)}>
                <br />
                <Table
                    dataSource={dataSource[rowIndex]?.Members}
                    columns={ColMembers}
                    size='small'
                    className='bordered-table'
                    pagination={false}
                />
                <br />
            </Modal>
        </>
    )
}

export default BookingHistory