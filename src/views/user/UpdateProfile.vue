<template>
  <div class="profile">
    <h1>Update Profile</h1>

    <div class="row">
      <div class="col-md-2">
        <profile-nav />
      </div>
      <div class="col-md-10">
        <b-form v-if="currentUser" @submit.prevent="update">

          <div class="row">
            <div class="col-md-8">
             <h3>Contact Info</h3>

              <b-form-group label-for="country" label="Country">
                <b-form-select id="country" v-model="countryId" :options="countries" value-field="id" text-field="name" />
              </b-form-group>

              <div class="form-row">
                <b-form-group label-for="firstName" label="First Name" class="col-md-6">
                  <b-form-input id="firstName" v-model="firstName" placeholder="First Name" />
                </b-form-group>

                <b-form-group label-for="lastName" label="Last Name" class="col-md-6">
                  <b-form-input id="lastName" v-model="lastName" placeholder="Last Name"/>
                </b-form-group>
              </div>

              <b-form-group label-for="address" label="Address">
                <b-form-input id="address" v-model="address" placeholder="Address" />
              </b-form-group>

              <b-form-group label-for="address2" label="Address (line 2)">
                <b-form-input id="address2" v-model="address2" placeholder="Address (line 2)" />
              </b-form-group>

              <div class="form-row">
                <b-form-group label-for="city" label="City" class="col-md-6">
                  <b-form-input id="city" v-model="city" placeholder="City" />
                </b-form-group>

                <b-form-group label-for="stateProvince" label="State/Province" class="col-md-4">
                  <b-form-select id="stateProvince" v-model="stateProvinceId" :options="stateProvinces" value-field="id" text-field="name" :disabled="isLoadingStateProvinces">
                  </b-form-select>
                </b-form-group>

                <b-form-group label-for="postalCode" label="Postal Code" class="col-md-2">
                  <b-form-input id="postalCode" v-model="postalCode" placeholder="Postal Code" />
                </b-form-group>
              </div>

              <b-form-group label-for="phoneNumber" label="Phone Number">
                <b-form-input id="phoneNumber" v-model="phoneNumber" placeholder="Phone Number" />
              </b-form-group>

              <b-form-group label-for="emailAddress" label="Email Address">
                <b-form-input id="emailAddress" v-model="emailAddress" placeholder="Email Address" />
              </b-form-group>

              <div class="form-row">
                <b-form-group label-for="region" label="Region" class="col-md-6">
                  <b-form-select id="region" v-model="regionId" :options="regions" value-field="id" text-field="name" />
                </b-form-group>
                <b-form-group label-for="division" label="Division" class="col-md-6">
                  <b-form-select id="division" v-model="divisionId" :options="divisions" value-field="id" text-field="name" :disabled="isLoadingDivisions" />
                </b-form-group>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-8">
              <h3>About</h3>

              <b-form-group label-for="biography" label="Biography">
                <b-form-textarea id="biography" v-model="biography" rows="5" placeholder="Tell us a little bit about yourself" />
              </b-form-group>

              <b-form-group label-for="interests" label="Modeling Interests">
                <b-form-textarea id="interests" v-model="interests" rows="5" placeholder="What are your modeling (or prototype) interests?" />
              </b-form-group>

              <b-form-group label-for="showInDirectory">
                <b-form-checkbox id="showInDirectory" v-model="showInDirectory">
                  Show my profile in the Member Directory
                </b-form-checkbox>
              </b-form-group>

            </div>
          </div>

          <b-button type="submit" variant="primary" :disabled="isSaving">Save</b-button>

        </b-form>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';

import ProfileNav from '@/components/user/ProfileNav.vue';

export default Vue.extend({
  components: {
    ProfileNav,
  },
  computed: {
    ...mapFields('user', [
      'isLoading',
      'isSaving',
      'currentUser',
      'currentUser.firstName',
      'currentUser.lastName',
      'currentUser.address',
      'currentUser.address2',
      'currentUser.city',
      'currentUser.stateProvinceId',
      'currentUser.countryId',
      'currentUser.postalCode',
      'currentUser.phoneNumber',
      'currentUser.emailAddress',
      'currentUser.showInDirectory',
      'currentUser.regionId',
      'currentUser.divisionId',
      'currentUser.biography',
      'currentUser.interests',
    ]),
    ...mapGetters('geography', [
      'countries',
      'isLoadingStateProvinces',
      'stateProvinces',
      'regions',
      'isLoadingDivisions',
      'divisions',
    ]),
  },
  data(): any {
    return {

    };
  },
  async created() {
    this.loadCurrentUser();
  },
  watch: {
    'currentUser.countryId': 'refreshStateProvinces',
    'currentUser.regionId': 'refreshDivisions',
  },
  methods: {
    ...mapActions('user', [
      'loadCurrentUser',
      'update',
    ]),
    ...mapActions('geography', [
      'loadStateProvinces',
      'loadDivisions',
    ]),

    async refreshStateProvinces() {
      await this.loadStateProvinces(this.currentUser.countryId);
    },

    async refreshDivisions() {
      await this.loadDivisions(this.currentUser.regionId);
    },
  },
});
</script>
