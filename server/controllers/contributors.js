const { OpenAIService } = require("../services/openai");
const index = require("../singletons/db");
const { v4: uuidv4 } = require("uuid");

/**
 * Recommend contributors for the given project
 * @param project_id - the project to recommend contributors for
 * @returns - a list of contributors
 */
const recommendContributors = async (req, res) => {
  const { project_id } = req.params;
  const { limit } = req.query;

  try {
    const result = await index.fetch([project_id]);
    const embedding = result.records[project_id].values;

    // get projects by query
    const contributorData = await index.query({
      vector: embedding,
      topK: limit ?? 10,
      includeMetadata: true,
      includeValues: false,
      filter: { type: "contributor" },
    });

    const contributors = contributorData.matches.map(
      ({ metadata }) => metadata
    );

    res.status(200).send(contributors);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to fetch contributors" });
  }
};

/**
 * Create a contributor
 * @param skills - skills of the contributor
 * @param interests - interests of the contributor
 * @param email - email of the contributor
 * @param star_sign - star sign of the contributor
 * @returns the created contributor
 */
const createContributor = async (req, res) => {
  const { skills, interests, email, star_sign } = req.body;

  try {
    const embedding = await OpenAIService.createEmbedding(`
    Skills: ${skills}
    Interests: ${interests}
    Star Sign: ${star_sign}
    `);

    const userId = uuidv4();

    await index.upsert([
      {
        id: userId,
        metadata: {
          type: "contributor",
          skills,
          interests,
          email,
          star_sign,
          favorite_projects: [],
        },
        values: embedding,
      },
    ]);

    const contributorResult = await index.fetch([userId]);
    const contributorMetaData = contributorResult.records[userId].metadata;

    res.status(200).send({ user_id: userId, ...contributorMetaData });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to create contributor" });
  }
};

module.exports = {
  recommendContributors,
  createContributor,
};
