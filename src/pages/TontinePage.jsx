// src/pages/TontinePage.jsx
import React, { useState } from 'react';
import { fmt, fmtDateShort, generateId } from '../utils';
import ConfirmDialog from '../components/ConfirmDialog';
import { Users, UserPlus, Trash2, ArrowLeft, RefreshCw, Trophy, Settings, CheckCircle2, Clock, X, Info, Edit3, Lock, Unlock } from 'lucide-react';

function CreateTontineModal({ onClose, onCreate, currency }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [numMembers, setNumMembers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount || !numMembers || Number(numMembers) < 2) return;
    onCreate({ name: name.trim(), amount: Number(amount), numMembers: Number(numMembers) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft-lg w-full max-w-md overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-500" /> Créer un groupe
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom du groupe *</label>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
              placeholder="Ex: Marché Central" 
              value={name} onChange={e => setName(e.target.value)} autoFocus required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Cotisation mensuelle par personne ({currency}) *</label>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
              type="number" placeholder="50000" 
              value={amount} onChange={e => setAmount(e.target.value)} min="1000" required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nombre total de membres prévus *</label>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
              type="number" placeholder="5" 
              value={numMembers} onChange={e => setNumMembers(e.target.value)} min="2" max="100" required 
            />
          </div>
          
          <div className="pt-2">
            <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-bold shadow-soft transition-transform active:scale-95">
              Créer le groupe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddMemberModal({ onClose, onAdd }) {
  const [memberName, setMemberName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    onAdd({ memberName: memberName.trim(), phone: phone.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft-lg w-full max-w-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-brand-500" /> Ajouter un membre
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom complet *</label>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
              placeholder="Ex: Aminata Diallo" value={memberName} onChange={e => setMemberName(e.target.value)} autoFocus required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Téléphone (Optionnel)</label>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
              type="tel" placeholder="Ex: 622 00 00 00" value={phone} onChange={e => setPhone(e.target.value)} 
            />
          </div>
          
          <div className="pt-2 flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
               Annuler
             </button>
            <button type="submit" className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-bold shadow-soft transition-transform active:scale-95">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditMemberModal({ member, onClose, onUpdate }) {
  const [memberName, setMemberName] = useState(member.memberName);
  const [phone, setPhone] = useState(member.phone || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memberName.trim()) return;
    onUpdate({ ...member, memberName: memberName.trim(), phone: phone.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft-lg w-full max-w-sm overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-brand-500" /> Éditer le membre
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom complet *</label>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
              value={memberName} onChange={e => setMemberName(e.target.value)} autoFocus required 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Téléphone (Optionnel)</label>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
              type="tel" value={phone} onChange={e => setPhone(e.target.value)} 
            />
          </div>
          
          <div className="pt-2 flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
               Annuler
             </button>
            <button type="submit" className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-bold shadow-soft transition-transform active:scale-95">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TontineDetail({ tontine, onBack, onUpdate, showToast, onDeleteTontine, currency, settings }) {
  const [showAddMember, setShowAddMember] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isAdmin, setIsAdmin] = useState(!settings.lockEnabled);
  
  const totalCount = tontine.members.length;
  const paidCount = tontine.members.filter(m => m.paid).length;
  const isFull = totalCount >= tontine.numMembers;
  const potTotal = tontine.amount * totalCount;
  const currentIdx = tontine.currentRecipient ?? 0;
  const pct = totalCount > 0 ? (paidCount / totalCount) * 100 : 0;
  
  const handleAddMember = (data) => {
    const newMember = { id: generateId(), ...data, paid: false, order: totalCount };
    onUpdate({ ...tontine, members: [...tontine.members, newMember] });
    showToast(`${data.memberName} a rejoint le groupe !`);
  };

  const handleUpdateMember = (updatedData) => {
    onUpdate({
      ...tontine,
      members: tontine.members.map(m => m.id === updatedData.id ? updatedData : m)
    });
    showToast('Profil membre mis à jour !');
  };

  const handleTogglePaid = (id) => {
    if(!isAdmin) return showToast("🔒 Seul l'administrateur peut valider un paiement.", "error");
    onUpdate({
      ...tontine,
      members: tontine.members.map(m => m.id === id ? { ...m, paid: !m.paid } : m)
    });
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      showToast('Mode Administrateur désactivé', 'info');
      return;
    }
    const pin = window.prompt("Entrez le code PIN Administrateur");
    if (pin === settings.pinCode) {
      setIsAdmin(true);
      showToast('Mode Administrateur activé !', 'success');
    } else if (pin !== null) {
      showToast('Code PIN incorrect', 'error');
    }
  };

  const handleConfirmAction = () => {
    if (!confirmAction) return;
    const { type, payload } = confirmAction;
    
    if (type === 'delete_member') {
      onUpdate({ ...tontine, members: tontine.members.filter(m => m.id !== payload) });
      showToast('Membre retiré du groupe', 'info');
    } else if (type === 'next_cycle') {
      const histEntry = {
        id: generateId(),
        ts: Date.now(),
        recipient: tontine.members[currentIdx]?.memberName || 'Inconnu',
        amountCollected: paidCount * tontine.amount
      };
      onUpdate({
        ...tontine,
        members: tontine.members.map(m => ({ ...m, paid: false })),
        currentRecipient: (currentIdx + 1) % totalCount,
        history: [histEntry, ...(tontine.history || [])]
      });
      showToast('Le cycle est validé !');
    } else if (type === 'delete_tontine') {
      onDeleteTontine(tontine.id);
      onBack();
    }
    
    setConfirmAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Detail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <button onClick={onBack} className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold hover:gap-3 transition-all mb-4 text-sm bg-brand-50 dark:bg-brand-500/10 px-3 py-1.5 rounded-full inline-flex">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <div className="flex items-center gap-3">
             <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{tontine.name}</h1>
             <button 
                onClick={handleAdminToggle} 
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg border ${isAdmin ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-800' : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'}`}
             >
                {isAdmin ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                {isAdmin ? 'Admin Actif' : 'Lecture Seule'}
             </button>
          </div>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => setConfirmAction({ type: 'delete_tontine' })}
            className="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" /> Supprimer ce groupe
          </button>
        )}
      </div>

      {/* Hero Stats Card */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-soft dark:shadow-none border border-gray-100 dark:border-gray-700/50">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between gap-8 relative z-10">
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Récolte en cours</div>
            <div className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
              {isAdmin ? fmt(paidCount * tontine.amount, currency) : '***'}
            </div>
            <div className="text-gray-500 dark:text-gray-400 font-medium">
              Sur un objectif de <span className="text-gray-900 dark:text-white font-bold">{isAdmin ? fmt(potTotal, currency) : '***'}</span> total
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-5 md:min-w-[300px] border border-gray-100 dark:border-gray-800 shrink-0">
             <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
               <Trophy className="w-4 h-4 text-brand-500" /> Bénéficiaire actuel
             </div>
             <div className="text-xl font-bold text-gray-900 dark:text-white mb-4">
               {totalCount > 0 ? tontine.members[currentIdx]?.memberName : '—'}
             </div>
             
             <div>
               <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-gray-300 mb-1.5">
                 <span>Progression des paiements</span>
                 <span>{paidCount} / {totalCount}</span>
               </div>
               <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${pct}%` }}></div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Members Table */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-700/50 flex flex-wrap justify-between items-center gap-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" /> Membres ({totalCount}/{tontine.numMembers})
            </h3>
            {(!isFull && isAdmin) && (
              <button 
                 onClick={() => setShowAddMember(true)}
                 className="bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-500/20 px-3 py-1.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <UserPlus className="w-4 h-4" /> Inviter
              </button>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6 w-16 text-center">Ordre</th>
                  <th className="p-4">Nom du membre</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {totalCount === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-gray-500 dark:text-gray-400">Aucun membre dans ce groupe.</td></tr>
                ) : (
                  tontine.members.map((m, idx) => (
                    <tr key={m.id} className={`transition-colors ${idx === currentIdx ? 'bg-brand-50/50 dark:bg-brand-500/5' : 'hover:bg-gray-50/50 dark:hover:bg-gray-700/30'}`}>
                      <td className="p-4 pl-6 text-center font-black text-gray-500 dark:text-gray-400">
                        {idx + 1}
                        {idx === currentIdx && <Trophy className="w-4 h-4 text-brand-500 mx-auto mt-1" />}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900 dark:text-white text-sm">{m.memberName}</div>
                        {m.phone && <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{m.phone}</div>}
                      </td>
                      <td className="p-4">
                         <button 
                           onClick={() => handleTogglePaid(m.id)}
                           className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide hover:opacity-80 transition-opacity ${
                             m.paid 
                             ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                             : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                           }`}
                         >
                           {m.paid ? <CheckCircle2 className="w-3.5 h-3.5"/> : <Clock className="w-3.5 h-3.5"/>}
                           {m.paid ? 'A Payé' : 'Impayé'}
                         </button>
                      </td>
                      <td className="p-4 pr-6 text-right whitespace-nowrap">
                         <button 
                           onClick={() => setEditMember(m)}
                           className="p-2 text-gray-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-colors inline-block mr-1"
                           title="Modifier"
                         >
                           <Edit3 className="w-4 h-4" />
                         </button>
                         {isAdmin && (
                           <button 
                             onClick={() => setConfirmAction({ type: 'delete_member', payload: m.id })}
                             className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors inline-block"
                             title="Retirer"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {(totalCount > 0 && isAdmin) && (
            <div className="p-5 sm:p-6 border-t border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <button 
                onClick={() => setConfirmAction({ type: 'next_cycle' })}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform shadow-sm ${
                  paidCount === totalCount 
                  ? 'bg-brand-500 hover:bg-brand-600 text-white active:scale-[0.98]' 
                  : 'bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-900/50 hover:bg-brand-50 dark:hover:bg-brand-900/20'
                }`}
              >
                <RefreshCw className="w-5 h-5" /> Vérifier & Clôturer le cycle
              </button>
              {paidCount < totalCount && (
                <div className="mt-3 flex items-start gap-2 text-orange-600 dark:text-orange-400 text-sm font-medium bg-orange-50 dark:bg-orange-500/10 p-3 rounded-lg">
                  <Info className="w-5 h-5 shrink-0" />
                  Attention : Certains membres n'ont pas encore payé pour ce cycle.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar: Timeline & Settings */}
        <div className="space-y-6">
           <div className="glass-card p-5 sm:p-6">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
               <Settings className="w-5 h-5 text-gray-500" /> Paramètres
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">Cotisation / cycle :</span>
                  <span className="font-bold text-gray-900 dark:text-white">{fmt(tontine.amount, currency)}</span>
                </div>
                <div className="flex justify-between items-center bg-brand-50 dark:bg-brand-900/10 p-3 rounded-xl border border-brand-100 dark:border-brand-900/20">
                  <span className="text-brand-600 dark:text-brand-400 text-sm font-semibold">Pot Max :</span>
                  <span className="font-black text-brand-600 dark:text-brand-400">{isAdmin ? fmt(potTotal, currency) : '***'}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">Places Restantes :</span>
                  <span className="font-bold text-gray-900 dark:text-white">{tontine.numMembers - totalCount}</span>
                </div>
             </div>
           </div>

           <div className="glass-card p-5 sm:p-6">
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
               <RefreshCw className="w-5 h-5 text-gray-500" /> Historique ({tontine.history?.length || 0})
             </h3>
             <div className="space-y-4">
               {(!tontine.history || tontine.history.length === 0) ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm italic">Aucun cycle clôturé pour l'instant.</p>
               ) : (
                 tontine.history.map((h, i) => (
                   <div key={h.id} className="flex gap-3 relative pb-4 border-l-2 border-brand-100 dark:border-brand-900/30 ml-2">
                     <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center">
                       <Trophy className="w-3 h-3 text-brand-500" />
                     </div>
                     <div className="pl-4 -mt-1">
                       <p className="text-sm font-bold text-gray-900 dark:text-white">{h.recipient}</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                         {fmtDateShort(h.ts)} • A reçu <span className="font-black text-brand-500">{isAdmin ? fmt(h.amountCollected, currency) : '***'}</span>
                       </p>
                     </div>
                   </div>
                 ))
               )}
             </div>
           </div>
        </div>
      </div>

      {showAddMember && isAdmin && <AddMemberModal onClose={() => setShowAddMember(false)} onAdd={handleAddMember} />}
      {editMember && <EditMemberModal member={editMember} onClose={() => setEditMember(null)} onUpdate={handleUpdateMember} />}
      
      {confirmAction && (
        <ConfirmDialog
          title={confirmAction.type === 'delete_tontine' ? "Supprimer la tontine" : confirmAction.type === 'next_cycle' ? "Clôturer le cycle" : "Retirer membre"}
          message={
            confirmAction.type === 'delete_tontine' 
              ? `Êtes-vous sûr de vouloir supprimer le groupe "${tontine.name}" ? Tout l'historique sera effacé.`
              : confirmAction.type === 'next_cycle'
              ? `Voulez-vous clôturer ce cycle au profit de ${tontine.members[currentIdx]?.memberName} ? Les statuts de paiement seront réinitialisés.`
              : "Voulez-vous retirer définitivement ce membre du groupe tontine ?"
          }
          danger={confirmAction.type !== 'next_cycle'}
          confirmText={confirmAction.type === 'next_cycle' ? "Clôturer" : "Supprimer"}
          onConfirm={handleConfirmAction}
          onCancel={() => setConfirmAction(null)}
        />
      )}
    </div>
  );
}

export default function TontinePage({ tontines, setTontines, settings, showToast }) {
  const currency = settings?.currency || 'FG';
  const [showCreate, setShowCreate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const selected = tontines.find(t => t.id === selectedId);

  const handleCreate = (data) => {
    const newT = { id: generateId(), createdAt: Date.now(), members: [], history: [], currentRecipient: 0, ...data };
    setTontines(prev => [newT, ...prev]);
    showToast(`Le groupe "${data.name}" est créé !`);
    setSelectedId(newT.id);
  };

  const handleUpdate = (updated) => {
    setTontines(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const handleDeleteTontine = (id) => {
    setTontines(prev => prev.filter(t => t.id !== id));
    showToast('Groupe tontine supprimé', 'error');
  };

  if (selected) {
    return (
      <TontineDetail
        tontine={selected}
        onBack={() => setSelectedId(null)}
        onUpdate={handleUpdate}
        showToast={showToast}
        onDeleteTontine={handleDeleteTontine}
        currency={currency}
        settings={settings}
      />
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Mes Tontines</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm sm:text-base">Gérez vos groupes d'épargne solidaire et organisez les tours.</p>
        </div>
        <button 
          onClick={() => setShowCreate(true)} 
          className="bg-brand-500 hover:bg-brand-600 text-white px-5 sm:px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-soft transition-transform active:scale-95 text-sm sm:text-base w-full sm:w-auto"
        >
          <UserPlus className="w-5 h-5" /> Nouveau Groupe
        </button>
      </div>

      {tontines.length === 0 ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/20 rounded-full flex items-center justify-center mb-6">
             <Users className="w-10 h-10 text-brand-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Aucun groupe actif</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">Créez votre première tontine, définissez la cotisation et invitez des membres pour commencer.</p>
          <button onClick={() => setShowCreate(true)} className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-xl font-bold shadow-soft transition-transform active:scale-95">
            Créer une Tontine
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {tontines.map(t => {
            const totalCount = t.members.length;
            const paidCount = t.members.filter(m => m.paid).length;
            const pct = totalCount > 0 ? (paidCount / totalCount) * 100 : 0;
            
            return (
              <div 
                key={t.id} 
                onClick={() => setSelectedId(t.id)}
                className="glass-card hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer p-5 sm:p-6 flex flex-col group border border-transparent hover:border-brand-200 dark:hover:border-brand-900"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-4">{t.name}</h3>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap border border-gray-200 dark:border-gray-700 font-mono">
                    {totalCount}/{t.numMembers} 👥
                  </span>
                </div>
                
                <div className="mb-6 flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cotisation / pers.</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">
                    {fmt(t.amount, currency)}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-brand-600 dark:text-brand-400">Progression globale</span>
                    <span className="font-bold text-gray-900 dark:text-white">{paidCount}/{totalCount} payés</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 group-hover:bg-brand-400 transition-colors" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showCreate && <CreateTontineModal onClose={() => setShowCreate(false)} onCreate={handleCreate} currency={currency} />}
    </div>
  );
}
