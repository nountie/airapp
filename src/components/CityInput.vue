<template>
  <div class="city-input">
    <input v-model="location" @input="locked = false" />
    <ul v-if="searchResults.length">
      <li v-for="(result, i) in searchResults" :key="i" @click="select(result)">
        {{ result }}
      </li>
    </ul>
  </div>
</template>
<script>
import gmapsAutoCompleteService from "@/mixins/gmapsAutoCompleteService";

export default {
  name: "CityInput",
  mixins: [gmapsAutoCompleteService],
  data: () => ({
    location: "",
    searchResults: [],
    locked: false
  }),
  watch: {
    async location(newValue) {
      this.$emit("input", newValue);
      if (!this.locked && newValue) {
        this.gmac_getPlaces(
          {
            input: this.location,
            types: ["(cities)"]
          },
          this.displaySuggestions
        );
      } else {
        this.searchResults = [];
      }
    }
  },
  methods: {
    select(result) {
      this.locked = true;
      this.location = result;
    },
    displaySuggestions(predictions, status) {
      if (status !== this.gmac_getStatus()) {
        this.searchResults = [];
        return;
      }
      this.searchResults = predictions.map(
        prediction => prediction.description
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.city-input {
  flex-basis: 65%;
  position: relative;
  input {
    width: 100%;
    padding: 15px 16px;
    border: 1px solid #fff;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    &:focus {
      outline: none;
    }
  }
  ul {
    position: absolute;
    top: 38px;
    left: 0;
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #fff;
    background: #f0f0f0;
    color: #999;
    list-style: none;
    z-index: 2;
    li {
      padding: 10px 0;
      margin: 0;
      border-bottom: 1px solid #e6e5e5;
      font-size: 0.875rem;
      &:hover {
        cursor: pointer;
      }
      &:last-child {
        border-bottom: 0px;
      }
    }
  }
}
</style>
