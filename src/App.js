import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ConfigProvider, Layout, Menu, Typography, List, theme, Image, Flex, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import themeConfig from "./config/themeConfig.json";
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import { setUser } from './redux/actions/authActions';

const { Header, Content, Footer } = Layout;
const { components } = themeConfig;
const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

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

  const handleLogout = () => {
    dispatch(setUser({}));
    //navigate("/"); // "/" represents the home page route 
  };

  return (
    <ConfigProvider
      theme={{
        components: components
      }}
    >

      <Router>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Flex justify='space-between' align='center'>
              <div className="logo" style={{ color: 'white', fontSize: '24px', width: '100%' }}>
                <Image src='https://aptemples.ap.gov.in/static/media/ap-temples-logo.556d4f9f.svg' />
              </div>
              {isAuthenticated && <div>
                <Button
                  style={{ backgroundColor: '#ce5524', color: '#ffffff', border: 'none', fontWeight: 600 }}
                  icon={<LogoutOutlined />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
              }
            </Flex>
          </Header>

          {/* Fixed div for Ant Design Menu */}
          <div
            style={{
              position: 'fixed',
              top: 90, // Just below the header
              left: 0,
              right: 0,
              zIndex: 10, // Ensure it's above other content
              backgroundColor:'#9a031e',
              height:50
            }}
          >
            {isAuthenticated &&
            <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ paddingLeft: 40 }}>
              <Menu.Item key="1"><Link to="/">Temples</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/onlinebooking">Sevas & Darshanam</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/history">Booking History</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/services">Services</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/contact">Contact</Link></Menu.Item>
            </Menu>
}
          </div>

          <Content style={{ padding: '50px', background: '#fff', marginTop: 80, minHeight:'80vh' }}>
            <div>
              {!isAuthenticated && <Login />}
              {isAuthenticated && <AppRoutes />}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            AP Temples ©2024 Created by YourName
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;