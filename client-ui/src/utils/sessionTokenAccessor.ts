import { getServerSession } from "next-auth";
import { decrypt } from "./encryption";
import { authOptions } from "@/app/[locale]/auth/[...nextauth] /route";

export async function getAccessToken() {

  const session: any = await getServerSession(authOptions);
  if (session) {
    return decrypt(session.access_token);
  }
  return null;
}

export async function getIdToken() {

  const session: any = await getServerSession(authOptions);
  if (session) {
    return decrypt(session.id_token);
  }
  return null;
}
