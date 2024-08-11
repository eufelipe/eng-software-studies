---
title: Princípio Aberto/Fechado (OCP)
description: Entenda o segundo princípio SOLID e como ele contribui para um design de software extensível e robusto.
---

O Princípio Aberto/Fechado (OCP - Open/Closed Principle) é o segundo dos princípios SOLID e estabelece que **o software deve estar aberto para extensão, mas fechado para modificação**. Em outras palavras, isso significa que o comportamento de um sistema deve ser estendido sem modificar seu código fonte existente.

## Por que o OCP é importante?

### 1. **Extensibilidade**

Seguir o OCP permite que você adicione novas funcionalidades ao sistema sem modificar o código existente, o que reduz o risco de introduzir bugs e facilita a evolução do software.

### 2. **Manutenção Facilitada**

Quando o código é projetado para ser estendido, mas não modificado, as mudanças se tornam menos arriscadas e mais controláveis. Isso é especialmente importante em sistemas grandes e complexos.

### 3. **Redução de Efeitos Colaterais**

Modificações no código existente podem causar efeitos colaterais indesejados em outras partes do sistema. Seguindo o OCP, você minimiza esses riscos, pois novas funcionalidades são implementadas por meio de extensão, não de modificação.

## Exemplo Prático

### **Exemplo 1: Processamento de Relatórios**

Considere um cenário onde você tem uma classe que gera relatórios. Inicialmente, essa classe é capaz de gerar apenas relatórios em formato texto.

#### **❌ Ruim:**

```typescript
export enum ReportType {
  TEXT,
  PDF,
  CSV,
}

class ReportGenerator {
  generate(reportType: ReportType): void {
    switch (reportType) {
      case ReportType.TEXT:
        console.log("Generating text report...");
        break;
      case ReportType.PDF:
        console.log("Generating PDF report...");
        break;
      case ReportType.CSV:
        console.log("Generating CSV report...");
        break;
      default:
        throw new Error("Unsupported report type");
    }
  }
}
```

Exemplo de uso:

```typescript
const generator = new ReportGenerator();

generator.generate(ReportType.TEXT);
generator.generate(ReportType.PDF);
generator.generate(ReportType.CSV);
```

Neste exemplo, a classe `ReportGenerator` viola o OCP porque cada vez que um novo tipo de relatório é adicionado, precisamos modificar a própria classe `ReportGenerator`. Isso aumenta o risco de introduzir bugs e torna a manutenção do código mais difícil, além de criar um código menos flexível.

#### **✅ Bom:**

Vamos refatorar a classe `ReportGenerator` para seguir o OCP, permitindo que novos tipos de relatórios sejam adicionados sem modificar o código existente:

```typescript
interface Report {
  generate(): void;
}
```

```typescript
class TextReport implements Report {
  generate(): void {
    console.log("Generating text report...");
  }
}
```

```typescript
class PDFReport implements Report {
  generate(): void {
    console.log("Generating PDF report...");
  }
}
```

```typescript
class CSVReport implements Report {
  generate(): void {
    console.log("Generating CSV report...");
  }
}
```

```typescript
class ReportGenerator {
  generate(report: Report): void {
    report.generate();
  }
}
```

Agora, a classe `ReportGenerator` segue o OCP. Está aberta para extensão, permitindo que novos tipos de relatório sejam adicionados através da criação de novas classes que implementam a interface `Report`. Não há mais necessidade de modificar a classe `ReportGenerator`, mantendo-a fechada para modificações.

Exemplo de uso:

```typescript
const reportGenerator = new ReportGenerator();

const textReport = new TextReport();
reportGenerator.generate(textReport);

const pdfReport = new PDFReport();
reportGenerator.generate(pdfReport);

const csvReport = new CSVReport();
reportGenerator.generate(csvReport);
```

### **Exemplo 2: Calculadora de Descontos**

Vamos considerar outro exemplo onde uma calculadora de descontos precisa ser capaz de aplicar diferentes tipos de descontos a um pedido.

#### **❌ Ruim:**

```typescript
enum CustomerType {
  Regular,
  Premium,
  VIP
}

class DiscountCalculator {
  calculateDiscount(customerType: CustomerType, purchaseAmount: number): number {
    if (customerType === CustomerType.Regular) {
      return purchaseAmount * 0.1;
    } else if (customerType === CustomerType.Premium) {
      return purchaseAmount * 0.15;
    } else if (customerType === CustomerType.VIP) {
      return purchaseAmount * 0.2;
    }
    return 0;
  }
}
```

Exemplo de uso:

```typescript
const calculator = new DiscountCalculator();

console.log(calculator.calculateDiscount(CustomerType.Regular, 100)); // 10
console.log(calculator.calculateDiscount(CustomerType.Premium, 100)); // 15
console.log(calculator.calculateDiscount(CustomerType.VIP, 100)); // 20
```

