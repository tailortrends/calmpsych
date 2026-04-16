import { 
  ArrowLeft, 
  Plus, 
  Save, 
  Trash2, 
  FileText, 
  Sparkles,
  ChevronRight,
  Layout,
  Settings,
  GripVertical
} from "lucide-react";
import { motion, AnimatePresence, Reorder } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

interface TemplateField {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

interface NoteTemplate {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  aiPrompt: string;
}

const initialTemplates: NoteTemplate[] = [
  {
    id: "soap",
    name: "SOAP Note",
    description: "Standard Subjective, Objective, Assessment, and Plan format.",
    fields: [
      { id: "s", label: "Subjective", placeholder: "Patient's reports, feelings, and experiences..." },
      { id: "o", label: "Objective", placeholder: "Observable findings, affect, and behavior..." },
      { id: "a", label: "Assessment", placeholder: "Clinical interpretation and progress..." },
      { id: "p", label: "Plan", placeholder: "Next steps and interventions..." }
    ],
    aiPrompt: "Summarize the session using the SOAP format. Focus on clinical progress and behavioral changes."
  },
  {
    id: "cbt",
    name: "CBT Progress Note",
    description: "Focused on cognitive distortions and behavioral interventions.",
    fields: [
      { id: "distortions", label: "Cognitive Distortions", placeholder: "Identified distortions (e.g., catastrophizing)..." },
      { id: "homework", label: "Homework Review", placeholder: "Review of previous session's homework..." },
      { id: "interventions", label: "Interventions", placeholder: "CBT techniques applied (e.g., restructuring)..." }
    ],
    aiPrompt: "Analyze the session for cognitive distortions and suggest specific CBT homework for the next week."
  }
];

export default function NoteTemplates() {
  const [templates, setTemplates] = useState<NoteTemplate[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<NoteTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (template: NoteTemplate) => {
    setTemplates(prev => {
      const exists = prev.find(t => t.id === template.id);
      if (exists) {
        return prev.map(t => t.id === template.id ? template : t);
      }
      return [...prev, template];
    });
    setIsEditing(false);
  };

  const handleDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    if (selectedTemplate?.id === id) setSelectedTemplate(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-12 py-10 space-y-12"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/session-note" className="p-2 bg-white rounded-xl border border-outline-variant/10 hover:border-primary/20 shadow-sm transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-4xl font-serif text-on-surface">Documentation Templates</h2>
            <p className="text-lg text-on-surface-variant/80 mt-1">Design your clinical documentation sanctuary.</p>
          </div>
        </div>
        <button 
          onClick={() => {
            const newTemplate: NoteTemplate = {
              id: Math.random().toString(36).substr(2, 9),
              name: "New Template",
              description: "A custom documentation format.",
              fields: [{ id: "f1", label: "Field 1", placeholder: "Enter text..." }],
              aiPrompt: "Summarize this session."
            };
            setSelectedTemplate(newTemplate);
            setIsEditing(true);
          }}
          className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Template List */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-4">Your Templates</h3>
          <div className="space-y-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setSelectedTemplate(template);
                  setIsEditing(false);
                }}
                className={cn(
                  "w-full text-left p-6 rounded-[32px] border transition-all group relative overflow-hidden",
                  selectedTemplate?.id === template.id 
                    ? "bg-primary/5 border-primary/20 shadow-sm" 
                    : "bg-white border-outline-variant/10 hover:border-primary/20"
                )}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={cn(
                    "p-3 rounded-2xl transition-colors",
                    selectedTemplate?.id === template.id ? "bg-primary/10 text-primary" : "bg-surface-container text-on-surface-variant/40"
                  )}>
                    <Layout className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-on-surface">{template.name}</h4>
                    <p className="text-xs text-on-surface-variant/60 mt-1 line-clamp-1">{template.description}</p>
                  </div>
                  <ChevronRight className={cn(
                    "w-4 h-4 transition-all",
                    selectedTemplate?.id === template.id ? "text-primary translate-x-0" : "text-outline/20 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                  )} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Template Editor/Viewer */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedTemplate ? (
              <motion.div
                key={selectedTemplate.id + (isEditing ? "-edit" : "-view")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[40px] border border-outline-variant/10 shadow-sm overflow-hidden"
              >
                <div className="p-10 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
                  <div>
                    <h3 className="text-2xl font-serif italic text-primary">
                      {isEditing ? "Editing Template" : selectedTemplate.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-1">{selectedTemplate.description}</p>
                  </div>
                  <div className="flex gap-3">
                    {!isEditing && (
                      <button 
                        onClick={() => handleDelete(selectedTemplate.id)}
                        className="p-3 text-error hover:bg-error/5 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-6 py-3 bg-white border border-outline-variant/20 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container transition-all"
                    >
                      {isEditing ? "Cancel" : "Edit Details"}
                    </button>
                    {isEditing && (
                      <button 
                        onClick={() => handleSave(selectedTemplate)}
                        className="px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Template
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-10 space-y-10">
                  {isEditing ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Template Name</label>
                          <input 
                            value={selectedTemplate.name}
                            onChange={(e) => setSelectedTemplate({...selectedTemplate, name: e.target.value})}
                            className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Description</label>
                          <input 
                            value={selectedTemplate.description}
                            onChange={(e) => setSelectedTemplate({...selectedTemplate, description: e.target.value})}
                            className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Note Fields</label>
                          <button 
                            onClick={() => setSelectedTemplate({
                              ...selectedTemplate, 
                              fields: [...selectedTemplate.fields, { id: Math.random().toString(), label: "New Field", placeholder: "Enter text..." }]
                            })}
                            className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
                          >
                            <Plus className="w-3 h-3" /> Add Field
                          </button>
                        </div>
                        <Reorder.Group 
                          axis="y" 
                          values={selectedTemplate.fields} 
                          onReorder={(newFields) => setSelectedTemplate({...selectedTemplate, fields: newFields})}
                          className="space-y-4 min-p-4"
                        >
                          {selectedTemplate.fields.map((field, idx) => (
                            <Reorder.Item 
                              key={field.id} 
                              value={field}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                type: "spring", 
                                damping: 30, 
                                stiffness: 400,
                                opacity: { duration: 0.2 }
                              }}
                              whileDrag={{ 
                                scale: 1.03,
                                zIndex: 100,
                                backgroundColor: "white",
                                boxShadow: "0 20px 40px -8px rgb(var(--color-primary-rgb) / 0.12)"
                              }}
                              className="flex gap-4 items-center group/field p-2 rounded-[32px] transition-all relative"
                            >
                              <motion.div 
                                whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary-container)" }}
                                whileTap={{ cursor: "grabbing" }}
                                className="cursor-grab active:cursor-grabbing p-3 text-outline/30 hover:text-primary transition-all bg-white rounded-2xl border border-outline-variant/10 shadow-sm"
                              >
                                <GripVertical className="w-5 h-5" />
                              </motion.div>
                              <div className="flex-grow grid grid-cols-2 gap-6 p-6 bg-white rounded-[32px] border border-outline-variant/10 group-hover/field:border-primary/30 transition-all shadow-sm group-hover/field:shadow-md">
                                <input 
                                  value={field.label}
                                  onChange={(e) => {
                                    const newFields = [...selectedTemplate.fields];
                                    newFields[idx].label = e.target.value;
                                    setSelectedTemplate({...selectedTemplate, fields: newFields});
                                  }}
                                  placeholder="Field Label"
                                  className="bg-white border-none rounded-xl py-2 px-4 text-xs font-bold focus:ring-2 focus:ring-primary/10"
                                />
                                <input 
                                  value={field.placeholder}
                                  onChange={(e) => {
                                    const newFields = [...selectedTemplate.fields];
                                    newFields[idx].placeholder = e.target.value;
                                    setSelectedTemplate({...selectedTemplate, fields: newFields});
                                  }}
                                  placeholder="Placeholder text"
                                  className="bg-white border-none rounded-xl py-2 px-4 text-xs focus:ring-2 focus:ring-primary/10"
                                />
                                <div className="col-span-2 flex items-center justify-between pt-2 border-t border-outline-variant/5">
                                  <label className="flex items-center gap-2 cursor-pointer group/toggle">
                                    <div className="relative inline-flex items-center">
                                      <input 
                                        type="checkbox" 
                                        className="sr-only peer"
                                        checked={field.required}
                                        onChange={(e) => {
                                          const newFields = [...selectedTemplate.fields];
                                          newFields[idx].required = e.target.checked;
                                          setSelectedTemplate({...selectedTemplate, fields: newFields});
                                        }}
                                      />
                                      <div className="w-8 h-4 bg-outline-variant/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-on-surface-variant/60 group-hover/toggle:text-primary transition-colors">Mandatory Field</span>
                                  </label>
                                  {field.required && (
                                    <span className="text-[10px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">Required</span>
                                  )}
                                </div>
                              </div>
                              <button 
                                onClick={() => {
                                  const newFields = selectedTemplate.fields.filter((_, i) => i !== idx);
                                  setSelectedTemplate({...selectedTemplate, fields: newFields});
                                }}
                                className="p-3 text-error/40 hover:text-error transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </Reorder.Item>
                          ))}
                        </Reorder.Group>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">AI Assist Prompt</label>
                        </div>
                        <textarea 
                          value={selectedTemplate.aiPrompt}
                          onChange={(e) => setSelectedTemplate({...selectedTemplate, aiPrompt: e.target.value})}
                          className="w-full min-h-[120px] bg-primary/5 border-none rounded-3xl p-6 text-sm text-on-surface leading-relaxed focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                          placeholder="Instructions for the AI when analyzing this note..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Structure Preview</h4>
                        <div className="space-y-6">
                          {selectedTemplate.fields.map((field) => (
                            <div key={field.id} className="space-y-3">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-on-surface">{field.label}</p>
                                {field.required && <span className="text-error text-xs">*</span>}
                              </div>
                              <div className={cn(
                                "w-full h-20 bg-surface-container-low rounded-2xl border flex items-center justify-center transition-all",
                                field.required ? "border-primary/20 bg-primary/[0.02]" : "border-dashed border-outline-variant/20"
                              )}>
                                <p className="text-xs text-on-surface-variant/30 italic">{field.placeholder}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 bg-primary/5 rounded-[32px] border border-primary/10">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="text-primary w-5 h-5" />
                          <h4 className="text-sm font-bold text-primary uppercase tracking-widest">AI Intelligence</h4>
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed italic">
                          "{selectedTemplate.aiPrompt}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-20 bg-surface-container-low rounded-[40px] border border-dashed border-outline-variant/20">
                <div className="p-6 bg-white rounded-3xl shadow-sm mb-6">
                  <FileText className="w-12 h-12 text-outline/20" />
                </div>
                <h3 className="text-2xl font-serif italic text-on-surface-variant/40">Select a template to view or edit</h3>
                <p className="text-sm text-on-surface-variant/30 mt-2 max-w-xs">
                  Choose from your existing clinical formats or create a new one to streamline your documentation.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
