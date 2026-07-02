import UserChat from "@/feature/chat/component/user-chat";
import type { User } from "@/feature/chat/hook/use-get-users.hook";
import { parseJwt } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { memo, useEffect, useState } from "react";
import { socket } from "@/lib/socket-io";
import { useGetUsers } from "@/feature/chat/hook/use-get-users.hook";
import UserList from "@/feature/chat/component/chat-list";
import { env } from "@/enviroments/env";


function ChatPage() {
  const { token } = useAuthStore()
  const currentUser: User = parseJwt(token);
  const { users = [] } = useGetUsers();

  const [userList, setUserList] = useState(users);

  // Keep local state in sync after API fetch
  useEffect(() => {
    setUserList(users);
  }, [users]);

  useEffect(() => {
    if (!token) return;

    socket.auth = { token };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    const handleOnlineUsers = (onlineIds: number[]) => {
      setUserList((prev) => {
        return prev.map((user) => {
          const status = onlineIds.includes(user.id)
          return ({
            ...user,
            active: status,
          })
        }
        )
      })
    }

    socket.on(env.VITE_SOCKET_STATUS_EVENT_NAME, handleOnlineUsers);

    return () => {
      socket.off(env.VITE_SOCKET_STATUS_EVENT_NAME, handleOnlineUsers);
    };
  }, []);


  return (
    <div className="flex flex-col gap-4">

      <div className="flex w-full justify-between ">
        <div className="w-full"></div>
        <div className="border whitespace-nowrap rounded-xl m-2">
          <UserChat user={{ ...currentUser, active: true }} />
        </div>
      </div>


      <div className="">
        <UserList users={userList} currentUser={currentUser} />
      </div>

    </div>

  );
}


export default memo(ChatPage)