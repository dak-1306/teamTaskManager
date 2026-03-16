import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { ArrowBigLeft, UserRoundPlus, Pencil, Trash2 } from "lucide-react";

import MainLayout from "../../../shared/layout/MainLayout";
import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";

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

  console.log("Project Detail:", projectDetail);
  return (
    <MainLayout isLogin={true}>
      <div className="relative">
        <Button
          className="absolute top-0 left-0"
          variant="secondary"
          size="medium"
          onClick={() => navigate(-1)}
        >
          <ArrowBigLeft />
        </Button>
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          {projectDetail?.name || "Project Detail"}
        </h1>

        <Card>
          {loading ? (
            <p className="text-center">Loading project details...</p>
          ) : projectDetail ? (
            <div className="flex justify-between mt-4 mx-auto max-w-2xl">
              <div className="space-y-2">
                <p>
                  <strong>Created:</strong>{" "}
                  {projectDetail.createdAt
                    ? new Date(projectDetail.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
                <p>
                  <strong>Description:</strong> {projectDetail.description}
                </p>
                <p>
                  <strong>Owner:</strong> {projectDetail.owner.username}
                </p>
                <p>
                  <strong>Members:</strong>
                </p>
                <ul className="list-disc list-inside">
                  {projectDetail.members.map((member) => (
                    <li key={member._id}>
                      {member.username} ({member.email})
                    </li>
                  ))}
                </ul>
              </div>

              {variant === "owner" && (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="primary"
                    size="medium"
                    icon={<UserRoundPlus className="w-4 h-4 mr-2" />}
                    onClick={() => setOpenAddMember(true)}
                  >
                    Add Member
                  </Button>
                  <Button
                    variant="secondary"
                    size="medium"
                    icon={<Pencil className="w-4 h-4 mr-2" />}
                    onClick={() => setOpenEditProject(true)}
                  >
                    Edit Project
                  </Button>
                  <Button
                    variant="danger"
                    size="medium"
                    icon={<Trash2 className="w-4 h-4 mr-2" />}
                    onClick={() => setOpenDialogDelete(true)}
                  >
                    Delete Project
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center">Project not found.</p>
          )}
        </Card>
        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <Task
          projectId={id}
          variant={variant}
          projectName={projectDetail ? projectDetail.name : "Loading..."}
        />

        {/* modal add member */}
        {openAddMember && (
          <AddMember
            isOpen={openAddMember}
            onClose={() => setOpenAddMember(false)}
            projectId={id}
          />
        )}
        {/* modal edit project */}
        {openEditProject && (
          <EditProject
            isOpen={openEditProject}
            onClose={() => setOpenEditProject(false)}
            project={projectDetail}
          />
        )}
        {/* modal dialog delete */}
        {openDialogDelete && (
          <DeleteProject
            isOpen={openDialogDelete}
            onClose={() => setOpenDialogDelete(false)}
            projectId={id}
            projectName={projectDetail ? projectDetail.title : "this project"}
          />
        )}
      </div>
    </MainLayout>
  );
}
export default ProjectDetail;
