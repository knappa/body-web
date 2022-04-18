<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <top-bar />
        <alert
          v-if="showMessage"
          :message="message"
          :show="showMessage"
          dismissible
          @dismissed="showMessage=false"
        />
        <literature-list
          :init-search="initSearch"
          :references="references"
          :tags="tags"
          :logged-in="loggedIn"
          @refresh-literature="getLiterature"
          @view-comments="showComments"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-10">
        <v-btn
          class="ma-2"
          outlined
          @click="downloadBibtex()"
        >
          Download
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from '@/components/Alert.vue';
import TopBar from '@/components/TopBar.vue';
import LiteratureList from '@/components/LiteratureList.vue';

export default {
  components: {
    Alert,
    LiteratureList,
    TopBar,
  },
  props: {
    initSearch: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      addRefDialog: false,
      tags: [],
      references: [],
      message: '',
      showMessage: false,
    };
  },
  computed: {
    loggedIn() {
      return !!this.user;
    },
    user() {
      return this.$store.state.user;
    },
    username() {
      return this.$store.getters.username;
    },
    photoURL() {
      return this.$store.getters.photoURL;
    },
  },
  created() {
    this.getLiterature();
    this.getTags();
  },
  methods: {
    showComments(event, ident) {
      console.log(ident);
    },
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
    getLiterature() {
      const path = 'http://immunedigitaltwin.org:5000/literature';
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
      const path = 'http://immunedigitaltwin.org:5000/literature';
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
    downloadBibtex() {
      const path = 'http://immunedigitaltwin.org:5000/bibtex';
      axios.get(path, { params: { tags: this.search } })
        .then((res) => {
          const fileURL = window.URL.createObjectURL(new Blob([res.data]));
          const fileLink = document.createElement('a');
          fileLink.href = fileURL;
          fileLink.setAttribute('download', 'references.bib');
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
};
</script>
