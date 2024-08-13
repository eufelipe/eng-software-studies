import { EmailService } from "./EmailService";

export class Notification {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  sendNotification(to: string, message: string): void {
    this.emailService.sendEmail(to, message);
  }
}
