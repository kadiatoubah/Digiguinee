// src/pages/VentePage.jsx
import React, { useState, useMemo } from 'react';
import { fmt, fmtDateShort, generateId } from '../utils';
import ConfirmDialog from '../components/ConfirmDialog';
import { Search, SearchX, Plus, Download, X, Edit3, Trash2, CheckCircle, Clock, FileText } from 'lucide-react';

function VenteModal({ onClose, onSave, initialData }) {
  const [formData, setFormData] = useState(
    initialData || { 
      clientName: '', 
      amount: '', 
      paidAmount: '', // New field
      isPaid: false, 
      date: new Date().toISOString().slice(0, 10), 
      notes: '' 
    }
  );

  const setPaymentMode = (mode) => {
    const total = Number(formData.amount) || 0;
    if (mode === 'full') {
      setFormData({ ...formData, isPaid: true, paidAmount: total });
    } else if (mode === 'half') {
      setFormData({ ...formData, isPaid: false, paidAmount: Math.floor(total / 2) });
    } else if (mode === 'none') {
      setFormData({ ...formData, isPaid: false, paidAmount: 0 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.amount) return;
    
    onSave({
      ...formData,
      amount: Number(formData.amount),
      paidAmount: Number(formData.paidAmount) || 0,
      isPaid: Number(formData.paidAmount) >= Number(formData.amount) && Number(formData.amount) > 0,
      date: new Date(formData.date).getTime()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft-lg w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700/50">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? '📝 Modifier la transaction' : '✨ Nouvelle Vente'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom du client *</label>
            <input 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
              placeholder="Ex: Fatoumata Bah"
              value={formData.clientName}
              onChange={e => setFormData({...formData, clientName: e.target.value})}
              autoFocus required 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Montant *</label>
              <input 
                type="number" 
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
                placeholder="50000"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                min="0" required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Date *</label>
              <input 
                type="date"
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Options de paiement rapide</label>
            <div className="grid grid-cols-3 gap-2 bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700">
              <button 
                type="button"
                onClick={() => setPaymentMode('full')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-colors ${formData.paidAmount === Number(formData.amount) && Number(formData.amount) > 0 ? 'bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Tout payé
              </button>
              <button 
                type="button"
                onClick={() => setPaymentMode('half')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-colors ${formData.paidAmount > 0 && formData.paidAmount < Number(formData.amount) ? 'bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                À moitié
              </button>
              <button 
                type="button"
                onClick={() => setPaymentMode('none')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-colors ${Number(formData.paidAmount) === 0 ? 'bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Impayé
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Montant réellement payé *</label>
            <input 
              type="number" 
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm font-bold text-brand-600 dark:text-brand-400"
              placeholder="Montant versé aujourd'hui"
              value={formData.paidAmount}
              onChange={e => setFormData({...formData, paidAmount: e.target.value})}
              min="0"
              max={formData.amount}
              required 
            />
            <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold px-1">Le reste sera considéré comme une dette</p>
          </div>

          <div>
             <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Notes (Optionnel)</label>
             <textarea 
               className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm dark:text-white resize-none"
               rows="3"
               placeholder="Détails sur l'article, date de paiement prévue..."
               value={formData.notes}
               onChange={e => setFormData({...formData, notes: e.target.value})}
             />
          </div>
        </form>

        <div className="px-6 py-5 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700/50 flex justify-end gap-3 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Annuler
          </button>
          <button type="submit" onClick={handleSubmit} className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-soft transition-transform active:scale-95">
            {initialData ? 'Mettre à jour' : 'Enregistrer la vente'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VentePage({ ventes, setVentes, settings, showToast }) {
  const currency = settings?.currency || 'FG';
  const [showModal, setShowModal] = useState(false);
  const [editingVente, setEditingVente] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // all, paid, debt
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest, amount_desc, amount_asc
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  // Stats
  const stats = useMemo(() => {
    const totalVentes = ventes.reduce((s, v) => s + v.amount, 0);
    const totalEncaisse = ventes.reduce((s, v) => s + (v.paidAmount || (v.isPaid ? v.amount : 0)), 0);
    return {
      total: totalVentes,
      paid: totalEncaisse,
      debt: totalVentes - totalEncaisse,
      count: ventes.length
    }
  }, [ventes]);

  const filteredVentes = useMemo(() => {
    return ventes
      .filter(v => {
        if (filterMode === 'paid' && !v.isPaid) return false;
        if (filterMode === 'debt' && v.isPaid) return false;
        if (search && !v.clientName.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') return b.date - a.date;
        if (sortOrder === 'oldest') return a.date - b.date;
        if (sortOrder === 'amount_desc') return b.amount - a.amount;
        if (sortOrder === 'amount_asc') return a.amount - b.amount;
        return 0;
      });
  }, [ventes, search, filterMode, sortOrder]);

  const totalPages = Math.ceil(filteredVentes.length / ITEMS_PER_PAGE) || 1;
  const paginatedVentes = filteredVentes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Handlers
  const handleSave = (data) => {
    if (editingVente) {
      setVentes(prev => prev.map(v => v.id === editingVente.id ? { ...data, id: editingVente.id } : v));
      showToast('Vente mise à jour.');
    } else {
      setVentes(prev => [{ ...data, id: generateId() }, ...prev]);
      showToast('Vente enregistrée avec succès !');
      setCurrentPage(1); // Jump to first page to see the new item
    }
    setEditingVente(null);
  };

  const handleTogglePaid = (id) => {
    setVentes(prev => prev.map(v => v.id === id ? { ...v, isPaid: !v.isPaid } : v));
    showToast('Statut mis à jour', 'info');
  };

  const handleDelete = () => {
    if (!deleteConfirm) return;
    setVentes(prev => prev.filter(v => v.id !== deleteConfirm));
    setDeleteConfirm(null);
    showToast('Transaction supprimée.', 'info');
  };

  const downloadCSV = () => {
    if (ventes.length === 0) return showToast('Aucune donnée à exporter', 'info');
    
    const headers = ['ID', 'Date', 'Client', 'Montant', 'Statut', 'Notes'];
    const rows = filteredVentes.map(v => [
      v.id,
      new Date(v.date).toISOString().split('T')[0],
      `"${v.clientName.replace(/"/g, '""')}"`,
      v.amount,
      v.isPaid ? 'Payé' : 'Dette',
      `"${(v.notes||'').replace(/"/g, '""')}"`
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tontineapp_ventes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Ventes & Crédits</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm sm:text-base">Gérez vos encaissements et les dettes de vos clients.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={downloadCSV} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 px-4 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors text-sm sm:text-base hidden sm:flex">
            <Download className="w-5 h-5" /> Export CSV
          </button>
          <button onClick={() => { setEditingVente(null); setShowModal(true); }} className="bg-brand-500 hover:bg-brand-600 text-white px-5 sm:px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-soft transition-transform active:scale-95 text-sm sm:text-base flex-1 sm:flex-none">
            <Plus className="w-5 h-5" /> Nouvelle Vente
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Total Ventes</div>
          <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{fmt(stats.total, currency)}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stats.count} transactions</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-800/20">
          <div className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-500 mb-1">Encaissé</div>
          <div className="text-xl sm:text-2xl font-black text-green-600 dark:text-green-400">{fmt(stats.paid, currency)}</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-800/20 col-span-2 lg:col-span-2">
          <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500 mb-1">Créances (Dettes clients)</div>
          <div className="text-xl sm:text-2xl font-black text-red-600 dark:text-red-400">{fmt(stats.debt, currency)}</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="glass-card shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col min-h-[500px]">
        {/* Filters Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700/50 flex flex-col md:flex-row gap-4 justify-between bg-white dark:bg-gray-800 rounded-t-2xl">
          
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
             {/* Search box */}
             <div className="relative max-w-sm flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                 type="text"
                 placeholder="Rechercher un client..."
                 className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white transition-shadow"
                 value={search}
                 onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
               />
               {search && (
                 <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                   <X className="w-4 h-4" />
                 </button>
               )}
             </div>

             {/* Pill Filters */}
             <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
               {[
                 { id: 'all', label: 'Toutes' },
                 { id: 'paid', label: 'Payées' },
                 { id: 'debt', label: 'À Crédit' },
               ].map(f => (
                 <button
                   key={f.id}
                   onClick={() => { setFilterMode(f.id); setCurrentPage(1); }}
                   className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-colors ${filterMode === f.id ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                 >
                   {f.label}
                 </button>
               ))}
             </div>
          </div>

          <div className="shrink-0">
             <select 
               className="w-full md:w-auto bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white font-semibold cursor-pointer appearance-none"
               value={sortOrder}
               onChange={e => setSortOrder(e.target.value)}
             >
               <option value="newest">Les plus récentes</option>
               <option value="oldest">Les plus anciennes</option>
               <option value="amount_desc">Montant décroissant</option>
               <option value="amount_asc">Montant croissant</option>
             </select>
          </div>
        </div>

        {/* Table / List */}
        <div className="flex-1 overflow-x-auto">
          {filteredVentes.length === 0 ? (
             <div className="flex flex-col items-center justify-center p-12 text-center h-full">
               <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                 <SearchX className="w-8 h-8 text-gray-400 dark:text-gray-500" />
               </div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Aucun résultat</h3>
               <p className="text-gray-500 dark:text-gray-400 text-sm">Réduisez vos filtres ou ajoutez une nouvelle vente.</p>
             </div>
          ) : (
            <table className="w-full text-left bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold border-b border-gray-100 dark:border-gray-700/50">
                  <th className="p-4 pl-5">Date</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4">Notes</th>
                  <th className="p-4 text-right">Montant</th>
                  <th className="p-4 pr-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {paginatedVentes.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors group">
                    <td className="p-4 pl-5 text-sm text-gray-500 dark:text-gray-400">{fmtDateShort(v.date)}</td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white text-sm">{v.clientName}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleTogglePaid(v.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wide hover:opacity-80 transition-opacity ${
                          v.paidAmount >= v.amount 
                          ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                          : v.paidAmount > 0 
                          ? 'bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        }`}
                      >
                        {v.paidAmount >= v.amount ? <CheckCircle className="w-3.5 h-3.5"/> : <Clock className="w-3.5 h-3.5"/>}
                        {v.paidAmount >= v.amount ? 'Payé' : v.paidAmount > 0 ? 'Partiel' : 'Crédit'}
                      </button>
                    </td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">
                       {v.notes ? <FileText className="w-4 h-4 cursor-help" title={v.notes} /> : <span className="text-gray-300 dark:text-gray-600">-</span>}
                    </td>
                    <td className="p-4 text-right font-black text-gray-900 dark:text-white text-sm">
                      {fmt(v.amount, currency)}
                    </td>
                    <td className="p-4 pr-5">
                       <div className="flex items-center justify-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                         <button 
                           onClick={() => { setEditingVente(v); setShowModal(true); }}
                           className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                           title="Modifier"
                         >
                           <Edit3 className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => setDeleteConfirm(v.id)}
                           className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                           title="Supprimer"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
           <div className="p-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between bg-white dark:bg-gray-800 rounded-b-2xl">
             <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
               Page {currentPage} sur {totalPages}
             </span>
             <div className="flex gap-2">
               <button 
                 disabled={currentPage === 1}
                 onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                 className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
               >
                 Précédent
               </button>
               <button 
                 disabled={currentPage === totalPages}
                 onClick={() => setCurrentPage(c => Math.min(totalPages, c + 1))}
                 className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
               >
                 Suivant
               </button>
             </div>
           </div>
        )}
      </div>

      {showModal && (
        <VenteModal 
          onClose={() => { setShowModal(false); setEditingVente(null); }} 
          onSave={handleSave} 
          initialData={editingVente} 
        />
      )}
      
      {deleteConfirm && (
        <ConfirmDialog
          title="Supprimer la vente"
          message="Êtes-vous sûr de vouloir supprimer cette transaction ? Cette action est définitive."
          danger={true}
          confirmText="Supprimer"
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
