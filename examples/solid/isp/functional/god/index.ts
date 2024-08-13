// Tipos específicos para diferentes responsabilidades
type TaxCalculator = {
  calculateTax: (income: number) => number;
};

type DiscountCalculator = {
  calculateDiscount: (amount: number) => number;
};

type InvoiceGenerator = {
  generateInvoice: (amount: number) => string;
};

// Implementações específicas
const taxCalculator: TaxCalculator = {
  calculateTax: (income) => income * 0.2,
};

const discountCalculator: DiscountCalculator = {
  calculateDiscount: (amount) => amount * 0.1,
};

const invoiceGenerator: InvoiceGenerator = {
  generateInvoice: (amount) => `Invoice for ${amount}`,
};
