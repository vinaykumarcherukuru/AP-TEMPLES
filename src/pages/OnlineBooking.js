import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Space, Typography, notification, Flex } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import BookingDetails from '../redux/actions/bookingActions';

const { Option } = Select;
const { Title, Text } = Typography;

const OnlineBooking = () => {
    const { candidateName, party, constituency, role } = useSelector((state) => state.auth)
    const [isAccommodation, setIsAccommodation] = useState(true);
    const dispatch = new useDispatch();
    const temples = [
        {
            name: 'Kanipakam',
            location: 'Chittoor',
            image: 'https://aptemples.ap.gov.in/static/media/kanipakam.9b4bfaa2.webp'
        },
        {
            name: 'Srikalahasthi',
            location: 'Chittoor',
            image: 'https://aptemples.ap.gov.in/static/media/Srikalahasthi.8f24fb6e.webp'
        },
        {
            name: 'Srisailam',
            location: 'Kurnool',
            image: 'https://aptemples.ap.gov.in/static/media/Srisailam.ff1f7ced.webp'
        },
        {
            name: 'Mahanandi',
            location: 'Kurnool',
            image: 'https://aptemples.ap.gov.in/static/media/Mahanadi.c02e5669.webp'
        },
        {
            name: 'Kasapuram',
            location: 'Guntakal',
            image: 'https://aptemples.ap.gov.in/static/media/Kasapuram.a7036c1d.webp'
        },
        {
            name: 'Vijayawada',
            location: 'Vijayawada',
            image: 'https://aptemples.ap.gov.in/static/media/Vijajayawada.df6b8dc1.webp'
        },
        {
            name: 'Dwaraka Tirumala',
            location: 'Tirumala',
            image: 'https://aptemples.ap.gov.in/static/media/DwaralkaTirumala.6ae0c508.webp'
        },
        {
            name: 'Annavaram',
            location: 'East Godavari',
            image: 'https://aptemples.ap.gov.in/static/media/Anavaram.eb338f61.webp'
        },
        {
            name: 'Simhachalam',
            location: 'Visakhapatnam',
            image: 'https://aptemples.ap.gov.in/static/media/Simhachalam.5eb55b06.webp'
        },
        {
            name: 'Sri Kanaka Mahalakshmi',
            location: 'Burujupeta',
            image: 'https://aptemples.ap.gov.in/static/media/SriKanakaMahalakshmi.00641c25.webp'
        },
        {
            name: 'Penuganchiprolu',
            location: 'Vijayawada',
            image: 'https://aptemples.ap.gov.in/static/media/Penugachiprolu.99e48db0.webp'
        }
    ]

    const [form] = Form.useForm();

    const onFinish = (data) => {
        data.candidateName = candidateName;
        data.party = party;
        data.constituency = constituency;
        data.role = role;
        data.bookingDate = moment().format("DD-MM-YYYY hh:mm:ss A")

        console.log(data)

        dispatch(BookingDetails.AddDetails(data)).then(() => {
            notification.success({
                message: 'Success',
                description: 'Data Submitted Successfully.',
                style: {
                    backgroundColor: '#F6FFED', // Green background (Ant Design success color)
                    color: '#fff', // White text
                },
            })
            form.resetFields();
            // setIsreset(!isreset);
        }
        );
    }

    const dateRender = (current) => {
        // Change the color of weekends to red
        const isWeekend = current.day() === 0 || current.day() === 6;
        if (isWeekend) {
            return (
                <div style={{ color: 'red' }}>
                    {current.date()}
                </div>
            );
        }
        return current.date(); // Return normal date for weekdays
    };

    const disabledDate = (current) => {
        // Disable weekends (Saturday and Sunday)
        const isWeekend = current.day() === 0 || current.day() === 6; // 0 is Sunday, 6 is Saturday

        // Only allow November and December 2024, and disable weekends
        const allowedMonths = ['2024-11', '2024-12']; // Only allow Nov and Dec 2024
        const isDisabledMonth = !allowedMonths.includes(current.format('YYYY-MM')); // Disable non-allowed months

        return isWeekend || isDisabledMonth; // Disable weekends and non-allowed months
    };

    return (<>
        <Title level={4}>VIP Darshanam</Title>
        <br />

        <Form
            layout="vertical"
            name="bookingForm"
            initialValues={{ isAccommodation: 'Y', members: [{}] }}
            form={form}
            onFinish={onFinish}
        >
            {/* Main form items in a responsive row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Form.Item
                    name="temple"
                    label="Temple"
                    rules={[{ required: true, message: 'Temple name required!' }]}
                >
                    <Select placeholder="Select temple" style={{ width: 250 }}>
                        {temples.map((temple, index) => (
                            <Option key={index} value={temple.name}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={temple.image}
                                        alt={temple.name}
                                        style={{ width: 25, height: 25, marginRight: 10 }}
                                    />
                                    {temple.name} - {temple.location}
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="darshanamDate"
                    label="Darshan Date"
                    format
                    rules={[{ required: true, message: 'Darshan date required!' }]}
                >
                    <DatePicker
                        style={{ width: 250 }}
                        disabledDate={disabledDate}
                        //dateRender={dateRender}
                        format='DD-MM-YYYY'
                    />
                </Form.Item>

                <Form.Item
                    name="isAccommodation"
                    label="Accommodation"
                >
                    <Select style={{ width: 250 }} onChange={(value) => setIsAccommodation(value === 'Y' ? true : false)}>
                        <Option value="Y">Yes</Option>
                        <Option value="N">No</Option>
                    </Select>
                </Form.Item>
                {isAccommodation &&
                    <Form.Item
                        name="accommodationDate"
                        label="Accommodation Date"
                        rules={[{ required: true, message: 'Accommodation date required!' }]}
                    >
                        <DatePicker
                            style={{ width: 250 }}
                            disabledDate={disabledDate}
                            //dateRender={dateRender}
                            format='DD-MM-YYYY'
                        />
                    </Form.Item>
                }

                <Form.Item label=" ">
                    <Button type="primary" onClick={() => form.submit()} style={{ backgroundColor: 'rgb(206, 85, 36)', color: '#ffffff', border: 'none' }}>Submit</Button>
                </Form.Item>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 35, marginBottom: 20 }}>
                <div>
                    <strong>Member Details</strong>
                </div>
                <div style={{ color: 'gray' }}>
                    {`(You can add up to 5 members)`}
                </div>
            </div>

            {/* Member details */}
            <Form.List name="members">
                {(fields, { add, remove }) => (
                    <div>
                        {fields.map((field, index) => (
                            <Space key={field.key} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'name']}
                                    fieldKey={[field.fieldKey, 'name']}
                                    label={index === 0 ? 'Name' : ''}
                                    rules={[{ required: true, message: 'Name required!' }]}
                                    style={{ flex: '1 1 150px' }}
                                >
                                    <Input placeholder="Name" />
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
                            <Form.Item style={{ textAlign: 'center', width: '60%'}}>
                                <Button
                                    type="link"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusCircleOutlined />}
                                    style={{ color: 'black', marginTop: 10, width:100 }}
                                >
                                    Add Member
                                </Button>
                            </Form.Item>
                        }
                    </div>
                )}
            </Form.List>
        </Form>
    </>
    );
};

export default OnlineBooking;