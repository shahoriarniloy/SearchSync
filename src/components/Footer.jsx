const Footer = () => {
    return (
      <footer className="bg-blue-900 text-white py-6 mt-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <div className="mb-4 md:mb-0">
            <h5 className="text-lg font-semibold">SearchSync</h5>
            <p className="text-sm">© 2024 All rights reserved.</p>
          </div>
  
          <div className="mt-4 md:mt-0 flex gap-4">
            <a href="https://www.facebook.com/shahoriarniloy" target="_blank" rel="noopener noreferrer">
              <img src="https://i.ibb.co/cCHn8b6/Facebook-logo-square.png" alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="https://x.com/shahoriar_niloy" target="_blank" rel="noopener noreferrer">
              <img src="https://i.ibb.co/f8Rm8SN/Logo-of-Twitter-svg.png" alt="Twitter" className="h-6 w-6" />
            </a>
            
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  