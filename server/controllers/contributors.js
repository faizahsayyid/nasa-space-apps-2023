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
      topK: parseInt(limit) ?? 10,
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

/**
 * Favorite a project
 * @param user_id - the user favoriting the project
 * @param project_id - the project to favorite
 */
const favoriteProject = async (req, res) => {
  const { user_id, project_id } = req.body;

  try {
    const result = await index.fetch([user_id]);
    const contributor = result.records[user_id].metadata;

    if (contributor.favorite_projects.includes(project_id)) {
      res.status(200).send({ message: "Project already favorited" });
    } else {
      await index.upsert([
        {
          id: user_id,
          metadata: {
            ...contributor,
            favorite_projects: [...contributor.favorite_projects, project_id],
          },
        },
      ]);

      res.status(200).send({ message: "Project favorited" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to favorite project" });
  }
};

/**
 * Unfavorite a project
 * @param user_id - the user unfavoriting the project
 * @param project_id - the project to unfavorite
 */
const unfavoriteProject = async (req, res) => {
  const { user_id, project_id } = req.body;

  try {
    const result = await index.fetch([user_id]);
    const contributor = result.records[user_id].metadata;

    if (!contributor.favorite_projects.includes(project_id)) {
      res.status(200).send({ message: "Project not favorited" });
    } else {
      await index.upsert([
        {
          id: user_id,
          metadata: {
            ...contributor,
            favorite_projects: contributor.favorite_projects.filter(
              (id) => id !== project_id
            ),
          },
        },
      ]);

      res.status(200).send({ message: "Project unfavorited" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to unfavorite project" });
  }
};

/**
 * Get a contributor
 * @param user_id - the id of the contributor to get
 */
const getContributor = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await index.fetch([user_id]);
    const contributor = result.records[user_id].metadata;

    res.status(200).send({ user_id, ...contributor });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to get contributor" });
  }
};

/**
 * Get a contributor by email
 * @param email - the email of the contributor to get
 */
const getContributorByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await index.query({
      query: email,
      filter: { type: "contributor" },
    });

    const contributor = result.matches[0].metadata;

    res.status(200).send({ ...contributor });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to get contributor" });
  }
};

/**
 * Update a contributor
 * @param user_id - the id of the contributor to update
 * @param skills - skills of the contributor
 * @param interests - interests of the contributor
 * @param email - email of the contributor
 * @param star_sign - star sign of the contributor
 */
const updateContributor = async (req, res) => {
  const { user_id } = req.params;
  const { skills, interests, email, star_sign } = req.body;

  try {
    const result = await index.fetch([user_id]);
    const contributor = result.records[user_id].metadata;

    const updatedContributor = {
      ...contributor,
      skills,
      interests,
      email,
      star_sign,
    };

    await index.upsert([
      {
        id: user_id,
        metadata: updatedContributor,
      },
    ]);

    res.status(200).send({ user_id, ...updatedContributor });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to update contributor" });
  }
};

module.exports = {
  recommendContributors,
  createContributor,
  favoriteProject,
  unfavoriteProject,
  getContributor,
  updateContributor,
  getContributorByEmail,
};
