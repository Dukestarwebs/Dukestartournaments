"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Code2, Rocket } from "lucide-react";

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const { loginAs } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      setTimeout(() => {
        if (email.includes("admin")) {
          loginAs("admin");
        } else {
          loginAs("user");
        }
      }, 800);
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-base-primary)]">
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-1 flex-col justify-center items-start p-12 lg:p-24 border-r border-[var(--color-border-default)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-deep)]/20 to-transparent z-0" />
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-3">
            <Trophy className="w-12 h-12 text-[var(--color-comp-orange)]" />
            <h1 className="text-4xl lg:text-6xl font-display font-bold tracking-tight text-white">
              Dukestar<br />
              <span className="text-[var(--color-accent-bright)]">Tournaments</span>
            </h1>
          </div>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-md">
            The premium competitive platform for developers. Build real applications, compete in tournaments, and win real payouts.
          </p>
          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-base-secondary)] flex items-center justify-center border border-[var(--color-border-default)]">
                <Code2 className="w-6 h-6 text-[var(--color-accent-bright)]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Build with AI</h3>
                <p className="text-sm">Use Google AI Studio & Netlify</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-base-secondary)] flex items-center justify-center border border-[var(--color-border-default)]">
                <Rocket className="w-6 h-6 text-[var(--color-comp-orange)]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Real Payouts</h3>
                <p className="text-sm">Instant rewards via Julypay</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <Card className="w-full max-w-md border-[var(--color-accent-deep)]/50 shadow-[0_0_30px_rgba(31,60,136,0.15)]">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              {isLogin ? "Enter the Arena" : "Join the Competition"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? "Login to access your dashboard" : "Create your developer profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-[var(--color-comp-red)]/10 border border-[var(--color-comp-red)]/50 text-[var(--color-comp-red)] rounded-md">
                  {error}
                </div>
              )}
              
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        placeholder="dev_ninja" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={!isLogin}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nickname">Nickname</Label>
                      <Input 
                        id="nickname" 
                        placeholder="Ninja" 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      placeholder="John Doe" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Julypay)</Label>
                    <Input 
                      id="phone" 
                      placeholder="256701234567" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-[var(--color-text-muted)]">
                  Hint: Use any email with &quot;admin&quot; to login as Admin. Otherwise, you login as User.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {isLogin && (
                    <a href="#" className="text-xs text-[var(--color-accent-bright)] hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full mt-6 bg-[var(--color-comp-orange)] hover:bg-[var(--color-comp-highlight)] text-white font-bold text-lg h-12 shadow-[0_0_15px_rgba(245,124,0,0.4)] transition-all hover:shadow-[0_0_25px_rgba(255,167,38,0.6)]"
                disabled={loading}
              >
                {loading ? "Processing..." : (isLogin ? "LOGIN" : "REGISTER")}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
              {isLogin ? "Don't have an account? " : "Already in the arena? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[var(--color-accent-bright)] hover:text-white transition-colors font-semibold"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
