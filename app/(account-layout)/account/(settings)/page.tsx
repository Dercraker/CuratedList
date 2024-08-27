import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requiredAuth } from "@/lib/auth/helper";
import { displayName } from "@/lib/format/displayName";
import { prisma } from "@/lib/prisma";
import { EditPasswordForm } from "./EditPasswordForm";
import { EditProfileForm } from "./EditProfileForm";

export default async function EditProfilePage() {
  const user = await requiredAuth();

  const hasPassword = await prisma.user.count({
    where: {
      id: user.id,
      passwordHash: {
        not: null,
      },
    },
  });

  return (
    <div className="flex flex-col gap-4 lg:gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar className="size-16">
              <AvatarFallback>{user.email.slice(0, 2)}</AvatarFallback>
              {user.image ? <AvatarImage src={user.image} /> : null}
            </Avatar>

            <CardTitle>{displayName(user)}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <EditProfileForm defaultValues={user} />
        </CardContent>
      </Card>
      {hasPassword ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <EditPasswordForm />
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}
