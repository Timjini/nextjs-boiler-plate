// components/ui/Error.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function Error({ message = "Something went wrong.", onRetry }: ErrorProps) {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[200px]">
      <Card className="w-full max-w-sm shadow-sm border-destructive">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <p className="text-destructive">{message}</p>
          {onRetry && (
            <Button variant="outline" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
