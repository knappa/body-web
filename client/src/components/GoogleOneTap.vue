<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError"
  >
    Sign in with Google
  </g-signin-button>
</template>

<script>

export default {
  props: {
    loginUri: {
      type: String,
      default: 'http://localhost:8080',
    },
  },
  data() {
    return {
      googleSignInParams: {
        client_id: '736701279849-82f1tfij11uq4gclk896sgtcmm82qdag.apps.googleusercontent.com',
        scope: 'profile email',
      },
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      // eslint-disable-next-line no-console
      console.log(profile);
    },
    onSignInError(error) {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  },
};
</script>

<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
