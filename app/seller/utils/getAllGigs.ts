import axios from "axios";
import { sellerUrl } from "./constants";

export const getAllGigs = async (userId?: string): Promise<any[]> => {
    try {
        const url = `${sellerUrl}/gigs/${userId ? `${userId}/` : ""}all`;
        const res = await axios.get(url);
        const data = res.data;
        if (data.error) {
            console.log(data.error);
        }
        console.log("gigs", data);
        return data as any[];
    } catch (error: any) {
        const errorResponse = error?.response;

        if (errorResponse) {
            const errorMessages = errorResponse?.data?.message;

            throw new error(errorMessages);
        } else {
            throw new Error(error);
        }
    }
};
