import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ScrollText, Plus, Trash2, ExternalLink, FileText, Image, FileCode } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FileItem {
  id: number;
  name: string;
  type: "document" | "image" | "code";
  uploadedBy: string;
  date: string;
}

const Files = () => {
  const navigate = useNavigate();
  
  // Mock files data
  const [files, setFiles] = useState<FileItem[]>([
    { id: 1, name: "Ancient Combat Techniques.pdf", type: "document", uploadedBy: "Wizard Merlin", date: "2024-01-15" },
    { id: 2, name: "Magic Circle Diagram.png", type: "image", uploadedBy: "Lady Morgana", date: "2024-01-16" },
    { id: 3, name: "Spell_Incantations.txt", type: "code", uploadedBy: "Sir Galahad", date: "2024-01-17" },
    { id: 4, name: "Guild Charter.pdf", type: "document", uploadedBy: "Knight Arthur", date: "2024-01-10" },
  ]);

  const handleAddFile = () => {
    toast({
      title: "Scroll Added ✨",
      description: "Your document has been inscribed in the archive.",
    });
  };

  const handleRemoveFile = (id: number) => {
    setFiles(files.filter(f => f.id !== id));
    toast({
      title: "Scroll Burned 🔥",
      description: "The document has been removed from the archive.",
      variant: "destructive",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="w-6 h-6" />;
      case "image":
        return <Image className="w-6 h-6" />;
      case "code":
        return <FileCode className="w-6 h-6" />;
      default:
        return <ScrollText className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background -z-10" />
      
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

          <Button variant="gate" size="sm" onClick={handleAddFile} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Scroll
          </Button>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <ScrollText className="w-16 h-16 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-bold text-foreground tracking-wide">Scrolls Archive</h1>
          <p className="text-xl text-muted-foreground">The guild's repository of knowledge</p>
        </div>

        {/* Files Display */}
        {files.length === 0 ? (
          <Card className="stone-texture p-16 border-2 border-border text-center">
            <ScrollText className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground mb-4">The archive is empty</p>
            <Button variant="parchment" onClick={handleAddFile} className="gap-2">
              <Plus className="w-4 h-4" />
              Add First Scroll
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {files.map((file) => (
              <Card 
                key={file.id}
                className="parchment-texture p-6 border-2 border-amber-800 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* File Icon */}
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 ${
                      file.type === "document" 
                        ? "bg-blue-600/20 border-blue-600 text-blue-600"
                        : file.type === "image"
                        ? "bg-purple-600/20 border-purple-600 text-purple-600"
                        : "bg-green-600/20 border-green-600 text-green-600"
                    }`}>
                      {getFileIcon(file.type)}
                    </div>

                    {/* File Info */}
                    <div>
                      <h3 className="text-lg font-bold text-primary-foreground group-hover:text-foreground transition-colors">
                        {file.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Inscribed by {file.uploadedBy} • {new Date(file.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-background/50"
                      title="Unroll Scroll"
                    >
                      <ExternalLink className="w-4 h-4 text-foreground" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-destructive/20"
                      onClick={() => handleRemoveFile(file.id)}
                      title="Burn Scroll"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
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
              📜 {files.length} Scroll{files.length !== 1 ? 's' : ''} in Archive
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
