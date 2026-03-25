export const fmt = (n, currency = 'FG') => Number(n).toLocaleString('fr-FR') + ' ' + currency;

export const fmtDate = (ts) => {
  return new Date(ts).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const fmtDateShort = (ts) => {
  return new Date(ts).toLocaleDateString('fr-FR', {
    month: 'short',
    day: 'numeric'
  });
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
