import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { createFileRoute, lazyRouteComponent, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { toastConfig } from '@/components/ui/sonner'
import Chat from '@/feature/chat/chat'
import { useGetUsers } from '@/feature/chat/hook/use-get-users.hook'
import { UserList } from '@/feature/chat/component/chat-list'

// const component = lazyRouteComponent(() => {
//     return import('@/page/dashboard/dashboard.page').then(mod => ({ default: mod.default }))
// })

function rootComponent() {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  useEffect(() => {
    if (!token) {
      navigate({ to: "/auth/sign-in" })
    }
  }, [token, navigate])

  if (!token) {
    const message = "Please sign in to continue. Redirecting...";
    console.warn(message);
    toast.info(message,toastConfig);
    return null
  }

  const {users } = useGetUsers()
  return <UserList users={users}/>
}

export const Route = createFileRoute('/')({
  component: rootComponent,
})


