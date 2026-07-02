import React from "react";
import { motion } from "framer-motion";
import type { User } from "../hook/use-get-users.hook";
import Chat from "./chat";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  user: User;
  currentUser: User;
}

function UserChatDialog({ user, currentUser }: Props) {
  return (
    <Dialog>
      <DialogTrigger render={

          <button className="flex w-full items-center gap-4 rounded-lg px-4 py-3 transition hover:bg-muted">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
              {user.name[0].toUpperCase()}
            </div>

            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                user.active ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>

          <div className="flex-1 text-left">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">
              {user.active ? "Online" : "Offline"}
            </p>
          </div>
        </button>    
      }>
  
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0 sm:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Chat
            user={user}
            currentUser={currentUser}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(UserChatDialog);