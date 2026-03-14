import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";
import { Link } from "react-router-dom";

function RecentProjectCard({ title, description, time, projectId }) {
  return (
    <Card animation={true} className="mb-4 space-y-2">
      <h3 className="text-lg font-semibold">{title || "Project Title"}</h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description || "Project description goes here."}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {time || "Last edited: 2 hours ago"}
      </p>
      <Link to={`/projects/${projectId}/owner`}>
        <Button variant="outline" size="sm" className="mt-2">
          View Project
        </Button>
      </Link>
    </Card>
  );
}
export default RecentProjectCard;
