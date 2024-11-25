import { CheckOutlined, CloseOutlined, EditOutlined, EyeOutlined, FileExcelOutlined, FilePdfOutlined, MinusCircleOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Flex, Form, Input, Modal, notification, Popconfirm, Select, Space, Table, Tag, Tooltip, Typography } from 'antd'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ModalViewMembers } from '../components/ModalViewMembers';
import BookingDetails from '../redux/actions/bookingActions';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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

    const onSearch = (searchOptions) => {
        const { category, constituency } = searchOptions; // Extract the values from searchOptions
        const filterRecords = bookingHistory.filter(x =>
            (category === 'all' || x.role === category) &&
            (constituency === 'all' || x.constituency === constituency)
        );

        setDataSource(filterRecords);
        return false;
    }

    // Function to export data to Excel
   /* const exportToExcel = () => {
        // Exclude columns fields
        // const allowedColumns = bookingHistory.map(({ uuid, member, ...rest }) => rest);

        // Exclude columns fields and format `darshanamDate` and `accommodationDate` using moment.js
        const allowedColumns = bookingHistory.map(({ uuid, members, darshanamDate, accommodationDate, ...rest }) => {
            // Format `darshanamDate` and `accommodationDate` using moment.js to 'DD-MM-YYYY' format
            const formattedDarshanamDate = darshanamDate ? moment(darshanamDate).format('DD-MM-YYYY') : '';
            const formattedAccommodationDate = accommodationDate ? moment(accommodationDate).format('DD-MM-YYYY') : '';

            return {
                ...rest,
                darshanamDate: formattedDarshanamDate,
                accommodationDate: formattedAccommodationDate
            };
        });
        // Determine the dynamic filename based on the 'role' of the first record (you can modify this logic as needed)
        const candidateName = bookingHistory[0].candidateName;
        const role = bookingHistory[0].role;  // Get role from the first item, or adjust for dynamic role logic
        const filename = `${candidateName}_(${role}).xlsx`;  // Filename based on role



        // Convert the bookingHistory array to a worksheet
        const ws = XLSX.utils.json_to_sheet(allowedColumns);

        // Create a new workbook with the worksheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, `${candidateName}_(${role})`);

        // Create a separate sheet for `members` as a table 

        // Flatten the `members` data and include parent fields
        const memberData = bookingHistory.flatMap(item =>
            item.members.map(member => ({
                Name: member.name,
                Age: member.age,
                Gender: member.gender,
                Mobile: member.mobile,
                Aadhar: member.aadhar
            }))
        );
        const memberWs = XLSX.utils.json_to_sheet(memberData);
        XLSX.utils.book_append_sheet(wb, memberWs, "Piligrim Details");

        // Write the workbook to a file
        XLSX.writeFile(wb, filename);
    };*/

    const exportToExcel_bak = () => {
        const excelData = [];
        const boldStyle = { font: { bold: true } }; // Define bold style
    
        // Iterate over the booking history data
        bookingHistory.forEach((item, index) => {
            // Add the candidate name and role as a header for each record
            if (index > 0) {
                excelData.push([]); // Add an empty row between records
            }
    
            // Add candidate details (bold)
            excelData.push([{ v: `${item.candidateName} - ${item.role.toUpperCase()}`, s: boldStyle }]);
    
            // Add other details for the current record
            excelData.push([`Temple: ${item.temple}`]);
            excelData.push([`Constituency: ${item.constituency}`]);
            excelData.push([`Darshanam Date: ${moment(item.darshanamDate.toString()).local().format('DD-MMM-YYYY')}`]);
            excelData.push([`Accommodation: ${item.isAccommodation ? 'YES' : 'NO'}`]);
            excelData.push([`Accommodation Date: ${moment(item.accommodationDate.toString()).local().format('DD-MMM-YYYY')}`]);
            excelData.push([`Booking Date: ${item.bookingDate}`]);
    
            // Add Members data if available (bold "Members Table" and headers)
            if (item.members && item.members.length > 0) {
                excelData.push([{ v: 'Piligrim Details', s: boldStyle }]); // Bold "Members Table"
                excelData.push([
                    { v: 'Name', s: boldStyle },
                    { v: 'Age', s: boldStyle },
                    { v: 'Gender', s: boldStyle },
                    { v: 'Mobile', s: boldStyle }
                ]); // Bold headers for the members table
                
                // Add member rows
                item.members.forEach(member => {
                    excelData.push([member.name, member.age, member.gender, member.mobile]);
                });
            }
        });
    
        // Create a new Excel sheet and add the data
        const ws = XLSX.utils.aoa_to_sheet(excelData);
    
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'BookingHistory');
    
        // Save the Excel file
        XLSX.writeFile(wb, 'BookingHistory.xlsx');
    };

    const exportToExcel = () => {
        const excelData = [];
    
        // Add header row
        excelData.push([
            'Constituency',
            'Temple',
            'DarshanamDate',
            'Accommodation',
            'AccommodationDate',
            'PiligrimName',
            'Age',
            'Gender',
            'Mobile',
            'Aadhar',
        ]);
    
        // Iterate over the booking history data
        bookingHistory.forEach((item, index) => {
            // Add an empty row before each record except the first
            if (index > 0) {
                excelData.push([]);
            }
    
            const commonDetails = [
                item.constituency,
                item.temple,
                moment(item.darshanamDate.toString()).local().format('DD-MMM-YYYY'),
                item.isAccommodation ? 'YES' : 'NO',
                item.accommodationDate
                    ? moment(item.accommodationDate.toString()).local().format('DD-MMM-YYYY')
                    : '',
            ];
    
            if (item.members && item.members.length > 0) {
                // Add a row for each member
                item.members.forEach((member) => {
                    excelData.push([
                        ...commonDetails,
                        member.name,
                        member.age,
                        member.gender,
                        member.mobile,
                        member.aadhar || '', // Include Aadhar if available
                    ]);
                });
            } else {
                // If no members, add a single row with placeholders for member details
                excelData.push([
                    ...commonDetails,
                    '', // PiligrimName
                    '', // Age
                    '', // Gender
                    '', // Mobile
                    '', // Aadhar
                ]);
            }
        });
    
        // Create a new Excel sheet and add the data
        const ws = XLSX.utils.aoa_to_sheet(excelData);
    
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'BookingHistory');
    
        // Save the Excel file
        XLSX.writeFile(wb, 'BookingHistory.xlsx');
    };
    
    

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);

        // Initialize the current Y position
        let yPos = 20; // Start near the top of the page

        // Iterate over the booking history data
        bookingHistory.forEach((item, index) => {
            if (index > 0) {
                doc.addPage(); // Add a new page for each record after the first one
                yPos = 20; // Reset the Y position to the top of the new page
            }

            // Set font to bold for the candidate name and role (like <strong>)
            doc.setFont('helvetica', 'bold');

            // Add candidate name and role in bold (equivalent to <strong>)
            doc.text(`${item.candidateName} - ${item.role.toUpperCase()}`, 20, yPos);

            // Update Y position after the title
            yPos += 10; // Increase Y position for the next line of content

            // Reset the font to normal for other text
            doc.setFont('helvetica', 'normal');

            // Add other details for the current record
            doc.text(`Temple: ${item.temple}`, 20, yPos);
            yPos += 10; // Move Y position down after each line

            doc.text(`Constituency: ${item.constituency}`, 20, yPos);
            yPos += 10;

            doc.text(`Darshanam Date: ${moment(item.darshanamDate.toString()).local().format('DD-MMM-YYYY')}`, 20, yPos);
            yPos += 10;

            doc.text(`Accommodation: ${item.isAccommodation ? 'YES' : 'NO'}`, 20, yPos);
            yPos += 10;

            doc.text(`Accommodation Date: ${moment(item.accommodationDate.toString()).local().format('DD-MMM-YYYY')}`, 20, yPos);
            yPos += 10;

            doc.text(`Booking Date: ${item.bookingDate}`, 20, yPos);
            yPos += 10;

            // Members Table
            const memberData = item.members.map(member => ({
                Name: member.name,
                Age: member.age,
                Gender: member.gender,
                Mobile: member.mobile,
            }));

            // Add a table for members if there are any
            if (memberData.length > 0) {
                doc.autoTable({
                    startY: yPos, // Start table where the previous content ended
                    head: [['Name', 'Age', 'Gender', 'Mobile']],
                    body: memberData.map(member => [member.Name, member.Age, member.Gender, member.Mobile]),
                    theme: 'striped',
                    margin: { top: 10 },
                });

                // Get the Y position after the table for the next content
                yPos = doc.lastAutoTable.finalY + 10; // Adjust according to the table's final position
            }

            // If Y position goes beyond page height, add a new page
            if (yPos > 250) {
                doc.addPage();
                yPos = 20; // Reset Y position to the top of the new page
            }
        });

        // Save the document as a PDF
        doc.save('BookingHistory.pdf');
    };

    return (
        <>
            <Flex justify='space-between' align='center'>
                <Title level={4}> Booking History</Title><br />
                <div style={{ marginTop: 20 }}>
                    <Space>
                        <Button icon={<FileExcelOutlined style={{ color: 'green' }} />} onClick={exportToExcel}>Export to Excel</Button>
                        <Button icon={<FilePdfOutlined style={{ color: 'red' }} />} onClick={exportToPDF}>Export to PDF</Button>
                    </Space>
                </div>
            </Flex>

            {role === 'eo' && <>
                <Form
                    layout="vertical"
                    name="historyForm"
                    form={form}
                    initialValues={{ category: 'all', constituency: 'all' }}
                    onFinish={onSearch}
                >
                    {/* Main form items in a responsive row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                        <Form.Item
                            name="category"
                            label="Category"
                        >
                            <Select placeholder="Select Category" style={{ width: 250 }}>
                                <Option value='all'>ALL</Option>
                                <Option value='lmp'>LMP</Option>
                                <Option value='mla'>MLA</Option>
                                <Option value='mlc'>MLC</Option>
                                <Option value='rmp'>RMP</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="constituency"
                            label="Constituency"
                        >
                            <Select placeholder="Select Constituency" style={{ width: 250 }}>
                                <Option value='all'>All</Option>
                                {[...new Set(bookingHistory.map((item) => item.constituency))].sort().map((val) => (
                                    <Option key={val} value={val}>
                                        {val}
                                    </Option>
                                ))}
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