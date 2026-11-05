import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Router, Network, Monitor, Plus, Trash2, Settings, Play, 
  RefreshCw, Terminal, Activity, Wifi, ShieldCheck, CheckCircle2, 
  XCircle, ArrowRight, Zap, Info, Eye, Layers, Cable, ChevronLeft, ChevronRight, Maximize2, Minimize2,
  Printer, Laptop, ShoppingCart, Radio, Tablet, CreditCard, Cpu, Globe, Signal, Tv, ScreenShare, ChevronDown, Unlink,
  Keyboard, Mouse, Volume2, HardDrive, Tag, Send, X, Save, Download, Upload, FileText, Share2, Sliders, Archive
} from 'lucide-react';

// Icono personalizado SVG para Pinpad / Datáfono de Cobro
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

// Icono personalizado SVG para Switch Rectangular de 48 Puertos
const SwitchRectangularIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="5" cy="9" r="1" fill="currentColor" />
    <circle cx="7" cy="9" r="1" fill="currentColor" />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <rect x="4" y="12" width="2" height="3" rx="0.5" />
    <rect x="7" y="12" width="2" height="3" rx="0.5" />
    <rect x="10" y="12" width="2" height="3" rx="0.5" />
    <rect x="13" y="12" width="2" height="3" rx="0.5" />
    <rect x="16" y="12" width="2" height="3" rx="0.5" />
    <rect x="19" y="10" width="1" height="5" fill="currentColor" />
  </svg>
);

// Icono personalizado SVG para KVS HP Thin Client (Mini torre vertical)
const KvsChassisIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="3" width="10" height="18" rx="2" />
    <circle cx="12" cy="6" r="1" fill="currentColor" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="16" x2="15" y2="16" />
  </svg>
);

// Generador dinámico de puertos para Switch Meraki de 48 Puertos
const MERAKI_48_PORTS = Array.from({ length: 48 }, (_, i) => `port_${i + 1}`);

// Configuración de Medios de Conexión con Estilos Visuales Diversificados
const CONNECTION_TYPES = {
  ETHERNET: { id: 'ETHERNET', label: 'Cable Ethernet (UTP Cat6)', color: '#38bdf8', dash: 'none', width: '2.5' },
  WIFI: { id: 'WIFI', label: 'Wi-Fi Inalámbrico', color: '#10b981', dash: '4,6', width: '2' },
  FIBER: { id: 'FIBER', label: 'Fibra Óptica Monomodo', color: '#f59e0b', dash: '12,4', width: '3' },
  COAXIAL: { id: 'COAXIAL', label: 'Cable Coaxial RF', color: '#a855f7', dash: '8,3,2,3', width: '2.5' },
  HDMI: { id: 'HDMI', label: 'Cable HDMI 2.1 Video/Audio', color: '#ec4899', dash: 'none', width: '3.5' },
  VGA: { id: 'VGA', label: 'Cable VGA Análogo', color: '#64748b', dash: '2,2', width: '2' },
  DP: { id: 'DP', label: 'DisplayPort 1.4', color: '#8b5cf6', dash: '6,2', width: '3' },
  USB: { id: 'USB', label: 'Conexión USB Data/Auto', color: '#f97316', dash: '5,5', width: '2.5' },
  AUX_35: { id: 'AUX_35', label: 'Cable Jack 3.5mm Auxiliar', color: '#eab308', dash: '1,4', width: '2' },
  SATELLITE: { id: 'SATELLITE', label: 'Enlace Satelital (VSAT)', color: '#06b6d4', dash: '10,5,2,5', width: '2.5' },
  GPRS: { id: 'GPRS', label: 'Red Celular GPRS / 4G / 5G', color: '#ef4444', dash: '3,6', width: '2' }
};

// Icono mapeo por categoría para mostrar cuando la barra lateral está colapsada
const CATEGORY_ICONS = {
  'Networking Meraki & Routers': Router,
  'KVS & Thin Clients HP': Cpu,
  'POS, Datáfonos & Servidores': DatafonoPinpadIcon,
  'Clientes & Tablets': Laptop,
  'Monitores & Displays': Tv
};

// Sistemas Operativos
const OS_OPTIONS = [
  'Android 13', 'Android 12', 'Android POS Edition',
  'Windows 11 Pro', 'Windows 10 IoT Enterprise',
  'Windows Server 2022', 'Ubuntu Linux 22.04 LTS',
  'Debian 12', 'HP ThinPro OS', 'VEROS Linux', 'Monitor Display Firmware', 'Cisco Meraki OS', 'Cisco IOS-XE', 'NCR Thermal Printer Firmware'
];

// Opciones de Protocolos para Simulación
const SIMULATION_PROTOCOLS = {
  ICMP: { id: 'ICMP', label: 'ICMP (Ping)', color: '#10b981', port: 'N/A', reqName: 'Echo Request', resName: 'Echo Reply' },
  TCP: { id: 'TCP', label: 'TCP Handshake', color: '#38bdf8', port: '80/443', reqName: 'SYN', resName: 'SYN-ACK -> ACK' },
  UDP: { id: 'UDP', label: 'UDP Streaming', color: '#f59e0b', port: '53/5060', reqName: 'Datagram Send', resName: 'Datagram ACK/Response' },
  HTTP: { id: 'HTTP', label: 'HTTP GET / Web', color: '#ec4899', port: '80', reqName: 'GET /index.html', resName: '200 OK (HTML)' },
  DNS: { id: 'DNS', label: 'DNS Query', color: '#a855f7', port: '53', reqName: 'Standard Query A', resName: 'Response IP Address' }
};

