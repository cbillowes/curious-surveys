import RegisterForm from "@/app/register/form";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded p-6">
        <RegisterForm />
      </div>
    </div>
  );
}
