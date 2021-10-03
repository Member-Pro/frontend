<template>
  <div id="login">
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="6">
        <div class="b-form-1">
          <h1>Verify Email</h1>

          <!-- <auth-alerts /> -->

          <p>
            Please check your email and enter the verification code below to verify your email account.
          </p>

          <b-form @submit.prevent="submit">
            <b-form-group label="Email address" label-for="emailInput" label-sr-only>
              <b-form-input
                id="emailInput"
                type="email"
                v-model="emailAddress"
                required
                placeholder="Email address"
              />
            </b-form-group>
            <b-form-group label="Verification Code" label-for="verifyCodeInput" :label-sr-only="true">
              <b-form-input
                id="verifyCodeInput"
                type="number"
                v-model="code"
                required
                placeholder="Verification Code"
              />
            </b-form-group>
            <b-button type="submit" variant="primary">Verify Email</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
// import { mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
// import AuthAlerts from '@/components/AuthAlerts.vue';

export default Vue.extend({
  components: {
    // AuthAlerts,
  },
  data(): any {
    return {

    };
  },
  computed: {
    ...mapFields('signup', [
      'verifyEmail.emailAddress',
      'verifyEmail.code',
    ]),
    // ...mapGetters('auth', [ 'hasAuthenticationStatus', 'authenticationStatus', 'isAuthenticated' ]),
  },
  methods: {
    ...mapActions('signup', [
      'verifyEmail',
    ]),

    async submit() {
      try {
        await this.verifyEmail();
        this.$router.push({ name: 'login', query: { signupComplete: true } });
        // TODO: Show success message on login page
      } catch (_) {
        // TODO: Show error message
      }
    },
  },
});
</script>

<style></style>
