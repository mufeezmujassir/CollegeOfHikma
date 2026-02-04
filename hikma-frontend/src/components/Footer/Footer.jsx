import "./Footer.css";

const Footer = () => {
  return (
    <footer className="madrasa-footer">
      <div className="container">
        <div className="row">

          {/* Madrasa Info */}
          <div className="col-md-4 footer-section">
            <h5>Dharul Hikma</h5>
            <p>
              Dharul Hikma is committed to providing quality Islamic education
              and nurturing students with strong moral and academic values.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/staff">Staff Members</a></li>
              <li><a href="/result">Results</a></li>
              <li><a href="/application">Application</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 footer-section">
            <h5>Contact</h5>
            <p>📍 Sri Lanka</p>
            <p>📞 +94 771719050</p>
            <p>✉️ dharulhikma.info@gmail.com</p>
          </div>

        </div>

        <hr />

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Dharul Hikma. All Rights Reserved.
          </p>
          <p className="developer">
            Developed by <span>NanoLense</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
