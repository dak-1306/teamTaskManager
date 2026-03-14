import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { FolderPlus } from "lucide-react";

import MainLayout from "../../../shared/layout/MainLayout";
import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import SearchBar from "../../../shared/ui/SearchBar";
import Filter from "../../../shared/ui/Filter";

import CreateProject from "../components/CreateProject";

import useProjectStore from "../stores/projectStore";

function ProjectList() {
  const navigate = useNavigate();

  const { projects, memberProject, fetchProjectMe, loading, filterProjects } =
    useProjectStore();

  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ name: "", date: "" });

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

  const hasProjects = projects.length > 0;
  const hasMemberProjects = memberProject.length > 0;
  return (
    <MainLayout isLogin={true}>
      <div className="space-y-4 mt-4 max-w-7xl mx-auto">
        {loading && (
          <p className="text-center">Loading projects...</p>
        )}
        {!loading && !hasProjects && !hasMemberProjects && (
          <div className="space-y-2">
            <p className="text-center">No projects found.</p>
            <p className="text-center">
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
        {hasProjects ? (
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
        ) : (
          !loading && (
            <p className="text-center">
              You have not created any projects.
            </p>
          )
        )}

        <hr className="my-8" />
        <h2 className="text-xl font-semibold mt-8 text-center">
          Projects I'm a Member Of
        </h2>
        {hasMemberProjects ? (
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
        ) : (
          !loading && (
            <p className="text-center text-gray-500">
              You are not a member of any projects.
            </p>
          )
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
