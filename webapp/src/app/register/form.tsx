"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerWithPassword } from "@/repositories/users";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .regex(/[a-z]/i, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one digit"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await registerWithPassword(data.email, data.password);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="inline-flex items-center mb-8 text-xl text-gray-900 dark:text-white"
        >
          <Image
            src="/images/icon-512x512.png"
            className="w-8 h-8 mr-2"
            alt="Curious Programmer Logo"
            width={512}
            height={512}
          />
          <div className="inline-flex">
            {"{"}
            &nbsp;Curious&nbsp;<strong className="font-black">Surveys</strong>
            &nbsp;
            {"}"}
          </div>
        </Link>
        <div className="w-full p-6 mx-auto bg-white rounded-lg shadow dark:bg-gray-800 sm:max-w-xl lg:col-span-6 sm:p-8">
          <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Create your Account
          </h1>
          <p className="text-md font-light text-gray-500 dark:text-gray-300">
            Create your account in seconds. Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
            .
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 space-y-6 sm:mt-6"
          >
            <div className="grid gap-6 sm:grid-cols-1">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email address
                <input
                  type="email"
                  placeholder="alex@example.com"
                  {...register("email")}
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-700">{errors.email.message}</p>
                )}
              </label>

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Full name
                <input
                  type="text"
                  {...register("fullName")}
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName.message}</p>
                )}
              </label>

              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
                <input
                  type="text"
                  {...register("password")}
                  className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </label>

              <button
                type="submit"
                className="flex justify-center items-center w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}
              >
                {loading && (
                  <div>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="hidden">Thinking...</span>
                  </div>
                )}
                Create your Account
              </button>
              {error && <p className="text-red-700">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
