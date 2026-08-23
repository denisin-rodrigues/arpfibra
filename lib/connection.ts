/* Decide se vale a pena baixar mídia decorativa (o vídeo da hero).

   Em 3G o vídeo não é só lento: ele compete por banda com o HTML, o CSS e os
   scripts, então atrasa o conteúdo que a pessoa veio ver. Melhor não baixar e
   deixar o fundo estático no lugar — ele já existe e pesa 5 KB.

   A API só existe no Chrome e derivados. Onde não existe, devolvemos true:
   o vídeo agora pesa 731 KB e é a peça central da página, então na dúvida
   ele carrega. Quem realmente quer economizar mídia costuma estar num
   navegador que expõe `saveData`. */
type ConexaoNavegador = {
  saveData?: boolean;
  effectiveType?: string;
};

const LENTAS = ["slow-2g", "2g", "3g"];

export function podeCarregarMidiaPesada(): boolean {
  if (typeof navigator === "undefined") return false;

  const conexao = (navigator as Navigator & { connection?: ConexaoNavegador })
    .connection;
  if (!conexao) return true;

  // Modo de economia de dados é um pedido explícito da pessoa; respeitamos
  // mesmo que a conexão no momento esteja rápida.
  if (conexao.saveData) return false;

  return !LENTAS.includes(conexao.effectiveType ?? "");
}
