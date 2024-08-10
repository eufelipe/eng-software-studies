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
  