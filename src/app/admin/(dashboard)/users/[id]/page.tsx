import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { UserForm } from "@/components/admin/user-form";
import { DeleteUserButton } from "@/components/admin/delete-user-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Edit User", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/admin");

  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  return (
    <div className="max-w-xl flex flex-col gap-4">
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Edit User</CardTitle>
          {session.sub !== user.id && <DeleteUserButton userId={user.id} userName={user.name} />}
        </CardHeader>
        <CardContent>
          <UserForm
            mode="edit"
            user={{ id: user.id, name: user.name, email: user.email, role: user.role, active: user.active }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
