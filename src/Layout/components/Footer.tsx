import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-area text-center py-3 mt-4">
      <h6 className="footer-title mb-1">Welcome to Blog Platform</h6>
      <p className="footer-copy mb-0">
        &copy; {currentYear} Blog Platform. Crafted for writers.
      </p>
    </footer>
  );
};

export default Footer;