Neste exemplo, a classe `DiscountCalculator` viola o OCP. A cada novo tipo de desconto, o código da classe precisa ser alterado, o que compromete a flexibilidade do sistema e pode introduzir erros inesperados.

#### **✅ Bom:**

Vamos refatorar para seguir o OCP:

```typescript
interface DiscountStrategy {
  calculateDiscount(purchaseAmount: number): number;
}
```

```typescript
class RegularDiscountStrategy implements DiscountStrategy {
  calculateDiscount(purchaseAmount: number): number {
    return purchaseAmount * 0.1;
  }
}
```

```typescript
class PremiumDiscountStrategy implements DiscountStrategy {
  calculateDiscount(purchaseAmount: number): number {
    return purchaseAmount * 0.15;
  }
}
```

```typescript
class VIPDiscountStrategy implements DiscountStrategy {
  calculateDiscount(purchaseAmount: number): number {
    return purchaseAmount * 0.2;
  }
}
```

```typescript
class DiscountCalculator {
  constructor(private strategy: DiscountStrategy) {}

  calculateDiscount(purchaseAmount: number): number {
    return this.strategy.calculateDiscount(purchaseAmount);
  }
}
```

Exemplo de uso:

```typescript
// Uso inicial com estratégias existentes
const regularCalculator = new DiscountCalculator(new RegularDiscountStrategy());
console.log(regularCalculator.calculateDiscount(100)); // 10

const vipCalculator = new DiscountCalculator(new VIPDiscountStrategy());
console.log(vipCalculator.calculateDiscount(100)); // 20

// Adicionando um novo tipo de desconto sem modificar o código existente
class SuperVIPDiscountStrategy implements DiscountStrategy {
  calculateDiscount(purchaseAmount: number): number {
    return purchaseAmount * 0.25;
  }
}

// Criando uma nova instância do DiscountCalculator com a nova estratégia
const superVIPCalculator = new DiscountCalculator(new SuperVIPDiscountStrategy());
console.log(superVIPCalculator.calculateDiscount(100)); // 25
```

Com a refatoração, a `DiscountCalculator` segue o OCP. Ela agora pode ser estendida para suportar novos tipos de desconto sem alterar o código existente. Isso melhora a modularidade e facilita a manutenção do sistema.

### **Exemplo 3: Processamento de Dados em Programação Funcional**

O Princípio Aberto/Fechado também pode ser aplicado em programação funcional. Considere o seguinte exemplo onde processamos dados em diferentes formatos.

#### **❌ Ruim:**

```typescript

type DataType = 'json' | 'csv' | 'xml';

const processData = (data: string[][], type: DataType) => {
  if (type === "json") {
    return JSON.stringify(data);
  } else if (type === "csv") {
    return data.map((row) => row.join(",")).join("\n");
  } else if (type === "xml") {
    return data.map((row) => `<row>${row.join("")}</row>`).join("");
  } else {
    throw new Error("Unsupported data type");
  }
};
```

Exemplo de uso:

```typescript
const data = [
  ["name", "age"],
  ["João das Couves", "30"],
  ["Fulano de Tal", "40"],
  ["Ciclano Beltrano", "25"],
];

console.log(processData(data, "json"));
console.log(processData(data, "csv"));
console.log(processData(data, "xml"));
```



Neste exemplo, a função `processData` precisa ser modificada sempre que um novo tipo de processamento é adicionado, o que viola o OCP e dificulta a manutenção do código.

#### **✅ Bom:**

Vamos refatorar para seguir o OCP:

```typescript
// Definindo uma interface para os processadores de dados
interface DataProcessor {
  (data: string[][]): string;
}

// Funções processadoras específicas
const jsonProcessor: DataProcessor = (data) => JSON.stringify(data);

const csvProcessor: DataProcessor = (data) => data.map((row) => row.join(",")).join("\n");

const xmlProcessor: DataProcessor = (data) =>
  data.map((row) => `<row>${row.join("")}</row>`).join("");

// Função processData que segue o OCP
const processData = (data: string[][], processor: DataProcessor): string => {
  return processor(data);
};
```

Exemplo de uso:

```typescript
const data = [
  ["name", "age"],
  ["João das Couves", "30"],
  ["Fulano de Tal", "40"],
  ["Ciclano Beltrano", "25"],
];

console.log(processData(data, jsonProcessor)); // JSON
console.log(processData(data, csvProcessor)); // CSV
console.log(processData(data, xmlProcessor)); // XML
```



Agora, a função `processData` segue o OCP. Podemos adicionar novos processadores de dados sem modificar a função principal, o que facilita a extensão do código e garante sua estabilidade ao longo do tempo.

## Conclusão

O Princípio Aberto/Fechado é essencial para a criação de software evolutivo e seguro. Ao aplicar o OCP, você garante que seu código possa ser estendido para novos requisitos sem comprometer a estabilidade do sistema existente. Isso facilita a manutenção e permite o desenvolvimento contínuo do software, tornando-o mais robusto e adaptável.
 
