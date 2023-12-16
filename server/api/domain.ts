import { ChatOpenAI } from "langchain/chat_models/openai";
import { createQuestion } from "../helpers/ai";
import { AI_RESPONSE_MOCK } from "../mock/ai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { GPT_MODEL_NAME } from "../constants/ai";
import dns from "dns";

function domainExists(domain: string) {
  return new Promise((resolve) => {
    dns.lookup(domain, (error) => resolve({ domain, exists: !error }));
  });
}

async function getDomainList(model: any, params: any, previousList?: string[]) {
  let aiResponse = null;

  if (process.env.USE_AI_MOCK) {
    aiResponse = AI_RESPONSE_MOCK;
  } else {
    const question = createQuestion({
      ...params,
      hasPreviousUrls: !!previousList,
    });

    const messages = [new SystemMessage(question)];

    if (previousList) {
      messages.push(
        new HumanMessage(
          JSON.stringify(previousList?.map((x: any) => x.domain))
        )
      );
    }
    const response = await model.call(messages);
    aiResponse = response.text;
  }

  const aiResult = JSON.parse(aiResponse);
  const domainResult = await Promise.all(aiResult.map(domainExists));
  const availableDomains = domainResult.filter((x) => !x.exists);

  const allAvailableList = [...availableDomains, ...(previousList ?? [])];

  if (allAvailableList.length >= params.totalResult) {
    return allAvailableList?.slice(0, params.totalResult);
  }

  return getDomainList(model, params, allAvailableList);
}

export default defineEventHandler(async (event) => {
  const params = await readBody(event);

  const model = new ChatOpenAI({
    modelName: GPT_MODEL_NAME,
    temperature: 1,
    maxTokens: 2500,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  });

  const result = await getDomainList(model, params);

  return result;
});
