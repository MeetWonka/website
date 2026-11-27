import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";
import { LogoMark } from "./logo-mark";

function LogoSpecimen() {
  return (
    <div className="grid gap-5">
      <div className="rounded-sm border border-border bg-white p-10 text-black">
        <Logo className="h-8" />
      </div>
      <div className="rounded-sm bg-black p-10 text-white">
        <Logo className="h-8" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="grid place-items-center rounded-sm border border-border bg-white p-10">
          <LogoMark variant="dark" />
        </div>
        <div className="grid place-items-center rounded-sm bg-black p-10">
          <LogoMark variant="light" />
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: "Assets/Logo",
  component: LogoSpecimen,
  parameters: {
    docs: {
      description: {
        component:
          "Candidate wordmark and mark treatments. Rights and clear-space metadata remain explicit in the asset catalog until human approval.",
      },
    },
  },
} satisfies Meta<typeof LogoSpecimen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CandidateTreatments: Story = {};
