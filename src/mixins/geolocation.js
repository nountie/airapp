export default {
  data() {
    return {
      gl_position: null,
      gl_positionString: null,
      gl_positionStatus: null
    };
  },
  methods: {
    async gl_locateMe() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.savePosition,
          this.onGeoError
        );
      }
    },
    onGeoError({ code }) {
      if (code === 1) this.gl_positionStatus = 0;
      else this.gl_positionStatus = -1;
    },
    savePosition(position) {
      this.gl_positionStatus = 1;
      this.gl_positionString = `${position.coords.latitude},${position.coords.longitude}`;
      this.gl_position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    }
  }
};
