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
        <span class="text-h5">Enter DOI and select tags for the new Reference</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="newRef.doi"
                    label="DOI"
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
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
            </v-col>
            <v-col cols="6">
              <v-card
                class="mx-auto"
                max-width="344"
                outlined
              >
                <v-card-title>Reference's data</v-card-title>
                <v-card-text>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-col>
                      <v-text-field
                        v-model="newRef.title"
                        label="Title"
                        readonly
                      />
                    </v-col>
                  </v-row>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-col>
                      <v-text-field
                        v-model="newRef.authors"
                        label="Authors"
                        readonly
                      />
                    </v-col>
                  </v-row>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-col>
                      <v-text-field
                        v-model="newRef.journal"
                        label="Journal"
                        readonly
                      />
                    </v-col>
                  </v-row>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-col>
                      <v-text-field
                        v-model="newRef.year"
                        label="Year"
                        readonly
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
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
            <v-container fluid>
              <v-textarea
                v-model="newRef.comments"
                clearable
                clear-icon="mdi-close-circle"
                label="Comments"
                value="Comments"
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
          :disabled="saveDisabled"
          @click="saveReference"
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
        comments: '',
        journal: '',
        year: '',
      },
      saveDisabled: true,
      newTag: null,
      tagList: [],
    };
  },
  computed: {
    doi() {
      return this.newRef.doi;
    },
  },
  watch: {
    doi() {
      const path = `http://api.crossref.org/works/${this.doi}`;
      axios.get(path)
        .then((response) => {
          if (!response.statusText === 'OK') {
            this.saveDisabled = true;
            return;
          }
          this.saveDisabled = false;
          const data = response.data.message;

          if (data.DOI) {
            this.newRef.doi = `doi:${data.DOI}`;
          }

          if (data.title) {
            if (Array.isArray(data.title)) {
              this.newRef.title = data.title.join(' ');
            } else {
              this.newRef.title = String(data.title);
            }
          } else {
            this.newRef.title = '';
          }

          if (data.author) {
            if (Array.isArray(data.author)) {
              this.newRef.authors = data.author.map((element) => `${element.given} ${element.family}`).join(', ');
            } else {
              this.newRef.authors = String(data.authors);
            }
          } else {
            this.newRef.authors = '';
          }

          if (data['container-title']) {
            this.newRef.journal = data['container-title'].join(' ');
          } else {
            this.newRef.journal = '';
          }

          if (data.published && data.published['date-parts']) {
            // TODO: I'm completely prepared for this to be a problem later,
            // there doesn't seem to be a lot of documentation for this format
            if (Array.isArray(data.published['date-parts'])) {
              const date = data.published['date-parts'][0];
              const year = date[0];
              this.newRef.year = year;
            }
          } else {
            this.newRef.year = '';
          }
          // console.log(response.data);
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('reference-added-error', error);
        });
    },
  },
  beforeMount() {
    this.getTags();
  },
  methods: {
    close() {
      this.showDialog = false;
    },
    saveReference() {
      // TODO
      const path = 'http://immunedigitaltwin.org:5000/literature';
      axios.post(path, this.newRef)
        .then(() => {
          // reset newRef
          this.newRef.title = '';
          this.newRef.authors = '';
          this.newRef.doi = '';
          this.newRef.tags = [];
          this.newRef.abstract = '';
          this.newRef.comments = '';
          this.newRef.journal = '';
          this.newRef.year = '';
          // tell parent to update references
          this.$emit('reference-added');
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('reference-added-error', error);
        });
      this.showDialog = false;
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
