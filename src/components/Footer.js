import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"; 
import "../Styling/Footer.css";
const Footer = () => {
  return (
    <footer className="footer-footer" fixed="bottom">
    <footer className="footer-footer" >
      <div className="footer-container">
        <div className="footer-div">
          <div className="footer-inner-div">
            <h3>About Apparel Shopping Zone</h3>
            <p>
              Apparel Shopping Zone is your one-stop destination for all your clothing needs. We offer a wide range of high-quality apparel for men, women, and kids.
            </p>
          </div>
          <div className="footer-media">
            <h3>Get Connected On Social Media</h3>
            <div className="social-icons">
              <a href="https://www.linkedin.com/company/pivotree" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="icon" />LinkedIn
              </a>
              <br/><br/>
              <a href="https://twitter.com/TeamPivotree?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="icon" />Twitter
              </a>
            </div>
          </div>
          <div className="footer-contact">
            <h3>Contact Information</h3>
            <p>
              Phone: +1234567890<br />
              Email: info@apparelshoppingzone.com<br />
            </p>
          </div>
          <div className="footer-address">
            <h3>Pivotree Office Address</h3>
            <p>
              Pivotree<br />
              Fortune Summit IT Park<br />
              HSR Layout, Bengaluru<br />
              Karnataka, India - 560102
            </p>
          </div>
        </div>
        <div className="footer-last">
          <span className="text-muted">© {new Date().getFullYear()} Apparel Shopping Zone</span>
        </div>
      </div>
    </footer>
    </footer> 
  );
};
export default Footer;



