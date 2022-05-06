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
        Add person
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Enter OrcId and select tags for the new person</span>
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
                    v-model="newRef.orcid"
                    label="OrcId"
                    outlined
                  />
                </v-col>
              </v-row>
              <v-row>
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
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-card
                class="mx-auto"
                max-width="344"
                outlined
              >
                <v-card-title>Person's data</v-card-title>
                <v-card-text>
                  <v-row
                    align="center"
                    class="mx-0"
                  >
                    <v-col>
                      <v-text-field
                        v-model="newRef.name"
                        label="Name"
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
                        v-model="newRef.affiliation"
                        label="Affiliation"
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
                        v-model="newRef.email"
                        label="Email"
                        readonly
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
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
          :disabled="saveDisabled"
          @click="savePerson"
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
        name: '',
        orcid: '',
        tags: [],
        affiliation: '',
        email: '',
      },
      saveDisabled: true,
    };
  },
  computed: {
    orcid() {
      return this.newRef.orcid;
    },
  },
  watch: {
    orcid() {
      const path = `https://pub.orcid.org/v2.1/${this.orcid}`;
      axios.get(path, {
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (!response.statusText === 'OK') {
            this.saveDisabled = true;
            return;
          }
          this.saveDisabled = false;
          const { person } = response.data;

          if (!person) return;

          if (person.name) {
            if (person.name['credit-name']) {
              this.newRef.name = person.name['credit-name'];
            } else if (person.name['given-names'] && person.name['family-name']) {
              this.newRef.name = `${person.name['given-names'].value} ${person.name['family-name'].value}`;
            }
          } else {
            this.newRef.name = '';
          }

          if (person.emails && person.emails.email) {
            const { email } = person.emails;
            if (email.length > 0) {
              this.newRef.email = email[0].email;
            }
          }

          const activities = response.data['activities-summary'];
          if (activities.employments && activities.employments['employment-summary']) {
            const employments = activities.employments['employment-summary'];
            if (employments[0].organization) {
              this.newRef.affiliation = employments[0].organization.name;
            }
          }
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('person-added-error', error);
        });
    },
  },
  methods: {
    close() {
      this.showDialog = false;
    },
    savePerson() {
      // TODO
      const path = 'http://immunedigitaltwin.org:5000/personel';
      axios.post(path, this.newRef)
        .then(() => {
          // reset newRef
          this.newRef.name = '';
          this.newRef.orcid = '';
          this.newRef.tags = [];
          this.newRef.affiliation = '';
          this.newRef.email = '';
          // tell parent to update people
          this.$emit('person-added');
        })
        .catch((error) => {
          // tell parent about the error
          this.$emit('person-added-error', error);
        });
      this.showDialog = false;
    },
  },
};
</script>
