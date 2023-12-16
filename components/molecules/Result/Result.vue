<template>
  <div class="tw-mt-8">
    <p class="tw-mb-4">Available Domains:</p>

    <v-table v-if="domainsList">
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
      domainsList: [
        {
          domain: "CleanComfort.fr",
          exists: false,
        },
        {
          domain: "RugRefresh.fr",
          exists: false,
        },
        {
          domain: "SparkleHomes.fr",
          exists: false,
        },
        {
          domain: "NeatNest.fr",
          exists: false,
        },
        {
          domain: "PureDwell.fr",
          exists: false,
        },
      ],
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
