import type { Locale } from "@/i18n/config";



type CapabilityCardCopy = { title: string; body: string; imageAlt: string };



export interface AiChatCopy {

  seo: { title: string; description: string };

  hero: { eyebrow: string; title: string; subtitle: string; imageAlt: string };

  /** Trial CTA block. `null` keeps the component's own (EN) defaults. */

  trial: { title: string; body: string } | null;

  contactHeading: string;

  contactBody: string;

  capabilities: {

    connected: {

      heading: string;

      erp: CapabilityCardCopy;

      knowledge: CapabilityCardCopy;

      integrations: CapabilityCardCopy & { footerLink: string };

    };

    documents: {

      heading: string;

      excel: CapabilityCardCopy;

      word: CapabilityCardCopy;

      presentations: CapabilityCardCopy;

    };

    personalisation: {

      heading: string;

      languages: CapabilityCardCopy;

      team: CapabilityCardCopy;

      models: CapabilityCardCopy;

    };

  };

}



const en: AiChatCopy = {

  seo: {

    title: "AI Chat | Safe AI chat on your company knowledge | Wonka",

    description:

      "Find answers and get work done with AI connected to your company knowledge, business tools and leading models. EU-hosted, with enterprise access control. Talk to our team to get started.",

  },

  hero: {

    eyebrow: "AI Chat",

    title: "Find answers and get work done faster.",

    subtitle:

      "Work with your company knowledge, business tools and the leading AI models to find answers and get everyday tasks done, all in one secure place.",

    imageAlt: "Wonka AI chat workspace",

  },

  trial: null,

  contactHeading: "Want to see what Wonka Workspace\ncould do for your team?",

  contactBody:
    "Book a short demo and we'll show how Wonka Workspace can connect to your tools, support your workflows and make AI accessible across your organisation.",

  capabilities: {

    connected: {

      heading: "Find answers in the tools you already use.",

      erp: {

        title: "Get answers from your ERP.",

        body: "Check orders, invoices and margins without digging through reports.",

        imageAlt: "ERP answers in Wonka AI Chat",

      },

      knowledge: {

        title: "Put your company knowledge to use.",

        body: "Find answers in your own documents, policies and internal information.",

        imageAlt: "Company knowledge in Wonka AI Chat",

      },

      integrations: {

        title: "Your tools, connected.",

        body: "Work with information from Odoo, SharePoint, Teams, Outlook, Salesforce and more.",

        imageAlt: "Connected integrations in Wonka AI Chat",

        footerLink: "View all integrations →",

      },

    },

    documents: {

      heading: "Turn conversations into finished work.",

      excel: {

        title: "Get spreadsheets ready to use.",

        body: "Ask for the numbers and get an editable Excel file.",

        imageAlt: "Excel export from Wonka AI Chat",

      },

      word: {

        title: "Write and edit documents faster.",

        body: "Draft, rewrite and improve documents without starting from scratch.",

        imageAlt: "Word documents with Wonka AI Chat",

      },

      presentations: {

        title: "Turn your ideas into presentations.",

        body: "Turn notes and summaries into PowerPoint slides in minutes.",

        imageAlt: "Presentations from Wonka AI Chat",

      },

    },

    personalisation: {

      heading: "AI that works the way your team does.",

      languages: {

        title: "Work in your own language.",

        body: "Use AI in Dutch, French or English, whichever works best for you.",

        imageAlt: "Language choice in Wonka AI Chat",

      },

      team: {

        title: "Share useful work with your team.",

        body: "Share conversations and make information easier to reuse across your team.",

        imageAlt: "Team sharing in Wonka AI Chat",

      },

      models: {

        title: "The right AI for the right task.",

        body: "Use different AI models depending on the work, without switching between tools.",

        imageAlt: "AI model choice in Wonka AI Chat",

      },

    },

  },

};



