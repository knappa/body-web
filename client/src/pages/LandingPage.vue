<template>
  <div>
    <GoogleLogin
      :params="params"
      :render-params="renderParams"
      :on-success="onLoginSuccess"
      :on-failure="onLoginFailure"
      :on-current-user="onLoginSuccess"
    >
      Login
    </GoogleLogin>
    <GoogleLogin
      :params="params"
      :render-params="renderParams"
      :logout-button="true"
      :on-success="onLogoutSuccess"
      :on-failure="onLogoutFailure"
    >
      Logout
    </GoogleLogin>
    Hi {{ userName }}!
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
  components: { GoogleLogin },
  data() {
    return {
      params: {
        client_id: '736701279849-82f1tfij11uq4gclk896sgtcmm82qdag.apps.googleusercontent.com',
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
      googleUser: undefined,
      googleUserProfile: undefined,
    };
  },
  computed: {
    userName() {
      if (!this.googleUserProfile) {
        return '';
      }
      return this.googleUserProfile.Ne;
    },
  },
  methods: {
    onLoginSuccess(googleUser) {
      this.googleUser = googleUser;
      this.googleUserProfile = googleUser.getBasicProfile();

      // eslint-disable-next-line no-console
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      // eslint-disable-next-line no-console
      console.log(googleUser.getBasicProfile());
    },
    onLoginFailure() {
      // eslint-disable-next-line no-console
      console.log('failure');
    },
    onLogoutSuccess() {
      this.googleUser = undefined;
      this.googleUserProfile = undefined;
    },
    onLogoutFailure() {
      // eslint-disable-next-line no-console
      console.log('Logout failure');
    },
  },
};
</script>
