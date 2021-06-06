import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BToast } from 'bootstrap-vue';
import Vuex from 'vuex';
import Toasts from '@/components/Toasts.vue';
import Toast from '@/models/toast';

const localVue = createLocalVue()

localVue.use(Vuex);

localVue.component('b-toast', BToast)

describe('Toast.vue', () => {
  let getters;
  let store;

  test('Renders with a success toast', () => {
    getters = {
      toasts: () => [
        new Toast('success', 'This is a test success', 5000),
      ]
    };

    store = new Vuex.Store({
      getters
    });

    const wrapper = shallowMount(Toasts, { store, localVue });
    const toastDiv = wrapper.find('b-toast-stub');

    expect(toastDiv.exists()).toBe(true);
    expect(toastDiv.attributes('variant')).toEqual('success');
    expect(toastDiv.attributes('title')).toEqual('Success');
    expect(toastDiv.attributes('autohidedelay')).toEqual('5000');
    expect(toastDiv.text()).toEqual('This is a test success');
  });

  test('Renders with a info toast', () => {
    getters = {
      toasts: () => [
        new Toast('info', 'This is a test info', 5000),
      ]
    };

    store = new Vuex.Store({
      getters
    });

    const wrapper = shallowMount(Toasts, { store, localVue });
    const toastDiv = wrapper.find('b-toast-stub');

    expect(toastDiv.exists()).toBe(true);
    expect(toastDiv.attributes('variant')).toEqual('info');
    expect(toastDiv.attributes('title')).toEqual('Heads up');
    expect(toastDiv.attributes('autohidedelay')).toEqual('5000');
    expect(toastDiv.text()).toEqual('This is a test info');
  });

  test('Renders with a warning toast', () => {
    getters = {
      toasts: () => [
        new Toast('warning', 'This is a test warning', 5000),
      ]
    };

    store = new Vuex.Store({
      getters
    });

    const wrapper = shallowMount(Toasts, { store, localVue });
    const toastDiv = wrapper.find('b-toast-stub');

    expect(toastDiv.exists()).toBe(true);
    expect(toastDiv.attributes('variant')).toEqual('warning');
    expect(toastDiv.attributes('title')).toEqual('Warning');
    expect(toastDiv.attributes('autohidedelay')).toEqual('5000');
    expect(toastDiv.text()).toEqual('This is a test warning');
  });

  test('Renders with a error toast', () => {
    getters = {
      toasts: () => [
        new Toast('danger', 'This is a test error', 5000),
      ]
    };

    store = new Vuex.Store({
      getters
    });

    const wrapper = shallowMount(Toasts, { store, localVue });
    const toastDiv = wrapper.find('b-toast-stub');

    expect(toastDiv.exists()).toBe(true);
    expect(toastDiv.attributes('variant')).toEqual('danger');
    expect(toastDiv.attributes('title')).toEqual('Error');
    expect(toastDiv.attributes('autohidedelay')).toEqual('5000');
    expect(toastDiv.text()).toEqual('This is a test error');
  });
});
