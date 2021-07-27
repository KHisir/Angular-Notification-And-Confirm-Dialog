import { NotificationType } from './enums/notificationType';

export class CcNotification {
  public Id: string;
  public Type: NotificationType;
  public Title: string;
  public Message: string;
  public AutoClose: boolean;
  public Duration: number;

  constructor(
    type: NotificationType,
    title: string,
    message: string,
    autoClose: boolean,
    duration: number
  ) {
    this.Id = this.idGenerator();
    this.Type = type;
    this.Title = title;
    this.Message = message;
    this.AutoClose = autoClose;
    this.Duration = duration;
  }

  private idGenerator() {
    // tslint:disable-next-line:only-arrow-functions
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0;
      // tslint:disable-next-line:no-bitwise
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return 'id-' + v.toString(16);
    });
  }
}
