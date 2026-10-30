import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Review',
    placeholder: 'Write your review here…',
    helperText: 'Minimum 50 characters.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Review',
    errorText: 'Review must be at least 50 characters.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Review',
    value: 'Great product!',
    disabled: true,
  },
};
