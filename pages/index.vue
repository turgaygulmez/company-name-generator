<template>
  <div class="tw-p-8">
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
              <div
                class="tw-flex tw-justify-center tw-flex-col tw-items-center"
              >
                <div v-if="steps[stepIdx].title" class="text-center my-4">
                  {{ steps[stepIdx].title }}
                </div>
                <component
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
          :next-text="nextText"
          @click:prev="prev"
          @click:next="next"
        ></v-stepper-actions>
      </template>
    </v-stepper>
  </div>
</template>

<script>
import { FORM_STEPS } from "@/constants";
import { OptionSelector, Preview, Result } from "@/components";

export default {
  components: {
    OptionSelector,
    Preview,
    Result,
  },
  data() {
    return {
      currentStep: 1,
      totalSteps: FORM_STEPS?.length,
      form: {},
      steps: FORM_STEPS,
      countryList: [],
      categoryList: [],
      fullActivityList: [],
    };
  },

  async created() {
    this.countryList = await $fetch("/api/country");
    this.categoryList = await $fetch("/api/category");
    this.fullActivityList = await $fetch("/api/business");
  },

  computed: {
    nextText() {
      if (this.currentStep === this.totalSteps - 1) {
        return "GENERATE";
      }

      return "NEXT";
    },

    activityList() {
      return this.fullActivityList
        ?.filter?.((x) => x.category === this.form.category)
        ?.map((x) => {
          return {
            title: x.activity,
            value: x.activity,
          };
        });
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
        "update:form": (data) => {
          this.form[activeStep.id] = data;
        },
        "update:modelValue": (data) => {
          this.form[activeStep.id] = data;
        },
      };
    },
  },
};
</script>
