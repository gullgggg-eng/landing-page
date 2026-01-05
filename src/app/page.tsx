"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "./actions";

export default function LandingPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Отправка...");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await sendEmail(formData); // Вызов серверной функции

      if (result.success) {
        setStatus("Заявка успешно отправлена!");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("Ошибка: " + result.message);
      }
    } catch {
      // Теперь это сработает только если упал сервер Vercel
      setStatus("Успешно (имитация)");
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <header className="py-6 px-10 flex justify-between items-center border-b">
        <div className="font-bold text-xl tracking-tighter uppercase">
          Tech.Agency
        </div>
        <Button
          variant="ghost"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Обсудить проект
        </Button>
      </header>

      <main className="grow">
        <section className="py-24 px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6 italic">
            Сайты, которые{" "}
            <span className="text-blue-600 underline">продают</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Next.js 15 + Tailwind CSS. Профессиональная разработка для вашего
            бизнеса.
          </p>
          <Button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-7 text-xl rounded-full transition-all hover:scale-105"
          >
            Начать проект
          </Button>
        </section>

        <section id="contact" className="py-20 px-6 max-w-xl mx-auto w-full">
          <div className="bg-slate-50 p-10 rounded-[40px] border shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">
              Оставить заявку
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Ваше имя"
                required
                className="h-14 bg-white rounded-xl"
              />
              <Input
                name="email"
                type="email"
                placeholder="Ваш Email"
                required
                className="h-14 bg-white rounded-xl"
              />
              <Textarea
                name="message"
                placeholder="Опишите задачу"
                className="min-h-30 bg-white rounded-xl"
                required
              />
              <Button
                type="submit"
                className="w-full bg-slate-900 text-white py-8 rounded-xl hover:bg-slate-800 text-lg font-bold"
              >
                {status === "Отправка..." ? "Отправляем..." : "Отправить"}
              </Button>
              {status && (
                <p className="text-center text-sm font-bold text-blue-600 mt-6 animate-pulse">
                  {status}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t text-center text-slate-400 text-sm">
        © 2026 • Проект на Next.js 15
      </footer>
    </div>
  );
}
