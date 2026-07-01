

import { users } from "../../module/user/model";

export const table = {
    users,
} as const

export type Table = typeof table

export { 
    users 
// 
}  // drizzle look at it to maintain migration