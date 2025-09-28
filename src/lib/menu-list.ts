import {
  TrendingUp,
  Building2,
  DollarSign,
  History,
  Shield,
  BarChart3,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/projecao",
          label: "Projeção Patrimonial",
          icon: TrendingUp
        },
        {
          href: "/alocacoes",
          label: "Alocações",
          icon: Building2
        },
        {
          href: "/movimentacoes",
          label: "Movimentações",
          icon: DollarSign
        },
        {
          href: "/historico",
          label: "Histórico de Simulações",
          icon: History
        },
        {
          href: "/seguros",
          label: "Seguros",
          icon: Shield
        }
      ]
    }
  ];
}
