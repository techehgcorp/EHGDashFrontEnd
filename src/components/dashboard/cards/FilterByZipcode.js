import React from 'react';
import { Card } from 'antd';
import { Pie } from '@ant-design/charts';

const ZipCodeDistributionChart = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'zipcode',
    radius: 0.8,
    label: {
      // type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-active' }],
    height: 400,
  };

  return (
    <Card title="Registered Clients ZIP Codes">
      <Pie {...config} />
    </Card>
  );
  
};

export default ZipCodeDistributionChart;
