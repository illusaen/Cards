import React from 'react';
import { Card, CardHeader, CardBody, Grommet, Grid, Heading, Text } from 'grommet';
import { Navigator, theme } from '../components';

export const Dashboard = (): JSX.Element => {
  return (
    <Grommet theme={theme} themeMode={window.cards.darkMode.setting === 'dark' ? 'dark' : 'light'}>
      <Grid columns={{'size': 'flex', 'count': 1}}>
        <Navigator />
        <Card background={{ image: 'url(static:///images/background.jpg)', size: 'cover', opacity: 'medium' }}>
          <CardHeader align="center" direction="row" flex={false} justify="between" gap="medium" pad="small">
            <Heading textAlign="center">
              Cards
            </Heading>
          </CardHeader>
          <CardBody pad="small">
            <Text>
              To begin, add some friends and then create a game!
            </Text>
          </CardBody>
        </Card>
      </Grid>
    </Grommet>
  );
};
