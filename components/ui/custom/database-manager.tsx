"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/inputs/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { Badge } from "@/components/ui/feedback/badge";
import { Alert, AlertDescription } from "@/components/ui/feedback/alert";
import {
  DatabaseIcon,
  RefreshCwIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  InfoIcon,
} from "lucide-react";
import {
  setupDatabase,
  resetDatabase,
  getDatabaseInfo,
  fixRunQueryFunction,
} from "@/utils/supabase/database-manager";

interface DatabaseManagerProps {
  className?: string;
}

export function DatabaseManager({ className }: DatabaseManagerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [operation, setOperation] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [dbInfo, setDbInfo] = useState<any>(null);

  const handleOperation = async (
    operationType: "setup" | "reset" | "info" | "fix",
    operationFn: () => Promise<any>
  ) => {
    setIsLoading(true);
    setOperation(operationType);
    setStatus("idle");
    setMessage("");

    try {
      const result = await operationFn();

      if (operationType === "info") {
        setDbInfo(result);
      }

      setStatus("success");
      setMessage(getSuccessMessage(operationType));

      // Auto-refresh info after setup/reset
      if (operationType === "setup" || operationType === "reset") {
        setTimeout(async () => {
          try {
            const info = await getDatabaseInfo();
            setDbInfo(info);
          } catch (error) {
            console.error("Failed to refresh database info:", error);
          }
        }, 1000);
      }
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
      case "info":
        return "Database information retrieved successfully.";
      case "fix":
        return "run_query function has been fixed and should now work properly.";
      default:
        return "Operation completed successfully.";
    }
  };

  const handleSetup = () => {
    handleOperation("setup", setupDatabase);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "⚠️ This will delete ALL data and recreate the database. Are you sure?"
      )
    ) {
      handleOperation("reset", resetDatabase);
    }
  };

  const handleInfo = () => {
    handleOperation("info", getDatabaseInfo);
  };

  const handleFix = () => {
    handleOperation("fix", fixRunQueryFunction);
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case "error":
        return <XCircleIcon className="h-4 w-4 text-red-600" />;
      default:
        return <InfoIcon className="h-4 w-4 text-blue-600" />;
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

          <Button
            onClick={handleInfo}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <InfoIcon className="h-4 w-4" />
            {isLoading && operation === "info" ? "Checking..." : "Check Status"}
          </Button>

          <Button
            onClick={handleFix}
            disabled={isLoading}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <AlertCircleIcon className="h-4 w-4" />
            {isLoading && operation === "fix" ? "Fixing..." : "Fix Query Fn"}
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

        {/* Database Info */}
        {dbInfo && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Database Status:</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(dbInfo).map(([table, info]: [string, any]) => (
                <div
                  key={table}
                  className="flex items-center justify-between p-2 border rounded text-xs"
                >
                  <span className="font-medium">{table}</span>
                  {info.error ? (
                    <Badge variant="destructive" className="text-xs">
                      Error
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      {info.count} rows
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
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
          <p>
            <strong>Check Status:</strong> View current table counts
          </p>
          <p>
            <strong>Fix Query Fn:</strong> Fix the run_query function if queries
            aren't working
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
