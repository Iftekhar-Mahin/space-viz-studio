import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FolderOpen, Users, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/projects", icon: FolderOpen, label: "Projects" },
    { href: "/admin/leads", icon: Users, label: "Leads" },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-surface border-r border-white/10 fixed top-0 left-0 h-full z-40 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-accent flex items-center justify-center">
              <span className="text-accent font-heading text-sm font-bold">S</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-heading text-sm tracking-widest font-bold">
                SPACE<span className="text-accent">viz</span>
              </span>
              <span className="text-white/40 text-[0.5rem] tracking-[0.2em] uppercase">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm rounded"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-4">
            <div className="w-8 h-8 bg-accent/20 flex items-center justify-center rounded-full">
              <span className="text-accent text-xs font-bold">
                {session.user?.name?.[0] || "A"}
              </span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">
                {session.user?.name || "Admin"}
              </p>
              <p className="text-white/40 text-xs">{session.user?.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-red-400 transition-colors text-sm w-full"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
