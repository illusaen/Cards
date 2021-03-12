import React from 'react';
import { Box, Button, Grommet, Heading } from 'grommet';
import { useDispatch, useSelector } from 'react-redux';
import { isGameRunning } from '../redux/selectors';
import actions from '../redux/actions';

export const Dashboard = (): JSX.Element => {
  const running = useSelector(isGameRunning);
  const dispatch = useDispatch();
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
        <Button
          color='primary'
          label={`${running ? 'Stop' : 'Start'} Game`}
          onClick={() => dispatch(running ? actions.endGame() : actions.startGame() )} />
      </Box>
    </Grommet>
  );
};
