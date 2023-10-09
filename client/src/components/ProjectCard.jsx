/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useQueryClient, useMutation } from "react-query";
import { saveProject, unSaveProject } from "../api";

import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const ProjectCard = ({ project }) => {
  const { currentUser, isCurrentUserLoading } = useContext(GlobalContext);

  const isSaved = currentUser?.favorite_projects?.includes(project?.project_id);

  const queryClient = useQueryClient();
  const saveProjectMutation = useMutation({
    mutationFn: saveProject,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["get_current_user"],
      });
    },
  });

  const unSaveProjectMutation = useMutation({
    mutationFn: unSaveProject,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["get_current_user"],
      });
    },
  });

  const isLoading =
    isCurrentUserLoading ||
    saveProjectMutation.isLoading ||
    unSaveProjectMutation.isLoading;
  const handleSave = isSaved
    ? unSaveProjectMutation.mutate
    : saveProjectMutation.mutate;
  const saveButtonText = isSaved ? "Unsave" : "Save for later";

  return (
    <Card maxW="sm" height="100%">
      <CardBody>
        <Image
          src={
            project.image_url
              ? project.image_url
              : "https://www.nasa.gov/wp-content/uploads/2021/05/nasa-logo-web-rgb.png"
          }
          alt="Project Picture"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{project.name}</Heading>
          <Text>{project.description}</Text>
          <Text fontWeight="bold" fontSize="sm">
            Open Roles Available:{" "}
            {project.roles.map((role, index) => (
              <span key={index}>
                {role.toLowerCase()}
                {index < project.roles.length - 1 ? ", " : ""}
              </span>
            ))}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2" justifyContent="space-between">
          <Button variant="solid" colorScheme="blue">
            Apply now
          </Button>
          {isLoading ? (
            <Button
              variant="ghost"
              colorScheme="blue"
              disabled={true}
              textAlign="center"
              width="8em"
            >
              <Spinner size="xs" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => {
                handleSave({
                  projectId: project.project_id,
                  userId: currentUser.user_id,
                });
              }}
            >
              {saveButtonText}
            </Button>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
