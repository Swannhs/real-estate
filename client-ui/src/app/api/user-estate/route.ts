import {getServerSession} from "next-auth";
import {authOptions} from "@/app/[locale]/auth/[...nextauth] /route";
import {getAccessToken} from "@/utils/sessionTokenAccessor";
import process from "process";
import {NextResponse} from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
const estatePrefix = process.env.NEXT_PUBLIC_ESTATE_SERVICE_PREFIX;

export async function GET(req: Request) {
    const session = await getServerSession(authOptions as any);
    if (session) {
        let accessToken = await getAccessToken();
        const res = await fetch(`${baseUrl}/${estatePrefix}/v1/estates`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (res.ok) {
            const data = await res.json();
            return NextResponse.json({message: "User estate fetched", status: res.status, data: data});
        }
        return NextResponse.json({message: "User estate fetch failed", status: res.status});
    }
    return NextResponse.json({message: "Unauthorized", status: 401});
}
