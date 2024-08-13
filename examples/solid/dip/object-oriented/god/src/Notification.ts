import { INotificationService } from "./interfaces/INotificationService";

export class Notification {
  private notificationService: INotificationService;

  constructor(notificationService: INotificationService) {
    this.notificationService = notificationService;
  }

  sendNotification(to: string, message: string): void {
    this.notificationService.send(to, message);
  }
}
