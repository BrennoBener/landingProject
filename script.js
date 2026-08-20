// 1. Inicia a requisição para buscar os dados gerados pelo painel CMS
fetch('dados.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Arquivo dados.json ainda não foi gerado pelo painel.");
        }
        return response.json();
    })
    .then(dadosCliente => {
        // Se encontrou os dados, constrói a página
        aplicarTema(dadosCliente);
        renderizarCatalogo(dadosCliente);
    })
    .catch(error => {
        console.error("Erro na leitura:", error);
        document.getElementById('mainCarousel').innerHTML = `
            <div class="slide" style="color: white; text-align: center;">
                <h2>Aguardando configuração.</h2>
                <p>Acesse /admin para cadastrar o primeiro produto e salvar.</p>
            </div>`;
    });

// 2. Aplica as cores definidas pelo cliente no painel
function aplicarTema(dados) {
    const root = document.documentElement;
    
    // Aplica as cores do painel (se existirem) ou usa as cores padrão
    if (dados.tema) {
        root.style.setProperty('--cor-primaria', dados.tema.primaria || '#bb1776');
        root.style.setProperty('--cor-fundo', dados.tema.fundo || '#1e0812');
    }
    
    // Cores de apoio que mantemos fixas para não quebrar a lógica de design
    root.style.setProperty('--cor-texto', '#f1f0eb');
    root.style.setProperty('--cor-secundaria', '#94185f');
    root.style.setProperty('--cor-destaque', '#c97a8f');
}

// 3. Constrói a estrutura HTML baseada no arquivo gerado pelo CMS
function renderizarCatalogo(dados) {
    const carousel = document.getElementById('mainCarousel');
    
    // Constrói a Capa
    carousel.innerHTML = `
        <div class="slide cover-slide" style="background-image: url('${dados.fotoCapa}');">
            <div class="cover-content">
                <h1 class="logo-title">${dados.nomeLoja || 'Loja'}</h1>
                <p class="logo-subtitle">${dados.subtituloLoja || 'Catálogo B2B'}</p>
                <button class="btn" onclick="abrirCatalogo()">Ver Coleção</button>
            </div>
        </div>
    `;

    // Verifica se existem produtos cadastrados
    if (dados.produtos && dados.produtos.length > 0) {
        dados.produtos.forEach(prod => {
            
            // O CMS salva a galeria de forma diferente (como objetos). 
            // Esta lógica converte de volta para o formato de texto correto.
            let galeriaArray = [];
            if (prod.galeria) {
                galeriaArray = prod.galeria.map(item => item.foto);
            }
            const galeriaStr = JSON.stringify(galeriaArray).replace(/"/g, "'");

            // Lógica do botão de WhatsApp
            let botaoWhatsappHTML = "";
            if (prod.whatsapp && prod.whatsapp.trim() !== "") {
                const mensagem = encodeURIComponent(`Olá, tenho interesse neste produto: ${prod.nome} (REF: ${prod.ref})`);
                botaoWhatsappHTML = `<a href="https://wa.me/${prod.whatsapp}?text=${mensagem}" target="_blank" class="btn btn-whatsapp">Tenho interesse! ➔</a>`;
            }

            // Monta o Card do produto
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
            
            // Injeta na tela
            carousel.innerHTML += slide;
        });
    }
}

// 4. Mecânica de Rolagem
function abrirCatalogo() {
    document.getElementById('mainCarousel').scrollTo({ left: window.innerWidth, behavior: 'smooth' });
}

// 5. Mecânica de abertura da Galeria
function abrirGaleria(imagens) {
    const modal = document.getElementById('galleryModal');
    const container = document.getElementById('galleryContainer');
    container.innerHTML = ''; 
    
    if (imagens && imagens.length > 0) {
        imagens.forEach(imgUrl => {
            container.innerHTML += `<div class="gallery-slide" style="background-image: url('${imgUrl}')"></div>`;
        });
    }
    modal.style.display = 'flex'; 
}

// 6. Mecânica para fechar a Galeria
function fecharGaleria() {
    document.getElementById('galleryModal').style.display = 'none';
}