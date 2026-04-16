import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Filter, 
  MoreHorizontal, 
  CreditCard, 
  Banknote,
  Calendar,
  Search,
  Bell,
  Settings,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  User,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  FileBarChart,
  ChevronDown,
  X as CloseIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Cell, 
  Pie
} from 'recharts';

const transactions = [
  { id: 1, patient: "Julianna Abbott", date: "Oct 24, 2023", amount: 150.00, status: "paid", method: "Insurance (BCBS)" },
  { id: 2, patient: "Marcus Thorne", date: "Oct 23, 2023", amount: 120.00, status: "pending", method: "Self-Pay" },
  { id: 3, patient: "Elena Rodriguez", date: "Oct 22, 2023", amount: 150.00, status: "paid", method: "Insurance (Aetna)" },
  { id: 4, patient: "James Wilson", date: "Oct 21, 2023", amount: 200.00, status: "overdue", method: "Self-Pay" },
  { id: 5, patient: "Sarah Miller", date: "Oct 20, 2023", amount: 150.00, status: "paid", method: "Insurance (Cigna)" },
];

const revenueData = [
  { month: 'May', revenue: 8500 },
  { month: 'Jun', revenue: 9200 },
  { month: 'Jul', revenue: 10100 },
  { month: 'Aug', revenue: 9800 },
  { month: 'Sep', revenue: 11500 },
  { month: 'Oct', revenue: 12450 },
];

const agingData = [
  { range: '0-30 Days', amount: 1200 },
  { range: '31-60 Days', amount: 650 },
  { range: '61-90 Days', amount: 230 },
  { range: '90+ Days', amount: 100 },
];

const claimStatusData = [
  { name: 'Approved', value: 84, color: '#006B5E' },
  { name: 'Pending', value: 12, color: '#FFB400' },
  { name: 'Denied', value: 4, color: '#BA1A1A' },
];

