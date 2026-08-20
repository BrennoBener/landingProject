//ADAPTAÇÃO PARA NOVOS CLIENTES

const dadosCliente = {
    tema: {
        primaria: "#0cc0df",   /* Cor principal (Botões, preços) */
        secundaria: "#cb6ce6", /* Cor secundária (Efeitos) */
        destaque: "#c97a8f",   /* Cor de detalhes (Textos menores, tags) */
        fundo: "#1e0812",      /* Cor de fundo do site */
        texto: "#f1f0eb"       /* Cor do texto principal */
    },
    loja: {
        nome: "CAFÉ MALUCO",
        subtitulo: "MENU",
        fotoCapa: "modelos/capa.jpg"
    },
    produtos: [
        {
            nome: "Conjunto Alfaiataria",
            ref: "PI-042",
            desc: "Conjunto blaser e calça com corte reto. Alta saída, ideal para compor vitrines.",
            preco: "R$ 119,90",
            especificacoes: "Tamanhos: P, M, G | Cores: Fúcsia, Preto",
            fotoPrincipal: "modelos/conjunto-frente.jpg",
            galeria: [
                "modelos/conjunto-frente.jpg", 
                "modelos/conjunto-costas.jpg"
            ]
        }
        // Para adicionar um novo produto, coloque uma vírgula após a chave } acima e cole um novo bloco.
    ]
};