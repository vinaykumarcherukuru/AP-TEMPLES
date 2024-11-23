import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ConfigProvider, Layout, Menu, Typography, List, theme, Image, Flex, Button } from 'antd';
import themeConfig from "./config/themeConfig.json";
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import Logout from './pages/Logout';

const { Header, Content, Footer } = Layout;
const { components } = themeConfig;
const { defaultAlgorithm, darkAlgorithm } = theme;
const { Text } = Typography;

function App() {
  const { isAuthenticated, candidateName, role } = useSelector((state) => state.auth);
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
                <Image src='https://aptemples.ap.gov.in/static/media/ap-temples-logo.556d4f9f.svg' preview={false} />
              </div>
              {isAuthenticated && <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <Text style={{ color: '#fff', width: 200, fontSize: 16 }}>Welcome {candidateName}</Text>
                <Logout />
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
              backgroundColor: '#9a031e',
              height: 50
            }}
          >
            {isAuthenticated &&
              <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ paddingLeft: 40 }}>
              {/* {role !== 'eo' && <Menu.Item key="2"><Link to="/dashboard">Dashboard</Link></Menu.Item>} */}
                {role !== 'eo' && <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>}
                <Menu.Item key="3"><Link to="/onlinebooking">VIP Darshanam</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/history">Booking History</Link></Menu.Item>
                {/* <Menu.Item key="4"><Link to="/services">Services</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/contact">Contact</Link></Menu.Item> */}
              </Menu>
            }
          </div>

          <Content style={{ padding: '50px', background: '#fff', marginTop: 80, minHeight: '80vh' }}>
            <div>
              {!isAuthenticated && <Login />}
              {isAuthenticated && <AppRoutes />}
            </div>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;