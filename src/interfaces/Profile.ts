interface Profile {
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    [key: string]: string | number | boolean | null;
}

export default Profile;