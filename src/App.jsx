import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Router, Network, Monitor, Plus, Trash2, Settings, Play, 
  RefreshCw, Terminal, Activity, Wifi, ShieldCheck, CheckCircle2, 
  XCircle, ArrowRight, Zap, Info, Eye, Layers, Cable, ChevronLeft, 
  ChevronRight, Maximize2, Minimize2, Printer, Laptop, ShoppingCart, 
  Radio, Tablet, CreditCard, Cpu, Globe, Signal, Tv, ScreenShare, 
  ChevronDown, Unlink, Keyboard, Mouse, Volume2, HardDrive, Tag, Send, X 
} from 'lucide-react';

// Icono personalizado para Datáfono / Pinpad
const DatafonoPinpadIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <rect x="7" y="4" width="10" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <circle cx="9" cy="15" r="1" fill="currentColor" />
    <circle cx="12" cy="15" r="1" fill="currentColor" />
    <circle cx="15" cy="15" r="1" fill="currentColor" />
    <circle cx="9" cy="18" r="1" fill="currentColor" />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
    <circle cx="15" cy="18" r="1" fill="currentColor" />
  </svg>
);

// Icono personalizado para Switch de 48 Puertos
const SwitchRectangularIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <line x1="6" y1="10" x2="8" y2="10" />
    <line x1="10" y1="10" x2="12" y2="10" />
    <line x1="14" y1="10" x2="16" y2="10" />
    <circle cx="19" cy="12" r="1" fill="currentColor" />
  </svg>
);

export default function App() {
  const [nodes, setNodes] = useState([
    { id: '1', type: 'router', name: 'EC99999rtr01', x: 100, y: 150, ports: 4, connected: [] },
    { id: '2', type: 'switch', name: 'EC99999sw01', x: 350, y: 150, ports: 48, connected: [] },
    { id: '3', type: 'pos', name: 'EC99999pos01', x: 650, y: 100, ports: 2, connected: [] }
  ]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [lanSubnet, setLanSubnet] = useState('192.168.1.X');

  return (
    <div className="w-screen h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Barra superior */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">Simulador de Red & Topología</h1>
            <p className="text-xs text-slate-400">Infraestructura y Conectividad - Arcos Dorados</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700 flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-semibold">LAN Subnet:</span>
            <input 
              type="text" 
              value={lanSubnet} 
              onChange={(e) => setLanSubnet(e.target.value)}
              className="bg-slate-900 text-cyan-400 font-mono text-sm px-2 py-0.5 rounded border border-slate-700 w-28 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Panel izquierdo de dispositivos */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col p-4 overflow-y-auto shadow-xl">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" /> Equipos de Red Disponibles
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 hover:border-cyan-500 transition-all cursor-pointer flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <SwitchRectangularIcon className="w-8 h-8 text-cyan-400" />
                <div>
                  <p className="text-sm font-medium text-white">Switch Meraki 48-P</p>
                  <p className="text-xs text-slate-400 font-mono">EC99999sw01</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const newId = String(Date.now());
                  setNodes([...nodes, { id: newId, type: 'switch', name: `EC99999sw0${nodes.length + 1}`, x: 200, y: 200, ports: 48, connected: [] }]);
                }}
                className="bg-cyan-600 hover:bg-cyan-500 text-white p-1.5 rounded-md shadow"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 hover:border-cyan-500 transition-all cursor-pointer flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Server className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-sm font-medium text-white">Servidor Hyper-V</p>
                  <p className="text-xs text-slate-400 font-mono">EC99999srv01</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const newId = String(Date.now());
                  setNodes([...nodes, { id: newId, type: 'server', name: `EC99999srv0${nodes.length + 1}`, x: 200, y: 250, ports: 6, connected: [] }]);
                }}
                className="bg-purple-600 hover:bg-purple-500 text-white p-1.5 rounded-md shadow"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 hover:border-cyan-500 transition-all cursor-pointer flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <DatafonoPinpadIcon className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-white">POS / Datáfono</p>
                  <p className="text-xs text-slate-400 font-mono">EC99999pos01</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const newId = String(Date.now());
                  setNodes([...nodes, { id: newId, type: 'pos', name: `EC99999pos0${nodes.length + 1}`, x: 250, y: 300, ports: 2, connected: [] }]);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-1.5 rounded-md shadow"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lienzo de Topología */}
        <div className="flex-1 bg-slate-950 relative overflow-auto flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
          
          <div className="relative w-full h-full border border-slate-800 rounded-xl bg-slate-900/40 backdrop-blur-sm overflow-hidden flex flex-wrap items-center justify-center gap-6 p-8 shadow-2xl">
            {nodes.map((node) => (
              <div 
                key={node.id} 
                onClick={() => setSelectedNode(node)}
                className={`bg-slate-900 border-2 ${selectedNode?.id === node.id ? 'border-cyan-400 shadow-cyan-500/20' : 'border-slate-700'} p-4 rounded-xl shadow-lg cursor-pointer flex flex-col items-center min-w-[160px] hover:border-slate-500 transition-all`}
              >
                <div className="mb-2 text-cyan-400">
                  {node.type === 'switch' && <SwitchRectangularIcon className="w-10 h-10" />}
                  {node.type === 'server' && <Server className="w-10 h-10 text-purple-400" />}
                  {node.type === 'pos' && <DatafonoPinpadIcon className="w-10 h-10 text-emerald-400" />}
                  {node.type === 'router' && <Router className="w-10 h-10 text-blue-400" />}
                </div>
                <span className="text-sm font-bold text-white font-mono">{node.name}</span>
                <span className="text-xs text-slate-400 mt-1">{node.ports} Puertos LAN</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
