import Link from "next/link";
import { Plus, Pencil, Trash2, Star, MapPin } from "lucide-react";
import { getProjects, deleteProject } from "@/actions/projects";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-white font-bold mb-2">
            Projects
          </h1>
          <p className="text-white/40">Manage your portfolio projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="btn-primary text-xs"
        >
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-dark-surface border border-white/10 rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/40 text-xs uppercase tracking-widest px-6 py-4">
                Project
              </th>
              <th className="text-left text-white/40 text-xs uppercase tracking-widest px-6 py-4">
                Category
              </th>
              <th className="text-left text-white/40 text-xs uppercase tracking-widest px-6 py-4">
                Year
              </th>
              <th className="text-left text-white/40 text-xs uppercase tracking-widest px-6 py-4">
                Featured
              </th>
              <th className="text-right text-white/40 text-xs uppercase tracking-widest px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="text-white font-medium">{project.name}</p>
                    <p className="text-white/40 text-sm flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {project.location}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-accent/20 text-accent px-2.5 py-1 uppercase tracking-wider">
                    {project.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-white/60">{project.year}</td>
                <td className="px-6 py-4">
                  {project.featured && (
                    <Star size={16} className="text-accent fill-accent" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="p-2 text-white/40 hover:text-white transition-colors"
                      title="View"
                    >
                      <Pencil size={16} />
                    </Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteProject(project.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="p-2 text-white/40 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="text-center py-12 text-white/40">
            <p>No projects yet. Add your first project.</p>
          </div>
        )}
      </div>
    </div>
  );
}