const fr: AiChatCopy = {

  seo: {

    title: "Chat IA | Réponses et travail au quotidien | Wonka",

    description:

      "Trouvez des réponses et avancez le travail avec l'IA, la connaissance de l'entreprise, vos outils métier et les principaux modèles. Hébergé dans l'UE, avec contrôle d'accès. Contactez notre équipe.",

  },

  hero: {

    eyebrow: "Chat IA",

    title: "Trouvez des réponses. Avancez le travail.",

    subtitle:

      "Travaillez avec la connaissance de l'entreprise, vos outils métier et les principaux modèles d'IA pour trouver des réponses et traiter le quotidien, en un seul endroit sécurisé.",

    imageAlt: "Espace de travail Wonka AI avec chat IA",

  },

  trial: null,

  contactHeading: "Envie de voir ce que Wonka Workspace\npeut faire pour votre équipe ?",

  contactBody:
    "Réservez une courte démo : nous vous montrerons comment Wonka Workspace se connecte à vos outils, soutient vos workflows et rend l'IA accessible dans toute votre organisation.",

  capabilities: {

    connected: {

      heading: "Trouvez des réponses dans les outils que vous utilisez déjà.",

      erp: {

        title: "Obtenez des réponses depuis votre ERP.",

        body: "Consultez commandes, factures et marges sans fouiller dans les rapports.",

        imageAlt: "Réponses ERP dans le Chat IA Wonka",

      },

      knowledge: {

        title: "Mettez la connaissance de l'entreprise à profit.",

        body: "Trouvez des réponses dans vos documents, politiques et informations internes.",

        imageAlt: "Connaissance d'entreprise dans le Chat IA Wonka",

      },

      integrations: {

        title: "Vos outils, connectés.",

        body: "Travaillez avec les informations d'Odoo, SharePoint, Teams, Outlook, Salesforce et plus encore.",

        imageAlt: "Intégrations connectées dans le Chat IA Wonka",

        footerLink: "Voir toutes les intégrations →",

      },

    },

    documents: {

      heading: "Transformez les conversations en travail abouti.",

      excel: {

        title: "Des tableurs prêts à l'emploi.",

        body: "Demandez les chiffres et recevez un fichier Excel modifiable.",

        imageAlt: "Export Excel depuis le Chat IA Wonka",

      },

      word: {

        title: "Rédigez et modifiez plus vite.",

        body: "Rédigez, reformulez et améliorez des documents sans repartir de zéro.",

        imageAlt: "Documents Word avec le Chat IA Wonka",

      },

      presentations: {

        title: "Transformez vos idées en présentations.",

        body: "Passez des notes et résumés à des slides PowerPoint en quelques minutes.",

        imageAlt: "Présentations avec le Chat IA Wonka",

      },

    },

    personalisation: {

      heading: "Une IA qui suit la façon de travailler de vos équipes.",

      languages: {

        title: "Travaillez dans votre langue.",

        body: "Utilisez l'IA en néerlandais, français ou anglais, selon ce qui vous convient.",

        imageAlt: "Choix de langue dans le Chat IA Wonka",

      },

      team: {

        title: "Partagez le travail utile avec votre équipe.",

        body: "Partagez des conversations et facilitez la réutilisation d'informations dans l'équipe.",

        imageAlt: "Partage en équipe dans le Chat IA Wonka",

      },

      models: {

        title: "La bonne IA pour la bonne tâche.",

        body: "Utilisez différents modèles d'IA selon le travail, sans changer d'outil.",

        imageAlt: "Choix de modèle dans le Chat IA Wonka",

      },

    },

  },

};



const nl: AiChatCopy = {

  seo: {

    title: "AI-chat | Antwoorden vinden en werk doen | Wonka",

    description:

      "Vind antwoorden en krijg werk gedaan met AI, bedrijfskennis, bedrijfstools en toonaangevende modellen. Gehost in de EU, met toegangsbeheer. Contacteer ons team.",

  },

  hero: {

    eyebrow: "AI-chat",

    title: "Vind antwoorden. Krijg werk gedaan.",

    subtitle:

      "Werk met uw bedrijfskennis, bedrijfstools en toonaangevende AI-modellen om antwoorden te vinden en dagelijkse taken te doen, op één veilige plek.",

    imageAlt: "Wonka AI-chatwerkruimte",

  },

  trial: null,

  contactHeading: "Benieuwd wat Wonka Workspace\nvoor uw team kan doen?",

  contactBody:
    "Boek een korte demo en wij tonen hoe Wonka Workspace aansluit op uw tools, uw workflows ondersteunt en AI toegankelijk maakt in heel uw organisatie.",

  capabilities: {

    connected: {

      heading: "Vind antwoorden in de tools die u al gebruikt.",

      erp: {

        title: "Krijg antwoorden uit uw ERP.",

        body: "Bekijk orders, facturen en marges zonder door rapporten te graven.",

        imageAlt: "ERP-antwoorden in Wonka AI-chat",

      },

      knowledge: {

        title: "Zet uw bedrijfskennis in.",

        body: "Vind antwoorden in uw eigen documenten, beleid en interne informatie.",

        imageAlt: "Bedrijfskennis in Wonka AI-chat",

      },

      integrations: {

        title: "Uw tools, verbonden.",

        body: "Werk met informatie uit Odoo, SharePoint, Teams, Outlook, Salesforce en meer.",

        imageAlt: "Gekoppelde integraties in Wonka AI-chat",

        footerLink: "Bekijk alle integraties →",

      },

    },

    documents: {

      heading: "Maak van gesprekken afgewerkt werk.",

      excel: {

        title: "Spreadsheets klaar voor gebruik.",

        body: "Vraag om de cijfers en ontvang een bewerkbaar Excel-bestand.",

        imageAlt: "Excel-export vanuit Wonka AI-chat",

      },

      word: {

        title: "Schrijf en bewerk documenten sneller.",

        body: "Stel documenten op, herschrijf en verbeter ze zonder opnieuw te beginnen.",

        imageAlt: "Word-documenten met Wonka AI-chat",

      },

      presentations: {

        title: "Zet ideeën om in presentaties.",

        body: "Maak van notities en samenvattingen in enkele minuten PowerPoint-slides.",

        imageAlt: "Presentaties met Wonka AI-chat",

      },

    },

    personalisation: {

      heading: "AI die werkt zoals uw team werkt.",

      languages: {

        title: "Werk in uw eigen taal.",

        body: "Gebruik AI in het Nederlands, Frans of Engels, wat voor u het best werkt.",

        imageAlt: "Taalkeuze in Wonka AI-chat",

      },

      team: {

        title: "Deel nuttig werk met uw team.",

        body: "Deel gesprekken en maak informatie makkelijker herbruikbaar in uw team.",

        imageAlt: "Delen in team in Wonka AI-chat",

      },

      models: {

        title: "De juiste AI voor de juiste taak.",

        body: "Gebruik verschillende AI-modellen afhankelijk van het werk, zonder van tool te wisselen.",

        imageAlt: "AI-modelkeuze in Wonka AI-chat",

      },

    },

  },

};



export const AI_CHAT_COPY: Record<Locale, AiChatCopy> = { en, fr, nl };


