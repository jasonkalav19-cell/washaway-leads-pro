import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Navigation,
  Sparkles,
  ShieldCheck,
  Droplets,
  Wind,
  CircleDollarSign,
  CheckCircle2,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroImage from "@/assets/hero-wash.jpg";

const PHONE_DISPLAY = "21 6070 4593";
const PHONE_TEL = "+302160704593";
const ADDRESS = "Πειραιώς 185, Αθήνα 118 53";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Subito+Self+Wash+24h+Πειραιώς+185+Αθήνα";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Subito Self Wash 24h — Πλυντήριο Αυτοκινήτων, Πειραιώς 185 Αθήνα" },
      {
        name: "description",
        content:
          "Self service πλυντήριο αυτοκινήτων 24 ώρες στην Πειραιώς 185, Αθήνα. Αφρός πρόπλυσης, κερί νανοτεχνολογίας, υγρό ζαντών. 4,7★ από 1.647 κριτικές. Καλέστε 21 6070 4593.",
      },
      { property: "og:title", content: "Subito Self Wash 24h — Πλυντήριο Αυτοκινήτων στην Αθήνα" },
      {
        property: "og:description",
        content:
          "Ανοιχτά όλο το 24ωρο στην Πειραιώς 185. Self wash με επαγγελματικό εξοπλισμό και εξυπηρέτηση 4,7★.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoWash",
          name: "Subito Self Wash 24h",
          telephone: PHONE_TEL,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Πειραιώς 185",
            addressLocality: "Αθήνα",
            postalCode: "118 53",
            addressCountry: "GR",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.7",
            reviewCount: "1647",
          },
        }),
      },
    ],
  }),
});

const services = [
  {
    icon: Droplets,
    title: "Αφρός Πρόπλυσης",
    text: "Ενεργός αφρός υψηλής πρόσφυσης που διαλύει λάσπη και έντομα χωρίς γρατζουνιές.",
  },
  {
    icon: Sparkles,
    title: "Κερί Νανοτεχνολογίας",
    text: "Υδροαπωθητική προστασία που κρατά το αμάξωμα γυαλιστερό για εβδομάδες.",
  },
  {
    icon: CircleDollarSign,
    title: "Υγρό Ζαντών",
    text: "Ισχυρό καθαριστικό που αφαιρεί σκόνη φρένων από ζάντες και ελαστικά.",
  },
  {
    icon: Wind,
    title: "Σκούπα & Στέγνωμα",
    text: "Επαγγελματικές σκούπες υψηλής αναρρόφησης και προγράμματα στεγνώματος.",
  },
];

const reviews = [
  {
    name: "Manthos Pappas",
    when: "πριν από έναν μήνα",
    text: "Τι να πω… Για το υγρό ζαντών, τον φοβερό αφρό πρόπλυσης, το απίστευτο κερί νανοτεχνολογίας που διαθέτουν ή την μοναδική εξυπηρέτηση του προσωπικού!!",
  },
  {
    name: "LEONIDAS ZAKAS",
    when: "πριν από 2 μήνες",
    text: "Πολλοί καλοί και ευγενικοί άνθρωποι, ειδικά ο ιδιοκτήτης. Πολύ εξυπηρετικά όλα τα παιδιά που δουλεύουν, τρέχουν να σε εξυπηρετήσουν. Το καλύτερο πλυντήριο για να πλύνεις το όχημά σου.",
  },
  {
    name: "Bil0ou 4673",
    when: "πριν από έναν μήνα",
    text: "Το προσωπικό είναι όλοι ευγενέστατοι και πάντα πρόθυμοι να βοηθήσουν. Καθαρός χώρος και οργανωμένος, με άριστες παροχές. Το καλύτερο self-wash πλυντήριο στην περιοχή μας.",
  },
];

function Stars() {
  return (
    <span className="inline-flex items-center gap-0.5 text-accent">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </span>
  );
}

