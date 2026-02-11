import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-4 border-t border-white/10 mt-40">
      <div className="max-w-5xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold text-neutral-400">scriptum</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/terms-of-service"
            className="hover:text-neutral-300 transition-colors"
          >
            이용약관
          </Link>
          <Link
            to="/privacy-policy"
            className="hover:text-neutral-300 transition-colors"
          >
            개인정보처리방침
          </Link>
          <a
            href="mailto:contact@rootly.kr"
            className="hover:text-neutral-300 transition-colors"
          >
            문의하기
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
