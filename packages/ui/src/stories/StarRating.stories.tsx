import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { StarRating } from '../components/StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Components/StarRating',
  component: StarRating,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Display: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 3.5, 4, 4.7, 5].map((v) => (
        <StarRating key={v} value={v} showLabel />
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [rating, setRating] = React.useState(0);
    return (
      <div className="flex flex-col gap-2">
        <StarRating value={rating} onChange={setRating} size="lg" />
        <p className="text-sm text-text-secondary">
          {rating === 0 ? 'Click to rate' : `You rated: ${rating} / 5`}
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StarRating value={4.5} size="sm" showLabel />
      <StarRating value={4.5} size="md" showLabel />
      <StarRating value={4.5} size="lg" showLabel />
    </div>
  ),
};
