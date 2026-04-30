// @ts-nocheck
import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { inViewOptions, container, item } from "../../../app/motionConfig";

import { Card } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import MainLayout from "../../../components/layout/MainLayout";
import { Button } from "../../../components/ui/button";

import useProjectStore from "../stores/projectStore";

function ProjectSearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("query");

  const searchProjects = useProjectStore((state: any) => state.searchProjects);
  const projectSearch = useProjectStore((state: any) => state.projectSearch);
  const loading = useProjectStore((state: any) => state.loading);
  const projectMemberSearch = useProjectStore(
    (state: any) => state.projectMemberSearch,
  );

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      searchProjects(query);
    }
  }, [searchParams, searchProjects]);

  const renderSkeleton = () => (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <li key={idx}>
          <Card className="p-4 space-y-4">
            <Skeleton className="h-6 w-3/4 rounded bg-muted" />
            <Skeleton className="h-4 w-full rounded bg-muted" />
            <Skeleton className="h-10 w-24 rounded bg-muted" />
          </Card>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Project Search</h1>
          {q && (
            <p className="text-sm text-gray-600 mt-1">
              Search results for: <strong>{q}</strong>
            </p>
          )}
        </div>

        <div>
          <Link to="/projects">
            <Button variant="outline" size="sm">
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div>
            {renderSkeleton()}
          </div>
          <h2 className="text-xl font-bold">Project Member</h2>
          <div>
            {renderSkeleton()}
          </div>
        </div>
      ) : (
        <>
          {projectSearch.length > 0 && (
            <Motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
            >
              {projectSearch.map((project: any) => (
                <Motion.li
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={inViewOptions}
                  key={project.id}
                  className="space-y-2"
                >
                  <Card className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
                    <Link to={`/projects/${project._id}/owner`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </Card>
                </Motion.li>
              ))}
            </Motion.ul>
          )}
          
          <h2 className="text-xl font-bold mb-4">Project Member</h2>
          {projectMemberSearch.length > 0 ? (
            <Motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "
            >
              {projectMemberSearch.map((project: any) => (
                <Motion.li
                  variants={item}
                  initial="hidden"
                  whileInView="show"
                  viewport={inViewOptions}
                  key={project.id}
                  className="space-y-2"
                >
                  <Card className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
                    <Link to={`/projects/${project._id}/member`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </Card>
                </Motion.li>
              ))}
            </Motion.ul>
          ) : (
            <p className="text-gray-500">No member projects found.</p>
          )}
        </>
      )}
    </div>
  );
}
export default ProjectSearchPage;
