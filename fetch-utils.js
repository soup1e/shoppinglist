const SUPABASE_URL = 'https://xxfqouzpwreesvccncir.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZnFvdXpwd3JlZXN2Y2NuY2lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ0NzIyNTQsImV4cCI6MTk4MDA0ODI1NH0.wk5foxl8CMfmEIag85DJUhaO5NiRscSPTbZZEVhc-sM';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function createItem(item, quantity) {
    return await client.from('lists').insert([{ item, quantity }]);
}

export async function getList() {
    return await client.from('lists').select('*');
}
