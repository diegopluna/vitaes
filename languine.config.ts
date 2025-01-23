import { defineConfig } from "languine";

export default defineConfig({
  version: "1.0.2",
  locale: {
    source: "en",
    targets: ["de", "es", "fr", "zh", "pt"],
  },
  files: {
    json: {
      include: ["locales/[locale].json"],
    },
  },
  llm: {
    provider: "openai",
    model: "gpt-4-turbo",
  },
  
});