---
title: Princípio da Substituição de Liskov (LSP)
description: Entenda o terceiro princípio SOLID e como ele contribui para a substituição segura de classes base por suas subclasses.
---

O Princípio da Substituição de Liskov (LSP - Liskov Substitution Principle) é o terceiro dos princípios SOLID e estabelece que **objetos de uma classe base devem poder ser substituídos por objetos de suas subclasses sem alterar o funcionamento correto do programa**. Esse princípio, formulado por Barbara Liskov em 1987, é crucial para garantir a integridade do comportamento do sistema quando utilizamos herança.

## Por que o LSP é importante?

### 1. **Substituição Segura**

Seguir o LSP garante que subclasses possam ser usadas no lugar de suas classes base sem introduzir erros ou comportamentos inesperados. Isso promove a reutilização de código e a extensão de funcionalidades de forma segura.

### 2. **Integridade do Sistema**

O LSP mantém a integridade do sistema, garantindo que as classes derivadas ampliem ou especializem o comportamento das classes base de maneira consistente. Isso significa que o código pode confiar na substituição de classes sem a necessidade de validações extras ou condições específicas.

### 3. **Facilidade de Manutenção**

Ao aderir ao LSP, o código torna-se mais fácil de manter e evoluir, pois as classes são projetadas para funcionar corretamente em qualquer contexto em que suas classes base sejam usadas. Isso reduz a complexidade e a necessidade de revisões constantes.

## Exemplo Prático

### **Exemplo 1: Retângulo e Quadrado**

Considere um cenário onde você tem uma classe base `Rectangle` e uma subclasse `Square`. Este exemplo mostrará como a violação do LSP pode levar a problemas inesperados.


#### **❌ Ruim:**

```typescript
class Rectangle {
  constructor(
    protected width: number,
    protected height: number
  ) {}

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
```

```typescript
class Square extends Rectangle {
  constructor(side: number) {
    super(side, side);
  }

  setWidth(width: number) {
    this.width = this.height = width;
  }

  setHeight(height: number) {
    this.height = this.width = height;
  }
}
```


```typescript
// Função para aumentar a largura (e apenas a largura) em mais 10
function increaseRectangleWidth(rectangle: Rectangle) {
    const newWidth = rectangle.getWidth() + 10;
    rectangle.setWidth(newWidth);
}

let rectangle = new Rectangle(5, 10);
console.log(rectangle.getArea()); // 50
increaseRectangleWidth(rectangle);
console.log(rectangle.getArea()); // 150 (correto: nova largura 15 * altura 10)

let square = new Square(5);
console.log(square.getArea()); // 25
increaseRectangleWidth(square);
console.log(square.getArea()); // 225 (incorreto para Square) o esperado 75
```

**Problema:** Neste exemplo, a classe `Square` viola o LSP porque não mantém o comportamento esperado da classe base `Rectangle`. Quando `Square` é tratado como `Rectangle`, ele não se comporta corretamente, quebrando a expectativa de que largura e altura possam ser definidas de forma independente. Isso leva a resultados inesperados e comportamentos errados, como no cálculo da área.

### Por que isso ocorre?

O problema acontece porque `Square` redefine os métodos `setWidth` e `setHeight` de forma que ambos alteram tanto a largura quanto a altura, o que faz sentido para um quadrado, mas não para um retângulo. Quando `Square` é usado em uma função que espera um `Rectangle`, a lógica da função é quebrada.

### **✅ Bom:**

Vamos refatorar o código para seguir o LSP. Para isso, devemos evitar tratar um `Square` como se fosse um `Rectangle` ou garantir que `Square` não viole as expectativas estabelecidas por `Rectangle`.

#### Solução 1: Não herdar de `Rectangle` para `Square`

```typescript
class Shape {
  getArea(): number {
    throw new Error("Method not implemented.");
  }
}
```

```typescript
class Rectangle extends Shape {
  constructor(
    protected width: number,
    protected height: number
  ) {
    super();
  }

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
```

