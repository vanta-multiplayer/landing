import { Accordion as KAccordion } from '@kobalte/core/accordion';
import { ChevronDown } from 'lucide-solid';

export interface FaqItem {
  question: string;
  answer: string;
}

export function Accordion(props: { items: FaqItem[] }) {
  return (
    <KAccordion class="divide-y divide-border-soft border-y border-border-soft" collapsible>
      {props.items.map((item) => (
        <KAccordion.Item value={item.question} class="group">
          <KAccordion.Header>
            <KAccordion.Trigger class="flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-bold text-foreground transition-colors hover:text-primary">
              <span>{item.question}</span>
              <ChevronDown class="size-4 shrink-0 text-muted transition-transform duration-200 group-data-[expanded]:rotate-180" />
            </KAccordion.Trigger>
          </KAccordion.Header>
          <KAccordion.Content class="overflow-hidden text-sm leading-7 text-muted data-[expanded]:animate-[reveal-up_.25s_ease-out]">
            <p class="max-w-3xl pb-5">{item.answer}</p>
          </KAccordion.Content>
        </KAccordion.Item>
      ))}
    </KAccordion>
  );
}
