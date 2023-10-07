const { OpenAIService } = require("../services/openai");
const index = require("../singletons/db");
const { v4: uuidv4 } = require("uuid");

/**
 * Recommend contributors for the given project
 * @param project_id - the project to recommend contributors for
 * @returns - a list of contributors
 */
const recommendContributors = async (req, res) => {
  const { project_id } = req.query;

  const result = await index.fetch([project_id]);
  const embedding = result.records[project_id].values;

  // get projects by query
  const contributorData = await index.query({
    query: {
      vector: embedding,
      topK: 10,
      includeMetadata: true,
      includeValues: false,
      filter: { type: "contributor" },
    },
  });

  //   const contributors = contributorData.results.map((contributor) => {
  //     return {
  //       user_id: contributor.id,
  //       skills: contributor.metadata.skills,
  //       interests: contributor.metadata.interests,
  //       email: contributor.metadata.email,
  //       star_sign: contributor.metadata.star_sign,
  //     };
  //   });

  res.status(200).send([]);
};

/**
 * Create a project
 * @param description - description of the project
 * @param domains - a string list of domains the project belongs to
 * @returns the created project
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
          star_sig,
        },
        values: embedding,
      },
    ]);
    res.status(200).send({ user_id: userId });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = {
  recommendContributors,
  createContributor,
};
