import { useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";

import Card from "../../../shared/ui/Card";
import MainLayout from "../../../shared/layout/MainLayout";
import Button from "../../../shared/ui/Button";

import useProjectStore from "../stores/projectStore";

function ProjectSearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("query");

  const searchProjects = useProjectStore((state) => state.searchProjects);
  const projectSearch = useProjectStore((state) => state.projectSearch);
  const projectMemberSearch = useProjectStore(
    (state) => state.projectMemberSearch,
  );

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      searchProjects(query);
    }
  }, [searchParams, searchProjects]);

  console.log("Search Results:", projectSearch);
  return (
    <MainLayout isLogin={true}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Project Search Projects</h1>
        {q && (
          <p className="mb-4">
            Search results for: <strong>{q}</strong>
          </p>
        )}
        <Link to="/projects">
          <Button variant="outline" size="small">
            Back to Projects
          </Button>
        </Link>
        <h2>Project Owner</h2>
        {projectSearch.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {projectSearch.map((project) => (
              <Card>
                <li key={project.id} className="space-y-2">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p>{project.description}</p>
                  <Link to={`/projects/${project._id}/owner`}>
                    <Button variant="outline" size="small">
                      View Details
                    </Button>
                  </Link>
                </li>
              </Card>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
        <h2>Project Member</h2>
        {projectMemberSearch.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
            {projectMemberSearch.map((project) => (
              <Card>
                <li key={project.id} className="space-y-2">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p>{project.description}</p>
                  <Link to={`/projects/${project._id}/member`}>
                    <Button variant="outline" size="small">
                      View Details
                    </Button>
                  </Link>
                </li>
              </Card>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>
    </MainLayout>
  );
}
export default ProjectSearchPage;
