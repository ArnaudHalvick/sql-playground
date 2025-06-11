"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/inputs/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { DatabaseIcon, SettingsIcon } from "lucide-react";
import { DatabaseSetupModal } from "./database-setup-modal";

interface DatabaseManagerProps {
  className?: string;
}

export function DatabaseManager({ className }: DatabaseManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSetupClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DatabaseIcon className="h-5 w-5" />
            Database Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Setup Button */}
          <Button
            onClick={handleSetupClick}
            variant="default"
            size="sm"
            className="w-full gap-2"
          >
            <SettingsIcon className="h-4 w-4" />
            Setup Database
          </Button>

          {/* Help Text */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Setup Database:</strong> Choose from multiple
              configurations to create tables and insert sample data
            </p>
            <p className="text-amber-600">
              ⚠️ This will replace all existing data
            </p>
          </div>
        </CardContent>
      </Card>

      <DatabaseSetupModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
