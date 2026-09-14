export interface ComplianceCardItem {
  id: string;
  article: string;
  badge?: string;
  requirement: string;
  solution: string;
}

export interface ComplianceCategory {
  id: 'piliers' | 'rgpd' | 'nis2' | 'dpo' | 'sovereignty';
  tabLabel: string;
  badge: string;
  titleMain: string;
  titleGradient: string;
  subtitle: string;
  cards: ComplianceCardItem[];
}

const allRgpdFr: ComplianceCardItem[] = [
  {
    id: 'art-4-5',
    article: 'Article 4(5)',
    badge: 'PSEUDONYMISATION',
    requirement: "Le RGPD exige de pouvoir pseudonymiser les données: les séparer de l'identité, sans perdre leur utilité métier",
    solution: "Veilio remplace chaque donnée sensible par un token opaque, tandis que la valeur originale est chiffrée et isolée dans un coffre sécurisé. La ré-identification n'est possible qu'avec un accès autorisé, des clés valides et une entrée non détruite. Un mécanisme réversible, opérationnel et tracé."
  },
  {
    id: 'art-5-1-c',
    article: 'Article 5(1)(c)',
    badge: 'MINIMISATION',
    requirement: "Ne traiter que les données adéquates, pertinentes et limitées à ce qui est nécessaire",
    solution: "Seuls des tokens circulent dans vos SI en aval. Les valeurs en clair restent confinées au coffre chiffré et ne sont révélées que via une détokenisation contrôlée : authentification, périmètre organisation, rôles, politiques d'accès et journalisation. Moins d'exposition, moins de risque."
  },
  {
    id: 'art-5-1-e',
    article: 'Article 5(1)(e)',
    badge: 'LIMITATION CONSERVATION',
    requirement: "Les données ne doivent pas être conservées au-delà de la durée nécessaire à leur finalité",
    solution: "Veilio applique des politiques de rétention paramétrables avec destruction programmée. À échéance ou sur demande, le shredding cryptographique rend la donnée définitivement inexploitable."
  },
  {
    id: 'art-5-1-f',
    article: 'Article 5(1)(f)',
    badge: 'INTÉGRITÉ & SÉCURITÉ',
    requirement: "Garantir l'intégrité et la confidentialité des données personnelles, à tout moment du cycle de vie",
    solution: "Chiffrement AES-256-GCM, clés utilisateur protégées par clé maître, contrôle d'accès par compte et organisation. Chaque opération sensible est tracée: vous protégez la donnée et vous pouvez le prouver."
  },
  {
    id: 'art-5-2',
    article: 'Article 5(2)',
    badge: 'ACCOUNTABILITY',
    requirement: "Être en mesure de démontrer votre conformité (pas seulement la déclarer)",
    solution: "Le journal des logs de Veilio enregistre tokenisations, détokenisations, succès et échecs, avec horodatage. Une piste d'audit exploitable: qui a accédé à quoi, quand, et avec quel résultat."
  },
  {
    id: 'art-15',
    article: 'Article 15',
    badge: "DROIT D'ACCÈS",
    requirement: "Répondre aux demandes d'accès des personnes concernées, dans les délais légaux",
    solution: "Veilio permet une détokenisation contrôlée : récupération de la valeur originale par déchiffrement du coffre, sous authentification et vérification des droits. Le DPO restitue les données au responsable de traitement avec une traçabilité complète."
  },
  {
    id: 'art-16',
    article: 'Article 16',
    badge: 'RECTIFICATION',
    requirement: "Corriger sans délai les données inexactes ou incomplètes sur demande de la personne concernée",
    solution: "Veilio supporte un flux de rectification concret : détokeniser la valeur, la modifier, puis re-tokeniser. La correction est appliquée sans laisser de copie résiduelle en clair dans vos systèmes."
  },
  {
    id: 'art-17',
    article: 'Article 17',
    badge: "DROIT À L'OUBLI",
    requirement: "Effacer les données personnelles lorsque la personne en fait la demande (et prouver que c'est fait)",
    solution: "Le token devient irréversiblement orphelin (HTTP 410). L'effacement est cryptographique, définitif et traçable, même quand les données sont éparpillées dans vos flux."
  },
  {
    id: 'art-20',
    article: 'Article 20',
    badge: 'PORTABILITÉ',
    requirement: "Restituer les données dans un format structuré, couramment utilisé et lisible par machine",
    solution: "L'export conformité et la détokenisation permettent de produire une restitution structurée et exploitable. Vous répondez à la portabilité sans reconstituer manuellement des données dispersées."
  },
  {
    id: 'art-25',
    article: 'Article 25',
    badge: 'PRIVACY BY DESIGN',
    requirement: "Intégrer la protection des données dès la conception et par défaut, pas en rattrapage",
    solution: "Veilio s'intègre via API/SDK dès la conception de vos flux. Les données sensibles sont tokenisées à la collecte: le clair n'expose plus vos bases, logs et environnements de test par défaut."
  },
  {
    id: 'art-28',
    article: 'Article 28',
    badge: 'SOUS-TRAITANCE',
    requirement: "Encadrer la relation avec vos sous-traitants : instructions claires, responsabilités définies",
    solution: "Veilio agit en sous-traitant technique sur instruction du responsable de traitement. Concrètement, il remplace les transferts de fichiers risqués par un accès contrôlé via des datasets tokenisés : visibilité limitée au strict nécessaire, révocation en un clic, chaque échange tracé dans un journal de logs."
  },
  {
    id: 'art-30',
    article: 'Article 30',
    badge: 'REGISTRE DES TRAITEMENTS',
    requirement: "Documenter vos traitements : finalités, mesures de sécurité, durées, droits des personnes",
    solution: "Veilio fournit les éléments techniques pour alimenter votre registre : mécanisme de substitution, chiffrement, rétention, effacement et audit. Votre DPO dispose d'une base concrète, pas d'une déclaration générique."
  },
  {
    id: 'art-32',
    article: 'Article 32',
    badge: 'SÉCURITÉ DU TRAITEMENT',
    requirement: "Mettre en place des mesures de sécurité adaptées au risque (pseudonymisation, chiffrement, contrôle d'accès,...)",
    solution: "Veilio déploie un dispositif cohérent: pseudonymisation, chiffrement, journalisation, contrôle d'accès, destruction sécurisée et séparation des bases (Veilio DB / Clients DB). Une architecture pensée pour réduire la surface d'attaque."
  },
  {
    id: 'art-32-1-a',
    article: 'Article 32(1)(a)',
    badge: 'CHIFFREMENT NATIVE',
    requirement: "Le RGPD cite explicitement la pseudonymisation et le chiffrement comme mesures de protection",
    solution: "C'est le cœur de Veilio: token opaque en table de correspondance, valeurs en AES-256-GCM dans le coffre, index de recherche en HMAC. Deux mesures réglementaires, une implémentation native, activée par défaut sur chaque donnée tokenisée."
  },
  {
    id: 'art-33',
    article: 'Article 33',
    badge: 'NOTIFICATION 72H',
    requirement: "Notifier l'autorité de contrôle en cas de violation dans un délai de 72 heures",
    solution: "Les logs et la traçabilité des accès Veilio facilitent la qualification de l'incident, l'investigation et le reporting. Vous identifiez rapidement le périmètre compromis et constituez un dossier de preuve dans les délais réglementaires."
  },
  {
    id: 'art-34',
    article: 'Article 34',
    badge: 'COMMUNICATION BRÈCHE',
    requirement: "Informer les personnes concernées lorsque la violation présente un risque élevé pour leurs droits",
    solution: "Veilio fournit des éléments techniques précis: nature des données concernées, périmètre d'accès, mesures correctives déployées. Vous étayez votre communication avec des faits, pas des hypothèses."
  },
  {
    id: 'art-35',
    article: 'Article 35',
    badge: 'ANALYSE D’IMPACT (AIPD)',
    requirement: "Réaliser une analyse d'impact pour les traitements susceptibles d'engendrer un risque élevé",
    solution: "La pseudonymisation et le chiffrement Veilio réduisent le risque résiduel et fournissent une matière technique documentable pour votre AIPD: mécanismes, durées, droits, mesures. Des éléments concrets pour évaluer et justifier vos choix."
  }
];

