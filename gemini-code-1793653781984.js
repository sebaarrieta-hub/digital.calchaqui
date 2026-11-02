import React, { useState } from 'react';
import { Wrench, ShoppingCart, Package, Plus, Search, CheckCircle, AlertTriangle, Send } from 'lucide-react';

export default function DigitalCalchaquiTallerApp() {
  const [activeTab, setActiveTab] = useState('equipos');

  // Estado para Equipos en Taller
  const [equipos, setEquipos] = useState([
    { id: 1, cliente: 'Juan Pérez', equipo: 'Notebook Lenovo', falla: 'No enciende / Cargador', estado: 'En Revisión', fecha: '02/11/2026' },
    { id: 2, cliente: 'María Gómez', equipo: 'PC Escritorio', falla: 'Mantenimiento y limpieza', estado: 'Listo', fecha: '01/11/2026' }
  ]);
  const [nuevoEquipo, setNuevoEquipo] = useState({ cliente: '', equipo: '', falla: '' });

  // Estado para Stock / Inventario
  const [stock, setStock] = useState([
    { id: 1, codigo: 'ACC01', producto: 'Cable HDMI 1.8m', stock: 15, precio: 4500 },
    { id: 2, codigo: 'ACC02', producto: 'Pasta Térmica MX-4', stock: 4, precio: 8900 },
    { id: 3, codigo: 'REP01', producto: 'SSD 240GB Kingston', stock: 7, precio: 32000 },
  ]);
  const [nuevoProducto, setNuevoProducto] = useState({ codigo: '', producto: '', stock: '', precio: '' });

  // Estado para POS (Punto de Venta)
  const [carrito, setCarrito] = useState([]);
  const [busquedaPOS, setBusquedaPOS] = useState('');

  // Funciones de Equipos
  const agregarEquipo = (e) => {
    e.preventDefault();
    if (!nuevoEquipo.cliente || !nuevoEquipo.equipo) return;
    setEquipos([...equipos, {
      id: Date.now(),
      ...nuevoEquipo,
      estado: 'Ingresado',
      fecha: new Date().toLocaleDateString()
    }]);
    setNuevoEquipo({ cliente: '', equipo: '', falla: '' });
  };

  // Funciones de Stock
  const agregarStock = (e) => {
    e.preventDefault();
    if (!nuevoProducto.producto || !nuevoProducto.precio) return;
    setStock([...stock, {
      id: Date.now(),
      codigo: nuevoProducto.codigo || 'PROD-' + Math.floor(Math.random() * 1000),
      producto: nuevoProducto.producto,
      stock: parseInt(nuevoProducto.stock) || 0,
      precio: parseFloat(nuevoProducto.precio) || 0
    }]);
    setNuevoProducto({ codigo: '', producto: '', stock: '', precio: '' });
  };

  // Funciones POS
  const agregarAlCarrito = (producto) => {
    const itemExistente = carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex flex-col sm:flex-row items-center justify-between gap-4 py-3 sm:py-0">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/30">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Digital Calchaquí</h1>
              <p className="text-xs text-blue-400 font-medium">Gestión de Taller y Mostrador - Bv. Belgrano 97</p>
            </div>
          </div>

          {/* Navegación por Módulos */}
          <nav className="flex space-x-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('equipos')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'equipos' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Wrench className="w-4 h-4" />
              <span>Equipos</span>
            </button>
            <button
              onClick={() => setActiveTab('pos')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'pos' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Venta (POS)</span>
            </button>
            <button
              onClick={() => setActiveTab('stock')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === 'stock' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Package className="w-4 h-4" />
              <span>Stock</span>
            </button>
          </nav>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* MÓDULO 1: INGRESO DE EQUIPOS */}
        {activeTab === 'equipos' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Ingreso y Estado de Equipos</h2>
                <p className="text-slate-400 text-sm">Registrá los equipos que ingresan a servicio técnico y actualizá sus estados.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulario */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl h-fit">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Plus className="w-5 h-5 text-blue-400" />
                  <span>Nuevo Ingreso</span>
                </h3>
                <form onSubmit={agregarEquipo} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Cliente</label>
                    <input
                      type="text"
                      required
                      value={nuevoEquipo.cliente}
                      onChange={(e) => setNuevoEquipo({...nuevoEquipo, cliente: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="Nombre y Apellido"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Equipo / Modelo</label>
                    <input
                      type="text"
                      required
                      value={nuevoEquipo.equipo}
                      onChange={(e) => setNuevoEquipo({...nuevoEquipo, equipo: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="Ej: Notebook HP 14"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Falla Reportada</label>
                    <textarea
                      rows="3"
                      value={nuevoEquipo.falla}
                      onChange={(e) => setNuevoEquipo({...nuevoEquipo, falla: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="Descripción del problema..."
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm">
                    Registrar Ingreso
                  </button>
                </form>
              </div>

              {/* Tabla de Equipos */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="text-lg font-semibold text-white">Equipos en Taller ({equipos.length})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/50 text-slate-400 text-xs uppercase tracking-wider">
                        <th className="p-4">Fecha</th>
                        <th className="p-4">Cliente</th>
                        <th className="p-4">Equipo</th>
                        <th className="p-4">Falla</th>
                        <th className="p-4">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-sm">
                      {equipos.map((eq) => (
                        <tr key={eq.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 text-slate-400 whitespace-nowrap">{eq.fecha}</td>
                          <td className="p-4 font-medium text-white">{eq.cliente}</td>
                          <td className="p-4 text-slate-300">{eq.equipo}</td>
                          <td className="p-4 text-slate-400">{eq.falla}</td>
                          <td className="p-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${eq.estado === 'Listo' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                              {eq.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 2: PUNTO DE VENTA (POS) */}
        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Punto de Venta (Mostrador)</h2>
                <p className="text-slate-400 text-sm">Seleccioná los artículos para armar el ticket de venta rápida.</p>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar producto por nombre o código..."
                  value={busquedaPOS}
                  onChange={(e) => setBusquedaPOS(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stock.filter(p => p.producto.toLowerCase().includes(busquedaPOS.toLowerCase())).map((item) => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex justify-between items-center hover:border-blue-500/50 transition-all">
                    <div>
                      <span className="text-xs text-blue-400 font-mono">{item.codigo}</span>
                      <h4 className="text-white font-medium">{item.producto}</h4>
                      <p className="text-slate-300 font-semibold text-sm mt-1">${item.precio.toLocaleString()}</p>
                      <span className="text-xs text-slate-500">Stock: {item.stock} un.</span>
                    </div>
                    <button
                      onClick={() => agregarAlCarrito(item)}
                      className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all shadow-md shadow-blue-600/20"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticket / Carrito */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between h-[520px]">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-blue-400" />
                  <span>Ticket Actual</span>
                </h3>
                <div className="divide-y divide-slate-800 overflow-y-auto max-h-[300px] space-y-3">
                  {carrito.length === 0 ? (
                    <p className="text-slate-500 text-center py-12 text-sm">El carrito está vacío</p>
                  ) : (
                    carrito.map((item, idx) => (
                      <div key={idx} className="pt-3 flex justify-between items-center text-sm">
                        <div>
                          <p className="text-white font-medium">{item.producto}</p>
                          <p className="text-xs text-slate-400">{item.cantidad} x ${item.precio.toLocaleString()}</p>
                        </div>
                        <span className="font-semibold text-white">${(item.cantidad * item.precio).toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-slate-300">Total:</span>
                  <span className="text-2xl font-extrabold text-white">${totalCarrito.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => { alert('¡Venta registrada con éxito!'); setCarrito([]); }}
                  disabled={carrito.length === 0}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20 text-sm"
                >
                  Cobrar y Finalizar Venta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MÓDULO 3: CONTROL DE STOCK */}
        {activeTab === 'stock' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Inventario y Control de Stock</h2>
                <p className="text-slate-400 text-sm">Administrá los repuestos, accesorios y mercadería disponible en el local.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulario Producto */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl h-fit">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-400" />
                  <span>Nuevo Producto</span>
                </h3>
                <form onSubmit={agregarStock} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Código</label>
                    <input
                      type="text"
                      value={nuevoProducto.codigo}
                      onChange={(e) => setNuevoProducto({...nuevoProducto, codigo: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="Ej: ACC04"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Descripción</label>
                    <input
                      type="text"
                      required
                      value={nuevoProducto.producto}
                      onChange={(e) => setNuevoProducto({...nuevoProducto, producto: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                      placeholder="Ej: Cargador Universal"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Stock</label>
                      <input
                        type="number"
                        required
                        value={nuevoProducto.stock}
                        onChange={(e) => setNuevoProducto({...nuevoProducto, stock: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Precio ($)</label>
                      <input
                        type="number"
                        required
                        value={nuevoProducto.precio}
                        onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-sm focus:border-blue-500 focus:outline-none"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm">
                    Guardar Producto
                  </button>
                </form>