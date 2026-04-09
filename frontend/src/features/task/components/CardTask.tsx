import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, View } from "lucide-react";
import formatDate from "../../../components/utils/formatDate";
import { Link } from "react-router-dom";
type Props = {
  task: any;
  projectId: string;
  variant?: "default" | "compact";
};
export default function CardTask({ task, projectId, variant }: Props) {
  return (
    <Link to={`/projects/${projectId}/${variant}/tasks/${task._id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>
            {task.description?.length > 120
              ? task.description.slice(0, 120) + "..."
              : task.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-300 inline-block mr-1" />
            {task.createdAt && `${formatDate(task.createdAt)}`}
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="link" size="sm">
            <View className="w-4 h-4" />
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
