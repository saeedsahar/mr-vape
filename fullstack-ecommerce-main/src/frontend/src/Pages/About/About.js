import React from 'react';
import { Container, Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { styled } from '@mui/system';

// Custom styled components using MUI system
const Header = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#2e3b55',
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  textTransform: 'uppercase',
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: '#1c2d47',
}));

const CardStyled = styled(Card)(({ theme }) => ({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: '0.3s ease',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const CardMediaStyled = styled(CardMedia)({
  height: '200px',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
});

const CardContentStyled = styled(CardContent)({
  padding: '16px',
});

const ProductList = styled('ul')({
  paddingLeft: '24px',
  marginBottom: '24px',
});

const ButtonStyled = styled(Button)({
  backgroundColor: '#ff6600',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e65c00',
  },
});

const Footer = styled(Box)({
  backgroundColor: '#1c2d47',
  color: '#fff',
  padding: '24px',
  textAlign: 'center',
  marginTop: '40px',
});

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {/* Section 1: Introduction */}
      <Box sx={{ mb: 5 }}>
        <Header variant="h3">Welcome to Vape Planet</Header>
        <Typography variant="body1" paragraph>
          At <strong>Vape Planet</strong>, we pride ourselves on offering premium vaping products, e-cigarettes, and a wide variety of unique flavors. Whether you're an enthusiast or a beginner, we have everything you need to enhance your vaping experience. With branches and stores around the globe, we cater to a wide customer base with exceptional service and global shipping.
        </Typography>
      </Box>

      {/* Section 2: Global Presence */}
      <Box sx={{ mb: 5 }}>
        <SectionHeader variant="h4">Our Global Presence</SectionHeader>
        <Typography variant="body1" paragraph>
          From our headquarters to local branches, we have established a presence in major cities around the world. With stores and delivery services in over 50 countries, our commitment to providing top-quality vaping products is second to none. Wherever you are, <strong>Vape Planet</strong> ensures quick and reliable shipments.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <CardStyled>
              <CardMediaStyled
                component="div"
                style={{ backgroundImage: 'url(https://via.placeholder.com/300)' }}
                alt="Vape Planet Store London"
              />
              <CardContentStyled>
                <Typography variant="h6" gutterBottom>
                  London, UK
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  One of our largest international hubs, offering a wide selection of products and services for the European market.
                </Typography>
                <ButtonStyled variant="contained">Visit Store</ButtonStyled>
              </CardContentStyled>
            </CardStyled>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardStyled>
              <CardMediaStyled
                component="div"
                style={{ backgroundImage: 'url(https://via.placeholder.com/300)' }}
                alt="Vape Planet Store New York"
              />
              <CardContentStyled>
                <Typography variant="h6" gutterBottom>
                  New York, USA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our flagship store in the United States, providing fast shipping nationwide and an exclusive range of flavors.
                </Typography>
                <ButtonStyled variant="contained">Visit Store</ButtonStyled>
              </CardContentStyled>
            </CardStyled>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardStyled>
              <CardMediaStyled
                component="div"
                style={{ backgroundImage: 'url(https://via.placeholder.com/300)' }}
                alt="Vape Planet Store Sydney"
              />
              <CardContentStyled>
                <Typography variant="h6" gutterBottom>
                  Sydney, Australia
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serving the Oceanic region with the latest vaping technology and fast, efficient shipping to our loyal customers.
                </Typography>
                <ButtonStyled variant="contained">Visit Store</ButtonStyled>
              </CardContentStyled>
            </CardStyled>
          </Grid>
        </Grid>
      </Box>

      {/* Section 3: Products and Offerings */}
      <Box sx={{ mb: 5 }}>
        <SectionHeader variant="h4">Our Products</SectionHeader>
        <Typography variant="body1" paragraph>
          We offer a diverse range of vaping products, including:
        </Typography>
        <ProductList>
          <li>High-quality vapes and e-cigarettes</li>
          <li>Exclusive and rare flavors</li>
          <li>Vape accessories and customization options</li>
          <li>Refillable pods and disposable e-cigarettes</li>
        </ProductList>
      </Box>

      {/* Section 4: Shipping and Customer Service */}
      <Box>
        <SectionHeader variant="h4">Shipping and Customer Service</SectionHeader>
        <Typography variant="body1" paragraph>
          No matter where you are in the world, <strong>Vape Planet</strong> ensures fast and reliable shipping. Our global distribution centers allow us to deliver orders swiftly, and our customer service team is available 24/7 to assist with any questions or concerns.
        </Typography>
      </Box>

      {/* Footer Section */}
      <Footer>
        <Typography variant="body1">© 2025 Vape Planet - All rights reserved</Typography>
      </Footer>
    </Container>
  );
};

export default About;
