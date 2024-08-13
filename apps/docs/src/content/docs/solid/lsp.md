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

## Exemplos Práticos

### **Exemplo 1: Retângulo e Quadrado**

Considere a seguinte implementação de uma classe `Rectangle` e sua subclasse `Square`:

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

#### **✅ Bom:**

Vamos refatorar o código para seguir o LSP. Para isso, devemos evitar tratar um `Square` como se fosse um `Rectangle` ou garantir que `Square` não viole as expectativas estabelecidas por `Rectangle`.

```typescript
abstract class Shape {
  abstract getArea(): number;
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

Agora considere uma classe `Car` que representa um carro comum e uma subclasse `ElectricCar`, que representa um carro elétrico:

#### **❌ Ruim:**

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

**Problema:** A subclasse `ElectricCar` quebra o LSP porque, quando tratada como um `Car` (classe base), o método `refuel` não se comporta como esperado. Ao invés de reabastecer, o método lança um erro, já que carros elétricos não usam gasolina.

#### **✅ Bom:**

Vamos refatorar o código para seguir o LSP, separando as responsabilidades de maneira adequada:

```typescript
// Classe base genérica para veículos
abstract class Vehicle {
    abstract run(): void;
    abstract stop(): void;
    abstract accelerate(): void;
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

**Explicação:** Agora, `Car` e `ElectricCar` herdam de uma classe base genérica `Vehicle`. Isso evita a necessidade de forçar um comportamento inadequado em `ElectricCar`, como o método `refuel`. Cada classe mantém suas responsabilidades claras e separadas, respeitando o LSP e permitindo substituição segura.

### **Exemplo 3: LSP em Programação Funcional**

O Princípio da Substituição de Liskov (LSP) também se aplica à programação funcional, onde funções ou objetos podem ser substituídos por suas variantes sem quebrar a funcionalidade do sistema.

#### **❌ Ruim:**

```typescript
// Uma função puramente funcional que simplesmente dobra um número
const double = (x: number): number => x * 2;

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

// Uso incorreto com função impura (viola o LSP)
console.log(processNumbers(impureDouble, [1, 2, 3])); 
// Output: [2, 4, 6]
// Efeito colateral: A variável `sideEffectSum` foi alterada para 6, quebrando a previsibilidade da função
```

**Problema:** A função `impureDouble` viola o LSP porque modifica o estado de uma variável externa, `sideEffectSum`, causando efeitos colaterais imprevisíveis. Isso quebra a expectativa de substituição segura.

#### **✅ Bom:**

```typescript
// Uma função puramente funcional que simplesmente dobra um número
const double = (x: number): number => x * 2;

// Uma função puramente funcional que retorna o dobro de um número
// mantendo o estado puro e sem efeitos colaterais
const pureDouble = (x: number): number => x * 2;

const processNumbers = (func: (num: number) => number, nums: number[]): number[] => {
    return nums.map(func);
};

// Uso correto com funções puramente funcionais (respeita o LSP)
console.log(processNumbers(double, [1, 2, 3])); // [2, 4, 6]
console.log(processNumbers(pureDouble, [1, 2, 3])); // [2, 4, 6]
```

**Explicação:** Agora, todas as funções são puramente funcionais e não alteram o estado externo. Isso garante que a substituição de funções seja segura e previsível, respeitando o LSP.

## Conclusão

O Princípio da Substituição de Liskov é crucial para garantir que subclasses possam ser usadas como substitutas de suas classes base sem alterar o comportamento esperado do sistema. Ao seguir o LSP, você mantém a integridade do código, facilita a manutenção e permite a reutilização segura de componentes.

Seguir o Princípio da Substituição de Liskov garante que seu código seja flexível, fácil de manter e menos propenso a bugs inesperados. Ao aderir ao LSP, você assegura que as classes e funções podem ser substituídas de maneira previsível, promovendo a reutilização segura de componentes e facilitando a evolução do sistema ao longo do tempo.

 
