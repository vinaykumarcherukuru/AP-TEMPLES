import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Radio } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const VipDetails = ({ setVIPDetails, isreset }) => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setVIPDetails(dataSource);
    }, [dataSource])

    useEffect(() => {
        setDataSource([]);
    }, [isreset])


    const addNewRow = () => {
        let randomInt = Math.floor(Math.random() * 100) + 1;

        const newRow = {
            key: randomInt,
            name: '',
            age: '',
            aadharNumber: '',
            gender: 'M',
            mobileNumber: ''
        };
        setDataSource([...dataSource, newRow]);
    };

    const handleDelete = (key) => {
        setDataSource(dataSource.filter(x => x.key !== key))
    }

    const handleInputChange = (key, field, value) => {
        const updatedData = dataSource.map((item) => {
            if (item.key === key) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setDataSource(updatedData);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleInputChange(record.key, 'name', e.target.value)}
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
                    onChange={(e) => handleInputChange(record.key, 'age', e.target.value)}
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
                    onChange={(e) => handleInputChange(record.key, 'aadharNumber', e.target.value)}
                />
            )
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text, record) => (
                <Radio.Group defaultValue={'M'} style={{ width: 250 }} onChange={(e) => handleInputChange(record.key, 'gender', e.target.value)}>
                    <Radio value='M'>Male</Radio>
                    <Radio value='F'>Female</Radio>
                    <Radio value='O'>Other</Radio>
                </Radio.Group>
            )
        },
        {
            title: 'Moble Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
            render: (text, record) => (
                <Input
                    value={text}
                    onChange={(e) => handleInputChange(record.key, 'mobileNumber', e.target.value)}
                />
            )
        },
        {
            title: '',
            key: 'action',
            hidden: dataSource.length > 0 ? false : true,
            render: (text, record) => (
                <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(record.key)} />
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
                style={{ width: '80%' }}
                size='small'
                className='bordered-table'
                pagination={false}
            />
        </div>
    );
};

export default VipDetails;
