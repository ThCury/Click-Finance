import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { LogIn, UserPlus, Mail } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) setError(error.message);
      else setMessage("Verifique seu email para confirmar o cadastro.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error.message || "Erro ao entrar com Google");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-display font-bold tracking-tight">CARTEIRA</h1>
          <p className="text-xs font-mono text-muted-foreground tracking-widest mt-2">
            GERENCIADOR DE INVESTIMENTOS
          </p>
        </div>

        {/* Card */}
        <div className="border border-border bg-card p-8">
          <h2 className="text-xs font-mono tracking-widest text-muted-foreground mb-6">
            {isLogin ? "ENTRAR" : "CRIAR CONTA"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-mono tracking-wider">EMAIL</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="rounded-none font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-mono tracking-wider">SENHA</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="rounded-none font-mono text-sm"
              />
            </div>

            {error && (
              <p className="text-xs font-mono text-destructive">{error}</p>
            )}
            {message && (
              <p className="text-xs font-mono text-success">{message}</p>
            )}

            <Button
              type="submit"
              className="w-full rounded-none font-mono text-xs tracking-wider"
              disabled={loading}
            >
              {isLogin ? (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  ENTRAR
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  CRIAR CONTA
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-border" />
            <span className="px-3 text-xs font-mono text-muted-foreground">OU</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Google */}
          <Button
            variant="outline"
            className="w-full rounded-none font-mono text-xs tracking-wider"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Mail className="h-4 w-4 mr-2" />
            ENTRAR COM GOOGLE
          </Button>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors tracking-wider"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setMessage(null);
              }}
            >
              {isLogin ? "NÃO TEM CONTA? CRIAR" : "JÁ TEM CONTA? ENTRAR"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs font-mono text-muted-foreground mt-6 tracking-wider">
          SEUS DADOS ESTÃO SEGUROS
        </p>
      </div>
    </div>
  );
};

export default Auth;
