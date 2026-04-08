import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
type RecentProjectCardProps = {
  title: string;
  description: string;
  time: string;
  projectId: string;
};
function RecentProjectCard({
  title,
  description,
  time,
  projectId,
}: RecentProjectCardProps) {
  return (
    <Card className="mb-4 space-y-2">
      <h3 className="text-lg font-semibold">{title || "Project Title"}</h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description || "Project description goes here."}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {time || "Last edited: 2 hours ago"}
      </p>
      <Link to={`/projects/${projectId}/owner`}>
        <Button variant="outline" className="mt-2">
          View Project
        </Button>
      </Link>
    </Card>
  );
}
export default RecentProjectCard;
