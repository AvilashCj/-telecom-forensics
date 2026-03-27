import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ZoomIn, ZoomOut, RefreshCw, Maximize } from 'lucide-react';

const mockData = {
  nodes: [
    { id: '+91 98765 43210', group: 1, val: 20 },
    { id: '+91 87654 32109', group: 1, val: 12 },
    { id: '+91 99887 76655', group: 2, val: 25 },
    { id: '+91 11223 34455', group: 2, val: 10 },
    { id: '+91 55667 78899', group: 3, val: 15 },
    { id: '+91 77665 54433', group: 3, val: 8 },
    { id: 'Unknown #1', group: 4, val: 5 },
    { id: 'Unknown #2', group: 4, val: 5 },
  ],
  links: [
    { source: '+91 98765 43210', target: '+91 87654 32109', value: 5 },
    { source: '+91 99887 76655', target: '+91 11223 34455', value: 10 },
    { source: '+91 99887 76655', target: '+91 98765 43210', value: 2 },
    { source: '+91 55667 78899', target: '+91 77665 54433', value: 4 },
    { source: '+91 98765 43210', target: 'Unknown #1', value: 1 },
    { source: '+91 11223 34455', target: 'Unknown #2', value: 1 },
  ]
};

const NetworkGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 600;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    const simulation = d3.forceSimulation(mockData.nodes)
      .force("link", d3.forceLink(mockData.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = g.append("g")
      .attr("stroke", "#e2e8f0")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(mockData.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value) * 2);

    const node = g.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .selectAll("circle")
      .data(mockData.nodes)
      .join("circle")
      .attr("r", d => d.val)
      .attr("fill", d => {
        if (d.group === 1) return "#f97316"; // Orange
        if (d.group === 2) return "#0ea5e9"; // Sky
        if (d.group === 3) return "#8b5cf6"; // Violet
        return "#94a3b8"; // Slate
      })
      .call(drag(simulation));

    node.append("title")
      .text(d => d.id);

    const labels = g.append("g")
      .selectAll("text")
      .data(mockData.nodes)
      .join("text")
      .text(d => d.id.slice(-5))
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", "#64748b")
      .attr("dx", 15)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
      
      labels
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    });

    // Zoom behavior
    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.1, 8])
      .on("zoom", ({transform}) => {
        g.attr("transform", transform);
      }));

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Network Topology</h1>
          <p className="text-slate-500">Visualization of caller-receiver relationship clusters.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <ZoomIn size={20} />
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <ZoomOut size={20} />
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <RefreshCw size={20} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold ml-2">
            <Maximize size={18} />
            Full Screen
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-6 left-6 z-10 space-y-2">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-slate-100 shadow-sm text-xs font-bold space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Suspect Group A</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sky-500"></div>
              <span>Suspect Group B</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500"></div>
              <span>External Contacts</span>
            </div>
          </div>
        </div>
        
        <svg ref={svgRef} className="w-full h-[600px] cursor-move"></svg>
        
        <div className="absolute bottom-6 right-6 z-10">
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xl text-sm max-w-xs">
            <p className="font-bold border-b border-slate-700 pb-2 mb-2">Cluster Insights</p>
            <p className="text-slate-400 text-xs">A high-density bridge detected between Group A and Group B via number <span className="text-white font-mono">...3210</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;
