import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BButton, BIconBookmarkDashFill, BIconBookmarkPlusFill } from 'bootstrap-vue';
import TrackedAchievementToggle from '@/components/achievements/TrackAchievementToggle.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.component('b-button', BButton);
localVue.component('b-icon-bookmark-dash-fill', BIconBookmarkDashFill);
localVue.component('b-icon-bookmark-plus-fill', BIconBookmarkPlusFill);

describe('TrackAchievementToggle.vue', () => {
  let store;

  const getters = {
    trackedAchievementIds: () => [
      1, 4, 5
    ]
  };

  store = new Vuex.Store({
    modules: {
      memberAchievements: {
        getters,
        namespaced: true,
      },
    },
  });

  test('Untracked achievement renders Track button', () => {
    const wrapper = shallowMount(TrackedAchievementToggle, {
      store,
      propsData: {
        achievementId: 2,
      },
      localVue
    });

    const trackButton = wrapper.find('b-button-stub');

    expect(trackButton.exists()).toBe(true);
    expect(trackButton.attributes('variant')).toEqual('outline-success');
    expect(trackButton.attributes('title')).toEqual('Start tracking this achievement');
    expect(trackButton.text()).toContain('Track Achievement');
  });


  test('Tracked achievement renders Stop Tracking button', () => {
    const wrapper = shallowMount(TrackedAchievementToggle, {
      store,
      propsData: {
        achievementId: 4,
      },
      localVue
    });

    const trackButton = wrapper.find('b-button-stub');

    expect(trackButton.exists()).toBe(true);
    expect(trackButton.attributes('variant')).toEqual('outline-danger');
    expect(trackButton.attributes('title')).toEqual('Stop tracking this achievement');
    expect(trackButton.text()).toContain('Stop Tracking');
  });
});
