import './Footer.css'; 

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Contacts</h4>
            <p>Email: support@example.com</p>
            <p>Phone: +1 123 456 789</p>
            <p>Social Media:</p>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Documents</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">GitHub Repository</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Decentralized Voting System</p>
            <p>Powered by Ethereum Blockchain</p>
            <p>Transparency, Security, and Accessibility</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;