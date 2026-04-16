import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  Mic, 
  History, 
  ChevronDown, 
  Info,
  CheckCircle2,
  Clock,
  User,
  Layout,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";
import { useState } from "react";

const templates = [
  {
    id: "soap",
    name: "SOAP Note",
    fields: ["Subjective", "Objective", "Assessment", "Plan"]
  },
  {
    id: "cbt",
    name: "CBT Progress",
    fields: ["Cognitive Distortions", "Homework Review", "Interventions"]
  }
];

export default function SessionNote() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-12 py-10 space-y-10"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="p-2 bg-white rounded-xl border border-outline-variant/10 hover:border-primary/20 shadow-sm transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-3xl font-serif text-on-surface">Session Documentation</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                <User className="w-3 h-3" /> Julianna Abbott
              </span>
              <span className="w-1 h-1 bg-outline/30 rounded-full" />
              <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant/60">
                <Clock className="w-3 h-3" /> Oct 24, 2023 • 09:00 AM
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowTemplateMenu(!showTemplateMenu)}
              className="px-6 py-3 bg-white border border-outline-variant/20 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container transition-all flex items-center gap-2"
            >
              <Layout className="w-4 h-4 text-primary" />
              {selectedTemplate.name}
              <ChevronDown className="w-4 h-4 opacity-40" />
            </button>
            <AnimatePresence>
              {showTemplateMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowTemplateMenu(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-outline-variant/10 z-20 overflow-hidden"
                  >
                    <div className="p-4 border-b border-outline-variant/5 bg-surface-container-low flex justify-between items-center">
                      <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Select Template</span>
                      <Link to="/note-templates" className="p-1.5 hover:bg-primary/5 text-primary rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="p-2">
                      {templates.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setSelectedTemplate(t);
                            setShowTemplateMenu(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-3 rounded-xl text-sm transition-all",
                            selectedTemplate.id === t.id ? "bg-primary/5 text-primary font-bold" : "text-on-surface-variant hover:bg-surface-container"
                          )}
                        >
                          {t.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <button className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Finalize Note
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Editor */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-10">
            {selectedTemplate.fields.map((field) => (
              <div key={field} className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">{field}</label>
                  <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
                    <Sparkles className="w-3 h-3" /> AI Assist
                  </button>
                </div>
                <textarea 
                  className="w-full min-h-[160px] bg-surface-container-low border-none rounded-3xl p-6 text-sm text-on-surface leading-relaxed focus:ring-2 focus:ring-primary/10 placeholder:text-outline/40 transition-all resize-none"
                  placeholder={`Enter ${field.toLowerCase()} observations...`}
                />
              </div>
            ))}

            <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button className="p-3 bg-primary/5 text-primary rounded-full hover:bg-primary/10 transition-all group">
                  <Mic className="w-5 h-5 group-active:scale-90 transition-transform" />
                </button>
                <p className="text-xs text-on-surface-variant/60 font-medium italic">Voice-to-text enabled</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-primary/5 px-4 py-2 rounded-full uppercase tracking-widest">
                <CheckCircle2 className="w-3 h-3" />
                Auto-saved 2m ago
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Context & Helpers */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-surface-container rounded-[40px] p-8 border border-outline-variant/10 shadow-sm">
            <h3 className="text-xl font-serif italic text-primary mb-6 flex items-center gap-3">
              <Info className="w-5 h-5" />
              Session Context
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-3">Service Code</p>
                <div className="relative">
                  <select className="w-full bg-white border border-outline-variant/10 rounded-xl py-3 px-4 text-xs font-bold text-on-surface appearance-none focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer">
                    <option>90834 - Psychotherapy, 45 min</option>
                    <option>90837 - Psychotherapy, 60 min</option>
                    <option>90845 - Psychoanalysis Session, 60 min</option>
                    <option>90791 - Psychiatric Diagnostic Eval</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/40 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-3">Place of Service</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-3 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-wider">Office (11)</button>
                  <button className="py-3 bg-white border border-outline-variant/10 rounded-xl text-[10px] font-bold text-on-surface-variant uppercase tracking-wider hover:bg-surface-container transition-all">Telehealth (02)</button>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/10">
                <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-4">Previous Session Goals</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 opacity-60">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-xs text-on-surface-variant font-medium leading-tight">Identify 3 anxiety triggers</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-primary/30 shrink-0" />
                    <p className="text-xs text-on-surface font-bold leading-tight">Practice box breathing daily</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-primary-container/30 rounded-[40px] p-8 border border-primary/5">
            <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Insights
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Based on today's session, Julianna showed a 15% decrease in negative self-talk compared to last month.
            </p>
            <button className="w-full py-3 bg-white text-primary rounded-xl text-[10px] font-bold uppercase tracking-widest hover:shadow-md transition-all">
              Generate Summary
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
