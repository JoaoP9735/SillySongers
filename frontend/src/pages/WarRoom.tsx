import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Swords, BarChart3, Scroll, Skull, Shield, Crown } from "lucide-react";
import warRoom from "@/assets/war-room.jpg";

const WarRoom = () => {
  const navigate = useNavigate();
  
  // Mock data
  const currentUser = {
    nickname: "Sir Galahad the Mage",
    level: 3,
    xp: 100,
    xpToNextLevel: 400,
    rank: "Mage Circle III"
  };

  const guildMembers = [
    { name: "Lady Morgana", level: 5, xp: 450 },
    { name: "Sir Galahad the Mage", level: 3, xp: 100 },
    { name: "Wizard Merlin", level: 7, xp: 820 },
    { name: "Knight Arthur", level: 4, xp: 320 },
  ];

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: `url(${warRoom})` }}
      />
      <div className="absolute inset-0 bg-background/85 -z-10" />
      
      {/* Background */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-10" />
      
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="stone" 
            size="sm"
            onClick={() => navigate("/my-rooms")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Ledger
          </Button>
          
          <div className="parchment-texture px-6 py-2 rounded-lg border-2 border-amber-800">
            <p className="text-primary-foreground font-bold">Dragon Slayers Guild</p>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-foreground tracking-wide">The War Room</h1>
          <p className="text-xl text-muted-foreground">Plan your quests and strategize victory</p>
        </div>

        {/* Player Status */}
        <Card className="stone-texture p-6 border-2 border-primary">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center border-4 border-border shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{currentUser.nickname}</h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Crown className="w-4 h-4 text-primary" />
                    {currentUser.rank}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">Level {currentUser.level}</p>
                </div>
              </div>
              
              {/* XP Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Experience Points</span>
                  <span className="font-semibold text-accent">{currentUser.xp} / {currentUser.xpToNextLevel} XP</span>
                </div>
                <Progress 
                  value={(currentUser.xp / currentUser.xpToNextLevel) * 100} 
                  className="h-3 bg-muted"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Action Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Embark on Quest */}
          <Card 
            className="stone-texture p-6 border-2 border-border hover:border-accent cursor-pointer transition-all hover:scale-105 group"
            onClick={() => navigate("/quest")}
          >
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <Swords className="w-7 h-7 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Embark on Quest</h3>
                <p className="text-xs text-muted-foreground">Start Pomodoro</p>
              </div>
            </div>
          </Card>

          {/* Guild Records */}
          <Card 
            className="stone-texture p-6 border-2 border-border hover:border-[hsl(var(--xp-bar))] cursor-pointer transition-all hover:scale-105 group"
            onClick={() => navigate("/statistics")}
          >
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-[hsl(var(--xp-bar))]/20 flex items-center justify-center group-hover:bg-[hsl(var(--xp-bar))]/30 transition-colors">
                  <BarChart3 className="w-7 h-7 text-[hsl(var(--xp-bar))]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Guild Records</h3>
                <p className="text-xs text-muted-foreground">Statistics</p>
              </div>
            </div>
          </Card>

          {/* Scrolls Archive */}
          <Card 
            className="stone-texture p-6 border-2 border-border hover:border-primary cursor-pointer transition-all hover:scale-105 group"
            onClick={() => navigate("/files")}
          >
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Scroll className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Scrolls Archive</h3>
                <p className="text-xs text-muted-foreground">Shared Files</p>
              </div>
            </div>
          </Card>

          {/* Beasts & Bosses */}
          <Card 
            className="stone-texture p-6 border-2 border-border hover:border-destructive cursor-pointer transition-all hover:scale-105 group"
            onClick={() => navigate("/bosses")}
          >
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center group-hover:bg-destructive/30 transition-colors">
                  <Skull className="w-7 h-7 text-destructive" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Beasts & Bosses</h3>
                <p className="text-xs text-muted-foreground">Challenges</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Guild Members */}
        <Card className="stone-texture p-6 border-2 border-border">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Guild Members
          </h3>
          <div className="space-y-3">
            {guildMembers.sort((a, b) => b.xp - a.xp).map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-muted-foreground w-8">{index + 1}</span>
                  <div>
                    <p className="font-semibold text-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">Level {member.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-accent">{member.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WarRoom;
