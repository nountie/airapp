import { mapActions, mapState } from "vuex";

export default {
  metaInfo() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_API_KEY}&libraries=places`,
          async: true,
          defer: true,
          callback: () => {
            if (this.resolver) this.resolver(window.google.maps);
          }
        }
      ]
    };
  },
  computed: {
    ...mapState("maps", ["resolver"])
  },
  created() {
    this.setContainer(document.querySelector("#maps"));
  },
  methods: {
    ...mapActions("maps", ["setContainer"])
  }
};
