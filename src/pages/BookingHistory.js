import { EyeOutlined } from '@ant-design/icons';
import { Button, Table, Tag, Typography } from 'antd'
import React from 'react'

const { Title, Text } = Typography;

const BookingHistory = () => {

    const columns = [
        {
            title: 'Temple',
            dataIndex: 'temple',
            key: 'temple'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'Darshanam Date',
            dataIndex: 'darshanamDate',
            key: 'darshanamDate'
        },
        {
            title: 'Accomidation Date',
            dataIndex: 'accomidationDate',
            key: 'accomidationDate'
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobilenumber',
            key: 'mobilenumber'
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
            render: (text, record) => (
                <><EyeOutlined /> View</>
            )
        }
    ]

    const dataSource = [
        {
            temple: 'Sri kalahasthy',
            type: 'Dharshanam',
            darshanamDate: '05/12/2024',
            accomidationDate: '05/12/2024',
            mobilenumber: 123456789
        }
    ]

    return (
        <>
            <Title level={4}> Booking History</Title>

            <Table
                //dataSource={dataSource}
                dataSource={Array.from({ length: 15 }, (_, index) => ({
                    ...dataSource[0], // Spread the first object of dataSource
                    key: index, // Assign a unique key for each row
                }))}
                columns={columns}
                style={{ width: '70%' }}
                size='small'
                className='bordered-table'
                pagination={{ pageSize: 12 }}
            />
        </>
    )
}

export default BookingHistory