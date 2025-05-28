import React, { useState } from 'react';
import { Table, Form, Offcanvas, Button } from 'react-bootstrap';
import LiveTab from './LiveTab';
import { useNavigate } from 'react-router-dom';
interface Device {
  ip: string;
  port: string;
  manufacturer: string;
  model: string;
  firmware_version: string;
  serial_number: string;
  hardware_id: string;
  status?: string;
  username?: string;
  password?: string;
}
const DeviceDiscovery: React.FC = () => {
  const navigate = useNavigate();
  const [back, setBack] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    {
      ip: '172.16.150.26',
      port: '8888',
      manufacturer: 'AMBICAM',
      model: 'VM-72AD4G210C',
      firmware_version: '4.2.4.4',
      serial_number: 'S0717164758036',
      hardware_id: 'HW000',
      status: 'Online',
      username: '',
      password: ''
    }
  ]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Device>>({});
  const handleRowClick = (device: Device, index: number, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'A') return;
    setEditingIndex(index);
    setFormData(device);
    setShowSidebar(true);
  };
  const handleChange = (field: keyof Device, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const onlineCount = devices.filter(device => device.status === 'Online').length;
  if (back) {
    return <LiveTab />;
  }
  return (
    <div>
      <div className="top-nav">
        <div className="nav-buttons space-x-6">
          <button>Device Discovery</button>
        </div>
        <button className="back-btn" onClick={() => setBack(true)}>Back</button>
      </div>
      <div style={{ width: '100vw', height: '100vh', overflow: 'auto', padding: 20, margin: 0, color: 'black' }}>
        <h5>Total Number of Online Devices: {onlineCount}</h5>
        <Table bordered hover striped responsive style={{ marginTop: 10, backgroundColor: '#fff', color: 'black' }}>
          <thead>
            <tr>
              <th></th>
              <th>IP</th>
              <th>port</th>
              <th>manufacturer</th>
              <th>model</th>
              <th>firmware_version</th>
              <th>serial_number</th>
              <th>hardware_id</th>
              <th>View Live</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, idx) => (
              <tr key={idx} onClick={(e) => handleRowClick(device, idx, e)} style={{ cursor: 'pointer' }}>
                <td><Form.Check type="checkbox" /></td>
                <td>{device.ip}</td>
                <td>{device.port}</td>
                <td>{device.manufacturer}</td>
                <td>{device.model}</td>
                <td>{device.firmware_version}</td>
                <td>{device.serial_number}</td>
                <td>{device.hardware_id}</td>
                <td>
                  <a href="/" onClick={(e) => { e.preventDefault(); setBack(true); }}>View Live</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Modify Device Details</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>IP Address:</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.ip || ''}
                  readOnly
                  plaintext
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Port:</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.port || ''}
                  onChange={(e) => handleChange('port', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.username || ''}
                  onChange={(e) => handleChange('username', e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate('/tab');
                    window.location.reload(); // This forces a full page reload after navigation
                  }}
                >
                  Done
                </Button>
              </div>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};
export default DeviceDiscovery;