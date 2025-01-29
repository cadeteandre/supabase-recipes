import LogoFooter from '../../public/svg/LogoFooter';
import YoutubeSvg from '../../public/svg/YoutubeSvg';
import XSvg from '../../public/svg/XSvg';
import FacebookSvg from '../../public/svg/FacebookSvg';

const Footer = () => {
    return (  
<footer className="footer bg-neutral text-neutral-content p-10 mt-10 rounded-lg">
  <aside>
    <LogoFooter />
  </aside>
  <nav>
    <h6 className="footer-title">Social Media</h6>
    <div className="grid grid-flow-col gap-4">
      <a href='#'>
        <XSvg />
      </a>
      <a href='#'>
        <YoutubeSvg />
      </a>
      <a href='#'>
        <FacebookSvg />
      </a>
    </div>
  </nav>
</footer>
    );
}

export default Footer;