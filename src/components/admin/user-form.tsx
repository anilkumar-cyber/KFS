"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { createUser, updateUser } from "@/lib/actions/users";
import type { UserRole } from "@prisma/client";

const createSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
});

const editSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  role: z.enum(["ADMIN", "EMPLOYEE"]),
  active: z.boolean(),
  newPassword: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
});

type CreateValues = z.infer<typeof createSchema>;
type EditValues = z.infer<typeof editSchema>;

export function UserForm({
  mode,
  user,
}: {
  mode: "create";
  user?: never;
} | {
  mode: "edit";
  user: { id: string; name: string; email: string; role: UserRole; active: boolean };
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);

  const createForm = useForm<CreateValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "", email: "", password: "", role: "EMPLOYEE" },
  });

  const editForm = useForm<EditValues>({
    resolver: zodResolver(editSchema),
    defaultValues: user
      ? { name: user.name, role: user.role, active: user.active, newPassword: "" }
      : { name: "", role: "EMPLOYEE", active: true, newPassword: "" },
  });

  async function onCreateSubmit(values: CreateValues) {
    setSubmitting(true);
    try {
      await createUser(values);
      toast.success("User created");
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setSubmitting(false);
    }
  }

  async function onEditSubmit(values: EditValues) {
    if (!user) return;
    setSubmitting(true);
    try {
      await updateUser(user.id, {
        name: values.name,
        role: values.role,
        active: values.active,
        newPassword: values.newPassword || undefined,
      });
      toast.success("User updated");
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setSubmitting(false);
    }
  }

  if (mode === "create") {
    return (
      <Form {...createForm}>
        <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="grid gap-4">
          <FormField
            control={createForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ravi Kumar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="ravi@kavyafinancialservices.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Minimum 8 characters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={submitting} className="rounded-full self-start">
            {submitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Create User
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...editForm}>
      <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="grid gap-4">
        <div className="text-sm text-muted-foreground">{user!.email}</div>
        <FormField
          control={editForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editForm.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EMPLOYEE">Employee</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={editForm.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-xl border border-border p-3.5">
              <div>
                <FormLabel className="mb-0">Account Active</FormLabel>
                <p className="text-xs text-muted-foreground">Inactive users cannot sign in.</p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={editForm.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reset Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Leave blank to keep current password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting} className="rounded-full self-start">
          {submitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
