import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  const brandLogo = process.env.NEXT_PUBLIC_BRAND_LOGO
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-w-md w-full p-8 flex flex-col items-center">
        {/* Optional Logo */}
        <div className="mb-6">
          <Image src={`/images/${brandLogo}`} alt="Logo" className="h-18 w-18 rounded-xl" width="100" height="100" />
        </div>

        {/* Header */}
        <h1 className="text-3xl font-extrabold mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6 text-center">
          Sign in to your account to continue
        </p>

        {/* Clerk SignIn */}
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none w-full",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "border-gray-300 rounded-md hover:bg-gray-50",
              socialButtonsBlockButtonText: "text-gray-700",
              dividerText: "text-gray-400",
              formFieldLabel: "text-gray-700 font-medium",
              formFieldInput: "border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
              formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2",
              footerActionText: "text-gray-500",
              footerActionLink: "text-purple-600 hover:text-purple-800 font-medium"
            }
          }}
        />
      </div>
    </div>
  );
}
