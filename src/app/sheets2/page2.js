'use client';

import { useEffect, useState } from "react";
import { fetchSheetsData, fetchCompanies } from "@/api/fetchSheetsData";
import CustomerTable from "@/components/dashboard/CustomerTable/CustomerTable";
import { Select } from "antd";
import { useSession } from "next-auth/react";

const { Option } = Select;

const SheetDataComponent = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [loading, setLoading] = useState(true);

  // Busca as empresas ao carregar o componente
  useEffect(() => {
    fetchCompanies().then((fetchedCompanies) => {
      setCompanies(fetchedCompanies);
    });
  }, []);

  // Busca os dados filtrados quando selectedCompany muda
  useEffect(() => {
    if (!session) return; // não buscar dados se não autenticado

    setLoading(true);
    const companyId = selectedCompany === "all" ? null : selectedCompany;
    fetchSheetsData(companyId)
      .then((fetchedData) => {
        console.log("Dados filtrados:", fetchedData);
        setData(fetchedData);
      })
      .finally(() => setLoading(false));
  }, [selectedCompany, session]);

  const handleCompanyChange = (value) => {
    setSelectedCompany(value || "all");
  };

  if (status === "loading") return <p>Carregando sessão...</p>;
  if (!session) return <p>Por favor, autentique-se para ver os dados.</p>;

  return (
    <div>
      <h2>Dados do Banco</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Filtrando por Empresa: </label>
        <Select
          style={{ width: 200, marginLeft: 8 }}
          placeholder="Selecione uma empresa"
          onChange={handleCompanyChange}
          allowClear
          value={selectedCompany}
        >
          <Option value="all" key="all">Todas</Option>
          {companies.map((company) => (
            <Option key={company.id} value={company.id}>
              {company.name}
            </Option>
          ))}
        </Select>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <CustomerTable data={data} />
      )}
    </div>
  );
};

export default SheetDataComponent;
