export type Product = {
  category: string;
  description: string;
  gallery: string[];
  id: string;
  price: number;
  reference: string;
  title: string;
};

export const products: Product[] = [
  { category: "Essenciais", description: "Modelagem leve e versátil para compor produções do dia à noite.", gallery: ["/productsImages/modelo1.png", "/productsImages/modelo2.png"], id: "leveza-para-todos-os-dias", price: 89.9, reference: "Ref. PI-001", title: "Leveza para todos os dias" },
  { category: "Novidades", description: "Uma peça marcante com acabamento pensado para vitrines atuais.", gallery: ["/productsImages/modelo2.png", "/productsImages/modelo1.png"], id: "texturas-que-destacam", price: 109.9, reference: "Ref. PI-002", title: "Texturas que destacam" },
  { category: "Coleção Zara", description: "Silhueta elegante e presença visual para renovar a seleção da loja.", gallery: ["/productsImages/modelZara1.jpg", "/productsImages/modelZara2.jpg"], id: "presenca-em-cada-detalhe", price: 119.9, reference: "Ref. PI-003", title: "Presença em cada detalhe" },
  { category: "Coleção Zara", description: "Proporções contemporâneas para uma coleção que conversa com a estação.", gallery: ["/productsImages/modelZara2.jpg", "/productsImages/modelZara1.jpg"], id: "forma-e-movimento", price: 124.9, reference: "Ref. PI-004", title: "Forma e movimento" },
  { category: "Edição especial", description: "Cores e volumes que criam uma composição memorável no ponto de venda.", gallery: ["/productsImages/colectionZara1.jpg", "/productsImages/colectionZara2.jpg"], id: "um-olhar-novo-para-a-temporada", price: 139.9, reference: "Ref. PI-005", title: "Um olhar novo para a temporada" },
  { category: "Edição especial", description: "Versatilidade para lojistas que buscam novidade e alto giro.", gallery: ["/productsImages/colectionZara2.jpg", "/productsImages/colectionZara1.jpg"], id: "detalhes-que-permanecem", price: 129.9, reference: "Ref. PI-006", title: "Detalhes que permanecem" },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}