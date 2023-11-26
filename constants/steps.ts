export const FORM_STEPS = [
  {
    id: "category",
    title: "Select your business category",
    component: "v-select",
    props: { label: "Select Category" },
    dynamicProps: [
      {
        name: "items",
        reference: "categoryList",
      },
    ],
  },
];
