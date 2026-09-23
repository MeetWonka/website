import {
  ProgramOverviewBlock,
  type ProgramStep,
} from "@/components/sections/start-ai-subsidized-flanders/program-overview-block";

const PROGRAM_STEPS: ProgramStep[] = [
  {
    _key: "kickoff",
    title: "Voorbereiden",
    body: "We starten met een heldere intake: wie is er betrokken, wat zijn de verwachtingen en waar wil uw organisatie naartoe? Zo vermijden we dat het programma abstract is en bouwen we van dag één aan iets wat aansluit bij uw organisatie.",
  },
  {
    _key: "deep-dives",
    title: "Begrijpen & inspireren",
    body: "We starten met een halve dag 'KICK-OFF' om uw organisatie kennis te laten maken met de basis en mogelijkheden van AI-tools, waaronder ChatGPT & Claude. We organiseren tijdens deze voormiddag ook een prompting workshop. In de namiddag volgen de diepteinterviews waar we uw huidige processen bespreken en analyseren.",
  },
];

const DELIVERY_STEPS: ProgramStep[] = [
  {
    _key: "strategy",
    title: "Analyseren & valideren",
    body: "We bekijken hoe u vandaag werkt: welke processen lopen vlot, waar verliest u tijd en waar knelt het schoentje. Vanuit die analyse bepalen we welke AI-toepassingen het meeste opleveren en ook realistisch zijn om te implementeren.",
  },
  {
    _key: "data",
    title: "Opleveren & activeren",
    body: "Op het einde van het traject heeft u een concreet actieplan: wat doet u eerst, wat volgt later en hoe pakt u het aan. Inclusief duidelijke afspraken over hoe u AI verantwoord en veilig inzet binnen uw organisatie.",
  },
];

export function StartAiSubsidizedFlandersProgramOverview() {
  return (
    <ProgramOverviewBlock
      steps={PROGRAM_STEPS}
      stepVariant="numbered"
      imageSrc="/images/start-ai-subsidized-flanders/program-workshop.png"
      imageAlt="Deelnemers aan een Start AI workshop sessie"
      className="pb-16 pt-10 md:pb-20 md:pt-14"
    />
  );
}
export function StartAiSubsidizedFlandersProgramDelivery() {
  return (
    <ProgramOverviewBlock
      steps={DELIVERY_STEPS}
      stepVariant="numbered"
      numberStart={3}
      mirrored
      imageSrc="/images/start-ai-subsidized-flanders/program-delivery.png"
      imageAlt="Workshop met deelnemers rond een vergadertafel"
      className="pt-10 pb-18 md:pt-14 md:pb-24"
    />
  );
}