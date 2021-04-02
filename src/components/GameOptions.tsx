import React, { useState } from 'react';
import { Button, Form, FormField, Layer, Select } from 'grommet';
import { CirclePlay } from 'grommet-icons';

interface IFormState {
  gameType: string;
}

const gameOptions = {
  default: 'rummy',
  options: ['rummy', 'poker', 'blackjack']
};

export const GameOptions = ({ close }: { close: () => void }) => {
  const initial = { gameType: gameOptions.default };
  const [value, setValue] = useState<IFormState>(initial);
  return (
    <Layer
      onEsc={close}
      onClickOutside={close}
      animation='fadeIn'
    >
      <Form<IFormState>
        value={value}
        onChange={(value: { gameType: string }) => setValue(value)}
        onReset={() => setValue(initial)}
        onSubmit={({ value }) => { console.log(value); }}
      >
        <FormField label='Game'>
          <Select name='gameType' options={gameOptions.options} defaultValue={gameOptions.default} />
        </FormField>
        <Button label='Go!' type='submit' icon={<CirclePlay/>} primary />
      </Form>
    </Layer>
  );
};
