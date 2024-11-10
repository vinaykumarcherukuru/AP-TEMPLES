import React, { useState } from 'react'
import { Form, Select, Button, Typography, Row, Col, Flex, Input } from 'antd';
import moment from 'moment';
import TwoMonthsDatePicker from '../components/TwoMonthsDatePicker';
import VipDetails from '../components/VipDetails';

const { Title, Text } = Typography;
const { Option } = Select;

const OnlineBooking = () => {
  const [type, setType] = useState('DA');
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

  return (
    <>
      <Flex justify='space-between' align='center'>
        <Title level={4}>Darshanam Booking</Title>
        <Button style={{ backgroundColor: 'rgb(206, 85, 36)', color: '#ffffff', border: 'none' }}>Submit</Button>
      </Flex>
      <br />

      <Form
        name="form_booking"
        layout='vertical'
      //style={{ width: '30%' }}
      // labelCol={{
      //   span: 2,
      // }}
      // wrapperCol={{
      //   span: 24,
      // }}
      >
        <Flex gap={20} align='center' wrap>
          <Form.Item label='Select Temple'>
            <Select placeholder="Select a temple" style={{ width: 300 }}>
              {temples.map((temple, index) => (
                <Option key={index} value={temple.name}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={temple.image}
                      alt={temple.name}
                      style={{ width: 40, height: 40, marginRight: 10 }}
                    />
                    {temple.name} - {temple.location}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Seva Type"
            name="sevaType"
            rules={[{ required: true, message: 'Please make a selection!' }]}
          >
            <Select placeholder="Seva Type" style={{ width: 300 }} onChange={(val) => setType(val)} defaultValue={'DA'}>
              <Option value='D'>Darshanam</Option>
              <Option value='A'>Accomidation</Option>
              <Option value='DA'>Darshanam & Accomidation</Option>
            </Select>
          </Form.Item>

          {(type === 'D' || type === 'DA') &&
            <Form.Item label="Darshanam Date">
              <TwoMonthsDatePicker />
            </Form.Item>
          }

          {(type === 'A' || type === 'DA') &&
            <Form.Item label="Accomidation Date">
              <TwoMonthsDatePicker />
            </Form.Item>
          }
        </Flex>

        <Form.Item
          label="Mobile Number"
          name="mobile"
          rules={[{ required: true, message: 'Please make a selection!' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>
        {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item> */}
      </Form>

      <Title level={4}>Details for VIP Darshanam</Title> <br />

      <VipDetails />
    </>
  )
}

export default OnlineBooking