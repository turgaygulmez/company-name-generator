export const FORM_STEPS = [
  {
    id: "country",
    label: "Country",
    component: "OptionSelector",
    title: "Select a country where the business mainly operates",
    props: {
      label: "Select Country",
    },
    dynamicProps: [
      {
        name: "items",
        reference: "countryList",
      },
    ],
  },

  {
    id: "category",
    label: "Category",
    component: "OptionSelector",
    title: "Select a category where the business falls under",
    props: {
      label: "Select Category",
    },
    dynamicProps: [
      {
        name: "items",
        reference: "categoryList",
      },
    ],
  },

  {
    id: "activity",
    label: "Activity(s)",
    component: "OptionSelector",
    title: "Select the business activities",
    props: {
      label: "Select Activity",

      multiple: true,
    },
    dynamicProps: [
      {
        name: "items",
        reference: "activityList",
      },
    ],
  },

  {
    id: "totalResult",
    label: "Total Result",
    component: "v-text-field",
    title: "Input how many result you want to generate",
    props: {
      label: "Total Result",
      type: "number",
    },
  },

  {
    id: "maxWords",
    label: "Max Words",
    component: "v-text-field",
    title: "Input maximum words to be used in the domain name",
    props: {
      label: "Max Words",
      type: "number",
    },
  },

  {
    id: "preview",
    label: "Preview",
    component: "Preview",
    dynamicProps: [
      {
        name: "selectedOptions",
        reference: "form",
      },
    ],
  },

  {
    id: "generate",
    component: "Result",
    dynamicProps: [
      {
        name: "selectedOptions",
        reference: "form",
      },
    ],
  },
];
