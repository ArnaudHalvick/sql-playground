"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/overlays/dialog";
import { Button } from "@/components/ui/inputs/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { Alert, AlertDescription } from "@/components/ui/feedback/alert";
import {
  DatabaseIcon,
  Users,
  Package,
  ShoppingCart,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/feedback/badge";

// Helper function to get dynamic date range
function getDynamicDateRange(): { start: string; end: string } {
  const now = new Date();

  // Start from 2 years ago to have good historical data
  const startDate = new Date(now);
  startDate.setFullYear(startDate.getFullYear() - 2);
  const start = startDate.toISOString().split("T")[0];

  // End today (orders are placed up to today, not in the future)
  const end = now.toISOString().split("T")[0];

  return { start, end };
}

interface DatabaseSetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DatabaseConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  stats: {
    users: number;
    products: number;
    orders: number;
  };
  config: {
    countries: number;
    cities: number;
    users: number;
    products: number;
    orders: number;
    orderItemsPerOrder: { min: number; max: number };
    dateRange: {
      start: string;
      end: string;
    };
  };
}

const databaseConfigs: DatabaseConfig[] = [
  {
    id: "small",
    name: "Small Dataset",
    description: "Perfect for quick testing and learning SQL basics",
    icon: <Users className="h-5 w-5" />,
    badge: "Recommended",
    badgeVariant: "default",
    stats: { users: 50, products: 50, orders: 100 },
    config: {
      countries: 10,
      cities: 20,
      users: 50,
      products: 50,
      orders: 100,
      orderItemsPerOrder: { min: 1, max: 3 },
      dateRange: getDynamicDateRange(),
    },
  },
  {
    id: "medium",
    name: "Medium Dataset",
    description: "Good balance for practicing complex queries",
    icon: <Package className="h-5 w-5" />,
    stats: { users: 200, products: 150, orders: 500 },
    config: {
      countries: 20,
      cities: 40,
      users: 200,
      products: 150,
      orders: 500,
      orderItemsPerOrder: { min: 1, max: 5 },
      dateRange: getDynamicDateRange(),
    },
  },
  {
    id: "large",
    name: "Large Dataset",
    description: "Comprehensive dataset for advanced SQL practice",
    icon: <ShoppingCart className="h-5 w-5" />,
    badge: "Performance Test",
    badgeVariant: "secondary",
    stats: { users: 1000, products: 500, orders: 2000 },
    config: {
      countries: 30,
      cities: 100,
      users: 1000,
      products: 500,
      orders: 2000,
      orderItemsPerOrder: { min: 1, max: 8 },
      dateRange: getDynamicDateRange(),
    },
  },
  {
    id: "realistic",
    name: "Realistic E-commerce",
    description: "Real-world e-commerce data distribution",
    icon: <DatabaseIcon className="h-5 w-5" />,
    badge: "Real-world",
    badgeVariant: "outline",
    stats: { users: 500, products: 300, orders: 1500 },
    config: {
      countries: 25,
      cities: 75,
      users: 500,
      products: 300,
      orders: 1500,
      orderItemsPerOrder: { min: 1, max: 6 },
      dateRange: getDynamicDateRange(),
    },
  },
];

export function DatabaseSetupModal({
  open,
  onOpenChange,
}: DatabaseSetupModalProps) {
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfigSelect = (configId: string) => {
    setSelectedConfig(configId);
    setStatus("idle");
    setMessage("");
  };

  const handleSetupClick = () => {
    if (!selectedConfig) return;
    setShowConfirmation(true);
  };

  const handleConfirmSetup = async () => {
    if (!selectedConfig) return;

    const config = databaseConfigs.find((c) => c.id === selectedConfig);
    if (!config) return;

    setIsLoading(true);
    setShowConfirmation(false);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/database/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ config: config.config }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Database setup failed");
      }

      setStatus("success");
      setMessage(
        `Database setup completed successfully! Created ${config.stats.users} users, ${config.stats.products} products, and ${config.stats.orders} orders with realistic data.`
      );
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Database setup failed");
      console.error("Database setup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setSelectedConfig(null);
      setStatus("idle");
      setMessage("");
      setShowConfirmation(false);
      onOpenChange(false);
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
        return "";
    }
  };

  if (showConfirmation && selectedConfig) {
    const config = databaseConfigs.find((c) => c.id === selectedConfig);
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
              Confirm Database Setup
            </DialogTitle>
            <DialogDescription>
              This will delete all existing data and create a new database with
              the selected configuration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangleIcon className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Warning:</strong> All existing data will be permanently
                deleted and replaced with new sample data.
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Selected Configuration:</h4>
              <p className="text-sm text-muted-foreground mb-2">
                {config?.name} - {config?.description}
              </p>
              <div className="flex gap-4 text-sm">
                <span>{config?.stats.users} users</span>
                <span>{config?.stats.products} products</span>
                <span>{config?.stats.orders} orders</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmSetup}>
              Yes, Setup Database
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DatabaseIcon className="h-5 w-5" />
            Database Setup
          </DialogTitle>
          <DialogDescription>
            Choose a database configuration to set up your SQL playground.
            {status === "idle" && " All existing data will be replaced."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Message */}
          {message && (
            <Alert className={getStatusColor()}>
              <div className="flex items-start gap-2">
                {getStatusIcon()}
                <AlertDescription className="text-sm">
                  {message}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Configuration Options */}
          {status !== "success" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {databaseConfigs.map((config) => (
                <Card
                  key={config.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedConfig === config.id
                      ? "ring-2 ring-primary border-primary"
                      : ""
                  }`}
                  onClick={() => handleConfigSelect(config.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {config.icon}
                        <CardTitle className="text-base">
                          {config.name}
                        </CardTitle>
                      </div>
                      {config.badge && (
                        <Badge variant={config.badgeVariant || "default"}>
                          {config.badge}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {config.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-lg">
                          {config.stats.users.toLocaleString()}
                        </div>
                        <div className="text-muted-foreground">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-lg">
                          {config.stats.products.toLocaleString()}
                        </div>
                        <div className="text-muted-foreground">Products</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-lg">
                          {config.stats.orders.toLocaleString()}
                        </div>
                        <div className="text-muted-foreground">Orders</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Features Info */}
          {status === "idle" && (
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">What you'll get:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Realistic user names and unique email addresses</li>
                <li>• Dynamic product catalog with descriptions</li>
                <li>• Orders from 2 years ago to today</li>
                <li>• Proper order statuses (delivered/pending/cancelled)</li>
                <li>• Realistic delivery dates (past, present, and future)</li>
                <li>• Complete relational data with proper foreign keys</li>
              </ul>
            </div>
          )}
        </div>

        <DialogFooter>
          {status === "success" ? (
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSetupClick}
                disabled={!selectedConfig || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  "Setup Database"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
