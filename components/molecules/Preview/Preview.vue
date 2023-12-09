<template>
  <div class="tw-mt-8">
    <p class="tw-mb-4">Total Price: {{ totalPrice }}</p>

    <h1 class="mb-4">Selected Options:</h1>

    <v-table>
      <thead>
        <tr>
          <th id="option" class="text-left !tw-font-bold">Option</th>
          <th id="value" class="text-left !tw-font-bold">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(selection, idx) in selections" :key="idx">
          <td>
            {{ selection.label }}
          </td>
          <td>
            {{ selection.value }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { FORM_STEPS } from "@/constants";

export default {
  props: {
    selectedOptions: Object,
  },
  computed: {
    selections() {
      return Object.keys(this.selectedOptions).map((x) => {
        return {
          label: FORM_STEPS.find((step) => step.id === x).label,
          value: Array.isArray(this.selectedOptions[x])
            ? this.selectedOptions[x]?.join(", ")
            : this.selectedOptions[x],
        };
      });
    },
    totalPrice() {
      const dollarFormat = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      // demo price example purpuse
      return dollarFormat.format(this.selectedOptions.totalResult * 50);
    },
  },
};
</script>
