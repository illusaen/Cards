import React from 'react';
import { Box, Button, Grommet, Heading } from 'grommet';

export const Dashboard = (): JSX.Element => {
  return (
    <Grommet plain>
      <Box
        direction='column'
        align='center'
        justify='center'
        background={{ image: 'url(static:///images/background.jpg)', size: 'contain', opacity: 'medium' }}
        pad={{ vertical: 'small', horizontal: 'medium' }}
        elevation='medium'
        margin='medium'
        fill={true}
      >
        <Heading alignSelf='center' fill={true} level='2' responsive={true} textAlign='center'>Cards</Heading>
        <Button color='primary' label='Friends' />
        <Button color='primary' label='Host Game' />
      </Box>
    </Grommet>
  );
};
