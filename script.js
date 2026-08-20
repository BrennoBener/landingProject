// 1. Aplica as cores definidas no config.js no arquivo CSS
function aplicarTema() {
    const root = document.documentElement;
    root.style.setProperty('--cor-primaria', dadosCliente.tema.primaria);
    root.style.setProperty('--cor-fundo', dadosCliente.tema.fundo);
    root.style.setProperty('--cor-texto', dadosCliente.tema.texto);
    root.style.setProperty('--cor-secundaria', dadosCliente.tema.secundaria);
    root.style.setProperty('--cor-destaque', dadosCliente.tema.destaque);
}

// 2. Constrói o HTML de cada produto automaticamente
function renderizarCatalogo() {
    const carousel = document.getElementById('mainCarousel');
    
    // Constrói a Capa
    carousel.innerHTML = `
        <div class="slide cover-slide" style="background-image: url('${dadosCliente.loja.fotoCapa}');">
            <div class="cover-content">
                <h1 class="logo-title">${dadosCliente.loja.nome}</h1>
                <p class="logo-subtitle">${dadosCliente.loja.subtitulo}</p>
                <button class="btn" onclick="abrirCatalogo()">Ver Coleção</button>
            </div>
        </div>
    `;

    // Constrói os Produtos (Loop)
    dadosCliente.produtos.forEach(prod => {
        // Formata a lista de imagens da galeria para o botão de clique
        const galeriaStr = JSON.stringify(prod.galeria).replace(/"/g, "'");

        // LÓGICA DO BOTÃO DE WHATSAPP
        let botaoWhatsappHTML = "";
        // Se houver um número preenchido no config.js, ele cria o botão
        if (prod.whatsapp && prod.whatsapp.trim() !== "") {
            // Cria a mensagem automática com nome e referência do produto
            const mensagem = encodeURIComponent(`Olá, tenho interesse neste produto: ${prod.nome} (REF: ${prod.ref})`);
            botaoWhatsappHTML = `<a href="https://wa.me/${prod.whatsapp}?text=${mensagem}" target="_blank" class="btn btn-whatsapp">Tenho interesse! ➔</a>`;
        }

        // Monta o layout (Card) do produto
        const slide = `
        <div class="slide">
            <div class="product-card">
                <!-- Imagem do Produto -->
                <div class="product-image" 
                     style="background-image: url('${prod.fotoPrincipal}');"
                     onclick="abrirGaleria(${galeriaStr})">
                    <div class="tap-hint">Toque para ver detalhes</div>
                </div>
                
                <!-- Informações do Produto -->
                <div class="product-info">
                    <div class="info-header">
                        <h2 class="product-name">${prod.nome}</h2>
                        <span class="product-ref">REF: ${prod.ref}</span>
                    </div>
                    <p class="product-desc">${prod.desc}</p>
                    <div class="product-specs">
                        <div class="spec-item">${prod.especificacoes}</div>
                    </div>
                    
                    <!-- Preço e Botão WhatsApp (se existir) -->
                    <div class="product-footer">
                        <div>
                            <span class="product-price">${prod.preco}</span>
                            <span class="wholesale-tag">Preço Atacado</span>
                        </div>
                        ${botaoWhatsappHTML}
                    </div>
                </div>
            </div>
            <div class="swipe-hint">Deslize para o próximo look ➔</div>
        </div>`;
        
        // Injeta o produto no carrossel
        carousel.innerHTML += slide;
    });
}

// 3. Executa as funções quando o site termina de carregar
window.onload = () => {
    aplicarTema();
    renderizarCatalogo();
};

// 4. Lógica de rolagem suave (Botão da capa)
function abrirCatalogo() {
    document.getElementById('mainCarousel').scrollTo({ left: window.innerWidth, behavior: 'smooth' });
}

// 5. Lógica para abrir o modal de galeria de fotos
function abrirGaleria(imagens) {
    const modal = document.getElementById('galleryModal');
    const container = document.getElementById('galleryContainer');
    container.innerHTML = ''; // Limpa fotos anteriores
    
    // Cria um slide de galeria para cada foto
    imagens.forEach(imgUrl => {
        container.innerHTML += `<div class="gallery-slide" style="background-image: url('${imgUrl}')"></div>`;
    });
    modal.style.display = 'flex'; // Exibe a tela
}

// 6. Lógica para fechar a galeria
function fecharGaleria() {
    document.getElementById('galleryModal').style.display = 'none';
}