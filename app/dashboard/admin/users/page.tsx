
import { getSession } from "@/lib/core/server"
import { getUsers, type AdminUser } from "@/lib/actions/better-auth-users"
import { UsersBoard } from "./_components/users-board"

// Full-screen message shown when the page can't be used
const MessageScreen = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen items-center justify-center bg-[#131314] px-4 text-center text-[#ededef]">
    {children}
  </div>
)

export default async function AdminUsersPage() {
  // Only signed-in users can view user management
  const session = await getSession()

  if (!session?.user?.id) {
    return <MessageScreen>Please sign in to manage users.</MessageScreen>
  }

  // listUsers is admin-only — non-admins get a friendly message
  // instead of an unhandled error
  let users: AdminUser[] = []
  let denied = false

  try {
    users = await getUsers()
  } catch {
    denied = true
  }

  if (denied) {
    return (
      <MessageScreen>You don&apos;t have permission to view users.</MessageScreen>
    )
  }

  return <UsersBoard users={users} />
}