const allRgpdEn: ComplianceCardItem[] = [
  {
    id: 'art-4-5',
    article: 'Article 4(5)',
    badge: 'PSEUDONYMISATION',
    requirement: 'The GDPR requires the ability to pseudonymise data: separating it from identity without losing business utility',
    solution: 'Veilio replaces each sensitive data item with an opaque token, while the original value is encrypted and isolated in a secure vault. Re-identification is only possible with authorized access, valid keys, and an undestroyed entry. A reversible, operational, and traceable mechanism.'
  },
  {
    id: 'art-5-1-c',
    article: 'Article 5(1)(c)',
    badge: 'MINIMISATION',
    requirement: 'Process only data that is adequate, relevant, and limited to what is strictly necessary',
    solution: 'Only tokens circulate in your downstream information systems. Plaintext values remain confined to the encrypted vault and are only revealed via controlled detokenization: authentication, organization scope, roles, access policies, and logging. Less exposure, less risk.'
  },
  {
    id: 'art-5-1-e',
    article: 'Article 5(1)(e)',
    badge: 'STORAGE LIMITATION',
    requirement: 'Data must not be retained longer than necessary for the intended purpose',
    solution: 'Veilio applies configurable retention policies with automated scheduled destruction. Upon expiration or request, cryptographic shredding renders the data definitively and irreversibly unusable.'
  },
  {
    id: 'art-5-1-f',
    article: 'Article 5(1)(f)',
    badge: 'INTEGRITY & CONFIDENTIALITY',
    requirement: 'Ensure integrity and confidentiality of personal data throughout its entire lifecycle',
    solution: 'AES-256-GCM hardware encryption, user keys protected by master keys, account-level and organization-level access control. Every sensitive operation is audited: you protect the data and you can prove it.'
  },
  {
    id: 'art-5-2',
    article: 'Article 5(2)',
    badge: 'ACCOUNTABILITY',
    requirement: 'Be in a position to demonstrate compliance (not merely declare it)',
    solution: "Veilio's audit logs record tokenizations, detokenizations, successes, and failures with verifiable timestamps. An actionable audit trail: who accessed what, when, and with what result."
  },
  {
    id: 'art-15',
    article: 'Article 15',
    badge: 'RIGHT OF ACCESS',
    requirement: 'Respond to data subject access requests within statutory timeframes',
    solution: 'Veilio provides controlled detokenization: retrieving the original value by decrypting the vault, verified under strict authentication and permission checks. Complete audit trail provided to regulators.'
  },
  {
    id: 'art-16',
    article: 'Article 16',
    badge: 'RECTIFICATION',
    requirement: 'Promptly rectify inaccurate or incomplete personal data upon subject request',
    solution: 'Veilio supports a clean rectification workflow: detokenize the value, modify it, and re-tokenize. The correction applies across services without leaving residual plaintext copies in downstream storage.'
  },
  {
    id: 'art-17',
    article: 'Article 17',
    badge: 'RIGHT TO ERASURE',
    requirement: 'Permanently erase personal data upon request (and demonstrate proof of erasure)',
    solution: 'The token becomes permanently orphaned (HTTP 410). Erasure is cryptographic, definitive, and provable, even when data is distributed across diverse cloud pipelines.'
  },
  {
    id: 'art-20',
    article: 'Article 20',
    badge: 'PORTABILITY',
    requirement: 'Export data in a structured, commonly used, and machine-readable format',
    solution: 'Automated compliance export and controlled detokenization produce structured, actionable datasets. Satisfy data portability requests without manually parsing dispersed databases.'
  },
  {
    id: 'art-25',
    article: 'Article 25',
    badge: 'DATA PROTECTION BY DESIGN',
    requirement: 'Integrate data protection by design and by default, not as an afterthought',
    solution: 'Veilio integrates via API/SDK right at ingestion. Sensitive data is tokenized upon initial entry: plaintext never enters your databases, log streams, or staging environments.'
  },
  {
    id: 'art-28',
    article: 'Article 28',
    badge: 'PROCESSOR GOVERNANCE',
    requirement: 'Govern subcontractor relationships with unambiguous instructions and defined responsibilities',
    solution: 'Veilio acts as a technical processor on your instructions. Replaces vulnerable raw file transfers with access-controlled tokenized datasets: granular scope, one-click revocation, and full audit logs.'
  },
  {
    id: 'art-30',
    article: 'Article 30',
    badge: 'PROCESSING RECORDS',
    requirement: 'Document processing activities: purposes, security safeguards, retention, and subject rights',
    solution: 'Veilio provides concrete technical evidence to feed your Article 30 register: substitution protocols, encryption standards, retention schedules, and access logs. Defensible proof for DPOs.'
  },
  {
    id: 'art-32',
    article: 'Article 32',
    badge: 'SECURITY OF PROCESSING',
    requirement: 'Implement risk-appropriate technical and organizational safeguards (pseudonymization, encryption, access control)',
    solution: 'Veilio deploys a unified security posture: pseudonymisation, encryption, audit logging, zero-trust access control, and database separation (Veilio Vault vs Client DB).'
  },
  {
    id: 'art-32-1-a',
    article: 'Article 32(1)(a)',
    badge: 'MANDATED CIPHERS',
    requirement: 'The GDPR explicitly cites pseudonymisation and encryption as foundational technical safeguards',
    solution: 'This is the core of Veilio: opaque tokens in mapping engines, values secured in AES-256-GCM vaults, and searchable blind indices in HMAC. Dual compliance built into every payload.'
  },
  {
    id: 'art-33',
    article: 'Article 33',
    badge: '72H BREACH NOTIFICATION',
    requirement: 'Notify supervisory authorities within 72 hours of discovering a personal data breach',
    solution: 'Veilio audit logs streamline incident qualification, forensics, and statutory reporting. Rapidly isolate affected scopes and compile forensic evidentiary files within regulatory deadlines.'
  },
  {
    id: 'art-34',
    article: 'Article 34',
    badge: 'DATA SUBJECT NOTICE',
    requirement: 'Communicate high-risk data breaches directly to impacted data subjects',
    solution: 'Veilio provides forensic telemetry: exact nature of compromised fields, access perimeters, and active countermeasures. Back your crisis communications with verifiable facts.'
  },
  {
    id: 'art-35',
    article: 'Article 35',
    badge: 'DATA PROTECTION IMPACT (DPIA)',
    requirement: 'Conduct impact assessments for data processing presenting high risks to individuals',
    solution: 'Veilio pseudonymisation and vault isolation dramatically reduce residual risk, providing verifiable technical data for your DPIA: mechanisms, retention, rights, and countermeasures.'
  }
];

