import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Users, Trophy, ChevronRight } from "lucide-react";
import { apiFetch } from "@/lib/api";

const MyRooms = () => {
  const navigate = useNavigate();
  const [guildList, setRooms] = useState([]);
  // Mock room data
  const mockRooms = [
    {
      id: 1,
      name: "Dragon Slayers Guild",
      members: 5,
      level: 12,
      completedQuests: 156,
      color: "from-red-600 to-orange-600"
    },
    {
      id: 2,
      name: "Mage Academy",
      members: 8,
      level: 8,
      completedQuests: 89,
      color: "from-blue-600 to-purple-600"
    },
    {
      id: 3,
      name: "Knights of the Round Table",
      members: 4,
      level: 15,
      completedQuests: 203,
      color: "from-amber-600 to-yellow-600"
    },
  ];

  const handleFetch = () => {
  const token = localStorage.getItem("authToken");
  apiFetch('/groups/mine', { 
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }).then(response => {
    if (response) {
      console.log('Fetched rooms:', response);
      return response;
    } else {
      setRooms([]); // Em caso de erro, usa os mocks
      throw new Error('Failed to fetch rooms');
    }
  }).then(data => {
    // Garante que guildList seja sempre um array
    if (Array.isArray(data)) {
      setRooms(data);
    } else if (data && typeof data === 'object') {
      setRooms([data]);
    } else {
      setRooms([]);
    }
  }).catch(() => {
    setRooms([]);
  });
};

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background -z-10" />
      
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="stone" 
              size="sm"
              onClick={() => navigate("/training-grounds")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Yard
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3 py-4">
          <div className="flex justify-center">
            <BookOpen className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-bold text-foreground tracking-wide">Guild Ledger</h1>
          <p className="text-xl text-muted-foreground">Your circles of fellowship and learning</p>
        </div>

        {/* Rooms Grid */}
        {guildList?.length === 0 ? (
          mockRooms.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-6">No guilds found. Forge a new circle or join one!</p>
              <div className="flex gap-4 justify-center">
                <Button variant="gate" onClick={() => navigate("/create-circle")}> 
                  Forge New Circle
                </Button>
                <Button variant="parchment" onClick={() => navigate("/join-room")}> 
                  Enter Guildhall
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {mockRooms.map((room) => (
                <Card 
                  key={room.id || room.name}
                  className="stone-texture p-6 border-2 border-border hover:border-primary cursor-pointer transition-all hover:scale-[1.02] group"
                  onClick={() => navigate("/war-room")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {/* Guild Emblem */}
                      <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${room.color || "from-blue-600 to-purple-600"} flex items-center justify-center border-2 border-border shadow-lg`}>
                        <BookOpen className="w-10 h-10 text-white" />
                      </div>
                      {/* Guild Info */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">{room.name}</h3>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{room.members} Members</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-primary" />
                            <span className="text-foreground font-semibold">Level {room.level}</span>
                          </div>
                          <div>
                            <span className="text-accent font-semibold">{room.completedQuests}</span> Quests Completed
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Enter Arrow */}
                    <ChevronRight className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Card>
              ))}
            </div>
          )
        ) : (
          <div className="grid gap-6">
            {guildList?.map((room) => (
              <Card 
                key={room.id || room.nome}
                className="stone-texture p-6 border-2 border-border hover:border-primary cursor-pointer transition-all hover:scale-[1.02] group"
                onClick={() => navigate("/war-room")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Guild Emblem */}
                    <div className={`w-20 h-20 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center border-2 border-border shadow-lg`}>
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    {/* Guild Info */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-foreground">{room.nome}</h3>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{room.quantidade_usuarios} Members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-primary" />
                          <span className="text-foreground font-semibold">{room.points} Points</span>
                        </div>
                        <div>
                          <span className="text-accent font-semibold">{room.current_goal || "No goal"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Enter Arrow */}
                  <ChevronRight className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom decoration */}
        <div className="text-center pt-8">
          <div className="inline-block parchment-texture px-6 py-3 rounded-lg border-2 border-amber-800">
            <p className="text-primary-foreground font-semibold text-sm">
              📜 {(guildList?.length === 0 ? mockRooms.length : guildList?.length)} Active {(guildList?.length === 0 ? mockRooms.length : guildList?.length) === 1 ? 'Guild' : 'Guilds'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRooms;
