import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Confirm } from './model/confirm';
import { NotificationPosition } from './model/enums/notificationPosition';
import { NotificationService } from './notification.service';
import { CcNotification } from "./model/notification";

@Component({
  selector: 'app-cc-notification',
  templateUrl: './cc-notification.component.html',
  styleUrls: ['./cc-notification.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('0.7s cubic-bezier(.8, -0.6, 0.2, 1.5)',
         style({
           transform: 'scale(0.5)', opacity: 0,
           height: '0px', margin: '0px'
         }))
      ])
    ])
  ]
})
export class CcNotificationComponent implements OnInit {

  @Input() position: NotificationPosition = NotificationPosition.TopRight;
  @Input() colored: boolean = true;

  notifySubscription!: Subscription;
  confirmSubscription!: Subscription;
  clearSubscription!: Subscription;

  notifications: CcNotification[] = [];
  confirms: Confirm[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnDestroy() {
    this.notifySubscription.unsubscribe();
    this.clearSubscription.unsubscribe();
  }

  ngOnInit() {
    if (this.colored === true) {
      document.documentElement.style.setProperty('--progress-start-color', '#000');
      document.documentElement.style.setProperty('--progress-end-color', 'rgba(255, 255, 255, 0.5)');
    } else {
      document.documentElement.style.setProperty('--progress-start-color', '#fff');
      document.documentElement.style.setProperty('--progress-end-color', 'rgba(110, 110, 110, 0.5)');
    }

    this.notifySubscription = this.notificationService.onNotify().subscribe((notify: CcNotification) => {
      // add notification to list
      this.notifications.unshift(notify);

      // auto close notification if required
      if (notify.AutoClose === true) {
        setTimeout(() => this.removeNotification(notify), notify.Duration);
      }
    });

    this.confirmSubscription = this.notificationService.onConfirm().subscribe((confirm: Confirm) => {
      // add notification to list
      this.confirms.push(confirm);
    });

    this.clearSubscription = this.notificationService.onClear().subscribe(() => {
      // clear list
      this.notifications = [];
    });
  }

  removeNotification(notify: CcNotification): void {
    // remove notification
    this.notifications = this.notifications.filter(n => n.Id !== notify.Id);
  }

  removeConfirm(confirm: Confirm): void {
    // remove confirm
    this.confirms = this.confirms.filter(c => c.Id !== confirm.Id);
  }

}
