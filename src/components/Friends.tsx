import React from 'react';
import { Layer, List } from 'grommet';

const data = [{"name":"Eric","peerId":5},{"name":"Shimi","peerId":7}];

export const Friends = ({ close }: { close: () => void }) => {
  return (
    <Layer
      onEsc={close}
      onClickOutside={close}
      animation='fadeIn'
    >
      <List
        primaryKey='name'
        secondaryKey='peerId'
        data={data}
      />
    </Layer>
  );
};
