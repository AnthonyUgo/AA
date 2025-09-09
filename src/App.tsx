import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { FaHome, FaCalendarAlt, FaShoppingBag, FaInfoCircle } from "react-icons/fa";

import { themeClass } from "./styles/theme.css";
import "./styles/global.css.ts"; // make sure this file is imported once
import { appRoot } from "./styles/layout.css";
import { navBar, navInner, logoLink, logoImg, navIcons, navIconLink } from "./styles/nav.css";
import { heroSection, heroLogo, comingSoon, ctaBtn } from "./styles/hero.css";
import { overlay, dialog, dialogInner, dialogTitle, form, input, actions, btnGhost, btnPrimary } from "./styles/modal.css";

// Portal so the modal mounts at <body>
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
    <div className={`${themeClass} ${appRoot}`}>
      {/* NAV */}
      <nav className={navBar}>
        <div className={navInner}>
          <a href="#home" className={logoLink}>
            <img src="/logo-small.png" alt="AA Logo" className={logoImg} />
          </a>
          <div className={navIcons}>
            {navItems.map(({ href, icon }, i) => (
              <a key={i} href={href} className={navIconLink} aria-label={href.replace("#", "")}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className={heroSection}>
        <motion.img
          src="/logo.png"
          alt="Above Average Logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className={heroLogo}
        />

        <motion.p
          className={comingSoon}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          COMING SOON
        </motion.p>

        <button onClick={() => setOpen(true)} className={ctaBtn}>
          Join the Waitlist
        </button>
      </section>

      {/* MODAL (Portal) */}
      <ModalPortal open={open}>
        <AnimatePresence>
          {open && (
            <motion.div
              id="aa-modal-overlay"
              className={overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                className={dialog}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <div className={dialogInner}>
                  <h2 className={dialogTitle}>Join the Waitlist</h2>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setOpen(false);
                    }}
                    className={form}
                  >
                    <input type="text" placeholder="Name" required className={input} />
                    <input type="email" placeholder="Email" required className={input} />
                    <input type="tel" placeholder="Phone" required className={input} />

                    <div className={actions}>
                      <button type="button" onClick={() => setOpen(false)} className={btnGhost}>
                        Cancel
                      </button>
                      <button type="submit" className={btnPrimary}>
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
