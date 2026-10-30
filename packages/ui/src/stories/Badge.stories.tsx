import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">In Stock</Badge>
      <Badge variant="warning">Low Stock</Badge>
      <Badge variant="danger">Out of Stock</Badge>
      <Badge variant="info">New</Badge>
      <Badge variant="muted">Archived</Badge>
    </div>
  ),
};

export const Pills: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary" pill>3</Badge>
      <Badge variant="danger" pill>99+</Badge>
      <Badge variant="success" pill>✓</Badge>
    </div>
  ),
};
