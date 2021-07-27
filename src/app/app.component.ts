import { Component } from '@angular/core';
import { Confirm } from './cc-notification/model/confirm';
import { ConfirmButtonType } from './cc-notification/model/enums/confirmButtonType';
import { NotificationPosition } from './cc-notification/model/enums/notificationPosition';
import { NotificationService } from './cc-notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cc-notification';

  constructor(private notification: NotificationService) {}

  NotificationPosition: any = NotificationPosition;

  success() {
    this.notification.success('Success', 'I am success!');
  }

  error() {
    this.notification.error('Error', 'I am error!', false);
  }

  warning() {
    this.notification.warning('Warning', 'I am warning!');
  }

  info() {
    this.notification.info('Info', 'I am info!');
  }

  confirm() {
    // tslint:disable-next-line:max-line-length
    const message: string = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

    this.notification.confirm('Confirm', message, 'Yes', 'No', true).then((res: Confirm) => {
      if (res.ConfirmButtonType === ConfirmButtonType.Primary) {
        alert('You clicked primary button!');
      } else if (res.ConfirmButtonType === ConfirmButtonType.Secondary) {
        alert('You clicked secondary button!');
      } else {
        alert('You clicked cancel button!');
      }
    }).catch((err: any) => { });
  }

  clear() {
    this.notification.clear();
  }
}
