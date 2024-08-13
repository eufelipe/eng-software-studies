// Tipos
export type DataProcessor = (data: number[]) => number;
export type FilteredDataProcessor = (data: number[]) => number;

// Funções de processamento de dados
export const calculateSum: DataProcessor = (data) =>
  data.reduce((a, b) => a + b, 0);

export const calculateAverage: DataProcessor = (data) => {
  const sum = data.reduce((a, b) => a + b, 0);
  return sum / data.length;
};

export const calculatePositiveSum: FilteredDataProcessor = (data) => {
  const positiveData = data.filter((n) => n > 0);
  return positiveData.reduce((a, b) => a + b, 0);
};

// Funções de processamento de dados genéricas
export function processFinancialData(processor: DataProcessor, data: number[]) {
  console.log(`Processed result: ${processor(data)}`);
}

export function processFilteredFinancialData(
  processor: FilteredDataProcessor,
  data: number[]
) {
  console.log(`Processed filtered result: ${processor(data)}`);
}

// Uso
const dataset = [-10, 5, 15, -5, 10];

processFinancialData(calculateSum, dataset); // Processed result: 15
processFinancialData(calculateAverage, dataset); // Processed result: 3
processFilteredFinancialData(calculatePositiveSum, dataset); // Processed filtered result: 30
