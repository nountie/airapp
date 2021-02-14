import { mapActions } from "vuex";

export default {
  data() {
    return {
      gmac_service: null
    };
  },
  async created() {
    await this.initService();
  },
  methods: {
    ...mapActions("maps", ["getGmaps"]),
    async initService() {
      const gmaps = await this.getGmaps();
      this.gmac_service = new gmaps.places.AutocompleteService();
    },
    async gmac_getPlaces(payload, displaySuggestions) {
      if (!this.gmac_service) await this.initService();
      this.gmac_service.getPlacePredictions(payload, displaySuggestions);
    },
    gmac_getStatus() {
      return window.google.maps.places.PlacesServiceStatus.OK;
    }
  }
};
