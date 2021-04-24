export interface Action<T = any> {
  type: any;
  payload?: T;
  [key: string]: any;
}
