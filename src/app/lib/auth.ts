"use server";

import "server-only";
import { saveSession } from "./storage";

export async function signIn({
  ...credentials
}: {
  username: string;
  password: string;
}) {
  console.log({credentials})

  const res = await fetch('http://localhost:3000/auth/login',{
    method:"POST",
    headers:{
      "Content-type":'application/json'
    },
    body:JSON.stringify(credentials)
  })

  if(!res.ok)
{
  return null
} 
const result = await res.json()
console.log({result})
saveSession(result.access_token)
// loginApi(credentials)
  //   .then((res) => {
  //     saveSession(res.data.access_token);
  //     redirect("/profile");
  //   })
  //   .catch((err) => {
  //     return null;
  //   });
}
