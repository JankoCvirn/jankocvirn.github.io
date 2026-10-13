(() => {
    "use strict";

    // Mobile nav
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");
    if (toggle && menu) {
        const setOpen = (open) => {
            menu.classList.toggle("open", open);
            toggle.setAttribute("aria-expanded", String(open));
        };
        toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
        menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    }

    // Theme toggle; the initial theme is applied by the inline script in <head>
    const themeToggle = document.querySelector(".theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const root = document.documentElement;
            const current = root.dataset.theme
                || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
            const next = current === "dark" ? "light" : "dark";
            root.dataset.theme = next;
            try { localStorage.setItem("theme", next); } catch (e) {}
        });
    }

    // Highlight the nav link of the section in view
    const links = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
    if (links.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((a) => a.classList.toggle("active", a.hash === "#" + entry.target.id));
            });
        }, { rootMargin: "-40% 0px -55% 0px" });
        links.forEach((a) => {
            const section = document.querySelector(a.hash);
            if (section) observer.observe(section);
        });
    }
})();
