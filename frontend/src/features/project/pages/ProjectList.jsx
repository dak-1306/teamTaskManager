import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import CreateProject from "../components/CreateProject";
import EditProject from "../components/EditProject";
import DeleteProject from "../components/DeleteProject";

import { Link } from "react-router-dom";

import { useState } from "react";

import { useEffect } from "react";
import useProjectStore from "../stores/projectStore";

function ProjectList() {
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);
  const [openDeleteProject, setOpenDeleteProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects, memberProject, fetchProjectMe, loading } =
    useProjectStore();

  useEffect(() => {
    fetchProjectMe();
  }, [fetchProjectMe]);

  return (
    <MainLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Project List</h1>

        {loading && (
          <p className="text-center text-gray-500">Loading projects...</p>
        )}
        {projects.length === 0 && memberProject.length === 0 && (
          <div className="space-y-2">
            <p className="text-center text-gray-500">No projects found.</p>
            <p className="text-center text-gray-500">
              Let's create a new project!
            </p>
            <div className="flex justify-center">
              <Button
                variant="primary"
                size="medium"
                onClick={() => {
                  setOpenCreateProject(true);
                }}
              >
                Create Project
              </Button>
            </div>
          </div>
        )}
        {projects && (
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              setOpenCreateProject(true);
            }}
          >
            Create New Project
          </Button>
        )}
        {projects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found.</p>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">My Projects</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <li key={project._id} className="mb-4">
                  <Card title={project.name} description={project.description}>
                    <div className="flex space-x-2">
                      <Link to={`/projects/${project._id}/owner`}>
                        <Button variant="secondary" size="small">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => {
                          setSelectedProject(project);
                          setOpenEditProject(true);
                        }}
                      >
                        Edit Project
                      </Button>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => {
                          setSelectedProject(project);
                          setOpenDeleteProject(true);
                        }}
                      >
                        Delete Project
                      </Button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}
        <h2 className="text-xl font-semibold mt-8">Projects I'm a Member Of</h2>
        {memberProject.length === 0 ? (
          <p className="text-center text-gray-500">No member projects found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memberProject.map((project) => (
              <li key={project._id} className="mb-4">
                <Card title={project.name} description={project.description}>
                  <div className="flex space-x-2">
                    <Link to={`/projects/${project._id}/member`}>
                      <Button variant="secondary" size="small">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>

      {openCreateProject && (
        <CreateProject
          isOpen={openCreateProject}
          onClose={() => setOpenCreateProject(false)}
        />
      )}
      {openEditProject && (
        <EditProject
          isOpen={openEditProject}
          onClose={() => setOpenEditProject(false)}
          project={selectedProject}
        />
      )}
      {openDeleteProject && (
        <DeleteProject
          isOpen={openDeleteProject}
          onClose={() => setOpenDeleteProject(false)}
          project={selectedProject}
        />
      )}
    </MainLayout>
  );
}
export default ProjectList;
