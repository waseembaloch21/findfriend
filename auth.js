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
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      const user = await handleUser(profile);

      profile.role = user.role;
      profile._id = user._id;
      return true
    },
    async jwt({ token, user, profile, account }) {
      console.log("profile=>", profile);
      if (user) {
        token._id = profile._id;
        token.role = profile.role;
      }
      return token;
    },
    session({ session, token }) {
      console.log("session data=>", token);
      session.user.id = token.id;
      session.user._id = token._id;
      session.user.role = token.role;
      return session;
    },
  },
});