export interface TranslationContent {
  nav: {
    architecture: string;
    gdpr: string;
    threats: string;
    lifecycle: string;
    ecosystem: string;
    briefing: string;
    getInTouch: string;
    requestDemo: string;
  };
  hero: {
    tagline: string;
    titleMain: string;
    titleGradient: string;
    subtitle: string;
    exploreBtn: string;
    demoBtn: string;
    scrollHint: string;
    stats: {
      latency: { label: string; value: string };
      storage: { label: string; value: string };
      compliance: { label: string; value: string };
    };
  };
  gdpr: {
    badge: string;
    titleMain: string;
    titleGradient: string;
    subtitle: string;
    cards: Array<{
      article: string;
      title: string;
      requirement: string;
      solution: string;
    }>;
  };
  threats: {
    badge: string;
    titleMain: string;
    titleGradient: string;
    subtitle: string;
    modeVulnerable: string;
    modeProtected: string;
    sqlTitle: string;
    sqlSubtitle: string;
    breachResultVulnerable: string;
    breachResultProtected: string;
    leakRateLabel: string;
    cryptoShieldLabel: string;
    samplePlaceholder: string;
    tokenizeBtn: string;
  };
  lifecycle: {
    badge: string;
    titleMain: string;
    titleGradient: string;
    subtitle: string;
    stages: Array<{
      step: string;
      title: string;
      desc: string;
      tech: string;
    }>;
  };
  ecosystem: {
    badge: string;
    rssiTitle: string;
    rssiGradient: string;
    rssiDesc: string;
    rssiFeatures: Array<{ title: string; desc: string }>;
    rssiCta: string;
    dpoTitle: string;
    dpoGradient: string;
    dpoDesc: string;
    dpoFeatures: Array<{ title: string; desc: string }>;
    dpoCta: string;
  };
  briefing: {
    badge: string;
    titleMain: string;
    titleGradient: string;
    subtitle: string;
    nameLabel: string;
    emailLabel: string;
    roleLabel: string;
    orgLabel: string;
    volumeLabel: string;
    submitBtn: string;
    modalTitle: string;
    modalDesc: string;
    closeBtn: string;
  };
}

