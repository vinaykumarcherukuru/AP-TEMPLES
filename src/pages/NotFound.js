import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography;

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <Title level={2}>404 - Page Not Found</Title>
                <p>
                    <Text>The page you are looking for does not exist.</Text>
                </p>
                <Link to="/">Go Back to Home</Link>
            </div>
        </div>
    )
}

export default NotFound