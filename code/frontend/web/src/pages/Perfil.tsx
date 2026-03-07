import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

const Perfil = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold tracking-tight mb-1">PERFIL</h1>
      <p className="text-xs font-mono text-muted-foreground tracking-wider mb-8">
        GERENCIE SEUS DADOS PESSOAIS
      </p>

      <div className="border border-border divide-y divide-border">
        {/* Avatar */}
        <div className="p-6 flex items-center gap-4">
          <div className="h-16 w-16 bg-muted flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-mono text-xs tracking-wider font-semibold">
              {user?.email?.split("@")[0]?.toUpperCase() ?? "USUÁRIO"}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-wider">
              {user?.email ?? ""}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="font-mono text-[10px] tracking-widest text-muted-foreground block mb-2">
              NOME DE EXIBIÇÃO
            </label>
            <Input
              className="rounded-none font-mono text-xs"
              placeholder="Seu nome"
              defaultValue={user?.email?.split("@")[0] ?? ""}
            />
          </div>

          <div>
            <label className="font-mono text-[10px] tracking-widest text-muted-foreground block mb-2">
              EMAIL
            </label>
            <Input
              className="rounded-none font-mono text-xs"
              value={user?.email ?? ""}
              disabled
            />
          </div>

          <Button className="rounded-none font-mono text-xs tracking-wider w-full">
            SALVAR ALTERAÇÕES
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
