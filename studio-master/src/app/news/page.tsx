"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function NewsPage() {
  const news = [
    {
      title: 'New Irrigation Techniques Boost Crop Yields',
      description: 'Innovative irrigation methods are showing promising results in increasing crop production.',
      url: 'https://example.com/news1',
      imageUrl: 'https://picsum.photos/id/201/400/250',
      source: 'AgriNews Today',
      publishedAt: '2024-01-26T10:00:00Z',
    },
    {
      title: 'Government Announces New Subsidies for Farmers',
      description: 'The government has unveiled a new subsidy program to support farmers and promote sustainable agriculture.',
      url: 'https://example.com/news2',
      imageUrl: 'https://picsum.photos/id/202/400/250',
      source: 'Farm Policy Updates',
      publishedAt: '2024-01-25T15:30:00Z',
    },
    {
      title: 'Drought-Resistant Crops Gaining Popularity',
      description: 'Farmers are increasingly adopting drought-resistant crops to combat water scarcity.',
      url: 'https://example.com/news3',
      imageUrl: 'https://picsum.photos/id/203/400/250',
      source: 'Agricultural Innovations',
      publishedAt: '2024-01-24T08:45:00Z',
    },
    {
      title: 'Organic Farming Practices on the Rise',
      description: 'More farmers are transitioning to organic farming methods to meet consumer demand for healthier food.',
      url: 'https://example.com/news4',
      imageUrl: 'https://picsum.photos/id/204/400/250',
      source: 'Organic Agriculture News',
      publishedAt: '2024-01-23T16:20:00Z',
    },
    {
      title: 'Precision Agriculture Technologies Transforming Farming',
      description: 'Advanced technologies like drones and sensors are revolutionizing farming practices.',
      url: 'https://example.com/news5',
      imageUrl: 'https://picsum.photos/id/205/400/250',
      source: 'Farm Tech Daily',
      publishedAt: '2024-01-22T12:00:00Z',
    },
    {
      title: 'New Pest Control Methods Approved for Use',
      description: 'Regulatory bodies have approved new and safer pest control solutions for various crops.',
      url: 'https://example.com/news6',
      imageUrl: 'https://picsum.photos/id/206/400/250',
      source: 'Crop Protection Insights',
      publishedAt: '2024-01-21T09:15:00Z',
    },
    {
      title: 'Climate Change Impacting Planting Seasons',
      description: 'Shifting weather patterns are causing changes in traditional planting seasons, affecting crop yields.',
      url: 'https://example.com/news7',
      imageUrl: 'https://picsum.photos/id/207/400/250',
      source: 'Environmental Agriculture News',
      publishedAt: '2024-01-20T14:50:00Z',
    },
    {
      title: 'Sustainable Farming Grants Available for Farmers',
      description: 'A new grant program offers financial assistance to farmers implementing sustainable farming practices.',
      url: 'https://example.com/news8',
      imageUrl: 'https://picsum.photos/id/208/400/250',
      source: 'Sustainable Agriculture Forum',
      publishedAt: '2024-01-19T11:30:00Z',
    },
    {
      title: 'Agricultural Exports See Record Growth',
      description: 'The country\'s agricultural exports have reached unprecedented levels, boosting the economy.',
      url: 'https://example.com/news9',
      imageUrl: 'https://picsum.photos/id/209/400/250',
      source: 'Agricultural Trade Journal',
      publishedAt: '2024-01-18T17:00:00Z',
    },
    {
      title: 'Innovative Crop Insurance Policies Launched',
      description: 'New insurance policies are designed to protect farmers against crop losses due to unforeseen events.',
      url: 'https://example.com/news10',
      imageUrl: 'https://picsum.photos/id/210/400/250',
      source: 'Farm Insurance Updates',
      publishedAt: '2024-01-17T08:00:00Z',
    },
    {
      title: 'Agricultural Land Prices Continue to Rise',
      description: 'The value of agricultural land is steadily increasing, reflecting the growing demand for food production.',
      url: 'https://example.com/news11',
      imageUrl: 'https://picsum.photos/id/211/400/250',
      source: 'Land Market Analysis',
      publishedAt: '2024-01-16T13:40:00Z',
    },
    {
      title: 'New Study on Soil Health and Crop Productivity',
      description: 'A recent study highlights the importance of soil health for maximizing crop yields and ensuring food security.',
      url: 'https://example.com/news12',
      imageUrl: 'https://picsum.photos/id/212/400/250',
      source: 'Soil Science Research',
      publishedAt: '2024-01-15T10:20:00Z',
    },
    {
      title: 'Farmers Embrace Vertical Farming Techniques',
      description: 'Vertical farming is gaining traction as a sustainable solution for urban agriculture and increased crop production.',
      url: 'https://example.com/news13',
      imageUrl: 'https://picsum.photos/id/213/400/250',
      source: 'Urban Farming Innovations',
      publishedAt: '2024-01-14T15:55:00Z',
    },
    {
      title: 'AI-Powered Farm Management Tools Launched',
      description: 'New AI-powered tools are helping farmers optimize resource usage and improve decision-making.',
      url: 'https://example.com/news14',
      imageUrl: 'https://picsum.photos/id/214/400/250',
      source: 'Farm Tech Solutions',
      publishedAt: '2024-01-13T09:00:00Z',
    },
    {
      title: 'Government Invests in Agricultural Research',
      description: 'The government is increasing funding for agricultural research to drive innovation and improve farming practices.',
      url: 'https://example.com/news15',
      imageUrl: 'https://picsum.photos/id/215/400/250',
      source: 'Agricultural Policy News',
      publishedAt: '2024-01-12T16:30:00Z',
    },
  ];

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">Flash News</h1>
        <p className="text-sm md:text-base text-muted-foreground">Real-time agricultural news updates.</p>
      </header>

      {news.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 list-none">
          {news.map((article, index) => (
            <motion.li
              key={index}
              className="mb-3"
              variants={fadeIn}
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="aspect-video object-cover rounded-t-md"
                    style={{ height: '200px' }}
                  />
                )}
                <CardContent className="p-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none hover:underline"
                  >
                    <h3 className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200">{article.title}</h3>
                  </a>
                  <p className="text-muted-foreground mt-2">{article.description}</p>
                  <p className="text-sm text-muted-foreground mt-3">
                    Source: {article.source} - Published on: {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                  </p>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-center lead text-muted-foreground">Loading news...</p>
      )}
    </motion.div>
  );
}
