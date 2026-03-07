import Card from "../../../shared/ui/Card";
import Button from "../../../shared/ui/Button";

function RecentProjectCard({ title, description, time }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">{title || "Project Title"}</h3>
      <p className="text-gray-600">
        {description || "Project description goes here."}
      </p>
      <p className="text-sm text-gray-500">
        {time || "Last edited: 2 hours ago"}
      </p>
      <Button variant="outline" size="sm" className="mt-2">
        View Project
      </Button>
    </Card>
  );
}
export default RecentProjectCard;
