import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { View } from "lucide-react";
import formatDate from "../utils/formatDate";
type Props = {
  project: any;
  variant?: "owner" | "member";
};
export default function CardProject({ project, variant }: Props) {
  return (
    <Link to={`/projects/${project._id}/${variant}`}>
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>
            {project.description?.length > 120
              ? project.description.slice(0, 120) + "..."
              : project.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {project.createdAt && `${formatDate(project.createdAt)}`}
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            <View className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
