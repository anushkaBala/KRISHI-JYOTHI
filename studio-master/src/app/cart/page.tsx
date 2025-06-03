"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CartPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    updateCart(updatedCart);
    toast({
      title: "Item Removed",
      description: "Item removed from your cart."
    });
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Shopping Cart</h1>
        <p className="text-sm md:text-base text-muted-foreground">Review your selected items before proceeding to checkout.</p>
      </header>

      {cartItems.length > 0 ? (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2 md:space-x-4">
                  <img src={item.image} alt={item.crop} className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md" />
                  <div>
                    <h3 className="text-sm md:text-lg font-semibold">{item.crop}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                  </div>
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
          <div className="flex flex-col space-y-2 p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-base md:text-xl font-semibold">Total:</h4>
              <p className="text-base md:text-xl">{formatCurrency(totalPrice)}</p>
            </div>
            <Link href="/checkout" className="w-full">
              <Button className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Alert className="max-w-lg mx-auto">
            <AlertDescription className="text-center">Your cart is empty. <Link href="/marketplace" className="text-primary underline">Continue shopping</Link></AlertDescription>
        </Alert>
      )}
    </motion.div>
  );
};

export default CartPage;
