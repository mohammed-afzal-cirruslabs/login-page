import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Drawer } from '../components/Drawer';
import { Button } from '../components/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

function DrawerDemo({ side }: { side?: 'left' | 'right' }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {side ?? 'right'} Drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={side === 'left' ? 'Navigation' : 'Cart'}
        side={side}
        footer={
          <Button variant="primary" fullWidth onClick={() => setOpen(false)}>
            {side === 'left' ? 'Close' : 'Checkout'}
          </Button>
        }
      >
        <p className="text-sm text-text-secondary">Drawer content goes here.</p>
      </Drawer>
    </>
  );
}

export const Right: Story = {
  render: () => <DrawerDemo side="right" />,
};

export const Left: Story = {
  render: () => <DrawerDemo side="left" />,
};
