import React from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/charts';

const CustomersAddedChart = ({ data }) => {
  const config = {
    data,
    xField: 'period',
    yField: 'count',
    label: {
      // position: 'center',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    meta: {
      period: { alias: 'Period' },
      count: { alias: 'Clients Added' },
    },
    height: 400,
  };

  return (
    <Card title="Added Clients" >
      <Column {...config} />
    </Card>
  );
};

export default CustomersAddedChart;
