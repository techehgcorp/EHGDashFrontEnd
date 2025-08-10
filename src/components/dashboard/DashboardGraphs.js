import React from 'react';
import { Row, Col } from 'antd';
import TotalCustomersCard from './cards/TotalCustomers';
import CustomersAddedChart from './cards/AddedByData';
import ZipCodeDistributionChart from './cards/FilterByZipcode';


const DashboardGraphs = ({ totalCustomers, customersAddedData, zipCodeDistributionData }) => {
  return (
    <Row gutter={[16, 16 ]} style={{ marginLeft: '16px' }}>
      <Col span={6}>
        <TotalCustomersCard total={totalCustomers} />
      </Col>
      <Col span={8}>
        <CustomersAddedChart data={customersAddedData} />
      </Col>
      <Col span={8}>
        <ZipCodeDistributionChart data={zipCodeDistributionData} />
      </Col>
    </Row>
  );
};

export default DashboardGraphs;
