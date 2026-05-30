import { Quote, Mail } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeader from "@/components/ui/SectionHeader";

const PLACEHOLDERS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Social Proof"
          title="Client Feedback"
          subtitle="Collecting feedback from collaborators and clients. Check back soon."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PLACEHOLDERS.map(({ id }) => (
            <GlowCard
              key={id}
              className="p-8 flex flex-col items-center text-center"
              style={{ borderStyle: "dashed" } as React.CSSProperties}
            >
              <Quote size={40} className="text-foreground/10 mb-4" />
              <p className="text-sm text-muted italic mb-6">
                Testimonial coming soon.
              </p>
              <div className="w-10 h-10 rounded-full border border-dashed border-border-dark" />
            </GlowCard>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted mb-4">
            Have you worked with me? I&apos;d love to feature your feedback.
          </p>
          <a
            href="mailto:johnedward1436@gmail.com?subject=Testimonial for JE Complido"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border-dark hover:border-primary/40 text-muted hover:text-foreground rounded-xl transition-all duration-200 cursor-pointer"
          >
            <Mail size={15} />
            Submit Testimonial
          </a>
        </div>
      </div>
    </section>
  );
}
