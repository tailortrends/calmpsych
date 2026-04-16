import { 
  ArrowLeft, 
  Calendar, 
  Download
} from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import PatientDetailContent from "../components/PatientDetailContent";

export default function PatientProfile() {
  const { id } = useParams();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-12 py-10 space-y-10"
    >
      <header className="flex items-center justify-between">
        <Link to="/patients" className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors group">
          <div className="p-2 bg-white rounded-xl border border-outline-variant/10 group-hover:border-primary/20 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">Back to Registry</span>
        </Link>
        <div className="flex gap-4">
          <Link to={`/book-appointment?patientId=${id}`} className="px-6 py-3 bg-white border border-outline-variant/20 rounded-xl text-sm font-bold text-primary hover:bg-primary-container transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Book Session
          </Link>
          <button className="px-6 py-3 bg-white border border-outline-variant/20 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Records
          </button>
          <button className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10">
            Edit Profile
          </button>
        </div>
      </header>

      <PatientDetailContent patientId={id} />
    </motion.div>
  );
}
