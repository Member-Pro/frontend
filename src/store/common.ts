/* eslint-disable @typescript-eslint/ban-types */

import store from '@/store';
import Toast from '@/models/toast';
import { ADD_TOAST } from './modules/toast';

export interface CommitFunction {
  commit: Function;
}

export interface CommitStateFunction<TState> {
  commit: Function;
  state: TState;
}

export interface CommitDispatchFunction {
  commit: Function;
  dispatch: Function;
}

export interface CommitDispatchStateFunction<TState> extends CommitStateFunction<TState> {
  dispatch: Function;
}

export function addSuccessToast(message: string): void {
  store.dispatch(ADD_TOAST, new Toast('success', message), { root: true });
}

export function addInfoToast(message: string): void {
  store.dispatch(ADD_TOAST, new Toast('info', message), { root: true });
}

export function addWarningToast(message: string): void {
  store.dispatch(ADD_TOAST, new Toast('warning', message), { root: true });
}

export function addErrorToast(message: string): void {
  store.dispatch(ADD_TOAST, new Toast('danger', message), { root: true });
}