// Definición Completa de Dispositivos por Categoría
const DEVICE_TYPES = {
  MERAKI_SWITCH_48: {
    category: 'Networking Meraki & Routers',
    label: 'Switch Meraki 48-Ports',
    icon: SwitchRectangularIcon,
    ports: MERAKI_48_PORTS,
    defaultIp: '192.168.1.2',
    mask: '255.255.255.0',
    defaultOs: 'Cisco Meraki OS'
  },
  AP_MERAKI_MR44: {
    category: 'Networking Meraki & Routers',
    label: 'AP Meraki MR44 (Indoor)',
    icon: Radio,
    ports: ['eth0 (2.5G)', 'wlan0'],
    defaultIp: '192.168.1.10',
    mask: '255.255.255.0',
    defaultOs: 'Cisco Meraki OS'
  },
  AP_MERAKI_MR70: {
    category: 'Networking Meraki & Routers',
    label: 'AP Meraki MR70 (Outdoor)',
    icon: Radio,
    ports: ['eth0 (Rugged)', 'wlan0'],
    defaultIp: '192.168.1.11',
    mask: '255.255.255.0',
    defaultOs: 'Cisco Meraki OS'
  },
  AP_MERAKI_MR78: {
    category: 'Networking Meraki & Routers',
    label: 'AP Meraki MR78 (WiFi 6)',
    icon: Radio,
    ports: ['eth0 (1G)', 'wlan0'],
    defaultIp: '192.168.1.12',
    mask: '255.255.255.0',
    defaultOs: 'Cisco Meraki OS'
  },
  ROUTER: {
    category: 'Networking Meraki & Routers',
    label: 'Router Core / Gateway',
    icon: Router,
    ports: ['eth0', 'eth1', 'wan0'],
    defaultIp: '192.168.1.1',
    mask: '255.255.255.0',
    defaultOs: 'Cisco IOS-XE'
  },
  HP_T630: {
    category: 'KVS & Thin Clients HP',
    label: 'KVS HP t630',
    icon: KvsChassisIcon,
    ports: ['eth0', 'dp1', 'dp2', 'usb1', 'usb2'],
    defaultIp: '192.168.1.101',
    mask: '255.255.255.0',
    defaultOs: 'HP ThinPro OS'
  },
  HP_T640: {
    category: 'KVS & Thin Clients HP',
    label: 'KVS HP t640',
    icon: KvsChassisIcon,
    ports: ['Ethernet 1', 'DisplayPort 1', 'DisplayPort 2', 'USB 1', 'USB 2'],
    defaultIp: '192.168.1.102',
    mask: '255.255.255.0',
    defaultOs: 'Windows 10 IoT Enterprise'
  },
  HP_T655: {
    category: 'KVS & Thin Clients HP',
    label: 'KVS HP t655',
    icon: KvsChassisIcon,
    ports: ['eth0', 'dp1', 'dp2', 'dp3', 'usb1', 'usb2'],
    defaultIp: '192.168.1.103',
    mask: '255.255.255.0',
    defaultOs: 'HP ThinPro OS'
  },
  HP_T660: {
    category: 'KVS & Thin Clients HP',
    label: 'KVS HP t660',
    icon: KvsChassisIcon,
    ports: ['Ethernet 1', 'DisplayPort 1', 'DisplayPort 2', 'USB 1', 'USB 2'],
    defaultIp: '192.168.1.104',
    mask: '255.255.255.0',
    defaultOs: 'Windows 10 IoT Enterprise'
  },
  NCOMPUTING_RX450: {
    category: 'KVS & Thin Clients HP',
    label: 'NComputing RX450',
    icon: Cpu,
    ports: ['eth0', 'hdmi1', 'hdmi2', 'usb1'],
    defaultIp: '192.168.1.110',
    mask: '255.255.255.0',
    defaultOs: 'VEROS Linux'
  },
  PINPAD_ETH: {
    category: 'POS, Datáfonos & Servidores',
    label: 'Datáfono Pinpad (Ethernet)',
    icon: DatafonoPinpadIcon,
    ports: ['eth0'],
    defaultIp: '192.168.1.60',
    mask: '255.255.255.0',
    defaultOs: 'Android POS Edition'
  },
  PINPAD_WIFI: {
    category: 'POS, Datáfonos & Servidores',
    label: 'Datáfono Pinpad (Wi-Fi)',
    icon: DatafonoPinpadIcon,
    ports: ['wlan0'],
    defaultIp: '192.168.1.61',
    mask: '255.255.255.0',
    defaultOs: 'Android POS Edition'
  },
  PINPAD_DUAL: {
    category: 'POS, Datáfonos & Servidores',
    label: 'Datáfono Pinpad (Dual Eth/Wi-Fi)',
    icon: DatafonoPinpadIcon,
    ports: ['eth0', 'wlan0'],
    defaultIp: '192.168.1.62',
    mask: '255.255.255.0',
    defaultOs: 'Android 12'
  },
  NCR_7199: {
    category: 'POS, Datáfonos & Servidores',
    label: 'Impresora POS NCR 7199',
    icon: Printer,
    ports: ['eth0', 'usb1', 'rs232'],
    defaultIp: '192.168.1.205',
    mask: '255.255.255.0',
    defaultOs: 'NCR Thermal Printer Firmware'
  },
  PRINTER_MFP: {
    category: 'POS, Datáfonos & Servidores',
    label: 'Impresora Multifuncional (MFP)',
    icon: Printer,
    ports: ['eth0', 'usb1', 'wlan0'],
    defaultIp: '192.168.1.201',
    mask: '255.255.255.0',
    defaultOs: 'Printer Firmware OS'
  },
  NCR_XR7: {
    category: 'POS, Datáfonos & Servidores',
    label: 'POS NCR RealPOS XR7',
    icon: ShoppingCart,
    ports: ['Ethernet 1', 'USB 1', 'USB 2', 'COM1', 'COM2', 'CashDrawer'],
    defaultIp: '192.168.1.55',
    mask: '255.255.255.0',
    defaultOs: 'Windows 10 IoT Enterprise'
  },
  DELL_SERVER: {
    category: 'POS, Datáfonos & Servidores',
    label: 'Servidor Dell PowerEdge',
    icon: Server,
    ports: ['Ethernet 1 (NIC1)', 'Ethernet 2 (NIC2)', 'iDRAC Remote', 'vEthernet (Hyper-V Switch)'],
    defaultIp: '192.168.1.250',
    mask: '255.255.255.0',
    defaultOs: 'Windows Server 2022'
  },
  PC_DESKTOP: {
    category: 'Clientes & Tablets',
    label: 'PC Desktop Client',
    icon: Monitor,
    ports: ['Ethernet 1', 'HDMI 1', 'DisplayPort 1'],
    defaultIp: '192.168.1.100',
    mask: '255.255.255.0',
    defaultOs: 'Windows 11 Pro'
  },
  LAPTOP: {
    category: 'Clientes & Tablets',
    label: 'Laptop Corporativa',
    icon: Laptop,
    ports: ['Ethernet 1', 'Wi-Fi', 'HDMI 1', 'USB Auto'],
    defaultIp: '192.168.1.105',
    mask: '255.255.255.0',
    defaultOs: 'Windows 11 Pro'
  },
  TABLET_WINDOWS: {
    category: 'Clientes & Tablets',
    label: 'Tablet Windows 11',
    icon: Tablet,
    ports: ['Wi-Fi', 'USB-C'],
    defaultIp: '192.168.1.120',
    mask: '255.255.255.0',
    defaultOs: 'Windows 11 Pro'
  },
  TABLET_ANDROID: {
    category: 'Clientes & Tablets',
    label: 'Tablet Android',
    icon: Tablet,
    ports: ['wlan0', 'usb0'],
    defaultIp: '192.168.1.121',
    mask: '255.255.255.0',
    defaultOs: 'Android 13'
  },
  KEYBOARD_MOUSE: {
    category: 'Clientes & Tablets',
    label: 'Teclado & Mouse USB',
    icon: Keyboard,
    ports: ['USB 1'],
    defaultIp: 'N/A',
    mask: 'N/A',
    defaultOs: 'Periférico'
  },
  SPEAKERS_IP: {
    category: 'Clientes & Tablets',
    label: 'Parlantes Audio IP / Auto',
    icon: Volume2,
    ports: ['Ethernet 1', 'Jack 3.5mm Aux', 'USB Auto'],
    defaultIp: '192.168.1.220',
    mask: '255.255.255.0',
    defaultOs: 'Audio Firmware'
  },
  MONITOR_22: {
    category: 'Monitores & Displays',
    label: 'Monitor 22" Full HD',
    icon: Tv,
    ports: ['hdmi1', 'vga1'],
    defaultIp: 'N/A',
    mask: 'N/A',
    defaultOs: 'Monitor Display Firmware'
  },
  MONITOR_24: {
    category: 'Monitores & Displays',
    label: 'Monitor 24" IPS',
    icon: Tv,
    ports: ['hdmi1', 'dp1', 'vga1'],
    defaultIp: 'N/A',
    mask: 'N/A',
    defaultOs: 'Monitor Display Firmware'
  },
  MONITOR_32: {
    category: 'Monitores & Displays',
    label: 'Display 32" KVS',
    icon: ScreenShare,
    ports: ['hdmi1', 'hdmi2', 'dp1'],
    defaultIp: 'N/A',
    mask: 'N/A',
    defaultOs: 'Monitor Display Firmware'
  },
  MONITOR_42: {
    category: 'Monitores & Displays',
    label: 'Pantalla 42" Comercial',
    icon: ScreenShare,
    ports: ['hdmi1', 'hdmi2', 'dp1'],
    defaultIp: 'N/A',
    mask: 'N/A',
    defaultOs: 'Monitor Display Firmware'
  },
  MONITOR_55: {
    category: 'Monitores & Displays',
    label: 'Pantalla 55" Menu Board',
    icon: ScreenShare,
    ports: ['hdmi1', 'hdmi2', 'dp1', 'dp2'],
    defaultIp: 'N/A',
    mask: 'N/A',
    defaultOs: 'Monitor Display Firmware'
  }
};

const CATEGORIES = Array.from(new Set(Object.values(DEVICE_TYPES).map(d => d.category)));

