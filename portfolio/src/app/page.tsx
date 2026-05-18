import {
  CodeSections,
  CVView,
  Header,
  MainContent,
  MultitaskBar,
  ProgressiveBlur,
  ViewProvider,
} from "@/components";

// Split each body into sentence-sized "lines"
const splitLines = (body: string): string[] =>
  body
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

const SECTIONS = [
  {
    title: "L'essor des modèles de langage",
    body: "Les grands modèles de langage ont radicalement transformé notre rapport à l'information ces dernières années. Capables de générer du texte cohérent, de résumer des documents complexes ou de tenir une conversation nuancée, ils s'appuient sur des architectures de type transformeur entraînées sur des corpus massifs. Leur capacité d'apprentissage en contexte permet aux utilisateurs de personnaliser les réponses sans avoir à réentraîner le modèle. Cette flexibilité explique en grande partie leur adoption rapide dans des domaines aussi variés que le support client, la rédaction technique, la recherche académique ou le développement logiciel. Toutefois, la performance brute ne suffit pas : la qualité des données d'entraînement, le réglage fin par renforcement et les filtres de sécurité jouent un rôle déterminant dans la fiabilité des sorties. À mesure que ces systèmes gagnent en taille, les coûts énergétiques et les défis d'alignement deviennent des préoccupations majeures pour la communauté.",
  },
  {
    title: "Vision par ordinateur et perception",
    body: "La vision par ordinateur a connu une révolution silencieuse avec l'arrivée des réseaux de neurones convolutifs, puis des modèles fondations multimodaux. Reconnaître un objet, segmenter une image, suivre un mouvement ou décrire une scène sont devenus des tâches accessibles à des modèles préentraînés que l'on adapte à des cas d'usage précis. Les véhicules autonomes, l'imagerie médicale, la modération de contenu et les outils créatifs en sont les bénéficiaires les plus visibles. Une avancée notable concerne la fusion entre vision et langage : un modèle peut désormais répondre à une question portant sur le contenu d'une image avec une précision parfois bluffante. Cette convergence ouvre la voie à des assistants visuels capables d'aider une personne malvoyante ou de guider un technicien sur le terrain. Les défis qui restent — robustesse aux conditions adverses, biais de représentation, consommation de ressources — alimentent une recherche très active.",
  },
  {
    title: "L'apprentissage par renforcement et les agents",
    body: "L'apprentissage par renforcement profond est sorti des laboratoires de recherche pour irriguer des systèmes concrets, notamment dans la robotique, la finance algorithmique et le pilotage de réseaux complexes. Le principe reste élégant : un agent apprend par essais et erreurs à maximiser une récompense au fil de ses interactions avec un environnement. Combiné aux modèles de langage, ce paradigme a donné naissance aux agents autonomes capables de planifier des séquences d'actions, d'utiliser des outils numériques et de s'adapter à des objectifs nouveaux. La récompense humaine, sous forme de préférences explicites, permet d'aligner ces agents sur des comportements souhaitables. Cependant, leur déploiement en production soulève des questions de sécurité, de prévisibilité et de responsabilité qui n'ont pas encore de réponses définitives. La recherche s'oriente vers des méthodes d'évaluation plus rigoureuses et des garde-fous explicites afin d'éviter les dérives.",
  },
  {
    title: "L'IA générative et la création",
    body: "L'IA générative a bouleversé les pratiques créatives en démocratisant la production de contenus visuels, sonores et textuels de haute qualité. Que ce soit pour générer une illustration à partir d'une description, composer une mélodie originale ou synthétiser une voix, des outils accessibles à tous bousculent les frontières entre amateur et professionnel. Cette nouvelle vague soulève des questions juridiques sur la propriété intellectuelle, le droit d'auteur des données d'entraînement et l'attribution des œuvres générées. Les artistes sont partagés entre l'opportunité d'augmenter leur productivité et la crainte de voir leur style imité sans consentement. Du côté des entreprises, l'automatisation de la création publicitaire, du prototypage produit ou de la génération de variations marketing offre des gains de temps spectaculaires. Les régulateurs commencent à proposer des cadres pour exiger la transparence des contenus synthétiques, notamment via le marquage cryptographique.",
  },
  {
    title: "Éthique, biais et responsabilité",
    body: "L'éthique de l'intelligence artificielle est passée du statut de préoccupation académique à celui d'enjeu central pour les organisations qui déploient ces technologies. Les biais hérités des données d'entraînement peuvent renforcer des discriminations historiques en matière de recrutement, de crédit ou de justice prédictive. Les chercheurs développent des méthodes pour mesurer ces biais, les atténuer et documenter les limites des modèles à travers des fiches techniques standardisées. La transparence devient un impératif : expliquer les décisions, divulguer les sources d'entraînement et permettre l'audit indépendant. Au-delà de la technique, c'est la question de la responsabilité juridique qui se pose : qui est responsable lorsqu'un système autonome cause un préjudice ? Les législations émergentes, comme le règlement européen sur l'IA, tentent de définir des catégories de risques et des obligations proportionnées, sans freiner l'innovation.",
  },
  {
    title: "L'avenir de l'IA dans le travail",
    body: "L'impact de l'intelligence artificielle sur le monde du travail fait l'objet de débats passionnés entre optimistes et inquiets. Plutôt qu'un remplacement massif des emplois, les études récentes décrivent une transformation profonde des tâches : les activités répétitives ou facilement codifiables sont automatisées tandis que les compétences de jugement, de créativité et d'empathie prennent davantage de valeur. Les développeurs gagnent en productivité grâce aux assistants de code, les analystes accèdent plus rapidement à des synthèses pertinentes et les métiers de service voient apparaître des copilotes spécialisés. Cette évolution pose la question de la formation continue et du partage équitable des gains de productivité au sein des organisations. Les compétences les plus recherchées combinent une compréhension fine des outils d'IA, un esprit critique sur leurs limites et une capacité à orchestrer des équipes hybrides humains-machines. La transition demandera des politiques publiques ambitieuses pour accompagner les reconversions.",
  },
];

export default function Home() {
  return (
    <ViewProvider>
      <Header />
      <MainContent>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-[160px] pb-[200px] flex flex-col gap-10">
          <CodeSections
            sections={SECTIONS.map((s) => ({
              title: s.title,
              lines: splitLines(s.body),
            }))}
          />
        </div>
      </MainContent>
      <CVView />
      <ProgressiveBlur position="top" height={160} />
      <ProgressiveBlur position="bottom" height={200} />

      {/* Background fade layers — same color as page bg, fade from solid at edges to transparent */}
      <div
        className="pointer-events-none fixed top-0 left-0 right-0 z-30"
        style={{
          height: 160,
          background:
            "linear-gradient(to bottom, var(--background) 0%, var(--background) 30%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-30"
        style={{
          height: 200,
          background:
            "linear-gradient(to top, var(--background) 0%, var(--background) 30%, transparent 100%)",
        }}
      />

      <MultitaskBar />
    </ViewProvider>
  );
}
