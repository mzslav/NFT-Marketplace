import './LoginWindow.css';

const LoginWindow = ({ message, userAddress, onClose }) => {
  return (
    <div className="login-window-overlay">
      <div className="login-window">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="white-text">Success!</h2>
        <p className="white-text">{message}</p>
        <div className="form-group">
          <label className="user-address-label">Connected Address:</label>
          <span className="user-address">{userAddress}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginWindow;
