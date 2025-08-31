// hooks/useUser.ts
"use client";

import { useState, useEffect } from "react";

interface User {
  email:string;
  name: string;
  picture: string;
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  // وقتی hook mount میشه، localStorage رو میخونه
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ذخیره کاربر هم تو state هم تو localStorage
  const saveUser = (data: User) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, saveUser, removeUser };
};
