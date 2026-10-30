import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const OPTIONS = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion',     label: 'Fashion' },
  { value: 'home',        label: 'Home & Kitchen' },
  { value: 'books',       label: 'Books' },
];

export const Default: Story = {
  args: {
    label: 'Category',
    options: OPTIONS,
    placeholder: 'Select a category',
  },
};

export const WithError: Story = {
  args: {
    label: 'Category',
    options: OPTIONS,
    errorText: 'Please select a category.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Category',
    options: OPTIONS,
    disabled: true,
    value: 'electronics',
  },
};
