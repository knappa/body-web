<template>
  <v-snackbar
    variant="success"
    show
  >
    {{ message }}

    <template #action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
    };
  },
};
</script>
