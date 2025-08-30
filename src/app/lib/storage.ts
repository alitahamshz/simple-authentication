'use server'

import { cookies } from "next/headers";

const cookieName = "access_token"

export async function saveSession(
    accessToken :string
){
    const cookieStore = await cookies();
    cookieStore.set(cookieName, accessToken,{
        httpOnly: true,
        // secure:true
    });
}


export async function removeSession() {
    console.log('run111')
    const cookieStore = await cookies();
   cookieStore.delete(cookieName)
}