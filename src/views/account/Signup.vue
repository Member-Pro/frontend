<template>
  <div id="signup-page">

    <div class="row justify-content-md-center">
      <div class="col-md-6">
        <h1 class="mb-4">
          Sign Up

          <small class="text-muted">
            It's quick, easy and free!
          </small>
        </h1>

        <div class="text-danger" v-if="!isFormValid">
          <p>It looks like some things aren't quite right. Check the issues below and try again.</p>
        </div>

        <b-alert :show="hasError" variant="danger">
          {{ error }}
        </b-alert>

        <b-form @submit.prevent="submit" novalidate>
          <div class="form-row">
            <b-form-group
              class="col-md-6"
              label="First name"
              label-for="inputFirstName"
              label-sr-only
              :state="isValidFirstName"
              invalid-feedback="First Name is required"
            >
              <b-form-input
                type="text"
                id="inputFirstName"
                v-model="firstName"
                placeholder="First name"
                required

              />
            </b-form-group>

            <b-form-group
              class="col-md-6"
              label="Last name"
              label-for="inputLastName"
              label-sr-only
              :state="isValidLastName"
              invalid-feedback="Last Name is required"
            >
              <b-form-input
                type="text"
                id="inputLastName"
                v-model="lastName"
                placeholder="Last name"
                required
              />
            </b-form-group>
          </div>

          <div class="form-row">
            <b-form-group
              class="col-md-12"
              label="EmailAddress"
              label-for="inputEmailAddress"
              label-sr-only
              :state="isValidEmail"
              invalid-feedback="Invalid email address"
            >
              <b-form-input
                type="email"
                id="inputEmailAddress"
                v-model="emailAddress"
                placeholder="Email address"
                required
              />
            </b-form-group>
          </div>

          <div class="form-row">
            <b-form-group
              class="col-md-6"
              label="Password"
              label-for="inputPassword"
              label-sr-only
              :state="isValidPassword"
              invalid-feedback="Does not meet password requirements"
            >
              <b-form-input
                type="password"
                id="inputPassword"
                v-model="password"
                placeholder="Password"
                required
              />
            </b-form-group>

            <b-form-group
              class="col-md-6"
              label="Confirm password"
              label-for="inputConfirmPassword"
              label-sr-only
              :state="isValidConfirmPassword"
              invalid-feedback="Passwords do not match"
            >
              <b-form-input
                type="password"
                id="inputConfirmPassword"
                v-model="confirmPassword"
                placeholder="Confirm password"
                required
              />
            </b-form-group>
          </div>

          <div class="form-row">
            <b-form-group
              class="col-md-6"
              label-for="country"
              label="Country"
              :state="isValidCountry"
              invalid-feedback="Country is required"
            >
              <b-form-select
                id="country"
                v-model="countryId"
                :options="countries"
                value-field="id"
                text-field="name"
                required
              />
            </b-form-group>

            <b-form-group
              class="col-md-6"
              label-for="stateProvince"
              label="State/Province"
              :state="isValidStateProvince"
              invalid-feedback="State/Province is required"
            >
              <b-form-select
                id="stateProvince"
                v-model="stateProvinceId"
                :options="stateProvinces"
                value-field="id"
                text-field="name"
                :disabled="isLoadingStateProvinces"
                required
              />
            </b-form-group>
          </div>

          <!-- <b-button type="submit" variant="primary" :disabled="isProcessing"> -->
          <b-button type="submit" variant="primary">
            Sign Up
          </b-button>
        </b-form>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { validateEmail } from '@/utils/validationUtils';

export default Vue.extend({
  computed: {
    // ...mapGetters('signup', [
    //   'isProcessing',
    //   'hasAlert',
    //   'alert',
    // ]),
    ...mapFields('signup', [
      'user.emailAddress',
      'user.password',
      'user.confirmPassword',
      'user.firstName',
      'user.lastName',
      'user.countryId',
      'user.stateProvinceId',
    ]),
    ...mapGetters('signup', [
      'error',
      'hasError',
    ]),
    ...mapGetters('geography', [
      'countries',
      'isLoadingStateProvinces',
      'stateProvinces',
      'regions',
      'isLoadingDivisions',
      'divisions',
    ]),

    // Validation states
    isValidFirstName(): boolean {
      return !this.hasBeenSubmitted || this.firstName.length > 0;
    },
    isValidLastName(): boolean {
      return !this.hasBeenSubmitted || this.lastName.length > 0;
    },
    isValidEmail(): boolean {
      return !this.hasBeenSubmitted || validateEmail(this.emailAddress);
    },
    isValidPassword(): boolean {
      // TODO: Additional password validation to align with Cognito
      return !this.hasBeenSubmitted || this.password.length > 10;
    },
    isValidConfirmPassword(): boolean {
      return !this.hasBeenSubmitted || this.confirmPassword === this.password;
    },
    isValidCountry(): boolean {
      return !this.hasBeenSubmitted || (this.countryId !== null && this.countryId !== 0);
    },
    isValidStateProvince(): boolean {
      return !this.hasBeenSubmitted || this.stateProvinceId !== 0;
    },

    isFormValid(): boolean {
      return this.isValidFirstName
        && this.isValidLastName
        && this.isValidEmail
        && this.isValidPassword
        && this.isValidConfirmPassword
        && this.isValidCountry
        && this.isValidStateProvince;
    },
  },
  data(): any {
    return {
      hasBeenSubmitted: false,
    };
  },
  watch: {
    countryId: 'refreshStateProvinces',
  },
  methods: {
    ...mapActions('signup', [
      'register',
    ]),
    ...mapActions('geography', [
      'loadStateProvinces',
    ]),

    async refreshStateProvinces() {
      await this.loadStateProvinces(this.countryId);
    },

    async submit() {
      this.hasBeenSubmitted = true;

      if (this.isFormValid) {
        try {
          await this.register();

          this.$router.push({ name: 'login' });
        } catch (_) {
          // Don't redirect; show error message
        }
      }
    },
  },
});
</script>
