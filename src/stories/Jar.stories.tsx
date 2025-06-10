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
    color: "#e2b86a",
    displayMode: "sats",
  },
};

export const BTC: Story = {
  args: {
    name: "Main Jar",
    amount: 20000000,
    color: "#3b5ba9",
    displayMode: "btc",
  },
};

export const Empty: Story = {
  args: {
    name: "Empty Jar",
    amount: 0,
    color: "#c94f7c",
    displayMode: "sats",
  },
};

export const Full: Story = {
  args: {
    name: "Empty Jar",
    amount: 50000000,
    color: "#a67c52",
    displayMode: "sats",
  },
};
