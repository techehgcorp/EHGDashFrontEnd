export const fetchSheetsData = async (companyId = null) => {
  try {
    const url = companyId
      ? `http://localhost:8000/sheets/sheet-data/?company=${companyId}`
      : "http://localhost:8000/sheets/sheet-data/";
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const data = await response.json();
    return data.map((item) => ({
      ...item,
      key: item.id,
    }));
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
};

export const fetchCompanies = async () => {
  try {
    const response = await fetch("http://localhost:8000/company/list");
    if (!response.ok) throw new Error("Erro ao buscar empresas");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar empresas:", error);
    return [];
  }
};