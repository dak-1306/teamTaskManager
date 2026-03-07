import RecentProjectCard from "../components/RecentProjectCard";

import { useEffect } from "react";

import useProjectStore from "../../project/stores/projectStore";

function RecentProjectPage() {
  const { projects, fetchProjectMe } = useProjectStore();
  useEffect(() => {
    fetchProjectMe();
  }, [fetchProjectMe]);

  console.log("Projects in RecentProjectPage:", projects);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-7xl">
      <ul className="list-none">
        {projects ? (
          projects.map((project) => (
            <li key={project.id}>
              <RecentProjectCard
                title={project.name}
                description={project.description}
                time={project.updatedAt}
              />
            </li>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </ul>
    </div>
  );
}

export default RecentProjectPage;
