import Card from "../../../shared/ui/Card";

function MyTaskCard({ title, description, status }) {
  return (
    <Card animation={true} className="mb-4 space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      <p
        className={`text-sm font-medium ${status === "Completed" ? "text-green-500 dark:text-green-400" : "text-yellow-500 dark:text-yellow-400"}`}
      >
        {status}
      </p>
    </Card>
  );
}

export default MyTaskCard;
