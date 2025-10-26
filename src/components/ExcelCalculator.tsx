import React, { useState, useEffect, useRef } from 'react';
import { ports, vessels, Port, Vessel } from '../data/mockData';

interface GangSchedule {
  dayType: string;
  shiftTime: string;
  numberOfGangs: number;
  costPerGang: number;
  totalCost: number;
}

interface VesselInfo {
  vesselName: string;
  tonnage: number;
  discharge: number;
  bcmeaRate: number;
  dockCost: number;
  bcmeaAssurance: number;
  underHolding: number;
  grandTotal: number;
}

const ExcelCalculator: React.FC = () => {

  const [gangSchedules, setGangSchedules] = useState<GangSchedule[]>([
    { dayType: 'Mon - Fri', shiftTime: '08:00', numberOfGangs: 5, costPerGang: 13500, totalCost: 67500 },
    { dayType: 'Mon - Fri', shiftTime: '16:30', numberOfGangs: 6, costPerGang: 15000, totalCost: 90000 },
    { dayType: 'Mon - Fri', shiftTime: '01:00', numberOfGangs: 0, costPerGang: 16500, totalCost: 0 },
    { dayType: 'Sat', shiftTime: '08:00', numberOfGangs: 3, costPerGang: 14000, totalCost: 42000 },
    { dayType: 'Sat', shiftTime: '16:30', numberOfGangs: 0, costPerGang: 16500, totalCost: 0 },
    { dayType: 'Sun', shiftTime: 'All Shifts', numberOfGangs: 7, costPerGang: 17500, totalCost: 122500 },
    { dayType: 'Holidays', shiftTime: 'All Shifts', numberOfGangs: 0, costPerGang: 18000, totalCost: 0 }
  ]);

  const [vesselInfo, setVesselInfo] = useState<VesselInfo>({
    vesselName: "Steel Carrier Alpha",
    tonnage: 20520,
    discharge: 5,
    bcmeaRate: 3.27,
    dockCost: 0.25,
    bcmeaAssurance: 0,
    underHolding: 0,
    grandTotal: 0
  });

  // State for dropdowns
  const [selectedPort, setSelectedPort] = useState<string>("");
  const [selectedVessel, setSelectedVessel] = useState<string>("");
  const [portSearchTerm, setPortSearchTerm] = useState<string>("");
  const [vesselSearchTerm, setVesselSearchTerm] = useState<string>("");
  const [showPortDropdown, setShowPortDropdown] = useState<boolean>(false);
  const [showVesselDropdown, setShowVesselDropdown] = useState<boolean>(false);

  // Refs for click outside detection
  const portDropdownRef = useRef<HTMLDivElement>(null);
  const vesselDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (portDropdownRef.current && !portDropdownRef.current.contains(event.target as Node)) {
        setShowPortDropdown(false);
      }
      if (vesselDropdownRef.current && !vesselDropdownRef.current.contains(event.target as Node)) {
        setShowVesselDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateGangSchedule = (index: number, field: keyof GangSchedule, value: string | number) => {
    const updated = [...gangSchedules];
    updated[index] = { ...updated[index], [field]: value };
    
    // Recalculate total cost
    if (field === 'numberOfGangs' || field === 'costPerGang') {
      updated[index].totalCost = updated[index].numberOfGangs * updated[index].costPerGang;
    }
    
    setGangSchedules(updated);
  };

  const updateVesselInfo = (field: keyof VesselInfo, value: number | string) => {
    setVesselInfo(prev => ({ ...prev, [field]: value }));
  };

  // Helper functions for dropdowns
  const filteredPorts = ports.filter(port => 
    port.name.toLowerCase().includes(portSearchTerm.toLowerCase())
  );

  const filteredVessels = vessels.filter(vessel => 
    vessel.name.toLowerCase().includes(vesselSearchTerm.toLowerCase())
  );

  const handlePortSelect = (port: Port) => {
    setSelectedPort(port.name);
    setPortSearchTerm(port.name);
    setShowPortDropdown(false);
    
    // Update gang schedule with port data
    const updatedSchedules = gangSchedules.map(schedule => ({
      ...schedule,
      numberOfGangs: port.gangs,
      costPerGang: port.costPerGang,
      totalCost: port.gangs * port.costPerGang
    }));
    setGangSchedules(updatedSchedules);
    
    // Update vessel info with port data
    setVesselInfo(prev => ({
      ...prev,
      discharge: port.dischargeDays,
      bcmeaRate: port.bcmeaRate,
      dockCost: port.dockCost
    }));
  };

  const handleVesselSelect = (vessel: Vessel) => {
    setSelectedVessel(vessel.name);
    setVesselSearchTerm(vessel.name);
    setShowVesselDropdown(false);
    
    // Update vessel info with selected vessel data
    setVesselInfo(prev => ({
      ...prev,
      vesselName: vessel.name,
      tonnage: vessel.tonnage
    }));
  };

  return (
    <div className="voyage-db-content">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Port Discharge Plan</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start gap-8">
            {/* Discharge Port Selection */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Discharge Port</h3>
              <div className="relative" ref={portDropdownRef}>
                <input
                  type="text"
                  value={portSearchTerm}
                  onChange={(e) => {
                    setPortSearchTerm(e.target.value);
                    setShowPortDropdown(true);
                  }}
                  onFocus={() => setShowPortDropdown(true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search discharge port..."
                />
                {showPortDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredPorts.map((port, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-base"
                        onClick={() => handlePortSelect(port)}
                      >
                        {port.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Vessel Selection */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Vessel Name</h3>
              <div className="relative" ref={vesselDropdownRef}>
                <input
                  type="text"
                  value={vesselSearchTerm}
                  onChange={(e) => {
                    setVesselSearchTerm(e.target.value);
                    setShowVesselDropdown(true);
                  }}
                  onFocus={() => setShowVesselDropdown(true)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search vessel..."
                />
                {showVesselDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredVessels.map((vessel, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-base"
                        onClick={() => handleVesselSelect(vessel)}
                      >
                        {vessel.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Tonnage Display */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tonnage (MT)</h3>
              <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{vesselInfo.tonnage.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gang Schedule Table */}
      <div className="mb-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold text-lg text-gray-800">Day Type</th>
                  <th className="text-left py-4 px-6 font-semibold text-lg text-gray-800">Shift Time</th>
                  <th className="text-center py-4 px-6 font-semibold text-lg text-gray-800"># of Gangs</th>
                  <th className="text-center py-4 px-6 font-semibold text-lg text-gray-800">Cost per Gang</th>
                  <th className="text-right py-4 px-6 font-semibold text-lg text-gray-800">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {gangSchedules.map((schedule, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-base text-gray-800">{schedule.dayType}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-base text-gray-700">{schedule.shiftTime}</div>
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        value={schedule.numberOfGangs}
                        onChange={(e) => updateGangSchedule(index, 'numberOfGangs', parseInt(e.target.value) || 0)}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center text-base font-medium bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        type="number"
                        value={schedule.costPerGang}
                        onChange={(e) => updateGangSchedule(index, 'costPerGang', parseInt(e.target.value) || 0)}
                        className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-center text-base font-medium bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="text-right py-4 px-6 font-semibold text-lg text-green-600">
                      ${schedule.totalCost.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Additional Vessel Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Additional Information</h3>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="text-base font-medium text-gray-700">Discharge Days</label>
              <input
                type="number"
                step="0.1"
                value={vesselInfo.discharge}
                onChange={(e) => updateVesselInfo('discharge', parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center text-base font-medium bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="text-base font-medium text-gray-700">BCMEA Rate</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.bcmeaRate}
                onChange={(e) => updateVesselInfo('bcmeaRate', parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center text-base font-medium bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="text-base font-medium text-gray-700">Dock Cost</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.dockCost}
                onChange={(e) => updateVesselInfo('dockCost', parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center text-base font-medium bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="text-base font-medium text-gray-700">BCMEA Assurance</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.bcmeaAssurance}
                onChange={(e) => updateVesselInfo('bcmeaAssurance', parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center text-base font-medium bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <label className="text-base font-medium text-gray-700">Under Holding</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.underHolding}
                onChange={(e) => updateVesselInfo('underHolding', parseFloat(e.target.value) || 0)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center text-base font-medium bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Grand Total */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-end">
            <div className="bg-green-50 border border-green-200 rounded-xl px-8 py-6">
              <div className="text-base font-medium text-gray-700 mb-2">Grand Total</div>
              <div className="text-3xl font-bold text-green-600">${vesselInfo.grandTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelCalculator;
