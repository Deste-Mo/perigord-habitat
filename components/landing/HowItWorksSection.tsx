"use client";

import { Bot, MessageSquare, Mic, Camera, ArrowRight, Search, Wrench, FileText, Package, AlertTriangle, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="w-full py-20 sm:py-24 bg-muted relative overflow-hidden">
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <ScrollReveal animation="fade-up">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold mb-6 shadow-lg">
              <Sparkles size={18} />
              Processus simplifié
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
              Comment ça fonctionne ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Un processus en 2 étapes pour résoudre vos problèmes rapidement
            </p>
          </div>
        </ScrollReveal>

        {/* Contenu principal */}
        <div className="space-y-12">
          
          {/* ÉTAPE 1 : Description du problème */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="relative">
              {/* Numéro d'étape - Grand et visible */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shrink-0">
                  <span className="text-4xl font-black text-white">1</span>
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-foreground">
                    Vous décrivez votre problème
                  </h3>
                  <div className="h-1.5 w-32 bg-blue-600 rounded-full mt-3"></div>
                </div>
              </div>
              
              {/* 3 méthodes de description - SANS carte conteneur */}
              <div className="grid sm:grid-cols-3 gap-6">
                
                {/* Méthode 1 : Texte */}
                <div className="group h-full">
                  <div className="bg-card rounded-2xl p-6 h-full hover:bg-muted transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col shadow-lg">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 mx-auto mb-4 shadow-md">
                      <MessageSquare className="text-white" size={28} />
                    </div>
                    <p className="text-foreground font-bold mb-2 text-center text-lg">Par texte</p>
                    <p className="text-sm text-muted-foreground text-center mb-4">Écrivez simplement</p>
                    <div className="mt-auto">
                      <div className="px-4 py-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-800 h-12 flex items-center justify-center">
                        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium text-center">&quot;robinet qui fuit&quot;</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Méthode 2 : Vocal */}
                <div className="group h-full">
                  <div className="bg-card rounded-2xl p-6 h-full hover:bg-muted transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col shadow-lg">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-600 mx-auto mb-4 shadow-md">
                      <Mic className="text-white" size={28} />
                    </div>
                    <p className="text-foreground font-bold mb-2 text-center text-lg">À l&apos;oral</p>
                    <p className="text-sm text-muted-foreground text-center mb-4">Parlez naturellement</p>
                    <div className="mt-auto">
                      <div className="flex justify-center gap-1.5 h-12 items-end">
                        <div className="w-2 h-6 bg-indigo-400 rounded-full"></div>
                        <div className="w-2 h-9 bg-indigo-500 rounded-full"></div>
                        <div className="w-2 h-12 bg-indigo-600 rounded-full"></div>
                        <div className="w-2 h-9 bg-indigo-500 rounded-full"></div>
                        <div className="w-2 h-6 bg-indigo-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Méthode 3 : Photo/Vidéo */}
                <div className="group h-full">
                  <div className="bg-card rounded-2xl p-6 h-full hover:bg-muted transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col shadow-lg">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-purple-600 mx-auto mb-4 shadow-md">
                      <Camera className="text-white" size={28} />
                    </div>
                    <p className="text-foreground font-bold mb-2 text-center text-lg">Photo/Vidéo</p>
                    <p className="text-sm text-muted-foreground text-center mb-4">Montrez le problème</p>
                    <div className="mt-auto">
                      <div className="grid grid-cols-2 gap-2 h-12">
                        <div className="bg-purple-200 dark:bg-purple-800 rounded-lg"></div>
                        <div className="bg-purple-300 dark:bg-purple-800 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </ScrollReveal>

          {/* Flèche de connexion */}
          {/* <ScrollReveal animation="fade-up" delay={300}>
            <div className="flex justify-center py-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-1 h-12 bg-blue-300 rounded-full"></div>
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                  <ArrowRight className="text-white transform rotate-90" size={24} />
                </div>
                <div className="w-1 h-12 bg-indigo-300 rounded-full"></div>
              </div>
            </div>
          </ScrollReveal> */}

          {/* ÉTAPE 2 : Accompagnement du système */}
          <ScrollReveal animation="fade-up" delay={500}>
            <div className="relative">
              {/* Numéro d'étape - Grand et visible */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shrink-0">
                  <span className="text-4xl font-black text-white">2</span>
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black text-foreground">
                    Le système vous accompagne
                  </h3>
                  <div className="h-1.5 w-32 bg-indigo-600 rounded-full mt-3"></div>
                </div>
              </div>
              
              {/* 4 fonctionnalités en grille 4 colonnes - SANS carte conteneur */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Fonctionnalité 1 : Diagnostic */}
                  <div className="bg-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 hover:shadow-xl shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
                          <Search className="text-white" size={26} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-600 border-3 border-card flex items-center justify-center shadow-md">
                          <span className="text-xs font-black text-white">1</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-foreground mb-2">Diagnostic complet</h4>
                        <div className="h-1 w-16 bg-indigo-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                        <span className="text-sm text-foreground font-medium">Identification du problème</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                        <span className="text-sm text-foreground font-medium">Responsable (code couleur)</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                        <span className="text-sm text-foreground font-medium">Prise en charge des frais</span>
                      </div>
                    </div>
                  </div>

                  {/* Fonctionnalité 2 : Solutions */}
                  <div className="bg-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 hover:shadow-xl shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center shadow-md">
                          <Wrench className="text-white" size={26} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 border-3 border-card flex items-center justify-center shadow-md">
                          <span className="text-xs font-black text-white">2</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-foreground mb-2">Solutions pratiques</h4>
                        <div className="h-1 w-16 bg-green-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 p-2.5 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        <span className="text-sm text-foreground font-medium">Étapes de réparation</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        <span className="text-sm text-foreground font-medium">Conseils d&apos;entretien</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                        <span className="text-sm text-foreground font-medium">Tutoriels vidéo</span>
                      </div>
                    </div>
                  </div>

                  {/* Fonctionnalité 3 : Signalement */}
                  <div className="bg-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 hover:shadow-xl shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center shadow-md">
                          <FileText className="text-white" size={26} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-purple-500 border-3 border-card flex items-center justify-center shadow-md">
                          <span className="text-xs font-black text-white">3</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-foreground mb-2">Aide au signalement</h4>
                        <div className="h-1 w-16 bg-orange-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 p-2.5 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                        <span className="text-sm text-foreground font-medium">Description guidée</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                        <span className="text-sm text-foreground font-medium">Informations nécessaires</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-orange-600"></div>
                        <span className="text-sm text-foreground font-medium">Suivi de l&apos;incident</span>
                      </div>
                    </div>
                  </div>

                  {/* Fonctionnalité 4 : Équipements */}
                  <div className="bg-card rounded-2xl p-6 hover:bg-muted transition-all duration-300 hover:shadow-xl shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                          <Package className="text-white" size={26} />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 border-3 border-card flex items-center justify-center shadow-md">
                          <span className="text-xs font-black text-white">4</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-foreground mb-2">Gestion équipements</h4>
                        <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 p-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-foreground font-medium">Notices d&apos;utilisation</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-foreground font-medium">Identification matériel</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-foreground font-medium">Mode d&apos;emploi</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Cas particuliers */}
                <div className="bg-card rounded-2xl p-6 border-2 border-yellow-300 dark:border-yellow-700 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-yellow-600 flex items-center justify-center shadow-md shrink-0">
                      <AlertTriangle className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-black text-foreground mb-3">
                        Cas particuliers identifiés
                      </h4>
                      <p className="text-foreground mb-4 leading-relaxed">
                        Le système détecte automatiquement les situations qui peuvent modifier les responsabilités
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {['Vétusté', 'Mauvaise utilisation', 'Sinistre', 'Contrats spécifiques'].map((cas, idx) => (
                          <div key={idx} className="px-4 py-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border-2 border-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-950/40 transition-colors">
                            <span className="text-sm font-bold text-foreground">{cas}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