function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-100 ${className}`}
      style={{ backgroundImage: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }}
    >
      <Phone className="size-5" />
      Καλέστε {PHONE_DISPLAY}
    </a>
  );
}

function QuoteForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-accent" />
        <h3 className="mt-4 text-xl font-semibold">Λάβαμε το αίτημά σας!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Θα επικοινωνήσουμε μαζί σας το συντομότερο. Για άμεση εξυπηρέτηση καλέστε μας.
        </p>
        <div className="mt-6">
          <CallButton />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <h3 className="text-xl font-semibold">Ζητήστε προσφορά</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Συμπληρώστε τα στοιχεία σας και σας καλούμε εμείς.
      </p>
      <div className="mt-5 grid gap-4">
        <div className="grid gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Ονοματεπώνυμο
          </label>
          <input
            id="name"
            required
            className="h-11 rounded-lg border border-input bg-secondary px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Γιώργος Παπαδόπουλος"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium">
            Τηλέφωνο
          </label>
          <input
            id="phone"
            type="tel"
            required
            className="h-11 rounded-lg border border-input bg-secondary px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="69XXXXXXXX"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="service" className="text-sm font-medium">
            Υπηρεσία
          </label>
          <select
            id="service"
            className="h-11 rounded-lg border border-input bg-secondary px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option>Self wash πλύσιμο</option>
            <option>Κέρωμα νανοτεχνολογίας</option>
            <option>Βιολογικός καθαρισμός</option>
            <option>Καθαρισμός ζαντών</option>
            <option>Άλλο</option>
          </select>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="msg" className="text-sm font-medium">
            Σχόλια (προαιρετικά)
          </label>
          <textarea
            id="msg"
            rows={3}
            className="rounded-lg border border-input bg-secondary p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Τύπος οχήματος, κατάσταση, προτιμώμενη ώρα..."
          />
        </div>
        <button
          type="submit"
          className="h-12 rounded-full text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
          style={{ backgroundImage: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }}
        >
          Στείλτε το αίτημα
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Απάντηση συνήθως εντός λίγων λεπτών · Ανοιχτά 24/7
        </p>
      </div>
    </form>
  );
}

const bookingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Το ονοματεπώνυμο είναι υποχρεωτικό")
    .max(100, "Το ονοματεπώνυμο πρέπει να είναι έως 100 χαρακτήρες"),
  phone: z
    .string()
    .trim()
    .min(10, "Συμπληρώστε έγκυρο τηλέφωνο")
    .max(20, "Το τηλέφωνο πρέπει να είναι έως 20 χαρακτήρες")
    .regex(/^[0-9+\s()-]+$/, "Μη έγκυρος αριθμός τηλεφώνου"),
  vehicleType: z.enum(["Ι.Χ.", "Μηχανή", "SUV / Van"], {
    message: "Επιλέξτε τύπο οχήματος",
  }),
  services: z.array(z.string()).min(1, "Επιλέξτε τουλάχιστον μία υπηρεσία"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const vehicleOptions = ["Ι.Χ.", "Μηχανή", "SUV / Van"] as const;

const serviceOptions = [
  { id: "prewash", label: "Αφρός Πρόπλυσης" },
  { id: "nano", label: "Κερί Νανοτεχνολογίας" },
  { id: "rims", label: "Υγρό Ζαντών" },
  { id: "bio", label: "Βιολογικός/Σκούπα" },
];

function BookingSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      services: [],
    },
  });

  const selectedServices = watch("services") || [];
  const selectedVehicle = watch("vehicleType");

  const toggleService = (serviceId: string) => {
    const next = selectedServices.includes(serviceId)
      ? selectedServices.filter((s) => s !== serviceId)
      : [...selectedServices, serviceId];
    setValue("services", next, { shouldValidate: true });
  };

  const onSubmit = (data: BookingFormData) => {
    // TODO: replace with server function when backend is connected
    console.log("Booking request:", data);
    setIsSubmitted(true);
    toast.success("Λάβαμε την αίτησή σας!", {
      description: "Θα επικοινωνήσουμε μαζί σας το συντομότερο.",
    });
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="border-y border-border bg-card/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div
            className="rounded-2xl border border-border bg-card p-8 text-center sm:p-10"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <CheckCircle2 className="mx-auto size-12 text-accent" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Ευχαριστούμε για την αίτησή σας!
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Λάβαμε τα στοιχεία σας και θα σας καλέσουμε σύντομα για επιβεβαίωση.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                reset();
              }}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Νέα αίτηση
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="border-y border-border bg-card/50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Αίτηση Προσφοράς / Κράτηση
          </h2>
          <p className="mt-3 text-muted-foreground">
            Συμπληρώστε τα στοιχεία σας και θα επικοινωνήσουμε μαζί σας άμεσα.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
          noValidate
        >
          <div className="grid gap-5">
            <div className="grid gap-1.5">
              <label htmlFor="fullName" className="text-sm font-medium">
                Ονοματεπώνυμο <span className="text-destructive">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Γιώργος Παπαδόπουλος"
                className="h-11 rounded-lg border border-input bg-secondary px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-destructive">{errors.fullName.message}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="phone" className="text-sm font-medium">
                Τηλέφωνο <span className="text-destructive">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="69XXXXXXXX"
                className="h-11 rounded-lg border border-input bg-secondary px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                {...register("phone")}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="vehicleType" className="text-sm font-medium">
                Τύπος Οχήματος <span className="text-destructive">*</span>
              </label>
              <Select
                value={selectedVehicle}
                onValueChange={(value) =>
                  setValue("vehicleType", value as BookingFormData["vehicleType"], {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger
                  id="vehicleType"
                  className="h-11 rounded-lg border-input bg-secondary px-3 text-sm focus:ring-2 focus:ring-ring"
                >
                  <SelectValue placeholder="Επιλέξτε τύπο οχήματος" />
                </SelectTrigger>
                <SelectContent>
                  {vehicleOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicleType && (
                <p className="text-xs text-destructive">{errors.vehicleType.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <span className="text-sm font-medium">
                Επιλογή Υπηρεσίας <span className="text-destructive">*</span>
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceOptions.map(({ id, label }) => (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-secondary p-3 transition-colors hover:border-primary/50"
                  >
                    <Checkbox
                      id={id}
                      checked={selectedServices.includes(id)}
                      onCheckedChange={() => toggleService(id)}
                      className="mt-0.5"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="text-xs text-destructive">{errors.services.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 h-12 rounded-full text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.01] active:scale-100"
              style={{ backgroundImage: "var(--gradient-cta)", boxShadow: "var(--shadow-glow)" }}
            >
              Αποστολή Αίτησης
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Απάντηση συνήθως εντός λίγων λεπτών · Ανοιχτά 24/7
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight sm:text-base">
              Subito Self Wash 24h
            </p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Πειραιώς 185, Αθήνα · Ανοιχτά 24 ώρες
            </p>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-cta)" }}
          >
            <Phone className="size-4" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Κλήση</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <img
          src={heroImage}
          alt="Self service πλυντήριο αυτοκινήτων Subito Self Wash 24h στην Αθήνα"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 sm:pb-24 sm:pt-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium backdrop-blur">
              <Clock className="size-3.5 text-accent" /> Ανοιχτά όλο το 24ωρο
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Self Wash πλυντήριο αυτοκινήτων στην Πειραιώς
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              Επαγγελματικός εξοπλισμός, αφρός πρόπλυσης, κερί νανοτεχνολογίας και προσωπικό που σας
              εξυπηρετεί οποιαδήποτε ώρα της μέρας ή της νύχτας.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CallButton />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3.5 text-base font-semibold backdrop-blur transition-colors hover:bg-secondary"
              >
                <Navigation className="size-5 text-accent" />
                Οδηγίες
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <Stars />
              <span className="font-semibold">4,7</span>
              <span className="text-muted-foreground">· 1.647 αξιολογήσεις στο Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4">
          {[
            { icon: Clock, label: "24/7 λειτουργία" },
            { icon: ShieldCheck, label: "Ασφαλή υλικά" },
            { icon: Star, label: "4,7★ · 1.647 κριτικές" },
            { icon: MapPin, label: "Πειραιώς 185, Αθήνα" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
              <Icon className="size-5 shrink-0 text-primary" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services + form */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Οι υπηρεσίες μας</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Όλα όσα χρειάζεστε για να λάμψει το αυτοκίνητό σας, σε μία στάση.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <Icon className="size-7 text-primary" />
                  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div id="quote" className="lg:sticky lg:top-24 lg:self-start">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-border bg-card/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Τι λένε οι πελάτες μας</h2>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <Stars />
            <span className="font-semibold">4,7</span>
            <span className="text-muted-foreground">από 1.647 αξιολογήσεις</span>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <blockquote
                key={r.name}
                className="rounded-2xl border border-border bg-card p-6"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <Stars />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">“{r.text}”</p>
                <footer className="mt-4 text-sm font-semibold">
                  {r.name}
                  <span className="block text-xs font-normal text-muted-foreground">{r.when}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Πού θα μας βρείτε</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  <span className="block font-semibold">{ADDRESS}</span>
                  <span className="text-muted-foreground">Plus code: XPC3+9H Αθήνα</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
                <span>
                  <span className="block font-semibold">Ανοιχτά όλο το 24ωρο</span>
                  <span className="text-muted-foreground">7 ημέρες την εβδομάδα</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
                <a href={`tel:${PHONE_TEL}`} className="font-semibold hover:text-primary">
                  {PHONE_DISPLAY}
                </a>
              </li>
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CallButton />
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-base font-semibold transition-colors hover:bg-secondary"
              >
                <Navigation className="size-5 text-accent" />
                Οδηγίες στον χάρτη
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Χάρτης — Subito Self Wash 24h, Πειραιώς 185, Αθήνα"
              src="https://www.google.com/maps?q=%CE%A0%CE%B5%CE%B9%CF%81%CE%B1%CE%B9%CF%8E%CF%82%20185%2C%20%CE%91%CE%B8%CE%AE%CE%BD%CE%B1%20118%2053&output=embed"
              className="h-80 w-full lg:h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <BookingSection />

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Subito Self Wash 24h</p>
          <p className="mt-1">
            {ADDRESS} · Ανοιχτά 24 ώρες · {PHONE_DISPLAY}
          </p>
          <p className="mt-4 text-xs">
            © {new Date().getFullYear()} Subito Self Wash 24h. Πλυντήριο αυτοκινήτων self service
            στην Αθήνα.
          </p>
        </div>
      </footer>

      {/* Mobile sticky call bar */}
      <div className="sticky bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
        <div className="flex gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-cta)" }}
          >
            <Phone className="size-4" /> Κλήση τώρα
          </a>
          <a
            href="#quote"
            className="flex flex-1 items-center justify-center rounded-full border border-border py-3 text-sm font-semibold"
          >
            Προσφορά
          </a>
        </div>
      </div>
    </div>
  );
}
