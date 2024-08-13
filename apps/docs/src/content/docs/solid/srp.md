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

### **Exemplo 1: Processamento de Artigos**

Considere a seguinte implementação de uma classe `Article` que processa artigos:

#### **❌ Ruim:**

```typescript
class Article {
  private id: string | null = null;
  publicationDate: Date | null = null;

  constructor(
    private title: string,
    private content: string,
    private author: string
  ) {}

  process(): Article {
    // Validation
    if (!this.title || this.title.length < 5) {
      throw new Error('Title is too short');
    }
    if (!this.content || this.content.length < 100) {
      throw new Error('Content is too short');
    }

    // Formatting
    this.title = this.title.toLowerCase().replace(/\s+/g, '-');
    this.content = this.content.replace(/\n/g, '<br>');

    // Save to database
    this.id = Math.random().toString(36).slice(2, 11);
    console.log(`Saving article with ID ${this.id} to database`);

    // Set publication date
    this.publicationDate = new Date();

    // Notify author
    console.log(`Sending email to ${this.author} about the publication`);

    return this;
  }
}

export default Article;
```

Neste exemplo, a classe `Article` tem várias responsabilidades: validação, formatação, persistência no banco de dados, definição da data de publicação e notificação ao autor. Essa abordagem viola o SRP, pois mudanças em qualquer um desses processos exigem alterações na classe `Article`.

Agora, veja como podemos refatorar isso para seguir o SRP:

#### **✅ Bom:**

```typescript
export interface IArticle {
  title: string;
  content: string;
  author: string;
  id?: string;
  publicationDate?: Date;
}

export default class Article implements IArticle {
  id?: string;
  publicationDate?: Date;

  constructor(
    public title: string,
    public content: string,
    public author: string
  ) {}
}
```

```typescript
export default class ArticleFormatter {
  static formatTitle(title: string): string {
    return title.toLowerCase().replace(/\s+/g, "-");
  }

  static formatContent(content: string): string {
    return content.replace(/\n/g, "<br>");
  }
}
```



```typescript
import { IArticle } from "./Article";

export default class ArticleRepository {
  static save(article: IArticle): string {
    const id = Math.random().toString(36).slice(2, 11);
    console.log(`Saving article with ID ${id} to database`);
    return id;
  }
}
```

```typescript
import { IArticle } from "./Article";

export default class ArticleValidator {
  static validate(article: IArticle): void {
    if (!article.title || article.title.length < 5) {
      throw new Error("Title is too short");
    }
    if (!article.content || article.content.length < 100) {
      throw new Error("Content is too short");
    }
  }
}
```

```typescript
export default class AuthorNotifier {
  static notify(author: string): void {
    console.log(`Sending email to ${author} about the publication`);
  }
}
```

```typescript
import { IArticle } from "./Article";
import ArticleFormatter from "./ArticleFormatter";
import ArticleRepository from "./ArticleRepository";
import ArticleValidator from "./ArticleValidator";
import AuthorNotifier from "./AuthorNotifier";

export default class ArticleProcessor {
  static process(article: IArticle): IArticle {
    ArticleValidator.validate(article);

    article.title = ArticleFormatter.formatTitle(article.title);
    article.content = ArticleFormatter.formatContent(article.content);

    article.id = ArticleRepository.save(article);
    article.publicationDate = new Date();

    AuthorNotifier.notify(article.author);

    return article;
  }
}
```

Neste exemplo refatorado, as responsabilidades estão distribuídas em classes distintas:

- **`Article`**: Responsável apenas pelos dados do artigo.
- **`ArticleFormatter`**: Formata o título e o conteúdo.
- **`ArticleRepository`**: Cuida da persistência dos dados.
- **`ArticleValidator`**: Valida o título e o conteúdo do artigo.
- **`AuthorNotifier`**: Envia notificações ao autor.
- **`ArticleProcessor`**: Orquestra o processo de validação, formatação, persistência e notificação.

Cada classe agora tem uma única responsabilidade, seguindo o SRP e facilitando a manutenção, teste e evolução do código.

### **Exemplo 2: Gestão de Funcionários**
 
Considere um outro exemplo de uma classe `Employee` que gerencia funcionários:



#### **❌ Ruim:**

```typescript
class Employee {
  constructor(
    public name: string,
    public position: string,
    public salary: number,
  ) {}

  calculateSalary(): number {
    // Lógica complexa para calcular o salário
    return this.salary * 1.2;
  }

  generateReport(): string {
    // Gera um relatório de desempenho
    return `${this.name} está trabalhando como ${this.position}.`;
  }

  saveToDatabase(): void {
    // Salva o funcionário no banco de dados
    console.log(`Salvando ${this.name} no banco de dados...`);
  }
}

export default Employee;
```

#### **✅ Bom:**

```typescript
class Employee {
  constructor(
    public name: string,
    public position: string,
    public baseSalary: number,
  ) {}
}

export default Employee;
```

```typescript
class SalaryCalculator {
  calculate(employee: Employee): number {
    // Lógica para calcular o salário
    return employee.baseSalary * 1.2;
  }
}

export default SalaryCalculator;
```

```typescript
class EmployeeReport {
  generate(employee: Employee): string {
    // Gera um relatório de desempenho
    return `${employee.name} está trabalhando como ${employee.position}.`;
  }
}

export default EmployeeReport;
```

```typescript
class EmployeeDatabase {
  save(employee: Employee): void {
    // Salva o funcionário no banco de dados
    console.log(`Salvando ${employee.name} no banco de dados...`);
  }
}

export default EmployeeDatabase;
```

No exemplo refatorado, cada classe agora tem uma responsabilidade única, tornando o sistema mais modular e fácil de manter.


- **`Employee`**: Responsável apenas pelos atributos e comportamentos diretamente relacionados ao funcionário, como nome, cargo e salário base.
- **`SalaryCalculator`**: Responsável pelo cálculo do salário com base no salário base.
- **`EmployeeReport`**: Responsável pela geração de relatórios de desempenho.
- **`EmployeeDatabase`**: Responsável pela persistência dos dados do funcionário no banco de dados.


## Conclusão

O Princípio da Responsabilidade Única é fundamental para a criação de software modular, coeso e fácil de manter. Ao aplicar o SRP, você torna seu código mais robusto, facilitando não apenas o desenvolvimento, mas também a evolução e manutenção do sistema ao longo do tempo. Esse princípio é uma base sólida para a implementação dos demais princípios SOLID e para a prática de boas arquiteturas de software.
