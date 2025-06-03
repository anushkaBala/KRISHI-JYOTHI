"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CheckoutPage = () => {
    const { toast } = useToast();
  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  const [paymentMethod, setPaymentMethod] = useState<string | undefined>('cash');
  const [upiId, setUpiId] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (paymentMethod === 'upi' && !upiId) {
        toast({
            variant: "destructive",
            title: "UPI ID Required",
            description: "Please enter your UPI ID."
        });
      return;
    }
    console.log('Payment Method:', paymentMethod);
    console.log('UPI ID:', upiId);
  };

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Checkout</h1>
        <p className="text-sm md:text-base text-muted-foreground">Enter your address and payment details to complete your order.</p>
      </header>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Delivery Address</CardTitle>
          <CardDescription className="text-muted-foreground">Enter your shipping address:</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" placeholder="123 Main St" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input type="text" id="city" placeholder="Anytown" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input type="text" id="state" placeholder="State" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip">Zip Code</Label>
              <Input type="text" id="zip" placeholder="12345" required />
            </div>

            <h2 className="text-xl font-semibold mt-6">Payment Details</h2>
            <div className="grid gap-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === 'upi' && (
              <div className="grid gap-2">
                <Label htmlFor="upi">UPI ID</Label>
                <Input
                  type="text"
                  id="upi"
                  placeholder="yourupi@example"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required={paymentMethod === 'upi'}
                />
              </div>
            )}

            <Button className="mt-6 w-full">
              <Link href="/confirmation" passHref>Confirm Payment</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CheckoutPage;
