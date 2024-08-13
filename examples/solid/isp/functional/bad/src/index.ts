// Um tipo genérico para processar dados financeiros
type FinancialProcessor = {
  calculateTax: (income: number) => number;
  calculateDiscount: (amount: number) => number;
  generateInvoice: (amount: number) => string;
};

const financialProcessor: FinancialProcessor = {
  calculateTax: (income) => income * 0.2,
  calculateDiscount: (amount) => amount * 0.1,
  generateInvoice: (amount) => `Invoice for ${amount}`,
};
