import gsap from "gsap";

export type UserPost = {
    id: number;
    username: string;
    imgUrl: string;
    title: string | null;
    caption: string | null;
}

export type UserInfo = {
    posts: number;
    followers: number;
    following: number;
}

export type Credentials = {
    email: string;
    password: string;
    username?: string;
};

export type User = {
    id: number;
    username: string;
    email: string;
    profileImg?: string;
    bio?: string;
    website?: string;
    posts?: UserPost[];
    info?: UserInfo;
}

export type LoginModalProperties = {
    title?: string;
    message?: string;
    show: boolean;
    isLogin?: boolean;
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
    return password.length >= 6;
}

export function isValidUsername(username: string): boolean {
    return username.length >= 3;
}

export function isCredentialsValid(credentials: Credentials): boolean {
    return typeof credentials.email === 'string' && 
            typeof credentials.password === 'string' && 
            isValidEmail(credentials.email) && 
            isValidPassword(credentials.password);
}
