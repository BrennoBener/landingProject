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
    
    carousel.innerHTML = `
        <div class="slide cover-slide" style="background-image: url('${dadosCliente.loja.fotoCapa}');">
            <div class="cover-content">
                <h1 class="logo-title">${dadosCliente.loja.nome}</h1>
                <p class="logo-subtitle">${dadosCliente.loja.subtitulo}</p>
                <button class="btn" onclick="abrirCatalogo()">Ver Coleção</button>
            </div>
        </div>
    `;

    dadosCliente.produtos.forEach(prod => {
        const galeriaStr = JSON.stringify(prod.galeria).replace(/"/g, "'");

        let botaoWhatsappHTML = "";
        if (prod.whatsapp && prod.whatsapp.trim() !== "") {
            const mensagem = encodeURIComponent(`Olá, tenho interesse neste produto: ${prod.nome} (REF: ${prod.ref})`);
            botaoWhatsappHTML = `<a href="https://wa.me/${prod.whatsapp}?text=${mensagem}" target="_blank" class="btn btn-whatsapp">Tenho interesse! ➔</a>`;
        }

        const slide = `
        <div class="slide">
            <div class="product-card">
                
                <div class="image-container" onclick="abrirGaleria(${galeriaStr})">
                    <img src="${prod.fotoPrincipal}" class="img-produto" alt="${prod.nome}">
                    <div class="tap-hint">📸 Toque para ver mais fotos</div>
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
                        <div>
                            <span class="product-price">${prod.preco}</span><br>
                            <span class="wholesale-tag">Preço Atacado</span>
                        </div>
                        ${botaoWhatsappHTML}
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