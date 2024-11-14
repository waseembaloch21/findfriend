import { connectDB } from "@/lib/db/connectDB"
import { UserModal } from "@/lib/models/User"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const handleUser = async (profile) => {
    await connectDB()
    const user = await UserModal.findOne({email: profile.email})
    if(user) return user;
    let newUser = new UserModal({
      fullname: profile.name,
    email: profile.email,
    profileImg: profile.picture,
    });
    newUser = await newUser.save();
    return newUser;
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [ Google ],
  callbacks: {
    async signIn({ account, profile }) {
      const user = await handleUser(profile);

      console.log("user.role==>",user.role);
      return { ...profile, role: user.role };

      // if (account.provider === "google") {
      //   return profile.email_verified && profile.email.endsWith("@example.com")
      // }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
     async jwt({ token, user }) {
      
      const userFromDB = await handleUser(token);
      console.log("userFromDB==>",userFromDB);
      
      if (user) { 
        // User is available during sign-in
        token._id = userFromDB._id;
        token.role = userFromDB.role;
      }
      return token;
    },

    session({ session, token }) {
      console.log("session==>",session );
      session.user.id = token.id;
      session.user._id = token._id;
      session.user.role = token.role;
      return session
    },
  },
})