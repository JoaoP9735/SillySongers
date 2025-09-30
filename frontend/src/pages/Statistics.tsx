import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Target, Clock, Shield, Crown, Flame } from "lucide-react";

const Statistics = () => {
  const navigate = useNavigate();
  
  // Mock statistics data
  const guildStats = {
    totalQuests: 156,
    totalHours: 78,
    averageLevel: 5.5,
  };

  const members = [
    { name: "Wizard Merlin", level: 7, xp: 820, quests: 45, hours: 22.5, rank: 1 },
    { name: "Lady Morgana", level: 5, xp: 450, quests: 38, hours: 19, rank: 2 },
    { name: "Knight Arthur", level: 4, xp: 320, quests: 35, hours: 17.5, rank: 3 },
    { name: "Sir Galahad the Mage", level: 3, xp: 100, quests: 21, hours: 10.5, rank: 4 },
    { name: "Rogue Shadow", level: 6, xp: 600, quests: 17, hours: 8.5, rank: 5 },
  ];

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background -z-10" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-[hsl(var(--xp-bar))] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-6xl mx-auto space-y-8">
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
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Trophy className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-bold text-foreground tracking-wide">Guild Records</h1>
          <p className="text-xl text-muted-foreground">Chronicles of valor and dedication</p>
        </div>

        {/* Overall Guild Stats */}
        <Card className="stone-texture p-8 border-2 border-primary">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
            <Flame className="w-6 h-6 text-accent" />
            Guild Achievements
            <Flame className="w-6 h-6 text-accent" />
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <Target className="w-12 h-12 text-accent mx-auto" />
              <p className="text-4xl font-bold text-foreground">{guildStats.totalQuests}</p>
              <p className="text-muted-foreground">Quests Completed</p>
            </div>
            <div className="text-center space-y-2">
              <Clock className="w-12 h-12 text-[hsl(var(--xp-bar))] mx-auto" />
              <p className="text-4xl font-bold text-foreground">{guildStats.totalHours}h</p>
              <p className="text-muted-foreground">Training Hours</p>
            </div>
            <div className="text-center space-y-2">
              <Shield className="w-12 h-12 text-primary mx-auto" />
              <p className="text-4xl font-bold text-foreground">{guildStats.averageLevel}</p>
              <p className="text-muted-foreground">Average Level</p>
            </div>
          </div>
        </Card>

        {/* Ranking Board */}
        <Card className="stone-texture p-6 border-2 border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Crown className="w-6 h-6 text-primary" />
            Leaderboard - Guild Banners
          </h2>
          
          <div className="space-y-4">
            {members.map((member) => (
              <div 
                key={member.rank}
                className={`p-5 rounded-lg border-2 transition-all ${
                  member.rank === 1 
                    ? 'bg-gradient-to-r from-amber-600/20 to-amber-800/20 border-amber-600' 
                    : member.rank === 2
                    ? 'bg-gradient-to-r from-gray-400/20 to-gray-600/20 border-gray-400'
                    : member.rank === 3
                    ? 'bg-gradient-to-r from-amber-700/20 to-amber-900/20 border-amber-700'
                    : 'bg-card border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2 ${
                      member.rank === 1 
                        ? 'bg-amber-600 border-amber-400 text-white' 
                        : member.rank === 2
                        ? 'bg-gray-400 border-gray-300 text-white'
                        : member.rank === 3
                        ? 'bg-amber-700 border-amber-600 text-white'
                        : 'bg-muted border-border text-muted-foreground'
                    }`}>
                      {member.rank === 1 && <Crown className="w-6 h-6" />}
                      {member.rank !== 1 && member.rank}
                    </div>

                    {/* Member Info */}
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">Level {member.level} • {member.xp} XP</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8 text-right">
                    <div>
                      <p className="text-2xl font-bold text-accent">{member.quests}</p>
                      <p className="text-xs text-muted-foreground">Quests</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[hsl(var(--xp-bar))]">{member.hours}h</p>
                      <p className="text-xs text-muted-foreground">Hours</p>
                    </div>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress to Next Level</span>
                    <span>{member.xp % 200} / 200 XP</span>
                  </div>
                  <Progress 
                    value={((member.xp % 200) / 200) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Bottom decoration */}
        <div className="text-center pt-4">
          <div className="inline-block parchment-texture px-6 py-3 rounded-lg border-2 border-amber-800">
            <p className="text-primary-foreground font-semibold text-sm">
              🏆 "The Guild has completed {guildStats.totalQuests} quests"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
