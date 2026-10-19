import { SignIn } from "@clerk/nextjs";
import { DemoAuthCard } from "@/components/demo-auth-card";
import { isDemoMode } from "@/lib/demo-mode";

export default function SignInPage() {
  if (isDemoMode()) return <DemoAuthCard mode="sign-in" />;
  return <SignIn fallbackRedirectUrl="/" />;
}
