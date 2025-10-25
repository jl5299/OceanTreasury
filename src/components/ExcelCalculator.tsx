import React, { useState } from 'react';

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

  const handleSimulate = () => {
    // Calculate grand total
    const totalGangCosts = gangSchedules.reduce((sum, schedule) => sum + schedule.totalCost, 0);
    const grandTotal = vesselInfo.bcmeaRate + vesselInfo.dockCost + vesselInfo.bcmeaAssurance + vesselInfo.underHolding;
    
    setVesselInfo(prev => ({ ...prev, grandTotal }));
    
    // For now, just show an alert
    alert(`Simulation complete! Total gang costs: $${totalGangCosts.toLocaleString()}, Grand total: $${grandTotal.toFixed(2)}`);
  };

  return (
    <div className="voyage-db bg-white border-2 border-gray-400 rounded-xl overflow-hidden shadow-lg">
      {/* Gang Schedule Section */}
      <div className="p-6 border-b-2 border-gray-400 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-xl text-gray-800 mb-6">
          Gang Schedule
        </h3>
        <div className="overflow-x-auto shadow-inner bg-gray-50 rounded-lg p-2">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                <th className="border-2 border-gray-600 px-4 py-3 text-left font-bold text-sm">Day Type</th>
                <th className="border-2 border-gray-600 px-4 py-3 text-left font-bold text-sm">Shift Time</th>
                <th className="border-2 border-gray-600 px-4 py-3 text-left font-bold text-sm"># of Gangs</th>
                <th className="border-2 border-gray-600 px-4 py-3 text-left font-bold text-sm">Cost per Gang</th>
                <th className="border-2 border-gray-600 px-4 py-3 text-left font-bold text-sm">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {gangSchedules.map((schedule, index) => (
                <tr key={index} className="hover:bg-blue-50 transition-colors duration-200">
                  <td className="border-2 border-gray-400 px-4 py-3 text-gray-800 font-medium bg-gray-50">{schedule.dayType}</td>
                  <td className="border-2 border-gray-400 px-4 py-3 text-gray-800 font-medium bg-gray-50">{schedule.shiftTime}</td>
                  <td className="border-2 border-gray-400 px-4 py-3">
                    <input
                      type="number"
                      value={schedule.numberOfGangs}
                      onChange={(e) => updateGangSchedule(index, 'numberOfGangs', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg text-center font-bold bg-yellow-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition-all duration-200"
                    />
                  </td>
                  <td className="border-2 border-gray-400 px-4 py-3">
                    <input
                      type="number"
                      value={schedule.costPerGang}
                      onChange={(e) => updateGangSchedule(index, 'costPerGang', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border-2 border-yellow-400 rounded-lg text-center font-bold bg-yellow-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition-all duration-200"
                    />
                  </td>
                  <td className="border-2 border-gray-400 px-4 py-3 text-left text-gray-800 font-bold bg-gradient-to-r from-green-100 to-emerald-100">
                    ${schedule.totalCost.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vessel Information Section */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <h3 className="text-xl text-gray-800 mb-6">
          Vessel Information
        </h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Vessel Name</label>
              <input
                type="text"
                value={vesselInfo.vesselName}
                onChange={(e) => updateVesselInfo('vesselName', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg bg-gray-50 text-gray-700 font-medium focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Tonnage (MT)</label>
              <input
                type="number"
                value={vesselInfo.tonnage}
                onChange={(e) => updateVesselInfo('tonnage', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg text-center font-bold bg-yellow-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Discharge Days</label>
              <input
                type="number"
                value={vesselInfo.discharge}
                onChange={(e) => updateVesselInfo('discharge', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg text-center font-medium bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">BCMEA Rate</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.bcmeaRate}
                onChange={(e) => updateVesselInfo('bcmeaRate', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-green-400 rounded-lg text-center font-bold bg-green-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Dock Cost</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.dockCost}
                onChange={(e) => updateVesselInfo('dockCost', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-green-400 rounded-lg text-center font-bold bg-green-100 focus:bg-white focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">BCMEA Assurance</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.bcmeaAssurance}
                onChange={(e) => updateVesselInfo('bcmeaAssurance', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg text-center font-medium bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Under Holding</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.underHolding}
                onChange={(e) => updateVesselInfo('underHolding', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg text-center font-medium bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Grand Total</label>
              <input
                type="number"
                step="0.01"
                value={vesselInfo.grandTotal}
                readOnly
                className="w-full px-4 py-3 border-2 border-green-500 rounded-lg text-center font-bold bg-gradient-to-r from-green-100 to-emerald-100 text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Simulate Button */}
      <div className="p-6 border-t-2 border-gray-400 bg-gradient-to-r from-blue-50 to-indigo-50">
        <button
          onClick={handleSimulate}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-bold text-lg"
        >
          Simulate
        </button>
      </div>
    </div>
  );
};

export default ExcelCalculator;
