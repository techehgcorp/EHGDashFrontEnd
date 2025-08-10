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