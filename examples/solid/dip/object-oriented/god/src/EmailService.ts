import { INotificationService } from "./interfaces/INotificationService";

export class EmailService implements INotificationService {
  send(to: string, message: string): void {
    console.log(`Sending email to ${to}: ${message}`);
  }
}
