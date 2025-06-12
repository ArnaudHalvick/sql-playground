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
  Settings,
  Bug,
} from "lucide-react";
import { Badge } from "@/components/ui/feedback/badge";
import { Switch } from "@/components/ui/forms/switch";
import { Slider } from "@/components/ui/forms/slider";
import { Label } from "@/components/ui/forms/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";

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

interface DatabaseSize {
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
  };
}

interface ErrorConfig {
  enabled: boolean;
  emailErrors: number;
  deliveryErrors: number;
  pricingErrors: number;
  locationErrors: number;
  quantityErrors: number;
}

const databaseSizes: DatabaseSize[] = [
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
    },
  },
];

export function DatabaseSetupModal({
  open,
  onOpenChange,
}: DatabaseSetupModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("small");
  const [errorConfig, setErrorConfig] = useState<ErrorConfig>({
    enabled: false,
    emailErrors: 10,
    deliveryErrors: 8,
    pricingErrors: 5,
    locationErrors: 7,
    quantityErrors: 3,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
    setStatus("idle");
    setMessage("");
  };

  const handleErrorToggle = (enabled: boolean) => {
    setErrorConfig((prev) => ({ ...prev, enabled }));
  };

  const handleErrorSliderChange = (
    errorType: keyof Omit<ErrorConfig, "enabled">,
    value: number[]
  ) => {
    setErrorConfig((prev) => ({ ...prev, [errorType]: value[0] }));
  };

  const handleSetupClick = () => {
    if (!selectedSize) return;
    setShowConfirmation(true);
  };

  const handleConfirmSetup = async () => {
    if (!selectedSize) return;

    const sizeConfig = databaseSizes.find((s) => s.id === selectedSize);
    if (!sizeConfig) return;

    setIsLoading(true);
    setShowConfirmation(false);
    setStatus("idle");
    setMessage("");

    try {
      const finalConfig = {
        ...sizeConfig.config,
        dateRange: getDynamicDateRange(),
        errorConfig: errorConfig.enabled
          ? errorConfig
          : {
              enabled: false,
              emailErrors: 0,
              deliveryErrors: 0,
              pricingErrors: 0,
              locationErrors: 0,
              quantityErrors: 0,
            },
      };

      const response = await fetch("/api/database/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ config: finalConfig }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Database setup failed");
      }

      const errorSummary = errorConfig.enabled
        ? ` with data quality challenges (${errorConfig.emailErrors}% email errors, ${errorConfig.deliveryErrors}% delivery errors, etc.)`
        : " with clean data";

      setStatus("success");
      setMessage(
        `Database setup completed successfully! Created ${sizeConfig.stats.users} users, ${sizeConfig.stats.products} products, and ${sizeConfig.stats.orders} orders${errorSummary}.`
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
      setSelectedSize("small");
      setErrorConfig({
        enabled: false,
        emailErrors: 10,
        deliveryErrors: 8,
        pricingErrors: 5,
        locationErrors: 7,
        quantityErrors: 3,
      });
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

  const selectedSizeConfig = databaseSizes.find((s) => s.id === selectedSize);

  if (showConfirmation && selectedSizeConfig) {
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

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <h4 className="font-medium">Configuration Summary:</h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Size:</strong> {selectedSizeConfig.name} -{" "}
                  {selectedSizeConfig.description}
                </p>
                <div className="flex gap-4">
                  <span>{selectedSizeConfig.stats.users} users</span>
                  <span>{selectedSizeConfig.stats.products} products</span>
                  <span>{selectedSizeConfig.stats.orders} orders</span>
                </div>
                {errorConfig.enabled ? (
                  <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-200">
                    <p className="font-medium text-amber-800 mb-1">
                      Data Quality Challenges Enabled:
                    </p>
                    <div className="text-xs text-amber-700 space-y-1">
                      <div>• Email errors: {errorConfig.emailErrors}%</div>
                      <div>
                        • Delivery errors: {errorConfig.deliveryErrors}%
                      </div>
                      <div>• Pricing errors: {errorConfig.pricingErrors}%</div>
                      <div>
                        • Location errors: {errorConfig.locationErrors}%
                      </div>
                      <div>
                        • Quantity errors: {errorConfig.quantityErrors}%
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-green-700 bg-green-50 p-2 rounded border border-green-200">
                    ✓ Clean data (no intentional errors)
                  </p>
                )}
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
      <DialogContent className="w-[50vw] h-[85vh] max-w-none max-h-none overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <DatabaseIcon className="h-5 w-5" />
            Database Setup
          </DialogTitle>
          <DialogDescription>
            Choose your database size and configure data quality challenges.
            {status === "idle" && " All existing data will be replaced."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
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

          {/* Main Configuration */}
          {status !== "success" && (
            <Tabs defaultValue="size" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="size" className="flex gap-2 items-center">
                  <Settings className="h-4 w-4" />
                  Database Size
                </TabsTrigger>
                <TabsTrigger value="errors" className="flex gap-2 items-center">
                  <Bug className="h-4 w-4" />
                  Data Quality
                </TabsTrigger>
              </TabsList>

              <TabsContent value="size" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {databaseSizes.map((size) => (
                    <Card
                      key={size.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedSize === size.id
                          ? "ring-2 ring-primary border-primary"
                          : ""
                      }`}
                      onClick={() => handleSizeSelect(size.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {size.icon}
                            <CardTitle className="text-base">
                              {size.name}
                            </CardTitle>
                          </div>
                          {size.badge && (
                            <Badge variant={size.badgeVariant || "default"}>
                              {size.badge}
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">
                          {size.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center">
                            <div className="font-medium text-lg">
                              {size.stats.users.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">Users</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-lg">
                              {size.stats.products.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">
                              Products
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-lg">
                              {size.stats.orders.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">Orders</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="errors" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Data Quality Challenges
                        </CardTitle>
                        <CardDescription>
                          Add intentional data quality issues to practice
                          validation and cleaning queries
                        </CardDescription>
                      </div>
                      <Switch
                        checked={errorConfig.enabled}
                        onCheckedChange={handleErrorToggle}
                      />
                    </div>
                  </CardHeader>

                  {errorConfig.enabled && (
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Email Validation Issues: {errorConfig.emailErrors}%
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Missing @ symbols, invalid domains, formatting
                            errors
                          </p>
                          <Slider
                            value={[errorConfig.emailErrors]}
                            onValueChange={(value: number[]) =>
                              handleErrorSliderChange("emailErrors", value)
                            }
                            max={50}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Delivery Date Issues: {errorConfig.deliveryErrors}%
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Missing delivery dates, status inconsistencies
                          </p>
                          <Slider
                            value={[errorConfig.deliveryErrors]}
                            onValueChange={(value: number[]) =>
                              handleErrorSliderChange("deliveryErrors", value)
                            }
                            max={50}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Pricing Anomalies: {errorConfig.pricingErrors}%
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Negative prices, zero values, excessive amounts
                          </p>
                          <Slider
                            value={[errorConfig.pricingErrors]}
                            onValueChange={(value: number[]) =>
                              handleErrorSliderChange("pricingErrors", value)
                            }
                            max={50}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Location Mismatches: {errorConfig.locationErrors}%
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            City-country relationship errors
                          </p>
                          <Slider
                            value={[errorConfig.locationErrors]}
                            onValueChange={(value: number[]) =>
                              handleErrorSliderChange("locationErrors", value)
                            }
                            max={50}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Quantity Issues: {errorConfig.quantityErrors}%
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Zero or negative quantities in orders
                          </p>
                          <Slider
                            value={[errorConfig.quantityErrors]}
                            onValueChange={(value: number[]) =>
                              handleErrorSliderChange("quantityErrors", value)
                            }
                            max={50}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                        <p className="text-sm text-amber-800">
                          <strong>Tip:</strong> Start with low percentages
                          (5-10%) to get familiar with data quality patterns,
                          then increase as you become more comfortable with
                          validation queries.
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
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
                {errorConfig.enabled && (
                  <li className="text-amber-600 font-medium">
                    • Configurable data quality issues for advanced practice
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0 mt-6">
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
                disabled={!selectedSize || isLoading}
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
