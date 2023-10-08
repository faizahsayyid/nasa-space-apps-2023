const openai = require("../singletons/openai");

class OpenAIService {
  /** Creates an OpenAI embedding vector representing the input text.
   * @param {string} text
   * @return {Promise<Array<Number>>} - an embedding vector
   */
  static async createEmbedding(text) {
    const res = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });
    return res.data[0].embedding;
  }

  /**
   * Generates text based on the input prompt.
   * @param {string} prompt - the prompt to generate text from
   * @return {Promise<string>} - the generated text
   */
  static async promptGeneration(prompt) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message?.content;
  }

  /**
   * Generates a list based on the input prompt.
   * @param {string} prompt - the prompt to generate text from
   * @return {Promise<Array<string>>} - the generated list
   */
  static async generateList(prompt) {
    const func = {
      name: "display_list",
      description: "displays a list of items to a user",
      parameters: {
        type: "object",
        properties: {
          list: {
            type: "array",
            description: "The list to display",
            items: { type: "string" },
          },
        },
        required: ["list"],
      },
    };

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "user", content: `I want to display to the user ${prompt}` },
      ],
      model: "gpt-3.5-turbo",
      functions: [func],
      function_call: "auto",
    });
    const result = completion.choices[0].message?.function_call?.arguments;
    return result && JSON.parse(result).list;
  }
}

module.exports = { OpenAIService };
