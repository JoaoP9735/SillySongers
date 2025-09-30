import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scroll, ArrowLeft, User, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "The Parchment Crumbles",
        description: "Your passwords do not match. Try again, brave soul.",
        variant: "destructive",
      });
      return;
    }

    // Mock registration success
    toast({
      title: "The Pact is Sealed! ✨",
      description: "Your oath has been accepted. Welcome to the Guild.",
    });
    
    setTimeout(() => {
      navigate("/training-grounds");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Magical glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-[120px] opacity-20" />
      
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Scroll className="w-20 h-20 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold text-foreground tracking-wider">Swearing the Oath</h1>
          <p className="text-muted-foreground">Inscribe your name in the Guild's tome</p>
        </div>

        {/* Return Button */}
        <Button 
          variant="stone" 
          size="sm"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Gates
        </Button>

        {/* Registration Form - The Parchment */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="parchment-texture p-8 rounded-lg border-4 border-amber-800 space-y-5 shadow-2xl">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-primary-foreground font-bold">
                <User className="w-4 h-4" />
                Character Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Sir Galahad the Brave"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50 border-amber-800 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-primary-foreground font-bold">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="knight@guild.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50 border-amber-800 text-foreground"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2 text-primary-foreground font-bold">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-background/50 border-amber-800 text-foreground"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-primary-foreground font-bold">
                <Lock className="w-4 h-4" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="bg-background/50 border-amber-800 text-foreground"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="gate" size="lg" className="w-full mt-6 gap-2">
              <Sparkles className="w-4 h-4" />
              Seal the Pact
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
