import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Abstract_minimalist_geometric_3D_shapes_with_soft_lighting_32f8a712.png";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Introducing ilmAI 1.0</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-[1.1]">
              The Intelligent Future of <span className="text-blue-600 dark:text-blue-400">Knowledge</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              ilmAI combines advanced artificial intelligence with intuitive design to help you manage, analyze, and create knowledge faster than ever before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>

            <div className="flex gap-4 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" /> Free Tier Available
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" /> No Credit Card
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative lg:h-[600px] w-full flex items-center justify-center"
          >
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted/20 backdrop-blur-sm">
                <img 
                    src={heroImage} 
                    alt="Abstract AI Visualization" 
                    className="object-cover w-full h-full"
                />
                
                {/* Decorative floating elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
