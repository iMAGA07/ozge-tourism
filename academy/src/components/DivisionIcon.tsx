import { Compass, GraduationCap, Languages, Sparkles, Target, TrendingUp, type LucideProps } from "lucide-react";
import type { IconName } from "@/content/types";

const map = {
  languages: Languages,
  exams: Target,
  admissions: GraduationCap,
  advising: Compass,
  ai: Sparkles,
  growth: TrendingUp,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function DivisionIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden strokeWidth={1.7} {...props} />;
}
