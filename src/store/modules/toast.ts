// Based on https://github.com/ktsn/vuex-toast/blob/master/src/module.js

import Toast from '@/models/toast';

const prefix = 'TOAST';
const ADD = `${prefix}_ADD_MESSAGE`;
const REMOVE = `${prefix}_REMOVE_MESSAGE`;

export {
  ADD as ADD_TOAST,
  REMOVE as REMOVE_TOAST,
};

interface ToastState {
  toasts: Toast[];
}

const state: ToastState = {
  toasts: [],
};

export function createToastModule() {
  let maxToastId = 0;

  const getters = {
    toasts: (state: ToastState): Toast[] => state.toasts,
  };

  const mutations = {
    [ADD] (state: ToastState, value: Toast): void {
      state.toasts.push(value);
    },

    [REMOVE] (state: ToastState, id: number): void {
      state.toasts = state.toasts.filter(x => x.id !== id);
    },
  };

  const actions = {
    [ADD] ({ commit }: { commit: Function }, toast: Toast): void { // eslint-disable-line @typescript-eslint/ban-types
      toast.id = ++maxToastId;

      commit(ADD, toast);
      setTimeout(() => commit(REMOVE, toast.id), toast.dismissAfter);
    },

    [REMOVE] ({ commit }, id: number) {
      commit(REMOVE, id);
    },
  };

  return {
    state,
    getters,
    mutations,
    actions,
  };
}
