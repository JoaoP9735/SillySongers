// frontend/src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Mail, Lock, Flame } from "lucide-react";
import castleGates from "@/assets/castle-gates.jpg";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Em um app real, você salvaria o token de forma segura
        // Por exemplo: localStorage.setItem('authToken', data.token);
        console.log("Login successful:", data);
        
        toast({
          title: "Portões Abertos!",
          description: "Bem-vindo de volta, nobre guerreiro.",
        });

        navigate("/training-grounds");

      } else {
        const errorData = await response.json();
        toast({
          title: "Credenciais Inválidas",
          description: errorData.error || "Seu juramento não foi reconhecido.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "A conexão falhou",
        description: "Não foi possível se conectar aos servidores da Guilda.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: `url(${castleGates})` }}
      />
      <div className="absolute inset-0 bg-background/70 -z-10" />
      
      {/* Torch glow effects */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[hsl(30,100%,50%)] rounded-full blur-[100px] opacity-30 torch-glow" />
      <div className="absolute top-20 right-10 w-32 h-32 bg-[hsl(30,100%,50%)] rounded-full blur-[100px] opacity-30 torch-glow" />
      
      <div className="w-full max-w-md space-y-8">
        {/* Castle Gates Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Shield className="w-24 h-24 text-primary" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-8 h-8 text-accent torch-glow" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-wider">The Castle Gates</h1>
          <p className="text-muted-foreground">Enter your credentials to pass through</p>
        </div>

        {/* Login Form - The Seal */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="stone-texture p-8 rounded-lg border-2 border-border space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-foreground font-semibold">
                <Mail className="w-4 h-4" />
                Email (Engraved Scroll)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@guild.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2 text-foreground font-semibold">
                <Lock className="w-4 h-4" />
                Password (Sacred Lock)
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-card border-border text-foreground"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button type="submit" variant="gate" size="lg" className="w-full">
                Enter the Keep
              </Button>
              <Button 
                type="button" 
                variant="parchment" 
                size="lg" 
                className="w-full"
                onClick={() => navigate("/register")}
              >
                Swear the Oath
              </Button>
            </div>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-8 opacity-50">
          <Flame className="w-6 h-6 text-accent torch-glow" />
          <Flame className="w-6 h-6 text-accent torch-glow" />
          <Flame className="w-6 h-6 text-accent torch-glow" />
        </div>
      </div>
    </div>
  );
};

export default Login;