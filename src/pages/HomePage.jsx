// src/pages/HomePage.jsx
import React, { useMemo } from 'react';
import { fmt, fmtDateShort } from '../utils';
import { Wallet, TrendingUp, AlertCircle, Users, ArrowRight, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HomePage({ ventes, tontines, settings, setPage }) {
  const currency = settings.currency || 'FG';
  const goalAmount = settings.goalAmount || 0;

  const totalPaid = ventes.filter(v => v.isPaid).reduce((s, v) => s + v.amount, 0);
  const totalDebt = ventes.filter(v => !v.isPaid).reduce((s, v) => s + v.amount, 0);
  const balance = totalPaid - totalDebt;
  
  const progressPct = goalAmount > 0 ? Math.min(100, Math.max(0, Math.round((balance / goalAmount) * 100))) : 0;

  const recentVentes = useMemo(() => [...ventes].sort((a, b) => b.date - a.date).slice(0, 5), [ventes]);

  // Chart data: last 6 months sales volume
  const chartData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
      const val = ventes.filter(v => {
        const vd = new Date(v.date);
        return vd.getMonth() === d.getMonth() && vd.getFullYear() === d.getFullYear();
      }).reduce((s, v) => s + v.amount, 0);
      data.push({ name: label.charAt(0).toUpperCase() + label.slice(1), total: val });
    }
    return data;
  }, [ventes]);

  // Activity timeline
  const activities = useMemo(() => [
    ...ventes.map(v => ({ type: 'vente', date: v.date, data: v })),
    ...tontines.map(t => ({ type: 'tontine', date: t.createdAt || (typeof t.id === 'number' ? t.id : Date.now()), data: t }))
  ].sort((a, b) => b.date - a.date).slice(0, 4), [ventes, tontines]);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 p-3 rounded-lg shadow-soft dark:shadow-none">
          <p className="font-semibold text-gray-500 dark:text-gray-400 text-xs mb-1 uppercase">{label}</p>
          <p className="font-bold text-brand-600 dark:text-brand-400 text-lg">
            {fmt(payload[0].value, currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* 🚀 Goal Celebration Banner */}
      {goalAmount > 0 && balance >= goalAmount && (
        <div className="bg-gradient-to-r from-brand-400 to-brand-600 rounded-2xl p-6 text-white shadow-glow relative overflow-hidden animate-[pulse_3s_ease-in-out_infinite]">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black mb-1">🎉 Félicitations !</h2>
              <p className="text-brand-50 font-medium">Bravo, vous avez atteint votre objectif de caisse du mois.</p>
            </div>
            <Target className="w-12 h-12 text-white/80" />
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Tableau de bord</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm sm:text-base">Bienvenue ! Voici le résumé de votre activité.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPage('vente')} className="bg-brand-500 hover:bg-brand-600 text-white px-4 sm:px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-soft transition-transform active:scale-95 text-sm sm:text-base w-full sm:w-auto">
            + Vente
          </button>
          <button onClick={() => setPage('tontine')} className="bg-brand-50 hover:bg-brand-100 text-brand-600 dark:bg-brand-500/10 dark:hover:bg-brand-500/20 dark:text-brand-400 px-4 sm:px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 text-sm sm:text-base w-full sm:w-auto">
            + Tontine
          </button>
        </div>
      </div>

      {/* Goal Progress Bar */}
      {goalAmount > 0 && (
        <div className="glass-card p-5 sm:p-6 overflow-hidden relative">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-500/10 dark:bg-brand-400/5 rounded-full blur-3xl"></div>
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-bold text-sm sm:text-base">
              <Target className="w-5 h-5 text-brand-500" /> Objectif de Caisse Actuel
            </div>
            <div className="font-extrabold text-brand-600 dark:text-brand-400 text-lg sm:text-xl">{progressPct}%</div>
          </div>
          <div className="w-full h-3 bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden relative z-10">
            <div 
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3 relative z-10">
            <span>{fmt(balance, currency)}</span>
            <span>Objectif : {fmt(goalAmount, currency)}</span>
          </div>
        </div>
      )}

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">
            <span className="p-2 bg-brand-50 dark:bg-brand-500/10 rounded-lg"><Wallet className="w-5 h-5 text-brand-500" /></span> Solde Net
          </div>
          <div className={`text-3xl font-black ${balance >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-500'}`}>
            {fmt(balance, currency)}
          </div>
        </div>
        
        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">
            <span className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg"><TrendingUp className="w-5 h-5 text-green-500" /></span> Encaissé
          </div>
          <div className="text-3xl font-black text-green-500">
            {fmt(totalPaid, currency)}
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">
            <span className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg"><AlertCircle className="w-5 h-5 text-red-500" /></span> Dettes
          </div>
          <div className="text-3xl font-black text-red-500">
            {fmt(totalDebt, currency)}
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-semibold mb-4 text-sm uppercase tracking-wider">
             <span className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg"><Users className="w-5 h-5 text-blue-500" /></span> Tontines Actives
          </div>
          <div className="text-3xl font-black text-gray-900 dark:text-white">
            {tontines.length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">
            Total {tontines.reduce((s, t) => s + t.members.length, 0)} membres
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:items-start">
        {/* Chart Area */}
        <div className="lg:col-span-2 glass-card p-5 sm:p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Évolution des encaissements</h3>
          </div>
          <div className="h-[250px] sm:h-[300px] w-full ml-[-20px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
                 <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-muted)', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                 />
                 <YAxis 
                    hide={true} 
                    domain={['dataMin', 'dataMax + 1000']}
                 />
                 <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(156, 163, 175, 0.2)', strokeWidth: 2, strokeDasharray: '4 4' }} />
                 <Area type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--primary)' }} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-card p-5 sm:p-6 lg:h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Activité récente</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-5">
            {activities.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">Aucune activité.</p>
            ) : (
              activities.map((act, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    act.type === 'vente' 
                      ? (act.data.isPaid ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400')
                      : 'bg-brand-100 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400'
                  }`}>
                    {act.type === 'vente' ? (act.data.isPaid ? '✅' : '⏳') : '🤝'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                      {act.type === 'vente' ? `Vente : ${act.data.clientName}` : `Tontine : ${act.data.name}`}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                      {fmtDateShort(act.date)} • {act.type === 'vente' ? fmt(act.data.amount, currency) : `${act.data.numMembers} membres`}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-700/50 flex flex-wrap justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Dernières transactions</h3>
          <button onClick={() => setPage('vente')} className="text-brand-600 dark:text-brand-400 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Tout voir <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Montant</th>
                <th className="p-4 pr-6">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {recentVentes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Auncune transaction enregistrée.
                  </td>
                </tr>
              ) : (
                recentVentes.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 pl-6 text-sm text-gray-500 dark:text-gray-400">{fmtDateShort(v.date)}</td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white text-sm">{v.clientName}</td>
                    <td className="p-4 font-black text-gray-900 dark:text-white text-sm">
                      {fmt(v.amount, currency)}
                    </td>
                    <td className="p-4 pr-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wide ${
                        v.isPaid 
                        ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                      }`}>
                        {v.isPaid ? 'Payé' : 'Dette'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
