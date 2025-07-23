"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Send,
  Mail,
  Sun,
  Moon,
  Laptop,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

type Theme = "light" | "dark" | "system";
type Language = "ru" | "en";

interface Project {
  title: Record<Language, string>;
  description: Record<Language, string>;
  features: Record<Language, string[]>;
  technologies?: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export default function Portfolio() {
  const [lang, setLang] = useState<Language>("ru");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (t: Theme) => {
      if (t === "dark") {
        root.classList.add("dark");
      } else if (t === "light") {
        root.classList.remove("dark");
      } else {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        isDark ? root.classList.add("dark") : root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    if (theme === "system") {
      const mqListener = (e: MediaQueryListEvent) => {
        applyTheme("system");
      };
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", mqListener);

      return () => mediaQuery.removeEventListener("change", mqListener);
    }
  }, [theme]);

  // Load projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/data/projects.json");
        if (!response.ok) throw new Error("Failed to load projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Content translations
  const content = {
    ru: {
      name: "Андрей Суворов",
      hero: [
        "Строю цифровые системы.",
        "Автоматизирую. Оптимизирую. Упрощаю.",
        "Инженер нового поколения.",
      ],
      about: [
        "Руководитель отдела подготовки производства с 10-летним опытом в строительстве.",
        "Магистр автоматизации технологических процессов.",
        "Специализация: Industrial AI, Computer Vision и автоматизация производства.",
      ],
      contactNote:
        "Пишите мне по e-mail или в Telegram, буду рад сотрудничеству!",
      signature: "Соединяю инженерное мышление и цифровую трансформацию.",
      diagram: ["Python / JS", "IoT/Raspberry Pi", "CV / LLM"],
      loadFailMessage:
        "Не удалось загрузить проекты. Пожалуйста, попробуйте позже.",
      sections: {
        about: "Обо мне",
        skills: "Навыки",
        projects: "Проекты",
        contact: "Контакты",
      },
    },
    en: {
      name: "Andrey Suvorov",
      hero: [
        "Building digital systems.",
        "Automating. Optimizing. Simplifying.",
        "Engineer of the new era.",
      ],
      about: [
        "Production preparation manager with 10 years of experience in construction.",
        "Master's degree in Process Automation.",
        "Specialization: Industrial AI, Computer Vision and production automation.",
      ],
      contactNote:
        "Reach out via email or Telegram - I'm open to collaboration!",
      signature: "Bridging engineering thinking and digital transformation.",
      diagram: ["Python / JS", "IoT/Raspberry Pi", "CV / LLM"],
      loadFailMessage: "Failed to load projects. Please try again later.",
      sections: {
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
      },
    },
  };

  const t = content[lang];

  // Theme icons
  const themeIcons = {
    light: <Sun className="w-5 h-5" />,
    dark: <Moon className="w-5 h-5" />,
    system: <Laptop className="w-5 h-5" />,
  };

  // Sample skills data
  const skills = [
    "Python",
    "JavaScript",
    "TensorFlow",
    "PyTorch",
    "YOLO",
    "FastAPI",
    "Django",
    "KUKA",
    "Raspberry Pi",
    "LLM",
    "Computer Vision",
    "Git",
    "Flask",
    "OpenCV",
    "Pandas",
    "Streamlit",
    "TON",
    "Blockchain",
    "IoT",
    "Industrial Automation",
  ];

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto space-y-16">
      {/* Header with controls */}
      <header className="flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-50 py-4">
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t.name}
        </motion.h1>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
            aria-label="Toggle language"
          >
            {lang === "ru" ? "EN" : "RU"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setTheme(
                theme === "light"
                  ? "dark"
                  : theme === "dark"
                  ? "system"
                  : "light"
              );
            }}
            aria-label="Toggle theme"
          >
            {themeIcons[theme]}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="text-center space-y-8 pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-4">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t.name}
          </motion.h1>

          <motion.div className="text-xl text-muted-foreground space-y-2">
            {t.hero.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.3 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Tech diagram */}
        <motion.div
          className="flex justify-center pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="grid grid-cols-3 gap-4 max-w-md">
            {t.diagram.map((label, i) => (
              <motion.div
                key={i}
                className="p-3 bg-muted rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <div className="text-2xl mb-1">{["🐍", "🖥️", "👁️"][i]}</div>
                <div className="text-sm">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-4 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Button asChild variant="outline" size="icon">
            <a href="https://github.com/Aimnew" target="_blank" rel="noopener">
              <Github className="w-5 h-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon">
            <a href="https://t.me/yourusername" target="_blank" rel="noopener">
              <Send className="w-5 h-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon">
            <a href="mailto:your@email.com">
              <Mail className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </motion.section>

      {/* Navigation */}
      <motion.nav
        className="flex gap-6 justify-center sticky top-16 bg-background/80 backdrop-blur-sm py-4 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <a href="#about" className="text-sm hover:underline underline-offset-4">
          {t.sections.about}
        </a>
        <a
          href="#skills"
          className="text-sm hover:underline underline-offset-4"
        >
          {t.sections.skills}
        </a>
        <a
          href="#projects"
          className="text-sm hover:underline underline-offset-4"
        >
          {t.sections.projects}
        </a>
        <a
          href="#contact"
          className="text-sm hover:underline underline-offset-4"
        >
          {t.sections.contact}
        </a>
      </motion.nav>

      {/* About Section */}
      <motion.section
        id="about"
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold">{t.sections.about}</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          {t.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold">{t.sections.skills}</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Badge variant="outline" className="text-sm font-medium">
                {skill}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="space-y-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold">{t.sections.projects}</h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          </div>
        ) : loadError ? (
          <p className="text-center text-muted-foreground py-12">
            {t.loadFailMessage}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="h-full flex flex-col group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <h3 className="text-2xl font-semibold">
                      {project.title[lang]}
                    </h3>
                    <p className="text-muted-foreground">
                      {project.description[lang]}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {project.image && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 border">
                        <Image
                          src={project.image}
                          alt={`${project.title[lang]} preview`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <ul className="list-disc pl-6 space-y-1">
                      {project.features[lang].map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    <div className="flex gap-2 ml-auto">
                      {project.github && (
                        <Button asChild variant="ghost" size="sm">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button asChild size="sm">
                          <a href={project.demo} target="_blank" rel="noopener">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="text-center space-y-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold">{t.sections.contact}</h2>
        <p className="text-lg max-w-2xl mx-auto">{t.contactNote}</p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <a href="mailto:your@email.com">
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
          </Button>
          <Button asChild>
            <a href="https://t.me/yourusername" target="_blank" rel="noopener">
              <Send className="w-5 h-5 mr-2" />
              Telegram
            </a>
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="text-center text-sm text-muted-foreground pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>{t.signature}</p>
        <p className="mt-2">
          © {new Date().getFullYear()} {t.name}
        </p>
      </motion.footer>
    </main>
  );
}
