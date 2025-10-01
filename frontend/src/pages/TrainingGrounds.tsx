import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Plus, DoorOpen, Scroll, LogOut, Sword, Flag } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import trainingGrounds from "@/assets/training-grounds.jpg";
import { apiFetch } from "@/lib/api";

const TrainingGrounds = () => {
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [circleName, setCircleName] = useState("");
  
  // Mock user data
  const userName = "Sir Galahad";

  const handleLogout = () => {
    navigate("/");
  };

  const handleCreateCircle = async () => {
    const token = localStorage.getItem("authToken")
    if (!circleName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a circle name",
        variant: "destructive",
      });
      return;
    }
    try {
        const response = await apiFetch('/groups/create/', { // Use o endpoint relativo
    method: "POST",
    body: JSON.stringify({
      nome: circleName
    }),
  });
      if (response.ok) {
        toast({
          title: "O Pacto foi Selado! ✨",
          description: "Seu juramento foi aceito. Bem-vindo à Guilda.",
        });
        setTimeout(() => {
          navigate("/"); // Redireciona para a página de login após o registro
        }, 1500);
      } else {
        const errorData = await response.json();
        // Transforma o objeto de erro em uma string mais legível
        const errorMessage = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('; ');
        
        toast({
          title: "Erro ao selar o pacto",
          description: errorMessage || "Ocorreu um erro. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "A conexão falhou",
        description: "Não foi possível se conectar aos servidores da Guilda. Verifique sua conexão.",
        variant: "destructive",
      });
    }
  };
    

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: `url(${trainingGrounds})` }}
      />
      <div className="absolute inset-0 bg-background/80 -z-10" />
      
      {/* Background effects */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-primary rounded-full blur-[120px] opacity-10" />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with logout */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-border">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{userName}</h1>
                <p className="text-muted-foreground">Knight of the Realm</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="portal" 
            size="icon"
            onClick={handleLogout}
            className="gap-2"
            title="Logoff"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Title */}
        <div className="text-center space-y-2 py-8">
          <h2 className="text-5xl font-bold text-foreground tracking-wide">The Training Grounds</h2>
          <p className="text-xl text-muted-foreground">Choose your path, brave warrior</p>
          <div className="flex justify-center gap-4 pt-4">
            <Sword className="w-6 h-6 text-primary" />
            <Flag className="w-6 h-6 text-accent" />
            <Sword className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Create New Circle */}
          <Card 
            className="stone-texture p-8 border-2 border-border hover:border-primary cursor-pointer transition-all hover:scale-105 group"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Forge New Circle</h3>
                <p className="text-muted-foreground text-sm">Start a new study guild</p>
              </div>
            </div>
          </Card>

          {/* Join Room */}
          <Card 
            className="stone-texture p-8 border-2 border-border hover:border-accent cursor-pointer transition-all hover:scale-105 group"
            onClick={() => navigate("/join-room")}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <DoorOpen className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Enter Guildhall</h3>
                <p className="text-muted-foreground text-sm">Join an existing circle</p>
              </div>
            </div>
          </Card>

          {/* My Rooms */}
          <Card 
            className="stone-texture p-8 border-2 border-border hover:border-[hsl(var(--xp-bar))] cursor-pointer transition-all hover:scale-105 group"
            onClick={() => navigate("/my-rooms")}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--xp-bar))]/20 flex items-center justify-center group-hover:bg-[hsl(var(--xp-bar))]/30 transition-colors">
                  <Scroll className="w-8 h-8 text-[hsl(var(--xp-bar))]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">My Guilds</h3>
                <p className="text-muted-foreground text-sm">View your circles</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Decorative Banner */}
        <div className="text-center pt-8">
          <div className="inline-block parchment-texture px-8 py-4 rounded-lg border-2 border-amber-800">
            <p className="text-primary-foreground font-semibold italic">
              "Through discipline and fellowship, we conquer all challenges"
            </p>
          </div>
        </div>
      </div>

      {/* Create Circle Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="stone-texture">
          <DialogHeader>
            <DialogTitle className="text-2xl text-foreground">Forge New Circle</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Create a new study guild to begin your quest with fellow warriors
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="circleName" className="text-foreground">Circle Name</Label>
              <Input
                id="circleName"
                placeholder="Enter your guild's name..."
                value={circleName}
                onChange={(e) => setCircleName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateCircle()}
                className="parchment-texture"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="stone" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="parchment" onClick={handleCreateCircle}>
              Forge Circle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingGrounds;