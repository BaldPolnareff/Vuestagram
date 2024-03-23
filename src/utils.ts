import gsap from "gsap";

export type UserPost = {
    id?: number;
    urls: string[];
    title?: string | null;
    caption?: string | null;
    owner_id?: number;
}

export type UserInfo = {
    posts?: number;
    followers: number;
    following: number;
    bio?: string;
    external_link?: string;
    profile_image_url?: string;
}

export type Credentials = {
    email: string;
    password: string;
    username?: string;
};

export type User = {
    created_at?: string;
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

export function generateUniqueId(as_string: boolean = true): number | string {
    const id: number = Date.now() + Math.floor(Math.random() * 1000);
    return as_string ? id.toString() : id;
}
