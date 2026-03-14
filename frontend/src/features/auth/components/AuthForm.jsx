import { Link } from "react-router-dom";
import { useState } from "react";

import { Eye, EyeOff, House } from "lucide-react";

import Button from "../../../shared/ui/Button";

function AuthForm({ onSubmit, field, title, error, errorField }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="w-full max-w-sm bg-white/20 shadow-md shadow-gray-300 rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">{title} page</h1>
      {field.map((input) => (
        <div key={input.id} className="mb-4 space-x-2 relative">
          <input
            id={input.id}
            type={
              showPassword && input.type === "password" ? "text" : input.type
            }
            className="shadow appearance-none border border-gray-300 rounded bg-white/40 w-full py-2 px-3 text-gray-800 focus:outline-none focus:shadow-outline "
            placeholder={input.placeHolder}
            label={input.label}
            ref={input.ref}
          />
          {input.type === "password" && (
            <button
              type="button"
              className="absolute right-0 top-0  mt-2 mr-3 text-gray-600 focus:outline-none"
              onClick={() => {
                setShowPassword(!showPassword);
                const inputField = input.ref.current;
                if (inputField.type === "password") {
                  inputField.type = "text";
                } else {
                  inputField.type = "password";
                }
              }}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          )}

          {errorField === input.id && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>
      ))}
      <div className="flex flex-col items-center justify-between space-y-4">
        <Button type="submit" variant="primary" className="w-full" size="large">
          {title}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
        {title === "Login" && (
          <p className="text-m text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        )}
        {title === "Register" && (
          <p className="text-m text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        )}
        <Link to="/" className="text-sm text-gray-300 hover:underline">
          <House className="inline-block" />
        </Link>
      </div>
    </form>
  );
}
export default AuthForm;
