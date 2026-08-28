import { ContractForm } from "@/components/contracts/contract-form";
import { MarkPreloaderReady } from "@/components/layout/mark-preloader-ready";

export default function NewContractPage() {
  return (
    <>
      <MarkPreloaderReady />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10">
        <header className="space-y-2 border-b border-tavern-border pb-6 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
            Новый контракт
          </p>
          <h1 className="font-display text-3xl text-tavern-parchment">
            Создать контракт
          </h1>
          <p className="text-sm text-tavern-muted">
            Имя босса, повтор и таски с уроном. После создания контракт появится на доске.
          </p>
        </header>

        <ContractForm />
      </main>
    </>
  );
}
