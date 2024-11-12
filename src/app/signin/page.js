import { signIn } from "../../../auth"

 
export default function SignIn() {
  return (
    <div className="min-h-screen flex justify-center items-center">
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button  className="text-white bg-black border-0 py-2 px-6 focus:outline-none  rounded text-lg" type="submit">Signin with Google</button>
    </form>
    </div>
  )
} 