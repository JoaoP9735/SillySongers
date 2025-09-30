import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DoorOpen, Key, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (roomCode.length < 6) {
      toast({
        title: "The Runes Reject You ⚡",
        description: "The Guild Sigil must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    // Mock success
    toast({
      title: "The Doorway Opens ✨",
      description: "Welcome to the Guildhall!",
    });

    setTimeout(() => {
      navigate("/war-room");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Magical glow effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-20 animate-pulse" />
      
      <div className="w-full max-w-lg space-y-8">
        {/* Return Button */}
        <Button 
          variant="stone" 
          size="sm"
          onClick={() => navigate("/training-grounds")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Yard
        </Button>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <DoorOpen className="w-24 h-24 text-accent" strokeWidth={1.5} />
              <div className="absolute -top-2 -right-2">
                <Key className="w-10 h-10 text-primary torch-glow" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-wider">Guildhall Entrance</h1>
          <p className="text-muted-foreground text-lg">Enter the Guild Sigil to unlock the door</p>
        </div>

        {/* Join Form - The Magical Lock */}
        <form onSubmit={handleJoin} className="space-y-6">
          <div className="stone-texture p-10 rounded-lg border-4 border-border shadow-[0_0_50px_rgba(251,191,36,0.2)] space-y-6">
            {/* Decorative elements */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="w-2 h-16 bg-gradient-to-b from-primary to-transparent rounded-full" />
              <Sparkles className="w-8 h-8 text-accent animate-pulse" />
              <div className="w-2 h-16 bg-gradient-to-b from-primary to-transparent rounded-full" />
            </div>

            {/* Room Code Input */}
            <div className="space-y-3">
              <Label htmlFor="roomCode" className="flex items-center gap-2 text-foreground font-bold text-lg justify-center">
                <Key className="w-5 h-5 text-primary" />
                Guild Sigil
              </Label>
              <Input
                id="roomCode"
                type="text"
                placeholder="DRAGON-KNIGHTS-2024"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                required
                className="bg-card border-2 border-primary/50 text-foreground text-center text-xl font-mono tracking-wider h-14 focus:border-primary focus:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              />
              <p className="text-xs text-muted-foreground text-center">
                The ancient runes must be at least 6 characters long
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="gate" size="lg" className="w-full gap-2 mt-8">
              <DoorOpen className="w-5 h-5" />
              Enter the Guildhall
            </Button>
          </div>
        </form>

        {/* Decorative bottom */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground italic">
            Only those who possess the sigil may enter
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
