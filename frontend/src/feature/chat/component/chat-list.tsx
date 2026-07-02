import type { User } from "../hook/use-get-users.hook";

interface Props {
  users: User[];
}

export function UserList({ users }: Props) {
    const activeUsers = users.filter((u)=>u.active)
  return (
    <div className="p-4 m-4 rounded-xl border bg-white shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="text-lg font-semibold">Users</h2>
        <p className="text-sm text-muted-foreground">
          {users.length} users
        </p>
         <p className="text-sm  font-bold text-muted-foreground">
          {activeUsers?.length} active users
        </p>
      </div>

      <div className="divide-y">
        {users.map((user) => (
          <button
            key={user.id}
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50"
          >
            <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </div>
  
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                  user.active ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">{user.name}</h3>

              <p
                className={`text-sm ${
                  user.active
                    ? "text-green-600"
                    : "text-muted-foreground"
                }`}
              >
                {user.active ? "Active" : "Inactive"}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                user.active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {user.active ? "Online" : "Offline"}
            </span>
          </button>
        ))}

        {users.length === 0 && (
          <div className="py-10 text-center text-muted-foreground">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}