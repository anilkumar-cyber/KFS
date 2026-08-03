import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { UserForm } from "@/components/admin/user-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "New User", robots: { index: false } };

export default async function NewUserPage() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/admin");

  return (
    <div className="max-w-xl">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">New Staff User</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
