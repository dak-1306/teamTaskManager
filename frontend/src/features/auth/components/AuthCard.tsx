import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

type AuthCardProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
  isSubmitting?: boolean;
  error?: string;
  footer?: ReactNode;
};

function AuthCard({
  title,
  description,
  action,
  children,
  onSubmit,
  loading,
  isSubmitting,
  error,
  footer,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <form id="auth-form" onSubmit={onSubmit}>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">{children}</div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            form="auth-form"
          >
            {loading ? <Spinner /> : title}
          </Button>
          {footer}

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardFooter>
      </form>
    </Card>
  );
}

export default AuthCard;
