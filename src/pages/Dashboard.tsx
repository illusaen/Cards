import React from 'react';
import { Box, Button, Grommet, Heading } from 'grommet';

export const Dashboard = (): JSX.Element => {
  return (
    <Grommet plain>
      <Box
        direction='column'
        align='center'
        justify='center'
        background='light-2'
        pad={{ vertical: 'small', horizontal: 'medium' }}
        elevation='medium'
        margin='medium'
        height='100%'
      >
        <Heading alignSelf='center' fill={true} level='2' responsive={true} textAlign='center'>Cards</Heading>
        <Button color='primary' label='Friends' />
        <Button color='primary' label='Host Game' />
      </Box>
    </Grommet>
  );
};
