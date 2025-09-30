import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Swords, Hourglass, Play, Pause, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Quest = () => {
  const navigate = useNavigate();
  const [studyDuration, setStudyDuration] = useState([25]);
  const [shortBreak, setShortBreak] = useState([5]);
  const [longBreak, setLongBreak] = useState([15]);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [currentPhase, setCurrentPhase] = useState<"study" | "short" | "long">("study");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (!isActive) {
      toast({
        title: "Quest Begins! ⚔️",
        description: "May focus be your weapon and discipline your shield.",
      });
    }
    setIsActive(!isActive);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(studyDuration[0] * 60);
    setCurrentPhase("study");
    toast({
      title: "Quest Abandoned",
      description: "Return when you're ready to resume your training.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-destructive/10 -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-20" />
      
      <div className="max-w-4xl mx-auto space-y-8">
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
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Swords className="w-20 h-20 text-accent" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-bold text-foreground tracking-wide">The Quest Arena</h1>
          <p className="text-xl text-muted-foreground">Prepare for battle with focused training</p>
        </div>

        {/* Timer Display */}
        {isActive && (
          <Card className="stone-texture p-12 border-4 border-accent text-center">
            <div className="space-y-6">
              <div className="flex justify-center">
                <Hourglass className="w-16 h-16 text-accent animate-pulse" />
              </div>
              <div className="text-8xl font-bold text-foreground tracking-wider">
                {formatTime(timeLeft)}
              </div>
              <div className="text-2xl text-accent font-semibold uppercase tracking-widest">
                {currentPhase === "study" ? "Training in Progress" : 
                 currentPhase === "short" ? "Short Rest" : "Long Rest"}
              </div>
              <div className="flex gap-4 justify-center pt-4">
                <Button variant="gate" size="lg" onClick={handleStart} className="gap-2">
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isActive ? "Pause" : "Resume"}
                </Button>
                <Button variant="destructive" size="lg" onClick={handleStop} className="gap-2">
                  <X className="w-5 h-5" />
                  Stop Quest
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Configuration (shown when not active) */}
        {!isActive && (
          <Card className="stone-texture p-8 border-2 border-border space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Configure Your Quest</h2>
              <p className="text-muted-foreground">Adjust the gemstones to set your training duration</p>
            </div>

            {/* Study Duration */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-foreground">Study Duration</Label>
                <div className="parchment-texture px-4 py-2 rounded-lg border-2 border-amber-800">
                  <span className="text-primary-foreground font-bold">{studyDuration[0]} minutes</span>
                </div>
              </div>
              <Slider
                value={studyDuration}
                onValueChange={setStudyDuration}
                min={15}
                max={60}
                step={5}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground text-center">Large sand timer (15-60 minutes)</p>
            </div>

            {/* Short Break */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-foreground">Short Interval</Label>
                <div className="parchment-texture px-4 py-2 rounded-lg border-2 border-amber-800">
                  <span className="text-primary-foreground font-bold">{shortBreak[0]} minutes</span>
                </div>
              </div>
              <Slider
                value={shortBreak}
                onValueChange={setShortBreak}
                min={3}
                max={10}
                step={1}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground text-center">Tiny sand timer (3-10 minutes)</p>
            </div>

            {/* Long Break */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-foreground">Long Interval</Label>
                <div className="parchment-texture px-4 py-2 rounded-lg border-2 border-amber-800">
                  <span className="text-primary-foreground font-bold">{longBreak[0]} minutes</span>
                </div>
              </div>
              <Slider
                value={longBreak}
                onValueChange={setLongBreak}
                min={15}
                max={30}
                step={5}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground text-center">Large sand timer (15-30 minutes)</p>
            </div>

            {/* Start Button */}
            <Button variant="gate" size="lg" onClick={handleStart} className="w-full gap-2 mt-6">
              <Play className="w-5 h-5" />
              Begin the Quest
            </Button>
          </Card>
        )}

        {/* Bottom Info */}
        <div className="text-center">
          <div className="inline-block parchment-texture px-6 py-3 rounded-lg border-2 border-amber-800">
            <p className="text-primary-foreground font-semibold text-sm">
              ⚔️ Focus yields experience. Consistency forges champions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Label component since we're using it
const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default Quest;
