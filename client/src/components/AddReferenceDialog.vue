<template>
  <v-dialog
    v-model="showDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Add reference
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">New Reference</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="newRef.title"
                label="Title"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="newRef.authors"
                label="Authors"
              />
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                v-model="newRef.doi"
                label="DOI"
              />
            </v-col>
            <v-col>
              <v-select
                v-model="newRef.tags"
                :items="tags"
                label="Select"
                multiple
                chips
                hint="Tags"
                persistent-hint
              />
            </v-col>
            <v-container fluid>
              <v-textarea
                v-model="newRef.abstract"
                clearable
                clear-icon="mdi-close-circle"
                label="Abstract"
                value="Abstract"
              />
            </v-container>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showDialog: false,
      newRef: {
        title: '',
        authors: '',
        doi: '',
        tags: [],
        abstract: '',
      },
    };
  },
  methods: {
    close() {
      this.showDialog = false;
    },
    save() {
      // TODO
      const path = 'http://localhost:5000/literature';
      axios.post(path, this.newRef)
        .then(() => {
          // reset newRef
          this.newRef.title = '';
          this.newRef.authors = '';
          this.newRef.doi = '';
          this.newRef.tags = [];
          this.newRef.abstract = '';
          // tell parent to update references
          this.$emit('reference-added');
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('reference-added-error', error);
        });
      this.showDialog = false;
    },
  },
};
</script>
