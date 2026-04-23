import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, TrendingUp, PieChart, Activity,
  BarChartHorizontal, Plus, X, RotateCcw, Camera
} from 'lucide-react';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart as RechartsPieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts';

const THEMES = {
  pastel:  ['#f9a8d4', '#a5f3fc', '#bbf7d0', '#fde68a', '#ddd6fe'],
  vibrant: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'],
  dark:    ['#818cf8', '#34d399', '#fb923c', '#f472b6', '#facc15'],
  sunset:  ['#f97316', '#fb923c', '#fbbf24', '#f43f5e', '#c084fc'],
  ocean:   ['#0ea5e9', '#06b6d4', '#14b8a6', '#6366f1', '#8b5cf6'],
  navy:    ['#001F5B', '#1e3a8a', '#3b82f6', '#93c5fd', '#dbeafe'],
  gold:    ['#C9A84C', '#b45309', '#d97706', '#fbbf24', '#fef3c7'],
  mixed:   ['#001F5B', '#C9A84C', '#0f766e', '#dc2626', '#7c3aed'],
};

const THEME_META = [
  { key: 'pastel',  label: 'Pastel',   swatches: ['#f9a8d4','#a5f3fc','#bbf7d0'] },
  { key: 'vibrant', label: 'Vibrant',  swatches: ['#ef4444','#f97316','#eab308'] },
  { key: 'dark',    label: 'Dark',     swatches: ['#818cf8','#34d399','#fb923c'] },
  { key: 'sunset',  label: 'Sunset',   swatches: ['#f97316','#fbbf24','#f43f5e'] },
  { key: 'ocean',   label: 'Ocean',    swatches: ['#0ea5e9','#14b8a6','#6366f1'] },
  { key: 'navy',    label: 'Navy',     swatches: ['#001F5B','#3b82f6','#93c5fd'] },
  { key: 'gold',    label: 'Gold',     swatches: ['#C9A84C','#d97706','#fbbf24'] },
  { key: 'mixed',   label: 'Mixed',    swatches: ['#001F5B','#C9A84C','#0f766e'] },
];

const CHART_TYPES = [
  { key: 'bar',    label: 'Bar',          Icon: BarChart2            },
  { key: 'hbar',   label: 'Horiz. Bar',   Icon: BarChartHorizontal  },
  { key: 'line',   label: 'Line',         Icon: TrendingUp           },
  { key: 'pie',    label: 'Pie / Donut',  Icon: PieChart             },
  { key: 'radar',  label: 'Radar',        Icon: Activity             },
];

const TEMPLATES = [
  { label: 'Budget Breakdown',  rows: [{ label:'Housing',value:'1200'},{label:'Food',value:'400'},{label:'Transport',value:'200'},{label:'Entertainment',value:'150'},{label:'Savings',value:'300'}] },
  { label: 'Survey Results',    rows: [{ label:'Strongly Agree',value:'42'},{label:'Agree',value:'31'},{label:'Neutral',value:'14'},{label:'Disagree',value:'9'},{label:'Strongly Disagree',value:'4'}] },
  { label: 'Monthly Progress',  rows: [{ label:'Jan',value:'30'},{label:'Feb',value:'45'},{label:'Mar',value:'38'},{label:'Apr',value:'60'},{label:'May',value:'72'},{label:'Jun',value:'65'}] },
  { label: 'Team Comparison',   rows: [{ label:'Team A',value:'88'},{label:'Team B',value:'74'},{label:'Team C',value:'91'},{label:'Team D',value:'65'}] },
  { label: 'Social Media',      rows: [{ label:'Instagram',value:'45'},{label:'TikTok',value:'32'},{label:'YouTube',value:'15'},{label:'Twitter',value:'8'}] },
];

const DEFAULT_ROWS = [
  { id: 1, label: '', value: '' },
  { id: 2, label: '', value: '' },
  { id: 3, label: '', value: '' },
  { id: 4, label: '', value: '' },
];

let nextId = 10;

