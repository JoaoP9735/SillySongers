import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrainingGrounds from "./pages/TrainingGrounds";
import JoinRoom from "./pages/JoinRoom";
import MyRooms from "./pages/MyRooms";
import WarRoom from "./pages/WarRoom";
import Quest from "./pages/Quest";
import Statistics from "./pages/Statistics";
import Files from "./pages/Files";
import Bosses from "./pages/Bosses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/training-grounds" element={<TrainingGrounds />} />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/my-rooms" element={<MyRooms />} />
          <Route path="/war-room" element={<WarRoom />} />
          <Route path="/quest" element={<Quest />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/files" element={<Files />} />
          <Route path="/bosses" element={<Bosses />} />
          <Route path="/create-circle" element={<TrainingGrounds />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
