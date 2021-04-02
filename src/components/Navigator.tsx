import React, { useState } from 'react';
import { Button, Nav } from 'grommet';
import { ContactInfo, CirclePlay, Moon, User } from 'grommet-icons';
import { Friends, GameOptions, Login } from './';

enum NavigationLayer {
  PROFILE = 7,
  FRIENDS = 16,
  GAME = 22
};

export const Navigator = () => {
  const [layer, setLayer] = useState<number | undefined>();
  const closeModal = () => setLayer(undefined);
  return (
    <Nav direction='row-responsive' pad='small'>
      <Button label='Friends' icon={<ContactInfo/>} onClick={() => setLayer(layer ? undefined : NavigationLayer.FRIENDS)} />
      <Button label="Create Game" icon={<CirclePlay />} onClick={() => setLayer(layer ? undefined : NavigationLayer.GAME)} />
      <Button label="Profile" icon={<User />} onClick={() => setLayer(layer ? undefined : NavigationLayer.PROFILE)} />
      {layer === NavigationLayer.PROFILE && <Login close={closeModal}/>}
      {layer === NavigationLayer.FRIENDS && <Friends close={closeModal}/>}
      {layer === NavigationLayer.GAME && <GameOptions close={closeModal}/>}
      <Button icon={<Moon />} onClick={() => window.cards.darkMode.toggle('toggle')} />
    </Nav>
  );
}
