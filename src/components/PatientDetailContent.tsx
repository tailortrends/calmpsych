import { 
  Calendar, 
  Clock, 
  FileText, 
  MessageSquare, 
  Phone, 
  Mail, 
  MoreHorizontal, 
  Plus, 
  ShieldCheck, 
  Activity,
  ChevronRight,
  Download,
  History,
  CreditCard,
  Stethoscope,
  Sparkles,
  AlertTriangle,
  Info,
  ChevronDown,
  Video,
  Copy,
  Check,
  ExternalLink,
  Upload,
  DownloadCloud,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";

const criticalAlerts = [
  { id: 1, type: "urgent", message: "Urgent: High risk of self-harm - Monitor closely", icon: AlertTriangle },
  { id: 2, type: "follow-up", message: "Requires immediate follow-up regarding medication adjustment", icon: Info },
];

const sessionHistory = [
  { 
    id: 1, 
    date: "Oct 24, 2023", 
    type: "Individual Therapy", 
    duration: "50 min", 
    status: "Completed", 
    sentiment: "Positive",
    note: "Progress noted in emotional regulation. Patient successfully applied box breathing during a workplace trigger. Focus shifted to childhood attachment patterns in next session.", 
    summary: "Significant breakthrough in applying coping mechanisms in real-time. Emotional resilience is trending upward.",
    takeaways: [
      "Successfully applied box breathing in high-stress environment",
      "Demonstrated increased self-awareness of emotional triggers",
      "Ready to explore deeper attachment patterns"
    ]
  },
  { 
    id: 2, 
    date: "Oct 10, 2023", 
    type: "Individual Therapy", 
    duration: "50 min", 
    status: "Completed", 
    sentiment: "Neutral",
    note: "Explored childhood attachment patterns. Identified 'avoidant' tendencies in current romantic relationship. Patient expressed desire to work on vulnerability.", 
    summary: "Deep dive into attachment theory. Patient is beginning to connect past patterns with current relationship dynamics.",
    takeaways: [
      "Identified avoidant attachment style in current relationship",
      "Expressed willingness to practice vulnerability",
      "Connected childhood experiences to adult relationship patterns"
    ]
  },
  { 
    id: 3, 
    date: "Sep 26, 2023", 
    type: "Initial Assessment", 
    duration: "90 min", 
    status: "Completed", 
    sentiment: "Positive",
    note: "Comprehensive intake completed. Established baseline for GAD and mild depression. Patient is motivated for change.", 
    summary: "Baseline established. High motivation for therapeutic work noted.",
    takeaways: [
      "Established baseline for GAD and mild depression",
      "High motivation for therapeutic work confirmed",
      "Agreed on initial treatment goals"
    ]
  },
];

const contactHistory = [
  { 
    id: 1, 
    date: "Oct 25, 2023", 
    type: "Phone Call", 
    duration: "5 min", 
    subject: "Appointment Rescheduling",
    details: "Patient called to move next week's session to Thursday at 2 PM due to a work conflict. Rescheduling confirmed and updated in the calendar."
  },
  { 
    id: 2, 
    date: "Oct 18, 2023", 
    type: "Email", 
    duration: "-", 
    subject: "Medication refill request",
    details: "Received email requesting refill for Sertraline. Verified last appointment was within 30 days. Sent prescription to pharmacy on file."
  },
  { 
    id: 3, 
    date: "Oct 12, 2023", 
    type: "SMS", 
    duration: "-", 
    subject: "Session confirmation",
    details: "Automated session confirmation sent for Oct 14 session. Patient replied 'YES' to confirm."
  },
];

const initialAppointmentNotes = [
  { id: 1, date: "Oct 26, 2023", time: "10:00 AM", type: "Follow-up", content: "Patient mentioned feeling more energetic this morning. Discussed sleep hygiene and established a consistent bedtime routine." },
  { id: 2, date: "Oct 12, 2023", time: "02:00 PM", type: "Initial", content: "Completed intake forms. Patient seems eager to start CBT and has identified clear goals for the first three months." },
];

interface PatientDetailContentProps {
  patientId?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export default function PatientDetailContent({ patientId, isModal, onClose }: PatientDetailContentProps) {
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(null);
  const [expandedContactId, setExpandedContactId] = useState<number | null>(null);
  const [appointmentNotes, setAppointmentNotes] = useState(initialAppointmentNotes);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ date: "", time: "", type: "", content: "" });
  const [copied, setCopied] = useState(false);

  const telehealthLink = "https://telehealth.calmpsych.com/room/julianna-abbott";

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would call an API to export to EHR
    }, 2000);
  };

  const handleImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      // In a real app, this would call an API to import from EHR
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(telehealthLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Critical Alerts Section */}
      {criticalAlerts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2 ml-4">
            <AlertTriangle className="w-4 h-4 text-error" />
            <h3 className="text-[10px] font-bold text-error uppercase tracking-[0.2em]">Clinical Safety Alerts</h3>
          </div>
          {criticalAlerts.map((alert) => (
            <motion.div 
              key={alert.id} 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={cn(
                "p-6 rounded-[32px] border flex items-center gap-6 shadow-lg relative overflow-hidden group",
                alert.type === "urgent" 
                  ? "bg-error text-white border-error shadow-error/20" 
                  : "bg-secondary text-white border-secondary shadow-secondary/20"
              )}
            >
              {alert.type === "urgent" && (
                <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
              )}
              <div className={cn(
                "p-4 rounded-2xl shrink-0 bg-white/20 backdrop-blur-md",
                alert.type === "urgent" ? "animate-bounce" : ""
              )}>
                <alert.icon className="w-8 h-8" />
              </div>
              <div className="flex-grow relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1">
                  {alert.type === "urgent" ? "Immediate Action Required" : "Priority Clinical Follow-up"}
                </p>
                <p className="text-xl font-serif italic leading-tight font-medium">{alert.message}</p>
              </div>
              <button className="px-8 py-3 bg-white text-on-surface rounded-2xl text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm relative z-10">
                Acknowledge Alert
              </button>
            </motion.div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-8 ring-primary/5">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Julianna Abbott" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary rounded-full border-4 border-white" />
            </div>
            
            <h2 className="text-3xl font-serif text-on-surface">Julianna Abbott</h2>
            <p className="text-sm text-on-surface-variant font-medium mt-1">Patient ID: #CP-88241</p>
            
            <div className="mt-8 flex flex-col gap-3">
              <button 
                onClick={handleExport}
                disabled={isExporting}
                className="w-full py-3 bg-primary/5 border border-primary/20 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isExporting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                {isExporting ? "Exporting to EHR..." : "Export to EHR"}
              </button>
              <button 
                onClick={handleImport}
                disabled={isImporting}
                className="w-full py-3 bg-secondary/5 border border-secondary/20 rounded-xl text-xs font-bold text-secondary hover:bg-secondary/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isImporting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <DownloadCloud className="w-3 h-3" />}
                {isImporting ? "Importing from EHR..." : "Import from EHR"}
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-8">
              <button className="p-3.5 bg-surface-container rounded-2xl text-primary hover:bg-primary-container transition-all">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-3.5 bg-surface-container rounded-2xl text-primary hover:bg-primary-container transition-all">
                <Mail className="w-5 h-5" />
              </button>
              <button className="p-3.5 bg-surface-container rounded-2xl text-primary hover:bg-primary-container transition-all">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-10 space-y-6 text-left">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Age</p>
                  <p className="text-sm font-bold text-on-surface">28 years</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Gender</p>
                  <p className="text-sm font-bold text-on-surface">Female</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Blood Type</p>
                  <p className="text-sm font-bold text-on-surface">O Positive</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Occupation</p>
                  <p className="text-sm font-bold text-on-surface">UX Designer</p>
                </div>
              </div>
              
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Primary Diagnosis</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">Generalized Anxiety</span>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">Mild Depression</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container rounded-[40px] p-8 border border-outline-variant/10 shadow-sm">
            <h3 className="text-xl font-serif italic text-primary mb-6 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" />
              Emergency Contact
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-2xl border border-outline-variant/5">
                <p className="text-sm font-bold text-on-surface">Robert Abbott</p>
                <p className="text-xs text-on-surface-variant mt-1">Father • (555) 123-4567</p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[40px] p-8 border border-outline-variant/10 shadow-sm">
            <h3 className="text-xl font-serif italic text-primary mb-6 flex items-center gap-3">
              <CreditCard className="w-5 h-5" />
              Insurance Details
            </h3>
            <div className="space-y-4">
              <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1">Provider</p>
                <p className="text-sm font-bold text-on-surface">Blue Cross Blue Shield</p>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Policy #</p>
                    <p className="text-xs font-medium text-on-surface">XYZ-9928341</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Group #</p>
                    <p className="text-xs font-medium text-on-surface">BC-7721</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Clinical Details */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm">
              <Activity className="text-primary w-6 h-6 mb-3" />
              <p className="text-2xl font-serif text-on-surface">12</p>
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Total Sessions</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm">
              <Calendar className="text-secondary w-6 h-6 mb-3" />
              <p className="text-2xl font-serif text-on-surface">Oct 24</p>
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Last Visit</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm">
              <Clock className="text-tertiary w-6 h-6 mb-3" />
              <p className="text-2xl font-serif text-on-surface">Next Tue</p>
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Next Session</p>
            </div>
          </div>

          <section className="bg-white rounded-[40px] p-8 border border-outline-variant/10 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Video className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-serif italic text-primary">Telehealth Sanctuary</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Next session: Tuesday, Oct 31 at 2:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex-grow md:flex-grow-0 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 flex items-center gap-3 min-w-0">
                  <p className="text-xs font-mono text-on-surface-variant truncate max-w-[200px]">{telehealthLink}</p>
                  <button 
                    onClick={handleCopy}
                    className="p-2 hover:bg-white rounded-lg transition-all text-primary shrink-0"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <a 
                  href={telehealthLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center gap-2 shrink-0"
                >
                  Join Room
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[40px] p-8 border border-outline-variant/10 shadow-sm">
              <h3 className="text-xl font-serif italic text-primary mb-6 flex items-center gap-3">
                <Stethoscope className="w-5 h-5" />
                Pre-existing Conditions
              </h3>
              <div className="space-y-3">
                {[
                  "Asthma (Childhood onset)",
                  "Migraines (Stress-triggered)",
                  "Insomnia (Occasional)"
                ].map((condition, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span className="text-sm text-on-surface-variant font-medium">{condition}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[40px] p-8 border border-outline-variant/10 shadow-sm">
              <h3 className="text-xl font-serif italic text-primary mb-6 flex items-center gap-3">
                <History className="w-5 h-5" />
                Contact History
              </h3>
              <div className="space-y-4">
                {contactHistory.map((contact) => (
                  <div key={contact.id} className="flex justify-between items-center p-3 hover:bg-surface-container-low rounded-xl transition-colors">
                    <div>
                      <p className="text-sm font-bold text-on-surface">{contact.type}</p>
                      <p className="text-[10px] text-on-surface-variant/60">{contact.date} • {contact.subject}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-outline/20" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-primary/5 rounded-[40px] p-10 border border-primary/10 shadow-sm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <Sparkles className="text-primary w-6 h-6" />
                <h3 className="text-2xl font-serif italic text-primary">Recent Progress Summary</h3>
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">AI Assisted Insights</span>
            </div>
            
            <div className="space-y-6 relative z-10">
              {sessionHistory.slice(0, 2).map((session, index) => (
                <div key={session.id} className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white/40 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{session.date} • {session.type}</p>
                      <h4 className="text-sm font-bold text-on-surface mt-1">Key Progress Point</h4>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      index === 0 ? "bg-primary animate-pulse" : "bg-primary/40"
                    )} />
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed italic">"{session.summary}"</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-[40px] border border-outline-variant/10 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-2xl font-serif italic text-primary">Clinical Timeline</h3>
              <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4">
                <Plus className="w-4 h-4" />
                Add Session Note
              </button>
            </div>
            
            <div className="p-2">
              {sessionHistory.map((session) => {
                const isExpanded = expandedSessionId === session.id;
                return (
                  <div 
                    key={session.id} 
                    onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                    className={cn(
                      "group p-8 hover:bg-surface-container-low transition-all rounded-[32px] cursor-pointer border m-2",
                      isExpanded ? "bg-surface-container-low border-outline-variant/20 shadow-inner" : "border-transparent hover:border-outline-variant/10"
                    )}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                          isExpanded ? "bg-primary text-white" : "bg-primary/5 text-primary"
                        )}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{session.type}</p>
                          <p className="text-xs text-on-surface-variant/60 font-medium">{session.date} • {session.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {session.status}
                        </span>
                        {session.sentiment && (
                          <span className={cn(
                            "px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider",
                            session.sentiment === "Positive" ? "bg-secondary/10 text-secondary" : "bg-outline/10 text-on-surface-variant/60"
                          )}>
                            {session.sentiment}
                          </span>
                        )}
                        <ChevronDown className={cn(
                          "w-5 h-5 text-outline/30 transition-transform duration-300",
                          isExpanded && "rotate-180 text-primary"
                        )} />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <p className={cn(
                        "text-sm text-on-surface-variant leading-relaxed transition-all duration-300",
                        !isExpanded && "line-clamp-2"
                      )}>
                        {session.note}
                      </p>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-6 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                              <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">AI-Generated Key Takeaways</span>
                              </div>
                              <ul className="space-y-3">
                                {session.takeaways?.map((takeaway, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                                    <p className="text-sm text-on-surface-variant leading-relaxed italic">"{takeaway}"</p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-8 flex items-center gap-4">
                              <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dim transition-all flex items-center gap-2">
                                View Full Clinical Record
                                <ChevronRight className="w-3 h-3" />
                              </button>
                              <button className="px-6 py-2.5 bg-white border border-outline-variant/20 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-all flex items-center gap-2">
                                <Download className="w-3 h-3" />
                                Download PDF
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {!isExpanded && (
                      <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Click to expand notes</span>
                        <ChevronDown className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="p-8 bg-surface-container-low/30 text-center">
              <button className="text-sm font-bold text-primary hover:underline underline-offset-4">Load Older Sessions</button>
            </div>
          </section>

          <section className="bg-white rounded-[40px] border border-outline-variant/10 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-outline-variant/10 flex justify-between items-center">
              <h3 className="text-2xl font-serif italic text-primary">Contact History Log</h3>
              <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4">
                <Plus className="w-4 h-4" />
                Log Interaction
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Date</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Type</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Subject</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Duration</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {contactHistory.map((contact) => {
                    const isExpanded = expandedContactId === contact.id;
                    const ContactIcon = contact.type === "Phone Call" ? Phone : contact.type === "Email" ? Mail : MessageSquare;
                    
                    return (
                      <Fragment key={contact.id}>
                        <tr 
                          className={cn(
                            "hover:bg-surface-container-low/50 transition-colors group cursor-pointer",
                            isExpanded && "bg-surface-container-low/30"
                          )}
                          onClick={() => setExpandedContactId(isExpanded ? null : contact.id)}
                        >
                          <td className="px-10 py-6 text-sm text-on-surface font-medium">{contact.date}</td>
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/5 rounded-lg text-primary">
                                <ContactIcon className="w-4 h-4" />
                              </div>
                              <span className="text-sm text-on-surface-variant font-medium">{contact.type}</span>
                            </div>
                          </td>
                          <td className="px-10 py-6 text-sm text-on-surface font-bold">{contact.subject}</td>
                          <td className="px-10 py-6 text-sm text-on-surface-variant">{contact.duration}</td>
                          <td className="px-10 py-6">
                            <button className="text-xs font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1">
                              {isExpanded ? "Show Less" : "View More"}
                              <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
                            </button>
                          </td>
                        </tr>
                        <AnimatePresence>
                          {isExpanded && (
                            <tr>
                              <td colSpan={5} className="px-10 py-0">
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pb-8 pt-2">
                                    <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                                      <h5 className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-3">Interaction Details</h5>
                                      <p className="text-sm text-on-surface-variant leading-relaxed">
                                        {contact.details}
                                      </p>
                                      <div className="mt-4 flex gap-4">
                                        <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Edit Log</button>
                                        <button className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest hover:text-error transition-colors">Delete</button>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-surface-container-low/30 text-center">
              <button className="text-sm font-bold text-primary hover:underline underline-offset-4">View All Communication History</button>
            </div>
          </section>

          <section className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/5 rounded-xl text-primary">
                  <History className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif italic text-primary">Appointment Notes</h3>
              </div>
              <button 
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dim transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {isAddingNote ? "Cancel" : "Add Note"}
              </button>
            </div>

            <AnimatePresence>
              {isAddingNote && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="p-6 bg-surface-container-low rounded-3xl border border-primary/10 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Date</label>
                        <input 
                          type="date" 
                          value={newNote.date}
                          onChange={(e) => setNewNote({...newNote, date: e.target.value})}
                          className="w-full bg-white border-none rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Time</label>
                        <input 
                          type="time" 
                          value={newNote.time}
                          onChange={(e) => setNewNote({...newNote, time: e.target.value})}
                          className="w-full bg-white border-none rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Type</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Follow-up"
                          value={newNote.type}
                          onChange={(e) => setNewNote({...newNote, type: e.target.value})}
                          className="w-full bg-white border-none rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Note Content</label>
                      <textarea 
                        placeholder="Enter appointment notes..."
                        value={newNote.content}
                        onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                        className="w-full min-h-[100px] bg-white border-none rounded-xl p-4 text-xs focus:ring-2 focus:ring-primary/10 resize-none"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => {
                          if (newNote.date && newNote.content) {
                            setAppointmentNotes([
                              { id: Date.now(), ...newNote },
                              ...appointmentNotes
                            ]);
                            setNewNote({ date: "", time: "", type: "", content: "" });
                            setIsAddingNote(false);
                          }
                        }}
                        className="px-6 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dim transition-all"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {appointmentNotes.map((note) => (
                <motion.div 
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/5 hover:border-primary/10 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface">{note.date}</span>
                        <span className="text-[10px] text-on-surface-variant/60">{note.time}</span>
                      </div>
                      <div className="h-8 w-px bg-outline-variant/20" />
                      <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {note.type}
                      </span>
                    </div>
                    <button className="p-2 text-outline/20 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {note.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container rounded-[40px] p-10 border border-outline-variant/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10">
              <MoreHorizontal className="text-outline/40 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif italic text-primary mb-8">Current Treatment Plan</h3>
            <div className="space-y-8">
              <div>
                <h5 className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] mb-4">Primary Objectives</h5>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Develop 3-5 mindfulness-based coping strategies for acute panic episodes.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">Implement cognitive restructuring to address perfectionistic self-talk in workplace settings.</p>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-white rounded-3xl border border-outline-variant/5">
                <h5 className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] mb-4">Medication Management</h5>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-on-surface">Sertraline (Zoloft)</p>
                    <p className="text-xs text-on-surface-variant">50mg • Once daily in morning</p>
                  </div>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">Adherent</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
