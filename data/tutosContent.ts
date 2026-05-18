export interface TutoContent {
  id: number;
  duree?: string;
  difficulte?: string;
  introduction?: string;
  materiel?: string[];
  etapes?: {
    titre: string;
    description: string;
    sousEtapes?: string[];
  }[];
  ecogestes?: string[];
  prevention?: string[];
  securite?: string[];
  astuces?: string[];
  quandAppeler?: string[];
}

const TUTOS_CONTENT: Record<number, TutoContent> = {
  // PLOMBERIE
  1: {
    id: 1,
    duree: "15-30 minutes",
    difficulte: "Facile",
    introduction: "Un bouchon dans les canalisations peut rapidement devenir problématique. Voici des méthodes naturelles et efficaces pour déboucher vos canalisations sans produits chimiques agressifs.",
    materiel: [
      "Ventouse",
      "Bicarbonate de soude (1/2 tasse)",
      "Vinaigre blanc (1/2 tasse)",
      "Eau bouillante",
      "Gants de protection",
      "Seau"
    ],
    etapes: [
      {
        titre: "Méthode naturelle (à essayer en premier)",
        description: "Cette méthode écologique est efficace pour les bouchons légers.",
        sousEtapes: [
          "Versez 1/2 tasse de bicarbonate de soude dans la canalisation",
          "Ajoutez 1/2 tasse de vinaigre blanc",
          "Laissez agir 30 minutes (la réaction chimique va dissoudre le bouchon)",
          "Versez de l'eau bouillante pour rincer"
        ]
      },
      {
        titre: "Méthode à la ventouse",
        description: "Si la méthode naturelle ne suffit pas, utilisez une ventouse.",
        sousEtapes: [
          "Remplissez l'évier d'eau (5-10 cm de hauteur)",
          "Placez la ventouse sur l'évacuation en la couvrant complètement",
          "Effectuez des mouvements de va-et-vient vigoureux pendant 20-30 secondes",
          "Répétez l'opération 5-10 fois si nécessaire",
          "Retirez la ventouse d'un coup sec"
        ]
      }
    ],
    ecogestes: [
      "Utilisez du vinaigre blanc et du bicarbonate plutôt que des produits chimiques",
      "Faites ce traitement préventif 1 fois par mois",
      "L'eau bouillante seule peut suffire pour l'entretien régulier",
      "Le marc de café aide à désodoriser les canalisations"
    ],
    prevention: [
      "Ne jetez jamais de graisse dans l'évier",
      "Utilisez une grille de protection sur l'évacuation",
      "Nettoyez régulièrement avec du vinaigre blanc",
      "Évitez les cheveux dans les canalisations de douche",
      "Versez de l'eau bouillante une fois par semaine"
    ],
    securite: [
      "Portez des gants de protection",
      "Ne mélangez jamais différents produits chimiques",
      "Aérez bien la pièce pendant l'opération",
      "En cas d'échec répété, contactez un professionnel"
    ],
    astuces: [
      "Pour les bouchons tenaces, laissez agir toute la nuit",
      "Un cintre déplié peut aider à retirer les cheveux",
      "Le sel et le bicarbonate ensemble sont très efficaces"
    ],
    quandAppeler: [
      "Le bouchon persiste après plusieurs tentatives",
      "L'eau remonte dans d'autres évacuations",
      "Odeurs nauséabondes persistantes",
      "Plusieurs canalisations bouchées simultanément"
    ]
  },
  2: {
    id: 2,
    duree: "20-40 minutes",
    difficulte: "Facile",
    introduction: "Un robinet qui goutte peut gaspiller plusieurs centaines de litres d'eau par an. Remplacer un joint usé est une réparation simple que tout locataire peut réaliser sans faire appel à un professionnel.",
    materiel: [
      "Clé à molette / clé plate",
      "Joints de rechange (caoutchouc)",
      "Pince multiprise",
      "Chiffon propre",
      "Seau",
      "Graisse silicone (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Robinet à vis classique (à essayer en premier)",
        description: "Méthode adaptée aux robinets traditionnels à tête vissée.",
        sousEtapes: [
          "Coupez l'arrivée d'eau sous l'évier",
          "Ouvrez le robinet pour vider la pression",
          "Dévissez le bouton puis la vis centrale",
          "Retirez l'ancien joint et remplacez-le",
          "Remontez dans l'ordre inverse et rouvrez l'eau"
        ]
      },
      {
        titre: "Méthode 2 — Robinet mélangeur (cartouche)",
        description: "Pour les robinets modernes à cartouche mélangeuse.",
        sousEtapes: [
          "Coupez l'arrivée d'eau",
          "Retirez la tête du robinet (cache + vis)",
          "Sortez la cartouche entière",
          "Remplacez la cartouche ou ses joints",
          "Remontez et testez l'étanchéité"
        ]
      }
    ],
    ecogestes: [
      "Un robinet qui goutte = jusqu'à 150 L/jour perdus, réparez vite",
      "Préférez des joints en caoutchouc naturel plutôt qu'en plastique",
      "Profitez-en pour installer un économiseur d'eau (mousseur)",
      "Faites ce contrôle visuel 1 fois par an"
    ],
    prevention: [
      "Ne serrez jamais trop fort le robinet à la fermeture",
      "Évitez les produits détartrants agressifs sur les joints",
      "Contrôlez vos robinets après chaque période d'absence",
      "Signalez toute fuite persistante au gestionnaire du logement"
    ],
    securite: [
      "Coupez TOUJOURS l'eau avant d'intervenir",
      "Vérifiez que la pression est bien tombée avant de démonter",
      "Ne forcez pas sur les pièces vissées, utilisez les bons outils",
      "En cas de doute sur le type de robinet, contactez un professionnel"
    ],
    astuces: [
      "Photographiez le robinet avant démontage pour faciliter le remontage",
      "Emportez l'ancien joint chez le quincaillier pour trouver le bon diamètre",
      "Un peu de graisse silicone sur le joint neuf prolonge sa durée de vie"
    ],
    quandAppeler: [
      "La fuite persiste après remplacement du joint",
      "Le robinet est corrodé ou fissuré",
      "L'arrivée d'eau ne se coupe pas correctement",
      "Vous n'avez pas accès au coupe-eau"
    ]
  },
  3: {
    id: 3,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "Une fuite d'eau non détectée peut causer des dégâts considérables en quelques heures. Quelques réflexes simples permettent de les repérer tôt et d'éviter des réparations coûteuses.",
    materiel: [
      "Lampe de poche",
      "Papier absorbant / essuie-tout",
      "Compteur d'eau",
      "Carnet de notes (pour relever le compteur)",
      "Détecteur de fuite (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Vérification visuelle régulière",
        description: "Inspection de routine pour repérer les signes de fuite.",
        sousEtapes: [
          "Inspectez le dessous de l'évier et de la salle de bain",
          "Passez un papier absorbant sur les raccords et les joints",
          "Vérifiez les murs et plafonds (auréoles, cloques de peinture)",
          "Observez le sol autour des appareils (lave-linge, lave-vaisselle)"
        ]
      },
      {
        titre: "Méthode 2 — Test du compteur",
        description: "Méthode fiable pour détecter une fuite invisible.",
        sousEtapes: [
          "Ne consommez pas d'eau pendant 1 heure",
          "Relevez l'index du compteur avant et après",
          "Si le chiffre a bougé : il y a une fuite",
          "Localisez la fuite pièce par pièce en coupant les arrivées une à une"
        ]
      }
    ],
    ecogestes: [
      "Une fuite = jusqu'à 50 000 L d'eau gaspillés par an, signalez sans attendre",
      "Relevez votre compteur chaque mois et notez-le",
      "Préférez les joints biosourcés pour vos réparations",
      "Signalez toute humidité anormale à votre bailleur rapidement"
    ],
    prevention: [
      "Coupez l'eau générale lors de longues absences",
      "Ne stockez rien sous l'évier qui pourrait masquer une fuite",
      "Contrôlez les flexibles d'alimentation (lave-linge, WC) tous les 5 ans",
      "Vérifiez les joints de fenêtre en cas d'humidité sur les murs"
    ],
    securite: [
      "En cas de fuite importante, coupez l'eau immédiatement",
      "Évitez tout contact avec de l'eau sur une installation électrique",
      "Signalez une fuite au plafond (venant du voisin) au bailleur en urgence",
      "Ne tentez pas de réparer une canalisation encastrée vous-même"
    ],
    astuces: [
      "Prenez des photos datées des zones humides pour le signalement",
      "Un colorant alimentaire dans le réservoir WC révèle une fuite silencieuse",
      "Les fuites les plus fréquentes sont au niveau des joints de WC et des flexibles"
    ],
    quandAppeler: [
      "Fuite visible dans une canalisation encastrée",
      "Dégât des eaux affectant plusieurs pièces ou le voisinage",
      "Compteur qui tourne sans consommation identifiée",
      "Humidité persistante dans les murs sans source apparente"
    ]
  },
  4: {
    id: 4,
    duree: "Lecture : 5 minutes",
    difficulte: "Facile",
    introduction: "Réduire sa consommation d'eau, c'est bon pour la planète et pour le budget. De petits gestes simples au quotidien peuvent faire baisser votre consommation de 30 à 50 %.",
    materiel: [
      "Mousseurs / économiseurs de robinet",
      "Pomme de douche économique",
      "Chasse d'eau à double débit (si remplacement à prévoir)",
      "Récupérateur d'eau de rinçage (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Réduire la consommation à la cuisine",
        description: "Gestes simples pour économiser l'eau en cuisine.",
        sousEtapes: [
          "Ne laissez pas couler l'eau pour rincer les légumes, utilisez un saladier",
          "Ne faites tourner le lave-vaisselle qu'à pleine charge",
          "Installez un mousseur sur le robinet (réduction de 50% du débit)",
          "Récupérez l'eau de cuisson refroidie pour arroser les plantes"
        ]
      },
      {
        titre: "Méthode 2 — Réduire la consommation à la salle de bain",
        description: "Économies d'eau dans la pièce d'eau la plus consommatrice.",
        sousEtapes: [
          "Remplacez les bains par des douches (6x moins d'eau)",
          "Coupez l'eau pendant le savonnage et le brossage des dents",
          "Installez une pomme de douche économique",
          "Utilisez la chasse d'eau petite débit dès que possible"
        ]
      }
    ],
    ecogestes: [
      "Une douche de 5 min = 60 L vs un bain = 150 à 200 L",
      "Chaque robinet qui goutte gaspille 35 L par jour, réparez vite",
      "Un mousseur coûte moins de 5€ et économise 50% d'eau au robinet",
      "Récupérez l'eau froide qui précède l'eau chaude pour arroser ou nettoyer"
    ],
    prevention: [
      "Évitez de jeter des lingettes ou cotons dans les WC",
      "Ne videz pas huiles ou graisses dans les éviers",
      "Détartrez régulièrement vos équipements (robinets, douche, bouilloire)",
      "Signalez tout dysfonctionnement de chasse d'eau à votre bailleur"
    ],
    securite: [
      "Vérifiez la compatibilité des économiseurs avec votre robinetterie avant installation",
      "N'installez pas vous-même un nouveau mécanisme de chasse d'eau sans accord du bailleur",
      "En cas de doute sur la qualité de l'eau, contactez votre mairie"
    ],
    astuces: [
      "Relevez votre compteur chaque mois pour suivre vos progrès",
      "Un enfant qui comprend ces gestes les garde toute sa vie",
      "Le label 'Économie d'eau' sur les équipements garantit des performances vérifiées"
    ],
    quandAppeler: [
      "Chasse d'eau qui coule en continu malgré les réglages",
      "Pression d'eau anormalement faible ou forte",
      "Compteur d'eau défectueux",
      "Installation d'équipements nécessitant une modification du réseau"
    ]
  },
  5: {
    id: 5,
    duree: "15-30 minutes",
    difficulte: "Facile",
    introduction: "Un radiateur froid en haut et chaud en bas indique la présence d'air dans le circuit. La purge est une opération simple qui améliore immédiatement l'efficacité du chauffage et réduit votre consommation d'énergie.",
    materiel: [
      "Clé de purge (ou tournevis plat)",
      "Chiffon propre",
      "Petit récipient / bol",
      "Gants de protection",
      "Protection sol (papier journal)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Purge manuelle classique",
        description: "Procédure standard pour purger un radiateur.",
        sousEtapes: [
          "Éteignez le chauffage et attendez 30 min que le système refroidisse",
          "Localisez la vis de purge (petite vis sur le côté haut du radiateur)",
          "Placez le récipient sous la vis",
          "Ouvrez légèrement la vis : vous entendrez l'air siffler",
          "Fermez dès que l'eau s'écoule sans bulles (eau continue)"
        ]
      },
      {
        titre: "Méthode 2 — Vérification après purge",
        description: "Étapes de confirmation après la purge.",
        sousEtapes: [
          "Rallumez le chauffage",
          "Vérifiez que le radiateur chauffe uniformément",
          "Contrôlez la pression du circuit (manomètre de la chaudière)",
          "Remettez de l'eau si la pression est trop basse (demandez au bailleur)"
        ]
      }
    ],
    ecogestes: [
      "Un radiateur purgé consomme jusqu'à 15% d'énergie en moins",
      "Purgez en début de saison de chauffe, pas pendant l'hiver",
      "Baissez le chauffage la nuit et lors des absences plutôt que de le couper",
      "Désaérez aussi les planchers chauffants si vous en avez"
    ],
    prevention: [
      "Purgez tous vos radiateurs 1 fois par an, en septembre",
      "Ne couvrez jamais un radiateur (meuble, rideau, linge)",
      "Évitez de régler le thermostat à fond en permanence",
      "Signalez tout bruit de gargouillis persistant à votre bailleur"
    ],
    securite: [
      "N'ouvrez jamais la vis de purge quand le système est sous pression chaude",
      "Protégez le sol et les meubles de l'eau qui peut s'échapper",
      "Ne touchez pas au circuit principal de la chaudière",
      "En cas de fuite au niveau du radiateur, fermez la vanne et contactez le bailleur"
    ],
    astuces: [
      "Commencez par purger les radiateurs du bas de l'immeuble, puis montez",
      "Si vous devez purger souvent, il y a peut-être une fuite dans le circuit",
      "Un robinet thermostatique bien réglé peut remplacer une purge fréquente"
    ],
    quandAppeler: [
      "La pression de la chaudière chute après chaque purge",
      "Le radiateur reste froid malgré la purge",
      "La vanne ou le robinet de radiateur fuit",
      "Vous entendez des bruits dans la chaudière"
    ]
  },
  6: {
    id: 6,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "Le chauffe-eau (ou ballon d'eau chaude) est un équipement essentiel du logement. Un entretien régulier prolonge sa durée de vie, évite les pannes et garantit une eau saine.",
    materiel: [
      "Chiffon et éponge",
      "Seau",
      "Clé plate ou à molette",
      "Groupe de sécurité (pièce de rechange si nécessaire)",
      "Détartrant écologique"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Vérification du groupe de sécurité (annuelle)",
        description: "Test du groupe de sécurité du chauffe-eau.",
        sousEtapes: [
          "Repérez le groupe de sécurité (petit robinet près du chauffe-eau)",
          "Placez un récipient dessous",
          "Tirez la poignée de sécurité vers vous quelques secondes",
          "Un peu d'eau doit s'écouler : le groupe fonctionne",
          "Si rien ne coule ou si ça fuit en permanence : pièce à remplacer"
        ]
      },
      {
        titre: "Méthode 2 — Détartrage et vérification extérieure",
        description: "Nettoyage et inspection visuelle du chauffe-eau.",
        sousEtapes: [
          "Coupez l'alimentation électrique du chauffe-eau",
          "Vérifiez l'absence de traces de rouille ou d'humidité autour",
          "Nettoyez les parois extérieures avec un chiffon humide",
          "Vérifiez l'état des flexibles d'alimentation (pas de gonflement ni fissure)",
          "Rallumez et vérifiez la montée en température"
        ]
      }
    ],
    ecogestes: [
      "Réglez la température à 55°C (ni trop bas = légionelle, ni trop haut = gaspillage)",
      "En cas d'absence longue, passez en mode 'antigel' plutôt que d'éteindre",
      "Isolez les tuyaux d'eau chaude pour limiter les pertes thermiques",
      "Un chauffe-eau solaire peut couvrir 50 à 70% des besoins en eau chaude"
    ],
    prevention: [
      "Faites vérifier le groupe de sécurité 1 fois par an",
      "Évitez les chocs thermiques (eau très froide dans un ballon chaud)",
      "Ne placez rien contre le chauffe-eau qui pourrait bloquer la ventilation",
      "Signalez toute variation d'eau chaude anormale à votre bailleur"
    ],
    securite: [
      "Coupez TOUJOURS le courant avant toute intervention sur le chauffe-eau",
      "Ne manipulez jamais le groupe de sécurité si le ballon est sous pression chaude",
      "Un ballon qui fuit doit être signalé immédiatement (risque électrique)",
      "L'entretien complet (anodes, résistance) est réservé à un professionnel"
    ],
    astuces: [
      "Notez la date d'installation du chauffe-eau (durée de vie moyenne : 10-15 ans)",
      "L'eau qui coule du groupe de sécurité en cours de chauffe est normale (dilatation)",
      "Un dépôt calcaire important réduit l'efficacité : signalez-le à votre bailleur"
    ],
    quandAppeler: [
      "Absence totale d'eau chaude",
      "Eau chaude avec odeur de soufre (bactéries)",
      "Fuite visible sur le ballon ou les raccords",
      "Groupe de sécurité qui coule en permanence"
    ]
  },
  7: {
    id: 7,
    duree: "10-15 minutes",
    difficulte: "Facile",
    introduction: "Le tableau électrique est le cœur de l'installation électrique de votre logement. Savoir le lire et l'utiliser correctement vous permet de réagir efficacement en cas de panne et d'éviter les situations dangereuses.",
    materiel: [
      "Lampe de poche ou frontale",
      "Étiquettes autocollantes et stylo",
      "Testeur de tension (optionnel)",
      "Notice du logement (si disponible)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Identifier et étiqueter les circuits",
        description: "Procédure pour cartographier votre tableau électrique.",
        sousEtapes: [
          "Ouvrez le tableau et repérez les disjoncteurs et le différentiel général",
          "Allumez toutes les lumières et branchez un appareil dans chaque pièce",
          "Coupez un disjoncteur et notez quelle pièce ou quel appareil est concerné",
          "Répétez pour chaque disjoncteur",
          "Collez une étiquette sous chaque disjoncteur avec la zone concernée"
        ]
      },
      {
        titre: "Méthode 2 — Réagir à une coupure générale",
        description: "Conduite à tenir en cas de panne de courant.",
        sousEtapes: [
          "Vérifiez si la coupure vient de chez vous ou de l'immeuble",
          "Localisez le disjoncteur différentiel (le plus grand, souvent en haut)",
          "Vérifiez si un disjoncteur a sauté (position basse ou intermédiaire)",
          "Débranchez les appareils suspects et réarmez les disjoncteurs",
          "Si la coupure se répète, contactez votre bailleur"
        ]
      }
    ],
    ecogestes: [
      "Un tableau bien identifié permet de couper uniquement ce qui est nécessaire",
      "Éteignez les circuits inutilisés (chambre d'ami, cave) pour réduire la consommation",
      "Les disjoncteurs qui sautent souvent signalent une surconsommation à corriger",
      "Notez vos relevés de compteur chaque mois pour suivre votre consommation"
    ],
    prevention: [
      "Ne surchargez pas les circuits (pas plus de 8 prises sur un même circuit)",
      "Signalez tout disjoncteur qui chauffe ou sent le brûlé à votre bailleur",
      "Ne bricolez jamais derrière le tableau, c'est une zone réservée aux professionnels",
      "Vérifiez que le tableau est accessible et non encombré en permanence"
    ],
    securite: [
      "Ne touchez jamais les bornes du compteur (zone ENEDIS, interdite aux locataires)",
      "Intervenez toujours avec les mains sèches et en position stable",
      "En cas d'odeur de brûlé, coupez le différentiel général et appelez un électricien",
      "Ne court-circuitez jamais un disjoncteur avec du papier aluminium ou autre"
    ],
    astuces: [
      "Photographiez votre tableau étiqueté pour retrouver facilement l'info",
      "Gardez une lampe de poche près du tableau pour les pannes nocturnes",
      "Un tableau non étiqueté à votre arrivée doit être signalé à votre bailleur"
    ],
    quandAppeler: [
      "Disjoncteur qui saute dès le réarmement",
      "Odeur de brûlé ou traces noircies dans le tableau",
      "Tableau non conforme ou très ancien (fusibles en céramique)",
      "Coupures répétées sans raison apparente"
    ]
  },
  8: {
    id: 8,
    duree: "5-15 minutes",
    difficulte: "Facile",
    introduction: "Un disjoncteur qui saute est un signal de protection, pas une panne en soi. Il coupe le courant pour éviter un incendie ou un court-circuit. Le réarmer en sécurité est un geste simple, à condition d'en comprendre la cause.",
    materiel: [
      "Lampe de poche",
      "Aucun outil nécessaire dans la plupart des cas"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Disjoncteur de circuit simple",
        description: "Réarmer un disjoncteur individuel.",
        sousEtapes: [
          "Identifiez le disjoncteur en position basse ou intermédiaire",
          "Débranchez tous les appareils de la pièce concernée",
          "Repoussez le disjoncteur vers le bas puis remontez-le d'un coup sec vers le haut",
          "Rebranchez les appareils un par un pour identifier le coupable",
          "Si le disjoncteur resaute avec un appareil précis, cet appareil est défectueux"
        ]
      },
      {
        titre: "Méthode 2 — Différentiel général qui a sauté",
        description: "Procédure pour le disjoncteur principal.",
        sousEtapes: [
          "Débranchez un maximum d'appareils dans tout le logement",
          "Tentez de remonter le différentiel (grand interrupteur en haut du tableau)",
          "S'il ne remonte pas : un disjoncteur de circuit est aussi déclenché, réarmez-le d'abord",
          "S'il remonte mais resaute : débranchez tout et rebranchez appareil par appareil",
          "L'appareil qui fait sauter le différentiel est défectueux ou présente une fuite de courant"
        ]
      }
    ],
    ecogestes: [
      "Un appareil qui fait sauter régulièrement le disjoncteur consomme de façon anormale",
      "Remplacez les vieux appareils énergivores par des modèles classe A ou supérieure",
      "Un disjoncteur qui saute souvent le soir = surcharge, répartissez mieux vos usages",
      "Évitez de tout allumer simultanément (four + lave-linge + sèche-cheveux)"
    ],
    prevention: [
      "Ne dépassez pas la capacité des circuits (voir tableau ou notice du logement)",
      "Répartissez les appareils puissants sur différents circuits",
      "Faites vérifier les appareils anciens dont le câble est abîmé",
      "Évitez les multiprises en cascade"
    ],
    securite: [
      "Ne réarmez jamais un disjoncteur si une odeur de brûlé est présente",
      "Mains sèches obligatoires pour toute manipulation du tableau",
      "Si le disjoncteur est chaud au toucher, n'insistez pas, appelez un professionnel",
      "En cas de choc électrique d'un membre du foyer, appelez le 15 ou le 18"
    ],
    astuces: [
      "Un disjoncteur qui saute régulièrement sans surcharge est peut-être vieillissant",
      "La nuit, coupez les circuits des pièces vides pour limiter les risques",
      "Noter l'heure et la circonstance de chaque déclenchement aide le technicien à diagnostiquer"
    ],
    quandAppeler: [
      "Le disjoncteur ne remonte pas ou retombe immédiatement",
      "Plusieurs disjoncteurs sautent en même temps sans raison",
      "Présence de traces noires ou d'odeur autour du tableau",
      "Chocs électriques ressentis en touchant des interrupteurs ou prises"
    ]
  },
  9: {
    id: 9,
    duree: "5-10 minutes",
    difficulte: "Facile",
    introduction: "Changer une ampoule est un geste du quotidien, mais quelques précautions s'imposent pour éviter les accidents. C'est aussi l'occasion de passer à des ampoules plus économiques et durables.",
    materiel: [
      "Ampoule de remplacement (même culot, même puissance ou équivalent LED)",
      "Escabeau ou tabouret stable",
      "Chiffon propre et sec",
      "Gants fins (optionnel, pour les halogènes)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Remplacement standard (culot E27 ou E14)",
        description: "Pour les ampoules à vis classiques.",
        sousEtapes: [
          "Éteignez l'interrupteur et attendez 2 minutes que l'ampoule refroidisse",
          "Dévissez l'ancienne ampoule dans le sens antihoraire",
          "Vérifiez le culot et la puissance maximale indiquée sur le luminaire",
          "Vissez la nouvelle ampoule sans forcer",
          "Rallumez et vérifiez le fonctionnement"
        ]
      },
      {
        titre: "Méthode 2 — Ampoule à baïonnette (culot B22)",
        description: "Pour les ampoules à baïonnette.",
        sousEtapes: [
          "Éteignez et laissez refroidir",
          "Appuyez légèrement sur l'ampoule et tournez d'un quart de tour antihoraire",
          "Retirez l'ampoule en la soulevant",
          "Insérez la nouvelle ampoule, appuyez et tournez d'un quart de tour horaire",
          "Vérifiez qu'elle est bien enclenchée avant d'allumer"
        ]
      }
    ],
    ecogestes: [
      "Une ampoule LED consomme 5 à 10 fois moins qu'une ampoule classique",
      "Durée de vie d'une LED : 15 000 à 25 000 heures vs 1 000 heures pour une incandescente",
      "Déposez les ampoules usagées en point de collecte (magasins, déchetterie)",
      "Choisissez une température de couleur adaptée : blanc chaud pour vivre, blanc froid pour travailler"
    ],
    prevention: [
      "N'utilisez jamais une ampoule de puissance supérieure à celle indiquée sur le luminaire",
      "Évitez de toucher les ampoules halogènes à mains nues (la graisse brûle le verre)",
      "Vérifiez l'état de la douille si l'ampoule clignote malgré le remplacement",
      "Ne forcez jamais sur une ampoule coincée (risque de casser le culot)"
    ],
    securite: [
      "Éteignez TOUJOURS l'interrupteur, ne vous fiez pas à la position de l'ampoule",
      "Utilisez un escabeau stable, jamais une chaise ou un carton",
      "Ne changez jamais une ampoule les mains mouillées",
      "En cas de douille noircie, n'installez pas de nouvelle ampoule, signalez-le au bailleur"
    ],
    astuces: [
      "Profitez du changement pour nettoyer l'abat-jour (30% de luminosité gagnée)",
      "Notez le type d'ampoule sur un autocollant sous le luminaire pour faciliter le prochain achat",
      "Un détecteur de présence couplé à une LED peut diviser votre facture d'éclairage par deux"
    ],
    quandAppeler: [
      "La douille est noircie, fondue ou craquelée",
      "L'ampoule neuve ne fonctionne pas et le disjoncteur a sauté",
      "Le plafonnier clignote malgré une ampoule neuve",
      "Intervention nécessaire sur une hauteur non accessible en sécurité"
    ]
  },
  10: {
    id: 10,
    duree: "Lecture : 5 minutes",
    difficulte: "Facile",
    introduction: "L'électricité représente souvent le premier poste de dépenses énergétiques du foyer. Quelques habitudes simples permettent de réduire significativement sa facture tout en réduisant son impact environnemental.",
    materiel: [
      "Multiprises avec interrupteur",
      "Ampoules LED",
      "Minuterie pour les appareils en veille (optionnel)",
      "Application de suivi de consommation (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Réduire les consommations invisibles (veille)",
        description: "Éliminer le gaspillage des appareils en veille.",
        sousEtapes: [
          "Identifiez tous les appareils laissés en veille (TV, box, chargeurs…)",
          "Regroupez-les sur des multiprises à interrupteur",
          "Coupez ces multiprises chaque soir avant de dormir",
          "Débranchez les chargeurs non utilisés (ils consomment même sans appareil)"
        ]
      },
      {
        titre: "Méthode 2 — Optimiser les gros consommateurs",
        description: "Réduire la consommation des appareils énergivores.",
        sousEtapes: [
          "Faites tourner lave-linge et lave-vaisselle en heures creuses (nuit ou week-end)",
          "Remplissez toujours complètement ces appareils avant de les lancer",
          "Préférez les programmes courts ou éco quand le linge n'est pas très sale",
          "Dégivrez régulièrement le réfrigérateur (un verglas de 3mm = +30% de consommation)"
        ]
      }
    ],
    ecogestes: [
      "La veille représente en moyenne 10% de la facture électrique annuelle",
      "Un réfrigérateur bien réglé (4°C) et dégivré consomme jusqu'à 30% de moins",
      "Éteindre la lumière en quittant une pièce peut économiser 15% sur l'éclairage",
      "Sécher le linge à l'air libre plutôt qu'au sèche-linge économise 200 à 300€/an"
    ],
    prevention: [
      "Évitez de surcharger les circuits avec trop d'appareils simultanément",
      "Faites réviser les appareils anciens qui consomment de façon anormale",
      "Ne laissez jamais un appareil chauffant sans surveillance (radiateur soufflant, fer à repasser)",
      "Signalez tout compteur qui tourne anormalement vite à votre bailleur"
    ],
    securite: [
      "Ne couvrez jamais un radiateur électrique (risque d'incendie)",
      "N'utilisez pas de rallonges pour des appareils puissants (four, lave-linge)",
      "Vérifiez l'état des cordons des appareils anciens avant utilisation",
      "En cas d'odeur électrique ou de scintillement, débranchez et signalez"
    ],
    astuces: [
      "Comparez votre consommation mensuelle d'une année sur l'autre pour mesurer vos progrès",
      "Le chauffage électrique d'appoint coûte très cher, préférez le chauffage collectif si disponible",
      "Une bouilloire économique chauffe uniquement la quantité d'eau nécessaire"
    ],
    quandAppeler: [
      "Facture électrique anormalement élevée sans explication",
      "Compteur Linky qui affiche des valeurs incohérentes",
      "Appareils qui consomment de façon excessive (vérifiable avec un wattmètre)",
      "Installation ancienne sans mise à la terre"
    ]
  },
  11: {
    id: 11,
    duree: "10 minutes",
    difficulte: "Facile",
    introduction: "Les multiprises sont pratiques mais souvent mal utilisées. Une surcharge ou une multiprise de mauvaise qualité peut provoquer un incendie. Quelques règles simples permettent de les utiliser en toute sécurité.",
    materiel: [
      "Multiprise avec parasurtenseur et interrupteur",
      "Wattmètre (optionnel, pour mesurer la charge)",
      "Étiquettes pour identifier les circuits"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Choisir la bonne multiprise",
        description: "Critères de sélection d'une multiprise adaptée.",
        sousEtapes: [
          "Vérifiez la puissance maximale indiquée sur la multiprise (en watts ou ampères)",
          "Choisissez une multiprise avec parasurtenseur pour les appareils électroniques",
          "Préférez les modèles avec interrupteur individuel par prise",
          "Vérifiez la présence du marquage CE et NF"
        ]
      },
      {
        titre: "Méthode 2 — Calculer la charge d'une multiprise",
        description: "Éviter les surcharges électriques.",
        sousEtapes: [
          "Relevez la puissance (en watts) de chaque appareil branché",
          "Additionnez toutes les puissances",
          "Ne dépassez pas 80% de la capacité maximale de la multiprise",
          "En cas de doute : une multiprise standard supporte 3 500 W maximum"
        ]
      }
    ],
    ecogestes: [
      "Une multiprise avec interrupteur évite la veille de tous les appareils connectés",
      "Regroupez les appareils par usage pour couper facilement en partant",
      "Évitez les multiprises bon marché qui gaspillent de l'énergie par leur résistance interne",
      "Débranchez les chargeurs inutilisés même sur multiprise"
    ],
    prevention: [
      "Ne branchez jamais deux multiprises l'une dans l'autre (cascade interdite)",
      "Évitez de faire passer les cordons sous un tapis ou derrière un meuble chaud",
      "Remplacez immédiatement une multiprise dont la prise est brûlée ou noircie",
      "Ne branchez pas d'appareils puissants (four, radiateur) sur une multiprise"
    ],
    securite: [
      "Une multiprise qui chauffe doit être débranchée immédiatement",
      "Ne jamais utiliser une multiprise dans une salle de bain ou à proximité de l'eau",
      "Gardez les multiprises accessibles et non recouvertes",
      "En cas d'étincelle ou d'odeur, débranchez et contactez un électricien"
    ],
    astuces: [
      "Notez la puissance totale branchée sur un autocollant sur la multiprise",
      "Une multiprise parafoudre protège vos appareils électroniques des surtensions",
      "Pour les enfants, choisissez des modèles avec obturateurs de sécurité sur les prises libres"
    ],
    quandAppeler: [
      "Manque de prises dans le logement (installation de prises supplémentaires)",
      "Prise murale qui chauffe, clignote ou fait des étincelles",
      "Câblage électrique apparent ou détérioré",
      "Besoin d'une prise dédiée pour un appareil puissant (plaque induction, climatiseur)"
    ]
  },
  12: {
    id: 12,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "Une installation électrique vieillissante ou abîmée peut provoquer un incendie ou un accident grave. Savoir reconnaître les signaux d'alerte permet d'intervenir avant qu'il ne soit trop tard.",
    materiel: [
      "Lampe de poche",
      "Testeur de prise (optionnel, moins de 10€)",
      "Appareil photo (pour documenter)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Inspection visuelle complète",
        description: "Examen méthodique de l'installation électrique.",
        sousEtapes: [
          "Parcourez le logement et inspectez chaque prise, interrupteur et plafonnier",
          "Notez toute trace de noircissement, cloquage ou chaleur anormale",
          "Vérifiez l'état des câbles visibles (sous les plinthes, derrière les meubles)",
          "Repérez les prises sans mise à la terre (2 trous ronds sans broche centrale)",
          "Photographiez et signalez tout ce qui vous semble anormal à votre bailleur"
        ]
      },
      {
        titre: "Méthode 2 — Test fonctionnel des prises",
        description: "Vérification du bon fonctionnement des prises.",
        sousEtapes: [
          "Branchez un appareil simple (lampe, chargeur) dans chaque prise",
          "Notez les prises qui ne fonctionnent pas ou qui chauffent",
          "Testez les interrupteurs : un clignotement est un signe de défaut",
          "Vérifiez que le différentiel du tableau se déclenche bien (bouton test)"
        ]
      }
    ],
    ecogestes: [
      "Une installation défectueuse consomme plus par ses résistances anormales",
      "Signaler rapidement évite des travaux lourds et coûteux plus tard",
      "Une installation aux normes permet d'utiliser des appareils économiques en toute sécurité",
      "Documentez les anomalies par écrit et en photo pour votre dossier locataire"
    ],
    prevention: [
      "Ne dissimulez jamais un défaut électrique avec du ruban adhésif",
      "Signalez toute anomalie par écrit à votre bailleur (courrier ou mail avec accusé)",
      "Ne branchez pas d'appareil puissant sur une prise ancienne sans mise à la terre",
      "Vérifiez l'état de l'installation à chaque entrée dans un nouveau logement"
    ],
    securite: [
      "En cas de choc électrique, ne touchez pas la personne : coupez le courant",
      "Une odeur de brûlé persistante = risque incendie immédiat, évacuez et appelez le 18",
      "Ne tentez jamais de réparer vous-même une prise ou un interrupteur",
      "Gardez les numéros d'urgence affichés près du tableau électrique"
    ],
    astuces: [
      "Un testeur de prise à 5€ indique instantanément si la mise à la terre est présente",
      "Conservez toutes vos correspondances avec le bailleur concernant les défauts électriques",
      "En cas de refus du bailleur d'intervenir, vous pouvez saisir la CAF ou le tribunal"
    ],
    quandAppeler: [
      "Toute anomalie constatée lors de l'inspection visuelle",
      "Disjoncteur différentiel qui ne se déclenche pas au test",
      "Prises sans mise à la terre dans une salle de bain",
      "Installation datant d'avant 1990 non rénovée"
    ]
  },
  13: {
    id: 13,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "L'entretien annuel de la chaudière est une obligation légale pour le locataire. Il permet de garantir la sécurité du foyer, d'optimiser les performances et de prolonger la durée de vie de l'appareil.",
    materiel: [
      "Chiffon propre et sec",
      "Carnet d'entretien de la chaudière",
      "Coordonnées du prestataire de maintenance",
      "Détecteur de monoxyde de carbone (fortement recommandé)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Vérifications visuelles régulières (mensuel)",
        description: "Contrôles mensuels de base de la chaudière.",
        sousEtapes: [
          "Vérifiez que la flamme pilote est allumée (bleue = normal, jaune = problème)",
          "Contrôlez la pression du circuit (entre 1 et 2 bars sur le manomètre)",
          "Vérifiez l'absence de fuite d'eau ou de gaz autour de la chaudière",
          "Assurez-vous que la ventilation de la pièce est dégagée",
          "Notez toute anomalie dans le carnet d'entretien"
        ]
      },
      {
        titre: "Méthode 2 — Préparer la visite du technicien annuelle",
        description: "Organisation de l'entretien obligatoire annuel.",
        sousEtapes: [
          "Vérifiez que vous avez bien commandé la visite annuelle obligatoire",
          "Dégagez l'accès à la chaudière et au conduit d'évacuation",
          "Rassemblez le carnet d'entretien et les anciennes factures",
          "Notez les anomalies observées dans l'année pour en informer le technicien",
          "Conservez l'attestation d'entretien remise après la visite"
        ]
      }
    ],
    ecogestes: [
      "Une chaudière entretenue consomme jusqu'à 12% de gaz en moins",
      "Réduisez la température la nuit et lors des absences (économie de 7% par degré)",
      "Le programme hebdomadaire du thermostat évite les oublis et les gaspillages",
      "Un désembouage du circuit tous les 5-10 ans améliore significativement l'efficacité"
    ],
    prevention: [
      "Ne jamais obstruer les grilles de ventilation de la chaudière",
      "Évitez de stocker des produits inflammables à proximité",
      "Vérifiez la pression avant chaque hiver (remise à niveau si besoin)",
      "Signalez toute odeur de gaz au 0 800 47 33 33 (numéro d'urgence gaz)"
    ],
    securite: [
      "Installez un détecteur de monoxyde de carbone dans la pièce de la chaudière",
      "En cas d'odeur de gaz : n'allumez rien, ouvrez les fenêtres, sortez et appelez le 18",
      "Ne tentez jamais de démonter ou réparer la chaudière vous-même",
      "L'entretien annuel est OBLIGATOIRE et à la charge du locataire (décret 87-712)"
    ],
    astuces: [
      "Prenez votre rendez-vous d'entretien dès septembre pour éviter les délais en hiver",
      "Conservez toutes les attestations d'entretien : elles peuvent vous être demandées",
      "Un robinet thermostatique sur chaque radiateur permet un meilleur confort à moindre coût"
    ],
    quandAppeler: [
      "Pression qui chute régulièrement sans raison",
      "Flamme jaune ou orange au lieu de bleue",
      "Odeur de gaz ou de brûlé près de la chaudière",
      "Chaudière qui s'éteint seule ou fait des bruits anormaux"
    ]
  },
  14: {
    id: 14,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "Un thermostat bien réglé permet de chauffer confortablement tout en réduisant significativement sa facture. La programmation hebdomadaire est l'un des gestes les plus efficaces pour maîtriser sa consommation d'énergie.",
    materiel: [
      "Thermostat (manuel, programmable ou connecté)",
      "Notice du thermostat",
      "Thermomètre d'ambiance (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Réglage d'un thermostat manuel",
        description: "Configuration d'un thermostat simple.",
        sousEtapes: [
          "Identifiez le type de thermostat (rotatif, bouton, écran)",
          "Réglez la température de confort à 19°C dans les pièces de vie",
          "Baissez à 17°C dans les chambres (pour le sommeil)",
          "En cas d'absence, réglez sur 16°C (ne jamais descendre sous 16°C en hiver)",
          "En cas d'absence prolongée, passez en mode hors-gel (7-8°C)"
        ]
      },
      {
        titre: "Méthode 2 — Programmer un thermostat numérique",
        description: "Création d'un programme hebdomadaire.",
        sousEtapes: [
          "Accédez au menu 'Programme' ou 'Planning'",
          "Créez un programme jour de semaine : 19°C le matin et le soir, 16°C la journée",
          "Créez un programme week-end selon vos habitudes",
          "Activez le mode 'Nuit' de 22h à 6h (17°C)",
          "Testez le programme et ajustez selon votre ressenti"
        ]
      }
    ],
    ecogestes: [
      "1°C de moins = 7% d'économie sur la facture de chauffage",
      "La température recommandée est 19°C dans les pièces de vie, 17°C en chambre",
      "Un thermostat programmable amortit son coût en moins d'un an",
      "Ne chauffez pas une pièce inoccupée au-delà de 16°C"
    ],
    prevention: [
      "Ne bloquez pas le thermostat avec un meuble ou un rideau (fausse lecture)",
      "Évitez de placer des sources de chaleur à proximité du thermostat",
      "Changez les piles du thermostat chaque automne",
      "Vérifiez que le thermostat correspond bien à votre type de chauffage"
    ],
    securite: [
      "Ne descendez jamais sous 16°C en hiver (risque de gel des canalisations)",
      "En cas de panne du thermostat, prévenez votre bailleur avant de le remplacer",
      "Ne modifiez pas le câblage du thermostat vous-même",
      "En cas d'absence très longue, coupez également l'eau (risque gel)"
    ],
    astuces: [
      "Un thermostat connecté peut être contrôlé depuis votre téléphone, très pratique en vacances",
      "Fermez les volets la nuit pour limiter les déperditions thermiques",
      "Aérez 10 minutes par jour, fenêtres grandes ouvertes, plutôt que laisser entrouverte des heures"
    ],
    quandAppeler: [
      "Le thermostat ne commande plus le chauffage",
      "Le chauffage reste allumé en permanence malgré le réglage",
      "Thermostat défectueux à remplacer (accord du bailleur nécessaire)",
      "Problème de zonage dans un logement avec plusieurs zones de chauffe"
    ]
  },
  15: {
    id: 15,
    duree: "Lecture : 5 minutes",
    difficulte: "Facile",
    introduction: "Le chauffage représente en moyenne 60 à 70% de la consommation énergétique d'un logement. Adopter les bons réflexes permet de rester confortable tout en réduisant considérablement sa facture et son empreinte carbone.",
    materiel: [
      "Joints de fenêtre (si courants d'air)",
      "Réflecteurs de radiateur (feuille adhésive derrière le radiateur)",
      "Robinets thermostatiques (si non présents, à demander au bailleur)",
      "Rideaux épais ou double vitrage (à défaut, film isolant)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Optimiser la chaleur existante",
        description: "Améliorer l'efficacité du chauffage sans consommer plus.",
        sousEtapes: [
          "Posez des réflecteurs derrière les radiateurs (papier alu épais ou produit dédié)",
          "Déplacez les meubles qui bloquent les radiateurs (laisser 50 cm minimum)",
          "Tirez les rideaux épais dès la nuit tombée pour conserver la chaleur",
          "Calfeutrez les courants d'air sous les portes et autour des fenêtres"
        ]
      },
      {
        titre: "Méthode 2 — Adopter les bons réflexes quotidiens",
        description: "Gestes simples pour chauffer intelligemment.",
        sousEtapes: [
          "Aérez 10 minutes le matin (fenêtres grandes ouvertes) puis refermez",
          "Profitez de la chaleur résiduelle du four après cuisson",
          "Baissez le chauffage dès que vous ouvrez une fenêtre",
          "Utilisez des robinets thermostatiques pièce par pièce"
        ]
      }
    ],
    ecogestes: [
      "Ne chauffez pas au-delà de 19°C : chaque degré supplémentaire coûte 7% de plus",
      "Un logement bien aéré (10 min/jour) retient mieux la chaleur qu'un logement confiné",
      "Les réflecteurs de radiateur sont efficaces à 90% et coûtent moins de 10€",
      "Cuisiner, faire la vaisselle, prendre une douche chaude contribuent naturellement au chauffage"
    ],
    prevention: [
      "Ne couvrez jamais un radiateur avec du linge à sécher (surchauffe et incendie)",
      "Signalez les fenêtres mal isolées à votre bailleur (obligation de décence du logement)",
      "Faites purger les radiateurs dès qu'ils chauffent mal (voir fiche dédiée)",
      "Vérifiez l'état de l'isolation des combles si vous êtes au dernier étage"
    ],
    securite: [
      "Ne jamais utiliser un four ou une cuisinière pour chauffer le logement",
      "Les chauffages d'appoint au gaz non raccordés sont dangereux (monoxyde de carbone)",
      "Installez un détecteur de CO si vous avez une chaudière, une cheminée ou un poêle",
      "Ne bloquez jamais les grilles de ventilation pour 'garder la chaleur'"
    ],
    astuces: [
      "Un tapis au sol réduit les sensations de froid sans augmenter le chauffage",
      "Les rideaux épais sur les fenêtres simples peuvent réduire les pertes de 10 à 15%",
      "Habiller davantage les enfants la nuit est plus sain et économique que surchauffer leur chambre"
    ],
    quandAppeler: [
      "Logement impossible à chauffer malgré un chauffage fonctionnel (problème d'isolation)",
      "Fenêtres ou portes tellement mal isolées qu'elles créent un courant d'air permanent",
      "Radiateurs froids malgré une chaudière en marche",
      "Facture de chauffage anormalement élevée par rapport au logement"
    ]
  },
  16: {
    id: 16,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "Une panne de chauffage en plein hiver peut rapidement devenir inconfortable, voire dangereuse. Quelques vérifications régulières permettent d'anticiper les problèmes et d'aborder la saison froide sereinement.",
    materiel: [
      "Carnet de suivi (pour noter les anomalies)",
      "Détecteur de monoxyde de carbone",
      "Thermomètre d'ambiance",
      "Coordonnées du prestataire de maintenance"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Vérifications avant l'hiver (septembre)",
        description: "Préparation du système de chauffage avant la saison froide.",
        sousEtapes: [
          "Testez le chauffage avant la saison : allumez-le et vérifiez chaque radiateur",
          "Purgez les radiateurs qui chauffent mal (voir fiche dédiée)",
          "Vérifiez la pression de la chaudière (entre 1 et 2 bars)",
          "Planifiez la visite annuelle d'entretien obligatoire",
          "Vérifiez le bon fonctionnement du thermostat et changez les piles"
        ]
      },
      {
        titre: "Méthode 2 — Surveillance mensuelle en saison",
        description: "Suivi régulier du chauffage pendant l'hiver.",
        sousEtapes: [
          "Vérifiez visuellement la chaudière : pas de fuite, flamme bleue, pas d'odeur",
          "Contrôlez la pression du circuit chauffage sur le manomètre",
          "Testez le différentiel de sécurité de la chaudière (bouton test)",
          "Notez tout bruit anormal (gargouillis, sifflement, claquement)",
          "Vérifiez que toutes les pièces atteignent la température souhaitée"
        ]
      }
    ],
    ecogestes: [
      "Un système entretenu consomme jusqu'à 15% de gaz en moins",
      "Anticipez la révision en septembre pour éviter les délais et les urgences coûteuses",
      "Un carnet de suivi permet d'anticiper les remplacements avant la panne",
      "Baissez le chauffage progressivement plutôt que de l'éteindre brutalement"
    ],
    prevention: [
      "Ne jamais couper totalement le chauffage en dessous de 0°C (risque gel)",
      "Signalez toute anomalie à votre bailleur par écrit dès qu'elle apparaît",
      "Gardez les coordonnées d'urgence du chauffagiste facilement accessibles",
      "Vérifiez que les conduits d'évacuation ne sont pas obstrués (feuilles, nids)"
    ],
    securite: [
      "Installez un détecteur de CO opérationnel avant chaque hiver",
      "En cas de panne totale avec températures négatives, signalez en urgence au bailleur",
      "Ne tentez pas de réparer vous-même un système de chauffage au gaz",
      "Aérez quotidiennement même en hiver pour éviter l'accumulation de CO"
    ],
    astuces: [
      "Testez votre chauffage dès fin août, avant la forte demande des techniciens",
      "Prenez en photo le manomètre chaque mois pour suivre l'évolution de la pression",
      "Un logement bien chauffé en amont revient moins cher qu'un logement relancé après une coupure"
    ],
    quandAppeler: [
      "Pression qui chute régulièrement malgré la remise à niveau",
      "Radiateurs froids dans une partie du logement sans raison",
      "Bruit de gargouillis persistant dans les canalisations",
      "Chaudière qui se réinitialise seule régulièrement"
    ]
  },
  17: {
    id: 17,
    duree: "30-60 minutes",
    difficulte: "Facile",
    introduction: "Une grande partie de la chaleur d'un logement s'échappe par les fenêtres, les portes et les murs mal isolés. Des gestes simples et peu coûteux permettent de réduire ces pertes et de gagner en confort sans augmenter le chauffage.",
    materiel: [
      "Joints adhésifs de fenêtre (mousse ou silicone)",
      "Bas de porte isolant (boudin)",
      "Film isolant pour fenêtres (optionnel)",
      "Réflecteurs de radiateur",
      "Ruban adhésif et ciseaux"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Calfeutrer les fenêtres et portes",
        description: "Réduire les courants d'air autour des ouvertures.",
        sousEtapes: [
          "Passez la main autour des fenêtres fermées pour détecter les courants d'air",
          "Nettoyez les rainures et retirez les anciens joints abîmés",
          "Coupez le joint adhésif neuf à la bonne longueur et appliquez-le dans la rainure",
          "Vérifiez en refermant que la fenêtre ferme correctement",
          "Posez un boudin de porte en bas des portes donnant sur l'extérieur ou les communs"
        ]
      },
      {
        titre: "Méthode 2 — Optimiser la chaleur dans les pièces",
        description: "Améliorer la répartition et la rétention de la chaleur.",
        sousEtapes: [
          "Posez des réflecteurs derrière chaque radiateur (feuille adhésive isolante)",
          "Déplacez les meubles qui bloquent le flux de chaleur des radiateurs",
          "Fermez les volets ou tirez les rideaux épais dès la nuit tombée",
          "Posez des tapis sur les sols carrelés ou en béton pour réduire la sensation de froid"
        ]
      }
    ],
    ecogestes: [
      "25% de la chaleur d'un logement s'échappe par les fenêtres, agissez en priorité",
      "Un joint de fenêtre coûte moins de 5€ et peut économiser jusqu'à 10% sur la facture",
      "Les rideaux épais fermés la nuit réduisent les déperditions de 10 à 15%",
      "Un tapis au sol réduit la sensation de froid sans consommer d'énergie supplémentaire"
    ],
    prevention: [
      "Signalez les fenêtres simple vitrage ou très mal isolées à votre bailleur (obligation de décence)",
      "Vérifiez l'état des joints tous les 2-3 ans et remplacez-les si nécessaire",
      "Ne calfeutrez pas les grilles de ventilation : l'air doit circuler même en hiver",
      "Évitez les meubles contre les murs extérieurs (favorise l'humidité)"
    ],
    securite: [
      "Ne condamnez jamais les grilles VMC ou les entrées d'air sous prétexte d'isolation",
      "Aérez 10 minutes par jour même en hiver pour renouveler l'air et éviter la condensation",
      "En cas d'humidité importante malgré le calfeutrage, signalez au bailleur (problème de structure)"
    ],
    astuces: [
      "Un thermomètre d'ambiance à 5€ vous permet de vérifier l'efficacité de vos actions",
      "Les rideaux doublés thermiquement sont un investissement rentable dès le premier hiver",
      "Signalez les ponts thermiques visibles (moisissures dans les angles) à votre bailleur"
    ],
    quandAppeler: [
      "Moisissures récurrentes malgré une bonne aération (problème d'isolation structurelle)",
      "Fenêtres impossibles à fermer correctement",
      "Murs extérieurs froids au toucher à l'intérieur (isolation insuffisante)",
      "Logement impossible à chauffer correctement malgré un chauffage fonctionnel"
    ]
  },
  18: {
    id: 18,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "Bien utiliser ses radiateurs, c'est chauffer juste, là où il faut et au bon moment. Un réglage adapté pièce par pièce permet de gagner en confort tout en réduisant sa consommation d'énergie.",
    materiel: [
      "Clé de purge",
      "Thermomètre d'ambiance",
      "Réflecteurs de radiateur (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Régler les robinets thermostatiques",
        description: "Configuration des robinets pièce par pièce.",
        sousEtapes: [
          "Identifiez le robinet thermostatique sur le côté du radiateur (tête graduée de 1 à 5)",
          "Réglez sur 3 pour les pièces de vie (environ 19°C)",
          "Réglez sur 2 pour les chambres (environ 17°C)",
          "Réglez sur 1 pour les pièces peu utilisées (environ 14°C)",
          "Fermez à 0 uniquement si la pièce est inutilisée plusieurs semaines"
        ]
      },
      {
        titre: "Méthode 2 — Optimiser le fonctionnement",
        description: "Améliorer l'efficacité des radiateurs.",
        sousEtapes: [
          "Vérifiez que rien n'obstrue le radiateur (meuble, rideau, linge)",
          "Dépoussiérez les ailettes avec un aspirateur ou une brosse longue",
          "Purgez le radiateur si le haut chauffe moins que le bas (voir fiche purge)",
          "Vérifiez que la vanne de retour (en bas du radiateur) est bien ouverte"
        ]
      }
    ],
    ecogestes: [
      "Un robinet thermostatique bien réglé évite de chauffer inutilement",
      "Ne fermez jamais complètement tous les radiateurs d'un logement (risque de gel)",
      "Dépoussiérer un radiateur améliore son efficacité de 5 à 10%",
      "Un radiateur obstrué par un canapé perd jusqu'à 30% de son efficacité"
    ],
    prevention: [
      "Ne laissez jamais du linge sécher directement sur un radiateur (surchauffe, incendie)",
      "Évitez de peindre sur les robinets thermostatiques (bloque le mécanisme)",
      "Signalez un robinet thermostatique bloqué ou cassé à votre bailleur",
      "Vérifiez en début de saison que tous les robinets tournent librement"
    ],
    securite: [
      "Ne tentez pas de démonter la vanne de radiateur sans couper le chauffage",
      "Un radiateur électrique ne doit jamais être mouillé ou placé près d'une source d'eau",
      "En cas de fuite au niveau du robinet, fermez la vanne et signalez au bailleur",
      "Ne couvrez jamais un radiateur électrique (risque d'incendie)"
    ],
    astuces: [
      "La position étoile sur le robinet thermostatique = mode hors-gel (environ 7°C)",
      "Un réflecteur de radiateur collé au mur derrière renvoie la chaleur vers la pièce",
      "En programmant le thermostat central, les robinets thermostatiques font le reste pièce par pièce"
    ],
    quandAppeler: [
      "Robinet thermostatique qui fuit ou ne répond plus",
      "Radiateur froid malgré purge et robinets ouverts",
      "Vanne de radiateur bloquée impossible à manœuvrer",
      "Remplacement d'un radiateur vétuste"
    ]
  },
  19: {
    id: 19,
    duree: "15-30 minutes",
    difficulte: "Facile",
    introduction: "Les grilles de VMC (Ventilation Mécanique Contrôlée) se bouchent progressivement avec la poussière et les graisses. Un nettoyage régulier garantit une ventilation efficace, un air sain et prévient les problèmes d'humidité et de moisissures.",
    materiel: [
      "Aspirateur avec embout brosse",
      "Éponge et eau savonneuse",
      "Brosse douce ou vieille brosse à dents",
      "Tournevis plat (pour déclipser la grille)",
      "Chiffon propre et sec"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Nettoyage des grilles en place",
        description: "Nettoyage rapide sans dépose.",
        sousEtapes: [
          "Éteignez la VMC si possible (interrupteur ou disjoncteur dédié)",
          "Passez l'embout brosse de l'aspirateur sur la grille pour retirer la poussière",
          "Nettoyez avec une éponge humide et savonneuse",
          "Rincez à l'eau claire et séchez soigneusement",
          "Rallumez la VMC et vérifiez qu'elle aspire bien (papier proche = aspiration)"
        ]
      },
      {
        titre: "Méthode 2 — Dépose et nettoyage en profondeur",
        description: "Nettoyage complet des grilles.",
        sousEtapes: [
          "Retirez la grille en la déclipsant ou en dévissant (selon le modèle)",
          "Faites tremper la grille 15 minutes dans de l'eau savonneuse tiède",
          "Brossez les lamelles avec une brosse douce pour déloger les dépôts",
          "Rincez et séchez complètement avant de reposer",
          "Vérifiez l'intérieur du conduit : signalez toute accumulation importante au bailleur"
        ]
      }
    ],
    ecogestes: [
      "Une VMC propre consomme moins d'énergie pour le même résultat",
      "Nettoyez les grilles tous les 3 mois pour éviter les nettoyages en profondeur longs",
      "Une bonne ventilation réduit l'humidité et donc les besoins en chauffage",
      "Évitez les produits chimiques forts : eau savonneuse et vinaigre blanc suffisent"
    ],
    prevention: [
      "Ne bouchez jamais une grille de VMC pour 'éviter les courants d'air'",
      "Signalez toute grille cassée ou absente à votre bailleur",
      "Nettoyez aussi les bouches de soufflage (cuisine, salle de bain)",
      "Évitez de peindre sur les grilles (bouche les orifices)"
    ],
    securite: [
      "Coupez toujours la VMC avant d'intervenir sur les grilles",
      "Ne tentez pas de nettoyer les conduits vous-même au-delà des grilles accessibles",
      "En cas de grille très grasse (au-dessus des plaques de cuisson), nettoyez avec précaution",
      "Signalez toute odeur anormale venant des conduits à votre bailleur"
    ],
    astuces: [
      "Un test simple : approchez une feuille de papier de la grille, elle doit être attirée",
      "Nettoyez les grilles en même temps que votre grand ménage saisonnier",
      "En cuisine, augmentez la fréquence de nettoyage si vous cuisinez beaucoup"
    ],
    quandAppeler: [
      "La VMC ne ventile plus malgré les grilles propres",
      "Bruit anormal (bourdonnement fort, vibrations) venant du moteur",
      "Conduits visiblement obstrués en profondeur",
      "Humidité et moisissures persistantes malgré une VMC fonctionnelle"
    ]
  },
  20: {
    id: 20,
    duree: "5-10 minutes par jour",
    difficulte: "Facile",
    introduction: "Aérer son logement est essentiel pour la qualité de l'air intérieur, souvent plus pollué que l'air extérieur. C'est aussi la meilleure façon de prévenir l'humidité, les moisissures et les problèmes respiratoires, sans gaspiller d'énergie.",
    materiel: [
      "Aucun matériel spécifique",
      "Hygromètre (optionnel, pour mesurer le taux d'humidité)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Aération quotidienne efficace",
        description: "Pratique d'aération optimale au quotidien.",
        sousEtapes: [
          "Ouvrez grandes les fenêtres de deux pièces opposées (courant d'air traversant)",
          "Laissez aérer 10 minutes le matin après le réveil",
          "Aérez également après la douche, la cuisine et le ménage",
          "Refermez ensuite pour conserver la chaleur",
          "Ne laissez pas les fenêtres entrouvertes des heures : inefficace et énergivore"
        ]
      },
      {
        titre: "Méthode 2 — Gérer l'humidité dans les pièces sensibles",
        description: "Adapter la ventilation aux pièces humides.",
        sousEtapes: [
          "En cuisine : utilisez la hotte ou ouvrez la fenêtre pendant et après la cuisson",
          "En salle de bain : aérez 15 minutes après chaque douche ou bain",
          "Ne séchez pas le linge en abondance dans un espace non ventilé",
          "Laissez les portes intérieures ouvertes pour favoriser la circulation de l'air"
        ]
      }
    ],
    ecogestes: [
      "10 minutes d'aération grande fenêtre ouverte = autant de renouvellement d'air qu'une journée fenêtre entrouverte, pour moins de chaleur perdue",
      "Une bonne aération réduit les polluants intérieurs (COV, CO2, allergènes)",
      "Un air sain réduit les maladies respiratoires et donc les arrêts de travail",
      "L'humidité bien maîtrisée réduit les besoins en chauffage (l'air humide est plus difficile à chauffer)"
    ],
    prevention: [
      "Ne bloquez jamais les entrées d'air en haut ou en bas des fenêtres (petites fentes prévues à cet effet)",
      "Signalez les fenêtres qui ne s'ouvrent pas ou sont condamnées à votre bailleur",
      "Vérifiez régulièrement que les grilles de VMC ne sont pas obstruées (voir fiche dédiée)",
      "Évitez les plantes en très grande quantité dans un logement mal ventilé"
    ],
    securite: [
      "En cas de pollution extérieure forte (pics de pollution), limitez l'aération aux heures creuses",
      "Aérez toujours après l'utilisation de produits ménagers (peinture, solvants, détartrants)",
      "Ne laissez pas les fenêtres grandes ouvertes lors de violentes tempêtes",
      "En présence de bébé ou de personne fragile, évitez les courants d'air directs"
    ],
    astuces: [
      "Un hygromètre à 10€ permet de surveiller le taux d'humidité (idéal : 40 à 60%)",
      "L'odeur de renfermé est le premier signal que le logement est insuffisamment aéré",
      "Aérer le matin permet de profiter de l'air le plus frais et le moins pollué de la journée"
    ],
    quandAppeler: [
      "Condensation permanente sur les vitres malgré une aération régulière",
      "Moisissures récurrentes dans plusieurs pièces",
      "Odeurs persistantes venant des conduits de ventilation",
      "VMC insuffisante ou absente dans une salle de bain ou une cuisine"
    ]
  },
  21: {
    id: 21,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "L'humidité excessive dans un logement favorise les moisissures, dégrade les matériaux et nuit à la santé des occupants. Agir rapidement et adopter les bons réflexes permet d'en limiter les effets et d'éviter des dégâts irréversibles.",
    materiel: [
      "Hygromètre",
      "Vinaigre blanc et bicarbonate",
      "Brosse dure et éponge",
      "Démoussant naturel (optionnel)",
      "Déshumidificateur (si humidité importante)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Traiter les moisissures existantes",
        description: "Élimination des moisissures visibles.",
        sousEtapes: [
          "Protégez-vous avec des gants et un masque (les spores sont nocives)",
          "Appliquez du vinaigre blanc pur sur les zones touchées",
          "Laissez agir 30 minutes puis frottez avec une brosse dure",
          "Rincez et séchez soigneusement",
          "Aérez la pièce après le traitement et signalez la zone à votre bailleur"
        ]
      },
      {
        titre: "Méthode 2 — Réduire l'humidité ambiante",
        description: "Actions préventives contre l'humidité excessive.",
        sousEtapes: [
          "Aérez 10 minutes chaque matin (voir fiche dédiée)",
          "Couvrez les casseroles pendant la cuisson",
          "Limitez le séchage de linge à l'intérieur ou faites-le dans une pièce bien aérée",
          "Vérifiez que les joints de douche et de baignoire sont en bon état",
          "Signalez toute infiltration ou remontée d'humidité au bailleur"
        ]
      }
    ],
    ecogestes: [
      "Un logement sec est plus facile et moins coûteux à chauffer",
      "Le vinaigre blanc traite les moisissures sans produits chimiques ni emballage plastique",
      "Un déshumidificateur bien utilisé peut récupérer jusqu'à 2 L d'eau par jour",
      "Surveiller l'humidité régulièrement évite des réparations lourdes et coûteuses"
    ],
    prevention: [
      "Ne collez pas de meubles directement contre les murs extérieurs (laisser 5 cm)",
      "Signalez toute fissure ou infiltration d'eau dès son apparition",
      "Refaites les joints de salle de bain tous les 3 à 5 ans",
      "Ne stockez pas de cartons ou de textiles dans des pièces humides (cave, sous-sol)"
    ],
    securite: [
      "Ne respirez pas les spores de moisissures : portez un masque pour toute intervention",
      "Signalez immédiatement au bailleur les moisissures qui réapparaissent malgré le traitement",
      "Une humidité supérieure à 70% de façon chronique est une non-décence du logement",
      "En cas de symptômes respiratoires persistants, consultez un médecin"
    ],
    astuces: [
      "Un hygromètre indique en temps réel le taux d'humidité, idéal entre 40 et 60%",
      "Le bicarbonate de soude posé dans un bol absorbe les odeurs d'humidité",
      "Photographiez et datez les zones touchées pour votre dossier locataire"
    ],
    quandAppeler: [
      "Moisissures qui reviennent systématiquement malgré les traitements",
      "Humidité ascensionnelle visible sur les murs bas",
      "Infiltrations venant du toit, des murs ou du sol",
      "Taux d'humidité chroniquement supérieur à 70% malgré aération et VMC"
    ]
  },
  22: {
    id: 22,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "La VMC (Ventilation Mécanique Contrôlée) renouvelle l'air de votre logement en continu. Son entretien régulier est indispensable pour garantir un air sain, prévenir l'humidité et éviter les pannes coûteuses.",
    materiel: [
      "Aspirateur avec embout brosse",
      "Tournevis plat",
      "Eau savonneuse et éponge",
      "Feuille de papier (test de ventilation)",
      "Carnet de suivi"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Entretien préventif régulier (tous les 3 mois)",
        description: "Maintenance de routine de la VMC.",
        sousEtapes: [
          "Nettoyez toutes les grilles de soufflage et d'extraction (voir fiche dédiée)",
          "Testez l'aspiration avec une feuille de papier sur chaque bouche",
          "Notez les bouches qui aspirent mal et signalez-les au bailleur",
          "Vérifiez visuellement que le boîtier VMC (souvent en comble ou en placard technique) n'est pas obstrué",
          "Notez la date du nettoyage dans votre carnet de suivi"
        ]
      },
      {
        titre: "Méthode 2 — Vérification annuelle complète",
        description: "Inspection approfondie annuelle.",
        sousEtapes: [
          "Vérifiez le bruit de la VMC : bourdonnement régulier = normal, vibrations fortes = anomalie",
          "Contrôlez tous les conduits accessibles (pas de débranchement ni d'écrasement)",
          "Vérifiez que le filtre de la VMC (si accessible) n'est pas colmaté",
          "Demandez à votre bailleur l'entretien professionnel des conduits si ce n'est pas fait depuis plus de 2 ans"
        ]
      }
    ],
    ecogestes: [
      "Une VMC propre consomme 20 à 30% d'énergie en moins qu'une VMC encrassée",
      "Une bonne ventilation réduit l'humidité et donc les besoins en chauffage",
      "La VMC double flux récupère la chaleur de l'air extrait pour préchauffer l'air entrant",
      "Entretenir régulièrement évite le remplacement prématuré du moteur"
    ],
    prevention: [
      "Ne jamais éteindre la VMC en hiver (condensation et moisissures immédiates)",
      "Ne colmatez pas les grilles : c'est la principale cause de panne par surchauffe moteur",
      "Signalez toute odeur venant des conduits (remontée d'odeurs entre logements)",
      "Vérifiez que les conduits ne passent pas dans une zone froide non isolée"
    ],
    securite: [
      "Coupez l'alimentation électrique avant toute intervention sur le boîtier VMC",
      "Ne démontez pas le moteur de la VMC vous-même",
      "Signalez immédiatement toute odeur de brûlé venant de la VMC",
      "En cas de panne complète, ouvrez les fenêtres régulièrement en attendant la réparation"
    ],
    astuces: [
      "Notez sur votre calendrier le nettoyage trimestriel des grilles pour ne pas l'oublier",
      "En cas de VMC bruyante, vérifiez d'abord que rien ne vibre contre le boîtier",
      "La VMC hygro-réglable module automatiquement son débit selon l'humidité ambiante : très efficace"
    ],
    quandAppeler: [
      "VMC arrêtée ou moteur grillé",
      "Conduits débranchés ou endommagés",
      "Odeurs persistantes venant des conduits",
      "Humidité et moisissures malgré une VMC fonctionnelle et propre"
    ]
  },
  23: {
    id: 23,
    duree: "Lecture : 5 minutes",
    difficulte: "Facile",
    introduction: "Ventiler et chauffer peuvent sembler contradictoires, mais une ventilation bien maîtrisée permet de réduire les besoins en chauffage, d'éviter les moisissures coûteuses et de maintenir un air sain sans gaspiller d'énergie.",
    materiel: [
      "Hygromètre",
      "Joints d'étanchéité pour fenêtres",
      "Thermomètre d'ambiance"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Ventiler sans perdre de chaleur",
        description: "Aérer efficacement en période de chauffage.",
        sousEtapes: [
          "Privilégiez une aération courte et intense (10 min) plutôt que prolongée et entrouverte",
          "Baissez le chauffage avant d'ouvrir les fenêtres, remontez-le après fermeture",
          "Aérez de préférence aux heures les plus douces (milieu de journée en hiver)",
          "Laissez la VMC travailler en continu, elle assure le renouvellement de base"
        ]
      },
      {
        titre: "Méthode 2 — Optimiser la ventilation naturelle",
        description: "Tirer parti de la ventilation passive.",
        sousEtapes: [
          "Identifiez les entrées d'air (petites grilles en haut des fenêtres) : ne les bouchez pas",
          "Gardez les portes intérieures ouvertes pour favoriser la circulation",
          "En été, créez des courants d'air pour rafraîchir sans climatisation",
          "En hiver, concentrez l'aération sur les pièces humides (cuisine, salle de bain)"
        ]
      }
    ],
    ecogestes: [
      "L'air humide est plus énergivore à chauffer : ventiler réduit indirectement la facture",
      "Une VMC double flux récupère jusqu'à 90% de la chaleur de l'air extrait",
      "Aérer 10 minutes le matin suffit pour renouveler l'air d'une pièce standard",
      "Réduire l'humidité intérieure de 10% peut diminuer les besoins en chauffage de 5%"
    ],
    prevention: [
      "Ne bouchez jamais les entrées d'air des fenêtres pour gagner quelques degrés",
      "Une VMC arrêtée en hiver = moisissures garanties en quelques semaines",
      "Surveillez le taux d'humidité : au-delà de 65%, aérez davantage",
      "Signalez toute entrée d'air bouchée ou absente à votre bailleur"
    ],
    securite: [
      "Ne ventiler qu'avec la VMC sans jamais ouvrir les fenêtres n'est pas suffisant",
      "En cas de pics de pollution extérieure, limitez l'aération et privilégiez la VMC",
      "Ne coupez jamais la VMC en hiver même en cas d'absence courte",
      "Une VMC bruyante est un signe d'anomalie, pas une raison de l'éteindre"
    ],
    astuces: [
      "Un hygromètre vous guide : en dessous de 40% d'humidité, inutile d'aérer davantage",
      "La cuisson et la douche sont les deux principaux pics d'humidité : aérez à ces moments",
      "En été, ouvrez la nuit pour rafraîchir naturellement et fermez le matin pour conserver la fraîcheur"
    ],
    quandAppeler: [
      "VMC insuffisante pour le logement (débit trop faible)",
      "Condensation permanente malgré une ventilation correcte",
      "Logement sans ventilation mécanique (obligation réglementaire)",
      "Installation d'une VMC double flux (travaux à la charge du bailleur)"
    ]
  },
  24: {
    id: 24,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "Une VMC défaillante peut passer inaperçue pendant des mois, jusqu'à ce que les moisissures apparaissent ou que les odeurs deviennent gênantes. Quelques tests simples permettent de vérifier son bon fonctionnement régulièrement.",
    materiel: [
      "Feuille de papier fin ou papier toilette",
      "Lampe de poche",
      "Hygromètre",
      "Appareil photo (pour documenter)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Test de ventilation rapide",
        description: "Vérification simple du fonctionnement de la VMC.",
        sousEtapes: [
          "Approchez une feuille de papier fin à 2 cm de chaque bouche d'extraction",
          "Si la feuille est attirée vers la grille : la VMC fonctionne",
          "Si la feuille reste immobile ou est repoussée : problème détecté",
          "Notez les bouches défaillantes et prenez-les en photo",
          "Signalez par écrit à votre bailleur avec les photos à l'appui"
        ]
      },
      {
        titre: "Méthode 2 — Inspection visuelle complète",
        description: "Examen approfondi du système de ventilation.",
        sousEtapes: [
          "Vérifiez l'état de toutes les grilles (propreté, intégrité, absence d'obstruction)",
          "Écoutez le boîtier VMC : un bourdonnement régulier est normal",
          "Vérifiez qu'aucun conduit visible n'est écrasé, déconnecté ou bouché",
          "Contrôlez le taux d'humidité dans chaque pièce avec un hygromètre",
          "Comparez avec les relevés précédents : une hausse soudaine peut signaler une panne"
        ]
      }
    ],
    ecogestes: [
      "Une VMC défaillante entraîne humidité et moisissures, donc des travaux coûteux",
      "Détecter tôt évite le remplacement complet du système",
      "Documenter les anomalies par écrit et en photo protège le locataire et accélère les interventions",
      "Une VMC bien entretenue dure 10 à 15 ans"
    ],
    prevention: [
      "Effectuez ce test de ventilation tous les 6 mois",
      "Nettoyez les grilles tous les 3 mois (voir fiche dédiée)",
      "Signalez toute dégradation de la qualité de l'air ou hausse d'humidité inexpliquée",
      "Conservez une trace écrite de toutes vos demandes d'intervention au bailleur"
    ],
    securite: [
      "Ne tentez pas de réparer vous-même le moteur ou les conduits de VMC",
      "En cas de panne confirmée, aérez manuellement régulièrement en attendant la réparation",
      "Signalez en urgence toute odeur anormale (gaz, produits chimiques) venant des conduits",
      "Une VMC qui s'arrête brusquement peut signaler un court-circuit : signalez-le"
    ],
    astuces: [
      "Testez la VMC systématiquement lors de votre état des lieux d'entrée et notez tout défaut",
      "Un taux d'humidité en hausse constante est souvent le premier signe d'une VMC défaillante",
      "Conservez les photos et dates de vos tests : utiles en cas de litige avec le bailleur"
    ],
    quandAppeler: [
      "Test papier négatif sur plusieurs bouches malgré les grilles propres",
      "Moteur VMC qui ne tourne plus ou chauffe anormalement",
      "Conduits déconnectés ou obstrués inaccessibles",
      "Humidité et moisissures persistantes malgré une VMC apparemment fonctionnelle"
    ]
  },
  25: {
    id: 25,
    duree: "5-10 minutes",
    difficulte: "Facile",
    introduction: "Le détecteur de fumée (DAAF) est obligatoire dans tous les logements. Son test mensuel est un geste simple qui peut sauver des vies. En France, son installation est à la charge du bailleur, mais son entretien courant revient au locataire.",
    materiel: [
      "Détecteur de fumée en place",
      "Escabeau si nécessaire",
      "Pile de rechange (type CR2 ou AA selon le modèle)",
      "Chiffon doux pour dépoussiérer"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Test mensuel rapide",
        description: "Vérification du bon fonctionnement du détecteur.",
        sousEtapes: [
          "Approchez-vous du détecteur (escabeau si au plafond)",
          "Appuyez sur le bouton test et maintenez 3 à 5 secondes",
          "L'alarme doit retentir : le détecteur fonctionne",
          "Si aucun son : vérifiez d'abord la pile avant de signaler au bailleur",
          "Notez la date du test dans votre carnet de suivi"
        ]
      },
      {
        titre: "Méthode 2 — Remplacement de la pile",
        description: "Changement de la pile du détecteur.",
        sousEtapes: [
          "Retirez le détecteur de son support en le tournant d'un quart de tour",
          "Ouvrez le compartiment à pile",
          "Remplacez par une pile neuve du même type",
          "Refermez et replacez le détecteur sur son support",
          "Effectuez immédiatement le test pour vérifier le bon fonctionnement"
        ]
      }
    ],
    ecogestes: [
      "Choisissez des piles rechargeables compatibles pour réduire les déchets",
      "Déposez les piles usagées en point de collecte (supermarchés, déchetteries)",
      "Certains détecteurs fonctionnent sur pile lithium 10 ans : plus économique et écologique",
      "Dépoussiérez le détecteur régulièrement pour éviter les fausses alarmes"
    ],
    prevention: [
      "Testez le détecteur le premier de chaque mois pour ne pas oublier",
      "Ne peignez jamais sur le détecteur (obstrue les capteurs)",
      "Ne placez pas le détecteur à moins de 30 cm d'une paroi ou d'un luminaire",
      "Signalez immédiatement au bailleur un détecteur absent ou défectueux"
    ],
    securite: [
      "Ne désactivez jamais le détecteur pour éviter les fausses alarmes de cuisine",
      "En cas d'alarme réelle : évacuez, fermez les portes, appelez le 18",
      "Ne réinstallez jamais un détecteur dont le boîtier est fissuré ou brûlé",
      "La durée de vie d'un DAAF est de 10 ans maximum : vérifiez la date sur l'appareil"
    ],
    astuces: [
      "Notez la date d'installation sur le détecteur avec un marqueur permanent",
      "Si vous cuisinez beaucoup, installez le détecteur dans le couloir plutôt que la cuisine",
      "Un détecteur de CO supplémentaire est fortement recommandé si vous avez une chaudière"
    ],
    quandAppeler: [
      "Détecteur absent à votre arrivée dans le logement (obligation du bailleur)",
      "Détecteur défectueux malgré pile neuve",
      "Alarme intempestive répétée sans raison apparente",
      "Détecteur de plus de 10 ans à remplacer"
    ]
  },
  26: {
    id: 26,
    duree: "20-40 minutes",
    difficulte: "Facile",
    introduction: "Les joints de fenêtres s'usent avec le temps et finissent par laisser passer l'air froid, l'humidité et le bruit. Les entretenir et les remplacer régulièrement améliore le confort thermique et acoustique du logement.",
    materiel: [
      "Joint adhésif en mousse ou silicone",
      "Cutter et ciseaux",
      "Chiffon et produit dégraissant",
      "Mastic silicone (pour les joints de vitrage)",
      "Spatule et alcool à 90°"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Remplacement des joints de frappe (tour de fenêtre)",
        description: "Changement des joints d'étanchéité des fenêtres.",
        sousEtapes: [
          "Retirez l'ancien joint en le décollant ou le grattant soigneusement",
          "Nettoyez et dégraissez la rainure avec de l'alcool à 90°",
          "Mesurez et coupez le nouveau joint à la bonne longueur",
          "Appliquez le joint en commençant par un coin, sans étirer",
          "Refermez la fenêtre pour tester l'étanchéité : plus de courant d'air = réussi"
        ]
      },
      {
        titre: "Méthode 2 — Entretien des joints de vitrage (silicone)",
        description: "Rénovation des joints autour des vitres.",
        sousEtapes: [
          "Inspectez le tour des vitres : joints craquelés, décollés ou noircis à remplacer",
          "Retirez l'ancien mastic à la spatule",
          "Nettoyez soigneusement et laissez sécher",
          "Appliquez le mastic silicone neuf en cordon régulier",
          "Lissez avec un doigt humide et laissez sécher 24h avant de manipuler"
        ]
      }
    ],
    ecogestes: [
      "Des joints en bon état réduisent les déperditions thermiques de 10 à 15%",
      "Préférez les joints en EPDM (caoutchouc naturel) aux joints PVC",
      "Un joint bien posé dure 5 à 8 ans : vérifiez-les chaque automne",
      "Évitez les colles et mastics à base de solvants : optez pour les versions eau"
    ],
    prevention: [
      "Inspectez les joints chaque automne avant l'hiver",
      "Nettoyez les joints avec de l'eau savonneuse pour prolonger leur durée de vie",
      "Ne forcez pas sur une fenêtre mal réglée : signalez-le au bailleur",
      "Évitez les produits détartrants agressifs sur les joints de silicone"
    ],
    securite: [
      "Utilisez des gants lors de l'application du mastic silicone",
      "Aérez bien la pièce lors de l'utilisation de dégraissant ou de solvant",
      "Ne remplacez pas les joints de double vitrage vous-même (travaux à la charge du bailleur)",
      "En cas de fenêtre qui ne ferme plus correctement, signalez-le au bailleur"
    ],
    astuces: [
      "Le test de la feuille de papier : coincez une feuille dans la fenêtre fermée, si elle glisse sans résistance le joint est usé",
      "Emportez un morceau de l'ancien joint chez le quincaillier pour trouver le bon profil",
      "Un joint propre et souple dure bien plus longtemps qu'un joint encrassé"
    ],
    quandAppeler: [
      "Fenêtre qui ne ferme plus correctement malgré les joints neufs",
      "Vitrage fissuré ou décollé",
      "Condensation entre les deux vitres d'un double vitrage (vitrage à remplacer)",
      "Châssis de fenêtre abîmé ou pourri"
    ]
  },
  27: {
    id: 27,
    duree: "Lecture : 5 minutes",
    difficulte: "Facile",
    introduction: "Le tri sélectif est un geste citoyen simple qui réduit les déchets, préserve les ressources naturelles et peut alléger la facture collective de gestion des ordures. Bien trier, c'est aussi respecter son voisinage et les espaces communs du logement.",
    materiel: [
      "Poubelles séparées (recyclable, ordures ménagères, verre)",
      "Sacs poubelles adaptés",
      "Informations sur les consignes de tri de votre commune (disponibles en mairie ou sur le site de votre collectivité)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Organiser son tri au quotidien",
        description: "Mise en place du tri sélectif à la maison.",
        sousEtapes: [
          "Installez deux ou trois poubelles distinctes dans votre cuisine",
          "Identifiez les consignes locales (les règles varient selon les communes)",
          "Rincez rapidement les emballages avant de les trier (bouteilles, boîtes de conserve)",
          "Aplatissez les cartons pour optimiser la place dans le bac",
          "Déposez les déchets dans les bons conteneurs de l'immeuble ou de la voirie"
        ]
      },
      {
        titre: "Méthode 2 — Gérer les déchets spéciaux",
        description: "Traitement des déchets hors tri classique.",
        sousEtapes: [
          "Médicaments : retournez-les en pharmacie (collecte Cyclamed)",
          "Piles et batteries : déposez-les dans les collecteurs en supermarchés",
          "Ampoules et néons : déposez-les en déchetterie ou point de collecte",
          "Textiles : déposez-les propres et secs dans les bornes de collecte (Le Relais, etc.)",
          "Encombrants : renseignez-vous auprès de votre bailleur ou mairie pour la collecte"
        ]
      }
    ],
    ecogestes: [
      "Recycler une canette d'aluminium économise 95% de l'énergie nécessaire à en produire une neuve",
      "Le verre est recyclable à l'infini sans perte de qualité",
      "1 tonne de papier recyclé économise 17 arbres et 26 000 L d'eau",
      "Réduire ses déchets à la source (achats en vrac, refus des emballages inutiles) reste le geste le plus efficace"
    ],
    prevention: [
      "Ne jetez jamais de liquides dans les bacs de tri (contamine toute la collecte)",
      "Ne déposez pas d'encombrants dans les parties communes sans accord du bailleur",
      "Respectez les jours et horaires de sortie des poubelles pour éviter les nuisibles",
      "Signalez les conteneurs débordants ou dégradés à votre bailleur ou à la mairie"
    ],
    securite: [
      "Ne jetez jamais de produits chimiques, peintures ou solvants dans les poubelles ordinaires",
      "Les déchets dangereux (batteries, produits ménagers, médicaments) ont des filières spécifiques",
      "Ne brûlez jamais de déchets dans le logement ou en extérieur (interdit et dangereux)",
      "En cas de doute sur un déchet, renseignez-vous auprès de votre mairie"
    ],
    astuces: [
      "Affichez les consignes de tri de votre commune sur votre réfrigérateur",
      "Un composteur de balcon permet de valoriser les épluchures et réduire le volume de déchets",
      "Les applications comme 'Que recycler ?' permettent de savoir quoi mettre dans quel bac"
    ],
    quandAppeler: [
      "Conteneurs de l'immeuble saturés en permanence (signaler au bailleur)",
      "Présence de déchets dangereux abandonnés dans les communs (signaler en urgence)",
      "Besoin d'une collecte d'encombrants volumineuse",
      "Déchets d'amiante ou de produits toxiques (filière spécialisée obligatoire)"
    ]
  },
  28: {
    id: 28,
    duree: "1-2 heures",
    difficulte: "Facile",
    introduction: "Chaque changement de saison est l'occasion idéale d'effectuer un tour complet de son logement. Ces vérifications régulières permettent de détecter les problèmes tôt, d'anticiper les pannes et de maintenir le logement en bon état tout au long de l'année.",
    materiel: [
      "Carnet de suivi et stylo",
      "Lampe de poche",
      "Appareil photo",
      "Outillage de base (tournevis, clé plate)",
      "Coordonnées du bailleur"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Checklist printemps-été (avril)",
        description: "Vérifications à faire au printemps.",
        sousEtapes: [
          "Vérifiez les fenêtres : joints, fermeture, état des volets",
          "Testez le détecteur de fumée et changez la pile si nécessaire",
          "Inspectez les joints de salle de bain et cuisine (moisissures, décollements)",
          "Vérifiez les grilles de VMC et nettoyez-les",
          "Coupez le chauffage et signalez tout radiateur défectueux avant l'été"
        ]
      },
      {
        titre: "Méthode 2 — Checklist automne-hiver (septembre)",
        description: "Préparation du logement pour l'hiver.",
        sousEtapes: [
          "Testez le chauffage avant la saison : chaque radiateur doit chauffer uniformément",
          "Purgez les radiateurs qui chauffent mal",
          "Vérifiez la pression de la chaudière et planifiez la révision annuelle",
          "Inspectez les joints de fenêtres et calfeutrez les courants d'air",
          "Vérifiez le bon fonctionnement du détecteur de CO si chaudière ou poêle présent"
        ]
      }
    ],
    ecogestes: [
      "Un logement entretenu consomme moins d'énergie et génère moins de déchets de réparation",
      "Anticiper les travaux évite les interventions d'urgence plus coûteuses et polluantes",
      "Nettoyer les filtres et grilles deux fois par an maintient tous les équipements à leur efficacité maximale",
      "Signaler les anomalies au bailleur rapidement limite les dégâts et les matériaux à remplacer"
    ],
    prevention: [
      "Planifiez ces vérifications à date fixe (1er avril et 1er septembre par exemple)",
      "Conservez un carnet de suivi avec dates, observations et interventions",
      "Photographiez les anomalies pour vos échanges avec le bailleur",
      "Ne remettez pas au lendemain les petites réparations qui peuvent devenir grandes"
    ],
    securite: [
      "Signalez immédiatement tout ce qui touche à l'électricité, au gaz ou à la structure",
      "Ne montez jamais sur un toit ou un velux sans équipement adapté",
      "En cas de doute sur la gravité d'une anomalie, prévenez votre bailleur par écrit",
      "Gardez les coordonnées d'urgence (bailleur, gaz, électricité) toujours accessibles"
    ],
    astuces: [
      "Créez une checklist personnalisée avec les spécificités de votre logement",
      "L'état des lieux de sortie sera d'autant plus favorable que le logement a été entretenu",
      "Un logement bien entretenu contribue à de bonnes relations avec le bailleur"
    ],
    quandAppeler: [
      "Anomalie structurelle (fissure dans un mur porteur, affaissement de plancher)",
      "Problème électrique ou gaz détecté lors de la vérification",
      "Fenêtres ou portes tellement mal isolées qu'elles ne peuvent pas être corrigées par le locataire",
      "Dégât des eaux ou infiltration nécessitant une intervention en urgence"
    ]
  },
  29: {
    id: 29,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "Les produits ménagers du commerce contiennent souvent des substances chimiques nocives pour la santé et l'environnement. Quelques ingrédients simples et peu coûteux permettent de fabriquer des produits aussi efficaces, sans danger pour votre foyer ni pour la planète.",
    materiel: [
      "Bicarbonate de soude",
      "Vinaigre blanc",
      "Savon noir liquide",
      "Citron",
      "Spray vide et bocaux réutilisables",
      "Huile essentielle de lavande ou tea tree (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Nettoyant multi-surfaces",
        description: "Recette de nettoyant écologique maison.",
        sousEtapes: [
          "Dans un spray, versez 20 cl de vinaigre blanc",
          "Ajoutez 20 cl d'eau et 1 cuillère à soupe de savon noir",
          "Ajoutez 10 gouttes d'huile essentielle de lavande (désinfectant naturel)",
          "Agitez et étiquetez le flacon",
          "Utilisez sur plans de travail, éviers, carrelage et sanitaires"
        ]
      },
      {
        titre: "Méthode 2 — Poudre à récurer naturelle",
        description: "Recette de poudre nettoyante écologique.",
        sousEtapes: [
          "Mélangez 3 cuillères à soupe de bicarbonate de soude",
          "Ajoutez 1 cuillère à soupe de sel fin",
          "Humectez légèrement la zone à nettoyer",
          "Saupoudrez le mélange et frottez avec une éponge",
          "Rincez à l'eau claire : efficace sur évier, baignoire, carrelage"
        ]
      }
    ],
    ecogestes: [
      "Un flacon de vinaigre blanc remplace jusqu'à 5 produits ménagers différents",
      "Fabriquer soi-même ses produits réduit les emballages plastiques de 80%",
      "Le bicarbonate et le vinaigre sont biodégradables et non toxiques pour les cours d'eau",
      "Ces produits coûtent 5 à 10 fois moins cher que leurs équivalents du commerce"
    ],
    prevention: [
      "Ne mélangez jamais vinaigre et bicarbonate dans un flacon fermé (pression)",
      "N'utilisez pas le vinaigre sur le marbre ou les surfaces calcaires (les attaque)",
      "Étiquetez toujours vos préparations avec la composition et la date",
      "Rangez hors de portée des enfants même s'ils sont naturels"
    ],
    securite: [
      "Ne mélangez jamais bicarbonate et produits chlorés (réaction dangereuse)",
      "Les huiles essentielles sont déconseillées aux femmes enceintes et aux jeunes enfants",
      "En cas d'ingestion accidentelle, appelez le 15 ou le centre antipoison",
      "Portez des gants pour les nettoyages intensifs même avec des produits naturels"
    ],
    astuces: [
      "Le marc de café est excellent pour désodoriser les éviers et le réfrigérateur",
      "Le citron détartre naturellement les robinets et la cafetière",
      "Une noisette de savon noir dans l'eau de lavage du sol remplace tous les nettoyants sols"
    ],
    quandAppeler: [
      "Moisissures profondes dans les joints ou les murs (traitement professionnel nécessaire)",
      "Infestation de nuisibles malgré les produits naturels préventifs",
      "Taches ou dépôts résistants sur des surfaces délicates (parquet, pierre naturelle)"
    ]
  },
  30: {
    id: 30,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "Cafards, souris, moustiques ou punaises de lit peuvent s'installer rapidement dans un logement. La prévention est de loin la méthode la plus efficace et la moins coûteuse pour éviter une infestation.",
    materiel: [
      "Joints de porte et de fenêtre",
      "Grilles anti-insectes (pour les aérations)",
      "Vinaigre blanc et huiles essentielles répulsives",
      "Pièges à insectes (optionnel)",
      "Sacs hermétiques pour les denrées alimentaires"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Sécuriser le logement",
        description: "Empêcher l'entrée des nuisibles.",
        sousEtapes: [
          "Inspectez les interstices autour des tuyaux, prises et plinthes : bouchez avec du mastic",
          "Posez des grilles anti-insectes sur les bouches de ventilation accessibles",
          "Vérifiez les joints de portes et fenêtres (voir fiche dédiée)",
          "Stockez les denrées alimentaires dans des boîtes hermétiques",
          "Ne laissez jamais de vaisselle sale ou de restes alimentaires accessibles la nuit"
        ]
      },
      {
        titre: "Méthode 2 — Répulsifs naturels",
        description: "Solutions naturelles pour éloigner les nuisibles.",
        sousEtapes: [
          "Déposez des feuilles de laurier dans les placards à provisions (répulsif à cafards)",
          "Glissez des sachets de lavande dans les armoires (répulsif à mites)",
          "Vaporisez du vinaigre blanc dilué le long des plinthes et des passages suspects",
          "Plantez ou posez de la menthe fraîche près des entrées (répulsif souris)",
          "Utilisez des moustiquaires aux fenêtres en été"
        ]
      }
    ],
    ecogestes: [
      "Les répulsifs naturels (lavande, menthe, vinaigre) sont sans danger pour la biodiversité",
      "Évitez les bombes insecticides chimiques qui contaminent l'air intérieur pendant des heures",
      "Un logement propre et sec est le meilleur répulsif naturel",
      "Signalez les infestations rapidement pour éviter les traitements chimiques lourds"
    ],
    prevention: [
      "Ne laissez jamais de nourriture accessible sans couvercle",
      "Videz et nettoyez régulièrement la poubelle de cuisine (au moins deux fois par semaine)",
      "Signalez toute infiltration d'eau : les nuisibles sont attirés par l'humidité",
      "Vérifiez les bagages et vêtements achetés d'occasion (risque punaises de lit)"
    ],
    securite: [
      "En cas d'infestation avérée de punaises de lit, contactez immédiatement votre bailleur",
      "Ne traitez pas vous-même une infestation de frelons ou de guêpes (danger)",
      "Les dératiseurs professionnels utilisent des produits réglementés : ne bricolez pas avec des rodenticides",
      "En cas de morsure ou piqûre suspecte, consultez un médecin"
    ],
    astuces: [
      "Inspectez les matelas et sommiers lors d'emménagement dans un nouveau logement",
      "Un filet de jus de citron le long des plinthes éloigne les fourmis",
      "En cas de doute sur une infestation, prévenez votre bailleur par écrit : il a une obligation d'intervention"
    ],
    quandAppeler: [
      "Infestation de punaises de lit (traitement professionnel obligatoire)",
      "Présence de rats ou de souris malgré les mesures préventives",
      "Nid de frelons, de guêpes ou d'abeilles dans le logement ou les communs",
      "Infestation de cafards persistante malgré les traitements préventifs"
    ]
  },
  31: {
    id: 31,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "Les sols et revêtements muraux du logement nécessitent un entretien adapté à leur nature. Un nettoyage régulier et approprié préserve leur aspect, prolonge leur durée de vie et évite des remplacements coûteux à la sortie du logement.",
    materiel: [
      "Balai, aspirateur, serpillière",
      "Savon noir liquide",
      "Vinaigre blanc",
      "Bicarbonate de soude",
      "Chiffon microfibre",
      "Protection pour les bords (masking tape)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Entretien du carrelage et du sol vinyle",
        description: "Nettoyage adapté aux sols durs.",
        sousEtapes: [
          "Aspirez ou balayez avant de laver pour retirer poussière et sable",
          "Préparez un seau d'eau tiède avec un trait de savon noir",
          "Lavez avec une serpillière bien essorée (excès d'eau = risque de décollement du vinyle)",
          "Pour les joints de carrelage noircis : bicarbonate + vieille brosse à dents",
          "Rincez et séchez avec un chiffon propre pour éviter les auréoles"
        ]
      },
      {
        titre: "Méthode 2 — Entretien du parquet",
        description: "Soins spécifiques pour les sols en bois.",
        sousEtapes: [
          "Aspirez régulièrement dans le sens du bois pour retirer les grains abrasifs",
          "N'utilisez jamais d'eau en excès sur un parquet (gonflement et déformation)",
          "Nettoyez avec un chiffon microfibre légèrement humide et du savon noir dilué",
          "Traitez les rayures légères avec de la cire naturelle de la couleur du bois",
          "Signalez au bailleur les lames décollées, gondolées ou très abîmées"
        ]
      }
    ],
    ecogestes: [
      "Le savon noir nettoie et nourrit tous les sols naturels sans produit chimique",
      "Une serpillière microfibre lavable remplace des dizaines de serpillières jetables",
      "Le vinaigre blanc détartre et désinfecte le carrelage sans laisser de résidu",
      "Un sol propre régulièrement entretenu n'a jamais besoin de produits décapants agressifs"
    ],
    prevention: [
      "Posez des patins feutres sous les meubles pour éviter les rayures",
      "Essuyez immédiatement tout liquide renversé, surtout sur parquet ou stratifié",
      "Ne faites pas glisser les meubles lourds sur le sol sans protection",
      "Signalez au bailleur tout soulèvement, cloquage ou décollement du revêtement"
    ],
    securite: [
      "N'utilisez jamais de produits abrasifs sur les sols vernis ou laqués",
      "Évitez les sols mouillés sans signalétique si vous avez des enfants ou des personnes âgées",
      "Ne mélangez pas le vinaigre et la javel (réaction chimique dangereuse)",
      "Portez des gants pour les nettoyages intensifs"
    ],
    astuces: [
      "Une goutte d'huile essentielle de lavande dans l'eau de lavage parfume naturellement le logement",
      "Le bicarbonate de soude élimine les taches tenaces sur le carrelage sans rayer",
      "Pour les sols stratifiés, un chiffon à peine humide vaut mieux qu'une serpillière mouillée"
    ],
    quandAppeler: [
      "Parquet très dégradé nécessitant un ponçage et une vitrification",
      "Carrelage fissuré ou décollé sur une grande surface",
      "Revêtement mural (papier peint, peinture) très dégradé",
      "Dégât des eaux ayant abîmé les sols en profondeur"
    ]
  },
  32: {
    id: 32,
    duree: "Lecture : 5 minutes",
    difficulte: "Facile",
    introduction: "Eau et énergie représentent une part importante du budget d'un foyer. De petits gestes quotidiens, combinés à quelques équipements simples, permettent de réduire significativement ces dépenses tout en préservant les ressources naturelles.",
    materiel: [
      "Mousseurs pour robinets",
      "Ampoules LED",
      "Multiprises à interrupteur",
      "Relevé de compteur eau et électricité",
      "Minuterie de douche (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Réduire la consommation d'eau",
        description: "Gestes pour économiser l'eau au quotidien.",
        sousEtapes: [
          "Installez des mousseurs sur tous les robinets (réduction de 50% du débit)",
          "Vérifiez et réparez les robinets qui gouttent (voir fiche dédiée)",
          "Utilisez la chasse d'eau petite débit systématiquement",
          "Remplacez les bains par des douches de 5 minutes maximum",
          "Relevez votre compteur d'eau chaque mois et notez-le"
        ]
      },
      {
        titre: "Méthode 2 — Réduire la consommation d'électricité",
        description: "Gestes pour économiser l'électricité au quotidien.",
        sousEtapes: [
          "Remplacez toutes vos ampoules par des LED si ce n'est pas déjà fait",
          "Regroupez vos appareils en veille sur des multiprises à interrupteur",
          "Coupez les multiprises chaque soir avant de dormir",
          "Lancez le lave-linge et le lave-vaisselle en heures creuses et à pleine charge",
          "Dégivrez le réfrigérateur dès que le givre atteint 3 mm"
        ]
      }
    ],
    ecogestes: [
      "Un foyer qui adopte tous ces gestes peut économiser 200 à 400€ par an",
      "Réduire sa consommation d'eau de 20% préserve les nappes phréatiques locales",
      "Une ampoule LED dure 25 fois plus longtemps qu'une ampoule classique",
      "Éteindre les veilles représente 10% de la facture électrique annuelle en moins"
    ],
    prevention: [
      "Relevez eau et électricité chaque mois pour détecter toute anomalie rapidement",
      "Une consommation qui augmente sans raison peut signaler une fuite ou un appareil défectueux",
      "Faites réviser les gros appareils (chauffe-eau, chaudière) régulièrement",
      "Signalez toute fuite d'eau immédiatement, même minime"
    ],
    securite: [
      "Ne surchargez pas les circuits électriques en branchant trop d'appareils simultanément",
      "Vérifiez l'état des cordons électriques des appareils anciens avant utilisation",
      "Ne laissez jamais un appareil chauffant sans surveillance",
      "En cas de surconsommation inexpliquée, signalez-le à votre bailleur et à votre fournisseur"
    ],
    astuces: [
      "Affichez vos relevés mensuels sur le réfrigérateur pour impliquer toute la famille",
      "Les applications de suivi de consommation (disponibles via certains fournisseurs) permettent de visualiser ses économies en temps réel",
      "Des gestes simples expliqués aux enfants dès le plus jeune âge créent des habitudes durables"
    ],
    quandAppeler: [
      "Compteur d'eau ou d'électricité qui tourne anormalement vite",
      "Fuite non localisée malgré l'inspection visuelle",
      "Installation d'équipements économes nécessitant des travaux (douchette, chasse d'eau double débit)",
      "Consommation anormale persistante sans cause identifiée"
    ]
  },
  33: {
    id: 33,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "Changer de cylindre de serrure à l'emménagement ou après une perte de clé est un geste de sécurité essentiel. C'est une opération simple, peu coûteuse, que tout locataire peut réaliser sans faire appel à un serrurier.",
    materiel: [
      "Tournevis plat et cruciforme",
      "Nouveau cylindre (même longueur que l'ancien)",
      "Clé existante pour déverrouiller",
      "Réglet ou mètre pour mesurer le cylindre"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Remplacement du cylindre",
        description: "Procédure de changement du cylindre de serrure.",
        sousEtapes: [
          "Ouvrez la porte et repérez la petite vis sur la tranche de la serrure",
          "Dévissez cette vis de un à deux tours (ne la retirez pas complètement)",
          "Insérez la clé dans le cylindre, tournez légèrement et tirez vers vous",
          "Le cylindre se retire facilement",
          "Mesurez-le (ex. 30x40 mm) et achetez un cylindre identique",
          "Insérez le nouveau cylindre, tournez la clé pour l'aligner et revissez la vis"
        ]
      },
      {
        titre: "Méthode 2 — Vérification après remplacement",
        description: "Tests à effectuer après l'installation.",
        sousEtapes: [
          "Testez toutes les clés fournies avec le nouveau cylindre",
          "Vérifiez l'ouverture et la fermeture depuis l'intérieur et l'extérieur",
          "Testez le verrouillage à plusieurs points si votre porte est multipoints",
          "Notez le numéro de référence du cylindre pour les futures copies de clés"
        ]
      }
    ],
    ecogestes: [
      "Conservez l'ancien cylindre en bon état : il peut être réutilisé ou donné",
      "Choisissez un cylindre certifié A2P : plus sûr et plus durable",
      "Évitez les cylindres bas de gamme qui s'usent rapidement et génèrent des déchets",
      "Faites reproduire vos clés chez un serrurier plutôt que dans les grandes surfaces (meilleure qualité)"
    ],
    prevention: [
      "Lubrifiez le cylindre une fois par an avec un spray graphite (pas d'huile)",
      "Ne forcez jamais une clé qui résiste : signe d'usure ou de mauvais alignement",
      "Signalez au bailleur toute porte qui ferme mal (problème de gâche ou de calage)",
      "Gardez toujours un double de clé chez une personne de confiance"
    ],
    securite: [
      "En cas de perte de clé, changez le cylindre sans attendre",
      "Vérifiez que le bailleur n'impose pas de cylindre spécifique avant d'acheter",
      "Ne laissez jamais la clé sur la porte de l'intérieur si vous êtes seul(e)",
      "En cas d'effraction, ne touchez pas à la serrure et appelez le 17 avant toute réparation"
    ],
    astuces: [
      "Un cylindre avec bouton intérieur permet de verrouiller sans clé depuis l'intérieur",
      "La certification A2P (1, 2 ou 3 étoiles) garantit le niveau de résistance à l'effraction",
      "Notez les références du cylindre sur un document conservé à part des clés"
    ],
    quandAppeler: [
      "Cylindre bloqué impossible à retirer",
      "Porte multipoints dont le mécanisme est endommagé",
      "Serrure à remplacer entièrement après effraction",
      "Besoin d'un cylindre de sécurité haute protection (A2P 3 étoiles)"
    ]
  },
  34: {
    id: 34,
    duree: "30-45 minutes",
    difficulte: "Facile",
    introduction: "Les fenêtres et balcons sont des points d'entrée potentiels et des zones de risque, notamment pour les enfants. Quelques équipements simples permettent de renforcer leur sécurité sans travaux importants.",
    materiel: [
      "Bloque-fenêtre ou goupille de sécurité",
      "Ventouse de sécurité enfant",
      "Loquet de fenêtre",
      "Filet de balcon ou garde-corps (si absent)",
      "Tournevis"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Sécuriser les fenêtres contre l'intrusion",
        description: "Renforcement de la sécurité des fenêtres.",
        sousEtapes: [
          "Vérifiez que chaque fenêtre ferme correctement et que la crémone fonctionne",
          "Installez une goupille de sécurité dans le dormant (empêche l'ouverture même si le loquet est forcé)",
          "Pour les fenêtres en rez-de-chaussée, ajoutez un bloque-fenêtre sur le rail",
          "Vérifiez l'état des volets et de leurs loquets",
          "Signalez au bailleur toute fenêtre impossible à verrouiller correctement"
        ]
      },
      {
        titre: "Méthode 2 — Sécuriser pour les enfants",
        description: "Protection des enfants contre les chutes.",
        sousEtapes: [
          "Installez des ventouses ou limiteurs d'ouverture sur les fenêtres accessibles aux enfants",
          "Ne laissez aucun meuble climbable à proximité des fenêtres",
          "Vérifiez la hauteur et la solidité des garde-corps de balcon (norme : 1 m minimum)",
          "Signalez immédiatement au bailleur tout garde-corps branlant ou trop bas",
          "N'installez jamais de mobilier contre la rambarde du balcon"
        ]
      }
    ],
    ecogestes: [
      "Les équipements de sécurité de qualité durent des années : investissez dans du solide",
      "Signalez les défauts de sécurité par écrit pour en garder une trace",
      "Un balcon sécurisé est un espace de vie agréable, sans risque et sans stress",
      "Préférez les équipements en matériaux durables (inox, aluminium) aux modèles plastiques"
    ],
    prevention: [
      "Vérifiez les garde-corps et rambardes chaque printemps",
      "Nettoyez et lubrifiez les mécanismes de fermeture des fenêtres deux fois par an",
      "Vérifiez que les rails de fenêtres coulissantes sont propres et non déformés",
      "Ne surchargez pas les balcons au-delà de leur capacité (généralement 150 à 250 kg/m²)"
    ],
    securite: [
      "Un garde-corps défectueux est une urgence : signalez-le immédiatement au bailleur",
      "Ne permettez jamais aux enfants de se pencher par-dessus une rambarde",
      "En cas de fenêtre de toit, vérifiez la présence d'un système de blocage en position entrouverte",
      "Ne stockez pas d'objets lourds ou instables sur un balcon en hauteur"
    ],
    astuces: [
      "Un simple bâton de bois dans le rail d'une baie vitrée coulissante la bloque efficacement",
      "Les limiteurs d'ouverture de fenêtre pour enfants coûtent moins de 10€ et s'installent en 5 minutes",
      "Photographiez l'état des garde-corps à votre arrivée pour protéger votre responsabilité"
    ],
    quandAppeler: [
      "Garde-corps ou rambarde de balcon branlant ou corrodé",
      "Fenêtre impossible à fermer ou verrouiller",
      "Volet roulant bloqué ou déréglé",
      "Installation d'une serrure de sécurité supplémentaire sur une baie vitrée"
    ]
  },
  35: {
    id: 35,
    duree: "Lecture : 10 minutes",
    difficulte: "Facile",
    introduction: "Face à une intrusion ou un cambriolage, les bons réflexes font toute la différence. Connaître les étapes à suivre permet de réagir calmement, de protéger ses droits et de faciliter les démarches auprès des assurances et des autorités.",
    materiel: [
      "Numéros d'urgence affichés (17 police, 18 pompiers, 15 SAMU)",
      "Contrat d'assurance habitation à portée de main",
      "Inventaire photographié de vos biens (à faire en amont)",
      "Coordonnées du bailleur"
    ],
    etapes: [
      {
        titre: "Méthode 1 — En cas de cambriolage découvert à votre retour",
        description: "Réaction immédiate face à une effraction.",
        sousEtapes: [
          "N'entrez pas si la porte est fracturée : l'intrus est peut-être encore présent",
          "Appelez le 17 depuis l'extérieur et attendez les forces de l'ordre",
          "Ne touchez à rien avant le passage de la police (préservation des preuves)",
          "Faites constater les dégâts par les forces de l'ordre (procès-verbal)",
          "Prévenez votre bailleur et votre assurance dans les 24 à 48h"
        ]
      },
      {
        titre: "Méthode 2 — Après le cambriolage, les démarches",
        description: "Étapes administratives à suivre.",
        sousEtapes: [
          "Déposez plainte au commissariat ou à la gendarmerie (obligatoire pour l'assurance)",
          "Contactez votre assureur dans les délais prévus au contrat (souvent 2 jours ouvrés)",
          "Dressez la liste des objets volés avec numéros de série si possible",
          "Demandez au bailleur la réparation de la porte ou des fenêtres forcées",
          "Changez le cylindre de serrure dès que possible (voir fiche dédiée)"
        ]
      }
    ],
    ecogestes: [
      "Un inventaire photographié régulier de vos biens facilite les déclarations sans papier superflu",
      "Privilégiez les déclarations en ligne auprès de votre assureur (gain de temps et moins de papier)",
      "Un logement bien sécurisé en amont évite les réparations coûteuses après coup",
      "Partagez les bons réflexes avec vos voisins : la vigilance collective protège tout l'immeuble"
    ],
    prevention: [
      "Ne laissez jamais de clé sous le paillasson ou dans un endroit prévisible",
      "Ne signalez pas vos absences sur les réseaux sociaux",
      "Variez les habitudes de fermeture (volets, minuteries) pour simuler une présence",
      "Entretenez de bonnes relations avec vos voisins : ils sont vos meilleurs alliés"
    ],
    securite: [
      "En cas d'intrusion en cours : ne confrontez pas l'intrus, mettez-vous en sécurité et appelez le 17",
      "Ne poursuivez jamais un cambrioleur : votre sécurité prime sur les biens",
      "Gardez les numéros d'urgence affichés de manière visible dans le logement",
      "En cas de choc émotionnel, n'hésitez pas à contacter le 15 pour un soutien psychologique"
    ],
    astuces: [
      "Photographiez vos objets de valeur et notez leurs numéros de série dans un document sécurisé en ligne",
      "Vérifiez que votre assurance habitation couvre bien le vol et les dommages liés à l'effraction",
      "Une sonnette connectée ou une caméra de palier peut dissuader et fournir des preuves"
    ],
    quandAppeler: [
      "Réparation de la porte ou du cadre fracturé (serrurier, menuisier)",
      "Changement de serrure sécurisée après effraction",
      "Expertise d'assurance si le montant des dommages est important",
      "Accompagnement psychologique si le choc émotionnel est important"
    ]
  },
  36: {
    id: 36,
    duree: "10-15 minutes",
    difficulte: "Facile",
    introduction: "L'interphone et le digicode sont les premières lignes de sécurité de votre immeuble. Les utiliser correctement protège l'ensemble des résidents et prévient les intrusions dans les parties communes.",
    materiel: [
      "Notice de l'interphone (si disponible)",
      "Code d'accès fourni par le bailleur",
      "Badge ou télécommande d'accès (selon équipement)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Utiliser l'interphone correctement",
        description: "Bonnes pratiques d'utilisation de l'interphone.",
        sousEtapes: [
          "Avant d'ouvrir, identifiez toujours votre interlocuteur via l'audio ou la vidéo",
          "Demandez le nom et l'objet de la visite avant d'actionner l'ouverture",
          "N'ouvrez pas à une personne que vous n'attendez pas ou que vous ne connaissez pas",
          "Pour les livraisons, demandez que le colis soit déposé devant la porte ou en gardiennage",
          "Signalez au bailleur tout interphone défectueux ou absent"
        ]
      },
      {
        titre: "Méthode 2 — Utiliser le digicode en sécurité",
        description: "Précautions avec le code d'accès.",
        sousEtapes: [
          "Ne communiquez le code qu'aux personnes autorisées (famille, aide à domicile connue)",
          "Composez le code en protégeant le clavier de votre main",
          "Attendez que la porte soit bien refermée avant de vous éloigner",
          "Ne laissez jamais entrer une personne inconnue derrière vous sans qu'elle compose le code",
          "Signalez au bailleur si le code vous semble connu de personnes non autorisées"
        ]
      }
    ],
    ecogestes: [
      "Signalez immédiatement les équipements défectueux : un interphone cassé met tout l'immeuble en danger",
      "La vigilance collective est gratuite et très efficace : un regard bienveillant vaut toutes les caméras",
      "Préférez les badges dématérialisés aux clés supplémentaires (plus faciles à désactiver en cas de perte)"
    ],
    prevention: [
      "Demandez le changement du code collectif au bailleur en cas de perte ou de doute",
      "Vérifiez régulièrement que la porte d'entrée se referme bien (ressort ou ferme-porte)",
      "Signalez les portes qui restent ouvertes ou dont le ferme-porte est cassé",
      "Ne coincez jamais la porte d'entrée avec un objet pour faciliter les passages"
    ],
    securite: [
      "Ne laissez jamais entrer une personne derrière vous sans vérification : c'est le principal vecteur d'intrusion",
      "En cas de comportement suspect dans les parties communes, appelez le 17",
      "Ne donnez jamais votre code ou badge à un inconnu, même pour une urgence apparente",
      "En cas de perte de badge ou de clé d'accès, signalez-le immédiatement au bailleur"
    ],
    astuces: [
      "Mémorisez le code sans l'écrire sur un papier dans votre sac ou portefeuille",
      "Un interphone avec caméra est un outil précieux : signalez au bailleur si le vôtre est sans vidéo",
      "Organisez avec vos voisins un système d'alerte informel en cas d'incident"
    ],
    quandAppeler: [
      "Interphone hors service ou son très dégradé",
      "Badge ou télécommande défectueux à remplacer",
      "Porte d'entrée qui ne se referme plus correctement",
      "Digicode dont les touches sont usées ou illisibles"
    ]
  },
  37: {
    id: 37,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "Les sanitaires (WC, lavabo, douche, baignoire) nécessitent un entretien régulier pour rester propres, hygiéniques et fonctionnels. Un nettoyage hebdomadaire avec des produits adaptés suffit à maintenir un état impeccable.",
    materiel: [
      "Vinaigre blanc",
      "Bicarbonate de soude",
      "Brosse WC et éponge",
      "Chiffon microfibre",
      "Citron",
      "Gants de protection"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Nettoyage hebdomadaire des WC",
        description: "Nettoyage complet des toilettes.",
        sousEtapes: [
          "Versez du vinaigre blanc dans la cuvette, laissez agir 15 minutes",
          "Frottez avec la brosse WC en insistant sous le rebord",
          "Nettoyez l'extérieur de la cuvette, l'abattant et le réservoir avec un chiffon microfibre humide",
          "Détartrez les charnières de l'abattant avec du vinaigre concentré",
          "Nettoyez le sol autour avec un chiffon humide et savonneux"
        ]
      },
      {
        titre: "Méthode 2 — Détartrage des robinets et de la douche",
        description: "Élimination du calcaire sur les surfaces.",
        sousEtapes: [
          "Imbibez un chiffon de vinaigre blanc pur et enroulez-le autour du robinet",
          "Laissez agir 30 minutes à 1 heure selon l'encrassement",
          "Frottez avec une vieille brosse à dents pour les recoins",
          "Rincez abondamment à l'eau claire",
          "Frottez la paroi de douche avec une moitié de citron puis rincez pour faire briller"
        ]
      }
    ],
    ecogestes: [
      "Le vinaigre blanc remplace tous les détartrants chimiques du commerce",
      "Un nettoyage hebdomadaire régulier évite les détartrages lourds peu fréquents",
      "Rincez la douche après chaque utilisation : le calcaire s'installe sur les surfaces mouillées",
      "Aérez après le nettoyage pour évacuer les vapeurs de vinaigre naturellement"
    ],
    prevention: [
      "Vérifiez les joints de silicone du lavabo et de la douche chaque trimestre",
      "Nettoyez le filtre de la bonde de douche chaque semaine (cheveux et résidus)",
      "Signalez au bailleur toute fissure dans l'émail de la baignoire ou de la douche",
      "Ne versez jamais de liquides gras ou de résidus alimentaires dans les lavabos"
    ],
    securite: [
      "Portez des gants même pour les produits naturels (vinaigre + peaux sensibles = irritations)",
      "Ne mélangez jamais vinaigre et javel (dégagement de chlore dangereux)",
      "Aérez la pièce pendant et après le nettoyage",
      "Gardez tous les produits hors de portée des enfants"
    ],
    astuces: [
      "Une pierre d'argile naturelle nettoie et fait briller tous les sanitaires sans rayer",
      "Le bicarbonate + quelques gouttes d'huile essentielle de tea tree désinfecte naturellement",
      "Passez un chiffon sec sur les robinets après chaque utilisation pour éviter les traces de calcaire"
    ],
    quandAppeler: [
      "Joint de baignoire ou de douche décollé sur une grande longueur",
      "Fissure dans la bonde ou l'évacuation",
      "Robinet qui fuit malgré le remplacement du joint (voir fiche dédiée)",
      "Cuvette de WC fissurée"
    ]
  },
  38: {
    id: 38,
    duree: "30-45 minutes",
    difficulte: "Facile",
    introduction: "Un réfrigérateur propre et bien entretenu conserve mieux les aliments, consomme moins d'énergie et dure plus longtemps. Un dégivrage régulier du congélateur est indispensable pour maintenir ses performances.",
    materiel: [
      "Vinaigre blanc ou bicarbonate de soude",
      "Chiffons microfibres",
      "Éponge douce",
      "Seau et serviettes absorbantes",
      "Boîtes hermétiques pour protéger les aliments pendant le nettoyage"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Nettoyage mensuel du réfrigérateur",
        description: "Nettoyage régulier de l'intérieur du réfrigérateur.",
        sousEtapes: [
          "Videz le réfrigérateur et jetez les aliments périmés",
          "Retirez les clayettes et tiroirs, lavez-les à l'eau savonneuse",
          "Nettoyez l'intérieur avec un chiffon imbibé d'eau vinaigrée (désinfecte et désodorise)",
          "Essuyez les joints de porte avec un chiffon humide : un joint propre = meilleure étanchéité",
          "Remettez les clayettes, replacez les aliments en vérifiant les températures (4°C réfrigérateur, -18°C congélateur)"
        ]
      },
      {
        titre: "Méthode 2 — Dégivrage du congélateur",
        description: "Dégivrage complet et nettoyage du congélateur.",
        sousEtapes: [
          "Videz le congélateur et placez les aliments dans un sac isotherme",
          "Éteignez et débranchez l'appareil",
          "Posez des serviettes au sol pour absorber l'eau de fonte",
          "Laissez fondre naturellement (n'utilisez pas d'objets pointus pour gratter)",
          "Nettoyez l'intérieur, séchez, rebranchez et attendez 2h avant de remettre les aliments"
        ]
      }
    ],
    ecogestes: [
      "Un congélateur avec 3 mm de givre consomme 30% d'énergie de plus : dégivrez régulièrement",
      "Ne laissez pas le réfrigérateur ouvert inutilement (perte d'énergie immédiate)",
      "Réglez le réfrigérateur à 4°C et le congélateur à -18°C : températures optimales",
      "Couvrez les aliments pour éviter les odeurs et l'humidité excessive"
    ],
    prevention: [
      "Ne placez pas le réfrigérateur contre un mur sans espace (15 cm minimum derrière pour la ventilation)",
      "Nettoyez les grilles de ventilation au dos de l'appareil une fois par an",
      "Vérifiez que les joints de porte adhèrent bien (test du papier : doit résister au retrait)",
      "Signalez au bailleur tout appareil qui ne maintient plus la bonne température"
    ],
    securite: [
      "Débranchez toujours l'appareil avant un nettoyage en profondeur",
      "N'utilisez jamais un couteau ou un objet tranchant pour gratter le givre (perfore le circuit)",
      "En cas de panne prolongée, jetez les aliments décongelés : ne les recongelez pas",
      "Signalez une odeur de brûlé ou un bruit de moteur anormal au bailleur"
    ],
    astuces: [
      "Un bol de bicarbonate de soude placé dans le réfrigérateur absorbe les odeurs naturellement",
      "Étiquetez et datez les aliments congelés pour éviter les oublis et le gaspillage",
      "Le marc de café placé dans le réfrigérateur pendant une nuit élimine les odeurs tenaces"
    ],
    quandAppeler: [
      "Réfrigérateur ou congélateur qui ne refroidit plus malgré le nettoyage",
      "Moteur très bruyant ou qui tourne en continu",
      "Fuite d'eau sous l'appareil non liée au dégivrage",
      "Appareil fourni par le bailleur à remplacer (vétusté)"
    ]
  },
  39: {
    id: 39,
    duree: "30-60 minutes",
    difficulte: "Facile",
    introduction: "Four et hotte accumulent graisses, projections et odeurs. Un entretien régulier évite l'encrassement excessif, réduit les risques d'incendie et maintient les appareils en bon état de fonctionnement.",
    materiel: [
      "Bicarbonate de soude",
      "Vinaigre blanc",
      "Savon noir",
      "Éponge grattante non abrasive",
      "Gants de protection",
      "Chiffons microfibres"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Nettoyage du four sans produits chimiques",
        description: "Nettoyage écologique du four.",
        sousEtapes: [
          "Préchauffez le four à 50°C puis éteignez-le (facilite le décollage des graisses)",
          "Mélangez du bicarbonate et de l'eau pour former une pâte épaisse",
          "Appliquez sur toutes les parois intérieures sauf les résistances",
          "Laissez agir toute une nuit si possible, 2h minimum",
          "Frottez avec une éponge humide et rincez abondamment en essuyant"
        ]
      },
      {
        titre: "Méthode 2 — Nettoyage et dégraissage de la hotte",
        description: "Entretien de la hotte aspirante.",
        sousEtapes: [
          "Retirez les filtres à graisse (se déclipsent généralement facilement)",
          "Faites tremper les filtres métalliques dans de l'eau chaude avec du savon noir et du bicarbonate pendant 20 minutes",
          "Frottez avec une éponge grattante et rincez",
          "Nettoyez l'extérieur de la hotte avec un chiffon humide et du vinaigre dilué",
          "Remettez les filtres en place après séchage complet"
        ]
      }
    ],
    ecogestes: [
      "Nettoyez le four toutes les 4 à 6 semaines pour éviter les nettoyages lourds annuels",
      "Le bicarbonate remplace les produits four très corrosifs et non recyclables",
      "Une hotte propre aspire mieux et consomme moins d'énergie",
      "Couvrez les plats pendant la cuisson pour limiter les projections et l'encrassement"
    ],
    prevention: [
      "Ne laissez jamais de résidus alimentaires brûlés s'accumuler (risque d'incendie)",
      "Nettoyez les filtres de la hotte tous les mois si vous cuisinez souvent",
      "Remplacez le filtre à charbon de la hotte tous les 6 mois (modèles sans évacuation)",
      "Signalez au bailleur tout appareil qui ne chauffe plus uniformément ou dont la porte ne ferme plus"
    ],
    securite: [
      "Ne vaporisez jamais de produit directement sur les résistances du four",
      "Laissez le four refroidir avant tout nettoyage",
      "Ne jamais utiliser le four comme source de chauffage (risque d'intoxication et d'incendie)",
      "En cas de flamme dans le four, fermez la porte et éteignez : n'ouvrez pas, n'utilisez pas d'eau"
    ],
    astuces: [
      "Un bol d'eau avec du citron mis au four à 150°C pendant 20 minutes ramollit les graisses",
      "La lèchefrite se nettoie plus facilement après un trempage dans l'évier",
      "Une feuille de papier cuisson au fond du four évite les projections et facilite l'entretien"
    ],
    quandAppeler: [
      "Résistance de four défectueuse (chauffe inégale ou ne chauffe plus)",
      "Hotte dont le moteur est bruyant ou ne démarre plus",
      "Porte de four qui ne ferme plus hermétiquement",
      "Appareil fourni par le bailleur à remplacer (vétusté ou panne irréparable)"
    ]
  },
  40: {
    id: 40,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "Un lave-linge mal entretenu sent mauvais, consomme plus d'eau et d'électricité, et tombe en panne prématurément. Quelques gestes simples chaque mois suffisent à le garder en parfait état de marche.",
    materiel: [
      "Vinaigre blanc",
      "Bicarbonate de soude",
      "Chiffon microfibre",
      "Vieille brosse à dents",
      "Seau",
      "Savon noir (optionnel)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Nettoyage mensuel du tambour et du joint",
        description: "Nettoyage préventif du lave-linge.",
        sousEtapes: [
          "Nettoyez le joint de hublot avec un chiffon imbibé de vinaigre blanc : insistez dans les plis",
          "Laissez le hublot ouvert entre chaque lavage pour sécher l'intérieur",
          "Lancez un programme à vide à 60°C avec 500 ml de vinaigre blanc dans le tambour",
          "Essuyez le tambour après le cycle avec un chiffon propre",
          "Laissez la porte ouverte jusqu'au prochain lavage"
        ]
      },
      {
        titre: "Méthode 2 — Nettoyage du filtre de vidange",
        description: "Entretien du filtre de la machine.",
        sousEtapes: [
          "Localisez le filtre (petite trappe en bas de la machine, devant)",
          "Posez un seau et une serviette sous la trappe avant d'ouvrir",
          "Ouvrez délicatement : de l'eau va s'écouler",
          "Retirez et nettoyez le filtre sous l'eau en retirant tout résidu (poils, pièces, fibres)",
          "Revissez soigneusement et vérifiez l'absence de fuite au prochain lavage"
        ]
      }
    ],
    ecogestes: [
      "Lavez à 30 ou 40°C dans 90% des cas : aussi efficace et 3 fois moins énergivore qu'à 60°C",
      "Un lave-linge propre consomme moins d'eau et de lessive",
      "Préférez les lessives en poudre ou les dosettes solides (moins d'emballage et de transport)",
      "Remplissez toujours le tambour complètement pour optimiser chaque lavage"
    ],
    prevention: [
      "Nettoyez le filtre tous les 2 mois et à chaque lavage de tapis ou d'animaux",
      "Ne surchargez pas le tambour : cela use les roulements prématurément",
      "Vérifiez régulièrement les tuyaux d'arrivée et d'évacuation d'eau (fissures, fuites)",
      "Retirez les pièces de monnaie et les petits objets des poches avant chaque lavage"
    ],
    securite: [
      "Débranchez la machine avant de nettoyer le filtre",
      "En cas de fuite d'eau sous le lave-linge, coupez l'arrivée d'eau et signalez au bailleur",
      "Ne faites pas tourner un lave-linge en votre absence ni la nuit (risque de fuite)",
      "Signalez tout bruit anormal (claquement, vibrations fortes) avant que la panne s'aggrave"
    ],
    astuces: [
      "Une coupelle de bicarbonate dans le tambour à chaque lavage évite les mauvaises odeurs",
      "Le tiroir à lessive se détache et se nettoie dans l'évier : faites-le tous les mois",
      "Ne jamais mettre de vinaigre et de lessive ensemble dans le même cycle (s'annulent)"
    ],
    quandAppeler: [
      "Machine qui ne vidange plus malgré le filtre propre",
      "Vibrations excessives non corrigées par un rééquilibrage du linge",
      "Fuite persistante sous la machine",
      "Machine fournie par le bailleur en panne : signalement obligatoire"
    ]
  },
  41: {
    id: 41,
    duree: "30-45 minutes",
    difficulte: "Facile",
    introduction: "Le balcon ou la terrasse est un prolongement de votre logement. Son entretien régulier préserve le bâtiment, évite les nuisances pour les voisins du dessous et vous garantit un espace agréable toute l'année.",
    materiel: [
      "Balai et pelle",
      "Seau d'eau savonneuse",
      "Brosse de terrasse",
      "Sac poubelle",
      "Protection pour les plantes (en cas de nettoyage au vinaigre)"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Nettoyage régulier du balcon",
        description: "Entretien courant du balcon ou de la terrasse.",
        sousEtapes: [
          "Balayez les feuilles, poussières et déchets vers l'intérieur (jamais vers la rue ou le voisin du dessous)",
          "Nettoyez le sol avec une brosse et de l'eau savonneuse",
          "Rincez en veillant à ce que l'eau ne ruisselle pas chez le voisin du dessous",
          "Nettoyez la rambarde et les parois avec un chiffon humide",
          "Vérifiez que les évacuations d'eau du balcon ne sont pas bouchées"
        ]
      },
      {
        titre: "Méthode 2 — Entretien saisonnier",
        description: "Entretien adapté à chaque saison.",
        sousEtapes: [
          "Au printemps : nettoyage en profondeur, vérification des fixations des jardinières",
          "En été : arrosage des plantes sans laisser l'eau déborder sur les voisins",
          "En automne : rangement du mobilier de jardin ou protection sous housse",
          "En hiver : retirez les pots fragiles pour éviter le gel, dégagez la neige si nécessaire"
        ]
      }
    ],
    ecogestes: [
      "Récupérez l'eau de pluie dans un arrosoir pour vos plantes de balcon",
      "Choisissez des plantes locales et résistantes qui nécessitent peu d'entretien et d'eau",
      "Compostez les déchets végétaux de vos plantes (lombricomposteur de balcon)",
      "Préférez un mobilier de balcon en bois certifié FSC ou en matériaux recyclés"
    ],
    prevention: [
      "Ne laissez pas stagner l'eau sur le balcon (risque d'infiltration pour l'appartement du dessous)",
      "Vérifiez les fixations des jardinières et suspensions après chaque tempête",
      "Ne stockez pas d'objets encombrants ou lourds qui pourraient tomber",
      "Signalez au bailleur tout fissure ou soulèvement du revêtement du balcon"
    ],
    securite: [
      "Ne faites jamais tomber d'eau ou de déchets sur les voisins ou les passants",
      "Ne surchargez pas le balcon (capacité généralement limitée à 150-250 kg/m²)",
      "Ne faites jamais de barbecue sur un balcon d'immeuble (interdit dans la plupart des règlements)",
      "Fixez solidement tout objet susceptible d'être emporté par le vent"
    ],
    astuces: [
      "Un tapis de balcon drainage permet de garder un sol propre même par temps de pluie",
      "Les plantes aromatiques (basilic, menthe, persil) sont pratiques, peu encombrantes et parfumées",
      "Un store ou un brise-vue améliore l'intimité et l'esthétique sans travaux"
    ],
    quandAppeler: [
      "Fissures ou décollements du revêtement du balcon",
      "Garde-corps rouillé ou branlant (urgence sécurité)",
      "Évacuation d'eau bouchée en profondeur",
      "Infiltration dans l'appartement du dessous venant de votre balcon"
    ]
  },
  42: {
    id: 42,
    duree: "Lecture : 5 minutes",
    difficulte: "Facile",
    introduction: "Vivre en immeuble, c'est partager des espaces et respecter ses voisins. Quelques règles simples permettent de maintenir un cadre de vie agréable, d'éviter les conflits et de préserver les parties communes dans lesquelles chacun contribue.",
    materiel: [
      "Règlement intérieur de la résidence (fourni par le bailleur)",
      "Coordonnées du gardien ou du bailleur"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Les bons réflexes au quotidien",
        description: "Comportements respectueux en immeuble.",
        sousEtapes: [
          "Respectez les horaires de silence (généralement 22h-7h en semaine, 22h-9h le week-end)",
          "Fermez doucement les portes palières et d'entrée",
          "Ne laissez pas d'objets dans les couloirs et escaliers (obstacle et risque incendie)",
          "Sortez vos poubelles aux horaires indiqués et rentrez les conteneurs après collecte",
          "Signalez poliment et directement à votre voisin tout trouble avant d'escalader le conflit"
        ]
      },
      {
        titre: "Méthode 2 — Entretenir les espaces communs",
        description: "Contribution à la propreté collective.",
        sousEtapes: [
          "Nettoyez après vous dans la buanderie ou la salle commune",
          "Respectez les règles d'utilisation des espaces partagés (caves, parkings, locaux vélos)",
          "Ne stockez pas d'encombrants dans les parties communes sans autorisation",
          "Signalez au bailleur tout dégradation des espaces communs dont vous n'êtes pas responsable",
          "Participez aux réunions de résidence si votre bailleur en organise"
        ]
      }
    ],
    ecogestes: [
      "Éteignez les lumières des parties communes si l'extinction automatique est absente",
      "Ne laissez pas couler l'eau dans les espaces communs (buanderie, nettoyage)",
      "Signalez les ampoules grillées dans les communs : elles consomment parfois en reste de court-circuit",
      "Triez vos déchets correctement dans les conteneurs communs (voir fiche tri sélectif)"
    ],
    prevention: [
      "Ne bloquez jamais les portes coupe-feu : elles sauvent des vies en cas d'incendie",
      "Signalez immédiatement toute dégradation des espaces communs au bailleur par écrit",
      "Ne modifiez pas les parties communes sans autorisation du bailleur",
      "Respectez les règles d'affichage : n'apposez rien sur les murs communs sans accord"
    ],
    securite: [
      "Ne laissez jamais d'objets encombrants dans les couloirs (obligation légale de dégagement des voies d'évacuation)",
      "Ne stockez pas de produits inflammables dans les caves ou garages collectifs",
      "En cas d'incendie dans les parties communes, alertez le 18 et évacuez sans prendre l'ascenseur",
      "Signalez toute présence suspecte prolongée dans les parties communes au gardien ou au 17"
    ],
    astuces: [
      "Glissez un mot de présentation dans les boîtes aux lettres de vos voisins lors de votre emménagement",
      "Un voisinage cordial facilite la gestion des petits conflits et renforce la sécurité collective",
      "Le règlement intérieur de votre résidence précise les règles spécifiques à votre immeuble : lisez-le"
    ],
    quandAppeler: [
      "Conflit de voisinage persistant malgré la tentative de dialogue (médiateur ou bailleur)",
      "Nuisances sonores répétées non résolues (signalement au bailleur puis à la mairie)",
      "Dégradation volontaire des parties communes (dépôt de plainte)",
      "Encombrants abandonnés malgré signalement (bailleur ou mairie)"
    ]
  },
  43: {
    id: 43,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "La boîte aux lettres et l'entrée du logement sont les premiers espaces que vous et vos visiteurs voyez. Les entretenir régulièrement relève à la fois du bon voisinage, de la sécurité (courrier non retiré signale une absence) et de la responsabilité du locataire.",
    materiel: [
      "Chiffon propre",
      "Étiquette nominative",
      "Cadenas de remplacement (si nécessaire)",
      "Paillasson propre",
      "Produit nettoyant neutre"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Entretien de la boîte aux lettres",
        description: "Maintenir sa boîte aux lettres en bon état.",
        sousEtapes: [
          "Relevez votre courrier tous les jours ou tous les deux jours maximum",
          "Nettoyez l'intérieur et l'extérieur avec un chiffon humide mensuellement",
          "Vérifiez que votre nom est lisible sur l'étiquette (facilite les livraisons)",
          "Lubrifiez la serrure avec un spray graphite si elle coince",
          "Signalez au bailleur toute boîte endommagée ou dont la serrure ne fonctionne plus"
        ]
      },
      {
        titre: "Méthode 2 — Entretien de l'entrée et du palier",
        description: "Soin de l'espace d'entrée du logement.",
        sousEtapes: [
          "Nettoyez régulièrement le paillasson (secouez-le et brossez-le)",
          "Balayez ou aspirez votre palier une fois par semaine",
          "Ne laissez aucun objet sur le palier (chaussures, vélos, cartons)",
          "Nettoyez la porte palière avec un chiffon humide (poignées et contours)",
          "Vérifiez que votre numéro de porte est bien visible"
        ]
      }
    ],
    ecogestes: [
      "Inscrivez-vous sur la liste Robinson pour limiter la publicité papier dans votre boîte",
      "Optez pour les factures et relevés dématérialisés pour réduire le volume de courrier",
      "Un paillasson en coco naturel est biodégradable et très efficace",
      "Un entrée propre et lumineuse nécessite moins d'éclairage artificiel"
    ],
    prevention: [
      "Une boîte aux lettres pleine signale votre absence aux personnes malveillantes",
      "Prévenez La Poste en cas d'absence prolongée (service de garde du courrier)",
      "Signalez au bailleur toute boîte aux lettres fracturée dans l'immeuble",
      "Ne laissez pas de clés ou d'objets de valeur visibles depuis l'entrée"
    ],
    securite: [
      "En cas de courrier suspect (poudre, odeur, forme anormale) : ne l'ouvrez pas, appelez le 17",
      "Signalez immédiatement au bailleur toute boîte aux lettres forcée",
      "Ne laissez pas d'informations personnelles visibles dans les parties communes",
      "Une entrée encombrée est dangereuse en cas d'évacuation d'urgence"
    ],
    astuces: [
      "Un autocollant 'Stop pub' sur votre boîte réduit considérablement le courrier non sollicité",
      "Notez votre adresse complète et votre nom clairement sur votre boîte pour faciliter les livraisons",
      "Une petite plante sur le palier (avec accord du bailleur) améliore l'ambiance de l'entrée"
    ],
    quandAppeler: [
      "Serrure de boîte aux lettres cassée ou cylindre à remplacer",
      "Porte palière qui ne ferme plus ou dont les charnières sont abîmées",
      "Boîte aux lettres fracturée ou vandalisée",
      "Éclairage du palier défectueux (signalement au bailleur)"
    ]
  },
  44: {
    id: 44,
    duree: "Variable",
    difficulte: "Facile",
    introduction: "Les espaces verts partagés sont un bien commun précieux en logement collectif. Les respecter et y contribuer améliore le cadre de vie de tous les résidents, favorise la biodiversité urbaine et renforce le lien de voisinage.",
    materiel: [
      "Gants de jardinage",
      "Sac pour les déchets verts",
      "Outils de jardinage légers (si jardinage partagé autorisé)",
      "Règlement de la résidence"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Respecter les espaces verts communs",
        description: "Règles de base pour préserver les espaces verts.",
        sousEtapes: [
          "Ne jetez aucun déchet dans les espaces verts (mégots, emballages, déchets alimentaires)",
          "Ramassez les déjections de vos animaux systématiquement",
          "Respectez les pelouses : ne les piétinez pas excessivement, notamment par temps humide",
          "Signalez au bailleur tout arbre dangereux, branche cassée ou mobilier dégradé",
          "Ne cueillez pas les fleurs ou plantes des espaces communs"
        ]
      },
      {
        titre: "Méthode 2 — Participer à l'entretien collectif",
        description: "Contribuer activement aux espaces verts.",
        sousEtapes: [
          "Renseignez-vous auprès du bailleur sur les initiatives de jardinage partagé",
          "Participez aux journées de nettoyage ou de plantation organisées par la résidence",
          "Proposez à votre bailleur la création d'un composteur collectif si absent",
          "Signalez les dégradations (tags, mobilier cassé, déchets abandonnés) par écrit au bailleur",
          "Invitez vos voisins à participer : un projet collectif crée du lien"
        ]
      }
    ],
    ecogestes: [
      "Un composteur collectif valorise les déchets organiques de toute la résidence",
      "Des plantes mellifères dans les espaces verts favorisent les pollinisateurs en ville",
      "Privilégiez l'arrosage le matin ou le soir pour limiter l'évaporation",
      "Signalez les arrosages automatiques défectueux qui gaspillent de l'eau"
    ],
    prevention: [
      "Signalez les arbres dont les racines soulèvent les trottoirs ou dalles (risque de chute)",
      "Ne taillez pas les arbres et haies communs sans autorisation du bailleur",
      "Évitez de stationner sur les espaces verts (compacte le sol et tue l'herbe)",
      "Renseignez-vous sur les produits utilisés par les prestataires d'entretien (droit à l'information)"
    ],
    securite: [
      "Signalez immédiatement au bailleur tout arbre penché ou branche menaçante",
      "Ne laissez pas les enfants jouer sous des arbres présentant des branches mortes",
      "En cas de nid de frelons dans les espaces verts, signalez au bailleur et ne pas approcher",
      "Les produits phytosanitaires chimiques sont interdits dans les espaces publics depuis 2017"
    ],
    astuces: [
      "Proposez à votre bailleur l'installation de nichoirs ou d'hôtels à insectes dans les espaces verts",
      "Un potager partagé crée du lien social et produit des légumes frais pour les participants",
      "Photographiez régulièrement les espaces verts pour documenter leur évolution"
    ],
    quandAppeler: [
      "Arbre malade ou dangereux à élaguer ou abattre",
      "Nid de frelons ou de guêpes dans les espaces communs",
      "Espèces végétales invasives à traiter (renouée du Japon, ambroisie)",
      "Aménagement ou création d'un espace vert partagé"
    ]
  },
  45: {
    id: 45,
    duree: "30-45 minutes",
    difficulte: "Facile",
    introduction: "L'installation d'une box internet peut sembler complexe, mais la plupart des opérateurs ont simplifié la procédure au maximum. Suivre les étapes dans le bon ordre permet généralement de se connecter en moins d'une heure.",
    materiel: [
      "Box internet et ses câbles (fournis par l'opérateur)",
      "Prise téléphonique ou prise fibre (selon votre logement)",
      "Smartphone ou ordinateur pour la configuration",
      "Identifiants fournis par l'opérateur"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Installation d'une box ADSL/VDSL",
        description: "Procédure pour une connexion ADSL.",
        sousEtapes: [
          "Repérez la prise téléphonique murale (prise RJ11)",
          "Branchez le filtre ADSL sur la prise, puis reliez-le à la box avec le câble fourni",
          "Branchez l'alimentation électrique de la box",
          "Attendez 5 à 10 minutes que la box s'initialise (voyants qui clignotent puis fixes)",
          "Connectez votre appareil au Wi-Fi (SSID et mot de passe indiqués sous la box)"
        ]
      },
      {
        titre: "Méthode 2 — Installation d'une box fibre optique",
        description: "Procédure pour une connexion fibre.",
        sousEtapes: [
          "Localisez la prise fibre (PTO) dans votre logement (petite prise blanche murale)",
          "Reliez la PTO à l'ONT (boîtier fibre) avec le câble fibre fourni",
          "Reliez l'ONT à la box internet avec un câble Ethernet",
          "Branchez les alimentations et attendez l'initialisation (10 à 15 minutes)",
          "Connectez-vous au Wi-Fi et testez la connexion via le navigateur"
        ]
      }
    ],
    ecogestes: [
      "Éteignez votre box la nuit : économie de 30 à 40€ par an sur la facture électrique",
      "Positionnez votre box à un endroit central pour éviter les répéteurs Wi-Fi énergivores",
      "Évitez de changer de box trop fréquemment : chaque appareil électronique a un coût environnemental",
      "Recyclez votre ancienne box auprès de votre opérateur ou en déchetterie"
    ],
    prevention: [
      "Placez la box dans un endroit ventilé, jamais dans un meuble fermé (surchauffe)",
      "Vérifiez régulièrement que les câbles ne sont pas écrasés ou pliés",
      "Redémarrez la box une fois par mois pour optimiser ses performances",
      "Notez votre identifiant et mot de passe Wi-Fi dans un endroit sûr"
    ],
    securite: [
      "Changez le mot de passe Wi-Fi par défaut dès l'installation (voir fiche sécurité numérique)",
      "Ne partagez pas votre Wi-Fi avec des inconnus",
      "En cas de problème, contactez le support de votre opérateur avant de démonter quoi que ce soit",
      "Signalez au bailleur si la prise téléphonique ou fibre de votre logement est absente ou défectueuse"
    ],
    astuces: [
      "Le câble Ethernet est toujours plus stable et rapide que le Wi-Fi pour un ordinateur fixe",
      "Si le Wi-Fi ne couvre pas tout le logement, un répéteur Wi-Fi ou un kit CPL est la solution",
      "L'application de votre opérateur permet souvent de diagnostiquer et résoudre les problèmes seul"
    ],
    quandAppeler: [
      "Absence de prise téléphonique ou fibre dans le logement (intervention du bailleur ou de l'opérateur)",
      "Connexion instable malgré le redémarrage et les vérifications",
      "Câblage interne du logement défectueux",
      "Installation de prises réseau supplémentaires"
    ]
  },
  46: {
    id: 46,
    duree: "15-20 minutes",
    difficulte: "Facile",
    introduction: "La plupart des bailleurs sociaux proposent aujourd'hui un espace locataire en ligne. Ces outils permettent de gérer son logement plus facilement, de suivre ses demandes et de gagner du temps sur les démarches administratives.",
    materiel: [
      "Ordinateur, tablette ou smartphone",
      "Identifiants fournis par le bailleur (numéro de locataire, email)",
      "Numéro de bail ou référence de contrat"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Créer et activer son espace locataire",
        description: "Inscription à l'espace en ligne du bailleur.",
        sousEtapes: [
          "Rendez-vous sur le site internet de votre bailleur",
          "Repérez le bouton 'Espace locataire' ou 'Mon compte'",
          "Cliquez sur 'Créer mon compte' et renseignez votre numéro de locataire",
          "Validez votre email via le lien reçu dans votre boîte mail",
          "Choisissez un mot de passe sécurisé (majuscule, chiffre, caractère spécial)"
        ]
      },
      {
        titre: "Méthode 2 — Utiliser les fonctionnalités principales",
        description: "Navigation dans l'espace locataire.",
        sousEtapes: [
          "Consultez vos appels de loyer et téléchargez vos quittances",
          "Signalez une panne ou un problème via le formulaire de demande d'intervention",
          "Suivez l'avancement de vos demandes en cours",
          "Mettez à jour vos coordonnées (téléphone, email) directement en ligne",
          "Accédez aux documents importants (contrat, règlement intérieur, diagnostics)"
        ]
      }
    ],
    ecogestes: [
      "Les démarches en ligne suppriment les courriers papier et les déplacements",
      "Téléchargez vos quittances en PDF plutôt que de les demander en version papier",
      "Les signalements en ligne sont traités plus rapidement et génèrent moins de déplacements inutiles",
      "Activez les notifications par email pour suivre vos demandes sans relance"
    ],
    prevention: [
      "Conservez vos identifiants en lieu sûr (gestionnaire de mots de passe)",
      "Vérifiez régulièrement que vos coordonnées sont à jour sur l'espace locataire",
      "En cas de problème urgent, ne comptez pas uniquement sur l'espace en ligne : appelez le bailleur",
      "Gardez une copie papier de vos quittances importantes (déménagement, demande d'aide)"
    ],
    securite: [
      "Ne partagez jamais vos identifiants avec une tierce personne",
      "Déconnectez-vous après chaque session depuis un appareil partagé",
      "Méfiez-vous des emails qui vous demandent vos identifiants : votre bailleur ne le fera jamais",
      "Signalez immédiatement au bailleur si vous suspectez un accès non autorisé à votre compte"
    ],
    astuces: [
      "Notez le numéro d'urgence du bailleur séparément : l'espace en ligne peut être indisponible en cas de panne",
      "Téléchargez et archivez vos quittances chaque mois pour votre dossier personnel",
      "Certains bailleurs proposent une application mobile : plus pratique pour les signalements en déplacement"
    ],
    quandAppeler: [
      "Impossible de créer ou d'accéder à votre espace locataire malgré les tentatives (contacter le service client)",
      "Données personnelles incorrectes impossible à modifier en ligne",
      "Demande d'intervention urgente : toujours doubler d'un appel téléphonique",
      "Litige sur un loyer ou des charges : préférez le courrier recommandé à l'espace en ligne"
    ]
  },
  47: {
    id: 47,
    duree: "20-30 minutes",
    difficulte: "Facile",
    introduction: "À la maison, nos données personnelles peuvent être exposées via le Wi-Fi, les appareils connectés ou les arnaques en ligne. Quelques réflexes simples permettent de se protéger efficacement sans connaissances techniques particulières.",
    materiel: [
      "Accès à l'interface de votre box internet (via navigateur)",
      "Gestionnaire de mots de passe (application gratuite)",
      "Antivirus gratuit (Windows Defender ou Avast)",
      "Smartphone ou ordinateur"
    ],
    etapes: [
      {
        titre: "Méthode 1 — Sécuriser son réseau Wi-Fi",
        description: "Protection du réseau domestique.",
        sousEtapes: [
          "Accédez à l'interface de votre box (généralement via 192.168.1.1 dans votre navigateur)",
          "Changez le mot de passe Wi-Fi par défaut par un mot de passe long et unique",
          "Vérifiez que le chiffrement est en WPA2 ou WPA3 (jamais WEP)",
          "Désactivez la fonction WPS si elle est activée (vulnérabilité connue)",
          "Créez un réseau Wi-Fi invité séparé pour vos visiteurs"
        ]
      },
      {
        titre: "Méthode 2 — Protéger ses comptes en ligne",
        description: "Sécurisation des accès personnels.",
        sousEtapes: [
          "Utilisez un mot de passe différent pour chaque compte important",
          "Installez un gestionnaire de mots de passe gratuit (Bitwarden, KeePass)",
          "Activez la double authentification sur votre email et vos comptes sensibles",
          "Vérifiez régulièrement les appareils connectés à votre réseau Wi-Fi",
          "Méfiez-vous des emails et SMS demandant des informations personnelles (phishing)"
        ]
      }
    ],
    ecogestes: [
      "Désactivez le Wi-Fi et le Bluetooth de vos appareils la nuit pour réduire la consommation",
      "Limitez les objets connectés inutiles (chaque appareil est une porte d'entrée potentielle)",
      "Supprimez les applications inutilisées qui collectent vos données en arrière-plan",
      "Préférez les services en ligne respectueux des données (options européennes quand possible)"
    ],
    prevention: [
      "Mettez à jour régulièrement vos appareils (téléphone, ordinateur, box) : les mises à jour corrigent les failles",
      "Sauvegardez régulièrement vos données importantes sur un disque externe ou un cloud sécurisé",
      "Vérifiez les autorisations de vos applications : une lampe de poche n'a pas besoin d'accéder à vos contacts",
      "Ne cliquez jamais sur un lien dans un email inattendu, même s'il semble venir d'un organisme connu"
    ],
    securite: [
      "En cas d'arnaque ou de tentative de phishing, signalez-le sur signal-spam.fr ou cybermalveillance.gouv.fr",
      "Ne donnez jamais votre mot de passe à une personne se présentant comme le support technique",
      "En cas de piratage de compte : changez immédiatement le mot de passe et prévenez votre banque si nécessaire",
      "Activez le verrouillage automatique sur tous vos appareils (code, empreinte)"
    ],
    astuces: [
      "Le site haveibeenpwned.com vous indique si votre email a été compromis dans une fuite de données",
      "Une bande adhésive sur la caméra de votre ordinateur est une protection simple et efficace",
      "Cybermalveillance.gouv.fr est la ressource officielle française pour toutes les questions de sécurité numérique"
    ],
    quandAppeler: [
      "Ordinateur infecté par un virus ou un ransomware",
      "Usurpation d'identité numérique avérée",
      "Perte d'accès à des comptes importants (email, espace bailleur)",
      "Besoin d'accompagnement numérique (Espaces France Services disponibles dans la plupart des communes)"
    ]
  }
};

export function getTutoContent(id: number): TutoContent {
  return TUTOS_CONTENT[id] || {
    id,
    introduction: "Contenu en cours de rédaction. Revenez bientôt pour plus de détails !",
    ecogestes: ["Ce tutoriel sera bientôt disponible avec des instructions détaillées."],
    prevention: ["Contenu à venir."],
    etapes: []
  };
}
