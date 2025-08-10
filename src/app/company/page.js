'use client';

import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { Button, Table, Modal, Form, Input, message, Popconfirm } from 'antd';
import {
  fetchCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from '@/api/companyApi';

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (err) {
      message.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleCreateOrUpdate = async (values) => {
    try {
      if (editingCompany) {
        await updateCompany(editingCompany.id, values);
        message.success('Company updated successfully');
      } else {
        await createCompany(values);
        message.success('Company created successfully');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingCompany(null);
      loadCompanies();
    } catch (err) {
      message.error('Failed to save company');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      message.success('Company deleted');
      loadCompanies();
    } catch (err) {
      message.error('Failed to delete company');
    }
  };

  const showEditModal = (company) => {
    setEditingCompany(company);
    form.setFieldsValue(company);
    setIsModalOpen(true);
  };

  // 🧠 Dynamically generate columns based on the first record
  const dynamicColumns = companies[0]
    ? Object.keys(companies[0])
        .filter((key) => key !== 'id') // optional
        .map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          dataIndex: key,
          key,
        }))
    : [];

  const actionColumn = {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <>
        <Button type="link" onClick={() => showEditModal(record)}>Edit</Button>
        <Popconfirm
          title="Are you sure you want to delete this company?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>Delete</Button>
        </Popconfirm>
      </>
    ),
  };

  const columns = [...dynamicColumns, actionColumn];

  return (
    <div style={{ padding: 24 }}>
      <h1>Companies</h1>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
          form.resetFields();
          setEditingCompany(null);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Company
      </Button>
      <Table
        dataSource={companies}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingCompany ? 'Edit Company' : 'New Company'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyPage;
