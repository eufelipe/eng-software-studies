export interface INotificationService {
  send(to: string, message: string): void;
}
