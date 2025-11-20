import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Shield, Smartphone, Globe, Layers, MousePointer } from "lucide-react";

const features = [
  {
    title: "Lightning Fast",
    description: "Optimized for speed with the latest tech stack. Zero bloat, maximum performance.",
    icon: Zap,
  },
  {
    title: "Secure by Default",
    description: "Enterprise-grade security features built-in to protect your data and users.",
    icon: Shield,
  },
  {
    title: "Mobile First",
    description: "Responsive design that looks perfect on any device, from phones to desktops.",
    icon: Smartphone,
  },
  {
    title: "Global Scale",
    description: "Deploy anywhere with our cloud-agnostic infrastructure ready for scale.",
    icon: Globe,
  },
  {
    title: "Modular Architecture",
    description: "Composable components that fit together perfectly like building blocks.",
    icon: Layers,
  },
  {
    title: "Intuitive UX",
    description: "Crafted with attention to detail for the best possible user experience.",
    icon: MousePointer,
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features that matter</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to build professional applications without the headache.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                    {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
