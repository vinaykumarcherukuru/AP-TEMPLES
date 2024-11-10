import React from 'react'
import { List, Image, Typography } from 'antd';

const { Title, Text } = Typography;

const Temples = () => {
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
  return (<>
    <Title level={4}>Famous Temples in Andhra Pradesh</Title> <br />
    <List
      grid={{
        gutter: 24,
        xs: 1,  // 1 column for small screens
        sm: 2,  // 2 columns for small screens
        md: 3,  // 3 columns for medium screens
        lg: 4,  // 4 columns for large screens
        xl: 5   // 5 columns for extra-large screens
      }}
      horizontal
      dataSource={temples}
      renderItem={(item) => (
        <List.Item>
          <div style={{ textAlign: 'center' }}>
            <Image
              width={120}
              src={item.image}
              alt={item.name}
              style={{ borderRadius: '8px' }}
            />
            <Title level={4} style={{ margin: 5 }}>{item.name}</Title>
            <Text>{item.location}</Text>
          </div>
        </List.Item>
      )}
    />
  </>
  )
}

export default Temples