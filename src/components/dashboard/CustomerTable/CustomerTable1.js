'use client';
import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useSession } from 'next-auth/react';

const CustomerTable = ({ data }) => {
  const { data: session, status } = useSession();
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    if (session && data) {
      setCustomerData(data);
    } else {
      setCustomerData([]);
    }
  }, [session, data]);

  if (!session) return <p>Please authenticate to view data</p>;
  if (!customerData || customerData.length === 0) return <p>No data available</p>;

  const columns = Object.keys(customerData[0]).map((key) => ({
    title: (
      <span
        style={{
          display: 'inline-block',
          maxWidth: '150px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={key.toUpperCase()}
      >
        {key.toUpperCase()}
      </span>
    ),
    dataIndex: key,
    key,
    ellipsis: true,
    width: 150,
  }));

  return (
    <Table
      dataSource={customerData}
      columns={columns}
      bordered
      pagination={{ pageSize: 15 }}
      size="middle"
      scroll={{ x: 'max-content' }}
    />
  );
};

export default CustomerTable;
