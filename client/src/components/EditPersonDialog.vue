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
          <span class="text-h5">Edit Person</span>
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
                  v-model="newRef.name"
                  label="Name"
                  readonly
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="newRef.affiliation"
                  label="Affiliation"
                  readonly
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="newRef.orcid"
                  label="OrcId"
                  readonly
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="newRef.email"
                  label="Email"
                />
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
                <v-select
                  v-model="newRef.tags"
                  :items="tagList"
                  label="Select"
                  multiple
                  chips
                  hint="Tags"
                  persistent-hint
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="newTag"
                  outlined
                  label="New Tag"
                  type="text"
                >
                  <template #append>
                    <v-btn @click="addTag">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
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
            @click="editPerson"
          >
            Save Edits
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
            <span class="text-h5">Delete Person</span>
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
        name: '',
        orcid: '',
        tags: [],
        affiliation: '',
        email: '',
      },
      tagList: [],
      newTag: null,
    };
  },
  beforeMount() {
    this.getTags();
  },
  methods: {
    close() {
      this.showEditDialog = false;
      this.showDeleteDialog = false;
    },
    getTags() {
      const path = 'http://immunedigitaltwin.org:5000/tags';
      axios.get(path)
        .then((res) => {
          this.tagList = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    },
    editPerson() {
      const path = `http://immunedigitaltwin.org:5000/person/${this.item.ident}`;
      axios.put(path, this.newRef)
        .then(() => {
          // tell parent to update people
          this.$emit('person-edited');
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('person-edited-error', error);
        });
      // eslint-disable-next-line
      console.log(this.item);
      this.showEditDialog = false;
      this.showDeleteDialog = false;
    },
    clearNewRef() {
      // TODO: better deep copy?
      this.newRef = JSON.parse(JSON.stringify(this.item));
    },
    deleteItem() {
      const path = `http://immunedigitaltwin.org:5000/person/${this.item.ident}`;
      axios.delete(path)
        .then(() => {
          // tell parent to update people
          this.$emit('person-deleted');
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('person-deleted-error', error);
        });
      this.showEditDialog = false;
      this.showDeleteDialog = false;
    },
    addTag() {
      // make sure that it is a non-null, non-zero length tag
      if (!this.newTag || this.newTag.length <= 0) {
        return;
      }
      // normalize it
      this.newTag = this.newTag.toLowerCase();
      // exclude existing versions
      if (this.tagList && this.tagList.includes(this.newTag)) {
        return;
      }
      // submit new tag
      const path = 'http://immunedigitaltwin.org:5000/tags';
      axios.post(path, { tag_name: this.newTag })
        .then(() => {
          // reset newTag
          this.newTag = '';
          // tell parent to update tags
          this.$emit('tag-added');
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('tag-added-error', error);
        });
      // reload tag list
      setTimeout(() => {
        this.getTags();
      }, 100);
    },
  },
};
</script>
