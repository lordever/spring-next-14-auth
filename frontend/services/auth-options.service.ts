import GoogleProvider from 'next-auth/providers/google';
import {Session} from 'next-auth';

const callbacks: {
    session({session, token}: { session: any, token: any }): Promise<Session>;
    signIn({profile}: { profile: any }): Promise<boolean>;
    jwt(data: any): Promise<boolean>
} = {
    // Invoked on successfully sign in
    async signIn(data: any) {
        return data.profile;
    },
    async jwt(data: any) {
        if (data.account) {
            data.token.accessToken = data.account.id_token;
        }
        return data.token;
    },
    //Modifies the session object
    async session({session, token}) {
        session.accessToken = token.accessToken;

        return session;
    },
};

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks,
};
