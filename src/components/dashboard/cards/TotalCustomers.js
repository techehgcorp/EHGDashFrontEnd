import React from 'react';
import { Card, Statistic } from 'antd';

const TotalCustomersCard = ({ total }) => {
  return (
    <Card title="Total Registered Customers"
    >
      <Statistic
        value={total}
        valueStyle={{ color: '#3f8600' }}
      />
    </Card>
  );
};

export default TotalCustomersCard;
