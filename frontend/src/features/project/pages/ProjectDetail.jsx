import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { ArrowBigLeft, UserRoundPlus, Pencil, Trash2 } from "lucide-react";
import { motion as Motion } from "motion/react";
import { container, item, inViewOptions } from "../../../app/motionConfig";

import MainLayout from "../../../shared/layout/MainLayout";
import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";
import SkeletonProjectDetail from "./SkeletonProjectDetail";

import Task from "../../task/pages/Task";

import AddMember from "../components/AddMember";
import EditProject from "../components/EditProject";
import DeleteProject from "../components/DeleteProject";

import useProjectStore from "../stores/projectStore";

function ProjectDetail() {
  const { id, variant } = useParams();
  const navigate = useNavigate();

  const projectDetail = useProjectStore((state) => state.projectDetail);
  const fetchProjectById = useProjectStore((state) => state.fetchProjectById);
  const loading = useProjectStore((state) => state.loading);

  const [openAddMember, setOpenAddMember] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  useEffect(() => {
    fetchProjectById(id);
  }, [fetchProjectById, id]);

  if (loading) {
    return (
      <MainLayout>
        <SkeletonProjectDetail />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Project Info Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          {/* Header */}
          <Card>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBigLeft />
                </Button>

                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {projectDetail?.name || "Project Detail"}
                </h1>
              </div>

              {variant === "owner" && (
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="medium"
                    icon={<UserRoundPlus className="w-4 h-4 mr-2" />}
                    onClick={() => setOpenAddMember(true)}
                  >
                    Add
                  </Button>
                  <Button
                    variant="secondary"
                    size="medium"
                    icon={<Pencil className="w-4 h-4 mr-2" />}
                    onClick={() => setOpenEditProject(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="medium"
                    icon={<Trash2 className="w-4 h-4 mr-2" />}
                    onClick={() => setOpenDialogDelete(true)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Card>
          <Card>
            <Motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              className="space-y-3"
            >
              <Motion.p variants={item}>
                <strong>Owner:</strong> {projectDetail?.owner?.username}
              </Motion.p>

              <Motion.p variants={item}>
                <strong>Description:</strong> {projectDetail?.description}
              </Motion.p>

              <Motion.p variants={item}>
                <strong>Created:</strong>{" "}
                {projectDetail?.createdAt
                  ? new Date(projectDetail.createdAt).toLocaleDateString()
                  : "Unknown"}
              </Motion.p>

              <Motion.div variants={item}>
                <strong>Members:</strong>
                <ul className="list-disc list-inside">
                  {projectDetail?.members?.map((member) => (
                    <li key={member._id}>
                      {member.username} ({member.email})
                    </li>
                  ))}
                </ul>
              </Motion.div>
            </Motion.div>
          </Card>
        </div>

        {/* Task List */}
        <div className="col-span-12 lg:col-span-8">
          <Task projectId={id} variant={variant} />
        </div>
      </div>

      {/* Modals */}
      {openAddMember && (
        <AddMember
          isOpen={openAddMember}
          onClose={() => setOpenAddMember(false)}
          projectId={id}
        />
      )}

      {openEditProject && (
        <EditProject
          isOpen={openEditProject}
          onClose={() => setOpenEditProject(false)}
          project={projectDetail}
        />
      )}

      {openDialogDelete && (
        <DeleteProject
          isOpen={openDialogDelete}
          onClose={() => setOpenDialogDelete(false)}
          projectId={id}
          projectName={projectDetail ? projectDetail.title : "this project"}
        />
      )}
    </MainLayout>
  );
}

export default ProjectDetail;
