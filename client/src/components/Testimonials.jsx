import { Star, Quote } from "lucide-react";

const reviews = [
  { id: 1, name: "Anita Desai", text: "The personalized touch they added to my gift was absolutely stunning. Highly recommend for any special occasion!", rating: 5, role: "Verified Customer" },
  { id: 2, name: "Meera Patel", text: "Giftora Studio made it so easy to design a custom mug for my dad. The print quality is top-notch and delivery was fast.", rating: 5, role: "Verified Customer" },
  { id: 3, name: "Arjun Singh", text: "Found the perfect anniversary hamper here. The packaging was beautiful and the items felt very premium.", rating: 5, role: "Verified Customer" },
  { id: 4, name: "Rahul Verma", text: "The corporate gift sets impressed our clients. Professional service and fast delivery.", rating: 5, role: "Corporate Client" },
  { id: 5, name: "Sana Khan", text: "Best place for customized jewelry. My name necklace looks so elegant and dainty.", rating: 5, role: "Verified Customer" },
  { id: 6, name: "Vikram Joshi", text: "The moon lamp is magic! Seeing our photo on a glowing moon was the best surprise ever.", rating: 5, role: "Verified Customer" }
];

export default function Testimonials() {
  return (
    <section className="py-24 overflow-hidden bg-slate-50/50">
      <div className="text-center mb-16">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-coral mb-4">Customer Love</p>
        <h2 className="text-4xl font-black text-ink sm:text-5xl">What Our Community Says</h2>
      </div>
      
      <div className="relative flex w-full">
        <div className="animate-marquee flex gap-8 whitespace-nowrap py-4">
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <TestimonialCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ review }) {
  return (
    <div className="inline-block w-[380px] whitespace-normal glass-card p-8 relative shrink-0">
      <Quote className="absolute top-6 right-6 text-mint/10" size={40} />
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={14} className="fill-coral text-coral" />
        ))}
      </div>
      <p className="text-slate-600 font-medium italic mb-6 leading-relaxed">
        "{review.text}"
      </p>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-mint/10 grid place-items-center text-mint font-bold">
          {review.name[0]}
        </div>
        <div>
          <p className="font-black text-ink leading-none">{review.name}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{review.role}</p>
        </div>
      </div>
    </div>
  );
}
