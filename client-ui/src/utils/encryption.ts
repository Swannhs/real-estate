import Cryptr from "cryptr";

export function encrypt(text: string): string {
    const secretKey: string = "secret-key";
    const cryptr = new Cryptr(secretKey);

    return cryptr.encrypt(text);
}

export function decrypt(encryptedString: string): string {
    const secretKey: string = "secret-key";
    const cryptr = new Cryptr(secretKey);

    return cryptr.decrypt(encryptedString);
}
