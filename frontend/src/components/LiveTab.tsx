import { useState } from 'react';
import './LiveTab.css';
import DeviceDiscovery from './DeviceDiscovery';
import DeviceSetting from './DeviceSetting';
function LiveTab() {
  const [showDeviceDiscovery, setShowDeviceDiscovery] = useState(false);
  const [showDeviceSetting, setShowDeviceSetting] = useState(false);
 if (showDeviceSetting) {
    return <DeviceSetting />;
  }
    if (showDeviceDiscovery) {
        return <DeviceDiscovery />;
    }
  const handlePTZControl = async (direction : string) => {
  try {
    await fetch(`http://localhost:8000/api/v1/move/${direction}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("PTZ control error:", error);
  }
};

  return (
    <div className="live-tab-container">
      <div className="top-nav">
        <div className="nav-buttons space-x-6">
          <button onClick={() => setShowDeviceDiscovery(false)}>Live</button>
          <button onClick={() => setShowDeviceDiscovery(true)}>
            Device Discovery
          </button>
        </div>
      </div>

      <div className="main-content">
        (
        <>
          <div className="video-panel">
            <img
              src="http://localhost:8000/api/v1/live-stream/nvr"
              alt="Live CCTV Feed"
              className="live-stream"
              style={{ width: "100%", height: "100%" }}
            />

            <div className="camera-label">Camera</div>
            {/* <div className="timestamp">02:35:01 01/07/2018 Sunday</div> */}
          </div>

          <div className="control-panel">
            {/* <div className="ptz-grid">
              {["↖", "↑", "↗", "←", "●", "→", "↙", "↓", "↘"].map((btn, i) => (
                <button key={i}>{btn}</button>
              ))}
            </div> */}

            {/* <div>
              <label>Speed (1-10):</label>
              <input type="range" min="1" max="10" defaultValue="5" />
            </div> */}
            <div className="ptz-grid">
              <div></div>
              <button className='arrows' onClick={() => handlePTZControl("up")}>↑</button>
              <div></div>

              <button className='arrows' onClick={() => handlePTZControl("left")}>←</button>
              <button className='arrows' onClick={() => handlePTZControl("stop")}>●</button>
              <button className='arrows' onClick={() => handlePTZControl("right")}>→</button>

              <div></div>
              <button className='arrows' onClick={() => handlePTZControl("down")}>↓</button>
              <div></div>
            </div>

            <div style={{ alignItems: "center" }}>
              <button
                id="device-setting"
                onClick={() => setShowDeviceSetting(true)}
              >
                device settings
              </button>
            </div>
          </div>
        </>
        )
      </div>
    </div>
  );
}

export default LiveTab;
