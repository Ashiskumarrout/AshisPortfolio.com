(function () {
  const scriptURL = "https://script.google.com/macros/s/AKfycbwBCHPojJJUejikmx_L_ECtdBGbsKXK-bLfEIZXOpgwu1vSC5qa293Q8eBnaR4uQdJPcA/exec";
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.getElementById("msg");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  const navbarCollapse = document.getElementById("mainNav");
  const navbar = document.querySelector(".nav-glass");
  const progressBar = document.getElementById("scrollProgress");
  const sectionById = new Map();

  if (window.AOS) {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic"
    });
  }

  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  navLinks.forEach(function (link) {
    const target = link.getAttribute("href");
    if (target && target.startsWith("#")) {
      const section = document.querySelector(target);
      if (section) {
        sectionById.set(target.slice(1), section);
      }
    }

    link.addEventListener("click", function () {
      navLinks.forEach(function (item) {
        item.classList.remove("active");
      });
      link.classList.add("active");

      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  const sections = Array.from(sectionById.values());

  function updateScrollUI() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 20);
    }
  }

  function activateCurrentSection() {
    const scrollY = window.scrollY + 140;
    let currentId = "home";

    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const target = link.getAttribute("href");
      link.classList.toggle("active", target === "#" + currentId);
    });
  }

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        let topMost = null;

        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          if (!topMost || entry.boundingClientRect.top < topMost.boundingClientRect.top) {
            topMost = entry;
          }
        });

        if (topMost && topMost.target && topMost.target.id) {
          const activeId = topMost.target.id;
          navLinks.forEach(function (link) {
            const target = link.getAttribute("href");
            link.classList.toggle("active", target === "#" + activeId);
          });
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  window.addEventListener("scroll", function () {
    updateScrollUI();
    activateCurrentSection();
  });

  updateScrollUI();
  activateCurrentSection();

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      fetch(scriptURL, {
        method: "POST",
        body: new FormData(form)
      })
        .then(function () {
          if (msg) {
            msg.textContent = "Message sent successfully.";
          }
          form.reset();
          setTimeout(function () {
            if (msg) {
              msg.textContent = "";
            }
          }, 2500);
        })
        .catch(function () {
          if (msg) {
            msg.textContent = "Something went wrong. Please try again.";
          }
        });
    });
  }
})();
