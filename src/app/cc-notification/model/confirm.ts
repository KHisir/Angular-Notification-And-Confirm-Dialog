import { ConfirmButtonType } from './enums/confirmButtonType';
import { NotificationType } from './enums/notificationType';
import { CcNotification } from './notification';

export class Confirm extends CcNotification {
  public PromiseResult: Promise<any>;

  public ConfirmButtonType: ConfirmButtonType;
  public PrimaryBtnText: string;
  public SecondaryBtnText: string;
  public ShowCancelButton: boolean;

  private promiseResolve: any;
  private promiseReject: any;

  constructor(title: string, message: string, primaryBtnTxt: string = 'OK', secondaryBtnText: string = '', showCancelButton: boolean = true) {
    super(NotificationType.Confirm, title, message, false, 0);
    this.PromiseResult = new Promise((resolve, reject) => {
      this.promiseResolve = resolve;
      this.promiseReject = reject;
    });

    this.PrimaryBtnText = primaryBtnTxt;
    this.SecondaryBtnText = secondaryBtnText;
    this.ShowCancelButton = showCancelButton;
    this.ConfirmButtonType = ConfirmButtonType.None;
  }

  public ResolvePromise() {
    this.promiseResolve(this);
  }

  public RejectPromise() {
    this.promiseReject(this);
  }

  primaryOnClick(): void {
    this.ConfirmButtonType = ConfirmButtonType.Primary;
    this.ResolvePromise();
  }

  secondaryOnClick(): void {
    this.ConfirmButtonType = ConfirmButtonType.Secondary;
    this.ResolvePromise();
  }

  cancelOnClick(): void {
    this.ConfirmButtonType = ConfirmButtonType.Cancel;
    this.ResolvePromise();
  }
}
