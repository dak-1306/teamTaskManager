import { Card } from "../../../components/ui/card";

type MyTaskCardProps = {
  title: string;
  dueDate: string;
  status: "todo" | "doing" | "done";
};
function MyTaskCard({ title, dueDate, status }: MyTaskCardProps) {
  return (
    <Card className="mb-4">
      <div className="flex flex-col items-start justify-between gap-2 mx-auto">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{dueDate}</p>
        <p
          className={`text-sm font-medium ${status === "done" ? "text-green-500 dark:text-green-400" : status === "doing" ? "text-yellow-500 dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}
        >
          {status}
        </p>
      </div>
    </Card>
  );
}

export default MyTaskCard;
