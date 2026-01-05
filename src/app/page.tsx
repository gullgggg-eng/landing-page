"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function LandingPage() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.currentTarget);
    // Твой ключ доступа
    formData.append("access_key", "063b7fa1-296a-497a-b9c2-6d9259464e42");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        (event.target as HTMLFormElement).reset();
      } else {
        console.log("Error", data);
        setResult(data.message || "Error");
      }
    } catch (error) {
      console.log("Network Error", error);
      setResult("Network Error. Check your internet or AdBlock.");
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
            Next.js 15 + Tailwind CSS. Профессиональная разработка.
          </p>
        </section>

        <section id="contact" className="py-20 px-6 max-w-xl mx-auto w-full">
          <div className="bg-slate-50 p-10 rounded-[40px] border shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">
              Оставить заявку
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                className="h-14 bg-white rounded-xl"
              />
              <Input
                type="email"
                name="email"
                placeholder="Ваш Email"
                required
                className="h-14 bg-white rounded-xl"
              />
              <Textarea
                name="message"
                placeholder="Опишите задачу"
                required
                className="min-h-30 bg-white rounded-xl"
              />

              <Button
                type="submit"
                className="w-full bg-slate-900 text-white py-8 rounded-xl hover:bg-slate-800 text-lg font-bold"
              >
                Отправить заявку
              </Button>

              {result && (
                <p className="text-center text-sm font-bold text-blue-600 mt-6 animate-pulse">
                  {result}
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
