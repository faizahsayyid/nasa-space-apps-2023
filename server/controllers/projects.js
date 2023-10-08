const { OpenAIService } = require("../services/openai");
const index = require("../singletons/db");
const { v4: uuidv4 } = require("uuid");
const { getIncompatibleSigns } = require("../utils/zodiac");

/**
 * Get projects. If no search query is provided, recommendations are given based on
 * users interests and skills.
 * @param search - sort projects based on similarity to search query
 * @param domain - filter projects based on domain
 * @param user_id - the user to get recommendations for
 * @returns - a list of projects
 */
const queryProjects = async (req, res) => {
  const { search, domains, user_id, limit } = req.query;
  try {
    const contributorResult = await index.fetch([user_id]);
    const contributorMetaData = contributorResult.records[user_id].metadata;
    const contributorEmbedding = contributorResult.records[user_id].values;

    let embedding;

    if (search) {
      embedding = await OpenAIService.createEmbedding(`
      ${search}
      Star Sign: ${contributorMetaData.star_sign}
      `);
    } else {
      embedding = contributorEmbedding;
    }

    const filters = domains
      ? {
          filter: { domains: { $in: domains }, type: "project" },
        }
      : { filter: { type: "project" } };

    const query = await index.query({
      vector: embedding,
      topK: limit ?? 10,
      includeMetadata: true,
      includeValues: false,
      ...filters,
    });

    const projects = query.matches.map(({ metadata }) => metadata);

    res.status(200).send(projects);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to fetch projects" });
  }
};

/**
 * Create a project
 * @param name - name of the project
 * @param description - description of the project
 * @param domains - a string list of domains the project belongs to
 * @param user_id - the user creating the project
 * @param external_url - an external url to the project
 * @param star_sign - the star sign of the user creating the project
 * @returns the created project id
 */
const createProject = async (req, res) => {
  const { name, description, domains, user_id, external_url, star_sign } =
    req.body;

  const incompatible_signs = getIncompatibleSigns(star_sign);

  try {
    const embedding = await OpenAIService.createEmbedding(`
    Name: ${name}
    Description: ${description}
    Domains: ${domains.join(", ")}
    Incompatible Star Signs: ${incompatible_signs.join(", ")}
    `);

    const project_id = uuidv4();

    await index.upsert([
      {
        id: project_id,
        metadata: {
          type: "project",
          name,
          description,
          domains,
          project_manager_id: user_id,
          external_url,
          incompatible_signs,
          contributors: [user_id],
        },
        values: embedding,
      },
    ]);
    res.status(200).send({ project_id });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to create project" });
  }
};

module.exports = {
  queryProjects,
  createProject,
};
