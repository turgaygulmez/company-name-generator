import { ChatOpenAI } from "langchain/chat_models/openai";
import { domain } from "whoiser";
import { createQuestion } from "../helpers/ai";
import { AI_RESPONSE_MOCK } from "../mock/ai";
import { SystemMessage } from "langchain/schema";
import { GPT_MODEL_NAME } from "../constants/ai";

function isDomainAvailable(domainCheck: any) {
  if (Object.keys(domainCheck).length === 0) {
    return false;
  }

  let registration: any = null;

  if (Object.keys(domainCheck).length === 1) {
    const firstItem = Object.keys(domainCheck)?.[0];

    registration = domainCheck[firstItem];
  }

  if (
    registration?.text?.length &&
    registration?.text?.[0]?.includes("No match")
  ) {
    return true;
  }

  return false;
}

async function checkDomains(urls = []) {
  const result = [];

  for await (const url of urls) {
    const domainCheck = await domain(url);

    result.push({
      domain: url,
      status: isDomainAvailable(domainCheck),
    });
  }

  return result;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsedBody = JSON.parse(body);

  const model = new ChatOpenAI({
    modelName: GPT_MODEL_NAME,
    temperature: 1,
    maxTokens: 2500,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });

  const question = createQuestion({
    ...parsedBody,
    numberOfOutput: 20,
  });

  let aiResponse = null;

  if (process.env.USE_AI_MOCK) {
    aiResponse = AI_RESPONSE_MOCK;
  } else {
    const response = await model.call([new SystemMessage(question)]);
    aiResponse = response.text;
  }

  return await checkDomains(JSON.parse(aiResponse));
});
