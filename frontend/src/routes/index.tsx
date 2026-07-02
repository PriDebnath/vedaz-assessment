import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { toastConfig } from "@/components/ui/sonner";
import ChatPage from "@/page/chat/chat.page";
import { useAuthStore } from "@/store/auth.store";

function RootComponent() {
  const navigate = useNavigate();
    const { token } = useAuthStore();


  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      toast.info(
        "Please sign in to continue. Redirecting...",
        toastConfig
      );

      navigate({
        to: "/auth/sign-in",
      });
    }
  }, [token, navigate]);



  if (!token) return null;

  return <ChatPage/>
}

export const Route = createFileRoute("/")({
  component: RootComponent,
});