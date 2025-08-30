"use server";

import "server-only";
import { removeSession } from "./storage";

export async function signOut() {
  removeSession();
}
