const dotenv = require("dotenv");
dotenv.config();
const index = require("../singletons/db");
const { OpenAIService } = require("../services/openai");
const { faker } = require("@faker-js/faker");
const { ZODIAC_SIGNS } = require("../data/zodiac");
const { SAMPLE_PROJECTS } = require("../data/projects");
const { v4: uuidv4 } = require("uuid");
const { getIncompatibleSigns } = require("../utils/zodiac");

const fakeContributor = async (projectDescription) => {
  const skills = await OpenAIService.generateList(`
  a list of skills (described in 1-4 words) that a possible contributor to the following project might have.
    
  "${projectDescription}"
  `);

  const interests = await OpenAIService.promptGeneration(`
  Given the project description below, consider the interests a possible contributor to the project might have.
  
  "${projectDescription}"

  Also consider the interests of a person who would generally be interested in open science projects.
  Generate a short blurb (2-3 sentences) of interests that a contributor to open science projects might have.
  Write this from the perspective of the contributor and as if they were going to use that description to apply to multiple open science projects.
  `);

  const star_sign = faker.helpers.arrayElement(ZODIAC_SIGNS);

  const embedding = await OpenAIService.createEmbedding(`
  Skills: ${skills.join(", ")}
  Interests: ${interests}
  Star Sign: ${star_sign}
  `);

  return {
    user_id: uuidv4(),
    email: faker.internet.email().toLowerCase(),
    interests,
    skills: skills.join(", "),
    star_sign,
    favorite_projects: [],
    embedding,
  };
};

const fakeProjectAndOwner = async (projectData) => {
  const contributor = await fakeContributor(projectData.description);

  const incompatible_signs = getIncompatibleSigns(contributor.star_sign);

  const roles = await OpenAIService.generateList(
    `
    a list of roles (described in 1-4 words) that a possible contributor to the following project might have.  
    
    "${projectData.description}"
    `
  );

  const embedding = await OpenAIService.createEmbedding(`
  Name: ${projectData.name}
  Description: ${projectData.description}
  Domains: ${projectData.domains}
  Recruiting for Roles: ${roles.join(", ")}
  Incompatible Star Signs: ${incompatible_signs.join(", ")}
  `);

  const project = {
    project_id: uuidv4(),
    name: projectData.name,
    description: projectData.description,
    domains: projectData.domains,
    project_manager_id: contributor.user_id,
    external_url: projectData.external_url,
    incompatible_signs,
    image_url: projectData.image_url,
    roles,
    contributors: [contributor.user_id],
    applicants: [],
    embedding,
  };

  return { project, contributor };
};

const dataPromise = Promise.all(
  SAMPLE_PROJECTS.map(async (projectData) => {
    console.log(`Creating project and owner for ${projectData.name}`);

    const { project, contributor } = await fakeProjectAndOwner(projectData);

    console.log("Project", project);
    console.log("Contributor", contributor);

    const {
      project_id,
      embedding: projectEmbedding,
      ...formattedProjectData
    } = project;

    const {
      user_id,
      embedding: contributorEmbedding,
      ...formattedContributorData
    } = contributor;

    return [
      {
        id: user_id,
        metadata: {
          type: "contributor",
          ...formattedContributorData,
        },
        values: contributorEmbedding,
      },
      {
        id: project.project_id,
        metadata: {
          type: "project",
          ...formattedProjectData,
        },
        values: projectEmbedding,
      },
    ];
  })
);

dataPromise
  .then((data) => {
    console.log("INSERTING DATA");
    index.upsert(data.flat()).then(() => {
      console.log("DATA INSERTED!");
    });
  })
  .catch((e) => {
    console.log("ERROR", e);
  });
