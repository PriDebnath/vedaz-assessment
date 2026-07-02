import React from "react";
import type { User } from "../hook/use-get-users.hook";
import Chat from "./chat";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function UserChatDialog({ user }: { user: User }) {
  return (
    <Dialog>
      <DialogTrigger render={
          <button className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50">
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
      }>
      
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>{user.name}</DialogTitle>
        </DialogHeader>

        <Chat user={user} />
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(UserChatDialog);