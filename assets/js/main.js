(function () {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  var config = window.BANTUDEV_CONFIG || {};
  var placeholderWhatsapp = "WHATSAPP_NUMBER=62XXXXXXXXXXX";
  var placeholderEmail = "EMAIL_ADDRESS=alamat@email.com";
  var whatsappNumber = config.whatsappNumber || placeholderWhatsapp;
  var emailAddress = config.emailAddress || placeholderEmail;
  var defaultMessage =
    config.defaultWhatsappMessage ||
    "Halo BantuDev, saya ingin mengajukan bantuan pengembangan software gratis.";
  var emailSubject = config.emailSubject || "Konsultasi Proyek Digital";

  function cleanWhatsappNumber(value) {
    var rawValue = String(value || "").replace("WHATSAPP_NUMBER=", "").trim();
    if (!rawValue || rawValue.indexOf("X") !== -1) {
      return "62XXXXXXXXXXX";
    }

    return rawValue.replace(/[^\d]/g, "");
  }

  function cleanEmail(value) {
    return String(value || "").replace("EMAIL_ADDRESS=", "").trim();
  }

  function whatsappUrl(message) {
    var number = cleanWhatsappNumber(whatsappNumber) || "62XXXXXXXXXXX";
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message || defaultMessage);
  }

  function emailUrl(body) {
    var email = cleanEmail(emailAddress) || "alamat@email.com";
    var url = "mailto:" + email + "?subject=" + encodeURIComponent(emailSubject);
    if (body) {
      url += "&body=" + encodeURIComponent(body);
    }
    return url;
  }

  function updateContactLinks() {
    document.querySelectorAll("[data-whatsapp-link]").forEach(function (link) {
      link.setAttribute("href", whatsappUrl(defaultMessage));
    });

    document.querySelectorAll("[data-email-link]").forEach(function (link) {
      link.setAttribute("href", emailUrl());
    });
  }

  function setupNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector("[data-nav-links]");
    var links = Array.prototype.slice.call(document.querySelectorAll("[data-nav-link]"));
    var sections = links
      .map(function (link) {
        var id = link.getAttribute("href");
        return id ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        if (menu && toggle) {
          menu.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    if ("IntersectionObserver" in window && sections.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }
            var id = "#" + entry.target.id;
            links.forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === id);
            });
          });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
      );

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }
  }

  function setError(form, name, message) {
    var error = form.querySelector('[data-error-for="' + name + '"]');
    if (error) {
      error.textContent = message || "";
    }
  }

  function valueOf(form, name) {
    var element = form.elements[name];
    if (!element) {
      return "";
    }

    if (element instanceof RadioNodeList) {
      return element.value;
    }

    return String(element.value || "").trim();
  }

  function validateForm(form) {
    var fields = [
      "name",
      "need",
      "description",
      "currentCondition",
      "technology",
      "expectedResult",
      "sourceCode",
      "contact",
      "portfolioPermission"
    ];
    var valid = true;

    fields.forEach(function (field) {
      setError(form, field, "");
    });

    if (valueOf(form, "name").length < 2) {
      setError(form, "name", "Nama minimal 2 karakter.");
      valid = false;
    }

    if (!valueOf(form, "need")) {
      setError(form, "need", "Pilih jenis kebutuhan.");
      valid = false;
    }

    if (valueOf(form, "description").length < 12) {
      setError(form, "description", "Deskripsi masalah minimal 12 karakter.");
      valid = false;
    }

    if (valueOf(form, "currentCondition").length < 8) {
      setError(form, "currentCondition", "Jelaskan kondisi sistem saat ini.");
      valid = false;
    }

    if (valueOf(form, "technology").length < 2) {
      setError(form, "technology", "Isi teknologi yang digunakan, atau tulis belum tahu.");
      valid = false;
    }

    if (valueOf(form, "expectedResult").length < 8) {
      setError(form, "expectedResult", "Jelaskan hasil yang diharapkan.");
      valid = false;
    }

    if (!valueOf(form, "sourceCode")) {
      setError(form, "sourceCode", "Pilih status source code.");
      valid = false;
    }

    if (valueOf(form, "contact").length < 5) {
      setError(form, "contact", "Isi kontak yang dapat dihubungi.");
      valid = false;
    }

    if (!valueOf(form, "portfolioPermission")) {
      setError(form, "portfolioPermission", "Pilih izin portofolio.");
      valid = false;
    }

    return valid;
  }

  function buildMessage(form) {
    return [
      "Halo BantuDev, saya ingin mengajukan bantuan pengembangan software gratis.",
      "",
      "Nama: " + valueOf(form, "name"),
      "Jenis kebutuhan: " + valueOf(form, "need"),
      "Kondisi sistem: " + valueOf(form, "currentCondition"),
      "Teknologi: " + valueOf(form, "technology"),
      "Masalah: " + valueOf(form, "description"),
      "Hasil yang diharapkan: " + valueOf(form, "expectedResult"),
      "Source code tersedia: " + valueOf(form, "sourceCode"),
      "Izin portofolio: " + valueOf(form, "portfolioPermission"),
      "Kontak yang dapat dihubungi: " + valueOf(form, "contact"),
      "",
      "Saya memahami bahwa pengajuan ini tidak otomatis diterima dan pengerjaan bergantung pada kemampuan, ruang lingkup, keamanan, legalitas, serta kapasitas waktu."
    ].join("\n");
  }

  function setupContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm(form)) {
        focusFirstError(form);
        return;
      }

      window.location.href = whatsappUrl(buildMessage(form));
    });

    form.querySelectorAll("[data-email-submit]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        if (!validateForm(form)) {
          focusFirstError(form);
          return;
        }

        window.location.href = emailUrl(buildMessage(form));
      });
    });
  }

  function focusFirstError(form) {
    var firstError = form.querySelector(".field-error:not(:empty)");
    if (firstError) {
      firstError.scrollIntoView({ block: "center" });
    }
  }

  updateContactLinks();
  setupNavigation();
  setupContactForm();
})();
