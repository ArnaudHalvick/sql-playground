"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/inputs/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { Alert, AlertDescription } from "@/components/ui/feedback/alert";
import {
  DatabaseIcon,
  RefreshCwIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";

interface DatabaseManagerProps {
  className?: string;
}

export function DatabaseManager({ className }: DatabaseManagerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [operation, setOperation] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleOperation = async (
    operationType: "setup" | "reset",
    endpoint: string
  ) => {
    setIsLoading(true);
    setOperation(operationType);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `${operationType} operation failed`);
      }

      setStatus("success");
      setMessage(getSuccessMessage(operationType));
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || `${operationType} operation failed`);
      console.error(`${operationType} failed:`, error);
    } finally {
      setIsLoading(false);
      setOperation(null);
    }
  };

  const getSuccessMessage = (operationType: string): string => {
    switch (operationType) {
      case "setup":
        return "Database setup completed successfully! All tables and sample data have been created.";
      case "reset":
        return "Database reset completed successfully! All data has been refreshed.";
      default:
        return "Operation completed successfully.";
    }
  };

  const handleSetup = () => {
    handleOperation("setup", "/api/database/setup");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "⚠️ This will delete ALL data and recreate the database. Are you sure?"
      )
    ) {
      handleOperation("reset", "/api/database/reset");
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case "error":
        return <XCircleIcon className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DatabaseIcon className="h-5 w-5" />
          Database Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleSetup}
            disabled={isLoading}
            variant="default"
            size="sm"
            className="gap-2"
          >
            <PlayIcon className="h-4 w-4" />
            {isLoading && operation === "setup" ? "Setting up..." : "Setup DB"}
          </Button>

          <Button
            onClick={handleReset}
            disabled={isLoading}
            variant="destructive"
            size="sm"
            className="gap-2"
          >
            <RefreshCwIcon className="h-4 w-4" />
            {isLoading && operation === "reset" ? "Resetting..." : "Reset DB"}
          </Button>
        </div>

        {/* Status Message */}
        {message && (
          <Alert className={getStatusColor()}>
            <div className="flex items-start gap-2">
              {getStatusIcon()}
              <AlertDescription className="text-sm">{message}</AlertDescription>
            </div>
          </Alert>
        )}

        {/* Help Text */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Setup DB:</strong> Create tables and insert sample data
          </p>
          <p>
            <strong>Reset DB:</strong> Drop all tables and recreate with fresh
            data
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
