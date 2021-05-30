<template>
  <div id="signup-page">

    <div class="row justify-content-md-center">
      <div class="col-md-4">
        <h1>Sign Up</h1>

        <p>
          Signing up is quick, easy and free. You can join a group or create a page once you're signed up.
        </p>

        <b-alert :show="hasAlert" :variant="alert.type">
          {{ alert.message }}
        </b-alert>

        <b-form @submit.prevent="register">
          <div class="form-row">
            <b-form-group
              class="col-md-6"
              label="First name"
              label-for="inputFirstName"
              label-sr-only
            >
              <b-form-input
                type="text"
                id="inputFirstName"
                v-model="firstName"
                placeholder="First name"
              />
            </b-form-group>

            <b-form-group
              class="col-md-6"
              label="Last name"
              label-for="inputLastName"
              label-sr-only
            >
              <b-form-input
                type="text"
                id="inputLastName"
                v-model="lastName"
                placeholder="Last name"
              />
            </b-form-group>
          </div>

          <div class="form-row">
            <b-form-group
              class="col-md-12"
              label="EmailAddress"
              label-for="inputEmailAddress"
              label-sr-only
            >
              <b-form-input
                type="email"
                id="inputEmailAddress"
                v-model="emailAddress"
                placeholder="Email address"
              />
            </b-form-group>
          </div>

          <div class="form-row">
            <b-form-group
              class="col-md-6"
              label="Password"
              label-for="inputPassword"
              label-sr-only
            >
              <b-form-input
                type="password"
                id="inputPassword"
                v-model="password"
                placeholder="Password"
              />
            </b-form-group>

            <b-form-group
              class="col-md-6"
              label="Confirm password"
              label-for="inputConfirmPassword"
              label-sr-only
            >
              <b-form-input
                type="password"
                id="inputConfirmPassword"
                v-model="confirmPassword"
                placeholder="Confirm password"
              />
            </b-form-group>
          </div>

          <b-button type="submit" variant="primary" :disabled="isProcessing">
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

export default Vue.extend({
  computed: {
    ...mapGetters('signup', [
      'isProcessing',
      'hasAlert',
      'alert',
    ]),
    ...mapFields('signup', [
      'user.emailAddress',
      'user.password',
      'user.confirmPassword',
      'user.firstName',
      'user.lastName',
    ]),
  },
  methods: {
    ...mapActions('signup', [
      'register',
    ]),
  },
});
</script>
