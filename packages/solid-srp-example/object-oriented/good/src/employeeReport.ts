import Employee from './employee';

class EmployeeReport {
  generate(employee: Employee): string {
    // Gera um relatório de desempenho
    return `${employee.name} está trabalhando como ${employee.position}.`;
  }
}

export default EmployeeReport;
