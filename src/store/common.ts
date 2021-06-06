/* eslint-disable @typescript-eslint/ban-types */

import Toast from '@/models/toast';
import { ADD_TOAST } from './modules/toast';

export interface CommitStateFunction<TState> {
  commit: Function;
  state: TState;
}

export interface CommitDispatchStateFunction<TState> extends CommitStateFunction<TState> {
  dispatch: Function;
}

export function addSuccessToast(dispatch: Function, message: string): void {
  dispatch(ADD_TOAST, new Toast('success', message), { root: true });
}

export function addInfoToast(dispatch: Function, message: string): void {
  dispatch(ADD_TOAST, new Toast('info', message), { root: true });
}

export function addWarningToast(dispatch: Function, message: string): void {
  dispatch(ADD_TOAST, new Toast('warning', message), { root: true });
}

export function addErrorToast(dispatch: Function, message: string): void {
  dispatch(ADD_TOAST, new Toast('danger', message), { root: true });
}
