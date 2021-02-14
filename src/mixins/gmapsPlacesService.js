import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      gmps_city: null,
      gmps_service: null
    };
  },
  computed: {
    ...mapState("maps", ["container"])
  },
  async created() {
    await this.initService();
  },
  methods: {
    ...mapActions("maps", ["getGmaps"]),
    async initService(container) {
      const gmaps = await this.getGmaps();
      this.gmps_service = new gmaps.places.PlacesService(container);
    },
    async gmps_getCity(coords) {
      if (!this.gmps_service) await this.initService(this.container);
      this.gmps_service.nearbySearch(
        { location: coords, radius: 500, types: ["(cities)"] },
        res => {
          this.gmps_city = res[0].name;
        }
      );
    }
  }
};
