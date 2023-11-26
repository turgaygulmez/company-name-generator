<template>
  <div>
    {{ form }}
    <v-stepper v-model="currentStep">
      <template v-slot:default="{ prev, next }">
        <v-stepper-header>
          <template v-for="step in totalSteps" :key="`${step}-step`">
            <v-stepper-item
              :complete="currentStep > step"
              :step="`Step {{ step }}`"
              :value="step"
            ></v-stepper-item>

            <v-divider v-if="step !== totalSteps" :key="step"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-window>
          <v-stepper-window-item
            v-for="(step, stepIdx) in totalSteps"
            :key="`${step}-content`"
            :value="step"
          >
            <v-card v-if="steps[stepIdx]">
              <div class="d-flex flex-column justify-center align-center py-24">
                <div class="text-center my-4">
                  {{ steps[stepIdx].title }}
                </div>
                <component
                  class="flex-grow-0 component-container"
                  :is="steps[stepIdx].component"
                  v-bind="{
                    ...(steps[stepIdx].props || {}),
                    ...activeStepProps,
                  }"
                  v-on="activeStepEvents"
                ></component>
              </div>
            </v-card>
          </v-stepper-window-item>
        </v-stepper-window>

        <v-stepper-actions
          :disabled="disabled"
          @click:prev="prev"
          @click:next="next"
        ></v-stepper-actions>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import { FORM_STEPS } from "./constants";

export default {
  data() {
    return {
      currentStep: 1,
      totalSteps: 10,
      form: {},
      steps: FORM_STEPS,
    };
  },

  computed: {
    disabled() {
      return this.currentStep === 1
        ? "prev"
        : this.currentStep === this.totalSteps
        ? "next"
        : undefined;
    },
    categoryList() {
      return [
        "California",
        "Colorado",
        "Florida",
        "Georgia",
        "Texas",
        "Wyoming",
      ];
    },
    activeStepProps() {
      const props = {};

      this.steps?.[this.currentStep - 1]?.dynamicProps?.forEach((x) => {
        props[x.name] = this[x.reference];
      });

      return props;
    },
    activeStepEvents() {
      const activeStep = this.steps[this.currentStep - 1];
      return {
        // event handler for select
        "update:modelValue": (data) => {
          this.form[activeStep.id] = data;
        },
      };
    },
  },
};
</script>

<style scoped>
.component-container {
  min-width: 36rem;
}
</style>
