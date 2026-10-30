import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Pagination } from '../components/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return (
      <div className="flex flex-col gap-2">
        <Pagination page={page} totalPages={12} onPageChange={setPage} />
        <p className="text-sm text-text-secondary">Current page: {page}</p>
      </div>
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return <Pagination page={page} totalPages={3} onPageChange={setPage} />;
  },
};

export const MidRange: Story = {
  render: () => {
    const [page, setPage] = React.useState(6);
    return <Pagination page={page} totalPages={20} onPageChange={setPage} />;
  },
};