```typescript
class Square extends Shape {
  constructor(private side: number) {
    super();
  }

  setSide(side: number) {
    this.side = side;
  }

  getArea(): number {
    return this.side * this.side;
  }

  getSide(): number {
    return this.side;
  }
}
```

```typescript
// Função específica para Retângulo
function increaseRectangleWidth(rectangle: Rectangle) {
  rectangle.setWidth(rectangle.getWidth() + 10);
}

let rectangle = new Rectangle(5, 10);
increaseRectangleWidth(rectangle);
console.log(rectangle.getArea()); // 150

let square = new Square(5);
square.setSide(7); // Mudança de lado independente
console.log(square.getArea()); // 49
```

**Explicação:** Nesta solução, `Square` e `Rectangle` não estão mais relacionados por herança direta. Isso evita que `Square` quebre o comportamento esperado de `Rectangle`, respeitando o LSP. Agora, cada classe pode ser utilizada corretamente de acordo com sua própria lógica, sem comprometer o sistema.



### **Exemplo 2: Carro e Veículo Elétrico**

Imagine que temos uma classe base chamada `Car`, que representa um carro comum. Essa classe tem um método chamado `refuel`, que é usado para abastecer o carro com combustível. Agora, vamos criar uma subclasse chamada `ElectricCar`, que representa um carro elétrico.

#### **❌ Ruim:**

Neste exemplo, a subclasse `ElectricCar` tenta herdar de `Car`, mas isso resulta em um problema de design.

```typescript
class Car {
    run(): void {
        console.log('Running the car.');
    } 

    stop(): void {
        console.log('Stopping the car.');
    }

    accelerate(): void {
        console.log('Accelerating the car.');
    }

    refuel(): void {
        console.log('Refueling the car with gasoline.');
    }
}
```

```typescript
class ElectricCar extends Car {
    refuel(): void {
        throw new Error('Electric cars do not use gasoline!');
    }

    recharge(): void {
        console.log('Recharging the electric car.');
    }
}
```


```typescript
// Uso
let myCar = new Car();
myCar.refuel(); // "Refueling the car with gasoline."

let myElectricCar = new ElectricCar();
myElectricCar.refuel(); // Erro: "Electric cars do not use gasoline!"
```

### Problema:

**Violação do LSP**: A subclasse `ElectricCar` quebra o LSP porque, quando tratada como um `Car` (classe base), o método `refuel` não se comporta como esperado. Ao invés de reabastecer, o método lança um erro, já que carros elétricos não usam gasolina.

- **Erro de Design**: Isso evidencia um erro de design onde a herança foi aplicada de maneira inadequada. Um `ElectricCar` não deveria herdar de `Car`, já que as ações fundamentais (como reabastecer) são diferentes.

### **✅ Bom:**

Vamos refatorar o código para seguir o LSP, separando as responsabilidades de maneira adequada:

#### Solução: Usar uma Hierarquia Melhor

```typescript
class Vehicle {
    // Classe base genérica para veículos
    run(): void {
        console.log('Running the vehicle.');
    }

    stop(): void {
        console.log('Stopping the vehicle.');
    }

    accelerate(): void {
        console.log('Accelerating the vehicle.');
    }
}
```

```typescript
class Car extends Vehicle {
    refuel(): void {
        console.log('Refueling the car with gasoline.');
    }
}
```

```typescript
class ElectricCar extends Vehicle {
    recharge(): void {
        console.log('Recharging the electric car.');
    }
}
```

```typescript
// Uso
let myCar = new Car();
myCar.refuel(); // "Refueling the car with gasoline."

let myElectricCar = new ElectricCar();
myElectricCar.recharge(); // "Recharging the electric car."
```

### Explicação:

- **Hierarquia Correta**: Agora, `Car` e `ElectricCar` herdam de uma classe base genérica `Vehicle`. Isso evita a necessidade de forçar um comportamento inadequado em `ElectricCar`, como o método `refuel`.
  
- **Responsabilidades Claras**: Cada classe mantém suas responsabilidades claras e separadas, sem misturar comportamentos que não se aplicam a ambas. Isso segue o Princípio da Substituição de Liskov, permitindo que as subclasses sejam substituídas por suas classes base sem causar comportamento inesperado.