export const complianceData: Record<'fr' | 'en', ComplianceCategory[]> = {
  fr: [
    {
      id: 'piliers',
      tabLabel: 'Piliers RGPD (Essentiels)',
      badge: 'LES 7 PILIERS CLÉS',
      titleMain: 'Le garant technique de votre',
      titleGradient: 'conformité RGPD',
      subtitle: 'Découvrez comment Veilio apporte une réponse technique concrète et infaillible aux exigences majeures de la CNIL.',
      cards: [
        allRgpdFr[0], // Art 4(5) Pseudonymisation
        allRgpdFr[1], // Art 5(1)(c) Minimisation
        allRgpdFr[2], // Art 5(1)(e) Rétention & Shredding
        allRgpdFr[3], // Art 5(1)(f) Intégrité & Chiffrement
        allRgpdFr[7], // Art 17 Droit à l'oubli
        allRgpdFr[9], // Art 25 Privacy by Design
        allRgpdFr[12], // Art 32 Sécurité & Cloisonnement
      ]
    },
    {
      id: 'rgpd',
      tabLabel: 'Tous les 17 Articles RGPD',
      badge: 'RÈGLEMENT EUROPÉEN COMPLET',
      titleMain: 'L’Intégralité des 17 Articles',
      titleGradient: 'couverts par Veilio',
      subtitle: 'Chaque exigence légale traduite en mécanisme cryptographique nativement vérifiable.',
      cards: allRgpdFr
    },
    {
      id: 'nis2',
      tabLabel: 'Directive NIS2',
      badge: 'DIRECTIVE CYBER EUROPÉENNE',
      titleMain: 'Répondez aux nouvelles exigences de la',
      titleGradient: 'directive NIS2',
      subtitle: 'Renforcez votre résilience face aux cybermenaces',
      cards: [
        {
          id: 'nis2-art-21',
          article: 'Article 21',
          badge: 'CHIFFREMENT DU FLUX',
          requirement: "Cet article mentionne spécifiquement l'usage de solutions de chiffrement pour protéger la confidentialité",
          solution: "Le chiffrement protège vos bases de données, mais vos flux restent vulnérables. Veilio sécurise la donnée de bout en bout en la tokenisant."
        },
        {
          id: 'nis2-art-21-2-h',
          article: 'Article 21 (2.h)',
          badge: 'CRYPTOGRAPHIE CRITIQUE',
          requirement: "Obligation pour les secteurs critiques d'utiliser la cryptographie et le chiffrement",
          solution: "Veilio répond nativement à cette exigence en isolant vos données sensibles dans un coffre-fort chiffré. En les séparant de leurs clés API, Veilio les rend totalement hors de portée des attaquants, même en cas de compromission de votre infrastructure."
        },
        {
          id: 'nis2-art-21-2-d',
          article: 'Article 21 (2.d)',
          badge: 'SUPPLY CHAIN SECURITY',
          requirement: "Les entreprises doivent garantir la sécurité des données qu'elles partagent avec leurs partenaires et fournisseurs",
          solution: "Veilio agit comme une couche sécurisée de partage et de gouvernance des datasets. Chaque accès est tracé et limité à la mission de l'utilisateur."
        },
        {
          id: 'nis2-art-23',
          article: 'Article 23',
          badge: 'ALERTE 24H',
          requirement: 'Cet article impose de notifier les cybermenaces "importantes" sous 24h',
          solution: "Veilio y répond comme pour l'Art. 34 du RGPD: si la donnée volée est tokenisée, l'entreprise n'a plus l'obligation d'alerter la personne concernée, ce qui simplifie grandement la gestion de crise."
        }
      ]
    },
    {
      id: 'dpo',
      tabLabel: 'Outil DPO',
      badge: 'GOUVERNANCE DES DONNÉES',
      titleMain: "L'outil des DPO pour piloter",
      titleGradient: 'la conformité au quotidien',
      subtitle: 'Des fonctionnalités qui permettent la mise en conformité de vos données critiques. Veilio assure une traçabilité complète de leur cycle de vie',
      cards: [
        {
          id: 'dpo-retention',
          article: 'Péremption des Données',
          badge: 'RÉTENTION PROGRAMMÉE',
          requirement: "Alignez la durée de vie des données sensibles sur vos politiques de rétention : la destruction des clés rend les jetons définitivement inexploitables",
          solution: "La destruction programmée des clés cryptographiques rend les jetons définitivement inexploitables à expiration, sans nécessiter d'opération complexe sur vos bases."
        },
        {
          id: 'dpo-revocation',
          article: 'Révocation Granulaire',
          badge: 'EFFACEMENT CIBLÉ',
          requirement: "Répondez aux demandes d'effacement et limitation en ciblant une donnée précise, sans toucher au reste de vos traitements ni à vos applicatifs",
          solution: "Répondez aux demandes d'effacement et de limitation en ciblant une donnée précise, sans toucher au reste de vos traitements ni casser vos schémas applicatifs."
        },
        {
          id: 'dpo-sharing',
          article: 'Partage de Datasets Sécurisés',
          badge: 'ZÉRO EXPOSITION',
          requirement: "Avec Veilio, transmettez des datasets tokenisés à vos partenaires internes ou externes. Vous gardez la maîtrise totale des accès et éliminez tout risque de fuite de données",
          solution: "Avec Veilio, transmettez des datasets tokenisés à vos partenaires. Vous gardez la maîtrise totale des accès et éliminez tout risque de fuite de données."
        },
        {
          id: 'dpo-apps',
          article: 'Protection des Données Clients',
          badge: 'GOUVERNANCE STRICTE',
          requirement: "Vous instaurez une gouvernance précise des accès. Chaque collaborateur travaille normalement, mais n'accède qu'aux informations strictement nécessaires à sa mission",
          solution: "Chaque collaborateur travaille normalement, mais n'accède qu'aux informations strictement nécessaires à sa mission grâce à la détokenisation sous contrôle RBAC."
        }
      ]
    },
    {
      id: 'sovereignty',
      tabLabel: 'Souveraineté (Art. 48)',
      badge: 'ARTICLE 48 RGPD & CLOUD ACT',
      titleMain: 'Immunisez vos données contre',
      titleGradient: "l'extraterritorialité",
      subtitle: "En s'appuyant sur l'article 48 du RGPD et la souveraineté, Veilio garantit que vos données sensibles restent protégées par le droit européen, peu importe leur lieu de stockage",
      cards: [
        {
          id: 'sov-problem',
          article: 'Le problème',
          badge: 'CONFLIT DE LOIS',
          requirement: 'Héberger hors UE peut soumettre vos données sensibles à des lois extraterritoriales comme le "Cloud Act" Américain. Ce droit de regard est en conflit direct avec les exigences de l\'article 48 du RGPD.',
          solution: "Sans tokenisation, vos données en clair hébergées sur des clouds américains peuvent être réquisitionnées unilatéralement, créant une violation majeure de conformité européenne."
        },
        {
          id: 'sov-solution',
          article: 'La solution',
          badge: 'DROIT EUROPÉEN STRICT',
          requirement: "Veilio étant exclusivement soumis au droit européen, nous n'avons aucune obligation de coopération avec des autorités étrangères.",
          solution: "Votre hébergeur, même hors UE, ne stockera que des données tokenisées inexploitables. Elles sont déchiffrables uniquement via vos clés API, stockées dans vos variables d'environnement ou dans votre gestionnaire de secrets."
        },
        {
          id: 'sov-benefits',
          article: 'Les bénéfices',
          badge: 'LIBERTÉ MULTI-CLOUD',
          requirement: "Ne vous limitez pas au cloud souverain. Être conforme à l'article 48 du RGPD tout en gardant le choix du fournisseur d'hébergement est possible avec Veilio.",
          solution: "Conservez l'agilité et la puissance des grands fournisseurs de cloud mondiaux (AWS, GCP, Azure) tout en maintenant une étanchéité juridique et cryptographique 100% conforme au RGPD."
        }
      ]
    }
  ],
  en: [
    {
      id: 'piliers',
      tabLabel: 'GDPR Pillars (Key)',
      badge: 'THE 7 CORE PILLARS',
      titleMain: 'The Technical Guarantee of Your',
      titleGradient: 'GDPR Compliance',
      subtitle: 'Discover how Veilio delivers concrete, verifiable answers to core GDPR and CNIL requirements.',
      cards: [
        allRgpdEn[0], // Art 4(5)
        allRgpdEn[1], // Art 5(1)(c)
        allRgpdEn[2], // Art 5(1)(e)
        allRgpdEn[3], // Art 5(1)(f)
        allRgpdEn[7], // Art 17
        allRgpdEn[9], // Art 25
        allRgpdEn[12], // Art 32
      ]
    },
    {
      id: 'rgpd',
      tabLabel: 'All 17 GDPR Articles',
      badge: 'COMPLETE EU REGULATION',
      titleMain: 'All 17 Regulatory Articles',
      titleGradient: 'Protected by Veilio',
      subtitle: 'Every statutory requirement mapped directly to automated cryptographic safeguards.',
      cards: allRgpdEn
    },
    {
      id: 'nis2',
      tabLabel: 'NIS2 Directive',
      badge: 'EU CYBERSECURITY DIRECTIVE',
      titleMain: 'Comply with the New Requirements of the',
      titleGradient: 'NIS2 Directive',
      subtitle: 'Strengthen organizational resilience against sophisticated cyber threats',
      cards: [
        {
          id: 'nis2-art-21',
          article: 'Article 21',
          badge: 'STREAM ENCRYPTION',
          requirement: 'Specifically mandates the deployment of encryption mechanisms to ensure confidentiality',
          solution: 'Standard encryption protects resting databases, but internal application flows remain vulnerable. Veilio secures data end-to-end through tokenization.'
        },
        {
          id: 'nis2-art-21-2-h',
          article: 'Article 21 (2.h)',
          badge: 'CRITICAL CRYPTOGRAPHY',
          requirement: 'Obligation for essential and important entities to enforce cryptographic safeguards',
          solution: 'Veilio natively fulfills this requirement by isolating sensitive payloads in an encrypted hardware vault. Separated from API keys, data is impervious to exfiltration.'
        },
        {
          id: 'nis2-art-21-2-d',
          article: 'Article 21 (2.d)',
          badge: 'SUPPLY CHAIN SECURITY',
          requirement: 'Organizations must secure data shared across partners, contractors, and suppliers',
          solution: 'Veilio operates as a zero-trust sharing and governance gateway for sensitive datasets. Every access is authenticated, scoped, and logged in real-time.'
        },
        {
          id: 'nis2-art-23',
          article: 'Article 23',
          badge: '24H EARLY WARNING',
          requirement: 'Requires early warning notifications for significant cyber incidents within 24 hours',
          solution: 'Similar to GDPR Art. 34: because exfiltrated tokens cannot be reversed by attackers, stolen data is mathematically unusable, dramatically neutralizing regulatory fallout.'
        }
      ]
    },
    {
      id: 'dpo',
      tabLabel: 'DPO Toolkit',
      badge: 'DATA GOVERNANCE',
      titleMain: 'The DPO Command Center for',
      titleGradient: 'Daily Compliance',
      subtitle: 'Operational capabilities built for critical data protection and end-to-end lifecycle traceability',
      cards: [
        {
          id: 'dpo-retention',
          article: 'Data Retention Rules',
          badge: 'AUTOMATED EXPIRATION',
          requirement: 'Data retention policies: synchronize sensitive data lifespans with statutory retention requirements.',
          solution: 'Scheduled destruction of vault encryption keys renders tokens irrevocably unexploitable upon expiration, requiring zero manual database pruning.'
        },
        {
          id: 'dpo-revocation',
          article: 'Granular Revocation',
          badge: 'TARGETED ERASURE',
          requirement: 'Targeted data revocation: process erasure and restriction requests without disrupting systems.',
          solution: 'Execute subject rights on specific tokens without cascading database schema alterations or application downtime.'
        },
        {
          id: 'dpo-sharing',
          article: 'Secure Dataset Sharing',
          badge: 'ZERO EXPOSURE',
          requirement: 'Secure dataset sharing: distribute tokenized datasets to internal teams or external vendors.',
          solution: 'Share rich analytical datasets without ever exposing plaintext PII. Maintain central revocation control and eliminate breach vectors.'
        },
        {
          id: 'dpo-apps',
          article: 'Application Data Protection',
          badge: 'ROLE-BASED GOVERNANCE',
          requirement: 'Protect customer PII in applications: enforce granular, purpose-bound access controls.',
          solution: 'Employees carry out daily operations viewing only the minimum data required for their specific role, controlled via on-the-fly detokenization.'
        }
      ]
    },
    {
      id: 'sovereignty',
      tabLabel: 'Sovereignty (Art. 48)',
      badge: 'GDPR ARTICLE 48 & SOUVEREIGNTY',
      titleMain: 'Immunize Your Data Against',
      titleGradient: 'Extraterritorial Jurisdiction',
      subtitle: 'Leveraging GDPR Article 48, Veilio guarantees sensitive data remains protected under European law regardless of cloud host location',
      cards: [
        {
          id: 'sov-problem',
          article: 'The Problem',
          badge: 'LEGAL CONFLICT',
          requirement: 'Hosting outside the EU exposes sensitive records to extraterritorial laws like the US Cloud Act, conflicting directly with GDPR Article 48.',
          solution: 'Unprotected plaintext data held on foreign cloud infrastructure can be subpoenaed without European judicial oversight, causing immediate regulatory breach.'
        },
        {
          id: 'sov-solution',
          article: 'The Solution',
          badge: 'STRICT EU JURISDICTION',
          requirement: 'Veilio operates strictly under European jurisdiction with zero legal obligation to cooperate with foreign extraterritorial demands.',
          solution: 'Your cloud host only stores opaque tokenized strings. Data is only decryptable with your own API keys, hosted securely in your own European secrets manager.'
        },
        {
          id: 'sov-benefits',
          article: 'The Benefits',
          badge: 'MULTI-CLOUD FREEDOM',
          requirement: 'Do not constrain your infrastructure to sovereign cloud vendors alone. Comply with GDPR Article 48 with any global provider.',
          solution: 'Enjoy the scale and velocity of global hyperscalers (AWS, GCP, Azure) with airtight European cryptographic sovereignty and zero legal exposure.'
        }
      ]
    }
  ]
};
