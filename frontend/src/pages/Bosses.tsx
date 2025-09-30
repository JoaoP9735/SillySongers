import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Skull, Plus, Trash2, Calendar, Flame, Swords } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Boss {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme";
  deadline: string;
  totalHP: number;
  currentHP: number;
  contributions: { member: string; damage: number }[];
}

const Bosses = () => {
  const navigate = useNavigate();
  
  // Mock bosses data
  const [bosses, setBosses] = useState<Boss[]>([
    {
      id: 1,
      name: "Ancient Dragon of Calculus",
      difficulty: "Extreme",
      deadline: "2024-02-15",
      totalHP: 100,
      currentHP: 45,
      contributions: [
        { member: "Wizard Merlin", damage: 25 },
        { member: "Lady Morgana", damage: 18 },
        { member: "Knight Arthur", damage: 12 },
      ]
    },
    {
      id: 2,
      name: "Goblin of Grammar",
      difficulty: "Easy",
      deadline: "2024-01-25",
      totalHP: 20,
      currentHP: 8,
      contributions: [
        { member: "Sir Galahad", damage: 8 },
        { member: "Rogue Shadow", damage: 4 },
      ]
    },
    {
      id: 3,
      name: "Ogre of Organic Chemistry",
      difficulty: "Hard",
      deadline: "2024-02-01",
      totalHP: 60,
      currentHP: 35,
      contributions: [
        { member: "Wizard Merlin", damage: 15 },
        { member: "Lady Morgana", damage: 10 },
      ]
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "from-green-600 to-emerald-600";
      case "Medium":
        return "from-yellow-600 to-amber-600";
      case "Hard":
        return "from-orange-600 to-red-600";
      case "Extreme":
        return "from-red-600 to-purple-600";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "🐺 Goblin";
      case "Medium":
        return "👹 Ogre";
      case "Hard":
        return "🐉 Dragon";
      case "Extreme":
        return "⚔️ Ancient Titan";
      default:
        return "👾";
    }
  };

  const handleAddBoss = () => {
    toast({
      title: "Beast Summoned! 🐉",
      description: "A new challenge has been added to the dungeon.",
    });
  };

  const handleSlayBoss = (id: number) => {
    setBosses(bosses.filter(b => b.id !== id));
    toast({
      title: "Beast Slain! ⚔️",
      description: "The creature has been vanquished. Glory to the guild!",
    });
  };

  const getHPPercentage = (boss: Boss) => {
    return ((boss.totalHP - boss.currentHP) / boss.totalHP) * 100;
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/5 to-background -z-10" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-destructive rounded-full blur-[120px] opacity-20" />
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="stone" 
            size="sm"
            onClick={() => navigate("/war-room")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to War Room
          </Button>

          <Button variant="destructive" size="sm" onClick={handleAddBoss} className="gap-2">
            <Plus className="w-4 h-4" />
            Summon Beast
          </Button>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Skull className="w-16 h-16 text-destructive" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-bold text-foreground tracking-wide">Beasts & Bosses</h1>
          <p className="text-xl text-muted-foreground">Face the dungeon's most fearsome challenges</p>
        </div>

        {/* Bosses List */}
        {bosses.length === 0 ? (
          <Card className="stone-texture p-16 border-2 border-border text-center">
            <Skull className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground mb-4">No beasts to slay... yet</p>
            <Button variant="destructive" onClick={handleAddBoss} className="gap-2">
              <Plus className="w-4 h-4" />
              Summon Your First Beast
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bosses.map((boss) => (
              <Card 
                key={boss.id}
                className="stone-texture p-6 border-2 border-destructive/50 hover:border-destructive transition-all"
              >
                <div className="space-y-4">
                  {/* Boss Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* Boss Icon */}
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getDifficultyColor(boss.difficulty)} flex items-center justify-center border-2 border-destructive shadow-lg`}>
                        <Skull className="w-8 h-8 text-white" />
                      </div>

                      {/* Boss Info */}
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">{boss.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4" />
                            {getDifficultyIcon(boss.difficulty)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {new Date(boss.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleSlayBoss(boss.id)}
                      title="Slay Beast"
                      className="hover:bg-destructive/20"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>

                  {/* HP Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-semibold flex items-center gap-2">
                        <Swords className="w-4 h-4 text-destructive" />
                        Beast's Remaining Strength
                      </span>
                      <span className="text-destructive font-bold">
                        {boss.currentHP} / {boss.totalHP} HP
                      </span>
                    </div>
                    <Progress 
                      value={getHPPercentage(boss)} 
                      className="h-4 bg-muted"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {Math.round(getHPPercentage(boss))}% HP reduced by guild efforts
                    </p>
                  </div>

                  {/* Contributions */}
                  <div className="space-y-2 pt-2">
                    <p className="text-sm font-semibold text-foreground">Guild Contributions:</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {boss.contributions.map((contrib, idx) => (
                        <div key={idx} className="bg-card p-2 rounded border border-border">
                          <p className="text-xs text-muted-foreground">{contrib.member}</p>
                          <p className="text-sm font-bold text-accent">{contrib.damage} strikes dealt</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Info */}
        <div className="text-center">
          <div className="inline-block parchment-texture px-6 py-3 rounded-lg border-2 border-amber-800">
            <p className="text-primary-foreground font-semibold text-sm">
              ⚔️ {bosses.length} Beast{bosses.length !== 1 ? 's' : ''} in Dungeon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bosses;