### LSP em Programação Funcional
O Princípio da Substituição de Liskov (LSP - Liskov Substitution Principle) é um conceito fundamental que assegura que funções ou objetos possam ser substituídos por suas subtipos ou funções derivadas sem quebrar a funcionalidade do sistema. No contexto da programação funcional em TypeScript, o LSP pode ser violado quando uma função derivada altera o comportamento esperado da função original.

### 1. **Substituição de Funções com Tipos Consistentes e Comportamento Esperado**


### **Exemplo 1**


**Pureza Funcional e LSP:** Em programação funcional, funções puramente funcionais são aquelas que, dado o mesmo conjunto de entradas, sempre retornam o mesmo conjunto de saídas sem causar efeitos colaterais. A pureza funcional torna mais fácil substituir uma função por outra (respeitando o LSP), já que não há estados externos a serem considerados. Quando uma função impura é substituída por uma função pura, ou vice-versa, o comportamento do sistema pode ser imprevisível, violando o LSP.

#### **❌ BAD:**

```typescript
// Uma função puramente funcional que simplesmente dobra um número
const double = (x: number): number => x * 2;

// Uma função puramente funcional que adiciona 3 a um número
const addThree = (x: number): number => x + 3;

// Uma função impura que altera o estado de uma variável externa
let sideEffectSum = 0;

const impureDouble = (x: number): number => {
    sideEffectSum += x;
    return x * 2;
};

const processNumbers = (func: (num: number) => number, nums: number[]): number[] => {
    return nums.map(func);
};

// Uso correto com funções puramente funcionais (respeita o LSP)
console.log(processNumbers(double, [1, 2, 3])); // [2, 4, 6]
console.log(processNumbers(addThree, [1, 2, 3])); // [4, 5, 6]

// Uso incorreto com função impura (viola o LSP)
console.log(processNumbers(impureDouble, [1, 2, 3])); 
// Output: [2, 4, 6]
// Efeito colateral: A variável `sideEffectSum` foi alterada para 6, quebrando a previsibilidade da função

```
#### **Explicação:**

- **Pureza Funcional:** Tanto `double` quanto `addThree` são puramente funcionais, sem efeitos colaterais, e podem ser usadas de forma intercambiável, respeitando o LSP.
- **Efeito Colateral:** A função `impureDouble` viola o LSP porque modifica o estado de uma variável externa, `sideEffectSum`. Isso significa que o comportamento da função afeta o estado fora de seu escopo, o que pode levar a resultados inesperados em diferentes partes do programa.
- **Implicações:** Em um sistema onde funções puramente funcionais são esperadas, a substituição por uma função impura como `impureDouble` pode causar problemas graves, como a alteração de estados globais ou variáveis externas, resultando em bugs difíceis de rastrear.

#### **✅ GOOD:**

```typescript
// Uma função puramente funcional que simplesmente dobra um número
const double = (x: number): number => x * 2;

// Uma função puramente funcional que adiciona 3 a um número
const addThree = (x: number): number => x + 3;

// Uma função puramente funcional que retorna o dobro de um número
// mantendo o estado puro e sem efeitos colaterais
const pureDouble = (x: number): number => x * 2;

const processNumbers = (func: (num: number) => number, nums: number[]): number[] => {
    return nums.map(func);
};

// Uso correto com funções puramente funcionais (respeita o LSP)
console.log(processNumbers(double, [1, 2, 3])); // [2, 4, 6]
console.log(processNumbers(addThree, [1, 2, 3])); // [4, 5, 6]
console.log(processNumbers(pureDouble, [1, 2, 3])); // [2, 4, 6]

// A variável `sideEffectSum` não é mais alterada, mantendo a pureza funcional
```
#### **Explicação:**

- **Pureza Funcional:** Agora, todas as funções (`double`, `addThree`, `pureDouble`) são puramente funcionais e não alteram o estado externo. Elas aceitam um valor de entrada, processam esse valor e retornam um novo valor sem causar qualquer efeito colateral.
  
