import Employee from './employee';

class EmployeeDatabase {
  save(employee: Employee): void {
    // Salva o funcionário no banco de dados
    console.log(`Salvando ${employee.name} no banco de dados...`);
  }
}

export default EmployeeDatabase;
