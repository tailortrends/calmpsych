import { 
  Clock, 
  MapPin, 
  Video, 
  ChevronRight, 
  Plus, 
  Star, 
  CheckCircle2, 
  Circle,
  Sparkles,
  Timer,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";

const schedule = [
  {
    id: 1,
    time: "09:00",
    period: "AM",
    name: "Marcus Thorne",
    type: "Initial Consultation",
    mode: "In-Person",
    status: "ongoing",
    duration: "45 mins remaining"
  },
  {
    id: 2,
    time: "10:30",
    period: "AM",
    name: "Elena Rodriguez",
    type: "Follow-up Session",
    mode: "Telehealth",
    status: "next",
    duration: "60 mins"
  },
  {
    id: 3,
    time: "11:45",
    period: "AM",
    name: "James Wilson",
    type: "Cognitive Assessment",
    mode: "In-Person",
    status: "upcoming",
    duration: "60 mins"
  }
];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-12 py-10 space-y-12"
    >
      <header>
        <h2 className="text-5xl font-serif text-on-surface mb-3">Good morning, Dr. Aris.</h2>
        <p className="text-xl text-on-surface-variant/80">You have <span className="text-primary font-bold">6 patients</span> today.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Schedule */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white rounded-[32px] p-10 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-2xl font-serif italic text-primary">Today's Schedule</h3>
                <p className="text-sm text-on-surface-variant/60 mt-1">Tuesday, October 24th</p>
              </div>
              <button className="text-sm text-primary font-bold hover:underline transition-all underline-offset-4">View Calendar</button>
            </div>

            <div className="space-y-4">
              {schedule.map((item) => (
                <div 
                  key={item.id}
                  className="group flex items-center p-6 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-all cursor-pointer border border-transparent hover:border-primary/30"
                >
                  <div className="w-20 text-center border-r border-outline-variant/20 mr-8 pr-2">
                    <p className="text-base font-bold text-on-surface leading-none">{item.time}</p>
                    <p className="text-[10px] text-on-surface-variant/60 uppercase font-bold mt-1 tracking-tighter">{item.period}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface text-lg leading-tight">{item.name}</p>
                    <p className="text-sm text-on-surface-variant font-medium mt-0.5">{item.type}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-3.5 py-1.5 text-[10px] font-bold rounded-full uppercase tracking-wider",
                      item.mode === "Telehealth" ? "bg-secondary-container/40 text-secondary" : "bg-primary-container/40 text-primary"
                    )}>
                      {item.mode}
                    </span>
                    <ChevronRight className="text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-1 transition-all w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 group flex items-center gap-3 text-primary/60 hover:text-primary transition-all">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center group-hover:border-primary transition-all">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm">Add custom block or walk-in slot</span>
            </button>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weekly Sessions Chart Placeholder */}
            <div className="bg-surface-container rounded-[32px] p-8 border border-outline-variant/10 shadow-sm">
              <h4 className="text-xl font-serif italic mb-8 flex items-center gap-3">
                <Sparkles className="text-primary w-5 h-5" />
                Weekly Sessions
              </h4>
              <div className="h-32 flex items-end justify-between gap-2 px-2">
                {[40, 60, 55, 85, 45, 20, 15].map((height, i) => (
                  <div 
                    key={i}
                    style={{ height: `${height}%` }}
                    className={cn(
                      "w-full rounded-t-lg transition-all",
                      height > 80 ? "bg-primary" : "bg-primary/20 hover:bg-primary/40"
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-6 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[0.15em] px-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => <span key={day}>{day}</span>)}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-surface-container rounded-[32px] p-8 flex flex-col justify-between border border-outline-variant/10 shadow-sm">
              <div>
                <h4 className="text-xl font-serif italic mb-2">Quick Actions</h4>
                <p className="text-xs text-on-surface-variant/70 mb-8">Streamline your daily documentation</p>
              </div>
              <div className="space-y-3">
                <Link to="/session-note" className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-primary-container transition-all rounded-2xl text-sm font-bold text-primary shadow-sm group">
                  New Clinical Note
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                </Link>
                <Link to="/book-appointment" className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-primary-container transition-all rounded-2xl text-sm font-bold text-primary shadow-sm group">
                  Book Appointment
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/intake" className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-primary-container transition-all rounded-2xl text-sm font-bold text-primary shadow-sm group">
                  New Patient Intake
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                </Link>
                <button className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-primary-container transition-all rounded-2xl text-sm font-bold text-primary shadow-sm group">
                  Patient Referral
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Highlights & Stats */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-surface-container rounded-[32px] p-8 relative overflow-hidden border border-outline-variant/10 shadow-sm">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
            <h3 className="text-xl font-serif italic text-primary mb-8 flex items-center gap-2 relative z-10">
              <Star className="w-5 h-5 fill-primary" />
              Patient Highlights
            </h3>
            
            <div className="space-y-8 relative z-10">
              <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-error before:rounded-full">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-bold text-on-surface">Marcus Thorne</p>
                  <span className="text-[9px] font-bold text-error uppercase tracking-widest bg-error/10 px-2 py-0.5 rounded">Urgent Flag</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">Reported increased anxiety levels over the weekend. Check medication adherence.</p>
              </div>

              <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1.5 before:bg-tertiary before:rounded-full">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-bold text-on-surface">Elena Rodriguez</p>
                  <span className="text-[9px] font-bold text-tertiary uppercase tracking-widest bg-tertiary/10 px-2 py-0.5 rounded">Note Update</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">Self-care journal updated: Positive shift in mood tracking.</p>
              </div>

              <div className="bg-white/40 p-5 rounded-2xl border border-outline-variant/5">
                <h5 className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-4">Focus for today</h5>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <p className="text-[13px] text-on-surface font-medium leading-tight">Review assessment for J. Wilson</p>
                  </div>
                  <div className="flex items-start gap-3 opacity-60">
                    <Circle className="w-4 h-4 text-outline" />
                    <p className="text-[13px] text-on-surface font-medium leading-tight">Finalize insurance billing (Oct 23rd)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-primary text-white rounded-[32px] p-8 overflow-hidden relative group shadow-lg shadow-primary/10">
            <div className="relative z-10">
              <h4 className="text-xl font-serif italic mb-3">Self-Care Break</h4>
              <p className="text-xs opacity-80 mb-8 leading-relaxed max-w-[90%]">You've had 3 back-to-back sessions. Take 5 minutes for a mindful breathing exercise.</p>
              <button className="w-full sm:w-auto px-8 py-3 bg-white text-primary rounded-full text-xs font-bold hover:shadow-xl hover:bg-primary-container transition-all active:scale-95">
                Start Breathing Exercise
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-1000" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary-container/30 p-6 rounded-3xl">
              <Timer className="text-secondary w-6 h-6 mb-2" />
              <p className="text-2xl font-serif text-secondary">4.5h</p>
              <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Clinical Hours</p>
            </div>
            <div className="bg-tertiary-container/20 p-6 rounded-3xl">
              <Users className="text-tertiary w-6 h-6 mb-2" />
              <p className="text-2xl font-serif text-tertiary">12</p>
              <p className="text-[10px] uppercase font-bold text-tertiary/60 tracking-wider">Active Patients</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