export default function Billing() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'reports'>('transactions');
  const [autoReminders, setAutoReminders] = useState(true);
  const [sendingReminder, setSendingReminder] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tx.method.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    const matchesMethod = methodFilter === "all" || tx.method.includes(methodFilter);
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const paymentMethods = Array.from(new Set(transactions.map(tx => {
    if (tx.method.includes("Insurance")) return "Insurance";
    return tx.method;
  })));

  const handleSendReminder = (id: number) => {
    setSendingReminder(id);
    // Simulate API call
    setTimeout(() => {
      setSendingReminder(null);
      setShowSuccess(id === -1 ? "All reminders sent successfully" : "Reminder sent successfully");
      setTimeout(() => setShowSuccess(null), 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-12 py-10 space-y-12"
    >
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-5xl font-serif text-on-surface mb-3">Financial Sanctuary</h2>
          <p className="text-xl text-on-surface-variant/80">Managing your practice's abundance.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-outline-variant/20 rounded-xl text-sm font-bold text-on-surface hover:bg-surface-container transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button 
            onClick={() => handleSendReminder(-1)}
            disabled={sendingReminder === -1}
            className="px-6 py-3 bg-white border border-error/20 text-error rounded-xl text-sm font-bold hover:bg-error/5 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {sendingReminder === -1 ? (
              <div className="w-4 h-4 border-2 border-error/30 border-t-error rounded-full animate-spin" />
            ) : (
              <Bell className="w-4 h-4" />
            )}
            {sendingReminder === -1 ? "Sending..." : "Manual Reminder"}
          </button>
          <button 
            onClick={() => setShowInvoiceModal(true)}
            className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10"
          >
            Create Invoice
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[32px] border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-primary/5 rounded-2xl">
                <TrendingUp className="text-primary w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
                <ArrowUpRight className="w-3 h-3" />
                12%
              </span>
            </div>
            <p className="text-sm font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">Monthly Revenue</p>
            <h3 className="text-4xl font-serif text-on-surface">$12,450.00</h3>
            <p className="text-xs text-on-surface-variant mt-4">Compared to $11,116 last month</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-secondary/5 rounded-2xl">
                <CreditCard className="text-secondary w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full uppercase tracking-wider">
                Pending
              </span>
            </div>
            <p className="text-sm font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">Outstanding</p>
            <h3 className="text-4xl font-serif text-on-surface">$2,180.00</h3>
            <p className="text-xs text-on-surface-variant mt-4">8 invoices awaiting payment</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] border border-outline-variant/10 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-tertiary/5 rounded-2xl">
                <Banknote className="text-tertiary w-6 h-6" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-error bg-error/10 px-2 py-1 rounded-full uppercase tracking-wider">
                <ArrowDownRight className="w-3 h-3" />
                4%
              </span>
            </div>
            <p className="text-sm font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">Insurance Claims</p>
            <h3 className="text-4xl font-serif text-on-surface">84%</h3>
            <p className="text-xs text-on-surface-variant mt-4">Approval rate this month</p>
          </div>
        </div>

        {/* Automated Reminders Panel */}
        <div className="lg:col-span-4 bg-surface-container rounded-[32px] p-8 border border-outline-variant/10 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-serif italic text-primary flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Reminders
            </h4>
            <button className="p-2 text-on-surface-variant/40 hover:text-primary transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-outline-variant/5">
              <div>
                <p className="text-sm font-bold text-on-surface">Automated Reminders</p>
                <p className="text-[10px] text-on-surface-variant/60">Send email 3 days after due date</p>
              </div>
              <button 
                onClick={() => setAutoReminders(!autoReminders)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  autoReminders ? "bg-primary" : "bg-outline/20"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  autoReminders ? "left-7" : "left-1"
                )} />
              </button>
            </div>

            <div className="p-5 bg-error/5 rounded-2xl border border-error/10">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-error w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-error">3 Overdue Invoices</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Manual action recommended for invoices older than 30 days.</p>
                </div>
              </div>
              <button 
                onClick={() => handleSendReminder(-1)} // -1 to simulate "all"
                disabled={sendingReminder === -1}
                className="w-full mt-4 py-3 bg-error text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-error/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sendingReminder === -1 ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-3 h-3" />
                )}
                {sendingReminder === -1 ? "Sending..." : "Send All Reminders"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-outline-variant/10">
        <button 
          onClick={() => setActiveTab('transactions')}
          className={cn(
            "pb-4 text-sm font-bold uppercase tracking-widest transition-all relative",
            activeTab === 'transactions' ? "text-primary" : "text-on-surface-variant/40 hover:text-on-surface-variant"
          )}
        >
          Transactions
          {activeTab === 'transactions' && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={cn(
            "pb-4 text-sm font-bold uppercase tracking-widest transition-all relative",
            activeTab === 'reports' ? "text-primary" : "text-on-surface-variant/40 hover:text-on-surface-variant"
          )}
        >
          Financial Reports
          {activeTab === 'reports' && (
            <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'transactions' ? (
          <motion.div 
            key="transactions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-[40px] border border-outline-variant/10 shadow-sm overflow-hidden"
          >
            <div className="p-10 border-b border-outline-variant/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                <h3 className="text-2xl font-serif italic text-primary">Recent Transactions</h3>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative flex-grow md:flex-grow-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 w-4 h-4" />
                    <input 
                      className="bg-surface-container border-none rounded-xl py-2.5 pl-11 pr-6 text-sm w-full md:w-64 focus:ring-1 focus:ring-primary/20 placeholder:text-outline/60 transition-all" 
                      placeholder="Search transactions..." 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                      "p-2.5 rounded-xl transition-all flex items-center gap-2 text-sm font-bold",
                      showFilters ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                    )}
                  >
                    <Filter className="w-5 h-5" />
                    <span className="hidden sm:inline">Filters</span>
                    {(statusFilter !== "all" || methodFilter !== "all") && (
                      <span className="w-2 h-2 bg-secondary rounded-full" />
                    )}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-outline-variant/5">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Status</label>
                        <div className="relative">
                          <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full bg-surface-container border-none rounded-xl py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary/20 appearance-none cursor-pointer pr-10"
                          >
                            <option value="all">All Statuses</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/40 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest ml-1">Payment Method</label>
                        <div className="relative">
                          <select 
                            value={methodFilter}
                            onChange={(e) => setMethodFilter(e.target.value)}
                            className="w-full bg-surface-container border-none rounded-xl py-2.5 px-4 text-sm focus:ring-1 focus:ring-primary/20 appearance-none cursor-pointer pr-10"
                          >
                            <option value="all">All Methods</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Self-Pay">Self-Pay</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/40 pointer-events-none" />
                        </div>
                      </div>

                      <div className="flex items-end">
                        <button 
                          onClick={() => {
                            setStatusFilter("all");
                            setMethodFilter("all");
                            setSearchQuery("");
                          }}
                          className="text-xs font-bold text-primary hover:underline underline-offset-4 flex items-center gap-2"
                        >
                          <CloseIcon className="w-3 h-3" />
                          Clear All Filters
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Patient</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Date</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Method</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Amount</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-10 py-5 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-surface-container-low/50 transition-colors group cursor-pointer">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold text-xs">
                            {tx.patient.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-bold text-on-surface">{tx.patient}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm text-on-surface-variant font-medium">{tx.date}</td>
                      <td className="px-10 py-6 text-sm text-on-surface-variant font-medium">{tx.method}</td>
                      <td className="px-10 py-6 font-bold text-on-surface">${tx.amount.toFixed(2)}</td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          tx.status === "paid" && "bg-primary/10 text-primary",
                          tx.status === "pending" && "bg-secondary/10 text-secondary",
                          tx.status === "overdue" && "bg-error/10 text-error"
                        )}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {tx.status === "overdue" && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleSendReminder(tx.id); }}
                              disabled={sendingReminder === tx.id}
                              className="px-4 py-2 bg-error text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-error/90 transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                              {sendingReminder === tx.id ? (
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <Send className="w-3 h-3" />
                              )}
                              Send Reminder
                            </button>
                          )}
                          <button className="p-2 text-outline/40 hover:text-primary transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="p-20 text-center">
                <div className="bg-surface-container w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-outline/20" />
                </div>
                <h4 className="text-lg font-serif italic text-on-surface-variant/40">No transactions match your filters</h4>
                <p className="text-sm text-on-surface-variant/20 mt-2">Try adjusting your search or filter settings.</p>
              </div>
            ) : (
              <div className="p-8 bg-surface-container-low/30 flex justify-center">
                <button className="text-sm font-bold text-primary hover:underline underline-offset-4">View All Transactions</button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="reports"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Summary Chart */}
              <div className="bg-white p-10 rounded-[40px] border border-outline-variant/10 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="text-xl font-serif italic text-primary flex items-center gap-2">
                      <LineChartIcon className="w-5 h-5" />
                      Revenue Summary
                    </h4>
                    <p className="text-xs text-on-surface-variant/60 mt-1">Growth over last 6 months</p>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-primary">+12.5%</span>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#006B5E" 
                        strokeWidth={4} 
                        dot={{ r: 6, fill: '#006B5E', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Aging Accounts Receivable */}
              <div className="bg-white p-10 rounded-[40px] border border-outline-variant/10 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="text-xl font-serif italic text-primary flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Outstanding Invoices
                    </h4>
                    <p className="text-xs text-on-surface-variant/60 mt-1">Aging of accounts receivable</p>
                  </div>
                  <div className="flex items-center gap-2 bg-secondary/5 px-4 py-2 rounded-full">
                    <FileBarChart className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold text-secondary">8 Active</span>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agingData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="range" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        cursor={{ fill: '#f8f8f8' }}
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          borderRadius: '16px', 
                          border: 'none', 
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }} 
                      />
                      <Bar 
                        dataKey="amount" 
                        fill="#006B5E" 
                        radius={[10, 10, 0, 0]} 
                        barSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insurance Claim Statuses */}
              <div className="bg-white p-10 rounded-[40px] border border-outline-variant/10 shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="text-xl font-serif italic text-primary flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5" />
                      Insurance Claim Statuses
                    </h4>
                    <p className="text-xs text-on-surface-variant/60 mt-1">Distribution of claims this month</p>
                  </div>
                  <div className="flex items-center gap-6">
                    {claimStatusData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{item.name}</span>
                        <span className="text-xs font-bold text-on-surface">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <div className="w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={claimStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          {claimStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-6 pl-10">
                    <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/5">
                      <h5 className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-2">Top Payer</h5>
                      <p className="text-lg font-bold text-on-surface">Blue Cross Blue Shield</p>
                      <p className="text-xs text-primary font-bold mt-1">92% Approval Rate</p>
                    </div>
                    <div className="p-6 bg-surface-container-low rounded-3xl border border-outline-variant/5">
                      <h5 className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-2">Avg. Reimbursement</h5>
                      <p className="text-lg font-bold text-on-surface">14 Days</p>
                      <p className="text-xs text-secondary font-bold mt-1">Fastest: Aetna (9 days)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-50 bg-primary text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold text-sm">{showSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Invoice Modal */}
      <AnimatePresence>
        {showInvoiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInvoiceModal(false)}
              className="absolute inset-0 bg-on-surface/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden border border-outline-variant/10"
            >
              <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low">
                <h3 className="text-2xl font-serif italic text-primary">Generate New Invoice</h3>
                <button 
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSaving(true);
                  setTimeout(() => {
                    setIsSaving(false);
                    setShowInvoiceModal(false);
                    setShowSuccess("Invoice created successfully");
                    setTimeout(() => setShowSuccess(null), 3000);
                  }, 1500);
                }}
                className="p-8 space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest ml-1">Patient Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/50" />
                    <input 
                      required
                      className="w-full bg-surface-container border-none rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Select or enter patient name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/50" />
                      <input 
                        required
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full bg-surface-container border-none rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest ml-1">Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline/50" />
                      <input 
                        required
                        type="number"
                        step="0.01"
                        className="w-full bg-surface-container border-none rounded-2xl py-3.5 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest ml-1">Payment Method</label>
                  <select className="w-full bg-surface-container border-none rounded-2xl py-3.5 px-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                    <option>Self-Pay</option>
                    <option>Insurance (BCBS)</option>
                    <option>Insurance (Aetna)</option>
                    <option>Insurance (Cigna)</option>
                    <option>Insurance (UnitedHealth)</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowInvoiceModal(false)}
                    className="flex-1 py-4 bg-surface-container text-on-surface-variant rounded-2xl text-sm font-bold hover:bg-surface-container-high transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-4 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    {isSaving ? "Creating..." : "Generate Invoice"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
