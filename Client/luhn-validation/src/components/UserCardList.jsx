import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { setCards } from '../state/index.js';

const UserCardList = ({ userId }) => {
  const dispatch = useDispatch();
  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.token);

  const fetchUserCards = async () => {
    try {
      const response = await fetch(`http://localhost:3001/cards/${userId}/cards`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      dispatch(setCards(data));
      setUserCards(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this card?');

    if (!shouldDelete) {
      return; 
    }

    try {
      const response = await fetch(`http://localhost:3001/cards/${cardId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setUserCards((prevUserCards) => prevUserCards.filter((card) => card._id !== cardId));
      } else {
        console.error('Failed to delete card.');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Your Saved Cards
      </Typography>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && userCards.length === 0 && <p>No cards found.</p>}
      {!isLoading && !error && userCards.length > 0 && (
        <List>
          {userCards.map((card) => (
            <React.Fragment key={card._id}>
              <ListItem>
                <ListItemText
                  primary={`Card Number: ${card.cardNumber}`}
                  secondary={`Card Holder: ${card.cardHolder}`}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDeleteCard(card._id)}
                  style={{ marginLeft: '150px' }}

                >
                  Delete
                </Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
};

export default UserCardList;