- **Manutenção do LSP:** Qualquer uma dessas funções pode ser substituída por outra em processNumbers sem introduzir efeitos colaterais ou modificar o comportamento esperado. Isso respeita o Princípio da Substituição de Liskov, garantindo que a substituição de funções seja segura e previsível.


### **Exemplo 2**


#### **❌ BAD:**

Neste exemplo, temos uma função que processa dados financeiros. O `calculatePositiveSum` filtra números negativos antes de calcular a soma, o que altera o comportamento esperado e pode produzir resultados inesperados.

```typescript
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
processFinancialData(calculatePositiveSum, dataset); // Processed result: 30 (Inesperado!)
```

Neste exemplo, `calculatePositiveSum` viola o LSP porque modifica o comportamento esperado ao filtrar números negativos antes de somar, o que não estava implícito no contrato original da função `DataProcessor`. Isso pode causar inconsistências em partes do código que esperam o comportamento padrão.

#### **✅ GOOD:**

Para resolver essa violação, podemos tornar o comportamento explícito através de um tipo mais específico que inclui metadados sobre o processamento dos dados. Agora, `calculatePositiveSum` respeita o LSP, pois sua funcionalidade é clara e não surpreende o usuário da função.

```typescript
type DataSet = {
    values: number[];
    metadata: {
        shouldFilterNegatives: boolean;
    };
};

type FinancialCalculation = (data: DataSet) => number;

const calculateSum: FinancialCalculation = (data) => 
    data.values.reduce((a, b) => a + b, 0);

const calculateAverage: FinancialCalculation = (data) => {
    const sum = data.values.reduce((a, b) => a + b, 0);
    return sum / data.values.length;
};

const calculatePositiveSum: FinancialCalculation = (data) => {
    const valuesToProcess = data.metadata.shouldFilterNegatives 
        ? data.values.filter(n => n > 0) 
        : data.values;
    return valuesToProcess.reduce((a, b) => a + b, 0);
};

function processFinancialData(calculator: FinancialCalculation, data: DataSet) {
    console.log(`Processed result: ${calculator(data)}`);
}

// Uso
const datasetWithAllValues: DataSet = {
    values: [-10, 5, 15, -5, 10],
    metadata: { shouldFilterNegatives: false }
};

const datasetWithPositiveOnly: DataSet = {
    values: [-10, 5, 15, -5, 10],
    metadata: { shouldFilterNegatives: true }
};

processFinancialData(calculateSum, datasetWithAllValues);       
// Processed result: 15

processFinancialData(calculateAverage, datasetWithAllValues);   
// Processed result: 3

processFinancialData(calculatePositiveSum, datasetWithAllValues); 
// Processed result: 15

processFinancialData(calculatePositiveSum, datasetWithPositiveOnly); 
// Processed result: 30
```

Com essa abordagem, `calculatePositiveSum` é uma função derivada que faz sentido dentro de seu próprio contexto, respeitando o LSP. Agora, a função age de acordo com os metadados fornecidos, e o comportamento é previsível e consistente com as expectativas.

---

Esses exemplos mostram como o LSP pode ser aplicado na programação funcional usando TypeScript, garantindo que as funções substituídas mantenham o comportamento esperado, sem introduzir inconsistências ou efeitos colaterais.


 

Aqui, o LSP assegura que a substituição de `pureFunction` por outra função puramente funcional não mudaria o comportamento global, mas substituir por `impureFunction`, que tem efeitos colaterais, introduziria comportamento inesperado, violando o LSP.

Esses exemplos mostram como o LSP pode ser aplicado na programação funcional usando TypeScript, onde a ênfase está na consistência do comportamento das funções e na manutenção do contrato de tipos entre elas.


### Conclusão

O Princípio da Substituição de Liskov é crucial para garantir que subclasses possam ser usadas como substitutas de suas classes base sem alterar o comportamento esperado do sistema. Ao seguir o LSP, você mantém a integridade do código, facilita a manutenção e permite a reutilização segura de componentes.

Vamos explorar o próximo princípio SOLID?
