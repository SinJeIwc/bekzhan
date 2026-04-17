import { contacts } from "@constants/contact";
import Link from "next/link";

export function Contact() {
  return (
    <article
      id="contact"
      className="container flex flex-col items-center justify-center min-h-screen gap-4 mx-auto md:gap-8 py-25 snap-start"
    >
      <h2 className="text-3xl text-center md:text-4xl">Contact</h2>
      <p>
        Let's build something amazing together. Feel free to reach out for
        collaborations or just a friendly chat!
      </p>
      <section className="flex items-center justify-center gap-4">
        {contacts.map((contact) => (
          <Link
            key={contact.url}
            href={contact.url}
            className="p-2 transition-transform border rounded-md hover:bg-accent/50 hover:border-chart-2 hover:scale-105 focus-visible:border-chart-2 focus:outline-none focus-visible:scale-105"
          >
            <contact.icon />
          </Link>
        ))}
      </section>
    </article>
  );
}
