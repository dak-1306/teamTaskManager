import Card from "../../../shared/ui/Card";

function MyTaskCard({ title, description, status }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p
        className={`text-sm font-medium ${status === "Completed" ? "text-green-500" : "text-yellow-500"}`}
      >
        {status}
      </p>
    </Card>
  );
}

export default MyTaskCard;
