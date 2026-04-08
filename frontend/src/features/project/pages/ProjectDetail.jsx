import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  ArrowBigLeft,
  UserRoundPlus,
  Pencil,
  Trash2,
  Users,
  Calendar,
  FileText,
} from "lucide-react";
import { motion as Motion } from "motion/react";
import { container, item, inViewOptions } from "../../../app/motionConfig";

import MainLayout from "../../../components/layout/MainLayout";
import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";
import SkeletonProjectDetail from "./SkeletonProjectDetail";

import Task from "../../task/pages/Task";

import AddMember from "../components/AddMember";
import EditProject from "../components/EditProject";
import DeleteProject from "../components/DeleteProject";
import Chat from "../../../shared/components/chat/Chat";
import Conversation from "../../chat/conversation/Conversation";

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
  const [membersOpen, setMembersOpen] = useState(true);

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
        <div className="col-span-12 lg:col-span-3">
          {/* Header */}
          <Card>
            <div className="flex flex-col gap-4">
              <header className="flex items-start justify-between ">
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => navigate(-1)}
                  aria-label="Back"
                >
                  <ArrowBigLeft />
                </Button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {projectDetail?.name || "Project Detail"}
                </h2>
              </header>

              <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {projectDetail?.description || "No description provided."}
                </p>
                {variant === "owner" && (
                  <div className="flex items-center space-x-2">
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
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-4" />

            <Motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={inViewOptions}
              className="space-y-3"
            >
              <Motion.div variants={item}>
                <dl className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                    <dt className="text-xs text-gray-500 dark:text-gray-400">
                      Owner
                    </dt>
                    <dd className="ml-auto text-sm text-gray-800 dark:text-gray-100">
                      {projectDetail?.owner?.username || "Unknown"}
                    </dd>
                  </div>

                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                    <dt className="text-xs text-gray-500 dark:text-gray-400">
                      Description
                    </dt>
                    <dd className="ml-auto text-sm text-gray-700 dark:text-gray-200 break-words max-w-[18rem]">
                      {projectDetail?.description || "-"}
                    </dd>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                    <dt className="text-xs text-gray-500 dark:text-gray-400">
                      Created
                    </dt>
                    <dd className="ml-auto text-sm text-gray-800 dark:text-gray-100">
                      {projectDetail?.createdAt
                        ? new Date(projectDetail.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </dd>
                  </div>
                </dl>
              </Motion.div>

              <Motion.div variants={item}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <strong className="text-sm text-gray-700 dark:text-gray-200">
                      Members
                    </strong>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {projectDetail?.members?.length || 0}
                    </span>
                  </div>
                  <button
                    onClick={() => setMembersOpen((s) => !s)}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                    aria-expanded={membersOpen}
                  >
                    {membersOpen ? "Hide" : "Show"}
                  </button>
                </div>

                {membersOpen && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {projectDetail?.members?.map((member) => (
                      <li key={member._id} className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-medium">
                          {member.username
                            ?.split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <div className="text-sm text-gray-700 dark:text-gray-200">
                          <div>{member.username}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {member.email}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Motion.div>
            </Motion.div>
          </Card>
        </div>

        {/* Task List */}
        <div className="col-span-12 lg:col-span-5">
          <Task projectId={id} variant={variant} />
        </div>
        {/* chat  */}
        <Card className="col-span-12 lg:col-span-4">
          <div className="space-y-4">
            <div>
              {/* Conversation list manages selection; selected conversation passed to Chat */}
              {/* example: wire conversations from store/API into the Conversation component */}
            </div>
            <Conversation />
            <Chat conversation={null} />
          </div>
        </Card>
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
