import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const VipDetails = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            name: 'John Doe',
            age: 32,
            aadharNumber: '10 Downing Street',
        },
    ]);
    const [count, setCount] = useState(2);

    const addNewRow = () => {
        const newRow = {
            key: count.toString(),
            name: '',
            age: '',
            aadharNumber: '',
        };
        setDataSource([...dataSource, newRow]);
        setCount(count + 1);
    };

    const handleDelete = (key) => {
        alert(key)
        setDataSource(dataSource.filter(x=>x.key !== key))
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Input
                    value={text}
                //   onChange={(e) => handleChange(e.target.value, record.key, 'name')}

                />
            )
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: (text, record) => (
                <Input
                    value={text}
                // onChange={(e) => handleChange(e.target.value, record.key, 'name')}

                />
            )
        },
        {
            title: 'Aadhar Number',
            dataIndex: 'aadharNumber',
            key: 'aadharNumber',
            render: (text, record) => (
                <Input
                    value={text}
                //   onChange={(e) => handleChange(e.target.value, record.key, 'name')}

                />
            )
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <DeleteOutlined style={{ color: 'red', cursor:'pointer'}} onClick={()=>handleDelete(record.key)} />
            )
        }
    ];

    return (
        <div>
            <Button type="dashed" onClick={addNewRow} icon={<PlusOutlined />} style={{ marginBottom: 16, backgroundColor: 'rgb(206, 85, 36)', color: '#ffffff', border: 'none' }}>
                Add Member
            </Button>
            <Table
                dataSource={dataSource}
                columns={columns}
                style={{ width: '50%' }}
                size='small'
                className='bordered-table'
                pagination={false}
            />
        </div>
    );
};

export default VipDetails;
