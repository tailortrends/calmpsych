import { 
  ArrowLeft, 
  Save, 
  User, 
  HeartPulse, 
  ShieldAlert, 
  ChevronRight, 
  CheckCircle2,
  Info,
  FileText,
  Plus,
  Trash2,
  Check,
  ChevronDown
} from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { Link, useNavigate } from "react-router-dom";

const steps = [
  { id: 1, key: 'personal', label: 'Personal Info', icon: User },
  { id: 2, key: 'medical', label: 'Medical History', icon: HeartPulse },
  { id: 3, key: 'emergency', label: 'Emergency Contacts', icon: ShieldAlert },
  { id: 4, key: 'consent', label: 'Consent & Privacy', icon: FileText },
  { id: 5, key: 'summary', label: 'Review Summary', icon: CheckCircle2 },
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

export default function IntakeForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [expandedSections, setExpandedSections] = useState<string[]>(['reason']);
  const [formData, setFormData] = useState({
    fullName: "Julianna Abbott",
    preferredName: "Jules",
    dob: "1995-04-24",
    gender: "female",
    phone: "(555) 123-4567",
    email: "j.abbott@example.com",
    address: "123 Sanctuary Way, Calm City, CA 90210",
    occupation: "Creative Director",
    reason: "Experiencing increased anxiety and difficulty focusing at work over the past 3 months.",
    medications: "None",
    allergies: "Penicillin",
    chronic: "Occasional migraines",
    surgeries: "None",
    familyHistory: "Mother has a history of clinical depression.",
    prevTreatment: "Yes",
    emergencyContactName: "Marcus Thorne",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "(555) 987-6543",
    signed: ""
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < steps.length) {
      setStep(step + 1);
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/patients");
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto px-12 py-10 space-y-10"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/patients" className="p-2 bg-white rounded-xl border border-outline-variant/10 hover:border-primary/20 shadow-sm transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-3xl font-serif text-on-surface">Intake Sanctuary</h2>
            <p className="text-sm text-on-surface-variant/60 font-medium mt-1">Welcoming a new soul into your practice.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-outline-variant/20 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container transition-all">
            Save Draft
          </button>
          {step === 5 && (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? "Finalizing..." : (
                <>
                  <Save className="w-4 h-4" />
                  Finalize Intake
                </>
              )}
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Navigation / Progress */}
        <div className="lg:col-span-3 space-y-6 sticky top-24 h-fit">
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/10 shadow-sm space-y-2">
            {steps.map((s) => (
              <button 
                key={s.id}
                onClick={() => setStep(s.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all group",
                  step === s.id 
                    ? "bg-primary/5 text-primary" 
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                  step === s.id ? "bg-primary text-white" : 
                  step > s.id ? "bg-primary/10 text-primary" : "bg-surface-container text-outline/40"
                )}>
                  {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
              </button>
            ))}
          </div>
          
          <div className="p-6 bg-primary-container/30 rounded-3xl border border-primary/5">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-3">Intake Tip</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed italic">
              "A thorough intake is the first step in building a therapeutic alliance."
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Progress Bar */}
          <div className="bg-white rounded-3xl p-6 border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Step {step} of {steps.length}</span>
              <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{Math.round((step / steps.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-surface-container rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(step / steps.length) * 100}%` }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.section 
                  key="personal"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-8"
                >
                  <motion.div variants={itemVariants} className="flex items-center gap-3 text-primary">
                    <User className="w-6 h-6" />
                    <h3 className="text-2xl font-serif italic">Personal Information</h3>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                        placeholder="e.g. Julianna Abbott" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Preferred Name</label>
                      <input 
                        type="text" 
                        value={formData.preferredName}
                        onChange={(e) => setFormData({...formData, preferredName: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                        placeholder="e.g. Jules" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Date of Birth</label>
                      <input 
                        type="date" 
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Gender Identity</label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                      >
                        <option value="">Select identity</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                        placeholder="(555) 000-0000" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                        placeholder="name@example.com" 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Home Address</label>
                      <input 
                        type="text" 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                        placeholder="Street, City, State, Zip" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Occupation</label>
                      <input 
                        type="text" 
                        value={formData.occupation}
                        onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                        placeholder="e.g. Software Engineer" 
                      />
                    </div>
                  </motion.div>
                </motion.section>
              )}

              {step === 2 && (
                <motion.section 
                  key="medical"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-8"
                >
                  <motion.div variants={itemVariants} className="flex items-center gap-3 text-secondary">
                    <HeartPulse className="w-6 h-6" />
                    <h3 className="text-2xl font-serif italic text-secondary">Medical History</h3>
                  </motion.div>
                  
                  <div className="space-y-4">
                    {/* Primary Reason - Always visible or collapsible */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Primary Reason for Seeking Therapy</label>
                      <textarea 
                        value={formData.reason}
                        onChange={(e) => setFormData({...formData, reason: e.target.value})}
                        className="w-full min-h-[120px] bg-surface-container-low border-none rounded-2xl p-6 text-sm text-on-surface leading-relaxed focus:ring-2 focus:ring-primary/10 transition-all resize-none" 
                        placeholder="Please describe what brings you here today..." 
                      />
                    </motion.div>

                    {/* Medications & Allergies */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Current Medications</label>
                        <input 
                          type="text" 
                          value={formData.medications}
                          onChange={(e) => setFormData({...formData, medications: e.target.value})}
                          className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                          placeholder="List medications and dosages" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Known Allergies</label>
                        <input 
                          type="text" 
                          value={formData.allergies}
                          onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                          className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                          placeholder="List any allergies" 
                        />
                      </div>
                    </motion.div>

                    {/* Collapsible: Chronic Conditions */}
                    <motion.div variants={itemVariants} className="border border-outline-variant/10 rounded-3xl overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => toggleSection('chronic')}
                        className="w-full flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container transition-all"
                      >
                        <span className="text-xs font-bold text-on-surface uppercase tracking-wider">Chronic Conditions</span>
                        <ChevronDown className={cn("w-4 h-4 text-outline/40 transition-transform", expandedSections.includes('chronic') && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {expandedSections.includes('chronic') && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="p-6 space-y-4 border-t border-outline-variant/10"
                          >
                            <p className="text-xs text-on-surface-variant/60">Please list any ongoing medical conditions (e.g., diabetes, hypertension, asthma).</p>
                            <textarea 
                              value={formData.chronic}
                              onChange={(e) => setFormData({...formData, chronic: e.target.value})}
                              className="w-full min-h-[100px] bg-white border border-outline-variant/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all resize-none" 
                              placeholder="Describe any chronic conditions..." 
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Collapsible: Past Surgeries */}
                    <motion.div variants={itemVariants} className="border border-outline-variant/10 rounded-3xl overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => toggleSection('surgeries')}
                        className="w-full flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container transition-all"
                      >
                        <span className="text-xs font-bold text-on-surface uppercase tracking-wider">Past Surgeries</span>
                        <ChevronDown className={cn("w-4 h-4 text-outline/40 transition-transform", expandedSections.includes('surgeries') && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {expandedSections.includes('surgeries') && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="p-6 space-y-4 border-t border-outline-variant/10"
                          >
                            <p className="text-xs text-on-surface-variant/60">List any major surgeries and approximate dates.</p>
                            <textarea 
                              value={formData.surgeries}
                              onChange={(e) => setFormData({...formData, surgeries: e.target.value})}
                              className="w-full min-h-[100px] bg-white border border-outline-variant/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all resize-none" 
                              placeholder="e.g. Appendectomy (2015), Knee Surgery (2018)..." 
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Collapsible: Family History */}
                    <motion.div variants={itemVariants} className="border border-outline-variant/10 rounded-3xl overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => toggleSection('family')}
                        className="w-full flex items-center justify-between p-6 bg-surface-container-low hover:bg-surface-container transition-all"
                      >
                        <span className="text-xs font-bold text-on-surface uppercase tracking-wider">Family Mental Health History</span>
                        <ChevronDown className={cn("w-4 h-4 text-outline/40 transition-transform", expandedSections.includes('family') && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {expandedSections.includes('family') && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="p-6 space-y-4 border-t border-outline-variant/10"
                          >
                            <p className="text-xs text-on-surface-variant/60">Please describe any history of mental health issues in your immediate family (parents, siblings, grandparents).</p>
                            <textarea 
                              value={formData.familyHistory}
                              onChange={(e) => setFormData({...formData, familyHistory: e.target.value})}
                              className="w-full min-h-[100px] bg-white border border-outline-variant/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all resize-none" 
                              placeholder="e.g. Mother (Anxiety), Paternal Grandfather (Depression)..." 
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4 pt-4">
                      <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Previous Mental Health Treatment</p>
                      <div className="flex gap-4">
                        <label className="flex-1 flex items-center justify-center gap-3 p-4 bg-surface-container-low rounded-2xl border-2 border-transparent cursor-pointer hover:border-primary/20 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                          <input 
                            type="radio" 
                            name="prev_treatment" 
                            className="hidden" 
                            checked={formData.prevTreatment === "Yes"}
                            onChange={() => setFormData({...formData, prevTreatment: "Yes"})}
                          />
                          <span className="text-sm font-bold text-on-surface">Yes</span>
                        </label>
                        <label className="flex-1 flex items-center justify-center gap-3 p-4 bg-surface-container-low rounded-2xl border-2 border-transparent cursor-pointer hover:border-primary/20 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                          <input 
                            type="radio" 
                            name="prev_treatment" 
                            className="hidden" 
                            checked={formData.prevTreatment === "No"}
                            onChange={() => setFormData({...formData, prevTreatment: "No"})}
                          />
                          <span className="text-sm font-bold text-on-surface">No</span>
                        </label>
                      </div>
                    </motion.div>
                  </div>
                </motion.section>
              )}

              {step === 3 && (
                <motion.section 
                  key="emergency"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-8"
                >
                  <motion.div variants={itemVariants} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-error">
                      <ShieldAlert className="w-6 h-6" />
                      <h3 className="text-2xl font-serif italic text-error">Emergency Contacts</h3>
                    </div>
                    <button type="button" className="p-2 bg-error/5 text-error rounded-xl hover:bg-error/10 transition-all">
                      <Plus className="w-5 h-5" />
                    </button>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-surface-container-low rounded-3xl relative group">
                      <button type="button" className="absolute -top-2 -right-2 p-2 bg-white text-error rounded-full shadow-sm border border-outline-variant/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Name</label>
                        <input 
                          type="text" 
                          value={formData.emergencyContactName}
                          onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})}
                          className="w-full bg-white border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                          placeholder="Contact Name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Relationship</label>
                        <input 
                          type="text" 
                          value={formData.emergencyContactRelation}
                          onChange={(e) => setFormData({...formData, emergencyContactRelation: e.target.value})}
                          className="w-full bg-white border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                          placeholder="e.g. Spouse, Parent" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Phone</label>
                        <input 
                          type="tel" 
                          value={formData.emergencyContactPhone}
                          onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})}
                          className="w-full bg-white border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all" 
                          placeholder="(555) 000-0000" 
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.section>
              )}

              {step === 4 && (
                <motion.section 
                  key="consent"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-8"
                >
                  <motion.div variants={itemVariants} className="flex items-center gap-3 text-primary">
                    <FileText className="w-6 h-6" />
                    <h3 className="text-2xl font-serif italic text-primary">Consent & Privacy</h3>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/5 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <input type="checkbox" id="hipaa" className="w-5 h-5 rounded border-outline-variant/30 text-primary focus:ring-primary/20" />
                      </div>
                      <label htmlFor="hipaa" className="text-sm text-on-surface leading-relaxed cursor-pointer">
                        I acknowledge that I have received and read the <button type="button" className="text-primary font-bold hover:underline">Notice of Privacy Practices (HIPAA)</button>.
                      </label>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <input type="checkbox" id="consent_treatment" className="w-5 h-5 rounded border-outline-variant/30 text-primary focus:ring-primary/20" />
                      </div>
                      <label htmlFor="consent_treatment" className="text-sm text-on-surface leading-relaxed cursor-pointer">
                        I give my informed consent to participate in mental health treatment with Calm Psych.
                      </label>
                    </div>

                    <div className="pt-6 border-t border-outline-variant/10">
                      <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] mb-4">Digital Signature</p>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={formData.signed}
                          onChange={(e) => setFormData({...formData, signed: e.target.value})}
                          className="w-full bg-white border-none rounded-2xl py-4 px-6 text-sm font-serif italic text-xl focus:ring-2 focus:ring-primary/10 transition-all" 
                          placeholder="Type your full name to sign" 
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Signed Electronically</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.section>
              )}

              {step === 5 && (
                <motion.section 
                  key="summary"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-[40px] p-10 border border-outline-variant/10 shadow-sm space-y-8"
                >
                  <motion.div variants={itemVariants} className="flex items-center gap-3 text-primary">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="text-2xl font-serif italic">Review Summary</h3>
                  </motion.div>

                  <div className="space-y-8">
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest border-b border-primary/10 pb-2">Personal Details</h4>
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-on-surface-variant/60">Full Name: <span className="text-on-surface font-medium">{formData.fullName}</span></p>
                          <p className="text-xs font-bold text-on-surface-variant/60">Date of Birth: <span className="text-on-surface font-medium">{formData.dob}</span></p>
                          <p className="text-xs font-bold text-on-surface-variant/60">Contact: <span className="text-on-surface font-medium">{formData.phone}</span></p>
                          <p className="text-xs font-bold text-on-surface-variant/60">Email: <span className="text-on-surface font-medium">{formData.email}</span></p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest border-b border-secondary/10 pb-2">Clinical Context</h4>
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-on-surface-variant/60">Primary Reason: <span className="text-on-surface font-medium line-clamp-2">{formData.reason}</span></p>
                          <p className="text-xs font-bold text-on-surface-variant/60">Allergies: <span className="text-on-surface font-medium">{formData.allergies}</span></p>
                          <p className="text-xs font-bold text-on-surface-variant/60">Medications: <span className="text-on-surface font-medium">{formData.medications}</span></p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/5 flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl shadow-sm">
                        <ShieldAlert className="w-5 h-5 text-error" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-error uppercase tracking-widest">Emergency Contact</p>
                        <p className="text-sm font-bold text-on-surface">{formData.emergencyContactName} ({formData.emergencyContactRelation}) • {formData.emergencyContactPhone}</p>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-bold text-primary italic">Consent & HIPAA agreements signed by {formData.signed || formData.fullName}</span>
                      </div>
                      <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Verified</span>
                    </motion.div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <div className="flex justify-between gap-4 pt-10">
              <div className="flex gap-4">
                {step > 1 && (
                  <button 
                    type="button" 
                    onClick={() => setStep(step - 1)} 
                    className="px-8 py-4 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                  >
                    Back
                  </button>
                )}
                <button type="button" onClick={() => navigate("/patients")} className="px-8 py-4 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Cancel</button>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dim transition-all shadow-xl shadow-primary/10 flex items-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? "Finalizing..." : (
                  <>
                    {step === 5 ? "Complete Intake" : "Continue"}
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
