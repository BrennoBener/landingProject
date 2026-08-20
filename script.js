function aplicarTema() {
    const root = document.documentElement;
    root.style.setProperty('--cor-primaria', dadosCliente.tema.primaria);
    root.style.setProperty('--cor-fundo', dadosCliente.tema.fundo);
    root.style.setProperty('--cor-texto', dadosCliente.tema.texto);
    root.style.setProperty('--cor-secundaria', dadosCliente.tema.secundaria);
    root.style.setProperty('--cor-destaque', dadosCliente.tema.destaque);
}

function renderizarCatalogo() {
    const carousel = document.getElementById('mainCarousel');
    
    // Injeta a Capa
    carousel.innerHTML = `
        <div class="slide cover-slide" style="background-image: url('${dadosCliente.loja.fotoCapa}');">
            <div class="cover-content">
                <h1 class="logo-title">${dadosCliente.loja.nome}</h1>
                <p class="logo-subtitle">${dadosCliente.loja.subtitulo}</p>
                <button class="btn" onclick="abrirCatalogo()">Ver Coleção</button>
            </div>
        </div>
    `;

    // Injeta os Produtos
    dadosCliente.produtos.forEach(prod => {
        const galeriaStr = JSON.stringify(prod.galeria).replace(/"/g, "'");

        const slide = `
        <div class="slide">
            <div class="product-card">
                <div class="product-image" 
                     style="background-image: url('${prod.fotoPrincipal}');"
                     onclick="abrirGaleria(${galeriaStr})">
                    <div class="tap-hint">Toque para ver detalhes</div>
                </div>
                <div class="product-info">
                    <div class="info-header">
                        <h2 class="product-name">${prod.nome}</h2>
                        <span class="product-ref">REF: ${prod.ref}</span>
                    </div>
                    <p class="product-desc">${prod.desc}</p>
                    <div class="product-specs">
                        <div class="spec-item">${prod.especificacoes}</div>
                    </div>
                    <div class="product-footer">
                        <span class="product-price">${prod.preco}</span>
                        <span class="wholesale-tag">Preço Atacado</span>
                    </div>
                </div>
            </div>
            <div class="swipe-hint">Deslize para o próximo look ➔</div>
        </div>`;
        carousel.innerHTML += slide;
    });
}

window.onload = () => {
    aplicarTema();
    renderizarCatalogo();
};

function abrirCatalogo() {
    document.getElementById('mainCarousel').scrollTo({ left: window.innerWidth, behavior: 'smooth' });
}

function abrirGaleria(imagens) {
    const modal = document.getElementById('galleryModal');
    const container = document.getElementById('galleryContainer');
    container.innerHTML = '';
    imagens.forEach(imgUrl => {
        container.innerHTML += `<div class="gallery-slide" style="background-image: url('${imgUrl}')"></div>`;
    });
    modal.style.display = 'flex';
}

function fecharGaleria() {
    document.getElementById('galleryModal').style.display = 'none';
}