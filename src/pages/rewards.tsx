import React from 'react';
import { Card, Typography, Divider, Grid, Box } from '@mui/material';

const RewardsTerms: React.FC = () => {

    const restaurantData = [
        {
            name: "Sanremo Bath",
            description: "Sanremo Bath offers a delightful blend of traditional and contemporary Italian dishes. Located in the heart of Bath, experience an inviting atmosphere, enhanced by elegant interiors and top-notch service. A soon-to-be favorite for both locals and visitors.",
            logo: "https://sanremobath.co.uk/wp-content/uploads/2023/09/Sanremo-Logo.png",
            home: "https://sanremobath.co.uk/"
        },
        {
            name: "Antica Bath",
            description: "Nestled on the world-famous Pulteney Bridge, Antica serves authentic Italian delights in the heart of Bath. A family-run gem, it boasts an ambiance filled with warmth and tradition. Steps away from Bath Abbey, it's a must-visit.",
            logo: "https://anticabath.co.uk/wp-content/uploads/2022/06/Antica-Italian-Restaurant-Bath-Logo.png",
            home: "https://anticabath.co.uk/"
        },
        {
            name: "Edesia Bath",
            description: "Named after the Roman Goddess of Food, Edesia offers a sophisticated dining experience that's both relaxed and inspired. Revel in a menu that pays homage to traditional Italian flavors, crafted to perfection.",
            logo: "https://edesiabath.co.uk/wp-content/uploads/2023/01/Edesia-logo-light.png",
            home: "https://edesiabath.co.uk/"
        },
        {
            name: "Square Grill Bath",
            description: "Step into Square Grill, a fusion of culinary excellence and Bath's rich history. Located near the iconic Bath Abbey, it offers a menu spotlighting Italian specialties and steaks, complemented by live music, creating an unforgettable experience.",
            logo: "https://squaregrillbath.co.uk/wp-content/uploads/2022/01/Square-logo-1.png",
            home: "https://squaregrillbath.co.uk/"
        }
    ];
    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card elevation={3} style={{ padding: '16px', margin: '16px', maxWidth: '600px' }}>
                <Typography variant="h6" align="center">
                    <strong>Rewards Terms & Conditions</strong>
                </Typography>
                <Divider style={{ margin: '16px 0' }} />
                <Typography variant="body1" paragraph>
                    <strong>Offer:</strong><br />
                    Eligible participants can enjoy a 30% discount on their total bill, valid for groups of up to 6 people.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Participating Restaurants:</strong><br />
                    This offer is available only at participating restaurants. Please see below for a complete list of restaurants. We also advise checking with the restaurant beforehand.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Exclusivity:</strong><br />
                    This reward cannot be combined with any other offers, promotions, or discounts. It is not applicable to set menus, special discounted offers, or promotions including the 2 for £12 cocktail deal.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Reservation of Rights:</strong><br />
                    We reserve the right to amend, withdraw, or terminate this offer, in whole or in part, at any time without prior notice or compensation.
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Acceptance:</strong><br />
                    By availing of this offer, participants agree to be bound by these terms and conditions, which are legally binding. Any breach of these terms may result in the forfeiture of the reward at our discretion. All terms and conditions are subject to change.
                </Typography>
            </Card>

            <Card style={{ margin: '16px', maxWidth: '632px', background: 'none', boxShadow: 'none' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} key={0}>
                            <Card elevation={3} style={{ padding: '16px', margin: 'auto', maxWidth: '600px' }}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} >
                                        <Typography sx={{ textAlign: 'center', textShadow: '0px 1px 2px rgba(0,0,0,0.5)' }} variant="h5">
                                            <strong>PARTICIPATING RESTAURANTS</strong>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    {restaurantData.map((restaurant, index) => (
                        <Grid item xs={12} key={index+1}>
                            <Card elevation={3} style={{ padding: '16px', margin: 'auto', maxWidth: '600px' }}>
                                <Grid container spacing={2} onClick={() => window.open(restaurant.home, '_blank')}>
                                    <Grid item xs={4}>
                                        <img src={restaurant.logo} alt={restaurant.name} style={{ maxWidth: '90%', borderRadius: '8px' }} />
                                    </Grid>
                                    <Grid item xs={8} sx={{display: 'flex', alignItems: 'center'}}>
                                        <Typography variant="h6"><strong>{restaurant.name}</strong></Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2">{restaurant.description}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </Box>
    );
};


export default RewardsTerms;
