import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo({ size }: { size?: 'sm' | 'md' | 'lg' }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {size ?? 'md'} Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm your order"
        description="Review your items before placing the order."
        size={size}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm Order</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          Your order total is <strong className="text-text-primary">₹24,999</strong>.
          Delivery estimated in 2–3 business days.
        </p>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};
