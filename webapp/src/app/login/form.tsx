"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextBox } from "@/components/textbox";
import { Button } from "@/components/button";
import { User } from "@/schemas";
import { Password } from "@/components/password";
import { withResponse } from "@/api";
import { registerNewUserWithPassword } from "@/app/register/page";

type FormData = z.infer<typeof User>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    resolver: zodResolver(User),
    mode: "all",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    await withResponse(() => registerNewUserWithPassword(data), {
      onStart: () => setLoading(true),
      onComplete: () => setLoading(false),
      onError: (error) => setError(error),
      onFailure: (error) => setError(error),
      onSuccess: () => router.push("/login"),
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href="/"
          className="inline-flex flex-col items-center mb-8 text-xl text-gray-900 dark:text-white"
        >
          <Image
            src="/images/icon-512x512.png"
            className="w-8 h-8 mb-2"
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
            Welcome back.
          </h1>
          <p className="text-md font-light text-gray-500 dark:text-gray-300">
            Log in to your account. Don&#8216;t have one?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Create one now
            </Link>
            .
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 space-y-6 sm:mt-6"
          >
            <div className="grid gap-3 sm:grid-cols-1">
              <TextBox
                type="text"
                label="Email address"
                placeholder="alex@example.com"
                message={errors?.email?.message}
                isErrored={!!errors.email}
                isSuccess={touchedFields.email && !errors.email}
                {...register("email")}
              />
              <Password
                label="Password"
                placeholder="********"
                message={errors?.password?.message}
                isErrored={!!errors.password}
                isSuccess={touchedFields.password && !errors.password}
                {...register("password")}
              />
              <Button type="submit" theme="primary" isLoading={loading}>
                Create your Account
              </Button>
              {error && <p className="text-red-700">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
