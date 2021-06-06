export default class Toast {
  public id = 0;

  public type: 'info' | 'success' | 'warning' | 'danger' = 'info';

  public message = '';

  public dismissAfter = 3000;

  constructor(type: 'info' | 'success' | 'warning' | 'danger' = 'info', message: string, dismissAfter = 3000) {
    this.type = type;
    this.message = message;
    this.dismissAfter = dismissAfter;
  }
}
