import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/src/contexts/auth.context";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>{children}</AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
