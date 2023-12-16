<template>
  <div class="tw-max-w-[48rem] tw-w-full">
    <v-select
      :items="items"
      :label="label"
      :multiple="multiple"
      item-title="title"
      item-value="value"
      @update:modelValue="(data) => $emit('update:form', data)"
    >
      <template v-slot:item="{ props, item }" v-if="!multiple">
        <v-list-item
          v-bind="props"
          :title="item.title"
          :prepend-avatar="item.raw.icon"
        >
        </v-list-item>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    label: String,
    items: Array,
    multiple: Boolean,
  },
};
</script>

<style scoped>
.component-container {
  min-width: 36rem;
}
</style>
