---
title: Princípio da Responsabilidade Única (SRP)
description: Entenda o primeiro princípio SOLID e como ele contribui para um design de software mais coeso e modular.
---

O Princípio da Responsabilidade Única (SRP - Single Responsibility Principle) é o primeiro dos princípios SOLID e estabelece que **uma classe deve ter um, e somente um, motivo para mudar**. Em outras palavras, cada classe ou módulo deve ter apenas uma responsabilidade ou propósito claramente definido.

## Por que o SRP é importante?

### 1. **Coesão**
O SRP promove uma alta coesão dentro das classes, o que significa que os métodos e atributos de uma classe estão intimamente relacionados à sua responsabilidade principal. Quando uma classe tem uma única responsabilidade, o código tende a ser mais fácil de entender e manter, pois cada classe faz exatamente o que seu nome sugere, sem misturar funcionalidades distintas.

### 2. **Facilidade de Manutenção**
Quando uma classe tem apenas uma responsabilidade, é muito mais fácil identificar e corrigir problemas quando eles surgem. Isso também significa que mudanças em um aspecto do sistema não causam efeitos colaterais inesperados em outras áreas, o que é crucial para manter o software estável ao longo do tempo.

### 3. **Reutilização de Código**
Classes que seguem o SRP são mais modulares e podem ser reutilizadas em diferentes contextos sem a necessidade de grandes alterações. Isso ocorre porque elas não dependem de funcionalidades externas à sua responsabilidade primária.

## Exemplos Práticos

### **Exemplo 1: Gestão de Funcionários**
Imagine uma classe `Employee` que inicialmente possui métodos para calcular salário, gerar relatórios de desempenho e gerenciar o banco de dados de funcionários. De acordo com o SRP, essa classe tem responsabilidades demais e deve ser refatorada para separar essas preocupações.

**Refatoração:**

- `Employee`: Responsável apenas pelos atributos e comportamentos diretamente relacionados ao funcionário, como nome, cargo e salário base.
- `SalaryCalculator`: Responsável por calcular o salário do funcionário.
- `EmployeeReport`: Responsável por gerar relatórios de desempenho.
- `EmployeeDatabase`: Responsável por interagir com o banco de dados.

### **Exemplo 2: Processamento de Pedidos**
Uma classe `OrderProcessor` que lida com a validação de pedidos, o cálculo de descontos e o envio de notificações. Novamente, essa classe está violando o SRP e deve ser dividida em classes menores e mais específicas.

**Refatoração:**

- `OrderValidator`: Responsável por validar os pedidos.
- `DiscountCalculator`: Responsável por calcular descontos aplicáveis.
- `NotificationSender`: Responsável por enviar notificações após o processamento de pedidos.

## Conclusão

O Princípio da Responsabilidade Única é fundamental para a criação de software modular, coeso e fácil de manter. Ao aplicar o SRP, você torna seu código mais robusto, facilitando não apenas o desenvolvimento, mas também a evolução e manutenção do sistema ao longo do tempo. Esse princípio é uma base sólida para a implementação dos demais princípios SOLID e para a prática de boas arquiteturas de software.

Vamos explorar o próximo princípio SOLID?
