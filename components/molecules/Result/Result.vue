<template>
  <div class="tw-mt-8">
    <p class="tw-mb-4">Available Domains:</p>

    <div class="tw-flex tw-justify-center" v-if="!domainsList">
      <span class="loader"></span>
    </div>

    <v-table v-else>
      <thead>
        <tr>
          <th id="value" class="text-left !tw-font-bold">Domain Names</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in domainsList" :key="idx">
          <td>
            {{ item.domain }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      domainsList: null,
    };
  },
  props: {
    selectedOptions: Object,
  },
  created() {
    this.fetchDomains();
  },
  methods: {
    async fetchDomains() {
      this.domainsList = await $fetch("/api/domain", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "applicaiotn/json",
        },
        body: JSON.stringify(this.selectedOptions),
      });
    },
  },
};
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #292422;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
