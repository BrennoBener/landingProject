// ==========================================
// CONFIGURAÇÕES GERAIS DA LOJA
// ==========================================
const dadosCliente = {
    // 1. CORES DO SITE
    // Altere os códigos hexadecimais (#) para mudar as cores de toda a página
    tema: {
        primaria: "#bb1776",   // Cor principal (Botões, preço, detalhes de destaque)
        secundaria: "#94185f", // Cor secundária (Efeito ao clicar no botão)
        destaque: "#c97a8f",   // Cor de apoio (Textos secundários, fundo de tags)
        fundo: "#1e0812",      // Cor de fundo geral da página
        texto: "#f1f0eb"       // Cor do texto principal
    },

    // 2. DADOS DA CAPA
    // Informações da primeira tela que o cliente vê
    loja: {
        nome: "PONTO IGUI",
        subtitulo: "Catálogo Atacado B2B",
        // Caminho da foto de fundo da capa. Substitua pelo nome do seu arquivo.
        fotoCapa: "modelos/capa.jpg" 
    },

    // 3. LISTA DE PRODUTOS
    // Para adicionar um NOVO PRODUTO, copie do símbolo '{' até o '},' e cole abaixo.
    produtos: [
        {
            nome: "Conjunto Alfaiataria",
            ref: "PI-042",
            desc: "Conjunto blaser e calça com corte reto. Alta saída, ideal para compor vitrines.",
            preco: "R$ 119,90",
            especificacoes: "Tamanhos: P, M, G | Cores: Fúcsia, Preto",
            
            // FOTOS
            // fotoPrincipal: Imagem que aparece no cardápio
            fotoPrincipal: "modelos/conjunto-frente.jpg",
            // galeria: Lista de fotos que abrem ao clicar (adicione quantas quiser entre aspas e separadas por vírgula)
            galeria: [
                "modelos/conjunto-frente.jpg", 
                "modelos/conjunto-costas.jpg"
            ],

            // WHATSAPP (OPCIONAL)
            // Coloque o número com DDI e DDD (ex: 5585999999999). 
            // Se não quiser o botão neste produto (ex: para cardápios), deixe aspas vazias: ""
            whatsapp: "5585999999999" 
        },
        
        // --- EXEMPLO DE PRODUTO SEM WHATSAPP ---
        {
            nome: "Vestido Midi Canelado",
            ref: "PI-088",
            desc: "Modelagem que valoriza a silhueta de forma natural e realista.",
            preco: "R$ 59,90",
            especificacoes: "Tamanhos: Único | Cores: Rosa Seco, Preto",
            fotoPrincipal: "modelos/vestido-frente.jpg",
            galeria: [
                "modelos/vestido-frente.jpg"
            ],
            // Deixando vazio, o botão de WhatsApp não será gerado para este item
            whatsapp: "" 
        }
    ]
};