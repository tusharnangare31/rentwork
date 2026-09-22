import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building,
  CheckCircle2,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { Container } from '../../layout/container.tsx';
import { Button } from '../../ui/button.tsx';
import { Input } from '../../ui/input.tsx';
import { Label } from '../../ui/label.tsx';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [requirement, setRequirement] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact-us" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Contact Pune’s Leading Office Furniture Rental Specialists
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have questions regarding bulk inventory, pricing tiers, or customized floor setup in Pune? Our commercial workspace advisors are ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Info matching officefurnrent.in */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-xl space-y-6 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Direct Facilities Desk
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Office Furn Rent</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Dedicated commercial workspace furniture provider for Pune IT corridors, corporations, and startups.
                </p>
              </div>

              <div className="space-y-4 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">Warehouse & Head Office:</p>
                    <p className="text-slate-400 leading-relaxed mt-0.5">
                      Survey No 48, Pune Satara Road, Behind Hotel Mastan, Mangdewadi, Katraj, Pune, Maharashtra 411046
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">Phone & WhatsApp:</p>
                    <a
                      href="tel:+919960466699"
                      className="text-amber-400 font-bold hover:underline block mt-0.5"
                    >
                      +91-9960 466 699
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">Sales Inquiries:</p>
                    <a
                      href="mailto:sales@officefurnrent.in"
                      className="text-slate-300 hover:text-white block mt-0.5"
                    >
                      sales@officefurnrent.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">Operating Hours:</p>
                    <p className="text-slate-400 mt-0.5">Monday to Saturday: 9:30 AM – 7:30 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="tel:+919960466699"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  Instant Call: +91-9960 466 699
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Our Pune commercial desk has logged your request and will call you back on <strong>{phone}</strong> shortly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="text-xs mt-2"
                >
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-slate-900">Send an Enquiry</h3>
                  <p className="text-xs text-slate-500">
                    Fill in your office furnishing requirements and receive a swift corporate proposal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lead-name" required>Your Name</Label>
                    <Input
                      id="lead-name"
                      placeholder="e.g. Vikram Shinde"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-company">Company Name</Label>
                    <Input
                      id="lead-company"
                      placeholder="e.g. Pune Tech Labs"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-phone" required>Mobile Number</Label>
                    <Input
                      id="lead-phone"
                      type="tel"
                      placeholder="e.g. 9960466699"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-email">Email Address</Label>
                    <Input
                      id="lead-email"
                      type="email"
                      placeholder="e.g. vikram@punetech.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="lead-message" required>Furniture Requirements</Label>
                    <textarea
                      id="lead-message"
                      rows={3}
                      placeholder="Please mention items needed (e.g., 15 chairs, 8 workstations, 2 cabin tables), delivery area, and preferred rental duration..."
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      required
                      className="w-full p-3 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs py-3 rounded-xl gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
