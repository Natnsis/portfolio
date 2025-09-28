"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFeedback({
          type: "success",
          message: "Thank you! I’ll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setFeedback({
        type: "error",
        message:
          "Something went wrong. Please email me directly at nsisay49@gmail.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#2a2a2a] tracking-tight">
              Let's Connect
            </h2>
            <p className="mt-4 text-lg text-[#2a2a2a]/70">
              Ready to start a project or just want to chat? I’d love to hear
              from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Info & Values */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#2a2a2a]">
                  Get in Touch
                </h3>
                <div className="space-y-3 text-[#2a2a2a]/80">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span>nsisay49@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>+251 90 325 9444</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>Available for remote work</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#2a2a2a] mb-3">
                  Why Work With Me?
                </h3>
                <ul className="space-y-2 text-[#2a2a2a]/70">
                  <li>• Clear, responsive communication</li>
                  <li>• Clean, maintainable code with documentation</li>
                  <li>• User-focused design and performance</li>
                  <li>• Collaborative problem-solving</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div>
              {feedback && (
                <div
                  className={`mb-5 p-3 text-sm rounded-lg ${
                    feedback.type === "success"
                      ? "text-green-700 bg-green-50 border border-green-100"
                      : "text-red-700 bg-red-50 border border-red-100"
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-[#2a2a2a]"
                    >
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="rounded-lg border-[#e0e0e0] focus-visible:ring-1 focus-visible:ring-[#2a2a2a]/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-[#2a2a2a]"
                    >
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-lg border-[#e0e0e0] focus-visible:ring-1 focus-visible:ring-[#2a2a2a]/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="subject"
                    className="text-sm font-medium text-[#2a2a2a]"
                  >
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="rounded-lg border-[#e0e0e0] focus-visible:ring-1 focus-visible:ring-[#2a2a2a]/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-[#2a2a2a]"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="rounded-lg border-[#e0e0e0] focus-visible:ring-1 focus-visible:ring-[#2a2a2a]/30"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-[#2a2a2a] text-[#f5f5f5] hover:bg-[#1a1a1a] font-medium py-2.5"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
