import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCard } from '../components/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-sm">
      <Skeleton height={20} className="w-3/4" />
      <Skeleton height={16} className="w-full" />
      <Skeleton height={16} className="w-5/6" />
    </div>
  ),
};

export const Avatar: Story = {
  render: () => <Skeleton circle width={48} height={48} />,
};

export const Card: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-lg">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  ),
};
