const BACKEND_API_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN || null;

export async function fetchBeers() {
    try {
        //Handle the case when domain is not available yet
        if (!BACKEND_API_DOMAIN) {
            return [];
        }

        const apiUrl = `${BACKEND_API_DOMAIN}/public/api/v1/beers`;

        const res = await fetch(apiUrl, {cache: 'no-store'});

        if (!res.ok) {
            throw new Error('Failed to fetch beers');
        }

        return res.json();
    } catch (error) {
        console.error('Failed to fetch beers', error);
        return [];
    }
}

export async function fetchCustomers(token?: string | null) {
    try {
        //Handle the case when domain is not available yet
        if (!BACKEND_API_DOMAIN || !token) {
            return [];
        }

        const apiUrl = `${BACKEND_API_DOMAIN}/api/v1/customers`;

        const res = await fetch(apiUrl, {headers: {"Authorization": `Bearer ${token}`}, cache: 'no-store'});

        if (!res.ok) {
            throw new Error('Failed to fetch customers');
        }

        return res.json();
    } catch (error) {
        console.error('Failed to fetch customers', error);
        return [];
    }
}