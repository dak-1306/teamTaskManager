// @ts-nocheck
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { FolderPlus, Calendar } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { inViewOptions, container, item } from "../../../app/motionConfig";

import formatDate from "../../../components/utils/formatDate";

import MainLayout from "../../../components/layout/MainLayout";
import CardProject from "../../../components/common/CardProject";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import SearchBar from "../../../components/common/Search";
import Filter from "../../../components/common/Filter";
import SkeletonProjectList from "./SkeletonProjectList";
import EmptyProjectBox from "../components/EmptyProjectBox";

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
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmitSearch = (e: any) => {
    e.preventDefault();
    navigate(`/projects/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleFilterChange = (payload: any) => {
    setFilter((prev) => ({
      ...prev,
      ...payload,
    }));
  };

  // Define filter options
  const filterName = [
    { value: "", label: "Default" },
    { value: "nameAsc", label: "Name (A-Z)" },
    { value: "nameDesc", label: "Name (Z-A)" },
  ];

  const filterDate = [
    { value: "", label: "Default" },
    { value: "createdAtAsc", label: "Created At (Asc)" },
    { value: "createdAtDesc", label: "Created At (Desc)" },
  ];

  const hasProjects = projects.length > 0;
  const hasMemberProjects = memberProject.length > 0;

  if (loading) {
    return (
      <MainLayout>
        <SkeletonProjectList />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {!loading && !hasProjects && !hasMemberProjects ? (
        <EmptyProjectBox onCreate={() => setOpenCreateProject(true)} />
      ) : (
        <div>
          <Motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={inViewOptions}
          >
            <Card className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center space-x-2 w-full">
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
                  onFilterChange={(value) =>
                    handleFilterChange({ name: value })
                  }
                />

                <Filter
                  name="date"
                  options={filterDate}
                  value={filter.date}
                  onFilterChange={(value) =>
                    handleFilterChange({ date: value })
                  }
                />

                <Button
                  variant="default"
                  size="lg"
                  icon={<FolderPlus className="w-4 h-4 mr-2" />}
                  onClick={() => setOpenCreateProject(true)}
                >
                  Create Project
                </Button>
              </div>
            </Card>
          </Motion.ul>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
            <div className="space-y-4 border-r border-gray-200 dark:border-gray-700 pr-2">
              <h1 className="text-2xl font-semibold text-center">
                My Projects
              </h1>
              <Motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={inViewOptions}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none"
              >
                {hasProjects ? (
                  projects.map((project: any) => (
                    <Motion.li
                      key={project._id}
                      variants={item}
                      className="list-none"
                    >
                      <CardProject project={project} variant="owner" />
                    </Motion.li>
                  ))
                ) : (
                  <p className="col-span-full text-gray-500 text-center">
                    No projects found.
                  </p>
                )}
              </Motion.ul>
            </div>

            <div className="space-y-4 border-l border-gray-200 dark:border-gray-700 pl-2">
              <h2 className="text-xl font-semibold text-center">
                Projects I'm a Member Of
              </h2>

              <Motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={inViewOptions}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 list-none"
              >
                {hasMemberProjects ? (
                  memberProject.map((project: any) => (
                    <Motion.li
                      key={project._id}
                      variants={item}
                      className="list-none"
                    >
                      <CardProject project={project} variant="member" />
                    </Motion.li>
                  ))
                ) : (
                  <p className="col-span-full text-gray-500 text-center">
                    No member projects found.
                  </p>
                )}
              </Motion.ul>
            </div>
          </div>
        </div>
      )}

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
