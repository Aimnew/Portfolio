"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Sun, Moon, Laptop } from "lucide-react";
import { motion } from "framer-motion";

type Theme = "light" | "dark" | "system";

export default function Portfolio() {
  const [lang, setLang] = useState<"ru" | "en">("ru");
  const [projects, setProjects] = useState<any[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");

  // Apply theme: add or remove "dark" class on <html>
  useEffect(() => {
    const root = window.document.documentElement;

    function applyTheme(t: Theme) {
      if (t === "dark") {
        root.classList.add("dark");
      } else if (t === "light") {
        root.classList.remove("dark");
      } else {
        // system
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
      }
    }

    applyTheme(theme);

    if (theme === "system") {
      const mqListener = (e: MediaQueryListEvent) => {
        if (theme === "system") applyTheme("system");
      };
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", mqListener);

      return () => {
        window
          .matchMedia("(prefers-color-scheme: dark)")
          .removeEventListener("change", mqListener);
      };
    }
  }, [theme]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
        else throw new Error("Invalid project data format");
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoadError(true);
      });
  }, []);

  const content = {
    ru: {
      name: "Имя Фамилия",
      hero: [
        "Строю цифровые системы.",
        "Автоматизирую. Оптимизирую. Упрощаю.",
        "Инженер нового поколения.",
      ],
      about:
        "10 лет я создавал физическую инфраструктуру, теперь создаю цифровую. Руководил строительными проектами, теперь руковожу данными и кодом. Это не смена профессии — это эволюция мышления.",
      contactNote:
        "Пишите мне по email или в Telegram, буду рад сотрудничеству!",
      signature:
        "Я соединяю инженерное мышление и цифровую трансформацию. Готов решать сложные задачи там, где физический мир встречается с кодом.",
      diagram: ["Датчики / Видео", "Raspberry Pi", "YOLO / FastAPI"],
      loadFailMessage:
        "Не удалось загрузить список проектов. Пожалуйста, попробуйте позже.",
    },
    en: {
      name: "Name Surname",
      hero: [
        "Building digital systems.",
        "Automating. Optimizing. Simplifying.",
        "Engineer of the new era.",
      ],
      about:
        "I spent 10 years building physical infrastructure, now I build digital. Led construction teams, now I lead code and data. It’s not a career shift — it’s an evolution of mindset.",
      contactNote:
        "Reach out via email or Telegram — I’m open to collaboration!",
      signature:
        "I bridge engineering thinking and digital transformation. Ready to solve complex problems where the physical world meets code.",
      diagram: ["Sensors / Video", "Raspberry Pi", "YOLO / FastAPI"],
      loadFailMessage: "Failed to load project list. Please try again later.",
    },
  };

  const t = content[lang];

  // Theme icon mapping
  const themeIcons = {
    light: <Sun />,
    dark: <Moon />,
    system: <Laptop />,
  };

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-16">
      {/* Controls: Language + Theme */}
      <div className="flex justify-end gap-4 items-center">
        {/* Language Toggle */}
        <Button
          variant="ghost"
          onClick={() => setLang(lang === "ru" ? "en" : "ru")}
        >
          {lang === "ru" ? "EN" : "RU"}
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          onClick={() => {
            setTheme(
              theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
            );
          }}
          title="Toggle theme"
        >
          {themeIcons[theme]}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="text-center space-y-6">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t.name}
        </motion.h1>

        <motion.div className="text-xl text-muted-foreground space-y-2">
          {t.hero.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 2 }}
            >
              {line}
            </motion.div>
          ))}
        </motion.div>

        {/* Simple Block Diagram Illustration */}
        <div className="flex justify-center pt-6">
          <div className="grid grid-cols-3 gap-4">
            {t.diagram.map((label, i) => (
              <div key={i} className="p-2 bg-muted rounded-xl">
                {["📦", "⚙️", "🧠"][i]} {label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <a
            href="https://github.com/Aimnew"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
          <a href="mailto:your@email.com">
            <Mail />
          </a>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold">
          {lang === "ru" ? "Обо мне" : "About"}
        </h2>
        <p className="text-lg leading-relaxed">{t.about}</p>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold">
          {lang === "ru" ? "Навыки" : "Skills"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <span className="bg-muted px-3 py-1 rounded-full">Python</span>
          <span className="bg-muted px-3 py-1 rounded-full">TensorFlow</span>
          <span className="bg-muted px-3 py-1 rounded-full">PyTorch</span>
          <span className="bg-muted px-3 py-1 rounded-full">YOLO</span>
          <span className="bg-muted px-3 py-1 rounded-full">FastAPI</span>
          <span className="bg-muted px-3 py-1 rounded-full">React</span>
          <span className="bg-muted px-3 py-1 rounded-full">Django</span>
          <span className="bg-muted px-3 py-1 rounded-full">KUKA</span>
          <span className="bg-muted px-3 py-1 rounded-full">Raspberry Pi</span>
          <span className="bg-muted px-3 py-1 rounded-full">LLM</span>
        </div>
      </motion.section>

      {/* Highlight Project Section */}
      <motion.section
        className="space-y-6 bg-muted/10 p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold">
          {lang === "ru" ? "Проект-герой" : "Hero Project"}
        </h2>
        <p className="text-muted-foreground text-lg">
          {lang === "ru"
            ? "Компактная система видеодетекции объектов на Raspberry Pi с серверной обработкой через FastAPI и YOLOv5."
            : "Compact object detection system using Raspberry Pi, FastAPI and YOLOv5 for edge + cloud inference."}
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            {lang === "ru"
              ? "Реальное время, потоковое видео"
              : "Real-time video streaming"}
          </li>
          <li>
            {lang === "ru"
              ? "Автоматическая реакция на события"
              : "Automated event reaction"}
          </li>
          <li>
            {lang === "ru"
              ? "Разработка от клиента до сервера"
              : "End-to-end development"}
          </li>
        </ul>
      </motion.section>

      {/* Projects from JSON */}
      <motion.section
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold">
          {lang === "ru" ? "Проекты" : "Projects"}
        </h2>
        {loadError ? (
          <p className="text-red-500 italic">{t.loadFailMessage}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((proj, i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold">{proj.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {proj.description?.[lang]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-3xl font-semibold">
          {lang === "ru" ? "Контакты" : "Contact"}
        </h2>
        <p>{t.contactNote}</p>
      </motion.section>

      <motion.footer
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {t.signature}
      </motion.footer>
    </main>
  );
}
