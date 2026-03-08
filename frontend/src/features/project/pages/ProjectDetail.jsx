import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MainLayout from "../../../shared/layout/MainLayout";
import Button from "../../../shared/ui/Button";
import Card from "../../../shared/ui/Card";

import Task from "../../task/pages/Task";

import AddMember from "../components/AddMember";
import EditProject from "../components/EditProject";
import DeleteProject from "../components/DeleteProject";

import AddTask from "../../task/components/AddTask";

import useProjectStore from "../stores/projectStore";

function ProjectDetail() {
  const { id, variant } = useParams();

  const [openAddMember, setOpenAddMember] = useState(false);
  const [openEditProject, setOpenEditProject] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);

  const projectDetail = useProjectStore((state) => state.projectDetail);
  const fetchProjectById = useProjectStore((state) => state.fetchProjectById);

  useEffect(() => {
    fetchProjectById(id);
  }, [fetchProjectById, id]);

  console.log("Project Detail:", projectDetail);

  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="space-y-4 mt-4 max-w-7xl mx-auto relative">
        <Button
          className="absolute top-0 left-0"
          variant="secondary"
          size="small"
          onClick={() => navigate(-1)}
        >
          Back to Projects
        </Button>

        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Project Detail
        </h1>

        <Card className="mb-4 flex space-x-2 justify-center">
          <div className="flex space-x-2">
            {variant === "owner" && (
              <div className="space-x-2">
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setOpenAddMember(true)}
                >
                  Add Members
                </Button>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => setOpenEditProject(true)}
                >
                  Edit Project
                </Button>
                <Button
                  variant="danger"
                  size="medium"
                  onClick={() => setOpenDialogDelete(true)}
                >
                  Delete Project
                </Button>
              </div>
            )}
            <Button
              variant="primary"
              size="medium"
              onClick={() => setOpenAddTask(true)}
            >
              Add Task
            </Button>
          </div>
        </Card>
        <Card
          title={`Project: ${projectDetail ? projectDetail.name : "Loading..."}`}
          description={projectDetail ? projectDetail.description : "Loading..."}
        >
          {projectDetail && (
            <div className="space-y-2">
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
          )}
        </Card>
        <hr className="my-4 border-gray-300" />

        <Task
          projectId={id}
          variant={variant}
          projectName={projectDetail ? projectDetail.name : "Loading..."}
        />

        {/* modal */}
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
            projectName={projectDetail ? projectDetail.name : "this project"}
          />
        )}

        {/* modal add task */}
        {openAddTask && (
          <AddTask
            open={openAddTask}
            onClose={() => setOpenAddTask(false)}
            projectId={id}
          />
        )}
      </div>
    </MainLayout>
  );
}
export default ProjectDetail;
