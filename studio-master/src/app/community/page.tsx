"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CommunityForumPage = () => {
  useEffect(() => {
    document.body.classList.add('bg-background');
    return () => {
      document.body.classList.remove('bg-background');
    };
  }, []);

  const [questions, setQuestions] = useState([
    { id: 1, author: 'Ramesh', question: 'What is the best fertilizer for wheat?', answers: ['Use nitrogen-rich fertilizer.'], avatar: 'RK' },
    { id: 2, author: 'Priya', question: 'How to prevent pests in rice crops?', answers: ['Use organic pesticides.','Use organic pesticides.','Use organic pesticides.'], avatar: 'PS' },
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  const handlePostQuestion = () => {
    if (newQuestion.trim() !== '') {
      const newQuestionObj = {
        id: questions.length + 1,
        author: 'You',
        question: newQuestion,
        answers: [],
        avatar: 'U'
      };
      setQuestions([...questions, newQuestionObj]);
      setNewQuestion('');
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
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Community Forum</h1>
        <p className="text-sm md:text-base text-muted-foreground">Ask questions and connect with other farmers.</p>
      </header>

      <Card className="w-full max-w-2xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="flex flex-col space-y-4">
          <motion.div variants={fadeIn} className="mb-3">
            <Textarea
              placeholder="Ask a question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full"
            />
            <Button onClick={handlePostQuestion} className="mt-2 shadow-sm hover:shadow-md transition-shadow duration-200">Post Question</Button>
          </motion.div>

          {questions.map((question) => (
            <motion.div
              key={question.id}
              className="p-4 mb-4 bg-secondary rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
              variants={fadeIn}
            >
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${question.author}`} />
                  <AvatarFallback>{question.avatar}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-lg font-semibold">{question.question}</h4>
                <p className="text-sm text-muted-foreground">Asked by: {question.author}</p>
              </div>
            </div>
              <div className="mt-2">
                {question.answers.length > 0 ? (
                  question.answers.map((answer, index) => (
                    <p key={index} className="text-sm ml-4">
                      Answer: {answer}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No answers yet.</p>
                )}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommunityForumPage;
