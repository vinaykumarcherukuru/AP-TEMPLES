import React, { useRef, useState } from 'react'
import { Form, Select, Button, Typography, Row, Col, Flex, Input, Radio, DatePicker, notification } from 'antd';
import moment from 'moment';
import TwoMonthsDatePicker from '../components/TwoMonthsDatePicker';
import VipDetails from '../components/VipDetails';
import BookingDetails from '../redux/actions/bookingActions';
import { useDispatch } from 'react-redux';

const { Title, Text } = Typography;
const { Option } = Select;

const OnlineBooking = () => {
  const [vipDetails, setVIPDetails] = useState([]);
  const [isreset, setIsreset] = useState(false);
  const [form] = Form.useForm();
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

  // Disable weekends (Saturday and Sunday)
  const disableWeekends = current => {
    // Disable Saturday and Sunday
    return current && (current.day() === 6 || current.day() === 0);
  };

  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (data) => {
    data.darshanmDate = data.darshanamDate.format('DD/MM/YYYY');
    data.Members = vipDetails;

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
      setIsreset(!isreset);
    }
    );
  }

  const disabledDate = (current) => {
    // Disable weekends (Saturday and Sunday)
    const isWeekend = current.day() === 0 || current.day() === 6; // 0 is Sunday, 6 is Saturday

    // Only allow November and December 2024, and disable weekends
    const allowedMonths = ['2024-11', '2024-12']; // Only allow Nov and Dec 2024
    const isDisabledMonth = !allowedMonths.includes(current.format('YYYY-MM')); // Disable non-allowed months

    return isWeekend || isDisabledMonth; // Disable weekends and non-allowed months
  };

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
  return (
    <>
      <Flex justify='space-between' align='center'>
        <Title level={4}>Darshanam Booking</Title>
        <Button style={{ backgroundColor: 'rgb(206, 85, 36)', color: '#ffffff', border: 'none' }} onClick={handleSubmit}>Submit</Button>
      </Flex>
      <br />

      <Form
        name="form_booking"
        layout='vertical'
        form={form}
        onFinish={onFinish}
        //style={{ width: '30%' }}
        // labelCol={{
        //   span: 2,
        // }}
        // wrapperCol={{
        //   span: 24,
        // }}
        initialValues={{ accommodation: 'Y' }}
      >
        <Flex gap={20} align='center' wrap>
          <Form.Item
            label='Select Temple'
            name='temple'
            rules={[{ required: true, message: 'Please select temple!' }]}
          >
            <Select placeholder="Select a temple" style={{ width: 300 }}>
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

          <Form.Item name="darshanamDate" label="Darshan Date" rules={[{ required: true, message: 'Please select Date!' }]}>
            <DatePicker
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
              dateRender={dateRender}
            />

          </Form.Item>

          <Form.Item name='accommodation' label="Accommodation" rules={[{ required: true, message: 'Please select Accommodation!' }]}>
            <Select placeholder="Select a Accommodation">
              <Option value="Y">Yes</Option>
              <Option value="N">No</Option>
            </Select>
          </Form.Item>
        </Flex>
      </Form>

      {/* <Title level={4}>Details for VIP Darshanam</Title> <br /> */}<br /><br />

      <VipDetails setVIPDetails={setVIPDetails} isreset={isreset} />
    </>
  )
}

export default OnlineBooking