export const translations: Record<'fr' | 'en', TranslationContent> = {
  fr: {
    nav: {
      architecture: "Architecture",
      gdpr: "Piliers RGPD",
      threats: "Bac à Sable",
      lifecycle: "Cycle de Vie",
      ecosystem: "Écosystème",
      briefing: "Briefing",
      getInTouch: "Nous Contacter",
      requestDemo: "Demander une démo"
    },
    hero: {
      tagline: "CONFORMITÉ SOUVERAINE & TOKENISATION",
      titleMain: "La tokenisation devient votre",
      titleGradient: "meilleure preuve de conformité",
      subtitle: "Offrez à votre DPO la garantie technique d'une pseudonymisation conforme à la CNIL (RGPD), et à votre RSSI le moyen de neutraliser le risque d'exfiltration face aux exigences de l'ANSSI (NIS2).",
      exploreBtn: "Explorer la Conformité",
      demoBtn: "Demander une démo",
      scrollHint: "Scrollez pour explorer",
      stats: {
        latency: { label: "LATENCE ENCLAVE", value: "< 1.2ms" },
        storage: { label: "STOCKAGE EN CLAIR", value: "0 Donnée" },
        compliance: { label: "CONFORMITÉ NATIVE", value: "CNIL • NIS2" }
      }
    },
    gdpr: {
      badge: "CONFORMITÉ JURIDIQUE & TECHNIQUE",
      titleMain: "Le garant technique de votre",
      titleGradient: "conformité RGPD",
      subtitle: "Répondez à la conformité RGPD grâce à la tokenisation et au chiffrement de vos données",
      cards: [
        {
          article: "Article 4(5)",
          title: "Pseudonymisation",
          requirement: "Le RGPD exige de séparer les données sensibles de l'identité, sans perdre leur utilité métier.",
          solution: "Veilio remplace chaque donnée par un token opaque. La valeur réelle reste chiffrée en AES-256-GCM dans le coffre isolé et n'est révélée qu'aux services autorisés."
        },
        {
          article: "Article 5(1)(c)",
          title: "Minimisation des Données",
          requirement: "Ne traiter et ne stocker que les données strictement adéquates et nécessaires.",
          solution: "Seuls des tokens circulent dans vos applications et bases de données en aval. Le volume de données sensibles exposées est réduit à 0."
        },
        {
          article: "Article 5(1)(e)",
          title: "Crypto-Shredding & Rétention",
          requirement: "Les données ne doivent pas être conservées au-delà de la durée légale requise.",
          solution: "À échéance ou sur demande d'effacement (droit à l'oubli), la destruction de la clé cryptographique rend la donnée définitivement et irréversiblement inexploitable."
        },
        {
          article: "Article 5(1)(f)",
          title: "Intégrité & Confidentialité",
          requirement: "Garantir la sécurité absolue des données contre tout accès non autorisé ou fuite.",
          solution: "Chiffrement matériel AES-256-GCM avec clés maîtres sous HSM, segmentation étanche par organisation et politiques d'accès Zero-Trust."
        },
        {
          article: "Article 5(2)",
          title: "Responsabilité & Preuve",
          requirement: "Être en mesure de prouver et documenter la conformité à tout moment aux auditeurs.",
          solution: "Journal d'audit immuable horodaté enregistrant chaque tokenisation et détokenisation : qui a accédé à quoi, quand, et avec quelle justification."
        }
      ]
    },
    threats: {
      badge: "SIMULATEUR DE MENACE TEMPS RÉEL",
      titleMain: "Fuite de Données :",
      titleGradient: "Rien à voler pour les attaquants",
      subtitle: "Testez vous-même la différence radicale entre une architecture classique vulnérable et la forteresse Veilio.",
      modeVulnerable: "Sans Veilio (Vulnérable)",
      modeProtected: "Avec Veilio (Fortifié)",
      sqlTitle: "SIMULATION D'EXTRACTION SQL MALVEILLANTE",
      sqlSubtitle: "Résultat capturé par l'attaquant lors d'une brèche :",
      breachResultVulnerable: "CRITIQUE : Toutes les identités, emails, numéros de cartes et données PII sont aspirées en clair. Amende RGPD immédiate jusqu'à 20M€ ou 4% du CA mondial.",
      breachResultProtected: "SUCCÈS DE DÉFENSE : L'attaquant n'emporte que des jetons opaques aléatoires (tk_live_...). Zéro donnée en clair dérobée. Aucune obligation de notification de crise.",
      leakRateLabel: "Données Sensibles Exposées",
      cryptoShieldLabel: "Statut du Bouclier Cryptographique",
      samplePlaceholder: "Tapez une donnée sensible (ex: john.doe@corp.com, 4532-xxxx)",
      tokenizeBtn: "Tokeniser en Direct"
    },
    lifecycle: {
      badge: "ARCHITECTURE EN 7 ÉTAPES",
      titleMain: "Le Cycle de Vie de la Donnée",
      titleGradient: "de bout en bout",
      subtitle: "De l'ingestion initiale jusqu'à la destruction cryptographique programmée.",
      stages: [
        {
          step: "01",
          title: "Ingestion Sécurisée",
          desc: "Réception de la donnée brute via API REST/gRPC avec chiffrement mTLS en transit.",
          tech: "TLS 1.3 • Chiffrement de flux"
        },
        {
          step: "02",
          title: "Enclave de Tokenisation",
          desc: "Génération instantanée d'un jeton opaque format-preserving ou aléatoire.",
          tech: "Latence < 1.2ms • SHA-256"
        },
        {
          step: "03",
          title: "Séquestre Chiffré",
          desc: "Chiffrement AES-256-GCM de la donnée originale isolée dans le coffre souverain.",
          tech: "Enclave HSM • Clés Dédiées"
        },
        {
          step: "04",
          title: "Diffusion Aval",
          desc: "Vos bases SQL, lacs de données et pipelines IA ne manipulent que des tokens sans risque.",
          tech: "0 Plaintext en Base"
        },
        {
          step: "05",
          title: "Contrôle RBAC",
          desc: "Détokenisation conditionnée aux permissions de rôle, périmètre et authentification stricte.",
          tech: "Zero-Trust • Rôles Étoffés"
        },
        {
          step: "06",
          title: "Crypto-Shredding",
          desc: "Purge instantanée par effacement de la clé maître à l'expiration de la durée de rétention.",
          tech: "Destruction Cryptographique"
        },
        {
          step: "07",
          title: "Piste d'Audit Immuable",
          desc: "Traçabilité intégrale exportable pour les contrôles CNIL et certifications ISO 27001 / SOC 2.",
          tech: "Logs Horodatés Inaltérables"
        }
      ]
    },
    ecosystem: {
      badge: "CONVERGENCE DES POUVOIRS",
      rssiTitle: "Pour le RSSI & Développeurs",
      rssiGradient: "Sécurité & Zéro Refactoring",
      rssiDesc: "Neutralisez la surface d'attaque sans ralentir les cycles de livraison produit. Intégration en moins de 2 heures.",
      rssiFeatures: [
        { title: "Zéro Refactoring Applicatif", desc: "Les jetons conservent le format de vos colonnes de base de données (emails, téléphones, IBANs)." },
        { title: "Conformité NIS2 Clé-en-Main", desc: "Répond directement aux obligations de résilience et de chiffrement imposées par l'ANSSI." },
        { title: "Performances Ultra-Basses Latences", desc: "Moins de 1.2 milliseconde de surcoût par requête de tokenisation." }
      ],
      rssiCta: "Consulter la documentation API →",
      dpoTitle: "Pour le DPO & Juristes",
      dpoGradient: "Garantie & Preuve CNIL",
      dpoDesc: "Transformez vos obligations légales RGPD en une réalité technique tangible et incontestable lors de vos audits.",
      dpoFeatures: [
        { title: "Pseudonymisation Certifiable", desc: "Conforme aux recommandations de la CNIL et du Comité Européen de Protection des Données." },
        { title: "Droit à l'Oubli Garanti", desc: "Effacement instantané dans l'ensemble de votre écosystème via destruction de clé." },
        { title: "Rapport d'Audit Prêt à l'Emploi", desc: "Export automatique des registres d'accès pour les commissaires aux comptes." }
      ],
      dpoCta: "Télécharger le livre blanc conformité →"
    },
    briefing: {
      badge: "PASSEZ À LA VITESSE SUPÉRIEURE",
      titleMain: "Planifiez votre Briefing",
      titleGradient: "de Conformité",
      subtitle: "Nos architectes en cryptographie analysent votre cartographie de données et vous démontrent l'impact Veilio en 30 minutes.",
      nameLabel: "NOM & PRÉNOM",
      emailLabel: "EMAIL PROFESSIONNEL",
      roleLabel: "FONCTION",
      orgLabel: "ORGANISATION / ENTREPRISE",
      volumeLabel: "VOLUME DE DONNÉES SENSIBLES",
      submitBtn: "RÉSERVER MON BRIEFING TECHNIQUE",
      modalTitle: "Demande Confirmée !",
      modalDesc: "Merci. Un architecte sécurité Veilio a pris en charge votre demande et vous contactera sous 2 heures avec votre accès démonstrateur.",
      closeBtn: "Fermer"
    }
  },
  en: {
    nav: {
      architecture: "Architecture",
      gdpr: "GDPR Pillars",
      threats: "Threat Sandbox",
      lifecycle: "Data Lifecycle",
      ecosystem: "Ecosystem",
      briefing: "Executive Briefing",
      getInTouch: "Get in Touch",
      requestDemo: "Request Demo"
    },
    hero: {
      tagline: "SOVEREIGN DATA TOKENIZATION & COMPLIANCE",
      titleMain: "Tokenization Becomes Your",
      titleGradient: "Strongest Compliance Proof",
      subtitle: "Provide your DPO with the technical guarantee of CNIL-compliant pseudonymization (GDPR), and your CISO with the means to neutralize data exfiltration risks under ANSSI requirements (NIS2).",
      exploreBtn: "Explore Compliance",
      demoBtn: "Request a Demo",
      scrollHint: "Scroll to explore",
      stats: {
        latency: { label: "ENCLAVE LATENCY", value: "< 1.2ms" },
        storage: { label: "PLAINTEXT FOOTPRINT", value: "0 Plaintext" },
        compliance: { label: "NATIVE COMPLIANCE", value: "GDPR • NIS2" }
      }
    },
    gdpr: {
      badge: "LEGAL & TECHNICAL COMPLIANCE",
      titleMain: "The Technical Guarantee of Your",
      titleGradient: "GDPR Compliance",
      subtitle: "Satisfy GDPR compliance through automated tokenization and end-to-end data encryption",
      cards: [
        {
          article: "Article 4(5)",
          title: "Pseudonymization",
          requirement: "GDPR mandates separating sensitive data from identity without losing business utility.",
          solution: "Veilio replaces each datum with an opaque token. Original values stay isolated in AES-256-GCM hardware vaults, accessible only to authorized microservices."
        },
        {
          article: "Article 5(1)(c)",
          title: "Data Minimization",
          requirement: "Process and store only data that is strictly adequate, relevant, and necessary.",
          solution: "Only tokens circulate in downstream applications, databases, and AI pipelines. Exposed sensitive data volume drops to zero."
        },
        {
          article: "Article 5(1)(e)",
          title: "Crypto-Shredding & Retention",
          requirement: "Data must not be retained beyond the time necessary for its purpose.",
          solution: "Upon retention expiration or right-to-be-forgotten requests, destroying the cryptographic key renders the data permanently and irreversibly unrecoverable."
        },
        {
          article: "Article 5(1)(f)",
          title: "Integrity & Confidentiality",
          requirement: "Ensure state-of-the-art security against unauthorized access, leaks, or dumps.",
          solution: "Hardware-level AES-256-GCM encryption with master keys secured under HSM, organization-level isolation, and Zero-Trust access policies."
        },
        {
          article: "Article 5(2)",
          title: "Accountability & Proof",
          requirement: "Demonstrate and document technical compliance at any time during audits.",
          solution: "Immutable, timestamped audit log capturing every tokenization and detokenization event: who accessed what, when, and with what authorization."
        }
      ]
    },
    threats: {
      badge: "REAL-TIME THREAT SIMULATOR",
      titleMain: "Database Breach Reality:",
      titleGradient: "Nothing Useful to Steal",
      subtitle: "Experience firsthand the difference between a traditional vulnerable stack and the fortified Veilio enclave.",
      modeVulnerable: "Without Veilio (Vulnerable)",
      modeProtected: "With Veilio (Fortified)",
      sqlTitle: "MALICIOUS SQL EXFILTRATION SIMULATION",
      sqlSubtitle: "Data captured by the adversary during a breach:",
      breachResultVulnerable: "CRITICAL BREACH: Plaintext emails, credit cards, and social security numbers are stolen. Immediate GDPR fines up to €20M or 4% of global turnover.",
      breachResultProtected: "DEFENSE SUCCESS: The attacker only obtains random opaque tokens (tk_live_...). Zero plaintext exposed. No regulatory breach disclosure required.",
      leakRateLabel: "Exposed Sensitive Records",
      cryptoShieldLabel: "Cryptographic Shield Status",
      samplePlaceholder: "Type sensitive data (e.g. john.doe@enterprise.com, 4532-xxxx)",
      tokenizeBtn: "Tokenize in Real-Time"
    },
    lifecycle: {
      badge: "7-STAGE CRYPTOGRAPHIC ARCHITECTURE",
      titleMain: "The Sensitive Data Life Cycle",
      titleGradient: "End-to-End",
      subtitle: "From secure initial ingestion to automated cryptographic shredding.",
      stages: [
        {
          step: "01",
          title: "Secure Ingestion",
          desc: "Raw data enters via REST/gRPC API with mutual TLS 1.3 wire encryption.",
          tech: "mTLS 1.3 • Wire Encryption"
        },
        {
          step: "02",
          title: "Tokenization Enclave",
          desc: "Instant generation of format-preserving or opaque cryptographic tokens.",
          tech: "Latency < 1.2ms • SHA-256"
        },
        {
          step: "03",
          title: "Isolated Vault Storage",
          desc: "Original data encrypted with AES-256-GCM and stored in air-gapped sovereign vaults.",
          tech: "HSM Enclave • Dedicated Keys"
        },
        {
          step: "04",
          title: "Downstream Propagation",
          desc: "Downstream SQL databases, data lakes, and AI models only handle harmless tokens.",
          tech: "Zero Plaintext at Rest"
        },
        {
          step: "05",
          title: "Zero-Trust RBAC Gate",
          desc: "Detokenization strictly conditioned on role permissions, organizational scope, and auth.",
          tech: "Zero-Trust • Fine-Grained RBAC"
        },
        {
          step: "06",
          title: "Crypto-Shredding",
          desc: "Instant purge by destroying the encryption key upon retention expiration or deletion request.",
          tech: "Cryptographic Erasure"
        },
        {
          step: "07",
          title: "Immutable Audit Trail",
          desc: "Tamper-proof event logs directly exportable for GDPR, ISO 27001, and SOC 2 audits.",
          tech: "Append-Only Audit Stream"
        }
      ]
    },
    ecosystem: {
      badge: "DUAL EXECUTIVE POWER",
      rssiTitle: "For CISOs & Engineers",
      rssiGradient: "Defense & Zero Refactoring",
      rssiDesc: "Neutralize your attack surface without slowing down deployment velocity. Integrate in under 2 hours.",
      rssiFeatures: [
        { title: "Zero Database Refactoring", desc: "Format-preserving tokens match your existing schema types (emails, cards, IBANs)." },
        { title: "Turnkey NIS2 Compliance", desc: "Fulfills strict cybersecurity resilience and encryption mandates out of the box." },
        { title: "Sub-Millisecond Speed", desc: "Under 1.2ms latency overhead per tokenization call at scale." }
      ],
      rssiCta: "Explore API Documentation →",
      dpoTitle: "For DPOs & Legal Counsel",
      dpoGradient: "Certified GDPR Proof",
      dpoDesc: "Transform regulatory requirements into provable cryptographic facts during audits.",
      dpoFeatures: [
        { title: "CNIL-Compliant Pseudonymization", desc: "Directly adheres to European Data Protection Board technical guidance." },
        { title: "Instant Right to Erasure", desc: "Guaranteed deletion across all backups and services via key shredding." },
        { title: "One-Click Audit Reports", desc: "Automated export of data processing and access records for external auditors." }
      ],
      dpoCta: "Download Compliance Whitepaper →"
    },
    briefing: {
      badge: "ACCELERATE YOUR SOVEREIGNTY",
      titleMain: "Schedule Your Executive",
      titleGradient: "Compliance Briefing",
      subtitle: "Our cryptographic architects will review your data topology and demonstrate Veilio in action in 30 minutes.",
      nameLabel: "FULL NAME",
      emailLabel: "WORK EMAIL",
      roleLabel: "EXECUTIVE ROLE",
      orgLabel: "COMPANY / ORGANIZATION",
      volumeLabel: "ESTIMATED SENSITIVE RECORDS",
      submitBtn: "SCHEDULE EXECUTIVE BRIEFING",
      modalTitle: "Briefing Request Confirmed!",
      modalDesc: "Thank you. A Veilio security architect has received your briefing details and will contact you within 2 business hours with private sandbox credentials.",
      closeBtn: "Close Window"
    }
  }
};
