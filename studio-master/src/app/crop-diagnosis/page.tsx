"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CropDiagnosisPage() {
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
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Crop Doctor</h1>
        <p className="text-sm md:text-base text-muted-foreground">Upload an image of your crop for issue detection and solutions.</p>
      </header>

      <Card className="w-full max-w-md mx-auto">
        <CardContent>
          <motion.div
             variants={fadeIn}
          >
             <CropDiagnosisComponent />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import { CropDiagnosis as CropDiagnosisComponent } from "@/components/crop-diagnosis";
