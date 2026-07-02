import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseJwt(token: string) {
    try {
        // Get the payload segment (the second part)
        const base64Url = token.split('.')[1]; 
        
        // Convert Base64Url to standard Base64 string
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        
        // Handle decoding and convert percent-encoded characters back to text
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Failed to parse JWT", error);
        return null;
    }
}

 

