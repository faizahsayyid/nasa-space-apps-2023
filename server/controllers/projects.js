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
      topK: limit ? parseInt(limit) : 10,
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
 * @param roles - a string list of roles the project is looking for
 * @returns the created project id
 */
const createProject = async (req, res) => {
  const { name, description, domains, user_id, external_url, roles } = req.body;

  const contributorResult = await index.fetch([user_id]);
  const contributorMetaData = contributorResult.records[user_id].metadata;

  const incompatible_signs = getIncompatibleSigns(
    contributorMetaData.star_sign
  );

  try {
    const embedding = await OpenAIService.createEmbedding(`
    Name: ${name}
    Description: ${description}
    Domains: ${domains.join(", ")}
    Recruiting For Roles: ${roles.join(", ")}
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
          roles,
          contributors: [user_id],
          applicants: [],
        },
        values: embedding,
      },
    ]);

    const projectResult = await index.fetch([project_id]);
    const projectMetaData = projectResult.records[project_id].metadata;

    res.status(200).send({
      project_id,
      ...projectMetaData,
      project_manager: { user_id, ...contributorMetaData },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to create project" });
  }
};

/**
 * Update a project
 * @param project_id - the id of the project to update
 */
const updateProject = async (req, res) => {
  const { project_id } = req.params;
  const { name, description, domains, external_url, roles } = req.body;

  try {
    const projectResult = await index.fetch([project_id]);
    const projectMetaData = projectResult.records[project_id].metadata;

    const updatedProject = {
      ...projectMetaData,
      name: name ?? projectMetaData.name,
      description: description ?? projectMetaData.description,
      domains: domains ?? projectMetaData.domains,
      external_url: external_url ?? projectMetaData.external_url,
      roles: roles ?? projectMetaData.roles,
    };

    await index.update([
      {
        id: project_id,
        metadata: updatedProject,
      },
    ]);

    res.status(200).send({ project_id, updatedProject });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to update project" });
  }
};

/**
 * Get Project
 * @param project_id - the id of the project to get
 */
const getProject = async (req, res) => {
  const { project_id } = req.params;

  try {
    const projectResult = await index.fetch([project_id]);
    const projectMetaData = projectResult.records[project_id].metadata;

    res.status(200).send({ project, ...projectMetaData });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to get project" });
  }
};

/**
 * Apply to a project
 * @param project_id - the id of the project to apply to
 * @param user_id - the id of the user applying
 */
const applyToProject = async (req, res) => {
  const { project_id } = req.params;
  const { user_id } = req.body;

  try {
    const projectResult = await index.fetch([project_id]);
    const projectMetaData = projectResult.records[project_id].metadata;

    const updatedProject = {
      ...projectMetaData,
      applicants: [...projectMetaData.applicants, user_id],
    };

    await index.update([
      {
        id: project_id,
        metadata: updatedProject,
      },
    ]);

    res.status(200).send({ project_id, updatedProject });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to update project" });
  }
};

/**
 * Get project by manager id
 * @param user_id - the id of the user to get projects for
 */
const getProjectsByManager = async (req, res) => {
  const { user_id } = req.params;

  try {
    const projectResult = await index.query({
      filter: { project_manager_id: user_id },
    });

    const projects = projectResult.matches.map(({ metadata }) => metadata);

    res.status(200).send([projects]);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Unable to get project" });
  }
};

module.exports = {
  queryProjects,
  createProject,
  updateProject,
  getProject,
  applyToProject,
  getProjectsByManager,
};
