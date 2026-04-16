import { 
  Share2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Database,
  Shield,
  ArrowRightLeft
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";

const ehrProviders = [
  { 
    id: "epic", 
    name: "Epic", 
    description: "Connect to the Epic EHR network for seamless patient data exchange.",
    status: "disconnected",
    logo: "https://picsum.photos/seed/epic/100/100"
  },
  { 
    id: "cerner", 
    name: "Cerner", 
    description: "Integrate with Cerner Millennium to sync demographics and clinical notes.",
    status: "disconnected",
    logo: "https://picsum.photos/seed/cerner/100/100"
  },
  { 
    id: "athena", 
    name: "Athenahealth", 
    description: "Streamline your workflow with Athenahealth's cloud-based EHR.",
    status: "connected",
    logo: "https://picsum.photos/seed/athena/100/100"
  }
];

export default function Integrations() {
  const [providers, setProviders] = useState(ehrProviders);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or run.app
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }

      if (event.data?.type === 'EHR_AUTH_SUCCESS') {
        const providerId = event.data.provider;
        setProviders(prev => prev.map(p => 
          p.id === providerId ? { ...p, status: 'connected' } : p
        ));
        setIsConnecting(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnect = async (providerId: string) => {
    setIsConnecting(providerId);
    try {
      const response = await fetch(`/api/auth/ehr-url?provider=${providerId}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get auth URL');
      }
      const { url } = await response.json();

      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      window.open(
        url,
        `ehr_auth_${providerId}`,
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } catch (error) {
      console.error('Connection error:', error);
      alert(error instanceof Error ? error.message : 'Failed to connect to EHR');
      setIsConnecting(null);
    }
  };

  const handleSync = (id: string) => {
    setIsSyncing(id);
    setTimeout(() => {
      setIsSyncing(null);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-12 py-10 space-y-12"
    >
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-serif text-on-surface mb-3">Integrations Sanctuary</h2>
          <p className="text-xl text-on-surface-variant/80">Connecting your clinical ecosystem.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary/5 p-8 rounded-[40px] border border-primary/10 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Shield className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif italic text-primary">EHR Connectivity</h3>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-8 relative z-10">
            Securely link your practice with major Electronic Health Record systems. 
            Sync patient demographics, medical history, and session notes automatically 
            to ensure clinical continuity and HIPAA compliance.
          </p>
          <div className="flex items-center gap-3 text-[10px] font-bold text-primary uppercase tracking-widest relative z-10">
            <CheckCircle2 className="w-4 h-4" />
            HIPAA Compliant Data Exchange
          </div>
        </div>

        <div className="bg-surface-container rounded-[40px] p-8 border border-outline-variant/10 shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-secondary/10 rounded-2xl">
              <ArrowRightLeft className="text-secondary w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif italic text-secondary">Data Sync Status</h4>
              <p className="text-xs text-on-surface-variant">Last global sync: 2 hours ago</p>
            </div>
          </div>
          <button 
            onClick={() => handleSync('global')}
            disabled={isSyncing === 'global'}
            className="w-full py-4 bg-white border border-outline-variant/20 rounded-2xl text-sm font-bold text-on-surface hover:bg-surface-container-high transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <RefreshCw className={cn("w-4 h-4", isSyncing === 'global' && "animate-spin")} />
            {isSyncing === 'global' ? "Synchronizing..." : "Sync All Systems"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-outline-variant/10">
          <h3 className="text-2xl font-serif italic text-primary">EHR Providers</h3>
        </div>
        
        <div className="divide-y divide-outline-variant/10">
          {providers.map((provider) => (
            <div key={provider.id} className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-surface-container-low/30 transition-colors">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 rounded-3xl overflow-hidden border border-outline-variant/10 bg-surface-container flex items-center justify-center shrink-0">
                  <img src={provider.logo} alt={provider.name} className="w-12 h-12 object-contain grayscale opacity-50" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-xl font-bold text-on-surface">{provider.name}</h4>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      provider.status === "connected" ? "bg-primary/10 text-primary" : "bg-outline/10 text-on-surface-variant/60"
                    )}>
                      {provider.status}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">{provider.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                {provider.status === "connected" ? (
                  <>
                    <button 
                      onClick={() => handleSync(provider.id)}
                      disabled={isSyncing === provider.id}
                      className="flex-grow md:flex-grow-0 px-6 py-3 bg-surface-container rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container-high transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw className={cn("w-3 h-3", isSyncing === provider.id && "animate-spin")} />
                      Sync Now
                    </button>
                    <button className="flex-grow md:flex-grow-0 px-6 py-3 bg-white border border-outline-variant/20 rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container transition-all flex items-center justify-center gap-2">
                      Configure
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleConnect(provider.id)}
                    disabled={isConnecting === provider.id}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isConnecting === provider.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRightLeft className="w-4 h-4" />}
                    {isConnecting === provider.id ? "Connecting..." : "Connect EHR"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-container rounded-[40px] p-10 border border-outline-variant/10 text-center">
        <Database className="w-12 h-12 text-primary/20 mx-auto mb-6" />
        <h4 className="text-xl font-serif italic text-primary mb-3">Custom Integration?</h4>
        <p className="text-sm text-on-surface-variant max-w-lg mx-auto mb-8">
          If your practice uses a proprietary or niche EHR system, our engineering team can build a custom bridge for you.
        </p>
        <button className="px-8 py-3 bg-white border border-outline-variant/20 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container transition-all">
          Contact Integration Team
        </button>
      </div>
    </motion.div>
  );
}
