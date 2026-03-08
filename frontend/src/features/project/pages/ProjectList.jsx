import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import { FolderPlus } from "lucide-react";

import CreateProject from "../components/CreateProject";

import { Link } from "react-router-dom";

import { useState } from "react";

import { useEffect } from "react";
import useProjectStore from "../stores/projectStore";

function ProjectList() {
  const [openCreateProject, setOpenCreateProject] = useState(false);

  const { projects, memberProject, fetchProjectMe, loading } =
    useProjectStore();

  useEffect(() => {
    fetchProjectMe();
  }, [fetchProjectMe]);

  return (
    <MainLayout>
      <div className="space-y-4 mt-4 max-w-7xl mx-auto">
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
        {projects.length > 0 && (
          <div className="relative space-y-6">
            <Button
              variant="primary"
              className="absolute top-0 left-0"
              size="large"
              onClick={() => {
                setOpenCreateProject(true);
              }}
            >
              <FolderPlus />
            </Button>
            <h2 className="text-xl font-semibold text-center">My Projects</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <li key={project._id} className="mb-4">
                  <Card title={project.name} description={project.description}>
                    <Link to={`/projects/${project._id}/owner`}>
                      <Button variant="outline" size="small">
                        View Details
                      </Button>
                    </Link>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}

        <hr className="my-8" />
        <h2 className="text-xl font-semibold mt-8 text-center">
          Projects I'm a Member Of
        </h2>
        {memberProject.length === 0 ? (
          <p className="text-center text-gray-500">No member projects found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {memberProject.map((project) => (
              <li key={project._id} className="mb-4">
                <Card title={project.name} description={project.description}>
                  <Link to={`/projects/${project._id}/member`}>
                    <Button variant="outline" size="small">
                      View Details
                    </Button>
                  </Link>
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
    </MainLayout>
  );
}
export default ProjectList;
