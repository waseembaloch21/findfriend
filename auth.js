import { connectDB } from "@/lib/db/connectDB";
import { UserModal } from "@/lib/models/User";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handleUser = async (profile) => {
  await connectDB();
  const user = await UserModal.findOne({ email: profile.email });
  if (user) return user;
  let newUser = new UserModal({
    fullname: profile.name,
    email: profile.email,
    profileImg: profile.picture,
  });
  newUser = await newUser.save();
  return newUser;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile || !profile.email) {
        console.error("Profile or email missing in sign-in callback");
        return false; // Prevent sign-in
      }
      const user = await handleUser(profile);
      profile.role = user.role;
      profile._id = user._id;
      return true;
    },
    async jwt({ token, account, profile, user }) {
      if (profile) {
        token._id = profile._id;
        token.role = profile.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      return session;
    },
  },
  
});