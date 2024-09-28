import React from 'react';
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Section 1: Introduction */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Mr. Vape
        </Typography>
        <Typography variant="body1" paragraph>
          At <strong>Mr. Vape</strong>, we pride ourselves on offering premium vaping products, e-cigarettes, and a wide variety of unique flavors. Whether you're an enthusiast or a beginner, we have everything you need to enhance your vaping experience. With branches and stores around the globe, we cater to a wide customer base with exceptional service and global shipping.
        </Typography>
      </Box>

      {/* Section 2: Global Presence */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Our Global Presence
        </Typography>
        <Typography variant="body1" paragraph>
          From our headquarters to local branches, we have established a presence in major cities around the world. With stores and delivery services in over 50 countries, our commitment to providing top-quality vaping products is second to none. Wherever you are, <strong>Mr. Vape</strong> ensures quick and reliable shipments.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300"
                alt="Mr. Vape Store"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  London, UK
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  One of our largest international hubs, offering a wide selection of products and services for the European market.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300"
                alt="Mr. Vape Store"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  New York, USA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our flagship store in the United States, providing fast shipping nationwide and an exclusive range of flavors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300"
                alt="Mr. Vape Store"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sydney, Australia
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serving the Oceanic region with the latest vaping technology and fast, efficient shipping to our loyal customers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Section 3: Products and Offerings */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Our Products
        </Typography>
        <Typography variant="body1" paragraph>
          We offer a diverse range of vaping products, including:
        </Typography>
        <ul>
          <li>High-quality vapes and e-cigarettes</li>
          <li>Exclusive and rare flavors</li>
          <li>Vape accessories and customization options</li>
          <li>Refillable pods and disposable e-cigarettes</li>
        </ul>
      </Box>

      {/* Section 4: Shipping and Customer Service */}
      <Box>
        <Typography variant="h4" gutterBottom>
          Shipping and Customer Service
        </Typography>
        <Typography variant="body1" paragraph>
          No matter where you are in the world, <strong>Mr. Vape</strong> ensures fast and reliable shipping. Our global distribution centers allow us to deliver orders swiftly, and our customer service team is available 24/7 to assist with any questions or concerns.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
