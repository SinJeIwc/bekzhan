import { contacts } from "@constants/contact";
import Link from "next/link";

export function Contact() {
  return (
    <article
      id="contact"
      className="container mx-auto flex min-h-screen snap-start flex-col items-center justify-center gap-4 py-25 md:gap-8"
    >
      <h2 className="text-center text-3xl md:text-4xl">Contact</h2>
      <p>
        Let's build something amazing together. Feel free to reach out for
        collaborations or just a friendly chat!
      </p>
      <section className="flex items-center justify-center gap-4">
        {contacts.map((contact) => (
          <Link
            key={contact.url}
            href={contact.url}
            className="rounded-md border p-2 transition-transform hover:scale-105 hover:border-chart-2 hover:bg-accent/50 focus:outline-none focus-visible:scale-105 focus-visible:border-chart-2"
          >
            <contact.icon />
          </Link>
        ))}
      </section>
    </article>
  );
}
