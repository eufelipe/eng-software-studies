type DataProcessor = (data: number[]) => number;

const calculateSum: DataProcessor = (data) => data.reduce((a, b) => a + b, 0);

const calculateAverage: DataProcessor = (data) => {
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
};

// Esta função viola o LSP porque altera o comportamento esperado
const calculatePositiveSum: DataProcessor = (data) => {
    const positiveData = data.filter(n => n > 0);
    return positiveData.reduce((a, b) => a + b, 0);
};

function processFinancialData(processor: DataProcessor, data: number[]) {
    console.log(`Processed result: ${processor(data)}`);
}

// Uso
const dataset = [-10, 5, 15, -5, 10];

processFinancialData(calculateSum, dataset);       // Processed result: 15
processFinancialData(calculateAverage, dataset);   // Processed result: 3
processFinancialData(calculatePositiveSum, dataset); 