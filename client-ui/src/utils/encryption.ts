import Cryptr from "cryptr";
import process from "process";

export function encrypt(text: string): string {
    const cryptr = new Cryptr(process.env.NEXTAUTH_SECRET);

    return cryptr.encrypt(text);
}

export function decrypt(encryptedString: string): string {
    const cryptr = new Cryptr(process.env.NEXTAUTH_SECRET);

    return cryptr.decrypt(encryptedString);
}
