// Import particlesJS library.  This will depend on how you've included it in your project.
//  Examples:
//  - If using a CDN:  <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
//  - If using npm/yarn: import particlesJS from 'particles.js';

//If using a CDN, no changes are needed here. If using npm/yarn, ensure 'particles.js' is installed and correctly imported.

document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        })
      })
    })
  
    // Animación para los h2
    const h2Elements = document.querySelectorAll("h2")
    h2Elements.forEach((h2) => {
      h2.addEventListener("mouseover", () => {
        h2.style.color = "#4a90e2"
      })
      h2.addEventListener("mouseout", () => {
        h2.style.color = "#e0e0e0"
      })
    })
  
    // Animación para las tecnologías
    const techItems = document.querySelectorAll(".tech-list li")
    techItems.forEach((item) => {
      item.addEventListener("mouseover", () => {
        item.style.transform = "scale(1.1) translateY(-5px)"
        item.style.transition = "all 0.3s ease"
      })
      item.addEventListener("mouseout", () => {
        item.style.transform = "scale(1) translateY(0)"
      })
    })
  
    // Funcionalidad del slider
    const slider = document.querySelector(".slider")
    const slides = document.querySelectorAll(".slide")
    const prevButton = document.querySelector(".slider-button.prev")
    const nextButton = document.querySelector(".slider-button.next")
    let currentIndex = 0
  
    function showSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1
      } else if (index >= slides.length) {
        currentIndex = 0
      } else {
        currentIndex = index
      }
      const offset = -currentIndex * 100
      slider.style.transform = `translateX(${offset}%)`
    }
  
    prevButton.addEventListener("click", () => {
      showSlide(currentIndex - 1)
    })
  
    nextButton.addEventListener("click", () => {
      showSlide(currentIndex + 1)
    })
  
    // Cambio automático de slides cada 5 segundos
    setInterval(() => {
      showSlide(currentIndex + 1)
    }, 5000)
  
    // Interacción con las cards de servicios
    const serviceCards = document.querySelectorAll(".service-card")
    serviceCards.forEach((card) => {
      card.addEventListener("click", () => {
        card.focus()
      })
  
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          card.click()
        }
      })
    })
  
    // Animación de entrada para los elementos cuando se hace scroll
    const animateOnScroll = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    }
  
    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1,
    })
  
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section)
    })
  
    // Configuración de partículas
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#87CEEB", // Color celeste
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#87CEEB",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  
    // Contact Form Handler
    const form = document.getElementById("contact-form")
  
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault()
  
        const submitBtn = form.querySelector(".submit-btn")
        submitBtn.classList.add("loading")
  
        const formData = new FormData(form)
  
        try {
          const response = await fetch("https://formspree.io/f/your-form-id", {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          })
  
          if (response.ok) {
            alert("¡Mensaje enviado con éxito!")
            form.reset()
          } else {
            throw new Error("Error al enviar el mensaje")
          }
        } catch (error) {
          console.error("Error:", error)
          alert("Lo siento, hubo un error al enviar el mensaje. Por favor, intenta nuevamente.")
        } finally {
          submitBtn.classList.remove("loading")
        }
      })
    }
  
    // Intersection Observer para la línea de tiempo
    const timelineItems = document.querySelectorAll(".timeline-item")
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            timelineObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.5,
      },
    )
  
    timelineItems.forEach((item) => {
      item.style.opacity = "0"
      timelineObserver.observe(item)
    })
  
    // Animación para la línea de tiempo
    const timelineItems2 = document.querySelectorAll(".timeline-item")
  
    const timelineObserver2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
            timelineObserver2.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.5,
      },
    )
  
    timelineItems2.forEach((item) => {
      timelineObserver2.observe(item)
    })
  })
  
  // Datos de los proyectos
  const projects = [
    {
      title: "Lector De Dedos",
      description:
        "Lector de dedos con entrenamiento de inteligencia artificial 🤖.",
      image: "/PROYECTO 1.png",
      tags: ["Python", "Mediapipe", "OpenCV "],
    },
   
    {
      title: "E-commerce De Vestimenta",
      description: "Software de gestion que consume una api, con control de usuarios y cifrado.",
      image: "/PROYECTO 3.1.png",
      tags: ["JavaScript", "Bcrypt "],
    },
    {
      title: "Software Clinica Pediatrica",
      description: "Software construido con Springboot, con funciones CRUD.",
      image: "/PROYECTO 5.png",
      tags: ["TypeScript", "Next.js", "H2", "Java", "Spring Boot", "React"],
    },
    {
      title: "Blog De Astro",
      description: "Blog informativo sobre Astro utilizando frameworks de diseño .",
      image: "/PROYECTO 4.png", 
      tags: ["React","Tailwind CSS"],
    },
    {
      title: "Api Rest Clinica Odontologica",
      description: "Software para la gestion de una clinica Odontologica con funcionalidades CRUD y test unitarios.",
      image: "/PROYECTO2.jpg",
      tags: ["java", "SpringBoot", "SQL","JavaScript","Postman","Junit","Mockito"],
    },
    {
      title: "Software De Gestion De Tareas",
      description: "Software basico para la optimizacion de tareas .",
      image: "/PROYECTO 6.png",
      tags: ["React", "Next.js"],
    },
  ]

  // Función para crear las tarjetas de proyectos
  function createProjectCards() {
    const container = document.querySelector(".projects-container")
    projects.forEach((project) => {
      const card = document.createElement("div")
      card.className = "project-card"
      card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
                    </div>
                </div>
            `
      card.addEventListener("click", () => window.open(project.link, "_blank"))
      container.appendChild(card)
    })
  }

  // Llamar a la función para crear las tarjetas de proyectos
  createProjectCards()

