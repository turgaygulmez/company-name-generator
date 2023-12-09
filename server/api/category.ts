import { Category } from "../enums";

export default defineEventHandler(async (event) => {
  return Object.values(Category).map((x) => {
    return { title: x, value: x };
  });
});
