<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Literature</h1>
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
          :items="references"
          item-key="ident"
          :search="search"
          show-expand
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>References</v-toolbar-title>
              <v-spacer />
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
              <v-spacer />
              <add-reference-dialog
                :tags="tags"
                @reference-added="getLiterature"
                @reference-added-error="getLiterature"
              />
              <!-- TODO: something better with the error -->
            </v-toolbar>
          </template>
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <h3>Abstract:</h3> {{ item.abstract }} <br>
              <h3>Comments:</h3> {{ item.comments }} <br>
            </td>
          </template>
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
            <edit-reference-dialog
              :item="item"
              :tags="tags"
              @reference-edited="getLiterature"
              @reference-edited-error="getLiterature"
              @reference-deleted="getLiterature"
              @reference-deleted-error="getLiterature"
            />
          </template>
          <template #no-data>
            No Data!
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AddReferenceDialog from './AddReferenceDialog.vue';
import Alert from './Alert.vue';
import EditReferenceDialog from './EditReferenceDialog.vue';

export default {
  components: {
    Alert,
    AddReferenceDialog,
    EditReferenceDialog,
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
      references: [],
      message: '',
      showMessage: false,
      tableHeaders: [
        {
          text: 'Title',
          align: 'start',
          filterable: false,
          value: 'title',
        },
        { text: 'Author(s)', value: 'authors' },
        { text: 'Year', value: 'year' },
        { text: 'Journal', value: 'journal' },
        { text: 'Tags', value: 'tags' },
        { text: 'DOI', value: 'doi' },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
    };
  },
  created() {
    this.getLiterature();
    this.getTags();
  },
  methods: {
    getTags() {
      const path = 'http://localhost:5000/tags';
      axios.get(path)
        .then((res) => {
          this.tags = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getLiterature() {
      const path = 'http://localhost:5000/literature';
      axios.get(path)
        .then((res) => {
          this.references = res.data.literature;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addRef(payload) {
      const path = 'http://localhost:5000/literature';
      axios.post(path, payload)
        .then(() => {
          this.getLiterature();
          this.message = 'Citation added';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getLiterature();
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
