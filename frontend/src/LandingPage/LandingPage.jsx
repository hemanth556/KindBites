
import { useState } from "react";
import {
  ArrowRight,
  Heart,
  Menu,
  X,
  Utensils,
  HandHeart,
  Truck,
  Leaf,
  Users,
  ShieldCheck,
  Clock,
  MapPin,

} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

import logo from "../assets/kindbites-logo.png";

const roles = [
  {
    icon: Utensils,
    title: "Food Donors",
    description:
      "Restaurants, hotels, hostels and individuals can share surplus fresh food instead of letting it go to waste.",
    color: "bg-orange-100 text-orange-600",
    link: "Register as Donor",
  },
  {
    icon: HandHeart,
    title: "NGO Partners",
    description:
      "Discover available food donations, coordinate collections and distribute meals to communities in need.",
    color: "bg-green-100 text-green-700",
    link: "Join as NGO",
  },
  {
    icon: Truck,
    title: "Volunteers",
    description:
      "Become a part of the movement. Help collect, transport and deliver food to people who need it.",
    color: "bg-yellow-100 text-yellow-700",
    link: "Become a Volunteer",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "Real-time Donations",
    description:
      "Find available food donations and respond before they go to waste.",
  },
  {
    icon: MapPin,
    title: "Location-based Matching",
    description:
      "Connect nearby donors, NGOs and volunteers for faster food collection.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Community",
    description:
      "Build a reliable network of verified donors and NGO partners.",
  },
  {
    icon: Leaf,
    title: "Reduce Food Waste",
    description:
      "Make surplus food useful and contribute towards a sustainable future.",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFEFA] text-[#173D2A]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-green-100 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">

          <a href="#" className="flex items-center">
            <img
              src={logo}
              alt="KindBites - Share Food, Spread Kindness"
              className="h-14 w-auto object-contain"
            />
          </a>

          <div className="hidden items-center gap-9 md:flex">
            <a href="#how-it-works" className="text-sm font-medium hover:text-orange-500">
              How It Works
            </a>
            <a href="#about" className="text-sm font-medium hover:text-orange-500">
              About Us
            </a>
            <a href="#impact" className="text-sm font-medium hover:text-orange-500">
              Our Impact
            </a>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="/login"
              className="font-semibold text-sm hover:text-orange-500"
            >
              Login
            </a>
            <a
              href="/register"
              className="rounded-full bg-[#F28C16] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#DF7600]"
            >
              Get Started <ArrowRight className="ml-2 inline" size={16} />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {menuOpen && (
          <div className="space-y-5 border-t border-green-100 bg-white px-6 py-6 md:hidden">
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block">How It Works</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="block">About Us</a>
            <a href="#impact" onClick={() => setMenuOpen(false)} className="block">Our Impact</a>
            <a href="/login" className="block font-semibold">Login</a>
            <a href="/register" className="block rounded-full bg-orange-500 p-3 text-center font-bold text-white">
              Get Started
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 -top-20 h-96 w-96 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-green-100/70 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">

          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">
              <Heart size={15} className="text-orange-500" />
              Every meal has the power to make a difference
            </div>

            <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Good food deserves
              <span className="text-[#F28C16]"> a second chance.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
              Millions of meals go to waste every day while people go hungry.
              KindBites connects food donors, NGOs and volunteers to turn
              surplus food into meaningful change.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/register"
                className="rounded-full bg-[#F28C16] px-8 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Start Sharing Food <ArrowRight className="ml-2 inline" size={18} />
              </a>

              <a
                href="#how-it-works"
                className="rounded-full border border-green-800 px-8 py-4 font-bold text-green-900 transition hover:bg-green-50"
              >
                Explore How It Works
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-green-200">
                  <Users size={18} />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-orange-200">
                  <Heart size={18} />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-yellow-200">
                  <HandHeart size={18} />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Be part of a community that <strong className="text-green-900">cares.</strong>
              </p>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-green-100 to-orange-100 blur-xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200"
                alt="Fresh vegetables and donated food"
                className="h-[420px] w-full object-cover sm:h-[540px]"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-green-100 p-3 text-green-700">
                    <HandHeart size={25} />
                  </div>
                  <div>
                    <p className="font-bold text-green-950">
                      Small acts. Big impact.
                    </p>
                    <p className="text-sm text-gray-500">
                      Share a meal. Change a life.
                    </p>
                  </div>
                  <Heart className="ml-auto fill-orange-500 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section id="impact" className="bg-[#174C32] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              The difference we want to make
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Every bite counts.
            </h2>
            <p className="mt-3 text-green-100">
              A movement towards a world where good food never goes to waste.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              ["Zero", "Food Wasted"],
              ["More", "Meals Shared"],
              ["Stronger", "NGO Partnerships"],
              ["One", "United Community"],
            ].map(([number, label]) => (
              <div key={label}>
                <h3 className="text-3xl font-extrabold text-orange-400 sm:text-4xl">
                  {number}
                </h3>
                <p className="mt-2 text-sm text-green-100 sm:text-base">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-green-200">
            Our mission and goals, not live platform statistics.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="font-bold uppercase tracking-widest text-orange-500">
              Together we can
            </span>
            <h2 className="mt-4 text-4xl font-extrabold text-green-950 sm:text-5xl">
              One platform. Three ways to make a difference.
            </h2>
            <p className="mt-5 leading-7 text-gray-500">
              Whether you have food to share, people to feed, or time to give,
              there is a place for you at KindBites.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.title}
                  className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className={`mb-7 flex h-16 w-16 items-center justify-center rounded-2xl ${role.color}`}>
                    <Icon size={30} />
                  </div>

                  <span className="text-sm font-bold text-orange-500">
                    0{index + 1} / ROLE
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-green-950">
                    {role.title}
                  </h3>

                  <p className="mt-4 min-h-24 leading-7 text-gray-500">
                    {role.description}
                  </p>

                  <a
                    href="/register"
                    className="mt-7 inline-flex items-center font-bold text-green-800 transition group-hover:text-orange-500"
                  >
                    {role.link}
                    <ArrowRight className="ml-2" size={18} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT / WHY KINDBITES */}
      <section id="about" className="bg-[#F5F8F1] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">

          <div>
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200"
              alt="Volunteers distributing food"
              className="h-[460px] w-full rounded-[2rem] object-cover shadow-xl"
            />
          </div>

          <div>
            <span className="font-bold uppercase tracking-widest text-orange-500">
              Why KindBites?
            </span>

            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-green-950 sm:text-5xl">
              More than food sharing. It's about humanity.
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              We believe that surplus food should be an opportunity to help,
              not something that ends up in a landfill. KindBites brings
              people together through technology to create a more caring
              and sustainable community.
            </p>

            <div className="mt-8 space-y-5">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-green-950">
                        {benefit.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#174C32] px-7 py-16 text-center text-white sm:px-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-orange-400">
            <Heart size={32} />
          </div>

          <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-extrabold sm:text-5xl">
            A little food can make a big difference.
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-green-100">
            Join KindBites today. Share what you can, help those in need,
            and become part of something meaningful.
          </p>

          <a
            href="/register"
            className="mt-9 inline-flex items-center rounded-full bg-[#F28C16] px-9 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            Join the KindBites Movement
            <ArrowRight className="ml-2" size={19} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#102F21] px-6 pb-8 pt-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4 lg:px-4">

          <div className="md:col-span-2">
            <img
              src={logo}
              alt="KindBites"
              className="h-20 w-auto rounded-lg bg-white object-contain"
            />
            <p className="mt-5 max-w-sm leading-7 text-green-200">
              Share Food. Spread Kindness. Connecting people to reduce food
              waste and make a difference, one meal at a time.
            </p>

            <div className="mt-6 flex gap-4">
              {[FaInstagram, FaFacebookF, FaLinkedinIn].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={["Instagram", "Facebook", "LinkedIn"][index]}
                  className="rounded-full bg-white/10 p-3 transition hover:bg-orange-500"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-bold">Explore</h3>
            <div className="space-y-4 text-sm text-green-200">
              <a href="#about" className="block hover:text-orange-400">About Us</a>
              <a href="#how-it-works" className="block hover:text-orange-400">How It Works</a>
              <a href="#impact" className="block hover:text-orange-400">Our Impact</a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-bold">Get Involved</h3>
            <div className="space-y-4 text-sm text-green-200">
              <a href="/register" className="block hover:text-orange-400">Become a Donor</a>
              <a href="/register" className="block hover:text-orange-400">Partner NGO</a>
              <a href="/register" className="block hover:text-orange-400">Volunteer With Us</a>
              <a href="/login" className="block hover:text-orange-400">Login</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl border-t border-white/10 pt-7 text-center text-sm text-green-300">
          © {new Date().getFullYear()} KindBites. Made with ❤️ for a better tomorrow.
        </div>
      </footer>
    </div>
  );
}
