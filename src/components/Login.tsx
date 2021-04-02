import React, { useState } from 'react';
import { Box, Button, Form, FormField, Layer } from 'grommet';

interface IFormState {
  name: string;
  peerId: string;
}

export const Login = ({ close }: { close: () => void }) => {
  const initial = { name: '', peerId: '' }
  const [value, setValue] = useState<IFormState>(initial);
  return (
    <Layer
      onEsc={close}
      onClickOutside={close}
      animation='fadeIn'
    >
      <Form<IFormState>
        value={value}
        onChange={(value: { name: string, peerId: string }) => setValue(value)}
        onReset={() => setValue(initial)}
        onSubmit={({ value }) => { console.log(value); }}
      >
        <FormField name='name' required validate={{ regexp: /^[a-z]+/i }} label='Name' />
        <FormField name='peerId' required validate={{ regexp: /^\w+/i }} label='Peer ID' />
        <Box direction='row' gap='medium'>
          <Button type='submit' primary label='Submit' />
          <Button type='reset' label='Reset' />
        </Box>
      </Form>
    </Layer>
  );
};
