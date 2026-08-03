export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  service: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ravi Kumar Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
    service: "Home Loan",
    quote:
      "Kavya Financial Services made my home loan process incredibly smooth. They compared rates across 5 banks and got me a deal 0.4% lower than what I was quoted directly. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "t2",
    name: "Lakshmi Prasanna",
    location: "Vijayawada, Andhra Pradesh",
    rating: 5,
    service: "Loan Against Property",
    quote:
      "I needed urgent funds for my business expansion. The team at Kavya helped me get a loan against property approved within 8 days, with excellent guidance at every step.",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: "t3",
    name: "Suresh Babu",
    location: "Bangalore, Karnataka",
    rating: 5,
    service: "Real Estate",
    quote:
      "Bought my first villa through Kavya's real estate team. They were transparent about pricing, helped verify all legal documents, and even arranged the home loan.",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: "t4",
    name: "Anjali Sharma",
    location: "Hyderabad, Telangana",
    rating: 5,
    service: "GST Filing",
    quote:
      "Their taxation team handles my company's GST filing every month without a single delay. Professional, prompt, and always available to answer questions.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "t5",
    name: "Mohammed Irfan",
    location: "Vizag, Andhra Pradesh",
    rating: 4,
    service: "Business Loan",
    quote:
      "Got an unsecured business loan for my trading company within a week. The eligibility calculator on their website gave me a very accurate estimate beforehand.",
    avatar: "https://i.pravatar.cc/150?img=51",
  },
  {
    id: "t6",
    name: "Deepika Rao",
    location: "Mysuru, Karnataka",
    rating: 5,
    service: "Education Loan",
    quote:
      "Kavya helped my son secure an education loan for his Masters abroad. They handled the entire co-applicant documentation and negotiated a great interest rate.",
    avatar: "https://i.pravatar.cc/150?img=26",
  },
];
