/**
 * Get projects. If no search query is provided, recommendations are given based on
 * users interests and skills.
 * @param search - sort projects based on similarity to search query
 * @param domain - filter projects based on domain
 * @returns - a list of projects
 */
const queryProjects = async (req, res) => {
  const userId = req.user.id;
  const { search, domain } = req.query;
  // get recommendations based on skills and interests
  // get projects by query
};

/**
 * Create a project
 * @param description - description of the project
 * @param domains - a string list of domains the project belongs to
 * @returns the created project
 */
const createProject = async (req, res) => {
  const userId = req.user.id;
  const { description, domains } = req.body;
};

module.exports = {
  queryProjects,
  createProject,
};
