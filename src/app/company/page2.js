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
      message.error('Erro ao carregar empresas');
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
        message.success('Empresa atualizada com sucesso');
      } else {
        await createCompany(values);
        message.success('Empresa criada com sucesso');
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingCompany(null);
      loadCompanies();
    } catch (err) {
      message.error('Erro ao salvar empresa');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id);
      message.success('Empresa deletada');
      loadCompanies();
    } catch (err) {
      message.error('Erro ao deletar empresa');
    }
  };

  const showEditModal = (company) => {
    setEditingCompany(company);
    form.setFieldsValue(company);
    setIsModalOpen(true);
  };

  const columns = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Endereço', dataIndex: 'address', key: 'address' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Telefone', dataIndex: 'phone', key: 'phone' },
    { title: 'Site', dataIndex: 'website', key: 'website' },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>Editar</Button>
          <Popconfirm
            title="Deseja deletar esta empresa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger>Deletar</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Empresas</h1>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
          form.resetFields();
          setEditingCompany(null);
        }}
        style={{ marginBottom: 16 }}
      >
        Adicionar Empresa
      </Button>
      <Table
        dataSource={companies}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingCompany ? 'Editar Empresa' : 'Nova Empresa'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Salvar"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Endereço">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Telefone">
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Site">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyPage;
