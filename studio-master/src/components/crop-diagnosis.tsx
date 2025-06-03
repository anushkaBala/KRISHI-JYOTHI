"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cropDiagnosis as diagnoseCrop, CropDiagnosisOutput } from '@/ai/flows/crop-diagnosis';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const CropDiagnosis = () => {
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [cropType, setCropType] = useState<string>('');
  const [diagnosisReport, setDiagnosisReport] = useState<CropDiagnosisOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const videoRef = useRef<Webcam>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);

  const capture = () => {
    if (videoRef.current) {
      const capturedPhoto = videoRef.current.getScreenshot();
      if (capturedPhoto) {
        setPhotoUrl(capturedPhoto);
      }
    }
  };

  const handleDiagnosis = async () => {
    setIsLoading(true);
    try {
      if (!photoUrl || !cropType) {
        toast({
          variant: 'destructive',
          title: 'Missing Information',
          description: 'Photo URL and Crop Type are required.',
        });
        return;
      }

      const result = await diagnoseCrop({ photoUrl, cropType });
      setDiagnosisReport(result);
      toast({
        title: 'Diagnosis Complete',
        description: 'The crop diagnosis report has been generated.',
      });
    } catch (error) {
      console.error("Diagnosis failed", error);
      toast({
        variant: 'destructive',
        title: 'Diagnosis Failed',
        description: 'Failed to diagnose crop. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPhotoUrl(url);

    if (url && !validateUrl(url)) {
      toast({
        variant: 'destructive',
        title: 'Invalid URL',
        description: 'Please enter a valid photo URL.',
      });
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl">Crop Diagnosis</CardTitle>
          <CardDescription className="text-muted-foreground">Enter crop details for diagnosis.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <motion.div variants={fadeIn} className="mb-3">
            <Label htmlFor="cropType">Crop Type</Label>
            <Input
              type="text"
              id="cropType"
              placeholder="Enter Crop Type"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full"
              required
            />
          </motion.div>

          <motion.div variants={fadeIn} className="mb-3">
            <Label htmlFor="photoCapture">Capture/Upload Photo</Label>
            {hasCameraPermission ? (
              <>
                <Webcam ref={videoRef} className="w-full rounded-md aspect-video" autoPlay muted />
                <Button type="button" variant="secondary" onClick={capture} className="mt-2 w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow duration-200">Capture Photo</Button>
              </>
            ) : (
              <video ref={videoRef} className="w-full rounded-md aspect-video" autoPlay muted />
            )}

            {!hasCameraPermission && (
              <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access to use this feature.
                </AlertDescription>
              </Alert>
            )}

            {photoUrl && (
              <img src={photoUrl} alt="Captured Crop" className="w-full rounded-md mt-2" />
            )}
            {!photoUrl && (
              <>
              <Input
                type="url"
                id="photoUrl"
                placeholder="Paste Photo URL"
                value={photoUrl}
                onChange={handlePhotoUrlChange}
                className="w-full mt-2"
              />
              </>
            )}
          </motion.div>

          <motion.div variants={fadeIn}>
            <Button onClick={handleDiagnosis} disabled={isLoading} className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
              {isLoading ? "Diagnosing..." : "Diagnose Crop"}
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {diagnosisReport && (
        <motion.div
          className="mt-4"
          variants={fadeIn}
        >
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Diagnosis Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <h4 className="text-lg font-semibold">Issues:</h4>
                {diagnosisReport.diagnosisReport.issues.length > 0 ? (
                  <ul>
                    {diagnosisReport.diagnosisReport.issues.map((issue, index) => (
                      <li key={index} className="list-disc ml-5">{issue}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No issues found.</p>
                )}
              </div>

              <div>
                <h4 className="text-lg font-semibold">Solutions:</h4>
                {diagnosisReport.diagnosisReport.solutions.length > 0 ? (
                  <ul>
                    {diagnosisReport.diagnosisReport.solutions.map((solution, index) => (
                      <li key={index}  className="list-disc ml-5">{solution}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No solutions available.</p>
                )}
              </div>

              <div>
                <h4 className="text-lg font-semibold">Tips:</h4>
                {diagnosisReport.diagnosisReport.tips.length > 0 ? (
                  <ul>
                    {diagnosisReport.diagnosisReport.tips.map((tip, index) => (
                      <li key={index}  className="list-disc ml-5">{tip}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No tips available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};
