"use client";

import { Lightbulb, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function ExampleSection() {
  return (
    <section className="w-full py-16 sm:py-20 bg-muted">
      <div className="w-full px-4 sm:px-6">
        {/* Titre */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-100 dark:bg-amber-950/30 mb-4">
              <Lightbulb className="text-amber-600 dark:text-amber-400" size={28} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Exemple concret
            </h2>
            <p className="text-base text-muted-foreground">
              Voyez comment la plateforme vous aide au quotidien
            </p>
          </div>
        </ScrollReveal>

        {/* Contenu */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="bg-card rounded-2xl p-8 sm:p-10 border-border shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Un évier bouché ?
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-5 bg-muted rounded-xl border-border hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all">
                <CheckCircle className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" size={24} />
                <p className="text-foreground text-lg">
                  Si c&apos;est <strong>à votre charge</strong> (entretien courant)
                </p>
              </div>
              <div className="flex items-start gap-3 p-5 bg-muted rounded-xl border-border hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50/50 dark:hover:bg-green-950/20 transition-all">
                <CheckCircle className="text-green-600 dark:text-green-400 shrink-0 mt-1" size={24} />
                <p className="text-foreground text-lg">
                  Comment <strong>vérifier</strong>
                </p>
              </div>
              <div className="flex items-start gap-3 p-5 bg-muted rounded-xl border-border hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-all">
                <CheckCircle className="text-purple-600 dark:text-purple-400 shrink-0 mt-1" size={24} />
                <p className="text-foreground text-lg">
                  Comment <strong>déboucher</strong>
                </p>
              </div>
              <div className="flex items-start gap-3 p-5 bg-muted rounded-xl border-border hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-all">
                <CheckCircle className="text-orange-600 dark:text-orange-400 shrink-0 mt-1" size={24} />
                <p className="text-foreground text-lg">
                  Quand <strong>contacter le bailleur</strong>
                </p>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-xl border-border">
              <p className="text-foreground leading-relaxed">
                Cela correspond exactement aux règles classiques d&apos;entretien du logement, 
                comme le débouchage, l&apos;entretien des joints ou des équipements courants.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Button asChild size="lg" className="gap-2 rounded-lg px-8 py-6 text-lg shadow-xl hover:scale-105 transition-transform">
                <Link href="/client/chat">
                  Essayer maintenant
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
