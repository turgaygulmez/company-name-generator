<template>
  <div class="mt-12">
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-select
          v-model="form.sector"
          return-object
          :items="sectorItems"
          item-title="title"
          item-value="value"
        ></v-select>

        <v-select
          v-if="form.sector.value"
          v-model="form.industry"
          return-object
          :items="industryItems"
          item-title="title"
          item-value="value"
        ></v-select>

        <v-select
          v-model="form.languages"
          return-object
          :items="languages"
          item-title="title"
          item-value="value"
        ></v-select>

        <v-btn
          type="submit"
          block
          class="mt-2"
          @click="submit"
          :loading="loading"
          >Submit</v-btn
        >
      </v-form>
    </v-sheet>

    <div class="domain-table-wrapper my-8" v-if="sonuc">
      <v-table theme="dark" class="domain-table">
        <thead>
          <tr>
            <th class="text-left">Domains</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in sonuc" :key="key">
            <td
              :class="
                item.status ? 'bg-light-green-lighten-2' : 'bg-red-darken-2'
              "
            >
              {{ item.domain }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import { sectors, languages } from "./constants/form";

export default {
  data() {
    return {
      sonuc: null,
      loading: false,
      languages,
      form: {
        sector: { title: "Sektor", value: null },
        industry: { title: "Industri", value: null },
        languages: { title: "Dil", value: null },
      },
    };
  },

  computed: {
    sectorItems() {
      return sectors.map((x) => {
        return { title: x.label, value: x.key };
      });
    },

    industryItems() {
      return sectors
        .find((x) => x.key === this.form.sector.value)
        .industry.map((x) => {
          return { title: x.label, value: x.key };
        });
    },
  },

  methods: {
    async submit() {
      this.loading = true;
      const data = await fetch("/api/domain", {
        method: "POST",
        body: JSON.stringify({
          industry: this.form.industry.value,
          languages: this.form.languages.value,
          wordsCount: 2,
        }),
      });

      const parsedData = await data.json();

      if (parsedData) {
        this.sonuc = parsedData;
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.domain-table-wrapper {
  display: flex;
  justify-content: center;
}
.domain-table {
  width: 100%;
  max-width: 700px;
}
</style>
