import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "../components/layout/Navigation";

const meta: Meta<typeof Navigation> = {
  title: "Core/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A navigation component that provides quick access to main wallet actions.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  render: () => <Navigation />,
};

export const InContainer: Story = {
  render: () => (
    <div className="max-w-md mx-auto border rounded-lg">
      <Navigation />
    </div>
  ),
};
