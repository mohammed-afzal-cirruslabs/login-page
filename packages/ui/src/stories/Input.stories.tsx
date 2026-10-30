import type { Meta, StoryObj } from '@storybook/react';
import { Search, Mail } from 'lucide-react';
import { Input } from '../components/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com' },
};

export const WithHelper: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email address',
    value: 'not-an-email',
    errorText: 'Please enter a valid email address.',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search products…',
    leftAddon: <Search size={16} />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    value: 'john_doe',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Order ID',
    value: 'ORD-2024-00123',
    readOnly: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input size="sm" placeholder="Small input" label="Small" />
      <Input size="md" placeholder="Medium input" label="Medium" />
    </div>
  ),
};
