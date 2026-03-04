const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center bg-light py-3">
      <h6>Welcome to Blog Platform</h6>
      {/* <a
        href="https://www.youtube.com/c/DevATHTML"
        target="_blank"
        rel="noreferrer"
        className="mb-2 d-block"
      >
        https://www.youtube.com
      </a> */}
      <p>&copy; {currentYear} Blog Platform. Crafted for writers.</p>
    </div>
  );
};

export default Footer;
