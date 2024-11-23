import { CheckOutlined, CloseOutlined, EditOutlined, EyeOutlined, MinusCircleOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Flex, Form, Input, Modal, notification, Popconfirm, Select, Space, Table, Tag, Tooltip, Typography } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ModalViewMembers } from '../components/ModalViewMembers';
import BookingDetails from '../redux/actions/bookingActions';

const { Title, Text } = Typography;
const { Option } = Select;

const BookingHistory = () => {
    const { role } = useSelector((state) => state.auth);
    const bookingHistory = useSelector((state) => state.booking);
    const [dataSource, setDataSource] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [rowIndex, setRowIndex] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 2
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (role) {
            role === 'eo' ? setDataSource(bookingHistory) : setDataSource(bookingHistory.filter(x => x.role === role));
        }
    }, [bookingHistory])

    const openModal = async (uuid) => {
        setRowIndex(uuid);
        setIsOpen(true);
    }

    const columns = [
        {
            title: 'VIP Name',
            dataIndex: 'role',
            key: 'role',
            render: (text, record) => (
                <>
                    {`${record?.candidateName} - (${record?.role?.toUpperCase()})`}
                </>
            )
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
                {moment(record.darshanamDate.toString()).local().format('DD-MMM-YYYY')}
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
                {record.isAccommodation === 'Y' ? moment(record.accommodationDate.toString()).local().format('DD-MMM-YYYY') : ''}
            </>
            )
        },
        {
            title: 'Piligrim Name',
            dataIndex: 'piligrimName',
            key: 'piligrimName ',
            render: (text, record, index) => (<div style={{ marginLeft: 30 }} >
                {record?.members[0].name}
            </div>
            )
        },
        {
            title: 'Piligrim Count',
            dataIndex: 'piligrim',
            key: 'piligrim ',
            render: (text, record, index) => (<div style={{ marginLeft: 30 }} >
                {record?.members?.length > 0 && <Badge size="default" count={record?.members?.length} />}
            </div>
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
                        <EditOutlined style={{ color: 'blue', fontSize: 16, cursor: 'pointer' }} onClick={() => openModal(record.uuid)} />
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

    const handleTableChange = (newPagination) => {
        setPagination({
            //...pagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        });
    };

    return (
        <>
            <Title level={4}> Booking History</Title><br />

            {role === 'eo' && <>
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
            </>
            }
            <Table
                dataSource={dataSource}
                columns={columns}
                size='small'
                className='bordered-table'
                pagination={{
                    //...pagination,
                    showSizeChanger: true,
                    //showQuickJumper: true,
                    //showPrevNextJumpers: true,
                    // pageSizeOptions: ["2", "4", "6"],
                    // onShowSizeChange: (current, size) => {
                    //     setPagination({ ...pagination, current, pageSize: size });
                    // },
                    showTotal: (total, range) =>
                        `Showing ${range[0]}-${range[1]} of ${total} records`
                }}
                onChange={handleTableChange}
                style={{ width: '90%', marginTop: 10 }}
            />

            <ModalViewMembers rowIndex={rowIndex} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

export default BookingHistory