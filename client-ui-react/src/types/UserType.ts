export interface UserDetailsInterface {
    id: number;
    userName: string;
    email: string;
    role: null | string;
    userType: string;
    details: {
        id: number;
        firstName: string;
        lastName: string;
        gender: string;
        phoneNumber: string;
        profilePicture_path: string;
        verifiedAccount: boolean;
        intro: string;
        facebookLink: string;
        twitterLink: string;
        youtubeLink: string;
        instagramLink: string;
        address: string;
        language: string;
        birthDate: string;
    };
}
