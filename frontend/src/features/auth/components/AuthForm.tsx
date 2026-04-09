import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Eye, EyeOff, House } from "lucide-react";
import { motion as Motion } from "framer-motion";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Field, FieldLabel, FieldError } from "../../../components/ui/field";

import { item, inViewOptions } from "../../../app/motionConfig";

type FieldInput = {
  id: string;
  type: string;
  placeHolder?: string;
  label?: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

type AuthFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  field: FieldInput[];
  title: string;
  error?: string | null;
  errorField?: string | null;
  loading?: boolean;
};

function AuthForm({
  onSubmit,
  field,
  title,
  error,
  errorField,
  loading,
}: AuthFormProps) {
  // 👉 state riêng cho từng input password
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  return (
    <Motion.form
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={inViewOptions}
      className="w-full max-w-sm bg-white/20 shadow-md shadow-gray-300 rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={onSubmit}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">{title} page</h1>

      {field.map((input) => (
        <Field key={input.id} className="mb-4">
          <FieldLabel className="text-white" htmlFor={input.id}>
            {input.label}
          </FieldLabel>

          <div className="relative">
            <Input
              id={input.id}
              type={
                input.type === "password" && showPassword[input.id]
                  ? "text"
                  : input.type
              }
              placeholder={input.placeHolder}
              value={input.state}
              onChange={(e) => input.setState(e.target.value)}
              className={input.type === "password" ? "pr-10" : ""}
            />

            {input.type === "password" && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-7 w-7"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    [input.id]: !prev[input.id],
                  }))
                }
              >
                {showPassword[input.id] ? (
                  <EyeOff className="w-4 h-4 text-white" />
                ) : (
                  <Eye className="w-4 h-4 text-white" />
                )}
              </Button>
            )}
          </div>

          {errorField === input.id && (
            <FieldError>This field is required</FieldError>
          )}
        </Field>
      ))}

      <div className="flex flex-col items-center justify-between space-y-4">
        <Button
          type="submit"
          variant="default"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Loading..." : title}
        </Button>

        {error && <p className="text-red-300">{error}</p>}

        {title === "Login" && (
          <p className="text-m text-gray-100">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        )}

        {title === "Register" && (
          <p className="text-m text-gray-100">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        )}

        <Link to="/" className="text-sm text-gray-100 hover:underline">
          <House className="inline-block" />
        </Link>
      </div>
    </Motion.form>
  );
}

export default AuthForm;
