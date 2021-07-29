import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { BButton, BIconBookmarkDashFill, BIconBookmarkPlusFill } from 'bootstrap-vue';
import FavoriteAchievementToggle from '@/components/achievements/FavoriteAchievementToggle.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

localVue.component('b-button', BButton);
localVue.component('b-icon-bookmark-dash-fill', BIconBookmarkDashFill);
localVue.component('b-icon-bookmark-plus-fill', BIconBookmarkPlusFill);

describe('TrackAchievementToggle.vue', () => {
  let store;

  const getters = {
    favoriteAchievementIds: () => [
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

  test('Un-favorited achievement renders Favorite button', () => {
    const wrapper = shallowMount(FavoriteAchievementToggle, {
      store,
      propsData: {
        achievementId: 2,
      },
      localVue
    });

    const faveButton = wrapper.find('b-button-stub');

    expect(faveButton.exists()).toBe(true);
    expect(faveButton.attributes('variant')).toEqual('outline-success');
    expect(faveButton.attributes('title')).toEqual('Add this achievement as a favorite');
    expect(faveButton.text()).toContain('Favorite Achievement');
  });


  test('Favorited achievement renders Remove Favorite button', () => {
    const wrapper = shallowMount(FavoriteAchievementToggle, {
      store,
      propsData: {
        achievementId: 4,
      },
      localVue
    });

    const faveButton = wrapper.find('b-button-stub');

    expect(faveButton.exists()).toBe(true);
    expect(faveButton.attributes('variant')).toEqual('outline-danger');
    expect(faveButton.attributes('title')).toEqual('Remove this achievement from your favorites');
    expect(faveButton.text()).toContain('Remove Favorite');
  });
});
