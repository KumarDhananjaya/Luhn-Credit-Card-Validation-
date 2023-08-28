import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

function UserCardList() {
  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  const fetchUserCards = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_URL/cards');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user cards.');
      }

      const data = await response.json();
      setUserCards(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Your Saved Cards
      </Typography>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && userCards.length === 0 && (
        <p>No cards found.</p>
      )}
      {!isLoading && !error && userCards.length > 0 && (
        <List>
          {userCards.map((card) => (
            <React.Fragment key={card._id}>
              <ListItem>
                <ListItemText
                  primary={`Card Number: ${card.cardNumber}`}
                  secondary={`Card Holder: ${card.cardHolder}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
}

export default UserCardList;