import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import SearchBar from "../../../shared/ui/SearchBar";
import Filter from "../../../shared/ui/Filter";

import { FolderPlus } from "lucide-react";

import CreateProject from "../components/CreateProject";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

import { useEffect } from "react";
import useProjectStore from "../stores/projectStore";

function ProjectList() {
  const navigate = useNavigate();
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ name: "", date: "" });

  const { projects, memberProject, fetchProjectMe, loading, filterProjects } =
    useProjectStore();

  useEffect(() => {
    fetchProjectMe();
  }, [fetchProjectMe]);

  useEffect(() => {
    filterProjects(filter.name, filter.date);
  }, [filter, filterProjects]);

  // Search and filter handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    navigate(`/projects/search?query=${encodeURIComponent(searchTerm)}`);
    console.log("Search term:", searchTerm);
  };

  const handleFilterChange = ({ name, date }) => {
    setFilter({ name: name ? name : "", date: date ? date : "" });
  };

  // Define filter options
  const filterName = [
    { value: "nameAsc", label: "Name (A-Z)" },
    { value: "nameDesc", label: "Name (Z-A)" },
  ];

  const filterDate = [
    { value: "createdAtAsc", label: "Created At (Asc)" },
    { value: "createdAtDesc", label: "Created At (Desc)" },
  ];
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
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">My Projects</h2>
            <Card>
              <div className="flex items-center space-x-2">
                <SearchBar
                  placeholder="Search projects..."
                  onChange={handleSearch}
                  value={searchTerm}
                  onSubmit={handleSubmitSearch}
                />
                <Filter
                  name="name"
                  options={filterName}
                  value={filter.name}
                  onFilterChange={(e) =>
                    handleFilterChange({ name: e.target.value })
                  }
                />

                <Filter
                  name="date"
                  options={filterDate}
                  value={filter.date}
                  onFilterChange={(e) =>
                    handleFilterChange({ date: e.target.value })
                  }
                />

                <Button
                  variant="primary"
                  size="large"
                  icon={<FolderPlus className="w-4 h-4 mr-2" />}
                  onClick={() => {
                    setOpenCreateProject(true);
                  }}
                >
                  Create Project
                </Button>
              </div>
            </Card>

            <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projects.map((project) => (
                <li key={project._id} className="mb-4">
                  <Card
                    title={project.name}
                    description={project.description}
                    animation={true}
                  >
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
                <Card
                  title={project.name}
                  description={project.description}
                  animation={true}
                >
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
