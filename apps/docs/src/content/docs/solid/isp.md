---
title: Princípio da Segregação de Interfaces (ISP)
description: Entenda o quarto princípio SOLID e como ele promove a criação de interfaces específicas e evita o acoplamento excessivo.
---

O Princípio da Segregação de Interfaces (ISP - Interface Segregation Principle) é o quarto dos princípios SOLID e estabelece que **uma classe não deve ser obrigada a implementar interfaces que ela não utiliza**. Em outras palavras, é melhor ter várias interfaces específicas e pequenas do que uma única interface grande e abrangente.

## Por que o ISP é importante?

### 1. **Evita o Acoplamento Excessivo**

O ISP promove a criação de interfaces específicas, o que reduz o acoplamento entre as classes. Quando uma classe é obrigada a implementar métodos que não usa, isso cria um acoplamento desnecessário que pode dificultar a manutenção e evolução do sistema.

### 2. **Facilidade de Manutenção**

Classes que implementam interfaces específicas são mais fáceis de manter e evoluir. Como cada interface tem um conjunto claro e coeso de responsabilidades, alterações podem ser feitas com menos impacto em outras partes do sistema.

### 3. **Reutilização de Código**

Interfaces menores e específicas permitem que as classes as implementem de maneira mais flexível, facilitando a reutilização de código em diferentes contextos, sem precisar carregar funcionalidades não utilizadas.

## Exemplos Práticos

### **Exemplo 1: Máquinas de Café**

Considere uma interface `CoffeeMachine` que define operações para diferentes tipos de máquinas de café:

#### **❌ Ruim:**

```typescript
interface CoffeeMachine {
  brewEspresso(): void;
  brewCappuccino(): void;
  brewLatte(): void;
  steamMilk(): void;
}

class BasicCoffeeMachine implements CoffeeMachine {
  brewEspresso(): void {
    console.log("Brewing Espresso");
  }

  brewCappuccino(): void {
    throw new Error("Basic machine cannot brew Cappuccino");
  }

  brewLatte(): void {
    throw new Error("Basic machine cannot brew Latte");
  }

  steamMilk(): void {
    throw new Error("Basic machine cannot steam milk");
  }
}
```

**Problema:** A `BasicCoffeeMachine` é obrigada a implementar métodos que não utiliza. Isso viola o ISP, pois a máquina básica não precisa saber como preparar cappuccino, latte ou vaporizar leite. Ela acaba implementando métodos inúteis, criando um acoplamento desnecessário e aumentando a complexidade do código.

#### **✅ Bom:**

Vamos refatorar o código para seguir o ISP, criando interfaces específicas para cada funcionalidade:

```typescript
interface EspressoMachine {
  brewEspresso(): void;
}

interface MilkSteamer {
  steamMilk(): void;
}

interface CappuccinoMachine extends EspressoMachine, MilkSteamer {
  brewCappuccino(): void;
}

interface LatteMachine extends EspressoMachine, MilkSteamer {
  brewLatte(): void;
}

class BasicCoffeeMachine implements EspressoMachine {
  brewEspresso(): void {
    console.log("Brewing Espresso");
  }
}

class AdvancedCoffeeMachine implements CappuccinoMachine {
  brewEspresso(): void {
    console.log("Brewing Espresso");
  }

  steamMilk(): void {
    console.log("Steaming Milk");
  }

  brewCappuccino(): void {
    console.log("Brewing Cappuccino");
  }
}

class LatteCoffeeMachine implements LatteMachine {
  brewEspresso(): void {
    console.log("Brewing Espresso");
  }

  steamMilk(): void {
    console.log("Steaming Milk");
  }

  brewLatte(): void {
    console.log("Brewing Latte");
  }
}
```

**Explicação:** Agora, cada classe implementa apenas as interfaces que realmente precisa. Isso segue o ISP, evitando métodos desnecessários e garantindo que as classes sejam mais modulares e fáceis de manter.

### **Exemplo 2: ISP em Programação Funcional**

No contexto de programação funcional, o ISP pode ser aplicado ao manter funções específicas e evitar criar módulos ou tipos que exijam que as funções implementem comportamentos não relacionados.

#### **❌ Ruim:**

```typescript
// Um tipo genérico para processar dados financeiros
type FinancialProcessor = {
    calculateTax: (income: number) => number;
    calculateDiscount: (amount: number) => number;
    generateInvoice: (amount: number) => string;
};

const financialProcessor: FinancialProcessor = {
    calculateTax: (income) => income * 0.2,
    calculateDiscount: (amount) => amount * 0.1,
    generateInvoice: (amount) => `Invoice for ${amount}`
};
```

**Problema:** O tipo `FinancialProcessor` combina várias responsabilidades (cálculo de impostos, descontos e geração de faturas) em uma única interface. Isso viola o ISP, pois força todas as funções a coexistirem no mesmo contexto, mesmo que nem todas sejam necessárias ao mesmo tempo.

#### **✅ Bom:**

Vamos refatorar o código para seguir o ISP, separando as responsabilidades em tipos mais específicos:

```typescript
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
```

**Explicação:** Agora, cada função pertence a um tipo que representa uma responsabilidade específica. Isso segue o ISP, permitindo que as funções sejam usadas de forma modular e sem dependências desnecessárias.

## Conclusão

O Princípio da Segregação de Interfaces é fundamental para criar sistemas modulares e coesos, onde as classes ou funções só implementam as funcionalidades de que realmente precisam. Ao aplicar o ISP, você evita o acoplamento excessivo, facilita a manutenção e promove a reutilização de código de forma mais eficiente.

Seguir o ISP garante que suas interfaces ou funções sejam claras e específicas, o que contribui para um design de software mais robusto e flexível.
 