export default function ChartCreator() {
  const [chartType, setChartType] = useState('bar');
  const [title, setTitle]         = useState('');
  const [theme, setTheme]         = useState('vibrant');
  const [rows, setRows]           = useState(DEFAULT_ROWS.map(r => ({ ...r })));

  const colors = THEMES[theme];

  const chartData = rows
    .filter(r => r.label.trim() && !isNaN(parseFloat(r.value)) && r.value !== '')
    .map(r => ({ name: r.label.trim(), value: parseFloat(r.value) }));

  const hasEnoughData = chartData.length >= 2;

  function updateRow(id, field, val) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r));
  }
  function addRow() {
    if (rows.length >= 12) return;
    setRows(prev => [...prev, { id: nextId++, label: '', value: '' }]);
  }
  function removeRow(id) {
    if (rows.length <= 2) return;
    setRows(prev => prev.filter(r => r.id !== id));
  }
  function applyTemplate(tpl) {
    const mapped = tpl.rows.map((r, i) => ({ id: nextId++, ...r }));
    setRows(mapped);
  }
  function reset() {
    setTitle('');
    setRows(DEFAULT_ROWS.map(r => ({ ...r, id: nextId++ })));
  }

  function renderChart() {
    if (!hasEnoughData) {
      return (
        <div className="flex items-center justify-center h-72 text-slate-400 text-sm text-center px-4">
          Add at least 2 rows with a label and value to preview your chart.
        </div>
      );
    }

    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[4,4,0,0]}>
              {chartData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'hbar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
            <Tooltip />
            <Bar dataKey="value" radius={[0,4,4,0]}>
              {chartData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={colors[0]} strokeWidth={2.5} dot={{ r: 5, fill: colors[0] }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} innerRadius={50} label>
              {chartData.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'radar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis />
            <Radar dataKey="value" stroke={colors[0]} fill={colors[0]} fillOpacity={0.35} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      );
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

        {/* Controls */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-5">

          {/* Chart type */}
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Chart Type</p>
            <div className="grid grid-cols-3 gap-1.5">
              {CHART_TYPES.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setChartType(key)}
                  className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg border text-[9px] font-black uppercase tracking-wide transition-all ${
                    chartType === key
                      ? 'bg-slate-800 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates */}
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Quick Templates</p>
            <div className="flex flex-wrap gap-1.5">
              {TEMPLATES.map(tpl => (
                <button
                  key={tpl.label}
                  onClick={() => applyTemplate(tpl)}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-800 transition-all"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
              Chart Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Monthly Sales 2024"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          {/* Color theme */}
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Colour Theme</p>
            <div className="grid grid-cols-2 gap-1.5">
              {THEME_META.map(({ key, label, swatches }) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-xs font-semibold transition-all text-left ${
                    theme === key
                      ? 'border-slate-800 bg-slate-800 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <span className="flex gap-0.5 shrink-0">
                    {swatches.map((c, i) => (
                      <span key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Data rows */}
          <div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Data</p>
            <div className="flex flex-col gap-1">
              <AnimatePresence initial={false}>
                {rows.map(row => (
                  <motion.div
                    key={row.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-[1fr_72px_28px] gap-1 items-center"
                  >
                    <input
                      type="text"
                      value={row.label}
                      onChange={e => updateRow(row.id, 'label', e.target.value)}
                      placeholder="Label"
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 min-w-0"
                    />
                    <input
                      type="number"
                      value={row.value}
                      onChange={e => updateRow(row.id, 'value', e.target.value)}
                      placeholder="0"
                      className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 w-full"
                    />
                    <button
                      onClick={() => removeRow(row.id)}
                      disabled={rows.length <= 2}
                      className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <X size={13} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex gap-3 mt-2">
              <button
                onClick={addRow}
                disabled={rows.length >= 12}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none"
              >
                <Plus size={13} /> Add Row
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700"
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          {title.trim() && (
            <p className="font-black text-lg text-slate-800 mb-4">{title}</p>
          )}

          <motion.div
            key={`${chartType}-${theme}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
            id="chart-preview"
          >
            {renderChart()}
          </motion.div>

          {hasEnoughData && (
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-100 pt-4">
              <Camera size={13} />
              <span>
                Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 font-mono text-[10px]">Win+Shift+S</kbd> to screenshot your chart — or on Mac use <kbd className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 font-mono text-[10px]">Cmd+Shift+4</kbd>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
