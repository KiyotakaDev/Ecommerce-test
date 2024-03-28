import {
  HomeIcon,
  ArchiveBoxIcon,
  QueueListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Dashboard", to: "/admin", icon: HomeIcon },
  { name: "Products", to: "/admin/products", icon: ArchiveBoxIcon },
  { name: "Orders", to: "/admin/orders", icon: QueueListIcon },
  { name: "Settings", to: "/admin/settings", icon: Cog6ToothIcon },
];

export { navLinks };
