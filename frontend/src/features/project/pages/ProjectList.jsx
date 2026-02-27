import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import CreateProject from "../components/CreateProject";

import { Link } from "react-router-dom";

import { useState } from "react";
function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [openCreateProject, setOpenCreateProject] = useState(false);

  const sampleProjects = [
    {
      id: 1,
      name: "Project Alpha",
      description: "This is the first project.",
    },
    {
      id: 2,
      name: "Project Beta",
      description: "This is the second project.",
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "This is the third project.",
    },
  ];
  const projectList = () => {
    if (projects.length === 0) {
      return sampleProjects;
    }
    return projects;
  };
  return (
    <MainLayout>
      <div className="space-y-4 p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Project List</h1>
        <Button
          variant="primary"
          size="medium"
          onClick={() => {
            setOpenCreateProject(true);
          }}
        >
          Create New Project
        </Button>
        {projectList().length === 0 ? (
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
                  console.log(
                    "Create Project button clicked",
                    openCreateProject,
                  );
                }}
              >
                Create Project
              </Button>
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectList().map((project) => (
              <li key={project.id} className="mb-4">
                <Card title={project.name} description={project.description}>
                  <div className="flex space-x-2">
                    <Link to={`/projects/${project.id}`}>
                      <Button variant="secondary" size="small">
                        View Details
                      </Button>
                    </Link>
                    <Button variant="primary" size="small">
                      Edit Project
                    </Button>
                    <Button variant="danger" size="small">
                      Delete Project
                    </Button>
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
          setProjects={setProjects}
          projects={projects}
        />
      )}
    </MainLayout>
  );
}
export default ProjectList;
