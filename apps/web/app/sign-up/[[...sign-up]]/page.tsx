import { SignUp } from "@clerk/nextjs";
import { DemoAuthCard } from "@/components/demo-auth-card";
import { isDemoMode } from "@/lib/demo-mode";

export const dynamic = "force-dynamic";

export default function SignUpPage() {
  if (isDemoMode()) return <DemoAuthCard mode="sign-up" />;
  return <SignUp fallbackRedirectUrl="/" />;
}
