import Employee from './employee';

class SalaryCalculator {
  calculate(employee: Employee): number {
    // Lógica para calcular o salário
    return employee.baseSalary * 1.2;
  }
}

export default SalaryCalculator;
