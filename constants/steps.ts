export const FORM_STEPS = [
  {
    id: "country",
    label: "Country",
    component: "OptionSelector",
    props: {
      label: "Select Country",
      title: "Select a country where the business mainly operates",
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
    props: {
      label: "Select Category",
      title: "Select a category where the business falls under",
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
    props: {
      label: "Select Activity",
      title: "Select the business activities",
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
    props: {
      label: "Total Result",
      title: "Input how many result you want to generate",
      type: "number",
    },
  },

  {
    id: "maxWords",
    label: "Max Words",
    component: "v-text-field",
    props: {
      label: "Max Words",
      title: "Input maximum words to be used in the domain name",
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
