const { OpenAIService } = require("../services/openai");
const index = require("../singletons/db");
const { v4: uuidv4 } = require("uuid");
const { getCompatibleSigns } = require("../utils/zodiac");

/**
 * Get projects. If no search query is provided, recommendations are given based on
 * users interests and skills.
 * @param search - sort projects based on similarity to search query
 * @param domain - filter projects based on domain
 * @returns - a list of projects
 */
const queryProjects = async (req, res) => {
  // TODO: const userId = "???";
  const { search, domains } = req.query;
  // TODO: include star sign in search query
  const embedding = await OpenAIService.createEmbedding(search);

  const filters = domains
    ? {
        filter: { domains: { $in: domains }, type: "project" },
      }
    : { filter: { type: "project" } };

  // get projects by query
  if (search) {
    const query = await index.query({
      query: {
        vector: embedding,
        topK: 10,
        includeMetadata: true,
        includeValues: false,
        ...filters,
      },
    });
    console.log(query);
  }
  // TODO: else get recommendations based on skills and interests
};

/**
 * Create a project
 * @param description - description of the project
 * @param domains - a string list of domains the project belongs to
 * @returns the created project
 */
const createProject = async (req, res) => {
  const { name, description, domains, user_id, external_url, star_sign } =
    req.body;

  const compatible_signs = getCompatibleSigns(star_sign);

  try {
    const embedding = await OpenAIService.createEmbedding(`
    Name: ${name}
    Description: ${description}
    Domains: ${domains.join(", ")}
    Compatible Star Signs: ${compatible_signs.join(", ")}
    `);

    await index.upsert([
      {
        id: uuidv4(),
        metadata: {
          type: "project",
          name,
          description,
          domains,
          user_id,
          external_url,
          compatible_signs,
        },
        values: embedding,
      },
    ]);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = {
  queryProjects,
  createProject,
};
