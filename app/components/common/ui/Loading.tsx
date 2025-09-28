import { Card, CardContent } from "@/components/ui/card";

export default function Loading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[200px]">
      <Card className="w-full max-w-sm shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}
