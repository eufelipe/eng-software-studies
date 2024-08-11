export interface DataProcessor {
  (data: string[][]): string;
}

// Funções processadoras específicas
export const jsonProcessor: DataProcessor = (data) => JSON.stringify(data);

export const csvProcessor: DataProcessor = (data) =>
  data.map((row) => row.join(",")).join("\n");

export const xmlProcessor: DataProcessor = (data) =>
  data.map((row) => `<row>${row.join("")}</row>`).join("");

// Função processData que segue o OCP
export const processData = (data: string[][], processor: DataProcessor): string => {
  return processor(data);
};
