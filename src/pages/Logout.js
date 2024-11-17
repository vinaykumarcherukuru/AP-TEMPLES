import { Button } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()).then(() =>
            navigate("/login")
        );
    };
    return (
        <Button
            style={{ backgroundColor: '#ce5524', color: '#ffffff', border: 'none', fontWeight: 600 }}
            icon={<LogoutOutlined />}
            onClick={handleLogout}
        >
            Logout
        </Button>
    )
}

export default Logout