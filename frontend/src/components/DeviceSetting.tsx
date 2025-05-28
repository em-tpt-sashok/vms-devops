import { useState } from 'react';
import './DeviceSetting.css';
import LiveTab from './LiveTab';
import "./LiveTab.css"

function DeviceSetting() {
  const [showLiveTab, setShowLiveTab] = useState(false);

  const handleBack = () => {
    setShowLiveTab(true); 
  };

  if (showLiveTab) {
    return <LiveTab />;
  }

  return (
    <div className="device-setting-container">
      <div className="device-left-panel">
        <div className="device-camera-feed">
          <img
            src="http://localhost:8000/api/v1/live-stream/nvr"
            alt="Live CCTV Feed"
            className="live-stream"
            style={{ width: "100%",height: "-webkit-fill-available",backgroundSize: "cover"}}
          />

        </div>

        <div className="device-button-row">
          <button>Reset Defaults</button>
          <button>Refresh</button>
          <button>Save</button>
          <button onClick={handleBack}>Back</button>
        </div>
      </div>

      <div className="device-right-panel">
        <div className="device-group">
          <label>Bit rate</label>
          <input type="range" min="0" max="15" />
          <label>Frame rate</label>
          <input type="range" min="0" max="15" />
        </div>

        <div className="device-group">
          <label>WB Mode</label>
          <select>
            <option>Auto</option>
          </select>

          <label>Power Frequency</label>
          <div className="device-radio-group">
            <label>
              <input type="radio" name="freq" /> 50Hz
            </label>
            <label>
              <input type="radio" name="freq" /> 60Hz
            </label>
          </div>

          <label>Forced Anti-flicker</label>
          <select>
            <option>Disable</option>
          </select>

          <label>Crop X Pixels</label>
          <input type="number" defaultValue="0" />
          <label>Crop Y Pixels</label>
          <input type="number" defaultValue="0" />

          <label>Horizon Flip</label>
          <select>
            <option>Disable</option>
          </select>
          <label>Vertical Flip</label>
          <select>
            <option>Disable</option>
          </select>
          <label>Defogging</label>
          <select>
            <option>Disable</option>
          </select>
          <label>WDR Mode</label>
          <select>
            <option>Disable</option>
          </select>
        </div>

        <div className="device-group">
          <label>Day Shutter Mode</label>
          <select>
            <option>Auto</option>
          </select>
          <label>Day Shutter Min Speed</label>
          <input type="number" defaultValue="10" />

          <label>Night Shutter Mode</label>
          <select>
            <option>Auto</option>
          </select>
          <label>Night Shutter Min Speed</label>
          <input type="number" defaultValue="10" />
        </div>

        <div className="device-group">
          <label>IRcut Setting</label>
          <select>
            <option>Auto</option>
          </select>
          <label>IRcut Mode</label>
          <select>
            <option>Auto</option>
          </select>
        </div>

        <div className="device-group">
          <h3>Advanced Image and Smart LED Light Control</h3>
          <label>Light Mode</label>
          <select>
            <option>Pure White Light</option>
          </select>
          <label>Image Option</label>
          <select>
            <option>Normal</option>
          </select>
          <label>Light Off Sensitivity</label>
          <input type="range" min="0" max="100" defaultValue="50" />
          <label>LED Control Mode</label>
          <select>
            <option>Manual</option>
          </select>
          <label>LED Brightness</label>
          <select>
            <option>10%</option>
          </select>
          <label>Light On Illumination</label>
          <select>
            <option>0.10</option>
          </select>
          <label>Image Mode</label>
          <select>
            <option>Normal</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DeviceSetting;
