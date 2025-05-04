// // src/pages/StatisticsPage.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend,
//   LineChart, Line
// } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2'];

// const StatisticsPage = () => {
//   const [deviceStats, setDeviceStats] = useState([]);
//   const [osStats, setOsStats] = useState([]);
//   const [sbomTrend, setSbomTrend] = useState([]);

//   useEffect(() => {
//     // Replace with your actual API URL
//     axios.get('https://sbom-server.onrender.com/api/devices')
//       .then(res => {
//         const devices = res.data;

//         // Bar Chart: # of SBOM packages per device
//         const sbomData = devices.map(d => ({
//           name: d.name,
//           components: d.sbom.length,
//         }));
//         setDeviceStats(sbomData);

//         // Pie Chart: Devices per Operating System
//         const osMap = {};
//         devices.forEach(d => {
//           osMap[d.operatingSystem] = (osMap[d.operatingSystem] || 0) + 1;
//         });
//         const pieData = Object.entries(osMap).map(([os, count]) => ({
//           name: os,
//           value: count,
//         }));
//         setOsStats(pieData);

//         // Line Chart: SBOM size distribution (dummy time trend logic)
//         const trendData = devices.map((d, idx) => ({
//           name: `Device ${idx + 1}`,
//           sbomSize: d.sbom.length,
//         }));
//         setSbomTrend(trendData);
//       });
//   }, []);

//   return (
//     <div className="p-6 text-white bg-[#415a77] min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">📊 SBOM Statistics Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Bar Chart */}
//         <div className="bg-white rounded p-4 shadow-md text-black">
//           <h2 className="text-xl font-semibold mb-2">Packages per Device</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={deviceStats}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="components" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white rounded p-4 shadow-md text-black">
//           <h2 className="text-xl font-semibold mb-2">OS Distribution</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={osStats}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {osStats.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Line Chart */}
//         <div className="bg-white rounded p-4 shadow-md text-black col-span-full">
//           <h2 className="text-xl font-semibold mb-2">SBOM Size Trend</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={sbomTrend}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <CartesianGrid stroke="#ccc" />
//               <Line type="monotone" dataKey="sbomSize" stroke="#82ca9d" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatisticsPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#A0E7E5'];

const StatisticsPage = () => {
  const [deviceStats, setDeviceStats] = useState([]);
  const [osStats, setOsStats] = useState([]);
  const [sbomTrend, setSbomTrend] = useState([]);
  const [commonPackages, setCommonPackages] = useState([]);

  useEffect(() => {
    // Get all devices
    axios.get('https://sbom-server.onrender.com/api/devices')
      .then(res => {
        const devices = res.data;

        // Bar Chart: # SBOM packages per device
        const sbomData = devices.map(d => ({
          name: d.name,
          components: d.sbom?.length || 0,
        }));
        setDeviceStats(sbomData);

        // Pie Chart: OS Distribution
        const osMap = {};
        devices.forEach(d => {
          osMap[d.operatingSystem] = (osMap[d.operatingSystem] || 0) + 1;
        });
        const pieData = Object.entries(osMap).map(([os, count]) => ({
          name: os,
          value: count,
        }));
        setOsStats(pieData);

        // Line Chart: SBOM Size Trend
        const trendData = devices.map((d, idx) => ({
          name: d.name,
          sbomSize: d.sbom?.length || 0,
        }));
        setSbomTrend(trendData);
      });

    // Get common packages
    axios.get('https://sbom-server.onrender.com/api/devices/common-packages')
      .then(res => setCommonPackages(res.data))
      .catch(err => console.error("Failed to load common packages", err));
  }, []);

  return (
    <div className="p-6 text-white bg-[#415a77] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📊 SBOM Statistics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Chart 1: Packages per Device */}
        <div className="bg-white rounded p-4 shadow-md text-black">
          <h2 className="text-xl font-semibold mb-2">Packages per Device</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="components" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: OS Distribution */}
        <div className="bg-white rounded p-4 shadow-md text-black">
          <h2 className="text-xl font-semibold mb-2">OS Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={osStats}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {osStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: SBOM Size Trend */}
        <div className="bg-white rounded p-4 shadow-md text-black col-span-full">
          <h2 className="text-xl font-semibold mb-2">SBOM Size Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sbomTrend}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" />
              <Line type="monotone" dataKey="sbomSize" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Top Common Packages */}
        {/* <div className="bg-white rounded p-4 shadow-md text-black col-span-full">
          <h2 className="text-xl font-semibold mb-2">Top Common Packages</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={commonPackages}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="count" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}
        {/* Common Packages Bar Chart */}
        <div className="bg-white rounded p-4 shadow-md text-black col-span-full">
  <h2 className="text-xl font-semibold mb-4">Top Common Packages</h2>
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      data={commonPackages}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis
        dataKey="name"
        type="category"
        width={200}
        tick={{ fontSize: 12 }}
        interval={0}
      />
      <Tooltip
        contentStyle={{ backgroundColor: '#f0f0f0', border: 'none' }}
        formatter={(value, name) => [value, "Devices using"]}
      />
      <Bar dataKey="count" fill="#00A6ED" barSize={24} radius={[0, 10, 10, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>
  );
};

export default StatisticsPage;

