import { AIRequest } from "~/types/ai";

export const createQuestion = ({
  numberOfOutput,
  industry,
  wordsCount,
  languages,
}: AIRequest) => {
  return `
    You are a service that generates domain names for companies.
    Create a list of ${numberOfOutput} possible domain names for a business that is focused on ${industry}.
    Suggested domain name should be ${wordsCount} words in ${languages}
    The domain name should be simply and easy for people to remember.

    Output the final result as a JSON array.

    If the result contains any non English character, convert the character to English character.
  `;
};
