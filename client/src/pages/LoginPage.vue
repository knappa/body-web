<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>isInit: {{ isInit }}</p>
    <p>isSignedIn: {{ isSignedIn }}</p>
    <p v-if="user && isSignedIn">
      {{ user.getBasicProfile().getName() }}
    </p>
    <v-btn
      :disabled="!isInit || isSignedIn"
      @click="signIn"
    >
      SignIn
    </v-btn>
    <v-btn
      :disabled="!isInit || !isSignedIn"
      @click="signOut"
    >
      SignOut
    </v-btn>
    <v-btn
      :disabled="!isInit || !isSignedIn"
      @click="disconnect"
    >
      Disconnect
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInit: false,
      isSignedIn: false,
      user: null,
      msg: 'Hello!',
    };
  },
  created() {
    const that = this;
    const checkGALoad = setInterval(() => {
      that.isInit = that.$google.isInit;
      if (that.isInit) {
        that.isSignedIn = that.$google.api.auth2.getAuthInstance().isSignedIn.get();
        that.$google.api.auth2.getAuthInstance().isSignedIn.listen(that.signInListener);
        that.$google.api.auth2.getAuthInstance().currentUser.listen(that.userListener);
        clearInterval(checkGALoad);
      }
    }, 200);
  },
  methods: {
    async signIn() {
      try {
        return this.$google.api.auth2.getAuthInstance().signIn();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return undefined;
      }
    },
    async signOut() {
      try {
        return this.$google.api.auth2.getAuthInstance().signOut();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return undefined;
      }
    },
    async disconnect() {
      return this.$google.api.auth2.getAuthInstance().disconnect();
    },
    signInListener(status) {
      this.isSignedIn = status;
    },
    userListener(user) {
      this.user = user;
    },
  },
};
</script>
