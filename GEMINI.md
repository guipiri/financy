# Diretrizes do Projeto

## Regras de Estilização e Cores

- **Não utilizar cores hardcoded ou valores hexadecimais arbitrários**:
  - Evitar valores CSS arbitrários como `bg-[#f8fafc]`, `bg-[#1c6b43]`, `text-[#123456]`, etc.
  - Evitar paletas fixas diretas (ex: `text-slate-900`, `bg-white`, `border-slate-200`) em favor dos tokens semânticos do tema.

- **Utilizar sempre os tokens de cor do tema**:
  - **Superfícies e Fundos**: `bg-background`, `bg-card`, `bg-muted` / `bg-muted/40`.
  - **Textos**: `text-foreground` para texto principal e `text-muted-foreground` para textos secundários ou rótulos auxiliares.
  - **Ações e Primários**: `bg-primary`, `text-primary-foreground`, `hover:bg-primary/90`, `focus-visible:border-primary`, `ring-primary`.
  - **Bordas e Divisores**: `border-border`, `border-input`, `<Separator className="bg-border" />`.
  - **Botões e Componentes UI**: Reutilizar as variantes do tema (`variant="default"`, `variant="outline"`, `variant="ghost"`, `variant="secondary"`) em vez de sobresscrever com estilos inline ou hex.
