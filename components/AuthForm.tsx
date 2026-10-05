"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "@/components/FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signUp } from "@/lib/actions/auth.action"
import { signIn } from "@/lib/actions/auth.action"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSignIn = type === 'sign-in'; // ✅ Moved here so it's usable below

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success('Account created successfully. Please sign in.');
        router.push('/sign-in');
      } else {
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error('Sign in failed');
          return;
        }

        await signIn({ email, idToken });

        toast.success('Sign in successful');
        router.push('/');
      }
    } catch (error: any) {
      console.error(error);

      let message = "You have entered wrong email or password, please try again!";

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        message = "Incorrect email or password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        message = "The email address format is invalid.";
      } else if (error.code === "auth/email-already-in-use") {
        message = "This email is already in use. Please sign in instead.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Too many attempts. Please wait a moment before trying again.";
      }

      toast.error(message);
    }
  }

  return (
    <div className="card-border lg:min-2-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-red-500">PrepPath</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Please Sign In" : "Please Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
