"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useEffect } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ConfirmationPage = () => {
    useEffect(() => {
        document.body.classList.add('bg-background');
        return () => {
            document.body.classList.remove('bg-background');
        };
    }, []);

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Order Confirmation</h1>
        <p className="text-sm md:text-base text-muted-foreground">Thank you for your order! Your payment has been confirmed.</p>
      </header>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg">Your order has been successfully placed and is being processed.</p>
          <p className="text-muted-foreground mt-4">You will receive an email with tracking information once your order has shipped.</p>
          <Link href="/" passHref>
            <Button className="mt-6">Back to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConfirmationPage;
