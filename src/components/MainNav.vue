<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <div class="container">
      <b-navbar-brand to="/">MemberPro</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="isAuthenticated">
            <b-nav-item to="/albums/mine">My Albums</b-nav-item>
            <!-- <b-nav-item :to="{name: 'roadsList'}">Railroads</b-nav-item>
            <b-nav-item :to="{name: 'locomotiveList'}">Locomotives</b-nav-item>
            <b-nav-item :to="{name: 'userList'}">Users</b-nav-item> -->
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/login" v-if="!isAuthenticated">Sign in</b-nav-item>
          <b-nav-item-dropdown right v-if="isAuthenticated">
            <!-- Using 'button-content' slot -->
            <template slot="button-content">{{ currentUser ? currentUser.firstName : '' }}</template>
            <b-dropdown-item to="/user/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="#" v-on:click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  data () {
    return {
      isAuthenticated: false,
      currentUser: { },
    };
  },
  created () {
    this.authenticate();
  },
  computed: {
    ...mapGetters([
    ]),
  },
  watch: {
    $route: 'authenticate',
  },
  methods: {
    async authenticate () {
      // try {
      //   const user = await Auth.currentAuthenticatedUser();
      //   if (user !== null) {
      //     this.isAuthenticated = true;
      //     this.currentUser = {
      //       firstName: user.attributes.given_name,
      //       lastName: user.attributes.family_name
      //     }
      //   } else {
      //     this.isAuthenticated = false;
      //     this.currentUser = {};
      //   }
      // } catch (err) {
      //   // silently fail because the user is not logged in
      // }
    },
    async logout () {
      // await Auth.signOut();
      // await this.authenticate();

      // this.$router.push({ name: 'login' });
    },
  },
});
</script>
