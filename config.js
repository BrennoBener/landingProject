const dadosCliente = {
    tema: {
        primaria: "#bb1776", 
        secundaria: "#94185f",
        destaque: "#c97a8f",
        fundo: "#1e0812", 
        texto: "#f1f0eb" 
    },
    loja: {
        nome: "PONTO IGUI",
        subtitulo: "Catálogo Atacado B2B",
        // Verifique se o nome exato da sua imagem na pasta está assim:
        fotoCapa: "modelos/capaPontoIgui.png" 
    },
    produtos: [
        {
            nome: "Conjunto Alfaiataria",
            ref: "PI-042",
            desc: "Conjunto blaser e calça com corte reto. Alta saída, ideal para compor vitrines.",
            preco: "R$ 119,90",
            especificacoes: "Tamanhos: P, M, G | Cores: Fúcsia, Preto",
            fotoPrincipal: "modelos/capaPontoIgui.png",
            galeria: [
                "modelos/capaPontoIgui.png", 
                "modelos/conjunto-costas.jpg"
            ],
            whatsapp: "5585998097181" 
        },

        {
            nome: "Conjunto Alfaiataria",
            ref: "PI-042",
            desc: "Conjunto blaser e calça com corte reto. Alta saída, ideal para compor vitrines.",
            preco: "R$ 119,90",
            especificacoes: "Tamanhos: P, M, G | Cores: Fúcsia, Preto",
            fotoPrincipal: "modelos/modelo1.png",
            galeria: [
                "modelos/modelo1.png", 
                "modelos/modelo2.png"
            ],
            whatsapp: "5585998097181" 
        }
    ]
};