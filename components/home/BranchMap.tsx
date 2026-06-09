"use client";

import { useState } from "react";
import { branchesData, BranchItem } from "../../data/branches";

export default function BranchMap() {
  const [selectedBranch, setSelectedBranch] = useState<BranchItem>(branchesData[0]);

  // Center coordinates for map reference
  const centerLat = 14.5;
  const centerLng = 121.0;

  // Simple coordinate projection to SVG coordinate system for Manila/Cavite
  const projectCoords = (lat: number, lng: number) => {
    // Zoomed in scale factor
    const scale = 500;
    const x = (lng - centerLng) * scale + 150;
    // Invert y axis because SVG 0,0 is top-left
    const y = (centerLat - lat) * scale + 250;
    return { x, y };
  };

  return (
    <section className="section branch-map-section section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Locations & Care</span>
          <h2 className="section-title">7 Branches Across Manila & Cavite</h2>
          <div className="gold-divider"></div>
          <p className="section-desc">
            Visit any of our clean, luxurious clinics. Find a clinic near you and book an appointment with our expert practitioners.
          </p>
        </div>

        <div className="map-interface-grid">
          {/* Branches List Selector */}
          <div className="branches-selector-list no-scrollbar">
            {branchesData.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <div
                  key={branch.id}
                  className={`branch-select-card ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedBranch(branch)}
                >
                  <div className="branch-meta">
                    <span className="branch-city">{branch.city}</span>
                    <h3 className="branch-name-text">{branch.shortName}</h3>
                  </div>
                  <span className="select-arrow">&rarr;</span>
                </div>
              );
            })}
          </div>

          {/* Interactive Visual Map & Details */}
          <div className="map-display-panel">
            {/* SVG Geographical representation */}
            <div className="map-visualizer-box">
              <svg className="manila-vector-map" viewBox="0 0 300 500">
                {/* Land background (translucent dark purple) */}
                <rect x="0" y="0" width="300" height="500" fill="rgba(18, 5, 33, 0.2)" />

                {/* Manila Bay coastline (Water to the West/Left) */}
                <path
                  d="M -50,100 L 115,130 C 120,160 128,180 128,195 C 128,205 132,210 135,215 C 138,220 142,235 140,250 C 137,265 125,268 120,270 C 105,275 95,260 85,255 C 75,250 82,268 102,272 C 112,274 92,285 82,290 C 72,295 68,300 62,310 C 48,330 32,335 22,340 C 12,345 2,355 -10,360 L -50,550 Z"
                  fill="rgba(10, 4, 18, 0.75)"
                  stroke="rgba(201, 169, 110, 0.22)"
                  strokeWidth="1"
                />

                {/* Laguna de Bay coastline (Water to the East/Right) */}
                <path
                  d="M 350,220 L 225,235 C 205,245 195,250 188,260 C 180,270 178,280 180,295 C 182,310 183,315 185,320 C 190,330 195,332 200,335 C 210,345 212,350 215,355 C 220,365 225,368 230,370 C 240,380 242,390 245,395 C 248,400 252,408 255,420 C 258,435 255,450 260,465 L 350,490 Z"
                  fill="rgba(10, 4, 18, 0.75)"
                  stroke="rgba(201, 169, 110, 0.22)"
                  strokeWidth="1"
                />

                {/* Grid guidelines for high-tech clinical look */}
                <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(201, 169, 110, 0.06)" />
                <line x1="0" y1="200" x2="300" y2="200" stroke="rgba(201, 169, 110, 0.06)" />
                <line x1="0" y1="300" x2="300" y2="300" stroke="rgba(201, 169, 110, 0.06)" />
                <line x1="0" y1="400" x2="300" y2="400" stroke="rgba(201, 169, 110, 0.06)" />
                <line x1="100" y1="0" x2="100" y2="500" stroke="rgba(201, 169, 110, 0.06)" />
                <line x1="200" y1="0" x2="200" y2="500" stroke="rgba(201, 169, 110, 0.06)" />

                {/* Coordinate Labels */}
                <text x="5" y="95" fill="rgba(201, 169, 110, 0.35)" fontSize="6" fontFamily="var(--font-sans)">14.65° N</text>
                <text x="5" y="195" fill="rgba(201, 169, 110, 0.35)" fontSize="6" fontFamily="var(--font-sans)">14.55° N</text>
                <text x="5" y="295" fill="rgba(201, 169, 110, 0.35)" fontSize="6" fontFamily="var(--font-sans)">14.45° N</text>
                <text x="5" y="395" fill="rgba(201, 169, 110, 0.35)" fontSize="6" fontFamily="var(--font-sans)">14.35° N</text>
                
                <text x="95" y="493" fill="rgba(201, 169, 110, 0.35)" fontSize="6" fontFamily="var(--font-sans)">120.95° E</text>
                <text x="195" y="493" fill="rgba(201, 169, 110, 0.35)" fontSize="6" fontFamily="var(--font-sans)">121.05° E</text>

                {/* Draw connecting network links */}
                {branchesData.map((branch) => {
                  const { x, y } = projectCoords(branch.lat, branch.lng);
                  const selCoords = projectCoords(selectedBranch.lat, selectedBranch.lng);
                  const isSelected = selectedBranch.id === branch.id;
                  return (
                    <line
                      key={`link-${branch.id}`}
                      x1={x}
                      y1={y}
                      x2={selCoords.x}
                      y2={selCoords.y}
                      stroke={isSelected ? "var(--clr-accent)" : "rgba(201, 169, 110, 0.5)"}
                      strokeWidth={isSelected ? "0.8" : "0.4"}
                      strokeOpacity={isSelected ? "0.4" : "0.12"}
                      strokeDasharray={isSelected ? "2 2" : "4 4"}
                    />
                  );
                })}

                {/* Pins */}
                {branchesData.map((branch) => {
                  const { x, y } = projectCoords(branch.lat, branch.lng);
                  const isSelected = selectedBranch.id === branch.id;
                  return (
                    <g key={branch.id} onClick={() => setSelectedBranch(branch)} style={{ cursor: "pointer" }}>
                      {isSelected && (
                        <>
                          <circle cx={x} cy={y} r="20" fill="var(--clr-accent)" fillOpacity="0.12" className="pulse-circle">
                            <animate attributeName="r" values="6;22;6" dur="2.5s" repeatCount="indefinite" />
                            <animate attributeName="fill-opacity" values="0.22;0.02;0.22" dur="2.5s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={x} cy={y} r="10" fill="var(--clr-accent)" fillOpacity="0.08" />
                        </>
                      )}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isSelected ? 6 : 4} 
                        fill={isSelected ? "var(--clr-accent)" : "rgba(254, 252, 249, 0.5)"} 
                        stroke="var(--clr-accent)" 
                        strokeWidth={isSelected ? "2" : "1"} 
                      />
                    </g>
                  );
                })}
              </svg>
              <div className="map-badge">Interactive Map</div>
            </div>

            {/* Detailed Info Card */}
            <div className="branch-details-card glass-card-dark">
              <h3 className="details-title">{selectedBranch.name}</h3>
              
              <div className="details-content-grid">
                <div className="detail-field">
                  <span className="field-label">📍 Address</span>
                  <p className="field-value">{selectedBranch.address}</p>
                </div>

                <div className="detail-field">
                  <span className="field-label">📞 Contact Number</span>
                  <p className="field-value">{selectedBranch.phone}</p>
                </div>

                <div className="detail-field">
                  <span className="field-label">🕒 Operating Hours</span>
                  <p className="field-value">{selectedBranch.hours}</p>
                </div>

                <div className="detail-field">
                  <span className="field-label">🌸 Services Offered</span>
                  <p className="field-value">{selectedBranch.servicesAvailable?.join(" · ")}</p>
                </div>
              </div>

              <div className="details-actions">
                <a href={selectedBranch.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-accent map-action-btn">
                  Get Directions
                </a>
                <a href={`viber://chat?number=${selectedBranch.phone.replace(/\s+/g, '')}`} className="btn btn-outline-white map-action-btn">
                  Message Viber
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .branch-map-section {
          background-color: var(--clr-dark);
          border-top: 1px solid rgba(201, 169, 110, 0.2);
        }

        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto var(--space-xl);
        }

        .section-eyebrow {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--clr-accent);
          display: block;
          margin-bottom: 8px;
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
        }

        .section-desc {
          font-size: 1.05rem;
          line-height: 1.5;
        }

        .map-interface-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-xl);
          height: 600px;
        }

        .branches-selector-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
          padding-right: 8px;
        }

        .branch-select-card {
          background: rgba(254, 252, 249, 0.03);
          border: 1px solid rgba(254, 252, 249, 0.06);
          border-radius: var(--radius-md);
          padding: 18px 24px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: var(--transition-smooth);
        }

        .branch-select-card:hover {
          background: rgba(254, 252, 249, 0.06);
          border-color: rgba(201, 169, 110, 0.3);
        }

        .branch-select-card.active {
          background: rgba(74, 26, 107, 0.3);
          border-color: var(--clr-accent);
          box-shadow: 0 0 15px rgba(201, 169, 110, 0.15);
        }

        .branch-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .branch-city {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-accent);
        }

        .branch-name-text {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--clr-white);
        }

        .select-arrow {
          color: var(--clr-accent);
          font-size: 1.2rem;
          opacity: 0.5;
          transition: var(--transition-fast);
        }

        .branch-select-card.active .select-arrow,
        .branch-select-card:hover .select-arrow {
          opacity: 1;
          transform: translateX(4px);
        }

        .map-display-panel {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: var(--space-lg);
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-lg);
          padding: var(--space-md);
          border: 1px solid rgba(254, 252, 249, 0.05);
          overflow: hidden;
        }

        .map-visualizer-box {
          position: relative;
          background: var(--clr-dark-alt);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(201, 169, 110, 0.08);
          overflow: hidden;
        }

        .manila-vector-map {
          width: 90%;
          height: 90%;
        }

        .map-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: var(--clr-dark);
          border: 1px solid var(--clr-accent);
          color: var(--clr-accent);
          padding: 2px 10px;
          border-radius: var(--radius-full);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .branch-details-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: var(--space-md);
          height: 100%;
        }

        .details-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: var(--clr-accent) !important;
          margin-bottom: var(--space-md);
          line-height: 1.2;
        }

        .details-content-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          flex-grow: 1;
        }

        .detail-field {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .field-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--clr-accent);
          opacity: 0.8;
        }

        .field-value {
          font-size: 0.88rem;
          color: rgba(254, 252, 249, 0.9) !important;
          line-height: 1.4;
        }

        .details-actions {
          display: flex;
          gap: 10px;
          margin-top: var(--space-md);
        }

        .map-action-btn {
          flex: 1;
          padding: 0.75rem 0;
          font-size: 0.8rem;
        }

        @media (max-width: 992px) {
          .map-interface-grid {
            grid-template-columns: 1fr;
            height: auto;
          }
          .branches-selector-list {
            height: 250px;
          }
          .map-display-panel {
            grid-template-columns: 1fr;
            height: auto;
          }
          .map-visualizer-box {
            height: 350px;
          }
        }
      `}</style>
    </section>
  );
}
