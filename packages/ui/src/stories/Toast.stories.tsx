import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ToastProvider, notify } from '../components/Toast';
import { Button } from '../components/Button';

const meta: Meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AllTypes: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex flex-wrap gap-3">
        <Button variant="primary"   onClick={() => notify.success('Item added to cart!')}>Success</Button>
        <Button variant="danger"    onClick={() => notify.error('Something went wrong.')}>Error</Button>
        <Button variant="secondary" onClick={() => notify.info('Your order is on its way.')}>Info</Button>
        <Button variant="ghost"     onClick={() => notify.warning('Only 2 left in stock.')}>Warning</Button>
      </div>
    </>
  ),
};
