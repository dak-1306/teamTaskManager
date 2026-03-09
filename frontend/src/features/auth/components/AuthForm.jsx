import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

import { Eye, EyeOff, House } from "lucide-react";

import { Link } from "react-router-dom";

import { useState } from "react";
function AuthForm({ onSubmit, field, title, error, errorField }) {
  const [showPassword, setShowPassword] = useState(false);

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
              type={
                showPassword && input.type === "password" ? "text" : input.type
              }
              classNameInput="relative"
              placeHolder={input.placeHolder}
              label={input.label}
              ref={input.ref}
            >
              {input.type === "password" && (
                <button
                  type="button"
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-600"
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
              
            </Input>
            {errorField === input.id && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
          </div>
        ))}
        <div className="flex flex-col items-center justify-between space-y-4">
          <Button type="submit" variant="primary" size="medium">
            {title}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
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
            <House className="inline-block" />
          </Link>
        </div>
      </form>
    </div>
  );
}
export default AuthForm;
