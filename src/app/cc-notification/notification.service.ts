import { Injectable } from '@angular/core';
import { CcNotification } from '../cc-notification/model/notification';
import { NotificationType } from '../cc-notification/model/enums/notificationType';
import { Subject, Observable } from 'rxjs';
import { Confirm } from '../cc-notification/model/confirm';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<CcNotification>();
  private subjectConfirm = new Subject<Confirm>();
  private clearSubject = new Subject<CcNotification>();

  constructor() { }

  onNotify(): Observable<CcNotification> {
    return this.subject.asObservable();
  }

  onConfirm(): Observable<Confirm> {
    return this.subjectConfirm.asObservable();
  }

  onClear(): Observable<CcNotification> {
    return this.clearSubject.asObservable();
  }

  success(title: string, message: string, autoClose: boolean = true, duration: number = 3000) {
    const notify: CcNotification = new CcNotification(NotificationType.Success, title, message, autoClose, duration);
    this.subject.next(notify);
  }

  error(title: string, message: string, autoClose: boolean = true, duration: number = 5000) {
    const notify: CcNotification = new CcNotification(NotificationType.Error, title, message, autoClose, duration);
    this.subject.next(notify);
  }

  info(title: string, message: string, autoClose: boolean = true, duration: number = 4000) {
    const notify: CcNotification = new CcNotification(NotificationType.Info, title, message, autoClose, duration);
    this.subject.next(notify);
  }

  warning(title: string, message: string, autoClose: boolean = true, duration: number = 5000) {
    const notify: CcNotification = new CcNotification(NotificationType.Warning, title, message, autoClose, duration);
    this.subject.next(notify);
  }

  confirm(title: string, message: string, primaryBtnText?: string, secondaryBtnText?: string, showCancelButton?: boolean): Promise<any> {
    const confirm: Confirm = new Confirm(title, message, primaryBtnText, secondaryBtnText, showCancelButton);
    this.subjectConfirm.next(confirm);

    return confirm.PromiseResult;
  }

  clear() {
    this.clearSubject.next();
  }
}
