import { ChatOpenAI } from "langchain/chat_models/openai";
import { domain } from "whoiser";
import { createQuestion } from "../helpers/ai";

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

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const parsedBody = JSON.parse(body);

  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
  });

  const question = createQuestion({
    ...parsedBody,
    numberOfOutput: 20,
  });

  // const res = await model.predictMessages([new HumanMessage(question)]);

  let domainNames = JSON.parse(`[
    "insaatmerkezi.com",
    "yapikonu.com",
    "inovatifinsaat.com",
    "hizmetininsaati.com",
    "yapidestek.com",
    "uyguninsaat.com",
    "proaktifyapi.com",
    "infallahizmet.com",
    "tamirustas.com",
    "tesisatci.com",
    "restorasyonmerkezi.com"
  ]`);

  const result = [];

  for (const name of domainNames) {
    const domainCheck = await domain(name);
    const domainCheckTr = await domain(`${name}.tr`);

    result.push({
      domain: name,
      status: isDomainAvailable(domainCheck),
      statusTr: isDomainAvailable(domainCheckTr),
    });
  }

  return result;
});
