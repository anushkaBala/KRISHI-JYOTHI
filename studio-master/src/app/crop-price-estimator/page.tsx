"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CropPriceEstimatorPage = () => {
  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  const [cropType, setCropType] = useState('');
  const [productionRate, setProductionRate] = useState('');
  const [demandRate, setDemandRate] = useState('');
  const [place, setPlace] = useState('');
  const [spoilageRate, setSpoilageRate] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEstimatePrice = async () => {
    setIsLoading(true);
    try {
      // Validate inputs
      if (!cropType || !productionRate || !demandRate || !place || !spoilageRate) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all fields to get an estimate."
        });
        setIsLoading(false);
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Base price per unit (made it dynamic based on user input)
      const basePrice = 50;
      // Influence of production rate
      const productionInfluence = parseFloat(productionRate) * 0.1;
      // Influence of demand rate
      let demandInfluence = 0;
        switch (demandRate) {
            case "high":
                demandInfluence = 0.3;
                break;
            case "preferred":
                demandInfluence = 0.2;
                break;
            case "okay":
                demandInfluence = 0.1;
                break;
            case "low":
                demandInfluence = 0.05;
                break;
            default:
                demandInfluence = 0;
                break;
        }

      // Influence of spoilage rate
      const spoilageInfluence = parseFloat(spoilageRate) * 0.05;
      //Influence of place
      //const placeInfluence = parseFloat(place)*0.1;


      // Calculate estimated price
      const calculatedPrice = basePrice + productionInfluence - spoilageInfluence + demandInfluence;

      setEstimatedPrice(calculatedPrice);
    } catch (error) {
      console.error("Error estimating price:", error);
      toast({
        variant: "destructive",
        title: "Estimation Error",
        description: "Failed to estimate price. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Crop Price Estimator</h1>
        <p className="text-sm md:text-base text-muted-foreground">Estimate the price of your crop using AI.</p>
      </header>

      <Card className="w-full max-w-md mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Estimate Crop Price</CardTitle>
          <CardDescription className="text-muted-foreground">Enter the details below to get an estimate.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <motion.div variants={fadeIn}>
            <Label htmlFor="cropType">Crop Type</Label>
            <Input
              type="text"
              id="cropType"
              placeholder="Crop Type"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full"
              required
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <Label htmlFor="productionRate">Production Rate (units/acre)</Label>
            <Input
              type="number"
              id="productionRate"
              placeholder="Production Rate (units/acre)"
              value={productionRate}
              onChange={(e) => setProductionRate(e.target.value)}
              className="w-full"
              required
            />
          </motion.div>
          <motion.div variants={fadeIn}>
          <Label htmlFor="demandRate">Demand Rate</Label>
            <Select onValueChange={setDemandRate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select demand rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="preferred">Preferred</SelectItem>
                <SelectItem value="okay">Okay</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Label htmlFor="place">Place</Label>
            <Input
              type="text"
              id="place"
              placeholder="Place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full"
              required
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <Label htmlFor="spoilageRate">Spoilage Rate (%)</Label>
            <Input
              type="number"
              id="spoilageRate"
              placeholder="Spoilage Rate (%)"
              value={spoilageRate}
              onChange={(e) => setSpoilageRate(e.target.value)}
              className="w-full"
              required
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <Button onClick={handleEstimatePrice} disabled={isLoading} className="w-full shadow-md hover:shadow-lg transition-shadow duration-300">
              {isLoading ? "Estimating..." : "Estimate Price"}
            </Button>
          </motion.div>

          {estimatedPrice !== null && (
            <motion.div
              className="mt-4 p-4 rounded-md bg-secondary text-secondary-foreground shadow-md"
              variants={fadeIn}
            >
              <h4 className="text-lg font-semibold">Estimated Price:</h4>
              <p>{formatCurrency(estimatedPrice)} per unit</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CropPriceEstimatorPage;
