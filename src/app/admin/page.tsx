import Link from "next/link";
import { FolderOpen, Users, Eye, ArrowRight, TrendingUp } from "lucide-react";
import { getProjectStats } from "@/actions/projects";
import { getLeadStats } from "@/actions/contact";

export default async function AdminDashboard() {
  const projectStats = await getProjectStats();
  const leadStats = await getLeadStats();

  const stats = [
    {
      label: "Total Projects",
      value: projectStats.total,
      icon: FolderOpen,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Featured Projects",
      value: projectStats.featured,
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Total Leads",
      value: leadStats.total,
      icon: Users,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Unread Messages",
      value: leadStats.unread,
      icon: Eye,
      color: "text-red-400",
      bg: "bg-red-400/10",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-white font-bold mb-2">
          Dashboard
        </h1>
        <p className="text-white/40">Welcome back to SPACE viz Studio admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-dark-surface border border-white/10 p-6 rounded"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${stat.bg} flex items-center justify-center rounded`}>
                <stat.icon className={stat.color} size={20} />
              </div>
            </div>
            <p className="text-3xl font-heading font-bold text-white mb-1">
              {stat.value}
            </p>
            <p className="text-white/40 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/projects"
          className="bg-dark-surface border border-white/10 p-6 rounded hover:border-accent/50 transition-colors group"
        >
          <h3 className="text-white font-medium mb-2 group-hover:text-accent transition-colors">
            Manage Projects
          </h3>
          <p className="text-white/40 text-sm mb-4">
            Add, edit, or delete portfolio projects
          </p>
          <span className="text-accent text-sm flex items-center gap-1">
            Go to Projects <ArrowRight size={14} />
          </span>
        </Link>

        <Link
          href="/admin/leads"
          className="bg-dark-surface border border-white/10 p-6 rounded hover:border-accent/50 transition-colors group"
        >
          <h3 className="text-white font-medium mb-2 group-hover:text-accent transition-colors">
            View Leads
          </h3>
          <p className="text-white/40 text-sm mb-4">
            Review contact form submissions and inquiries
          </p>
          <span className="text-accent text-sm flex items-center gap-1">
            Go to Leads <ArrowRight size={14} />
          </span>
        </Link>
      </div>
    </div>
  );
}
