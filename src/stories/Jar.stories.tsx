import type { Meta, StoryObj } from "@storybook/react";
import { Jar } from "../components/layout/Jar";

const meta: Meta<typeof Jar> = {
  title: "Core/Jar",
  component: Jar,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Jar>;

export const Sats: Story = {
  args: {
    name: "Savings Jar",
    amount: 15000000,
    color: "#fbbf24",
    displayMode: "sats",
  },
};

export const BTC: Story = {
  args: {
    name: "Main Jar",
    amount: 1000000,
    color: "#60a5fa",
    displayMode: "btc",
  },
};

export const Empty: Story = {
  args: {
    name: "Empty Jar",
    amount: 0,
    color: "#f87171",
    displayMode: "sats",
  },
};

export const Full: Story = {
  args: {
    name: "Empty Jar",
    amount: 50000000,
    color: "#f87171",
    displayMode: "sats",
  },
};
