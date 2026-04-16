import { Shield, Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[28px] mb-6 shadow-inner">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-serif text-on-surface mb-2">Calm Psych</h1>
          <p className="text-on-surface-variant/60 font-medium text-sm tracking-wide uppercase">Clinician Portal</p>
        </div>

        <div className="bg-white rounded-[40px] p-10 shadow-xl shadow-primary/5 border border-outline-variant/10">
          <div className="mb-8">
            <h2 className="text-2xl font-serif italic text-primary mb-2">Welcome back</h2>
            <p className="text-sm text-on-surface-variant/70">Enter your credentials to access your sanctuary.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/40 group-focus-within:text-primary transition-colors w-5 h-5" />
                <input 
                  type="email" 
                  className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="name@calmpsych.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">Password</label>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline">Forgot password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/40 group-focus-within:text-primary transition-colors w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-12 pr-12 text-sm focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/40 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-outline-variant/30 text-primary focus:ring-primary/20" />
              <label htmlFor="remember" className="text-xs text-on-surface-variant/70 font-medium cursor-pointer">Remember me for 30 days</label>
            </div>

            <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 group">
              Sign In to Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="text-center mt-10 text-xs text-on-surface-variant/60">
          Secure, HIPAA-compliant access. <br />
          Need help? <button className="text-primary font-bold hover:underline">Contact Support</button>
        </p>
      </motion.div>
    </div>
  );
}
