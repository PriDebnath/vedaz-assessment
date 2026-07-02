import React from "react";
import UserChat from "./user-chat";
import type { User } from "@/feature/chat/hook/use-get-users.hook";

interface Props {
  users: User[];
  currentUser: User;
}

 function UserList({ users,currentUser }: Props) {
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
        {users.map((user) => { 
            if (currentUser?.id == user?.id) {
                return null
            }
            return (
     <UserChat user={user} key={user.id}/>
        )
 }
 )
 }

        {users.length === 0 && (
          <div className="py-10 text-center text-muted-foreground">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}

export  default React.memo(UserList)