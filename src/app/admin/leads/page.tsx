import { Mail, Calendar, Tag, DollarSign, Eye } from "lucide-react";
import { getLeads, markLeadRead } from "@/actions/contact";

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-white font-bold mb-2">
          Leads &amp; Inquiries
        </h1>
        <p className="text-white/40">
          Contact form submissions from potential clients.
        </p>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className={`bg-dark-surface border rounded p-6 transition-colors ${
              lead.read
                ? "border-white/5"
                : "border-accent/30 bg-accent/5"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-medium text-lg">
                    {lead.name}
                  </h3>
                  {!lead.read && (
                    <span className="text-[0.6rem] bg-accent text-white px-2 py-0.5 uppercase tracking-wider font-semibold">
                      New
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm">
                  <span className="flex items-center gap-1">
                    <Mail size={13} /> {lead.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={13} /> {lead.projectType}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={13} /> {lead.budget}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />{" "}
                    {new Date(lead.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {!lead.read && (
                <form
                  action={async () => {
                    "use server";
                    await markLeadRead(lead.id);
                  }}
                >
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 text-xs text-white/40 hover:text-accent transition-colors border border-white/10 px-3 py-1.5 hover:border-accent"
                  >
                    <Eye size={13} /> Mark Read
                  </button>
                </form>
              )}
            </div>

            <div className="bg-white/5 p-4 rounded">
              <p className="text-white/60 text-sm leading-relaxed">
                {lead.message}
              </p>
            </div>

            {lead.tag && (
              <div className="mt-3">
                <span className="text-xs bg-accent/20 text-accent px-2.5 py-1 uppercase tracking-wider">
                  {lead.tag}
                </span>
              </div>
            )}
          </div>
        ))}

        {leads.length === 0 && (
          <div className="text-center py-16 text-white/40 bg-dark-surface border border-white/10 rounded">
            <p className="text-lg mb-2">No leads yet</p>
            <p className="text-sm">
              Contact form submissions will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
