import {
  ArrowRight,
  Briefcase,
  Building2,
  Code,
  Film,
  Image as ImageIcon,
  Mail,
  Megaphone,
  MessageCircle,
  Mic,
  PenLine,
  Scissors,
  Smartphone,
  TrendingUp,
  Trophy,
  Users,
  Zap,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/content/types";

/* Icons referenced by name from content files (names are serialisable, components are not). */
const icons = {
  arrowRight: ArrowRight,
  briefcase: Briefcase,
  building: Building2,
  code: Code,
  film: Film,
  image: ImageIcon,
  mail: Mail,
  megaphone: Megaphone,
  message: MessageCircle,
  mic: Mic,
  pen: PenLine,
  scissors: Scissors,
  smartphone: Smartphone,
  trending: TrendingUp,
  trophy: Trophy,
  users: Users,
  zap: Zap,
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp aria-hidden {...props} />;
}

const tones: Record<Tone, string> = {
  blue: "bg-accent/8 text-accent ring-accent/10",
  sky: "bg-sky/10 text-sky-600 ring-sky/15",
  indigo: "bg-indigo/8 text-indigo ring-indigo/12",
  cyan: "bg-cyan-600/9 text-cyan-600 ring-cyan-600/15",
};

/** Rounded square tile holding an icon. */
export function IconTile({ name, tone = "blue", className }: { name: IconName; tone?: Tone; className?: string }) {
  return (
    <span className={cn("grid size-11.5 shrink-0 place-items-center rounded-[14px] ring-1 ring-inset", tones[tone], className)}>
      <Icon name={name} className="size-5.5" />
    </span>
  );
}
