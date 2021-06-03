<template>
  <div>
    <v-dialog
      v-model="showEditDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template #activator="{ on, attrs }">
        <v-icon
          small
          class="mr-2"
          v-bind="attrs"
          v-on="on"
          @click="clearNewRef()"
        >
          mdi-pencil
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Reference</span>
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
    <v-dialog
      v-model="showDeleteDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template #activator="{ on, attrs }">
        <v-icon
          small
          class="mr-2"
          v-bind="attrs"
          v-on="on"
        >
          mdi-delete
        </v-icon>
      </template>
      <v-container>
        <v-card>
          <v-card-title>
            <span class="text-h5">Delete Reference</span>
          </v-card-title>

          <v-card-text>
            Title: {{ item.title }}<br>
            <v-container>
              Are you sure?
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
              @click="deleteItem"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    tags: {
      type: Array,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showEditDialog: false,
      showDeleteDialog: false,
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
      this.showEditDialog = false;
      this.showDeleteDialog = false;
    },
    editItem() {
      const path = `http://localhost:5000/literature/${this.item.ident}`;
      axios.put(path, this.newRef)
        .then(() => {
          // tell parent to update references
          this.$emit('reference-edited');
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('reference-edited-error', error);
        });
      // eslint-disable-next-line
      console.log(this.item);
    },
    clearNewRef() {
      // TODO: better deep copy?
      this.newRef = JSON.parse(JSON.stringify(this.item));
    },
    deleteItem() {
      const path = `http://localhost:5000/literature/${this.item.ident}`;
      axios.delete(path)
        .then(() => {
          // tell parent to update references
          this.$emit('reference-deleted');
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('reference-deleted-error', error);
        });
    },
  },
};
</script>
