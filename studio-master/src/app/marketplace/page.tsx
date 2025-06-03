"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const MarketplacePage = () => {
  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const handleAddToCart = (listing) => {
    setCart([...cart, listing]);
    toast({
      title: 'Added to Cart',
      description: `${listing.crop} has been added to your cart.`,
    });
  };

  // Dummy data for marketplace listings
    const listings = [
        { id: 1, crop: 'Tomato', quantity: '100 kg', price: 25, farmer: 'Ramesh Kumar', image: 'https://picsum.photos/id/201/400/250' },
        { id: 2, crop: 'Potato', quantity: '500 kg', price: 15, farmer: 'Priya Sharma', image: 'https://picsum.photos/id/202/400/250' },
        { id: 3, crop: 'Onion', quantity: '750 kg', price: 20, farmer: 'Rajesh Patel', image: 'https://picsum.photos/id/203/400/250' },
        { id: 4, crop: 'Okra (Bhindi)', quantity: '300 kg', price: 30, farmer: 'Anita Devi', image: 'https://picsum.photos/id/204/400/250' },
        { id: 5, crop: 'Brinjal (Eggplant)', quantity: '400 kg', price: 28, farmer: 'Suresh Verma', image: 'https://picsum.photos/id/205/400/250' },
        { id: 6, crop: 'Cauliflower', quantity: '250 kg', price: 40, farmer: 'Geeta Yadav', image: 'https://picsum.photos/id/206/400/250' },
        { id: 7, crop: 'Cabbage', quantity: '350 kg', price: 35, farmer: 'Mohan Singh', image: 'https://picsum.photos/id/207/400/250' },
        { id: 8, crop: 'Green Chili', quantity: '150 kg', price: 60, farmer: 'Lakshmi Pillai', image: 'https://picsum.photos/id/208/400/250' },
        { id: 9, crop: 'Spinach (Palak)', quantity: '200 kg', price: 45, farmer: 'Rajni Gupta', image: 'https://picsum.photos/id/209/400/250' },
        { id: 10, crop: 'Bitter Gourd (Karela)', quantity: '180 kg', price: 50, farmer: 'Arvind Mehra', image: 'https://picsum.photos/id/210/400/250' },
        { id: 11, crop: 'Carrot', quantity: '450 kg', price: 22, farmer: 'Divya Nair', image: 'https://picsum.photos/id/211/400/250' },
        { id: 12, crop: 'Radish (Mooli)', quantity: '220 kg', price: 18, farmer: 'Karan Singh', image: 'https://picsum.photos/id/212/400/250' },
        { id: 13, crop: 'Beetroot', quantity: '380 kg', price: 33, farmer: 'Sneha Reddy', image: 'https://picsum.photos/id/213/400/250' },
        { id: 14, crop: 'Peas (Matar)', quantity: '190 kg', price: 55, farmer: 'Vivek Joshi', image: 'https://picsum.photos/id/214/400/250' },
        { id: 15, crop: 'Garlic', quantity: '120 kg', price: 70, farmer: 'Meena Kumari', image: 'https://picsum.photos/id/215/400/250' },
        { id: 16, crop: 'Ginger', quantity: '160 kg', price: 65, farmer: 'Harish Verma', image: 'https://picsum.photos/id/216/400/250' },
        { id: 17, crop: 'Lemon', quantity: '280 kg', price: 8, farmer: 'Shalini Gupta', image: 'https://picsum.photos/id/217/400/250' },
        { id: 18, crop: 'Capsicum (Shimla Mirch)', quantity: '320 kg', price: 42, farmer: 'Ravi Kumar', image: 'https://picsum.photos/id/218/400/250' },
        { id: 19, crop: 'Cucumber (Kheera)', quantity: '410 kg', price: 27, farmer: 'Anjali Patel', image: 'https://picsum.photos/id/219/400/250' },
        { id: 20, crop: 'Pumpkin (Kaddu)', quantity: '550 kg', price: 12, farmer: 'Deepak Yadav', image: 'https://picsum.photos/id/220/400/250' },
        { id: 21, crop: 'Bottle Gourd (Lauki)', quantity: '390 kg', price: 19, farmer: 'Kavita Sharma', image: 'https://picsum.photos/id/221/400/250' },
        { id: 22, crop: 'Ridge Gourd (Turai)', quantity: '270 kg', price: 38, farmer: 'Manish Jain', image: 'https://picsum.photos/id/222/400/250' },
        { id: 23, crop: 'Pointed Gourd (Parwal)', quantity: '140 kg', price: 58, farmer: 'Seema Kapoor', image: 'https://picsum.photos/id/223/400/250' },
        { id: 24, crop: 'Drumstick (Sahjan)', quantity: '210 kg', price: 48, farmer: 'Amit Verma', image: 'https://picsum.photos/id/224/400/250' },
        { id: 25, crop: 'Colocasia (Arbi)', quantity: '330 kg', price: 32, farmer: 'Pooja Reddy', image: 'https://picsum.photos/id/225/400/250' },
        { id: 26, crop: 'Sweet Potato (Shakarkandi)', quantity: '420 kg', price: 26, farmer: 'Vikram Singh', image: 'https://picsum.photos/id/226/400/250' },
        { id: 27, crop: 'Yam (Jimikand)', quantity: '290 kg', price: 44, farmer: 'Neha Joshi', image: 'https://picsum.photos/id/227/400/250' },
        { id: 28, crop: 'Tinda (Round Gourd)', quantity: '170 kg', price: 52, farmer: 'Rajeev Patel', image: 'https://picsum.photos/id/228/400/250' },
        { id: 29, crop: 'Kundru (Ivy Gourd)', quantity: '230 kg', price: 46, farmer: 'Sunita Devi', image: 'https://picsum.photos/id/229/400/250' },
        { id: 30, crop: 'Plantain (Kela)', quantity: '360 kg', price: 24, farmer: 'Manoj Kumar', image: 'https://picsum.photos/id/230/400/250' },
    ];

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Marketplace</h1>
        <p className="text-sm md:text-base text-muted-foreground">Connect directly with farmers and buy at root price.</p>
        <Link href="/cart" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 mt-4">
          View Cart ({cart.length})
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {listings.map((listing) => (
          <motion.div
            key={listing.id}
            className="transition-transform duration-300 transform hover:scale-105"
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={listing.image}
                alt={listing.crop}
                className="aspect-video object-cover rounded-t-md"
                style={{ height: '200px' }}
              />
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{listing.crop}</CardTitle>
                <CardDescription className="text-muted-foreground">Farmer: {listing.farmer}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-between p-4">
                <div>
                  <p className="text-muted-foreground">Quantity: {listing.quantity}</p>
                  <p className="text-muted-foreground">Price: {formatCurrency(listing.price)}/kg</p>
                </div>
                <Button onClick={() => handleAddToCart(listing)} className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:bg-primary/80 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MarketplacePage;
