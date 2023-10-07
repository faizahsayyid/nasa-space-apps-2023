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
}

module.exports = { OpenAIService };
