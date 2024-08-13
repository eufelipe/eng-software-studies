export class EmailService {
  sendEmail(to: string, message: string): void {
    console.log(`Sending email to ${to}: ${message}`);
  }
}
