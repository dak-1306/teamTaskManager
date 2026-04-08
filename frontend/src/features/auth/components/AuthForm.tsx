import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Eye, EyeOff, House } from "lucide-react";
import { motion as Motion } from "framer-motion";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "../../../components/ui/field";
import { item, inViewOptions } from "../../../app/motionConfig";

type FieldInput = {
  id: string;
  type: string;
  placeHolder?: string;
  label?: string;
  ref: React.RefObject<HTMLInputElement | null>;
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
  const [showPassword, setShowPassword] = useState(false);

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
        <Field key={input.id} className="mb-4 relative">
          <FieldLabel htmlFor={input.id}>{input.label}</FieldLabel>
          <FieldContent>
            <Input
              id={input.id}
              type={
                showPassword && input.type === "password" ? "text" : input.type
              }
              placeholder={input.placeHolder}
              aria-label={input.label}
              ref={input.ref}
            />

            {input.type === "password" && (
              <button
                type="button"
                className="absolute right-0 top-0 mt-2 mr-3 text-slate-900 focus:outline-none"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            )}

            {errorField === input.id && (
              <FieldError>This field is required</FieldError>
            )}
          </FieldContent>
        </Field>
      ))}
      <div className="flex flex-col items-center justify-between space-y-4">
        <Button
          type="submit"
          variant="default"
          className="w-full"
          size="default"
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
