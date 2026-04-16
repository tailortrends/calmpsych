import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Calendar, 
  Phone, 
  Mail, 
  ChevronRight,
  UserPlus,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PatientDetailContent from "../components/PatientDetailContent";

const patients = [
  { id: 1, name: "Julianna Abbott", age: 28, lastSession: "Oct 24, 2023", sessions: 12, status: "active", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 2, name: "Marcus Thorne", age: 34, lastSession: "Oct 23, 2023", sessions: 8, status: "active", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 3, name: "Elena Rodriguez", age: 42, lastSession: "Oct 22, 2023", sessions: 24, status: "active", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 4, name: "James Wilson", age: 31, lastSession: "Oct 15, 2023", sessions: 5, status: "on-hold", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 5, name: "Sarah Miller", age: 26, lastSession: "Oct 12, 2023", sessions: 15, status: "active", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 6, name: "David Chen", age: 39, lastSession: "Sep 28, 2023", sessions: 3, status: "discharged", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" },
];

export default function Patients() {
  const navigate = useNavigate();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sessionRange, setSessionRange] = useState({ min: 0, max: 100 });
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const filteredPatients = patients.filter(patient => {
    // Search filter
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    
    // Session count filter
    const matchesSessions = patient.sessions >= sessionRange.min && patient.sessions <= sessionRange.max;
    
    // Date range filter
    let matchesDate = true;
    if (dateRange.start || dateRange.end) {
      const sessionDate = new Date(patient.lastSession);
      if (dateRange.start) {
        matchesDate = matchesDate && sessionDate >= new Date(dateRange.start);
      }
      if (dateRange.end) {
        matchesDate = matchesDate && sessionDate <= new Date(dateRange.end);
      }
    }

    return matchesSearch && matchesStatus && matchesSessions && matchesDate;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-12 py-10 space-y-12"
    >
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-serif text-on-surface mb-3">Patient Registry</h2>
          <p className="text-xl text-on-surface-variant/80">Your community of healing and growth.</p>
        </div>
        <Link to="/intake" className="px-8 py-4 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center gap-3">
          <UserPlus className="w-5 h-5" />
          Add New Patient
        </Link>
      </header>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 w-5 h-5" />
            <input 
              className="bg-white border border-outline-variant/20 rounded-2xl py-3.5 pl-12 pr-6 text-sm w-full focus:ring-2 focus:ring-primary/10 placeholder:text-outline/60 transition-all shadow-sm" 
              placeholder="Search by name..." 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex-1 md:flex-none px-6 py-3.5 border rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm",
                showFilters ? "bg-primary text-white border-primary" : "bg-white border-outline-variant/20 text-on-surface hover:bg-surface-container"
              )}
            >
              <Filter className="w-4 h-4" />
              Advanced Filters
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-8 bg-surface-container-low rounded-[32px] border border-outline-variant/10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Patient Status</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "active", "on-hold", "discharged"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all",
                          statusFilter === status 
                            ? "bg-primary text-white" 
                            : "bg-white text-on-surface-variant hover:bg-surface-container border border-outline-variant/10"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Session Count Range</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      placeholder="Min"
                      value={sessionRange.min}
                      onChange={(e) => setSessionRange({...sessionRange, min: parseInt(e.target.value) || 0})}
                      className="w-full bg-white border border-outline-variant/10 rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10"
                    />
                    <span className="text-outline/40">—</span>
                    <input 
                      type="number" 
                      placeholder="Max"
                      value={sessionRange.max}
                      onChange={(e) => setSessionRange({...sessionRange, max: parseInt(e.target.value) || 100})}
                      className="w-full bg-white border border-outline-variant/10 rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Last Session Date Range</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="date" 
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                      className="w-full bg-white border border-outline-variant/10 rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10"
                    />
                    <span className="text-outline/40">—</span>
                    <input 
                      type="date" 
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                      className="w-full bg-white border border-outline-variant/10 rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPatients.map((patient) => (
          <div 
            key={patient.id} 
            onClick={() => setSelectedPatientId(patient.id)}
            className="group bg-white rounded-[32px] p-8 border border-outline-variant/10 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6">
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="p-2 text-outline/30 hover:text-primary transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/5 group-hover:ring-primary/20 transition-all">
                  <img 
                    src={patient.image} 
                    alt={patient.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className={cn(
                  "absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white",
                  patient.status === "active" ? "bg-primary" : patient.status === "on-hold" ? "bg-secondary" : "bg-outline/30"
                )} />
              </div>

              <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">{patient.name}</h3>
              <p className="text-sm text-on-surface-variant/60 font-medium mt-1">{patient.age} years old • {patient.sessions} sessions</p>

              <div className="w-full h-px bg-outline-variant/10 my-6" />

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Last Session</p>
                  <p className="text-xs font-bold text-on-surface">{patient.lastSession}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Status</p>
                  <p className={cn(
                    "text-xs font-bold capitalize",
                    patient.status === "active" ? "text-primary" : "text-on-surface-variant"
                  )}>{patient.status}</p>
                </div>
              </div>

              <div className="mt-8 w-full flex gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex-1 p-3 bg-surface-container rounded-xl text-primary hover:bg-primary-container transition-all flex items-center justify-center"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex-1 p-3 bg-surface-container rounded-xl text-primary hover:bg-primary-container transition-all flex items-center justify-center"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    navigate(`/book-appointment?patientId=${patient.id}`);
                  }}
                  className="flex-1 p-3 bg-surface-container rounded-xl text-primary hover:bg-primary-container transition-all flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setSelectedPatientId(patient.id);
                  }}
                  className="flex-[2] p-3 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dim transition-all flex items-center justify-center gap-2"
                >
                  View Profile
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPatientId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPatientId(null)}
              className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-full bg-surface-container-lowest rounded-[48px] shadow-2xl overflow-hidden flex flex-col border border-outline-variant/10"
            >
              <div className="sticky top-0 z-10 p-8 flex justify-between items-center bg-surface-container-lowest/80 backdrop-blur-md border-b border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={patients.find(p => p.id === selectedPatientId)?.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif italic text-primary">Patient Dossier</h3>
                    <p className="text-xs text-on-surface-variant font-medium">Viewing full records for {patients.find(p => p.id === selectedPatientId)?.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPatientId(null)}
                  className="p-3 bg-white rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-all shadow-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-8 md:p-12">
                <PatientDetailContent patientId={selectedPatientId.toString()} isModal />
              </div>

              <div className="p-8 bg-surface-container-low/50 border-t border-outline-variant/10 flex justify-end gap-4">
                <button 
                  onClick={() => setSelectedPatientId(null)}
                  className="px-8 py-3 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                >
                  Close Dossier
                </button>
                <Link 
                  to={`/book-appointment?patientId=${selectedPatientId}`}
                  className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Session
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
