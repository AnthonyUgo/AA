import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { FaHome, FaCalendarAlt, FaShoppingBag, FaInfoCircle } from "react-icons/fa";

// Portal shell so the modal always mounts at <body>, not inside navbar or other containers
function ModalPortal({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null;
  return createPortal(children, document.body);
}

export default function App() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Lock scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const navItems = [
    { href: "#home", icon: <FaHome /> },
    { href: "#events", icon: <FaCalendarAlt /> },
    { href: "#shop", icon: <FaShoppingBag /> },
    { href: "#about", icon: <FaInfoCircle /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0f1f] text-white font-mono relative">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1f]/70 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center">
            <img
              src="/logo-small.png"
              alt="AA Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_#3b82f6] hover:scale-110 transition"
            />
          </a>
          <div className="flex items-center gap-10 text-2xl">
            {navItems.map(({ href, icon }, i) => (
              <a
                key={i}
                href={href}
                className="text-blue-300 hover:text-white transition transform hover:scale-125 drop-shadow-[0_0_10px_#3b82f6]"
                aria-label={href.replace("#", "")}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative flex flex-col items-center justify-center h-screen text-center">
        <motion.img
  src="/logo.png"
  alt="Above Average Logo"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
  className="w-52 md:w-80 lg:w-96 mx-auto drop-shadow-[0_0_25px_#3b82f6] pointer-events-none"
/>

        <motion.p
  className="absolute top-[64%] text-4xl md:text-5xl lg:text-6xl font-extrabold
             text-blue-400 tracking-widest pointer-events-none z-10"
  style={{
    fontFamily: "'Orbitron', monospace",
    textShadow: "0 0 12px #3b82f6, 0 0 24px #2563eb, 0 0 36px #1e40af",
  }}
  animate={{ opacity: [0, 1, 0] }}
  transition={{ duration: 1.2, repeat: Infinity }}
>
  COMING SOON
</motion.p>
        {/* Glassy CTA under the logo */}
        <button
  onClick={() => setOpen(true)}
  className="absolute top-[82%] z-20 px-8 py-3 rounded-xl font-bold text-blue-300
             bg-white/5 backdrop-blur-md border border-blue-500/40
             shadow-[0_0_20px_#3b82f6] hover:bg-blue-500/20 hover:text-white
             transition transform hover:scale-105"
  style={{ fontFamily: "'Orbitron', monospace" }}
>
  Join the Waitlist
</button>
      </section>

      {/* MODAL — rendered via Portal at <body> level */}
      <ModalPortal open={open}>
        <AnimatePresence>
          {open && (
            <motion.div
              id="aa-modal-overlay"
              className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                className="w-[92%] max-w-md rounded-2xl bg-[#0d1b2a] text-white
                           shadow-[0_0_30px_#3b82f6] border border-blue-500/20"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <div className="p-7">
                  <h2
                    className="text-center text-2xl font-extrabold text-blue-300 mb-6"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    Join the Waitlist
                  </h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOpen(false);
                    }}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      className="p-3 rounded-lg bg-blue-900/30 border border-blue-500/40
                                 focus:outline-none focus:border-blue-400"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="p-3 rounded-lg bg-blue-900/30 border border-blue-500/40
                                 focus:outline-none focus:border-blue-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      required
                      className="p-3 rounded-lg bg-blue-900/30 border border-blue-500/40
                                 focus:outline-none focus:border-blue-400"
                    />

                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="px-6 py-2 rounded-lg bg-white/5 border border-white/10
                                   text-blue-200 hover:bg-white/10 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg font-bold text-white
                                   bg-blue-600 hover:bg-blue-500
                                   shadow-[0_0_14px_#3b82f6] transition"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalPortal>
    </div>
  );
}
