// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "../../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SkeletonProjectDetail from "./SkeletonProjectDetail";

import Task from "../../task/pages/Task";

import AddMember from "../components/AddMember";
import EditProject from "../components/EditProject";
import DeleteProject from "../components/DeleteProject";
import Chat from "../../chat/Chat";
import Conversation from "../../chat/conversation/Conversation";

import useProjectStore from "../stores/projectStore";

function ProjectDetail() {
  const { id, variant } = useParams() as any;
  const navigate = useNavigate();

  const projectDetail = useProjectStore((state: any) => state.projectDetail);
  const fetchProjectById = useProjectStore(
    (state: any) => state.fetchProjectById,
  );
  const loading = useProjectStore((state: any) => state.loading);

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
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* Project Info Sidebar */}
        <Motion.div
          className="col-span-12 lg:col-span-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={inViewOptions}
        >
          {/* Header */}

          <Motion.div variants={item} className="mb-4">
            <Card>
              <CardHeader>
                <CardAction>
                  <Button
                    variant="secondary"
                    size="default"
                    onClick={() => navigate(-1)}
                    aria-label="Back"
                  >
                    <ArrowBigLeft />
                  </Button>
                </CardAction>
                <CardTitle>{projectDetail?.name || "Project Detail"}</CardTitle>
                <CardDescription>
                  {projectDetail?.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    size="default"
                    onClick={() => setOpenAddMember(true)}
                  >
                    <UserRoundPlus className="w-4 h-4" />
                    Add Member
                  </Button>
                  <Button
                    variant="secondary"
                    size="default"
                    onClick={() => setOpenEditProject(true)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="default"
                    onClick={() => setOpenDialogDelete(true)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Motion.div>

          <Motion.div variants={item}>
            <Card>
              <CardContent>
                <dl className="grid gap-3">
                  <div className="flex items-center space-x-4">
                    <Users className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                    <dt className="text-xs text-gray-500 dark:text-gray-400">
                      Owner
                    </dt>
                    <dd className="ml-auto text-sm text-gray-800 dark:text-gray-100">
                      {projectDetail?.owner?.username || "Unknown"}
                    </dd>
                  </div>

                  <div className="flex flex-col items-start space-y-4">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      <dt className="text-xs text-gray-500 dark:text-gray-400">
                        Description
                      </dt>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {projectDetail?.description || "-"}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
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

                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Members</AccordionTrigger>
                    <AccordionContent>
                      {projectDetail?.members?.length > 0 ? (
                        <ul className="flex flex-wrap gap-2">
                          {projectDetail.members.map((member: any) => (
                            <li
                              key={member._id}
                              className="flex items-center gap-2"
                            >
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-medium">
                                {member.username
                                  ?.split(" ")
                                  .map((n: string) => n[0])
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
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          No members found.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </Motion.div>
        </Motion.div>

        {/* Task List */}
        <div className="col-span-12 lg:col-span-5">
          <Task projectId={id} variant={variant} />
        </div>
        {/* chat  */}
        <div className="col-span-12 lg:col-span-4">
          <div className="space-y-4 flex flex-col">
            <Card className="p-4">
              <Conversation />
            </Card>
            <Card className="p-4">
              <Chat conversation={null} />
            </Card>
          </div>
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
