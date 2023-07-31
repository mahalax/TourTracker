import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { baseURL } from '../../../store/api';
export default NextAuth({

  providers: [
    CredentialsProvider({
      id: 'credentials',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'regalTalkies',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.


      async authorize(credentials, req) {
        const user = {
          userId: credentials.userId,
          email: credentials.email,
          role: credentials.role,
          accessToken: credentials.accessToken,
          accessTokenExp: credentials.accessTokenExp,
          refreshToken: credentials.refreshToken
        };

        console.log("user : " , user)
        // If no error and we have user data, return it
        if (user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null

      },
    }),
    // ...add more providers here
  ],
  secret: process.env.ACCESS_TOKEN_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("token : " + token + "user : " + user + "account : " + account)
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          accessTokenExp: user.accessTokenExp,
          refreshToken: user.refreshToken,
          userId: user.userId,
          email: user.email,
          role: user.role
        };
      }
      console.log("accesstoken expiry : ", token.accessTokenExp)
      if ((token.accessTokenExp * 1000) > Date.now()) {
        //console.log("inside accesstoken Exp check if")
        return token;
      }
      const updatedToken = await refreshAccessToken(token);

      return updatedToken;

    },


    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.userId = token.userId;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.accessTokenExp = token.accessTokenExp;
      session.error = token.error;
      //console.log("nextAuth session : ", session)
      return session;
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/vercel.svg', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
});

async function refreshAccessToken(token) {
  try {

    const response = await axios.post(`${baseURL}api/user/refresh_token`, {
      "refreshToken": token.refreshToken
    }, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log("inside refresh token function call 2")
    console.log("fetch refresh token response : ", response.data)
    let decodeData = jwt.decode(response.data.token);
    console.log("decodedata exp : ", decodeData.exp)

    const updatedToken = {
      ...token,
      accessToken: response.data.token,
      accessTokenExp: decodeData.exp,
      refreshToken: response.data.refreshtoken ?? token.refreshToken, // Fall back to old refresh token
    };
    return updatedToken;
  } catch (error) {
    console.error('RefreshAccessTokenError', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
