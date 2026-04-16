import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  ChevronRight, 
  Check,
  Search,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const patients = [
  { id: 1, name: "Julianna Abbott", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 2, name: "Marcus Thorne", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 3, name: "Elena Rodriguez", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

const appointmentTypes = [
  { id: "initial", label: "Initial Consultation", duration: "60 min" },
  { id: "followup", label: "Follow-up Session", duration: "45 min" },
  { id: "psychoanalysis", label: "Psychoanalysis Session", duration: "60 min" },
  { id: "assessment", label: "Clinical Assessment", duration: "90 min" },
  { id: "crisis", label: "Crisis Intervention", duration: "30 min" },
];

const containerVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 200
    }
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 200 }
  }
};

export default function BookAppointment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("patientId");

  const [step, setStep] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(
    patients.find(p => p.id.toString() === preselectedId) || null
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [mode, setMode] = useState("In-Person");

  const handleBook = () => {
    // In a real app, this would save to a database
    navigate("/");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-12 py-10 space-y-10"
    >
      <header className="flex items-center gap-6">
        <Link to="/" className="p-2 bg-white rounded-xl border border-outline-variant/10 hover:border-primary/20 shadow-sm transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-3xl font-serif text-on-surface">Schedule Sanctuary</h2>
          <p className="text-sm text-on-surface-variant/60 font-medium mt-1">Creating space for healing and connection.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Progress Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="space-y-4">
            {[
              { s: 1, label: "Patient" },
              { s: 2, label: "Details" },
              { s: 3, label: "Time" },
              { s: 4, label: "Confirm" }
            ].map((item) => (
              <div key={item.s} className="flex items-center gap-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step === item.s ? "bg-primary text-white shadow-lg shadow-primary/20" : 
                  step > item.s ? "bg-primary/10 text-primary" : "bg-surface-container text-outline/40"
                )}>
                  {step > item.s ? <Check className="w-4 h-4" /> : item.s}
                </div>
                <span className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-colors",
                  step === item.s ? "text-on-surface" : "text-outline/40"
                )}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-8"
              >
                <motion.h3 variants={itemVariants} className="text-2xl font-serif italic text-primary">Who are we seeing?</motion.h3>
                <motion.div variants={itemVariants} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/40 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search patients..."
                    className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-3">
                  {patients.map((p) => (
                    <button 
                      key={p.id}
                      onClick={() => {
                        setSelectedPatient(p);
                        setStep(2);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-2xl border transition-all group",
                        selectedPatient?.id === p.id ? "bg-primary/5 border-primary/30" : "bg-white border-outline-variant/10 hover:border-primary/20"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <span className="font-bold text-on-surface">{p.name}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-outline/30 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-8"
              >
                <motion.h3 variants={itemVariants} className="text-2xl font-serif italic text-primary">Session Details</motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants} className="space-y-3">
                    <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Appointment Type</label>
                    <div className="space-y-2">
                      {appointmentTypes.map((type) => (
                        <button 
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={cn(
                            "w-full flex justify-between items-center p-4 rounded-xl border text-sm font-medium transition-all",
                            selectedType === type.id ? "bg-primary text-white border-primary" : "bg-surface-container-low border-outline-variant/10 hover:border-primary/20"
                          )}
                        >
                          {type.label}
                          <span className={cn("text-[10px] opacity-60", selectedType === type.id ? "text-white" : "text-on-surface-variant")}>{type.duration}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Session Mode</label>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setMode("In-Person")}
                          className={cn(
                            "flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                            mode === "In-Person" ? "bg-primary/5 border-primary text-primary" : "bg-white border-outline-variant/10 text-on-surface-variant"
                          )}
                        >
                          <MapPin className="w-5 h-5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">In-Person</span>
                        </button>
                        <button 
                          onClick={() => setMode("Telehealth")}
                          className={cn(
                            "flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                            mode === "Telehealth" ? "bg-primary/5 border-primary text-primary" : "bg-white border-outline-variant/10 text-on-surface-variant"
                          )}
                        >
                          <Video className="w-5 h-5" />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Telehealth</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-6 bg-primary-container/30 rounded-2xl border border-primary/5">
                      <h4 className="text-xs font-bold text-primary mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        AI Recommendation
                      </h4>
                      <p className="text-[11px] text-on-surface-variant leading-relaxed">
                        Based on Julianna's recent progress, a 60-minute session is recommended for deeper exploration.
                      </p>
                    </div>
                  </motion.div>
                </div>
                <motion.div variants={itemVariants} className="flex justify-between pt-6 border-t border-outline-variant/10">
                  <button onClick={() => setStep(1)} className="px-6 py-3 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Back</button>
                  <button 
                    disabled={!selectedType}
                    onClick={() => setStep(3)} 
                    className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all disabled:opacity-50"
                  >
                    Continue to Schedule
                  </button>
                </motion.div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-8"
              >
                <motion.h3 variants={itemVariants} className="text-2xl font-serif italic text-primary">Choose a Time</motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <motion.div variants={itemVariants} className="space-y-4">
                    <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Select Date</label>
                    <input 
                      type="date" 
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                    />
                    <div className="p-6 bg-surface-container rounded-2xl">
                      <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-4">Availability Overview</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-on-surface-variant">Morning Slots</span>
                          <span className="font-bold text-primary">3 available</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-on-surface-variant">Afternoon Slots</span>
                          <span className="font-bold text-primary">4 available</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-4">
                    <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Available Slots</label>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button 
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-3 rounded-xl border text-xs font-bold transition-all",
                            selectedTime === time ? "bg-primary text-white border-primary shadow-md" : "bg-white border-outline-variant/10 hover:border-primary/20 text-on-surface-variant"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
                <motion.div variants={itemVariants} className="flex justify-between pt-6 border-t border-outline-variant/10">
                  <button onClick={() => setStep(2)} className="px-6 py-3 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Back</button>
                  <button 
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(4)} 
                    className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all disabled:opacity-50"
                  >
                    Review Appointment
                  </button>
                </motion.div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-10"
              >
                <motion.div variants={itemVariants} className="text-center">
                  <h3 className="text-3xl font-serif text-on-surface mb-2">Confirm Sanctuary Space</h3>
                  <p className="text-sm text-on-surface-variant/60">Please review the details before finalizing.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-surface-container-low rounded-[32px] p-8 space-y-6">
                  <div className="flex items-center gap-6">
                    <img src={selectedPatient?.image} alt={selectedPatient?.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-white" referrerPolicy="no-referrer" />
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Patient</p>
                      <p className="text-xl font-bold text-on-surface">{selectedPatient?.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-outline-variant/10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Date</p>
                          <p className="text-sm font-bold text-on-surface">{selectedDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Time</p>
                          <p className="text-sm font-bold text-on-surface">{selectedTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Type</p>
                          <p className="text-sm font-bold text-on-surface">{appointmentTypes.find(t => t.id === selectedType)?.label}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {mode === "Telehealth" ? <Video className="w-5 h-5 text-primary" /> : <MapPin className="w-5 h-5 text-primary" />}
                        <div>
                          <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Mode</p>
                          <p className="text-sm font-bold text-on-surface">{mode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-4">
                  <button 
                    onClick={handleBook}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dim transition-all shadow-xl shadow-primary/10"
                  >
                    Confirm & Schedule Appointment
                  </button>
                  <button onClick={() => setStep(3)} className="w-full py-4 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">
                    Make Changes
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
