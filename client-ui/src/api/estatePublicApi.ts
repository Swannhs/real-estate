import process from "process";
import {serverSideResponse} from "@/utils/util";
import {EstateInterface, EstateSingleInterface} from "@/types/property";

export async function getRecentListings() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/estate-api/public/v1/estates/recent-listings?limit=8`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return serverSideResponse(res) as EstateInterface[];
}

export async function getEstateById(id: string) {
    console.log('getEstateById', id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/estate-api/public/v1/estates/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return serverSideResponse(res) as EstateSingleInterface;
}
