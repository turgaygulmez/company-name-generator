import { AIRequest } from "~/types/ai";

export const createQuestion = ({
  country,
  category,
  activity,
  totalResult,
  maxWords,
  hasPreviousUrls,
}: AIRequest) => {
  return `
  You are a service that generates domain names for a company.

  The company is located in ${country} and focus on ${category}. 
  
  The company main activities are: ${activity?.join(",")}.
  
  Create a list of ${totalResult} possible domain names which should have maximum ${maxWords} words and only english characters are being used.

  ${
    hasPreviousUrls
      ? "Previously you have created the given urls. Avoid generating the same url again."
      : ""
  }
  
  The domain name should be simply and easy for people to remember.
  
  Output the final result as a JSON array.

  Output only JSON data without any additional text.

  Strip out any markdown json format.
  `;
};
