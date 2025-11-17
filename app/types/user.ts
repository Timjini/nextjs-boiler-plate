
export interface User {
    id: string;
    email: string;
    username: string;
    auth_token: string;
    first_name: string;
    last_name: string;
    parent_id: number;
    role: UserRoles;
    created_at: Date;
    updated_at: Date;
}

export enum UserRoles {
    PARENT_USER = "parent_user",
    CHILD_USER = "child_user",
    ATHLETE = "athlete"
}