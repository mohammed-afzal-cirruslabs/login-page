import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled:{ control: 'boolean' },
    fullWidth:{ control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'Add to Cart' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'Save for Later' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', children: 'Learn More' },
};

export const Danger: Story = {
  args: { variant: 'danger', size: 'md', children: 'Delete Item' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button leftIcon={<ShoppingCart size={16} />}>Add to Cart</Button>
      <Button variant="danger" leftIcon={<Trash2 size={16} />}>Delete</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true, children: 'Processing…' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Out of Stock' },
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Buy Now' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((v) => (
        <div key={v} className="flex flex-wrap items-center gap-3">
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <Button key={s} variant={v} size={s}>{v} {s}</Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
