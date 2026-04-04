import { useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion as Motion } from "motion/react";
import { inViewOptions, container, item } from "../../../app/motionConfig";

import Card from "../../../shared/ui/Card";
import MainLayout from "../../../shared/layout/MainLayout";
import Button from "../../../shared/ui/Button";
import SkeletonSearch from "./SkeletonSearch";

import useProjectStore from "../stores/projectStore";

function ProjectSearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("query");

  const searchProjects = useProjectStore((state) => state.searchProjects);
  const projectSearch = useProjectStore((state) => state.projectSearch);
  const loading = useProjectStore((state) => state.loading);
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
  if (loading) {
    return (
      <MainLayout>
        <SkeletonSearch />
      </MainLayout>
    );
  }
  return (
    <MainLayout>
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
      {!loading && projectSearch.length > 0 && (
        <Motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "
        >
          {projectSearch.map((project) => (
            <Motion.li
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              key={project.id}
              className="space-y-2"
            >
              <Card>
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p>{project.description}</p>
                <Link to={`/projects/${project._id}/owner`}>
                  <Button variant="outline" size="small">
                    View Details
                  </Button>
                </Link>
              </Card>
            </Motion.li>
          ))}
        </Motion.ul>
      )}
      <h2>Project Member</h2>
      {!loading && projectMemberSearch.length > 0 && (
        <Motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "
        >
          {projectMemberSearch.map((project) => (
            <Motion.li
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              key={project.id}
              className="space-y-2"
            >
              <Card>
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p>{project.description}</p>
                <Link to={`/projects/${project._id}/member`}>
                  <Button variant="outline" size="small">
                    View Details
                  </Button>
                </Link>
              </Card>
            </Motion.li>
          ))}
        </Motion.ul>
      )}
    </MainLayout>
  );
}
export default ProjectSearchPage;