// Función auxiliar para generar el prefijo de nombre corporativo según el tipo de equipo
const getDevicePrefix = (typeKey) => {
  if (typeKey.startsWith('PINPAD') || typeKey === 'NCR_XR7') return 'EC99999pos';
  if (typeKey.startsWith('HP_T') || typeKey.startsWith('NCOMPUTING')) return 'EC99999kvs';
  if (typeKey.startsWith('MERAKI_SWITCH') || typeKey === 'ROUTER') return 'EC99999rtr';
  if (typeKey === 'DELL_SERVER') return 'EC99999srv';
  if (typeKey.startsWith('TABLET')) return 'EC99999tab';
  if (typeKey === 'LAPTOP' || typeKey === 'PC_DESKTOP') return 'EC99999pc';
  if (typeKey.startsWith('MONITOR')) return 'EC99999disp';
  return 'EC99999dev';
};

export default function App() {
  const [lanSubnetPrefix, setLanSubnetPrefix] = useState('192.168.1');
  const [showLanConfigModal, setShowLanConfigModal] = useState(false);

  // Estados de Zoom y Desplazamiento (Pan & Zoom)
  const [zoomScale, setZoomScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanningCanvas, setIsPanningCanvas] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Nodos iniciales de la topología con el nuevo formato de nombres corporativos
  const [nodes, setNodes] = useState([
    { id: 'node-1', name: 'EC99999pos01', type: 'PINPAD_DUAL', x: 60, y: 80, ip: '192.168.1.62', mask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', os: 'Android 12', vlans: [] },
    { id: 'node-2', name: 'EC99999rtr01', type: 'MERAKI_SWITCH_48', x: 260, y: 150, ip: '192.168.1.2', mask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', os: 'Cisco Meraki OS', vlans: [{ id: 1, name: 'Default', ports: [] }] },
    { id: 'node-3', name: 'EC99999kvs01', type: 'HP_T640', x: 500, y: 80, ip: '192.168.1.102', mask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', os: 'Windows 10 IoT Enterprise', vlans: [] },
    { id: 'node-4', name: 'EC99999rtr02', type: 'ROUTER', x: 260, y: 20, ip: '192.168.1.1', mask: '255.255.255.0', gateway: '0.0.0.0', dns: '8.8.8.8', os: 'Cisco IOS-XE', vlans: [] },
    { id: 'node-5', name: 'EC99999srv01', type: 'DELL_SERVER', x: 500, y: 220, ip: '192.168.1.250', mask: '255.255.255.0', gateway: '192.168.1.1', dns: '8.8.8.8', os: 'Windows Server 2022', vlans: [] }
  ]);

  // Enlaces entre nodos
  const [links, setLinks] = useState([
    { id: 'link-1', from: 'node-4', fromPort: 'eth0', to: 'node-2', toPort: 'port_1', medium: 'ETHERNET' },
    { id: 'link-2', from: 'node-1', fromPort: 'eth0', to: 'node-2', toPort: 'port_2', medium: 'ETHERNET' },
    { id: 'link-3', from: 'node-3', fromPort: 'Ethernet 1', to: 'node-2', toPort: 'port_3', medium: 'ETHERNET' },
    { id: 'link-4', from: 'node-5', fromPort: 'Ethernet 1 (NIC1)', to: 'node-2', toPort: 'port_48', medium: 'FIBER' }
  ]);

  // Estados de interfaz y selección
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activeMenuNodeId, setActiveMenuNodeId] = useState(null);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

  // Estados de selección múltiple y alineación
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  const [selectionBox, setSelectionBox] = useState(null);

  // Estados de simulación de tráfico y herramientas
  const [cableMode, setCableMode] = useState(false);
  const [cableSource, setCableSource] = useState(null);
  const [pendingConnection, setPendingConnection] = useState(null);
  const [selectedSrcPort, setSelectedSrcPort] = useState('');
  const [selectedDstPort, setSelectedDstPort] = useState('');
  const [selectedConnectionMedium, setSelectedConnectionMedium] = useState('ETHERNET');

  const [pingMode, setPingMode] = useState(false);
  const [pingSource, setPingSource] = useState(null);
  const [selectedProtocol, setSelectedProtocol] = useState('ICMP');
  const [animatingPacket, setAnimatingPacket] = useState(null);
  const [capturedPacket, setCapturedPacket] = useState(null);
  const [logs, setLogs] = useState([
    { id: 1, type: 'info', text: 'Simulador de red inicializado correctamente con nomenclatura estandarizada.', time: '00:00:00' }
  ]);

  // Modal Flotante de Propiedades
  const [configPos, setConfigPos] = useState({ x: 320, y: 100 });
  const [isDraggingConfig, setIsDraggingConfig] = useState(false);
  const [configDragOffset, setConfigDragOffset] = useState({ x: 0, y: 0 });
  const [activeConfigTab, setActiveConfigTab] = useState('general');
  const [showVlanForm, setShowVlanForm] = useState(false);
  const [newVlanId, setNewVlanId] = useState('');
  const [newVlanName, setNewVlanName] = useState('');

  const dragNodesRef = useRef([]);
  const nodeElementsRef = useRef({});
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isInteractingWithNodeRef = useRef(false);
  const isSelectingRef = useRef(false);
  const selectionStartRef = useRef({ x: 0, y: 0 });
  const [hasMovedDuringDrag, setHasMovedDuringDrag] = useState(false);
  const canvasRef = useRef(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const handleMouseDownNode = (e, node) => {
    e.stopPropagation();
    isInteractingWithNodeRef.current = true;

    if (cableMode) {
      if (!cableSource) {
        setCableSource(node);
        addLog('info', `Seleccionado equipo origen: ${node.name}. Ahora selecciona el destino.`);
      } else if (cableSource.id !== node.id) {
        openConnectionModal(cableSource, node);
      }
      return;
    }

    if (pingMode) {
      if (!pingSource) {
        setPingSource(node);
        addLog('info', `[${selectedProtocol}] Origen: ${node.name}. Selecciona el equipo destino...`);
      } else if (pingSource.id !== node.id) {
        startTrafficSimulation(pingSource, node);
        setPingMode(false);
        setPingSource(null);
      }
      return;
    }

    let dragTargets = selectedNodeIds.includes(node.id) ? selectedNodeIds : [node.id];
    if (!selectedNodeIds.includes(node.id)) {
      setSelectedNodeIds([node.id]);
    }
    setHasMovedDuringDrag(false);

    if (canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mouseCanvasX = (e.clientX - canvasRect.left - panOffset.x) / zoomScale;
      const mouseCanvasY = (e.clientY - canvasRect.top - panOffset.y) / zoomScale;

      dragNodesRef.current = dragTargets.map(id => {
        const n = nodes.find(nd => nd.id === id) || node;
        return {
          id,
          offsetX: mouseCanvasX - n.x,
          offsetY: mouseCanvasY - n.y,
          currentPos: { x: n.x, y: n.y }
        };
      });
    }
  };

  const toggleCategory = (catName) => {
    setCollapsedCategories(prev => ({ ...prev, [catName]: !prev[catName] }));
  };

  const addLog = (type, text) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [{ id: Date.now(), type, text, time }, ...prev.slice(0, 49)]);
  };

  const handleAlignNodes = (alignment) => {
    if (selectedNodeIds.length < 2) return;
    
    setNodes(prev => {
      const selected = prev.filter(n => selectedNodeIds.includes(n.id));
      if (selected.length < 2) return prev;

      let refValue = 0;
      if (alignment === 'left') refValue = Math.min(...selected.map(n => n.x));
      if (alignment === 'center') {
        const minX = Math.min(...selected.map(n => n.x));
        const maxX = Math.max(...selected.map(n => n.x + 72));
        refValue = (minX + maxX) / 2 - 36;
      }
      if (alignment === 'top') refValue = Math.min(...selected.map(n => n.y));
      if (alignment === 'middle') {
        const minY = Math.min(...selected.map(n => n.y));
        const maxY = Math.max(...selected.map(n => n.y + 56));
        refValue = (minY + maxY) / 2 - 28;
      }

      const isHorizontalDist = alignment === 'dist-x';
      const isVerticalDist = alignment === 'dist-y';

      let sorted = [];
      let step = 0;
      let min = 0;
      if (isHorizontalDist) {
        sorted = [...selected].sort((a,b) => a.x - b.x);
        min = sorted[0].x;
        const max = sorted[sorted.length-1].x;
        step = (max - min) / (sorted.length - 1 || 1);
      }
      if (isVerticalDist) {
        sorted = [...selected].sort((a,b) => a.y - b.y);
        min = sorted[0].y;
        const max = sorted[sorted.length-1].y;
        step = (max - min) / (sorted.length - 1 || 1);
      }

      return prev.map(n => {
        if (!selectedNodeIds.includes(n.id)) return n;
        if (alignment === 'left') return { ...n, x: refValue };
        if (alignment === 'center') return { ...n, x: refValue };
        if (alignment === 'top') return { ...n, y: refValue };
        if (alignment === 'middle') return { ...n, y: refValue };
        if (isHorizontalDist) {
          const idx = sorted.findIndex(s => s.id === n.id);
          return { ...n, x: min + (idx * step) };
        }
        if (isVerticalDist) {
          const idx = sorted.findIndex(s => s.id === n.id);
          return { ...n, y: min + (idx * step) };
        }
        return n;
      });
    });
    addLog('info', `Equipos seleccionados alineados correctamente.`);
  };

  const handleDirectMouseMove = (e) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };

    if (isPanningCanvas) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      panStartRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (isSelectingRef.current && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mouseCanvasX = (e.clientX - canvasRect.left - panOffset.x) / zoomScale;
      const mouseCanvasY = (e.clientY - canvasRect.top - panOffset.y) / zoomScale;
      
      setSelectionBox(prev => ({ ...prev, endX: mouseCanvasX, endY: mouseCanvasY }));

      const minX = Math.min(selectionStartRef.current.x, mouseCanvasX);
      const maxX = Math.max(selectionStartRef.current.x, mouseCanvasX);
      const minY = Math.min(selectionStartRef.current.y, mouseCanvasY);
      const maxY = Math.max(selectionStartRef.current.y, mouseCanvasY);

      const selectedIds = nodes.filter(n => {
        const nx = n.x, ny = n.y, nw = 72, nh = 56;
        return nx < maxX && nx + nw > minX && ny < maxY && ny + nh > minY;
      }).map(n => n.id);

      setSelectedNodeIds(selectedIds);
      return;
    }

    if (dragNodesRef.current.length > 0 && canvasRef.current) {
      setHasMovedDuringDrag(true);
      setActiveMenuNodeId(null);

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mouseCanvasX = (e.clientX - canvasRect.left - panOffset.x) / zoomScale;
      const mouseCanvasY = (e.clientY - canvasRect.top - panOffset.y) / zoomScale;

      dragNodesRef.current.forEach(dragNode => {
        const el = nodeElementsRef.current[dragNode.id];
        const newX = mouseCanvasX - dragNode.offsetX;
        const newY = mouseCanvasY - dragNode.offsetY;
        if (el) {
          el.style.left = `${newX}px`;
          el.style.top = `${newY}px`;
        }
        dragNode.currentPos = { x: newX, y: newY };
      });
    }

    if (isDraggingConfig) {
      const x = Math.max(10, Math.min(window.innerWidth - 340, e.clientX - configDragOffset.x));
      const y = Math.max(10, Math.min(window.innerHeight - 400, e.clientY - configDragOffset.y));
      setConfigPos({ x, y });
    }
  };

  const handleCanvasWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoomScale(prev => Math.min(2.0, Math.max(0.3, prev * zoomFactor)));
  };

  const handleMouseDownCanvas = (e) => {
    if (e.button === 1 || e.shiftKey) {
      setIsPanningCanvas(true);
      panStartRef.current = { x: e.clientX, y: e.clientY };
    } else if (e.button === 0) {
      if (isInteractingWithNodeRef.current) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mouseCanvasX = (e.clientX - canvasRect.left - panOffset.x) / zoomScale;
      const mouseCanvasY = (e.clientY - canvasRect.top - panOffset.y) / zoomScale;
      isSelectingRef.current = true;
      selectionStartRef.current = { x: mouseCanvasX, y: mouseCanvasY };
      setSelectionBox({ startX: mouseCanvasX, startY: mouseCanvasY, endX: mouseCanvasX, endY: mouseCanvasY });
      setSelectedNodeIds([]);
    }
  };

  const handleMouseUp = () => {
    setIsPanningCanvas(false);
    
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      setSelectionBox(null);
    }

    if (dragNodesRef.current.length > 0) {
      const movedNodes = dragNodesRef.current.filter(d => d.currentPos);
      if (movedNodes.length > 0 && hasMovedDuringDrag) {
        setNodes(prev => prev.map(n => {
          const moved = movedNodes.find(m => m.id === n.id);
          return moved ? { ...n, x: moved.currentPos.x, y: moved.currentPos.y } : n;
        }));
      }

      if (!hasMovedDuringDrag && dragNodesRef.current.length === 1) {
        setActiveMenuNodeId(dragNodesRef.current[0].id);
      }
      dragNodesRef.current = [];
    }
    setIsDraggingConfig(false);
  };

  const handleCanvasClick = () => {
    if (isInteractingWithNodeRef.current || hasMovedDuringDrag) {
      isInteractingWithNodeRef.current = false;
      return;
    }
    setActiveMenuNodeId(null);
    setSelectedLinkId(null);
    setCableMode(false);
    setCableSource(null);
    setPingMode(false);
    setPingSource(null);
  };

  const startTrafficSimulation = (srcNode, dstNode) => {
    const protoCfg = SIMULATION_PROTOCOLS[selectedProtocol] || SIMULATION_PROTOCOLS.ICMP;
    addLog('info', `Iniciando pruebas de conectividad ${selectedProtocol} de ${srcNode.name} ➔ ${dstNode.name}...`);

    const pathNodes = [srcNode];
    const directLink = links.find(l => (l.from === srcNode.id && l.to === dstNode.id) || (l.from === dstNode.id && l.to === srcNode.id));

    if (!directLink) {
      const intermediateLinkSrc = links.find(l => l.from === srcNode.id || l.to === srcNode.id);
      if (intermediateLinkSrc) {
        const nextId = intermediateLinkSrc.from === srcNode.id ? intermediateLinkSrc.to : intermediateLinkSrc.from;
        const nextNode = nodes.find(n => n.id === nextId);
        if (nextNode && nextNode.id !== dstNode.id) {
          pathNodes.push(nextNode);
        }
      }
    }
    pathNodes.push(dstNode);

    let currentHop = 0;

    const animateForwardHop = () => {
      if (currentHop >= pathNodes.length - 1) {
        addLog('success', `[${selectedProtocol}] Paquete recibido en ${dstNode.name}. Procesando respuesta ${protoCfg.resName}...`);
        setTimeout(() => {
          animateBackwardHop(pathNodes.length - 1);
        }, 300);
        return;
      }

      const curr = pathNodes[currentHop];
      const next = pathNodes[currentHop + 1];

      setAnimatingPacket({
        startX: curr.x + 36,
        startY: curr.y + 28,
        targetX: next.x + 36,
        targetY: next.y + 28,
        color: protoCfg.color,
        label: protoCfg.reqName
      });

      currentHop++;
      setTimeout(animateForwardHop, 800);
    };

    const animateBackwardHop = (hopIndex) => {
      if (hopIndex <= 0) {
        setAnimatingPacket(null);
        addLog('success', `✔ [${selectedProtocol}] Respuesta de ${dstNode.name} recibida con éxito en ${srcNode.name}. (RTT <12ms)`);

        setCapturedPacket({
          frameNo: Math.floor(Math.random() * 9000) + 1000,
          protocol: selectedProtocol,
          length: selectedProtocol === 'HTTP' ? '342 bytes' : '66 bytes',
          timestamp: new Date().toLocaleTimeString(),
          srcMac: `00:1A:${Math.floor(Math.random()*89+10)}:${Math.floor(Math.random()*89+10)}:4D:5E`,
          dstMac: `AA:BB:${Math.floor(Math.random()*89+10)}:${Math.floor(Math.random()*89+10)}:EE:FF`,
          srcIp: srcNode.ip,
          dstIp: dstNode.ip,
          port: protoCfg.port,
          ttl: 64,
          reqDetail: protoCfg.reqName,
          resDetail: protoCfg.resName
        });
        return;
      }

      const curr = pathNodes[hopIndex];
      const prev = pathNodes[hopIndex - 1];

      setAnimatingPacket({
        startX: curr.x + 36,
        startY: curr.y + 28,
        targetX: prev.x + 36,
        targetY: prev.y + 28,
        color: protoCfg.color,
        label: protoCfg.resName
      });

      setTimeout(() => animateBackwardHop(hopIndex - 1), 800);
    };

    animateForwardHop();
  };

  const openConnectionModal = (srcNode, dstNode) => {
    const srcPorts = DEVICE_TYPES[srcNode.type]?.ports || ['eth0'];
    const dstPorts = DEVICE_TYPES[dstNode.type]?.ports || ['eth0'];

    setPendingConnection({ srcNode, dstNode });
    setSelectedSrcPort(srcPorts[0] || 'eth0');
    setSelectedDstPort(dstPorts[0] || 'eth0');
    setSelectedConnectionMedium('ETHERNET');
  };

  const handleConfirmConnection = () => {
    if (!pendingConnection) return;
    const { srcNode, dstNode } = pendingConnection;

    const newLink = {
      id: `link-${Date.now()}`,
      from: srcNode.id,
      fromPort: selectedSrcPort,
      to: dstNode.id,
      toPort: selectedDstPort,
      medium: selectedConnectionMedium
    };

    setLinks(prev => [...prev, newLink]);
    addLog('success', `Conectado ${srcNode.name} [${selectedSrcPort}] ➔ ${dstNode.name} [${selectedDstPort}] (${selectedConnectionMedium})`);
    setPendingConnection(null);
    setCableMode(false);
    setCableSource(null);
  };

  const handleMouseDownConfigHeader = (e) => {
    setIsDraggingConfig(true);
    setConfigDragOffset({
      x: e.clientX - configPos.x,
      y: e.clientY - configPos.y
    });
  };

  const handleApplyGlobalLanSubnet = (newPrefix) => {
    const cleanPrefix = newPrefix.trim().replace(/\.$/, '');
    setLanSubnetPrefix(cleanPrefix);
    
    setNodes(prev => prev.map(node => {
      if (!node.ip || node.ip === 'N/A' || node.ip === '0.0.0.0') return node;
      const parts = node.ip.split('.');
      if (parts.length === 4) {
        const lastOctet = parts[3];
        const newIp = `${cleanPrefix}.${lastOctet}`;
        const newGateway = `${cleanPrefix}.1`;
        return { ...node, ip: newIp, gateway: node.type === 'ROUTER' ? '0.0.0.0' : newGateway };
      }
      return node;
    }));

    addLog('success', `Subred global ajustada a ${cleanPrefix}.X`);
    setShowLanConfigModal(false);
  };

  const handleExportProjectJSON = () => {
    const projectData = { version: '2.0', lanSubnetPrefix, nodes, links };
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Topologia_Red_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addLog('success', 'Proyecto exportado en JSON.');
  };

  const handleImportProjectJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.nodes && data.links) {
          setNodes(data.nodes);
          setLinks(data.links);
          if (data.lanSubnetPrefix) setLanSubnetPrefix(data.lanSubnetPrefix);
          addLog('success', `Proyecto "${file.name}" cargado.`);
        }
      } catch (err) {
        addLog('error', 'Error al leer el archivo de topología JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handlePrintPDF = () => {
    try {
      addLog('info', 'Preparando vista PDF... Selecciona "Guardar como PDF" en el cuadro de diálogo.');
      setTimeout(() => {
        window.print();
      }, 500);
    } catch (err) {
      addLog('error', 'Tu navegador bloqueó la ventana de impresión. Presiona Ctrl+P (o Cmd+P) para exportarlo manualmente.');
    }
  };

  const handleAddDevice = (typeKey) => {
    const devDef = DEVICE_TYPES[typeKey];
    const id = `node-${Date.now()}`;
    const isPeripheral = typeKey.includes('KEYBOARD') || typeKey.includes('MOUSE') || typeKey.startsWith('MONITOR_');
    const prefix = getDevicePrefix(typeKey);

    const count = nodes.filter(n => n.name.startsWith(prefix)).length + 1;
    const name = `${prefix}${String(count).padStart(2, '0')}`;

    const newNode = {
      id,
      name,
      type: typeKey,
      x: 120 + (nodes.length * 20) % 350,
      y: 100 + (nodes.length * 20) % 250,
      ip: isPeripheral ? '' : (devDef.defaultIp !== 'N/A' ? devDef.defaultIp : `${lanSubnetPrefix}.${15 + nodes.length * 2}`),
      mask: isPeripheral ? '' : '255.255.255.0',
      gateway: isPeripheral ? '' : (typeKey === 'ROUTER' ? '0.0.0.0' : `${lanSubnetPrefix}.1`),
      dns: isPeripheral ? '' : '8.8.8.8',
      os: devDef.defaultOs || 'Android 13',
      vlans: typeKey === 'MERAKI_SWITCH_48' || typeKey === 'ROUTER' ? [{ id: 1, name: 'Default', ports: [] }] : [],
      portVlans: {}
    };
    setNodes(prev => [...prev, newNode]);
    setActiveMenuNodeId(id);
    setSelectedNodeIds([id]);
    addLog('info', `Añadido ${newNode.name} a la red.`);
  };

  const handleDeleteNode = (id) => {
    setNodes(prev => prev.filter(n => n.id !== id && !selectedNodeIds.includes(n.id)));
    setLinks(prev => prev.filter(l => l.from !== id && l.to !== id && !selectedNodeIds.includes(l.from) && !selectedNodeIds.includes(l.to)));
    if (selectedNodeId === id) setSelectedNodeId(null);
    if (activeMenuNodeId === id) setActiveMenuNodeId(null);
    setSelectedNodeIds([]);
    addLog('warning', `Equipos eliminados de la red.`);
  };

  const getDeviceIconColor = (type) => {
    if (type.startsWith('PINPAD')) return 'text-rose-400';
    if (type.startsWith('HP_T')) return 'text-emerald-400';
    if (type.startsWith('MERAKI') || type === 'ROUTER') return 'text-cyan-400';
    if (type.startsWith('MONITOR')) return 'text-purple-400';
    return 'text-sky-400';
  };

  const getPortConnectionInfo = (nodeId, portName) => {
    const link = links.find(l => (l.from === nodeId && l.fromPort === portName) || (l.to === nodeId && l.toPort === portName));
    if (!link) return null;

    const remoteNodeId = link.from === nodeId ? link.to : link.from;
    const remotePort = link.from === nodeId ? link.toPort : link.fromPort;
    const remoteNode = nodes.find(n => n.id === remoteNodeId);

    return {
      linkId: link.id,
      remoteNodeName: remoteNode ? remoteNode.name : 'Desconocido',
      remotePort,
      medium: link.medium
    };
  };

  return (
    <div 
      className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden select-none"
      onMouseMove={handleDirectMouseMove}
      onMouseUp={handleMouseUp}
    >
      <style>{`
        @media print {
          @page { size: landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: #020617 !important; }
          aside, header, footer, .no-print { display: none !important; }
          main { height: 100vh !important; width: 100vw !important; position: absolute !important; top: 0 !important; left: 0 !important; }
          .bg-slate-900\\/70, .bg-slate-900\\/90 { background-color: #0f172a !important; border-color: #334155 !important; }
        }
      `}</style>

      {/* BARRA LATERAL */}
      <aside className={`transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-14'} bg-slate-900 border-r border-slate-800 flex flex-col z-20 shrink-0 no-print`}>
        <div className="p-3 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-xs tracking-wider uppercase text-slate-200">Equipos de Red</span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {CATEGORIES.map(category => {
            const isCollapsed = collapsedCategories[category];
            const devicesInCat = Object.entries(DEVICE_TYPES).filter(([_, dev]) => dev.category === category);
            const CategoryIcon = CATEGORY_ICONS[category] || Network;

            if (!sidebarOpen) {
              return (
                <div key={category} className="flex flex-col items-center py-1">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    title={category}
                    className="p-2 rounded-xl bg-slate-950/80 hover:bg-cyan-950/50 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 transition-all cursor-pointer group flex items-center justify-center"
                  >
                    <CategoryIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              );
            }

            return (
              <div key={category} className="border border-slate-800/80 rounded-xl bg-slate-950/40 overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full px-2.5 py-2 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <CategoryIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-[11px] font-bold text-cyan-400 tracking-wide uppercase truncate max-w-[170px]">
                      {category}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${isCollapsed ? '-rotate-90' : ''}`} />
                </button>

                {!isCollapsed && (
                  <div className="p-1.5 space-y-1 bg-slate-900/60 border-t border-slate-800/50">
                    {devicesInCat.map(([typeKey, dev]) => {
                      const IconComponent = dev.icon;
                      return (
                        <button
                          key={typeKey}
                          onClick={() => handleAddDevice(typeKey)}
                          className="w-full flex items-center space-x-2 p-2 rounded-lg bg-slate-950/80 hover:bg-cyan-950/40 border border-slate-800/60 hover:border-cyan-500/40 transition-all text-left cursor-pointer group"
                        >
                          <div className={`p-1.5 rounded-lg bg-slate-900 group-hover:scale-105 transition-transform ${getDeviceIconColor(typeKey)}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 truncate">
                              {dev.label}
                            </div>
                            <div className="text-[9px] font-mono text-slate-500 truncate">
                              {getDevicePrefix(typeKey)}xx
                            </div>
                          </div>
                          <Plus className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
        <header className="h-12 bg-slate-900/90 border-b border-slate-800 px-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center space-x-3">
            <h1 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Simulador de Red & Topología</span>
            </h1>

            <button
              onClick={() => setShowLanConfigModal(true)}
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-cyan-400 cursor-pointer transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAN: {lanSubnetPrefix}.X</span>
            </button>

            <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase px-1.5">Protocolo:</label>
              <select
                value={selectedProtocol}
                onChange={(e) => setSelectedProtocol(e.target.value)}
                className="bg-slate-900 text-xs font-bold text-cyan-400 border border-slate-800 rounded-lg px-2 py-0.5 focus:outline-none cursor-pointer"
              >
                {Object.values(SIMULATION_PROTOCOLS).map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportProjectJSON}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center space-x-1 cursor-pointer"
              title="Guardar JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Guardar</span>
            </button>

            <label className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center space-x-1 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Abrir</span>
              <input type="file" accept=".json" onChange={handleImportProjectJSON} className="hidden" />
            </label>

            <button
              onClick={handlePrintPDF}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs flex items-center space-x-1 cursor-pointer no-print"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">PDF</span>
            </button>

            <button
              onClick={() => {
                setCableMode(!cableMode);
                setCableSource(null);
                setPingMode(false);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                cableMode ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Cable className="w-3.5 h-3.5" />
              <span>{cableMode ? 'Conectando...' : 'Cablear Equipos'}</span>
            </button>

            <button
              onClick={() => {
                setPingMode(!pingMode);
                setPingSource(null);
                setCableMode(false);
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                pingMode ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{pingMode ? 'Selecciona Origen...' : 'Enviar Paquete'}</span>
            </button>
          </div>
        </header>

        {/* MODAL CONFIGURACIÓN GLOBAL DE LAN SUBRED */}
        {showLanConfigModal && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200">Configuración Global de LAN</span>
                </div>
                <button onClick={() => setShowLanConfigModal(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-400 text-[11px]">
                  Introduce los primeros 3 octetos de tu subred (ej: <code className="text-cyan-400">192.168.10</code>). Esto actualizará automáticamente las IPs de todos los equipos conservando el último octeto.
                </p>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Prefijo Subred</label>
                  <input
                    type="text"
                    value={lanSubnetPrefix}
                    onChange={(e) => setLanSubnetPrefix(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-cyan-400 font-mono font-bold focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={() => handleApplyGlobalLanSubnet(lanSubnetPrefix)}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Actualizar Subred Global
              </button>
            </div>
          </div>
        )}

        {/* MODAL CONEXIÓN DE PUERTOS */}
        {pendingConnection && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <Cable className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-slate-200">Establecer Enlace Físico</span>
                </div>
                <button onClick={() => setPendingConnection(null)} className="text-slate-400 hover:text-slate-200 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Puerto en {pendingConnection.srcNode.name}:
                  </label>
                  <select
                    value={selectedSrcPort}
                    onChange={(e) => setSelectedSrcPort(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none font-mono"
                  >
                    {(DEVICE_TYPES[pendingConnection.srcNode.type]?.ports || ['eth0']).map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Puerto en {pendingConnection.dstNode.name}:
                  </label>
                  <select
                    value={selectedDstPort}
                    onChange={(e) => setSelectedDstPort(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none font-mono"
                  >
                    {(DEVICE_TYPES[pendingConnection.dstNode.type]?.ports || ['eth0']).map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                    Medio / Cable de Transmisión:
                  </label>
                  <select
                    value={selectedConnectionMedium}
                    onChange={(e) => setSelectedConnectionMedium(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-cyan-400 font-bold focus:outline-none"
                  >
                    {Object.values(CONNECTION_TYPES).map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleConfirmConnection}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                Conectar Puertos
              </button>
            </div>
          </div>
        )}

        {/* PROPIEDADES FLOTANTES DEL NODO SELECCIONADO */}
        {selectedNode && (
          <div
            style={{ left: `${configPos.x}px`, top: `${configPos.y}px` }}
            className="fixed z-40 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md"
          >
            <div
              onMouseDown={handleMouseDownConfigHeader}
              className="p-3 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between cursor-move select-none"
            >
              <div className="flex items-center space-x-2 truncate">
                <Settings className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200 truncate">
                  Configuración: {selectedNode.name}
                </span>
              </div>
              <button
                onClick={() => setSelectedNodeId(null)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex border-b border-slate-800 bg-slate-950/60">
              <button
                onClick={() => setActiveConfigTab('general')}
                className={`flex-1 py-1.5 text-[11px] font-bold transition-colors cursor-pointer ${
                  activeConfigTab === 'general' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-900' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                General & IP
              </button>
              <button
                onClick={() => setActiveConfigTab('ports')}
                className={`flex-1 py-1.5 text-[11px] font-bold transition-colors cursor-pointer ${
                  activeConfigTab === 'ports' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-900' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Puertos
              </button>
              {(selectedNode.type === 'MERAKI_SWITCH_48' || selectedNode.type === 'ROUTER') && (
                <button
                  onClick={() => setActiveConfigTab('vlans')}
                  className={`flex-1 py-1.5 text-[11px] font-bold transition-colors cursor-pointer ${
                    activeConfigTab === 'vlans' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-slate-900' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  VLANs (802.1Q)
                </button>
              )}
            </div>

            <div className="p-3 max-h-96 overflow-y-auto space-y-3 text-xs">
              {activeConfigTab === 'general' && (
                <>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nombre Host</label>
                    <input
                      type="text"
                      value={selectedNode.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, name: val } : n));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Sistema Operativo</label>
                    <select
                      value={selectedNode.os}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, os: val } : n));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none"
                    >
                      {OS_OPTIONS.map(os => (
                        <option key={os} value={os}>{os}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Dirección IPv4</label>
                    <input
                      type="text"
                      value={selectedNode.ip}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, ip: val } : n));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-cyan-400 font-mono font-bold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Máscara Subred</label>
                    <input
                      type="text"
                      value={selectedNode.mask}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, mask: val } : n));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Gateway Por Defecto</label>
                    <input
                      type="text"
                      value={selectedNode.gateway}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, gateway: val } : n));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 font-mono focus:outline-none"
                    />
                  </div>
                </>
              )}

              {activeConfigTab === 'ports' && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block border-b border-slate-800 pb-1">
                    Estado e Interconexión de Puertos
                  </span>
                  {(DEVICE_TYPES[selectedNode.type]?.ports || []).map(portName => {
                    const connInfo = getPortConnectionInfo(selectedNode.id, portName);
                    return (
                      <div key={portName} className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-mono text-cyan-400 font-bold text-[11px]">{portName}</div>
                          {connInfo ? (
                            <div className="text-[10px] text-slate-300">
                              ➔ {connInfo.remoteNodeName} [{connInfo.remotePort}] ({connInfo.medium})
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500 italic">Desconectado</div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1.5 mx-2">
                          <label className="text-[9px] font-bold text-slate-500 uppercase">VLAN</label>
                          {selectedNode.vlans && selectedNode.vlans.length > 0 ? (
                            <select
                              value={(selectedNode.portVlans && selectedNode.portVlans[portName]) || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNodes(prev => prev.map(n => {
                                  if (n.id === selectedNode.id) {
                                    return {
                                      ...n,
                                      portVlans: { ...(n.portVlans || {}), [portName]: val }
                                    };
                                  }
                                  return n;
                                }));
                              }}
                              className="w-20 bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-[10px] text-cyan-400 font-mono focus:outline-none cursor-pointer truncate"
                            >
                              <option value="">--</option>
                              {selectedNode.vlans.map(vlan => (
                                <option key={vlan.id} value={vlan.id}>{vlan.id} - {vlan.name}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="number"
                              min="1"
                              max="4094"
                              placeholder="1"
                              value={(selectedNode.portVlans && selectedNode.portVlans[portName]) || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNodes(prev => prev.map(n => {
                                  if (n.id === selectedNode.id) {
                                    return {
                                      ...n,
                                      portVlans: { ...(n.portVlans || {}), [portName]: val }
                                    };
                                  }
                                  return n;
                                }));
                              }}
                              className="w-12 bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-[10px] text-cyan-400 font-mono text-center focus:outline-none"
                            />
                          )}
                        </div>

                        {connInfo && (
                          <button
                            onClick={() => setLinks(prev => prev.filter(l => l.id !== connInfo.linkId))}
                            className="p-1 hover:bg-rose-500/20 text-rose-400 rounded cursor-pointer transition-colors shrink-0"
                            title="Desconectar"
                          >
                            <Unlink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {activeConfigTab === 'vlans' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">VLANs Registradas</span>
                    <button
                      onClick={() => setShowVlanForm(!showVlanForm)}
                      className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded text-[10px] font-bold hover:bg-cyan-500/30 cursor-pointer"
                    >
                      {showVlanForm ? 'Cancelar' : '+ Nueva VLAN'}
                    </button>
                  </div>
                  {showVlanForm && (
                    <div className="flex items-center space-x-2 bg-slate-950/50 p-2 rounded-lg border border-slate-800">
                      <input
                        type="number"
                        placeholder="ID"
                        value={newVlanId}
                        onChange={(e) => setNewVlanId(e.target.value)}
                        className="w-14 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-cyan-400 font-mono focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Nombre VLAN"
                        value={newVlanName}
                        onChange={(e) => setNewVlanName(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-[10px] text-slate-200 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (!newVlanId) return;
                          const vName = newVlanName || `VLAN_${newVlanId}`;
                          setNodes(prev => prev.map(n => {
                            if (n.id === selectedNode.id) {
                              const newVlans = [...(n.vlans || []), { id: parseInt(newVlanId), name: vName, ports: [] }];
                              return { ...n, vlans: newVlans };
                            }
                            return n;
                          }));
                          setShowVlanForm(false);
                          setNewVlanId('');
                          setNewVlanName('');
                        }}
                        className="px-2 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40 rounded text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        ✓
                      </button>
                    </div>
                  )}
                  {(selectedNode.vlans || []).map(vlan => (
                    <div key={vlan.id} className="p-2 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="font-bold text-cyan-400 text-xs">VLAN {vlan.id}: </span>
                        <span className="text-slate-200 text-xs">{vlan.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setNodes(prev => prev.map(n => {
                            if (n.id === selectedNode.id) {
                              return { ...n, vlans: n.vlans.filter(v => v.id !== vlan.id) };
                            }
                            return n;
                          }));
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* LIENZO ÚNICO DE DIBUJO CON ZOOM & PAN */}
        <div 
          ref={canvasRef}
          onClick={handleCanvasClick}
          onWheel={handleCanvasWheel}
          onMouseDown={handleMouseDownCanvas}
          className={`flex-1 relative overflow-hidden bg-slate-950/60 ${isPanningCanvas ? 'cursor-grab active:cursor-grabbing' : isSelectingRef.current ? 'cursor-crosshair' : ''}`}
        >
          {/* HERRAMIENTAS FLOTANTES DE ALINEACIÓN */}
          {selectedNodeIds.length > 1 && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-30 bg-slate-900/90 border border-slate-700 rounded-xl p-1.5 shadow-2xl backdrop-blur-md flex items-center space-x-1 animate-in slide-in-from-top-4">
              <span className="text-[10px] font-bold text-cyan-400 px-2 uppercase border-r border-slate-700 mr-1 flex items-center">
                <Layers className="w-3 h-3 mr-1" /> {selectedNodeIds.length} Nodos
              </span>
              <button onClick={() => handleAlignNodes('left')} className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors" title="Alinear a la Izquierda">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="4" x2="4" y2="20"/><line x1="8" y1="8" x2="20" y2="8"/><line x1="8" y1="16" x2="16" y2="16"/></svg>
              </button>
              <button onClick={() => handleAlignNodes('center')} className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors" title="Alinear al Centro (X)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="8" y1="16" x2="16" y2="16"/></svg>
              </button>
              <button onClick={() => handleAlignNodes('top')} className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors" title="Alinear Arriba">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="4" x2="20" y2="4"/><line x1="8" y1="8" x2="8" y2="20"/><line x1="16" y1="8" x2="16" y2="16"/></svg>
              </button>
              <button onClick={() => handleAlignNodes('middle')} className="p-1.5 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors border-r border-slate-700 pr-2 mr-1" title="Alinear al Medio (Y)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="8" y1="6" x2="8" y2="18"/><line x1="16" y1="8" x2="16" y2="16"/></svg>
              </button>
              <button onClick={() => handleAlignNodes('dist-x')} className="p-1.5 text-slate-300 hover:text-purple-400 hover:bg-slate-800 rounded transition-colors" title="Distribuir Horizontalmente">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="4" height="12" rx="1"/><rect x="16" y="6" width="4" height="12" rx="1"/><line x1="12" y1="8" x2="12" y2="16"/></svg>
              </button>
              <button onClick={() => handleAlignNodes('dist-y')} className="p-1.5 text-slate-300 hover:text-purple-400 hover:bg-slate-800 rounded transition-colors" title="Distribuir Verticalmente">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="12" height="4" rx="1"/><rect x="6" y="16" width="12" height="4" rx="1"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
              </button>
              <button onClick={() => handleDeleteNode(selectedNodeIds[0])} className="p-1.5 text-rose-400 hover:bg-rose-500/20 rounded transition-colors ml-2" title="Eliminar Nodos">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* CONTROLES DE ZOOM */}
          <div className="absolute top-3 right-3 z-30 bg-slate-900/90 border border-slate-800 rounded-xl p-1 flex items-center space-x-1 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setZoomScale(prev => Math.min(2.0, prev + 0.15))}
              className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              title="Acercar (+)"
            >
              <Plus className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono font-bold text-cyan-400 px-2 select-none">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale(prev => Math.max(0.3, prev - 0.15))}
              className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              title="Alejar (-)"
            >
              <div className="w-3.5 h-0.5 bg-current rounded-full" />
            </button>
            <button
              onClick={() => { setZoomScale(1); setPanOffset({ x: 0, y: 0 }); }}
              className="px-2 py-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border border-slate-800"
              title="Restablecer vista"
            >
              Reset
            </button>
          </div>

          <div 
            style={{ 
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})`,
              transformOrigin: '0 0'
            }}
            className="w-full h-full relative transition-transform duration-75 ease-out"
          >
            {/* LÍNEAS DE CONEXIÓN ORTOGONALES */}
            <svg className="absolute inset-0 pointer-events-none z-0" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {links.map((link, linkIndex) => {
                const fromNode = nodes.find(n => n.id === link.from);
                const toNode = nodes.find(n => n.id === link.to);
                if (!fromNode || !toNode) return null;

                const mediumCfg = CONNECTION_TYPES[link.medium] || CONNECTION_TYPES.ETHERNET;
                
                const nodeWidth = 72;
                const nodeHeight = 56;
                const x1 = fromNode.x + nodeWidth / 2;
                const y1 = fromNode.y + nodeHeight / 2;
                const x2 = toNode.x + nodeWidth / 2;
                const y2 = toNode.y + nodeHeight / 2;

                const dx = x2 - x1;
                const dy = y2 - y1;
                const angle = Math.atan2(dy, dx);
                
                const startX = x1 + Math.cos(angle) * (nodeWidth / 2 + 4);
                const startY = y1 + Math.sin(angle) * (nodeHeight / 2 + 4);
                const endX = x2 - Math.cos(angle) * (nodeWidth / 2 + 4);
                const endY = y2 - Math.sin(angle) * (nodeHeight / 2 + 4);

                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;
                
                // Enrutamiento ortogonal cuadrado para evitar pasar por debajo de objetos
                const pathData = Math.abs(dx) > Math.abs(dy)
                  ? `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`
                  : `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
                  
                const isSelectedLink = selectedLinkId === link.id;

                return (
                  <g key={link.id} className="pointer-events-auto cursor-pointer" onClick={(e) => { e.stopPropagation(); setSelectedLinkId(isSelectedLink ? null : link.id); }}>
                    <path d={pathData} fill="none" stroke="transparent" strokeWidth="18" />
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelectedLink ? '#38bdf8' : mediumCfg.color}
                      strokeWidth={isSelectedLink ? "4" : mediumCfg.width}
                      strokeDasharray={mediumCfg.dash}
                      strokeOpacity={isSelectedLink ? "1" : "0.85"}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {/* ETIQUETA VISIBLE SOLO AL SELECCIONAR EL CABLE */}
                    {isSelectedLink && (
                      <g transform={`translate(${midX}, ${midY})`}>
                        <rect x="-42" y="-10" width="84" height="20" rx="4" fill="#020617" stroke={mediumCfg.color} strokeWidth="1.5" />
                        <text x="0" y="4" fill="#e2e8f0" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle" className="select-none pointer-events-none">
                          {link.fromPort.split(' ')[0]} ➔ {link.toPort.split(' ')[0]}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {animatingPacket && (
                <g>
                  <circle cx={animatingPacket.startX} cy={animatingPacket.startY} r="7" fill={animatingPacket.color} className="animate-ping" />
                  <circle cx={animatingPacket.startX} cy={animatingPacket.startY} r="6" fill={animatingPacket.color} />
                  <text x={animatingPacket.startX} y={animatingPacket.startY - 10} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" className="drop-shadow-md">
                    {animatingPacket.label}
                  </text>
                </g>
              )}

              {selectionBox && (
                <rect
                  x={Math.min(selectionBox.startX, selectionBox.endX)}
                  y={Math.min(selectionBox.startY, selectionBox.endY)}
                  width={Math.abs(selectionBox.endX - selectionBox.startX)}
                  height={Math.abs(selectionBox.endY - selectionBox.startY)}
                  fill="rgba(56, 189, 248, 0.15)"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  className="pointer-events-none"
                />
              )}
            </svg>

            {/* NODOS DOM */}
            {nodes.map(node => {
              const devDef = DEVICE_TYPES[node.type];
              const IconComp = devDef.icon;
              const isSelected = selectedNodeIds.includes(node.id);
              const isConfigActive = selectedNodeId === node.id;
              const hasMenu = activeMenuNodeId === node.id && selectedNodeIds.length <= 1;
              const isCableSrc = cableSource?.id === node.id;
              const isPingSrc = pingSource?.id === node.id;

              return (
                <div key={node.id} className="relative">
                  <div
                    ref={el => nodeElementsRef.current[node.id] = el}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    onMouseDown={(e) => handleMouseDownNode(e, node)}
                    className={`absolute z-10 w-[72px] h-[56px] rounded-xl flex flex-col items-center justify-center p-1 cursor-grab active:cursor-grabbing transition-shadow ${
                      isSelected || isConfigActive
                        ? 'bg-slate-900/90 border-2 border-cyan-400 shadow-lg shadow-cyan-500/30 backdrop-blur-sm ring-2 ring-cyan-500/20' 
                        : hasMenu
                        ? 'bg-slate-900/90 border-2 border-amber-400 shadow-lg shadow-amber-500/20 backdrop-blur-sm'
                        : isCableSrc || isPingSrc
                        ? 'bg-slate-900/90 border-2 border-emerald-400 animate-pulse backdrop-blur-sm'
                        : 'bg-slate-900/70 hover:bg-slate-900/90 border border-slate-800/80 backdrop-blur-xs'
                    }`}
                  >
                    <div className={`mb-0.5 ${getDeviceIconColor(node.type)}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-200 text-center px-0.5 leading-tight truncate w-full">
                      {node.name}
                    </span>

                    {hasMenu && (
                      <div 
                        onMouseDown={(e) => e.stopPropagation()} 
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-30 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-1 flex items-center space-x-1 animate-in fade-in zoom-in-95 duration-150"
                      >
                        <button
                          onClick={() => {
                            setSelectedNodeId(node.id);
                            setActiveMenuNodeId(null);
                          }}
                          className="flex items-center space-x-1 px-2 py-0.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded text-[9px] font-bold cursor-pointer transition-colors whitespace-nowrap"
                        >
                          <Settings className="w-3 h-3 text-cyan-400" />
                          <span>Propiedades</span>
                        </button>
                        <button
                          onClick={() => handleDeleteNode(node.id)}
                          className="p-1 hover:bg-rose-500/20 text-rose-400 rounded cursor-pointer transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONSOLA WIRESHARK / LOGS */}
        <footer className="h-36 bg-slate-900 border-t border-slate-800 flex flex-col z-10 shrink-0">
          <div className="h-7 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                Inspector Wireshark & Logs
              </span>
            </div>
            {capturedPacket && (
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                Trama #{capturedPacket.frameNo} capturada | {capturedPacket.protocol} ({capturedPacket.srcIp} ➔ {capturedPacket.dstIp})
              </span>
            )}
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 p-2 font-mono text-[11px] overflow-y-auto space-y-1 bg-slate-950/90">
              {logs.map(log => (
                <div key={log.id} className="flex items-start space-x-2">
                  <span className="text-slate-500 text-[10px] select-none">[{log.time}]</span>
                  <span className={
                    log.type === 'error' ? 'text-rose-400 font-semibold' :
                    log.type === 'success' ? 'text-emerald-400 font-semibold' :
                    log.type === 'warning' ? 'text-amber-400 font-semibold' :
                    'text-slate-300'
                  }>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>

            {capturedPacket && (
              <div className="w-72 bg-slate-900 border-l border-slate-800 p-2 text-[10px] font-mono space-y-1 overflow-y-auto">
                <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                  Capa 2: Ethernet II ({capturedPacket.srcMac} ➔ {capturedPacket.dstMac})
                </div>
                <div className="text-emerald-400 font-bold border-b border-slate-800 pb-1">
                  Capa 3: IPv4 ({capturedPacket.srcIp} ➔ {capturedPacket.dstIp}, TTL={capturedPacket.ttl})
                </div>
                <div className="text-purple-400 font-bold">
                  Capa 4/7: {capturedPacket.protocol} (Puerto {capturedPacket.port})
                </div>
                <div className="text-slate-400 pt-1 border-t border-slate-800">
                  <div>IDA: {capturedPacket.reqDetail}</div>
                  <div>VUELTA: {capturedPacket.resDetail}</div>
                </div>
              </div>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}
