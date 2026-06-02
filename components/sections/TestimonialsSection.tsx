import { Quote, Mail } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-28 section-white" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Social Proof"
          title="Client Feedback"
          subtitle="Collecting feedback from collaborators and clients. Check back soon."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="rounded-2xl p-8 flex flex-col items-center text-center"
              style={{ background: "#F5F5F3", border: "1px dashed rgba(0,0,0,0.12)" }}
            >
              <Quote size={28} className="mb-4" style={{ color: "rgba(0,0,0,0.1)" }} />
              <p className="text-sm text-text-muted italic mb-6 font-light">Testimonial coming soon.</p>
              <div className="w-10 h-10 rounded-full" style={{ border: "1px dashed rgba(0,0,0,0.12)" }} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-text-muted mb-5 font-light">
            Have you worked with me? I&apos;d love to feature your feedback.
          </p>
          <a
            href="mailto:johnedward1436@gmail.com?subject=Testimonial for Drawde"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-all duration-200 text-text-secondary hover:text-ink hover:border-black/30"
            style={{ border: "1px solid rgba(0,0,0,0.12)" }}
          >
            <Mail size={13} />
            Submit Testimonial
          </a>
        </div>
      </div>
    </section>
  );
}
