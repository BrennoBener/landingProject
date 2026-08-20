// VARIÁVEIS GERAIS
let carrinho = [];
let numeroLoja = "5585999999999"; // Insira aqui o número oficial de vendas da loja

// 1. INICIALIZAÇÃO E BUSCA DE DADOS
fetch('dados.json')
    .then(response => {
        if (!response.ok) throw new Error("Sem dados");
        return response.json();
    })
    .then(dadosCliente => {
        aplicarTema(dadosCliente);
        renderizarCatalogo(dadosCliente);
    })
    .catch(error => {
        console.error("Erro:", error);
    });

// 2. TEMA
function aplicarTema(dados) {
    const root = document.documentElement;
    if (dados.tema) {
        root.style.setProperty('--cor-primaria', dados.tema.primaria || '#bb1776');
        root.style.setProperty('--cor-fundo', dados.tema.fundo || '#1e0812');
    }
    root.style.setProperty('--cor-texto', '#f1f0eb');
    root.style.setProperty('--cor-secundaria', '#94185f');
    root.style.setProperty('--cor-destaque', '#c97a8f');
}

// 3. RENDERIZAÇÃO E MONTAGEM DO CARD COM CONTROLES DE COMPRA
function renderizarCatalogo(dados) {
    const carousel = document.getElementById('mainCarousel');
    
    // Capa
    carousel.innerHTML = `
        <div class="slide cover-slide" style="background-image: url('${dados.fotoCapa}');">
            <div class="cover-content">
                <h1 class="logo-title">${dados.nomeLoja || 'Loja'}</h1>
                <p class="logo-subtitle">${dados.subtituloLoja || 'Catálogo B2B'}</p>
                <button class="btn" onclick="abrirCatalogo()">Fazer Pedido</button>
            </div>
        </div>
    `;

    // Produtos
    if (dados.produtos && dados.produtos.length > 0) {
        dados.produtos.forEach((prod, index) => {
            let galeriaArray = [];
            if (prod.galeria) galeriaArray = prod.galeria.map(item => item.foto);
            const galeriaStr = JSON.stringify(galeriaArray).replace(/"/g, "'");

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
                        
                        <div class="product-footer" style="flex-direction: column; align-items: flex-start;">
                            <div>
                                <span class="product-price">${prod.preco}</span>
                                <span class="wholesale-tag">Preço Atacado</span>
                            </div>
                            
                            <!-- NOVOS CONTROLES DE CARRINHO -->
                            <div class="purchase-controls">
                                <select id="tam-${index}" class="select-size">
                                    <option value="P">Tamanho P</option>
                                    <option value="M">Tamanho M</option>
                                    <option value="G">Tamanho G</option>
                                    <option value="GG">Tamanho GG</option>
                                    <option value="Único">Tamanho Único</option>
                                </select>
                                <input type="number" id="qtd-${index}" class="input-qtd" value="1" min="1">
                                <button class="btn-add-cart" onclick="adicionarItem('${prod.ref}', '${prod.nome}', '${prod.preco}', ${index})">
                                    + Carrinho
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swipe-hint">Deslize ➔</div>
            </div>`;
            carousel.innerHTML += slide;
        });
    }
}

// 4. LÓGICA DO CARRINHO (Matemática e Estado)
function converterPreco(texto) {
    // Converte string "R$ 119,90" para número float 119.90 para cálculos
    return parseFloat(texto.replace("R$", "").replace(/\./g, "").replace(",", ".").trim());
}

function formatarPreco(valor) {
    // Retorna número float para string "R$ 119,90"
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function adicionarItem(ref, nome, precoStr, index) {
    const tamanho = document.getElementById(`tam-${index}`).value;
    const qtd = parseInt(document.getElementById(`qtd-${index}`).value);
    const precoUnitario = converterPreco(precoStr);
    
    // Verifica se já existe o mesmo produto com mesmo tamanho no carrinho
    const itemExistente = carrinho.find(item => item.ref === ref && item.tamanho === tamanho);
    
    if (itemExistente) {
        itemExistente.qtd += qtd;
        itemExistente.subtotal = itemExistente.qtd * precoUnitario;
    } else {
        carrinho.push({
            ref: ref,
            nome: nome,
            tamanho: tamanho,
            qtd: qtd,
            precoUnitario: precoUnitario,
            subtotal: qtd * precoUnitario
        });
    }
    
    atualizarCarrinhoUI();
    alert("Item adicionado ao carrinho!"); // Feedback rápido (estoico e direto)
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinhoUI();
}

function atualizarCarrinhoUI() {
    document.getElementById('cart-count').innerText = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    
    const container = document.getElementById('cartItems');
    container.innerHTML = "";
    
    let total = 0;
    
    carrinho.forEach((item, index) => {
        total += item.subtotal;
        container.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-header">
                    <span>${item.nome} (REF: ${item.ref})</span>
                    <span>${formatarPreco(item.subtotal)}</span>
                </div>
                <div class="cart-item-details">
                    Tamanho: ${item.tamanho} | Qtd: ${item.qtd} | Unidade: ${formatarPreco(item.precoUnitario)}
                </div>
                <span class="cart-remove" onclick="removerItem(${index})">Remover item</span>
            </div>
        `;
    });
    
    document.getElementById('cartTotal').innerText = formatarPreco(total);
}

// 5. FECHAMENTO DO PEDIDO (Formatação da Tabela para o WhatsApp)
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("O carrinho está vazio.");
        return;
    }
    
    let mensagem = "*NOVO PEDIDO (ATACADO)*%0A";
    mensagem += "-----------------------------------%0A";
    
    let totalGeral = 0;
    
    carrinho.forEach(item => {
        totalGeral += item.subtotal;
        mensagem += `*Ref:* ${item.ref}%0A`;
        mensagem += `*Produto:* ${item.nome}%0A`;
        mensagem += `*Tamanho:* ${item.tamanho}%0A`;
        mensagem += `*Qtd:* ${item.qtd}%0A`;
        mensagem += `*Valor Un:* ${formatarPreco(item.precoUnitario)}%0A`;
        mensagem += `*Subtotal:* ${formatarPreco(item.subtotal)}%0A`;
        mensagem += "-----------------------------------%0A";
    });
    
    mensagem += `*TOTAL DO PEDIDO: ${formatarPreco(totalGeral)}*%0A`;
    mensagem += "-----------------------------------%0A";
    
    // Dispara a API do WhatsApp
    window.open(`https://wa.me/${numeroLoja}?text=${mensagem}`, '_blank');
}

// 6. MECÂNICAS DE NAVEGAÇÃO
function abrirCatalogo() { document.getElementById('mainCarousel').scrollTo({ left: window.innerWidth, behavior: 'smooth' }); }
function abrirCarrinho() { document.getElementById('cartModal').style.display = 'flex'; }
function fecharCarrinho() { document.getElementById('cartModal').style.display = 'none'; }
function abrirGaleria(imagens) {
    const modal = document.getElementById('galleryModal');
    const container = document.getElementById('galleryContainer');
    container.innerHTML = ''; 
    if (imagens && imagens.length > 0) {
        imagens.forEach(imgUrl => { container.innerHTML += `<div class="gallery-slide" style="background-image: url('${imgUrl}')"></div>`; });
    }
    modal.style.display = 'flex'; 
}
function fecharGaleria() { document.getElementById('galleryModal').style.display = 'none'; }