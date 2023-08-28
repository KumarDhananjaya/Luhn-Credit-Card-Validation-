import React from 'react';
import { Box, useMediaQuery } from "@mui/material";
import Navbar from '../navbar';
import CreditCardDetails from '../CreditCardDetails';
import UserCardList from '../UserCardList';

const HomePage = () => {

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
    <Navbar />
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box fflexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}>
        <CreditCardDetails />
      </Box>
      <Box>
        <UserCardList/>
      </Box>
    </Box>
  </Box>
  )
}

export default HomePage; 