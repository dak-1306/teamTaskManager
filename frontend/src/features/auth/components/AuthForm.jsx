import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import { Link } from "react-router-dom";
function AuthForm({ onSubmit, field, title }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{title} page</h1>
      <form
        className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
        {field.map((input) => (
          <div key={input.id} className="mb-4">
            <Input
              id={input.id}
              type={input.type}
              placeHolder={input.placeHolder}
              label={input.label}
              ref={input.ref}
            />
          </div>
        ))}
        <div className="flex flex-col items-center justify-between space-y-4">
          <Button type="submit" variant="primary" size="medium">
            {title}
          </Button>
          {title === "Login" && (
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          )}
          {title === "Register" && (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          )}
          <Link to="/" className="text-sm text-gray-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}
export default AuthForm;
