import AuthForm from "./form";

export default function AuthPage() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4">
      <h1>Auth</h1>
      <AuthForm />
    </main>
  );
}
