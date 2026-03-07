const Proventos = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold tracking-tight mb-1">PROVENTOS</h1>
      <p className="text-xs font-mono text-muted-foreground tracking-wider mb-8">
        DIVIDENDOS E RENDIMENTOS RECEBIDOS
      </p>

      <div className="border border-border">
        <div className="p-12 text-center">
          <p className="font-mono text-xs text-muted-foreground tracking-wider">
            NENHUM PROVENTO REGISTRADO AINDA
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/60 tracking-wider mt-2">
            SEUS DIVIDENDOS E RENDIMENTOS APARECERÃO AQUI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Proventos;
