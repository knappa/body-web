<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>People</h1>
        <hr><br><br>
        <alert
          v-if="showMessage"
          :message="message"
          :show="showMessage"
          dismissible
          @dismissed="showMessage=false"
        />

        <v-data-table
          :headers="tableHeaders"
          :items="personel"
          item-key="ident"
          :search="search"
          show-expand
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>People</v-toolbar-title>
              <v-spacer />
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
              <v-spacer />
              <add-person-dialog
                :tags="tags"
                @person-added="getPersonel"
                @person-added-error="getPersonel"
              />
              <!-- TODO: something better with the error -->
            </v-toolbar>
          </template>
          <!-- <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <h3>Abstract:</h3> {{ item.abstract }} <br>
              <h3>Comments:</h3> {{ item.comments }} <br>
            </td>
          </template> -->
          <template #[`item.tags`]="{ item }">
            <v-chip
              v-for="(tag, index) in item.tags"
              :key="index"
              class="ma-1"
            >
              {{ tag }}
            </v-chip>
          </template>

          <template #[`item.actions`]="{ item }">
            <edit-person-dialog
              :item="item"
              :tags="tags"
              @person-edited="getPersonel"
              @person-edited-error="getPersonel"
              @person-deleted="getPersonel"
              @person-deleted-error="getPersonel"
            />
          </template>
          <template #no-data>
            No Data!
          </template>
        </v-data-table>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-sm-10">
        <v-btn
          class="ma-2"
          outlined
          @click="downloadBibtex()"
        >
          Download
        </v-btn>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
import AddPersonDialog from './AddPersonDialog.vue';
import Alert from './Alert.vue';
import EditPersonDialog from './EditPersonDialog.vue';

export default {
  components: {
    Alert,
    AddPersonDialog,
    EditPersonDialog,
  },
  props: {
    initSearch: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      search: this.initSearch,
      addRefDialog: false,
      tags: [],
      personel: [],
      message: '',
      showMessage: false,
      tableHeaders: [
        {
          text: 'Name',
          align: 'start',
          filterable: false,
          value: 'name',
        },
        { text: 'Affiliation', value: 'affiliation' },
        { text: 'Tags', value: 'tags' },
        { text: 'Email', value: 'email' },
        { text: 'OrcId', value: 'orcid' },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
    };
  },
  created() {
    this.getPersonel();
    this.getTags();
  },
  methods: {
    getTags() {
      const path = 'http://immunedigitaltwin.org:5000/tags';
      axios.get(path)
        .then((res) => {
          this.tags = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getPersonel() {
      const path = 'http://immunedigitaltwin.org:5000/personel';
      axios.get(path)
        .then((res) => {
          this.personel = res.data.personel;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addRef(payload) {
      const path = 'http://immunedigitaltwin.org:5000/personel';
      axios.post(path, payload)
        .then(() => {
          this.getPersonel();
          this.message = 'Person added';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getPersonel();
        });
    },
    initForm() {
      this.addRefForm.title = '';
      this.addRefForm.authors = '';
      this.addRefForm.doi = '';
      this.addRefForm.read = [];
    },
  },
};
</script>
