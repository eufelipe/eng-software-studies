import { INotificationService } from "./interfaces/INotificationService";

export class SMSService implements INotificationService {
  send(to: string, message: string): void {
    console.log(`Sending SMS to ${to}: ${message}`);
  }
}
