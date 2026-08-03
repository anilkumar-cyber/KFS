import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Users", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/admin");

  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Staff accounts with access to this admin panel. {users.length} total.
        </p>
        <Button asChild size="sm" className="rounded-full">
          <Link href="/admin/users/new">
            <Plus className="size-4" /> New User
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wide">
                <tr>
                  <th className="text-left font-semibold px-5 py-3">Name</th>
                  <th className="text-left font-semibold px-5 py-3">Email</th>
                  <th className="text-left font-semibold px-5 py-3">Role</th>
                  <th className="text-left font-semibold px-5 py-3">Status</th>
                  <th className="text-left font-semibold px-5 py-3">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/users/${u.id}`} className="font-semibold hover:text-secondary hover:underline">
                        {u.name}
                      </Link>
                      {u.id === session.sub && <span className="ml-2 text-[10px] text-muted-foreground">(you)</span>}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-5 py-3">
                      <Badge variant={u.role === "ADMIN" ? "default" : "secondary"}>{u.role}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge className={u.active ? "bg-accent text-white" : "bg-muted text-muted-foreground"}>
                        {u.active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">
                      {u.lastLoginAt
                        ? new Date(u.lastLoginAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                        : "Never"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
